/**
 * CPI — Sync Google Sheets → Supabase
 * Reads 3 public sheets, formats the snapshot, upserts into Supabase.
 */

const SHEET_ID = '11qWqMKoaRDrbZt1rBqtIEJyQAqXdJxN85cGShzhqpHI';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jdiewxrcxtwjtpofdrvl.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  const text = await res.text();
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) throw new Error(`Cannot parse sheet: ${sheetName}`);
  const data = JSON.parse(match[1]);
  if (data.status !== 'ok') throw new Error(`Sheet error (${sheetName}): ${JSON.stringify(data.errors)}`);
  const cols = data.table.cols.map(c => c.label);
  return (data.table.rows || []).map(row =>
    Object.fromEntries(cols.map((col, i) => [col, row.c?.[i]?.v != null ? String(row.c[i].v) : '']))
  );
}

async function sync() {
  if (!SUPABASE_SERVICE_KEY) throw new Error('SUPABASE_SERVICE_KEY not set');

  console.log('Reading sheets…');
  const [casesRows, relanceRows, comptaRows] = await Promise.all([
    fetchSheet('cases'),
    fetchSheet('relance'),
    fetchSheet('Compta'),
  ]);

  const cases = casesRows.map(r => ({
    pole:         r['Pôle']            || '',
    motif:        r['Motif']           || '',
    statut:       r['Statut']          || '',
    priorite:     r['Priorité']        || '',
    resume:       r['Résumé']          || '',
    nomCopro:     r['Nom Copro']       || '',
    lot:          r['N° Lot']          || '',
    contactEmail: r['Contact (email)'] || '',
    createdAt:    r['Créé le']         || '',
    dossierId:    r['Dossier ID']      || '',
  }));

  const relance = relanceRows.map(r => ({
    pole:         r['Pôle']            || '',
    motif:        r['Motif']           || '',
    nomCopro:     r['Nom Copro']       || '',
    lot:          r['N° Lot']          || '',
    contactEmail: r['Contact (email)'] || '',
    dateRelance:  r['Date Relance']    || '',
    statut:       r['Statut']          || '',
    rappel:       r['Rappel']          || '',
    createdAt:    r['Créé le']         || '',
    resendIn:     r['À Renvoyer dans'] || '',
    relanceId:    r['Relance ID']      || '',
  }));

  const compta = comptaRows.map(r => ({
    date:         r['date']           || '',
    personneId:   r['personne_id']    || '',
    nom:          r['nom']            || '',
    prenom:       r['prenom']         || '',
    categorie:    r['categorie']      || '',
    debit:        r['debit']          || '',
    credit:       r['credit']         || '',
    description:  r['description']    || '',
    resteACharge: r['reste_a_charge'] || '',
  }));

  const snapshot = {
    meta: {
      sourceName:    'MVP Test Back Office',
      spreadsheetId: SHEET_ID,
      syncedAt:      new Date().toISOString().slice(0, 10),
      pilotAgency:   'CPI',
      pilotMetier:   'Syndic',
      note:          'Sync automatique depuis Google Sheets public',
    },
    cases,
    relance,
    compta,
  };

  console.log(`cases: ${cases.length} | relances: ${relance.length} | compta: ${compta.length}`);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/dashboard_snapshots`, {
    method: 'POST',
    headers: {
      'apikey':        SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({ id: 1, snapshot, synced_at: new Date().toISOString() }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase error ${res.status}: ${body}`);
  }

  console.log('Sync OK');
}

sync().catch(e => { console.error(e.message); process.exit(1); });
