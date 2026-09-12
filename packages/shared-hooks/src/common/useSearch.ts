import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { DEBOUNCE } from '@vubon/shared-constants/src/common/use.constants';
import type { SearchQuery, Filter, Sort } from '@vubon/shared-types';

export interface UseSearchOptions {
  debounceDelay?: number;
  initialFilters?: Filter[];
  initialSorts?: Sort[];
}

export interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  debouncedQuery: string;
  filters: Filter[];
  addFilter: (f: Filter) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
  setFilters: (filters: Filter[]) => void;
  sorts: Sort[];
  setSort: (s: Sort) => void;
  removeSort: (field: string) => void;
  clearSorts: () => void;
  setSorts: (sorts: Sort[]) => void;
  reset: () => void;
  searchQuery: SearchQuery;
  hasFilters: boolean;
  hasSorts: boolean;
  isSearching: boolean;
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const { debounceDelay = DEBOUNCE.SEARCH_DELAY, initialFilters = [], initialSorts = [] } = options;

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [sorts, setSorts] = useState<Sort[]>(initialSorts);
  const debouncedQuery = useDebounce(query, debounceDelay);

  const addFilter = useCallback((filter: Filter) => {
    setFilters((prev) => [...prev.filter((f) => f.field !== filter.field), filter]);
  }, []);

  const removeFilter = useCallback(
    (field: string) => setFilters((prev) => prev.filter((f) => f.field !== field)),
    []
  );
  const clearFilters = useCallback(() => setFilters([]), []);

  const setSort = useCallback((sort: Sort) => {
    setSorts((prev) => [...prev.filter((s) => s.field !== sort.field), sort]);
  }, []);

  const removeSort = useCallback(
    (field: string) => setSorts((prev) => prev.filter((s) => s.field !== field)),
    []
  );
  const clearSorts = useCallback(() => setSorts([]), []);

  const reset = useCallback(() => {
    setQuery('');
    setFilters(initialFilters);
    setSorts(initialSorts);
  }, [initialFilters, initialSorts]);

  const searchQuery = useMemo<SearchQuery>(
    () => ({ query: debouncedQuery, filters, sort: sorts }),
    [debouncedQuery, filters, sorts]
  );

  return {
    query,
    setQuery,
    debouncedQuery,
    filters,
    addFilter,
    removeFilter,
    clearFilters,
    setFilters,
    sorts,
    setSort,
    removeSort,
    clearSorts,
    setSorts,
    reset,
    searchQuery,
    hasFilters: filters.length > 0,
    hasSorts: sorts.length > 0,
    isSearching: query !== debouncedQuery,
  };
};
