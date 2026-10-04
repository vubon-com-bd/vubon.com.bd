import { useCallback, useMemo, useState } from 'react';

export type FilterValue = string | number | boolean | null | undefined;
export type FilterMap = Record<string, FilterValue>;

export function useFilter(initial: FilterMap = {}): {
  readonly filters: FilterMap;
  readonly set: (key: string, value: FilterValue) => void;
  readonly remove: (key: string) => void;
  readonly clear: () => void;
  readonly activeCount: number;
} {
  const [filters, setFilters] = useState<FilterMap>(initial);

  const set = useCallback((key: string, value: FilterValue) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);
  const remove = useCallback((key: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);
  const clear = useCallback(() => setFilters({}), []);

  const activeCount = useMemo(
    () => Object.values(filters).filter((v) => v !== null && v !== undefined && v !== '').length,
    [filters]
  );

  return { filters, set, remove, clear, activeCount };
}
