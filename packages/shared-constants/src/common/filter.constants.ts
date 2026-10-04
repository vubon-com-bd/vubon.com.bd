export const FILTER_OPERATOR = {
  EQ: 'eq',
  NE: 'ne',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  IN: 'in',
  NIN: 'nin',
  LIKE: 'like',
  ILIKE: 'ilike',
  BETWEEN: 'between',
  IS_NULL: 'isNull',
  IS_NOT_NULL: 'isNotNull',
} as const;

export const FILTER_LOGIC = {
  AND: 'and',
  OR: 'or',
  NOT: 'not',
} as const;

export type FilterOperatorType = (typeof FILTER_OPERATOR)[keyof typeof FILTER_OPERATOR];
export type FilterLogicType = (typeof FILTER_LOGIC)[keyof typeof FILTER_LOGIC];
