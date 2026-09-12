import { useState, useCallback, useMemo } from 'react';
import type { Filter } from '@vubon/shared-types';

export interface UseFilterOptions {
  initialFilters?: Filter[];
  maxFilters?: number;
}

export interface UseFilterReturn {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (field: string) => void;
  updateFilter: (field: string, value: unknown) => void;
  clearFilters: () => void;
  clearFilter: (field: string) => void;
  getFilter: (field: string) => Filter | undefined;
  hasFilter: (field: string) => boolean;
  filterMap: Record<string, unknown>;
  count: number;
  isEmpty: boolean;
  isMaxed: boolean;
}

export const useFilter = (options: UseFilterOptions = {}): UseFilterReturn => {
  const { initialFilters = [], maxFilters = 20 } = options;
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const addFilter = useCallback(
    (filter: Filter) => {
      setFilters((prev) => {
        if (prev.length >= maxFilters) return prev;
        const existing = prev.findIndex((f) => f.field === filter.field);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = filter;
          return updated;
        }
        return [...prev, filter];
      });
    },
    [maxFilters]
  );

  const removeFilter = useCallback(
    (field: string) => setFilters((prev) => prev.filter((f) => f.field !== field)),
    []
  );

  const updateFilter = useCallback((field: string, value: unknown) => {
    setFilters((prev) => prev.map((f) => (f.field === field ? { ...f, value } : f)));
  }, []);

  const clearFilters = useCallback(() => setFilters([]), []);
  const clearFilter = removeFilter;

  const getFilter = useCallback(
    (field: string) => filters.find((f) => f.field === field),
    [filters]
  );

  const hasFilter = useCallback(
    (field: string) => filters.some((f) => f.field === field),
    [filters]
  );

  const filterMap = useMemo(
    () => filters.reduce((acc, f) => ({ ...acc, [f.field]: f.value }), {}),
    [filters]
  );

  return {
    filters,
    setFilters,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    clearFilter,
    getFilter,
    hasFilter,
    filterMap,
    count: filters.length,
    isEmpty: filters.length === 0,
    isMaxed: filters.length >= maxFilters,
  };
};
