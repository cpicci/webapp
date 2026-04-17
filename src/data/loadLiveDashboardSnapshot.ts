import { supabase } from '../lib/supabase';
import type { liveDashboardSnapshot } from './liveDashboardSnapshot';

type DashboardSnapshot = typeof liveDashboardSnapshot;

export type SnapshotResult = {
  snapshot: DashboardSnapshot;
  syncedAt: string;
};

export async function loadLiveDashboardSnapshot(): Promise<SnapshotResult> {
  const { data, error } = await supabase
    .from('dashboard_snapshots')
    .select('snapshot, synced_at')
    .order('synced_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load dashboard snapshot: ${error.message}`);
  }

  if (!data?.snapshot) {
    throw new Error("Aucune donnée disponible — la synchronisation n'a pas encore tourné.");
  }

  return { snapshot: data.snapshot as DashboardSnapshot, syncedAt: data.synced_at as string };
}
