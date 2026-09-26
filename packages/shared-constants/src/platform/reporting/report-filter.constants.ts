export const REPORT_FILTER_OPERATOR = {
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
  DATE_RANGE: 'date_range',
  RELATIVE_DATE: 'relative_date',
} as const;

export const REPORT_FILTER_LOGIC = {
  AND: 'and',
  OR: 'or',
  NOT: 'not',
} as const;

export const REPORT_FILTER_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  RANGE: 'range',
  TAG: 'tag',
} as const;

export const REPORT_FILTER = {
  MAX_FILTERS_PER_REPORT: 30,
  MAX_VALUES_PER_FILTER: 500,
  MAX_NESTED_DEPTH: 5,
  VALUE_MAX_LENGTH: 500,
  AUTO_APPLY: false,
  PERSIST_FILTERS: true,
} as const;

export type ReportFilterOperatorType =
  (typeof REPORT_FILTER_OPERATOR)[keyof typeof REPORT_FILTER_OPERATOR];
export type ReportFilterLogicType = (typeof REPORT_FILTER_LOGIC)[keyof typeof REPORT_FILTER_LOGIC];
export type ReportFilterTypeType = (typeof REPORT_FILTER_TYPE)[keyof typeof REPORT_FILTER_TYPE];
