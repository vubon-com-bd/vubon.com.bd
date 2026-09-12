import { useState, useCallback, useMemo } from 'react';
import type { Sort } from '@vubon/shared-types';
import type { SortField } from '@vubon/shared-types';
import type { SortOrder } from '@vubon/shared-types';
import { SORT } from '@vubon/shared-constants/src/common/sort.constants';

export interface UseSortOptions {
  initialSorts?: Sort[];
  multiSort?: boolean;
  maxSorts?: number;
}

export interface UseSortReturn {
  sorts: Sort[];
  setSorts: (sorts: Sort[]) => void;
  addSort: (field: SortField, order?: SortOrder) => void;
  removeSort: (field: SortField) => void;
  toggleSort: (field: SortField) => void;
  clearSorts: () => void;
  getSort: (field: SortField) => Sort | undefined;
  sortMap: Partial<Record<SortField, SortOrder>>;
  count: number;
  isEmpty: boolean;
}

export const useSort = (options: UseSortOptions = {}): UseSortReturn => {
  const { initialSorts = [], multiSort = false, maxSorts = 5 } = options;
  const [sorts, setSorts] = useState<Sort[]>(initialSorts);

  const addSort = useCallback(
    (field: SortField, order: SortOrder = SORT.ASC as SortOrder) => {
      setSorts((prev) => {
        if (!multiSort) return [{ field, order }];
        if (prev.length >= maxSorts) return prev;
        return [...prev.filter((s) => s.field !== field), { field, order }];
      });
    },
    [multiSort, maxSorts]
  );

  const removeSort = useCallback(
    (field: SortField) => setSorts((prev) => prev.filter((s) => s.field !== field)),
    []
  );

  const toggleSort = useCallback((field: SortField) => {
    setSorts((prev) => {
      const existing = prev.find((s) => s.field === field);
      if (!existing) {
        return [...prev, { field, order: SORT.ASC as SortOrder }];
      }
      if (existing.order === SORT.ASC) {
        return prev.map((s) => (s.field === field ? { ...s, order: SORT.DESC as SortOrder } : s));
      }
      return prev.filter((s) => s.field !== field);
    });
  }, []);

  const clearSorts = useCallback(() => setSorts([]), []);

  const getSort = useCallback((field: SortField) => sorts.find((s) => s.field === field), [sorts]);

  const sortMap = useMemo(() => {
    const map: Partial<Record<SortField, SortOrder>> = {};
    for (const s of sorts) map[s.field] = s.order;
    return map;
  }, [sorts]);

  return {
    sorts,
    setSorts,
    addSort,
    removeSort,
    toggleSort,
    clearSorts,
    getSort,
    sortMap,
    count: sorts.length,
    isEmpty: sorts.length === 0,
  };
};
