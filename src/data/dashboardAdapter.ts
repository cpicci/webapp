import type {
  AgencyFilter,
  ComptaRow,
  DossierRow,
  FollowUpItem,
  KpiCardViewModel,
  MetierFilter,
  PoleFilter,
  RelanceRow,
  WorkflowStatusFilter,
} from '../types/dashboard';

import { mainScreenCopy } from '../content/mainScreenCopy';
import { liveDashboardSnapshot } from './liveDashboardSnapshot';

type DashboardSource = typeof liveDashboardSnapshot;

type DashboardFilters = {
  pole: PoleFilter;
  status: WorkflowStatusFilter;
};

type DashboardViewModel = {
  kpiCards: KpiCardViewModel[];
  actionItems: FollowUpItem[];
  recentItems: FollowUpItem[];
  dossiers: DossierRow[];
  relances: RelanceRow[];
  comptaRows: ComptaRow[];
};

function parseFrenchDate(value?: string) {
  const normalized = normalizeText(value);

  if (!normalized || !normalized.includes('/')) {
    return '';
  }

  const [day, month, year] = normalized.split('/');

  if (!day || !month || !year) {
    return '';
  }

  return `${year}-${month}-${day}`;
}

function toDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function isRecentDate(value: string, syncedAt: string) {
  if (!value || !syncedAt) {
    return false;
  }

  const date = toDate(value).getTime();
  const sync = toDate(syncedAt).getTime();
  const diffInDays = Math.floor((sync - date) / (1000 * 60 * 60 * 24));

  return Number.isFinite(diffInDays) && diffInDays >= 0 && diffInDays <= 2;
}

function isOverdueDate(value: string, syncedAt: string) {
  if (!value || !syncedAt) {
    return false;
  }

  return toDate(value).getTime() < toDate(syncedAt).getTime();
}

function normalizeText(value?: string) {
  return value?.trim() ?? '';
}

function parseFrenchNumber(value?: string) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return 0;
  }

  return Number(normalized.replace(',', '.'));
}

function normalizeAgency(): AgencyFilter {
  return 'CPI';
}

function normalizeMetier(): MetierFilter {
  return 'Syndic';
}

function normalizeCaseStatus(value?: string) {
  const normalized = normalizeText(value).toLowerCase();

  if (normalized === 'ouvert') {
    return 'open';
  }

  return 'unknown';
}

function normalizeRelanceStatus(value?: string) {
  const normalized = normalizeText(value).toLowerCase();

  if (normalized === 'en attente') {
    return 'pending';
  }

  if (normalized === 'brouillon cree') {
    return 'drafted';
  }

  return 'unknown';
}

function normalizePole(value?: string): PoleFilter | 'unknown' {
  const normalized = normalizeText(value).toLowerCase();

  if (normalized === 'travaux') return 'Travaux';
  if (normalized === 'sinistre') return 'Sinistre';
  if (normalized === 'compta') return 'Compta';

  return 'unknown';
}

function normalizeLot(value?: string) {
  const normalized = normalizeText(value);

  if (!normalized || normalized.toLowerCase() === 'x') {
    return undefined;
  }

  return normalized;
}

function formatRelanceTitle(value: string) {
  if (!value.startsWith('subject:empty|')) {
    return value;
  }

  return mainScreenCopy.states.emptyRelance;
}

function matchesOperationalFilter<
  T extends {
    pole: PoleFilter | 'unknown';
    status: WorkflowStatusFilter | 'unknown';
  },
>(
  row: T,
  filters: DashboardFilters,
) {
  const poleMatch = filters.pole === 'all' ? true : row.pole === filters.pole;
  const statusMatch = filters.status === 'all' ? true : row.status === filters.status;

  return poleMatch && statusMatch;
}

function matchesComptaFilter(filters: DashboardFilters) {
  const poleMatch = filters.pole === 'all' || filters.pole === 'Compta';

  return poleMatch && filters.status === 'all';
}

function buildPlaceholderCard(): KpiCardViewModel {
  const placeholder = mainScreenCopy.kpis.comingSoon;

  return {
    title: placeholder.title,
    value: placeholder.value,
    note: placeholder.note,
    status: 'placeholder',
    formula: 'Not available yet',
    source: placeholder.source,
    refreshMode: 'Manual',
    ownerWorkflow: 'TBD',
  };
}

