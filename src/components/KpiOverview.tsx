import { mainScreenCopy } from '../content/mainScreenCopy';
import type { KpiCardViewModel } from '../types/dashboard';

type KpiOverviewProps = {
  cards: KpiCardViewModel[];
};

export default function KpiOverview({ cards }: KpiOverviewProps) {
  const { indicators } = mainScreenCopy;

  return (
    <section className="support-metrics" aria-label={indicators.regionLabel}>
      <div className="section-header section-header-compact">
        <div>
          <p className="section-kicker">{indicators.supportKicker}</p>
          <h2>{indicators.heading}</h2>
        </div>
        <p className="section-copy">{indicators.description}</p>
      </div>

      <div className="support-metrics-list">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`support-metric${card.status === 'placeholder' ? ' support-metric-placeholder' : ''}`}
            data-kpi-status={card.status}
          >
            <div className="support-metric-header">
              <div>
                <p className="support-metric-title">{card.title}</p>
                {card.status !== 'placeholder' ? <p className="support-metric-source">{card.source}</p> : null}
              </div>
              {card.status === 'placeholder' ? (
                <span className="status-pill status-placeholder">{indicators.placeholderPill}</span>
              ) : null}
            </div>
            <div className="support-metric-body">
              <strong className="support-metric-value">{card.value}</strong>
              <p className="support-metric-note">{card.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
