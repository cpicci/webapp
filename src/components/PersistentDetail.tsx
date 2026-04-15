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

const KIND_LABELS: Record<FollowUpItem['kind'], string> = {
  dossier: 'Dossier',
  relance: 'Relance',
};

const POLE_LABELS: Record<string, string> = {
  Travaux: 'Travaux',
  Sinistre: 'Sinistre',
  Compta: 'Compta',
  unknown: '—',
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

type Props = {
  item: FollowUpItem | null;
};

export default function PersistentDetail({ item }: Props) {
  if (!item) {
    return (
      <aside className="detail-region" aria-label="Détail">
        <div className="detail-empty">
          <p>Sélectionnez un élément dans la file pour voir son détail.</p>
        </div>
      </aside>
    );
  }

  const kindLabel = KIND_LABELS[item.kind];
  const poleLabel = POLE_LABELS[item.pole] ?? '—';
  const stateLabel = STATE_LABELS[item.state];
  const stateCss = STATE_CSS[item.state];
  const dateLabel = item.kind === 'relance' ? 'Échéance' : 'Créé le';

  return (
    <aside className="detail-region" aria-label="Détail de l'élément sélectionné">
      <header className="detail-header">
        <span className="detail-kicker">
          {kindLabel} · {poleLabel}
        </span>
        <h2 className="detail-title">{item.title || '—'}</h2>
      </header>

      <div className="detail-content">
        <div className="detail-card">
          <div className="detail-kind">
            <span className="kind-badge">{kindLabel}</span>
            <span className={`state-badge ${stateCss}`}>{stateLabel}</span>
          </div>
          {item.context && (
            <p className="detail-description">{item.context}</p>
          )}
        </div>

        <div className="detail-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Pôle</span>
            <strong>{poleLabel}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">{dateLabel}</span>
            <strong>{formatDate(item.primaryDate)}</strong>
          </div>
          {item.contact && (
            <div className="meta-item">
              <span className="meta-label">Contact</span>
              <strong>{item.contact}</strong>
            </div>
          )}
        </div>

        <div className="detail-actions">
          <button className="btn-primary" type="button">
            Ouvrir le dossier
          </button>
          <button className="btn-secondary" type="button">
            Voir la copro
          </button>
        </div>
      </div>

      <footer className="detail-footer">
        <h4>Informations</h4>
        <ul className="activity-list">
          <li>
            <strong>Type</strong>
            <span>{kindLabel}</span>
          </li>
          {poleLabel !== '—' && (
            <li>
              <strong>Pôle</strong>
              <span>{poleLabel}</span>
            </li>
          )}
          <li>
            <strong>Statut</strong>
            <span>{stateLabel}</span>
          </li>
        </ul>
      </footer>
    </aside>
  );
}
