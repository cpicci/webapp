import { useEffect, useMemo, useState } from 'react';

import { mainScreenCopy } from '../content/mainScreenCopy';
import type { ComptaRow, DossierRow, FollowUpItem, KpiCardViewModel, RelanceRow } from '../types/dashboard';

type WorkspaceView = 'home' | 'dossiers' | 'relances';

type OperationalPanelsProps = {
  actionItems: FollowUpItem[];
  recentItems: FollowUpItem[];
  dossiers: DossierRow[];
  relances: RelanceRow[];
  comptaRows: ComptaRow[];
  kpiCards: KpiCardViewModel[];
  activeView: WorkspaceView;
};

type WorkItemKind = 'priority' | 'dossier' | 'relance-pending' | 'relance-drafted';

type WorkItem = {
  id: string;
  kind: WorkItemKind;
  title: string;
  summary: string;
  note?: string;
  state: FollowUpItem['state'];
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  tertiaryLabel?: string;
  tertiaryValue?: string;
  supportLabel?: string;
  supportValue?: string;
};

function formatDisplayValue(value: string | undefined, fallback: string) {
  if (!value || value === 'unknown') {
    return fallback;
  }

  return value;
}

function hasDisplayValue(value: string | undefined) {
  return Boolean(value && value !== 'unknown');
}

function formatContextValue(value: string | undefined, fallback: string) {
  if (!value || value === 'unknown') {
    return fallback;
  }

  if (value === 'Copro non renseignée') {
    return 'Copro à préciser';
  }

  return value;
}

function formatStateLabel(state: FollowUpItem['state']) {
  const labels = mainScreenCopy.states;

  if (state === 'action-needed') return labels.actionNeeded;
  if (state === 'overdue') return labels.overdue;
  if (state === 'recent') return labels.recent;
  if (state === 'drafted') return labels.drafted;

  return labels.routine;
}

function formatRelancePrimaryLabel(relanceId: string) {
  if (!relanceId.startsWith('subject:empty|')) {
    return relanceId;
  }

  return mainScreenCopy.states.emptyRelance;
}

function isGenericRelanceTitle(value: string) {
  return value === mainScreenCopy.states.emptyRelance;
}

function getActionItemPrimary(item: FollowUpItem) {
  if (item.kind === 'relance' && isGenericRelanceTitle(item.title)) {
    return {
      title: item.context,
      note: mainScreenCopy.states.pendingRelance,
      summary: item.contact ?? mainScreenCopy.panels.meta.unassigned,
    };
  }

  return {
    title: item.title,
    note: undefined,
    summary: formatContextValue(item.context, mainScreenCopy.panels.meta.notAvailable),
  };
}

function getRelancePrimary(row: RelanceRow) {
  if (isGenericRelanceTitle(formatRelancePrimaryLabel(row.relanceId))) {
    return {
      title: row.reminder,
      note: row.status === 'drafted'
        ? mainScreenCopy.states.draftedRelance
        : mainScreenCopy.states.pendingRelance,
    };
  }

  return {
    title: formatRelancePrimaryLabel(row.relanceId),
    note: undefined,
  };
}

function buildPriorityItems(items: FollowUpItem[], fallback: string): WorkItem[] {
  return items.map((item) => {
    const primary = getActionItemPrimary(item);

    return {
      id: `priority:${item.id}`,
      kind: 'priority',
      title: primary.title,
      summary: primary.summary,
      note: primary.note,
      state: item.state,
      primaryLabel: item.secondaryDateLabel === 'Due'
        ? mainScreenCopy.panels.meta.due
        : mainScreenCopy.panels.meta.created,
      primaryValue: formatDisplayValue(item.primaryDate, fallback),
      secondaryLabel: hasDisplayValue(item.pole) ? mainScreenCopy.panels.meta.pole : undefined,
      secondaryValue: hasDisplayValue(item.pole) ? item.pole : undefined,
      supportLabel: item.contact ? mainScreenCopy.panels.meta.contact : undefined,
      supportValue: item.contact,
    };
  });
}

function buildDossierItems(items: DossierRow[], fallback: string): WorkItem[] {
  return items.map((row) => ({
    id: `dossier:${row.dossierId}`,
    kind: 'dossier',
    title: row.title,
    summary: formatContextValue(row.copro, fallback),
    note: row.lot ? `Lot ${row.lot}` : row.priority,
    state: row.followUpState,
    primaryLabel: mainScreenCopy.panels.meta.dossierReference,
    primaryValue: formatDisplayValue(row.dossierId, fallback),
    secondaryLabel: hasDisplayValue(row.pole) ? mainScreenCopy.panels.meta.pole : undefined,
    secondaryValue: hasDisplayValue(row.pole) ? row.pole : undefined,
    tertiaryLabel: hasDisplayValue(row.createdAt) ? mainScreenCopy.panels.meta.created : undefined,
    tertiaryValue: hasDisplayValue(row.createdAt) ? row.createdAt : undefined,
    supportLabel: row.contactEmail ? mainScreenCopy.panels.meta.contact : undefined,
    supportValue: row.contactEmail,
  }));
}

