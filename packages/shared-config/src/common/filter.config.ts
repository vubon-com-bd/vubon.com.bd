import { FILTER } from '@vubon/shared-constants/src/common/filter.constants';

export const filterConfig = {
  maxFilters: 20,
  maxFilterValues: 50,
  operators: Object.values(FILTER.OPERATORS),
  defaultOperator: FILTER.OPERATORS.EQ,
} as const;
