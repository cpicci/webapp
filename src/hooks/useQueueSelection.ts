import { useEffect, useState } from 'react';

import type { FollowUpItem } from '../types/dashboard';

export function useQueueSelection(items: FollowUpItem[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Auto-select first item when list changes (filter reset, initial load)
  useEffect(() => {
    if (items.length === 0) {
      setSelectedId(null);
      return;
    }
    // If current selection is still valid, keep it
    if (selectedId && items.some((item) => item.id === selectedId)) {
      return;
    }
    setSelectedId(items[0].id);
  }, [items, selectedId]);

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  return { selectedId, selectedItem, setSelectedId };
}
