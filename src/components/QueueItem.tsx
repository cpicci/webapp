import type { FollowUpItem } from '../types/dashboard';

const STATE_LABELS: Record<FollowUpItem['state'], string> = {
  'action-needed': 'Action requise',
  overdue: 'En retard',
  drafted: 'Brouillon',
  recent: 'Récent',
  routine: 'Routine',
};

const STATE_CSS: Record<FollowUpItem['state'], string> = {
  'action-needed': 'urgent',
  overdue: 'overdue',
  drafted: 'drafted',
  recent: 'recent',
  routine: 'routine',
};

const POLE_LABELS: Record<string, string> = {
  Travaux: 'Travaux',
  Sinistre: 'Sinistre',
  Compta: 'Compta',
  unknown: '',
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

type Props = {
  item: FollowUpItem;
  isSelected: boolean;
  onSelect: () => void;
};

export default function QueueItem({ item, isSelected, onSelect }: Props) {
  const poleLabel = POLE_LABELS[item.pole] ?? '';
  const stateLabel = STATE_LABELS[item.state];
  const stateCss = STATE_CSS[item.state];
  const dateLabel = item.kind === 'relance' ? 'Échéance' : 'Créé';

  return (
    <li
      className={isSelected ? 'queue-item selected' : 'queue-item'}
      tabIndex={0}
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(); }}
    >
      <div className="item-main">
        {poleLabel && <span className="item-kicker">{poleLabel}</span>}
        <strong className="item-title">{item.title || '—'}</strong>
        {item.context && <span className="item-context">{item.context}</span>}
      </div>
      <div className="item-meta">
        <span className="meta-line">
          <span className="meta-label">{dateLabel}</span>
          <strong>{formatDate(item.primaryDate)}</strong>
        </span>
        <span className={`state-badge ${stateCss}`}>{stateLabel}</span>
      </div>
    </li>
  );
}
