import type { FollowUpItem } from '../types/dashboard';
import QueueGroup from './QueueGroup';

type Props = {
  urgences: FollowUpItem[];
  dossiersSuivis: FollowUpItem[];
  relancesATraiter: FollowUpItem[];
  relancesPreparees: FollowUpItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function WorkQueue({
  urgences,
  dossiersSuivis,
  relancesATraiter,
  relancesPreparees,
  selectedId,
  onSelect,
}: Props) {
  const isEmpty = urgences.length === 0
    && dossiersSuivis.length === 0
    && relancesATraiter.length === 0
    && relancesPreparees.length === 0;

  return (
    <section className="queue-region" aria-label="File de travail">
      <h2 className="region-title">File de travail</h2>

      {isEmpty ? (
        <div className="queue-empty">
          <p>Aucun élément pour ces filtres.</p>
        </div>
      ) : (
        <>
          <QueueGroup
            title="Urgences du jour"
            badgeVariant="urgent"
            items={urgences}
            selectedId={selectedId}
            onSelect={onSelect}
          />
          <QueueGroup
            title="Dossiers suivis"
            items={dossiersSuivis}
            selectedId={selectedId}
            onSelect={onSelect}
          />
          <QueueGroup
            title="Relances à traiter"
            items={relancesATraiter}
            selectedId={selectedId}
            onSelect={onSelect}
          />
          <QueueGroup
            title="Relances préparées"
            badgeVariant="drafted"
            items={relancesPreparees}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </>
      )}
    </section>
  );
}
