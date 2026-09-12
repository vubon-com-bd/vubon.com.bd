import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_FILTER = {
  TYPES: {
    ...COMMON_TYPES,
    DATE: 'date',
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
  },
  FILTER_OPERATORS: {
    EQ: 'eq',
    NE: 'ne',
    GT: 'gt',
    GTE: 'gte',
    LT: 'lt',
    LTE: 'lte',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
  },
  MAX_FILTERS: 20,
  MAX_FILTER_VALUES: 100,
} as const;
