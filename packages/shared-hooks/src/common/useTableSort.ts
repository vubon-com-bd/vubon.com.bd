import { useState, useCallback } from 'react';
import { SORT } from '@vubon/shared-constants/src/common/sort.constants';
import type { Sort, SortField, SortOrder } from '@vubon/shared-types';

export interface UseTableSortOptions {
  initialField?: SortField;
  initialOrder?: SortOrder;
  onChange?: (sort: Sort) => void;
}

export type SortIconState = 'unsorted' | 'asc' | 'desc';

export interface UseTableSortReturn {
  sort: Sort;
  toggle: (field: SortField) => void;
  setSortField: (field: SortField, order?: SortOrder) => void;
  clearSort: () => void;
  getSortIcon: (field: SortField) => SortIconState;
}

export const useTableSort = (options: UseTableSortOptions = {}): UseTableSortReturn => {
  const { onChange } = options;

  const [sort, setSort] = useState<Sort | null>(null);

  const toggle = useCallback(
    (field: SortField) => {
      setSort((prev) => {
        const next: Sort =
          prev && prev.field === field
            ? {
                field,
                order: (prev.order === SORT.ASC ? SORT.DESC : SORT.ASC) as SortOrder,
              }
            : { field, order: SORT.ASC as SortOrder };
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const setSortField = useCallback(
    (field: SortField, order: SortOrder = SORT.ASC as SortOrder) => {
      const next: Sort = { field, order };
      setSort(next);
      onChange?.(next);
    },
    [onChange]
  );

  const clearSort = useCallback(() => {
    setSort(null);
  }, []);

  const getSortIcon = useCallback(
    (field: SortField): SortIconState => {
      if (!sort || sort.field !== field) return 'unsorted';
      return sort.order === SORT.ASC ? 'asc' : 'desc';
    },
    [sort]
  );

  return {
    sort: sort ?? { field: '' as SortField, order: SORT.ASC as SortOrder },
    toggle,
    setSortField,
    clearSort,
    getSortIcon,
  };
};
