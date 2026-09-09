import { SORT } from '@vubon/shared-constants/src/common/sort.constants';

/**
 * Sort field type
 */
export type SortField = string;

/**
 * Sort order type
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Sort interface
 */
export interface Sort {
  field: SortField;
  order: SortOrder;
}

/**
 * Sort type
 */
export type SortType = keyof typeof SORT;
