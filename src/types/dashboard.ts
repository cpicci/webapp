export type AgencyFilter = 'all' | 'CCI' | 'CPI';

export type MetierFilter = 'all' | 'Gestion' | 'Syndic';

export type PoleFilter = 'all' | 'Travaux' | 'Sinistre' | 'Compta';

export type WorkflowStatusFilter = 'all' | 'open' | 'pending' | 'drafted';

export type FollowUpState = 'action-needed' | 'overdue' | 'drafted' | 'recent' | 'routine';

export type KpiStatus = 'ready' | 'placeholder';

export type KpiCardViewModel = {
  title: string;
  value: string;
  note: string;
  status: KpiStatus;
  formula: string;
  source: string;
  refreshMode: string;
  ownerWorkflow: string;
};

export type DashboardRowMeta = {
  dataQuality: 'known' | 'unknown';
  dataQualityNote?: string;
  normalizedAgency: AgencyFilter | 'unknown';
  normalizedMetier: MetierFilter | 'unknown';
  pole: PoleFilter | 'unknown';
};

export type DossierRow = DashboardRowMeta & {
  dossierId: string;
  title: string;
  copro: string;
  lot?: string;
  status: WorkflowStatusFilter | 'unknown';
  priority: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
  followUpState: FollowUpState;
};

export type RelanceRow = DashboardRowMeta & {
  relanceId: string;
  dossierId: string;
  status: WorkflowStatusFilter | 'unknown';
  dueDate: string;
  createdAt: string;
  lot?: string;
  owner?: string;
  reminder: string;
  followUpState: FollowUpState;
};

export type ComptaRow = DashboardRowMeta & {
  entryId: string;
  date: string;
  categorie: string;
  debit: number;
  credit: number;
  description: string;
};

export type PanelItem = {
  title: string;
  body: string;
};

export type FollowUpItem = {
  id: string;
  kind: 'dossier' | 'relance';
  title: string;
  context: string;
  pole: PoleFilter | 'unknown';
  state: FollowUpState;
  primaryDate: string;
  secondaryDateLabel: string;
  contact?: string;
};
