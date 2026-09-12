import { FILTER } from '@vubon/shared-constants/src/common/filter.constants';

/**
 * Filter operator type — derived from FILTER.OPERATORS
 */
export type FilterOperator = (typeof FILTER.OPERATORS)[keyof typeof FILTER.OPERATORS];

/**
 * Filter logic type
 */
export type FilterLogic = (typeof FILTER.LOGIC)[keyof typeof FILTER.LOGIC];

/**
 * Filter interface
 */
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: unknown;
  logic?: FilterLogic;
}

/**
 * Filter type — keys of FILTER
 */
export type FilterType = keyof typeof FILTER;
