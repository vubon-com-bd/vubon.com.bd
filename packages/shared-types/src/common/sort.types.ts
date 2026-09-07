import { SORT } from '@vubon/shared-constants';

export type SortField = string;
export type SortOrder = 'asc' | 'desc';

export interface Sort {
  field: SortField;
  order: SortOrder;
}

export type SortType = keyof typeof SORT;
