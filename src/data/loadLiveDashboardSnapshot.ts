import { supabase } from '../lib/supabase';
import type { liveDashboardSnapshot } from './liveDashboardSnapshot';

type DashboardSnapshot = typeof liveDashboardSnapshot;

export async function loadLiveDashboardSnapshot(): Promise<DashboardSnapshot> {
  const { data, error } = await supabase
    .from('dashboard_snapshots')
    .select('snapshot')
    .order('synced_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load dashboard snapshot: ${error.message}`);
  }

  if (!data?.snapshot) {
    throw new Error('Aucune donnée disponible — la synchronisation n\'a pas encore tourné.');
  }

  return data.snapshot as DashboardSnapshot;
}
