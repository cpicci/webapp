import { describe, expect, it, vi } from 'vitest';

import { loadLiveDashboardSnapshot } from './loadLiveDashboardSnapshot';
import { liveDashboardSnapshot } from './liveDashboardSnapshot';

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from '../lib/supabase';

describe('loadLiveDashboardSnapshot', () => {
  it('loads the snapshot from Supabase', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: { snapshot: liveDashboardSnapshot },
              error: null,
            }),
          }),
        }),
      }),
    } as any);

    const snapshot = await loadLiveDashboardSnapshot();

    expect(snapshot.meta.sourceName).toBe('MVP Test Back Office');
    expect(snapshot.cases).toHaveLength(9);
  });

  it('throws when no snapshot data is available', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      }),
    } as any);

    await expect(loadLiveDashboardSnapshot()).rejects.toThrow(/aucune donnée disponible/i);
  });
});
