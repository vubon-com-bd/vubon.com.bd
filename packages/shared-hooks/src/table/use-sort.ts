import { useCallback, useState } from 'react';

export type SortDirection = 'asc' | 'desc';
export interface SortState {
  readonly field: string;
  readonly direction: SortDirection;
}

export function useSort(initial?: SortState): {
  readonly sort: SortState | null;
  readonly toggle: (field: string) => void;
  readonly set: (state: SortState | null) => void;
  readonly clear: () => void;
} {
  const [sort, setSort] = useState<SortState | null>(initial ?? null);

  const toggle = useCallback((field: string) => {
    setSort((prev) => {
      if (!prev || prev.field !== field) return { field, direction: 'asc' };
      if (prev.direction === 'asc') return { field, direction: 'desc' };
      return null;
    });
  }, []);

  return { sort, toggle, set: setSort, clear: () => setSort(null) };
}