function buildRelanceItems(items: RelanceRow[], fallback: string, kind: WorkItemKind): WorkItem[] {
  return items.map((row) => {
    const primary = getRelancePrimary(row);

    return {
      id: `${kind}:${row.relanceId}`,
      kind,
      title: primary.title,
      summary: row.reminder,
      note: primary.note ?? (hasDisplayValue(row.pole) ? row.pole : undefined),
      state: row.followUpState,
      primaryLabel: hasDisplayValue(row.dueDate) ? mainScreenCopy.panels.meta.due : mainScreenCopy.panels.meta.relanceReference,
      primaryValue: hasDisplayValue(row.dueDate)
        ? row.dueDate
        : formatDisplayValue(row.relanceId, fallback),
      secondaryLabel: mainScreenCopy.panels.meta.contact,
      secondaryValue: row.owner ?? mainScreenCopy.panels.meta.unassigned,
      tertiaryLabel: hasDisplayValue(row.createdAt) ? mainScreenCopy.panels.meta.created : undefined,
      tertiaryValue: hasDisplayValue(row.createdAt) ? row.createdAt : undefined,
      supportLabel: hasDisplayValue(row.lot) ? 'Lot' : undefined,
      supportValue: hasDisplayValue(row.lot) ? row.lot : undefined,
    };
  });
}

