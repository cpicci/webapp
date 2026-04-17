import { useEffect, useState } from 'react';

import { loadLiveDashboardSnapshot } from '../data/loadLiveDashboardSnapshot';
import { liveDashboardSnapshot } from '../data/liveDashboardSnapshot';

type DashboardSnapshot = typeof liveDashboardSnapshot;

type LiveDashboardState = {
  snapshot: DashboardSnapshot | null;
  syncedAt: string | null;
  loading: boolean;
  error: string | null;
};

const POLL_INTERVAL_MS = 5 * 60 * 1000;

export function useLiveDashboardData() {
  const [state, setState] = useState<LiveDashboardState>({
    snapshot: null,
    syncedAt: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        const { snapshot, syncedAt } = await loadLiveDashboardSnapshot();
        if (!active) return;
        setState({ snapshot, syncedAt, loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setState({
          snapshot: null,
          syncedAt: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown data loading error',
        });
      }
    }

    run();
    const timer = setInterval(run, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return state;
}
