import { useEffect, useState } from 'react';

import { loadLiveDashboardSnapshot } from '../data/loadLiveDashboardSnapshot';
import { liveDashboardSnapshot } from '../data/liveDashboardSnapshot';

type DashboardSnapshot = typeof liveDashboardSnapshot;

type LiveDashboardState = {
  snapshot: DashboardSnapshot | null;
  loading: boolean;
  error: string | null;
};

export function useLiveDashboardData() {
  const [state, setState] = useState<LiveDashboardState>({
    snapshot: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        const snapshot = await loadLiveDashboardSnapshot();

        if (!active) {
          return;
        }

        setState({ snapshot, loading: false, error: null });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({
          snapshot: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown data loading error',
        });
      }
    }

    run();

    return () => {
      active = false;
    };
  }, []);

  return state;
}