function renderMetaLine(label: string | undefined, value: string | undefined) {
  if (!label || !value) {
    return null;
  }

  return (
    <span className="meta-line">
      <span className="meta-label">{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

function DetailMeta({ label, value }: { label: string; value?: string }) {
  if (!label || !value) {
    return null;
  }

  return (
    <div className="detail-meta-item">
      <span className="detail-meta-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyListState() {
  return <p className="empty-panel-copy">{mainScreenCopy.panels.emptyState}</p>;
}

function SupportList({
  heading,
  items,
}: {
  heading: string;
  items: Array<{ id: string; title: string; note: string }>;
}) {
  return (
    <section className="detail-support-block" aria-label={heading}>
      <h4>{heading}</h4>
      {items.length === 0 ? (
        <p className="empty-panel-copy">{mainScreenCopy.panels.emptyState}</p>
      ) : (
        <ul className="detail-support-list">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function WorkList({
  items,
  selectedId,
  onSelect,
  dense = false,
}: {
  items: WorkItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  dense?: boolean;
}) {
  if (items.length === 0) {
    return <EmptyListState />;
  }

  return (
    <ul className={dense ? 'queue-list queue-list-dense' : 'queue-list'}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={item.id === selectedId ? 'queue-row queue-row-active' : 'queue-row'}
            aria-pressed={item.id === selectedId}
            aria-label={[item.title, item.summary, item.primaryValue].filter(Boolean).join(' | ')}
            onClick={() => onSelect(item.id)}
          >
            <div className="queue-row-main">
              {item.note ? <span className="row-kicker">{item.note}</span> : null}
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
            <div className="queue-row-side">
              {renderMetaLine(item.primaryLabel, item.primaryValue)}
              {renderMetaLine(item.secondaryLabel, item.secondaryValue)}
              <span className={`state-badge state-${item.state}`}>{formatStateLabel(item.state)}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function HomeModule({
  kicker,
  title,
  copy,
  items,
  selectedId,
  onSelect,
}: {
  kicker: string;
  title: string;
  copy: string;
  items: WorkItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="home-module">
      <header className="home-module-header">
        <div>
          <p className="panel-kicker">{kicker}</p>
          <h3>{title}</h3>
        </div>
        <p className="panel-copy">{copy}</p>
      </header>
      <WorkList items={items} selectedId={selectedId} onSelect={onSelect} dense />
    </section>
  );
}

function SectionBlock({
  heading,
  label,
  copy,
  items,
  selectedId,
  onSelect,
}: {
  heading: string;
  label: string;
  copy: string;
  items: WorkItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="workspace-block">
      <header className="workspace-block-header">
        <div>
          <p className="panel-kicker">{label}</p>
          <h3>{heading}</h3>
        </div>
        <p className="panel-copy">{copy}</p>
      </header>
      <WorkList items={items} selectedId={selectedId} onSelect={onSelect} />
    </section>
  );
}

export default function OperationalPanels({
  actionItems,
  recentItems,
  dossiers,
  relances,
  comptaRows: _comptaRows,
  kpiCards: _kpiCards,
  activeView,
}: OperationalPanelsProps) {
  const { panels } = mainScreenCopy;
  const pendingRelances = relances.filter((row) => row.status === 'pending');
  const draftedRelances = relances.filter((row) => row.status === 'drafted');
  const notAvailable = panels.meta.notAvailable;

  const priorityItems = useMemo(() => buildPriorityItems(actionItems, notAvailable), [actionItems, notAvailable]);
  const dossierItems = useMemo(() => buildDossierItems(dossiers, notAvailable), [dossiers, notAvailable]);
  const pendingItems = useMemo(
    () => buildRelanceItems(pendingRelances, notAvailable, 'relance-pending'),
    [pendingRelances, notAvailable],
  );
  const draftedItems = useMemo(
    () => buildRelanceItems(draftedRelances, notAvailable, 'relance-drafted'),
    [draftedRelances, notAvailable],
  );

  const homePriorityItems = priorityItems.slice(0, 5);
  const homeDossierItems = dossierItems.slice(0, 5);
  const homeRelanceItems = [...pendingItems.slice(0, 3), ...draftedItems.slice(0, 2)];

  const visibleItems = useMemo(() => {
    if (activeView === 'home') {
      return [...homePriorityItems, ...homeDossierItems, ...homeRelanceItems];
    }

    if (activeView === 'dossiers') {
      return dossierItems;
    }

    return [...pendingItems, ...draftedItems];
  }, [activeView, dossierItems, draftedItems, homeDossierItems, homePriorityItems, homeRelanceItems, pendingItems]);

  const [selectedId, setSelectedId] = useState<string | null>(visibleItems[0]?.id ?? null);

  useEffect(() => {
    if (!visibleItems.length) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !visibleItems.some((item) => item.id === selectedId)) {
      setSelectedId(visibleItems[0].id);
    }
  }, [selectedId, visibleItems]);

  const selectedItem = visibleItems.find((item) => item.id === selectedId) ?? null;
  const detailKind = selectedItem
    ? selectedItem.kind === 'dossier'
      ? panels.detailKinds.dossier
      : selectedItem.kind === 'relance-drafted'
        ? panels.detailKinds.relanceDrafted
        : selectedItem.kind === 'relance-pending'
          ? panels.detailKinds.relancePending
          : panels.detailKinds.priority
    : null;

  const recentSupport = recentItems.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.title,
    note: item.primaryDate || mainScreenCopy.panels.emptyState,
  }));

  return (
    <div className="workspace-grid">
      {activeView === 'home' ? (
        <section className="workspace-view" aria-label={panels.homeRegionLabel}>
          <div className="home-overview-surface">
            <HomeModule
              kicker={panels.sections.homePriorities.kicker}
              title={panels.sections.homePriorities.title}
              copy={panels.sections.homePriorities.copy}
              items={homePriorityItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <HomeModule
              kicker={panels.sections.homeDossiers.kicker}
              title={panels.sections.homeDossiers.title}
              copy={panels.sections.homeDossiers.copy}
              items={homeDossierItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <HomeModule
              kicker={panels.sections.homeRelances.kicker}
              title={panels.sections.homeRelances.title}
              copy={panels.sections.homeRelances.copy}
              items={homeRelanceItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>
      ) : null}

      {activeView === 'dossiers' ? (
        <section className="workspace-view" aria-label={panels.dossiersRegionLabel}>
          <div className="workspace-surface">
            <SectionBlock
              heading={panels.sections.dossiers.title}
              label={panels.sections.dossiers.kicker}
              copy={panels.sections.dossiers.copy}
              items={dossierItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>
      ) : null}

      {activeView === 'relances' ? (
        <section className="workspace-view" aria-label={panels.relancesRegionLabel}>
          <div className="workspace-surface">
            <SectionBlock
              heading={panels.sections.pendingRelances.title}
              label={panels.sections.pendingRelances.kicker}
              copy={panels.sections.pendingRelances.copy}
              items={pendingItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <SectionBlock
              heading={panels.sections.draftedRelances.title}
              label={panels.sections.draftedRelances.kicker}
              copy={panels.sections.draftedRelances.copy}
              items={draftedItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>
      ) : null}

      <section className="detail-region" aria-label={panels.detailRegionLabel}>
        <header className="detail-region-header">
          <p className="section-kicker">{panels.detailKicker}</p>
          <h2>{panels.detailHeading}</h2>
        </header>

        {selectedItem ? (
          <article className="detail-card">
            <div className="detail-card-top">
              <span className="detail-kind">{detailKind}</span>
              <span className={`state-badge state-${selectedItem.state}`}>{formatStateLabel(selectedItem.state)}</span>
            </div>
            <h3>{selectedItem.title}</h3>
            <p className="detail-summary">{selectedItem.summary}</p>
          </article>
        ) : (
          <p className="empty-panel-copy">{panels.detailEmpty}</p>
        )}

        <SupportList heading={panels.detailActivityHeading} items={recentSupport} />

        <section className="detail-support-block detail-context-block" aria-label={panels.detailSupportHeading}>
          <h4>{panels.detailSupportHeading}</h4>
          {selectedItem ? (
            <div className="detail-context-grid">
              <DetailMeta label={selectedItem.primaryLabel} value={selectedItem.primaryValue} />
              <DetailMeta label={selectedItem.secondaryLabel ?? ''} value={selectedItem.secondaryValue} />
              <DetailMeta label={selectedItem.tertiaryLabel ?? ''} value={selectedItem.tertiaryValue} />
              <DetailMeta label={selectedItem.supportLabel ?? ''} value={selectedItem.supportValue} />
            </div>
          ) : (
            <p className="empty-panel-copy">{panels.detailEmpty}</p>
          )}
        </section>
      </section>
    </div>
  );
}
