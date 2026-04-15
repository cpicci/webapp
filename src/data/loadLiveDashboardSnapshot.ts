import { liveDashboardSnapshotUrl } from './liveDashboardSnapshot';

function isValidSnapshot(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return Boolean(
    candidate.meta &&
      typeof candidate.meta === 'object' &&
      Array.isArray(candidate.cases) &&
      Array.isArray(candidate.relance) &&
      Array.isArray(candidate.compta),
  );
}

export async function loadLiveDashboardSnapshot() {
  const response = await fetch(liveDashboardSnapshotUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load live dashboard snapshot: ${response.status}`);
  }

  const payload = await response.json();

  if (!isValidSnapshot(payload)) {
    throw new Error('Invalid live dashboard snapshot payload');
  }

  return payload;
}
