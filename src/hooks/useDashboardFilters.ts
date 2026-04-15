import { useState } from 'react';

import type { PoleFilter, WorkflowStatusFilter } from '../types/dashboard';

export function useDashboardFilters() {
  const [pole, setPole] = useState<PoleFilter>('all');
  const [status, setStatus] = useState<WorkflowStatusFilter>('all');

  return {
    pole,
    status,
    setPole,
    setStatus,
  };
}
