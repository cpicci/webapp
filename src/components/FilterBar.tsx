import type { PoleFilter, WorkflowStatusFilter } from '../types/dashboard';

type FilterBarProps = {
  pole: PoleFilter;
  status: WorkflowStatusFilter;
  syncedAt?: string;
  onPoleChange: (value: PoleFilter) => void;
  onStatusChange: (value: WorkflowStatusFilter) => void;
};

const POLE_OPTIONS: { value: PoleFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'Travaux', label: 'Travaux' },
  { value: 'Sinistre', label: 'Sinistre' },
  { value: 'Compta', label: 'Compta' },
];

const STATUS_OPTIONS: { value: WorkflowStatusFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'open', label: 'Ouvert' },
  { value: 'pending', label: 'En attente' },
  { value: 'drafted', label: 'Brouillon' },
];

function formatSyncDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `aujourd'hui à ${time}`;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month} à ${time}`;
}

export default function FilterBar({ pole, status, syncedAt, onPoleChange, onStatusChange }: FilterBarProps) {
  return (
    <section className="filters" aria-label="Filtres">
      <div className="filter-group">
        <label htmlFor="filter-pole">Pôle</label>
        <select
          id="filter-pole"
          value={pole}
          onChange={(e) => onPoleChange(e.target.value as PoleFilter)}
        >
          {POLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-status">Statut</label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as WorkflowStatusFilter)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-meta">
        <span>Source — GSheet Opérationnel</span>
        {syncedAt && <span>Actualisé {formatSyncDate(syncedAt)}</span>}
      </div>
    </section>
  );
}