function mapDossiers(rows: DashboardSource['cases'], pilotNote: string, syncedAt: string): DossierRow[] {
  return rows.map((row) => {
    const normalizedAgency = normalizeAgency();
    const normalizedMetier = normalizeMetier();
    const pole = normalizePole(row.pole);
    const createdAt = parseFrenchDate(row.createdAt);
    const lot = normalizeLot(row.lot);
    const followUpState = normalizeText(row.priorite).toLowerCase() === 'haute'
      ? 'action-needed'
      : isRecentDate(createdAt, syncedAt)
        ? 'recent'
        : 'routine';

    return {
      dossierId: row.dossierId,
      title: row.resume,
      copro: row.nomCopro || 'Copro non renseignée',
      lot,
      status: normalizeCaseStatus(row.statut),
      priority: row.priorite,
      contactEmail: row.contactEmail || undefined,
      createdAt,
      updatedAt: createdAt,
      followUpState,
      normalizedAgency,
      normalizedMetier,
      pole,
      dataQuality: 'known',
      dataQualityNote: pilotNote,
    };
  });
}

function mapRelances(rows: DashboardSource['relance'], pilotNote: string, syncedAt: string): RelanceRow[] {
  return rows.map((row) => {
    const normalizedAgency = normalizeAgency();
    const normalizedMetier = normalizeMetier();
    const pole = normalizePole(row.pole);
    const dueDate = parseFrenchDate(row.dateRelance);
    const createdAt = parseFrenchDate(row.createdAt);
    const status = normalizeRelanceStatus(row.statut);
    const lot = normalizeLot(row.lot);
    const followUpState = status === 'drafted' && isOverdueDate(dueDate, syncedAt)
      ? 'overdue'
      : status === 'pending' && isOverdueDate(dueDate, syncedAt)
        ? 'overdue'
        : status === 'pending'
          ? 'action-needed'
          : status === 'drafted'
            ? 'drafted'
            : 'routine';

    return {
      relanceId: row.relanceId,
      dossierId: row.relanceId,
      status,
      dueDate,
      createdAt,
      lot,
      owner: row.contactEmail || undefined,
      reminder: row.rappel,
      followUpState,
      normalizedAgency,
      normalizedMetier,
      pole,
      dataQuality: 'known',
      dataQualityNote: pilotNote,
    };
  });
}

function mapComptaRows(rows: DashboardSource['compta'], pilotNote: string): ComptaRow[] {
  return rows.map((row) => {
    const normalizedAgency = normalizeAgency();
    const normalizedMetier = normalizeMetier();

    return {
      entryId: row.personneId,
      date: row.date,
      categorie: row.categorie,
      debit: parseFrenchNumber(row.debit),
      credit: parseFrenchNumber(row.credit),
      description: row.description,
      normalizedAgency,
      normalizedMetier,
      pole: 'Compta',
      dataQuality: 'known',
      dataQualityNote: pilotNote,
    };
  });
}

function buildActionItems(dossiers: DossierRow[], relances: RelanceRow[]): FollowUpItem[] {
  const dossierItems = dossiers
    .filter((row) => row.followUpState === 'action-needed')
    .map<FollowUpItem>((row) => ({
      id: row.dossierId,
      kind: 'dossier',
      title: row.title,
      context: `${row.copro}${row.lot ? ` | Lot ${row.lot}` : ''}`,
      pole: row.pole,
      state: row.followUpState,
      primaryDate: row.createdAt,
      secondaryDateLabel: 'Created',
      contact: row.contactEmail,
    }));

  const relanceItems = relances
    .filter((row) => row.followUpState === 'action-needed' || row.followUpState === 'overdue')
    .map<FollowUpItem>((row) => ({
      id: row.relanceId,
      kind: 'relance',
      title: formatRelanceTitle(row.relanceId),
      context: row.reminder,
      pole: row.pole,
      state: row.followUpState,
      primaryDate: row.dueDate,
      secondaryDateLabel: 'Due',
      contact: row.owner,
    }));

  return [...relanceItems, ...dossierItems].sort((a, b) => a.primaryDate.localeCompare(b.primaryDate));
}

