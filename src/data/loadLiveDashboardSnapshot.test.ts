import { afterEach, describe, expect, it, vi } from 'vitest';

import { loadLiveDashboardSnapshot } from './loadLiveDashboardSnapshot';
import { liveDashboardSnapshot, liveDashboardSnapshotUrl } from './liveDashboardSnapshot';

describe('loadLiveDashboardSnapshot', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the runtime snapshot JSON from the asset url', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => liveDashboardSnapshot,
    } as Response);

    const snapshot = await loadLiveDashboardSnapshot();

    expect(fetchMock).toHaveBeenCalledWith(liveDashboardSnapshotUrl, { cache: 'no-store' });
    expect(snapshot.meta.sourceName).toBe('MVP Test Back Office');
    expect(snapshot.cases).toHaveLength(9);
  });

  it('rejects invalid runtime payloads instead of accepting silent drift', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meta: {}, cases: [] }),
    } as Response);

    await expect(loadLiveDashboardSnapshot()).rejects.toThrow(/invalid live dashboard snapshot/i);
  });
});
