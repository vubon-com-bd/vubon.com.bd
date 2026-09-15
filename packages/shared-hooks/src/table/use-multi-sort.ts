import { useCallback, useState } from 'react';
import type { SortDirection, SortState } from './use-sort';

export function useMultiSort(initial: readonly SortState[] = []): {
  readonly sorts: readonly SortState[];
  readonly add: (field: string, direction?: SortDirection) => void;
  readonly remove: (field: string) => void;
  readonly toggle: (field: string) => void;
  readonly clear: () => void;
} {
  const [sorts, setSorts] = useState<readonly SortState[]>(initial);

  const add = useCallback((field: string, direction: SortDirection = 'asc') => {
    setSorts((prev) =>
      prev.some((s) => s.field === field) ? prev : [...prev, { field, direction }]
    );
  }, []);
  const remove = useCallback((field: string) => {
    setSorts((prev) => prev.filter((s) => s.field !== field));
  }, []);
  const toggle = useCallback((field: string) => {
    setSorts((prev) => {
      const existing = prev.find((s) => s.field === field);
      if (!existing) return [...prev, { field, direction: 'asc' }];
      if (existing.direction === 'asc') {
        return prev.map((s) => (s.field === field ? { field, direction: 'desc' as const } : s));
      }
      return prev.filter((s) => s.field !== field);
    });
  }, []);
  const clear = useCallback(() => setSorts([]), []);

  return { sorts, add, remove, toggle, clear };
}
