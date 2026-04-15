import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { UserContext, getDisplayName } from './context/UserContext';
import FilterBar from './components/FilterBar';
import OperatorShell from './components/OperatorShell';
import PersistentDetail from './components/PersistentDetail';
import WorkQueue from './components/WorkQueue';
import { supabase } from './lib/supabase';
import { buildDashboardViewModel } from './data/dashboardAdapter';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import { useLiveDashboardData } from './hooks/useLiveDashboardData';
import { useQueueSelection } from './hooks/useQueueSelection';
import type { FollowUpItem } from './types/dashboard';

function classifyItems(items: FollowUpItem[]) {
  return {
    urgences: items.filter((i) => i.state === 'action-needed' || i.state === 'overdue'),
    dossiersSuivis: items.filter((i) => i.kind === 'dossier' && i.state !== 'action-needed' && i.state !== 'overdue'),
    relancesATraiter: items.filter((i) => i.kind === 'relance' && i.state !== 'drafted' && i.state !== 'action-needed' && i.state !== 'overdue'),
    relancesPreparees: items.filter((i) => i.kind === 'relance' && i.state === 'drafted'),
  };
}

type Props = {
  user: User;
};

export default function App({ user }: Props) {
  const { pole, status, setPole, setStatus } = useDashboardFilters();
  const { snapshot, loading, error } = useLiveDashboardData();

  const viewModel = snapshot
    ? buildDashboardViewModel(snapshot, { pole, status })
    : null;

  const allItems: FollowUpItem[] = viewModel
    ? [...viewModel.actionItems, ...viewModel.recentItems, ...viewModel.dossiers.filter((d) =>
        !viewModel.actionItems.some((a) => a.id === d.dossierId)
      ).map((d) => ({
        id: d.dossierId,
        kind: 'dossier' as const,
        title: d.title,
        context: `${d.copro}${d.lot ? ` · Lot ${d.lot}` : ''}`,
        pole: d.pole,
        state: d.followUpState,
        primaryDate: d.createdAt,
        secondaryDateLabel: 'Créé',
        contact: d.contactEmail,
      }))]
    : [];

  const seen = new Set<string>();
  const queueItems = allItems.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  const relanceItems: FollowUpItem[] = viewModel
    ? viewModel.relances
        .filter((r) => !viewModel.actionItems.some((a) => a.id === r.relanceId))
        .map((r) => ({
          id: r.relanceId,
          kind: 'relance' as const,
          title: r.reminder || r.relanceId,
          context: r.lot ? `Lot ${r.lot}` : '',
          pole: r.pole,
          state: r.followUpState,
          primaryDate: r.dueDate,
          secondaryDateLabel: 'Échéance',
          contact: r.owner,
        }))
    : [];

  const finalQueue = [...queueItems, ...relanceItems.filter((r) => !seen.has(r.id))];
  const { urgences, dossiersSuivis, relancesATraiter, relancesPreparees } = classifyItems(finalQueue);
  const { selectedId, selectedItem, setSelectedId } = useQueueSelection(finalQueue);

  const userContextValue = {
    user,
    displayName: getDisplayName(user),
  };

  if (loading) {
    return (
      <UserContext.Provider value={userContextValue}>
        <div className="app">
          <OperatorShell />
          <div className="app-loading">
            <p>Chargement des données…</p>
          </div>
        </div>
      </UserContext.Provider>
    );
  }

  if (error || !snapshot) {
    return (
      <UserContext.Provider value={userContextValue}>
        <div className="app">
          <OperatorShell />
          <div className="app-error">
            <p>Impossible de charger les données.</p>
            {error && <p className="app-error-detail">{error}</p>}
          </div>
        </div>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <div className="app">
        <OperatorShell />
        <FilterBar
          pole={pole}
          status={status}
          syncedAt={snapshot.meta.syncedAt}
          onPoleChange={setPole}
          onStatusChange={setStatus}
        />
        <main className="workspace">
          <WorkQueue
            urgences={urgences}
            dossiersSuivis={dossiersSuivis}
            relancesATraiter={relancesATraiter}
            relancesPreparees={relancesPreparees}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <PersistentDetail item={selectedItem} />
        </main>
      </div>
    </UserContext.Provider>
  );
}
