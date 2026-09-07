import { FILTER } from '@vubon/shared-constants';

export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between';

export interface Filter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export type FilterType = keyof typeof FILTER;