function buildRecentItems(dossiers: DossierRow[], relances: RelanceRow[], syncedAt: string): FollowUpItem[] {
  const dossierItems = dossiers
    .filter((row) => isRecentDate(row.createdAt, syncedAt))
    .map<FollowUpItem>((row) => ({
      id: row.dossierId,
      kind: 'dossier',
      title: row.title,
      context: `${row.copro}${row.lot ? ` | Lot ${row.lot}` : ''}`,
      pole: row.pole,
      state: 'recent',
      primaryDate: row.createdAt,
      secondaryDateLabel: 'Created',
      contact: row.contactEmail,
    }));

  const relanceItems = relances
    .filter((row) => isRecentDate(row.createdAt, syncedAt))
    .map<FollowUpItem>((row) => ({
      id: row.relanceId,
      kind: 'relance',
      title: formatRelanceTitle(row.relanceId),
      context: row.reminder,
      pole: row.pole,
      state: 'recent',
      primaryDate: row.createdAt,
      secondaryDateLabel: 'Created',
      contact: row.owner,
    }));

  return [...dossierItems, ...relanceItems].sort((a, b) => b.primaryDate.localeCompare(a.primaryDate));
}

export function buildDashboardViewModel(source: DashboardSource, filters: DashboardFilters): DashboardViewModel {
  const dossiers = mapDossiers(source.cases, source.meta.note, source.meta.syncedAt)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((row) => matchesOperationalFilter(row, filters));
  const relances = mapRelances(source.relance, source.meta.note, source.meta.syncedAt)
    .sort((a, b) => b.dueDate.localeCompare(a.dueDate))
    .filter((row) => matchesOperationalFilter(row, filters));
  const comptaRows = matchesComptaFilter(filters)
    ? mapComptaRows(source.compta, source.meta.note).sort((a, b) => b.date.localeCompare(a.date))
    : [];

  const openDossiers = dossiers.filter((row) => row.status === 'open').length;
  const pendingRelances = relances.filter((row) => row.status === 'pending').length;
  const draftedRelances = relances.filter((row) => row.status === 'drafted').length;
  const actionItems = buildActionItems(dossiers, relances);
  const recentItems = buildRecentItems(dossiers, relances, source.meta.syncedAt);
  const kpiCopy = mainScreenCopy.kpis;

  const kpiCards: KpiCardViewModel[] = [
    {
      title: kpiCopy.openDossiers.title,
      value: String(openDossiers),
      note: kpiCopy.openDossiers.note,
      status: 'ready',
      formula: "Count of visible dossier rows where status = 'open'",
      source: 'cases',
      refreshMode: 'Manual',
      ownerWorkflow: 'WF4',
    },
    {
      title: kpiCopy.pendingRelances.title,
      value: String(pendingRelances),
      note: kpiCopy.pendingRelances.note,
      status: 'ready',
      formula: "Count of visible relance rows where status = 'pending'",
      source: 'relance',
      refreshMode: 'Manual',
      ownerWorkflow: 'WF4/WF7',
    },
    {
      title: kpiCopy.draftedRelances.title,
      value: String(draftedRelances),
      note: kpiCopy.draftedRelances.note,
      status: 'ready',
      formula: "Count of visible relance rows where status = 'drafted'",
      source: 'relance',
      refreshMode: 'Manual',
      ownerWorkflow: 'WF4/WF7',
    },
    {
      title: kpiCopy.actionNeeded.title,
      value: String(actionItems.length),
      note: kpiCopy.actionNeeded.note,
      status: 'ready',
      formula: 'Count of action-needed dossiers plus pending or overdue relances',
      source: 'cases + relance',
      refreshMode: 'Manual',
      ownerWorkflow: 'WF4/WF7',
    },
    {
      title: kpiCopy.recentActivity.title,
      value: String(recentItems.length),
      note: kpiCopy.recentActivity.note,
      status: 'ready',
      formula: 'Count of recent dossiers and relances based on the sync date',
      source: 'cases + relance',
      refreshMode: 'Manual',
      ownerWorkflow: 'WF4/WF7',
    },
    buildPlaceholderCard(),
  ];

  return {
    kpiCards,
    actionItems,
    recentItems,
    dossiers,
    relances,
    comptaRows,
  };
}
