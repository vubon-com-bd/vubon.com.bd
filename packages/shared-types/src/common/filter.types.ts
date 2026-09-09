/**
 * Filter operator type
 */
export type FilterOperator =
  'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between' | string;

/**
 * Filter interface
 */
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

/**
 * Filter type
 */
export type FilterType = string;
