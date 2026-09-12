import { SORT } from '@vubon/shared-constants/src/common/sort.constants';

/**
 * Sort field type — derived from SORT.FIELDS
 */
export type SortField = (typeof SORT.FIELDS)[keyof typeof SORT.FIELDS];

/**
 * Sort order type
 */
export type SortOrder = typeof SORT.ASC | typeof SORT.DESC;

/**
 * Sort interface
 */
export interface Sort {
  field: SortField;
  order: SortOrder;
}

/**
 * Sort type — the whole SORT constant keys
 */
export type SortType = keyof typeof SORT;
