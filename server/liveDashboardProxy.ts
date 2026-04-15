import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

import { google } from 'googleapis';

const SPREADSHEET_ID = '1szo_2Iuv4-r3fvvVQZvoHRvMzRFvvb4JrjgwHmH4MWg';
const DEFAULT_CREDENTIALS_PATH = join(homedir(), '.config', 'opencode', 'google-drive-oauth.keys.json');
const DEFAULT_TOKEN_PATH = join(homedir(), '.config', 'google-drive-mcp', 'tokens.json');
const CACHE_TTL_MS = 60_000;

type CachedValue = {
  expiresAt: number;
  payload: unknown;
};

let cachedValue: CachedValue | null = null;

function getCredentialsPath() {
  return process.env.GOOGLE_DRIVE_OAUTH_CREDENTIALS || DEFAULT_CREDENTIALS_PATH;
}

function getTokenPath() {
  return process.env.GOOGLE_DRIVE_MCP_TOKEN_PATH || DEFAULT_TOKEN_PATH;
}

async function createOAuthClient() {
  const credentials = JSON.parse(await readFile(getCredentialsPath(), 'utf8'));
  const tokens = JSON.parse(await readFile(getTokenPath(), 'utf8'));
  const config = credentials.installed ?? credentials.web;

  if (!config?.client_id || !config?.client_secret) {
    throw new Error('Missing Google OAuth client configuration');
  }

  const oauth2 = new google.auth.OAuth2(config.client_id, config.client_secret, config.redirect_uris?.[0]);
  oauth2.setCredentials(tokens);

  return oauth2;
}

async function getSheetRows(sheets: ReturnType<typeof google.sheets>, range: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  return response.data.values ?? [];
}

function rowsToObjects(rows: string[][]) {
  const [header = [], ...dataRows] = rows;

  return dataRows.map((row) =>
    header.reduce<Record<string, string>>((acc, column, index) => {
      acc[column] = row[index] ?? '';
      return acc;
    }, {}),
  );
}

function buildSnapshot(casesRows: Record<string, string>[], relanceRows: Record<string, string>[], comptaRows: Record<string, string>[]) {
  return {
    meta: {
      sourceName: 'MVP Test Back Office',
      spreadsheetId: SPREADSHEET_ID,
      syncedAt: new Date().toISOString().slice(0, 10),
      pilotAgency: 'CPI',
      pilotMetier: 'Syndic',
      note: 'Pilot mapping from current back-office workbook',
    },
    cases: casesRows.map((row) => ({
      pole: row['Pôle'],
      motif: row['Motif'],
      statut: row['Statut'],
      priorite: row['Priorité'],
      resume: row['Résumé'],
      nomCopro: row['Nom Copro'],
      lot: row['N° Lot'],
      contactEmail: row['Contact (email)'],
      createdAt: row['Crée le'],
      dossierId: row['Dossier ID'],
    })),
    relance: relanceRows.map((row) => ({
      pole: row['Pôle'],
      motif: row['Motif'],
      nomCopro: row['Nom Copro'],
      lot: row['N° Lot'],
      contactEmail: row['Contact (email)'],
      dateRelance: row['Date Relance'],
      statut: row['Statut'],
      rappel: row['Rappel'],
      createdAt: row['Crée le'],
      resendIn: row['À Renvoyer dans'],
      relanceId: row['Relance ID'],
    })),
    compta: comptaRows.map((row) => ({
      date: row.date,
      personneId: row.personne_id,
      nom: row.nom,
      prenom: row.prenom,
      categorie: row.categorie,
      debit: row.debit,
      credit: row.credit,
      description: row.description,
      resteACharge: row.reste_a_charge,
    })),
  };
}

export async function getLiveDashboardSnapshot() {
  if (cachedValue && cachedValue.expiresAt > Date.now()) {
    return cachedValue.payload;
  }

  const auth = await createOAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const [casesRaw, relanceRaw, comptaRaw] = await Promise.all([
    getSheetRows(sheets, 'cases!A:Z'),
    getSheetRows(sheets, 'relance!A:Z'),
    getSheetRows(sheets, 'Compta!A:I'),
  ]);

  const payload = buildSnapshot(rowsToObjects(casesRaw), rowsToObjects(relanceRaw), rowsToObjects(comptaRaw));

  cachedValue = {
    payload,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };

  return payload;
}
