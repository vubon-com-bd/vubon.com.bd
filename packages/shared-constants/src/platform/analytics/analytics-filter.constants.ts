export const ANALYTICS_FILTER_OPERATOR = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
  STARTS_WITH: 'starts_with',
  ENDS_WITH: 'ends_with',
  GREATER_THAN: 'greater_than',
  GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
  LESS_THAN: 'less_than',
  LESS_THAN_OR_EQUAL: 'less_than_or_equal',
  IN: 'in',
  NOT_IN: 'not_in',
  BETWEEN: 'between',
  IS_NULL: 'is_null',
  IS_NOT_NULL: 'is_not_null',
} as const;

export const ANALYTICS_FILTER_LOGIC = {
  AND: 'and',
  OR: 'or',
  NOT: 'not',
} as const;

export const ANALYTICS_FILTER = {
  MAX_FILTERS_PER_QUERY: 20,
  MAX_VALUES_PER_FILTER: 100,
  MAX_NESTED_DEPTH: 3,
  VALUE_MAX_LENGTH: 255,
} as const;

export type AnalyticsFilterOperatorType =
  (typeof ANALYTICS_FILTER_OPERATOR)[keyof typeof ANALYTICS_FILTER_OPERATOR];
export type AnalyticsFilterLogicType =
  (typeof ANALYTICS_FILTER_LOGIC)[keyof typeof ANALYTICS_FILTER_LOGIC];
