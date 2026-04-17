import { describe, expect, it, vi } from 'vitest';

import { loadLiveDashboardSnapshot } from './loadLiveDashboardSnapshot';
import { liveDashboardSnapshot } from './liveDashboardSnapshot';

vi.mock('../lib/supabase', () => ({
  supabase: { from: vi.fn() },
}));

import { supabase } from '../lib/supabase';

function mockFrom(data: unknown) {
  vi.mocked(supabase.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      order: vi.fn().mockReturnValue({
        limit: vi.fn().mockReturnValue({
          maybeSingle: vi.fn().mockResolvedValue(data),
        }),
      }),
    }),
  } as any);
}

describe('loadLiveDashboardSnapshot', () => {
  it('returns snapshot and syncedAt from Supabase', async () => {
    mockFrom({
      data: { snapshot: liveDashboardSnapshot, synced_at: '2026-04-17T10:30:00.000Z' },
      error: null,
    });

    const result = await loadLiveDashboardSnapshot();

    expect(result.snapshot.meta.sourceName).toBe('MVP Test Back Office');
    expect(result.snapshot.cases).toHaveLength(9);
    expect(result.syncedAt).toBe('2026-04-17T10:30:00.000Z');
  });

  it('throws when no snapshot data is available', async () => {
    mockFrom({ data: null, error: null });

    await expect(loadLiveDashboardSnapshot()).rejects.toThrow(/aucune donnée disponible/i);
  });

  it('throws on Supabase query error', async () => {
    mockFrom({ data: null, error: { message: 'Connection refused' } });

    await expect(loadLiveDashboardSnapshot()).rejects.toThrow(/connection refused/i);
  });
});
