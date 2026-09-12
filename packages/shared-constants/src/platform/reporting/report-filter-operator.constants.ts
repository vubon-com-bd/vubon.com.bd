import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const REPORT_FILTER_OPERATOR = {
  TYPES: {
    ...COMMON_TYPES,
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    GREATER_THAN: 'greater_than',
    GREATER_THAN_EQUAL: 'greater_than_equal',
    LESS_THAN: 'less_than',
    LESS_THAN_EQUAL: 'less_than_equal',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
    BEFORE: 'before',
    AFTER: 'after',
    ON_OR_BEFORE: 'on_or_before',
    ON_OR_AFTER: 'on_or_after',
  },
} as const;
