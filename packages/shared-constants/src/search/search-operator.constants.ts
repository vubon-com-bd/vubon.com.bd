/**
 * Search Operator Constants
 * Operator definitions for search queries
 */

export const SEARCH_OPERATOR = {
  // Boolean Operators
  BOOLEAN: {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT',
    XOR: 'XOR',
    NAND: 'NAND',
    NOR: 'NOR',
  } as const,

  // Comparison Operators
  COMPARISON: {
    EQ: '=',
    NEQ: '!=',
    GT: '>',
    GTE: '>=',
    LT: '<',
    LTE: '<=',
    IN: 'IN',
    NIN: 'NIN',
  } as const,

  // String Operators
  STRING: {
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    MATCHES: 'matches',
    LIKE: 'like',
    ILIKE: 'ilike',
    REGEX: 'regex',
    FUZZY: 'fuzzy',
  } as const,

  // Numeric Operators
  NUMERIC: {
    BETWEEN: 'between',
    NOT_BETWEEN: 'not_between',
    RANGE: 'range',
  } as const,

  // Geo Operators
  GEO: {
    WITHIN: 'within',
    INTERSECTS: 'intersects',
    DISJOINT: 'disjoint',
    CONTAINS: 'contains',
    DISTANCE: 'distance',
    NEAR: 'near',
  } as const,

  // Date Operators
  DATE: {
    BEFORE: 'before',
    AFTER: 'after',
    ON: 'on',
    BETWEEN: 'between',
    IN_LAST: 'in_last',
    IN_NEXT: 'in_next',
  } as const,

  // Array Operators
  ARRAY: {
    ANY: 'any',
    ALL: 'all',
    NONE: 'none',
    SIZE: 'size',
  } as const,

  // Logical Operators
  LOGICAL: {
    EXISTS: 'exists',
    NOT_EXISTS: 'not_exists',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
  } as const,

  // Aggregation Operators
  AGGREGATION: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    MEDIAN: 'median',
    PERCENTILE: 'percentile',
  } as const,

  // Operator Priorities
  PRIORITIES: {
    NOT: 0,
    AND: 1,
    XOR: 2,
    OR: 3,
    NAND: 4,
    NOR: 5,
  } as const,
} as const;

// Boolean Operators
export type SearchBooleanOperator =
  (typeof SEARCH_OPERATOR.BOOLEAN)[keyof typeof SEARCH_OPERATOR.BOOLEAN];

// Comparison Operators
export type SearchComparisonOperator =
  (typeof SEARCH_OPERATOR.COMPARISON)[keyof typeof SEARCH_OPERATOR.COMPARISON];

// String Operators
export type SearchStringOperator =
  (typeof SEARCH_OPERATOR.STRING)[keyof typeof SEARCH_OPERATOR.STRING];

// Numeric Operators
export type SearchNumericOperator =
  (typeof SEARCH_OPERATOR.NUMERIC)[keyof typeof SEARCH_OPERATOR.NUMERIC];

// Geo Operators
export type SearchGeoOperator = (typeof SEARCH_OPERATOR.GEO)[keyof typeof SEARCH_OPERATOR.GEO];

// Date Operators
export type SearchDateOperator = (typeof SEARCH_OPERATOR.DATE)[keyof typeof SEARCH_OPERATOR.DATE];

// Array Operators
export type SearchArrayOperator =
  (typeof SEARCH_OPERATOR.ARRAY)[keyof typeof SEARCH_OPERATOR.ARRAY];

// Logical Operators
export type SearchLogicalOperator =
  (typeof SEARCH_OPERATOR.LOGICAL)[keyof typeof SEARCH_OPERATOR.LOGICAL];

// Aggregation Operators
export type SearchAggregationOperator =
  (typeof SEARCH_OPERATOR.AGGREGATION)[keyof typeof SEARCH_OPERATOR.AGGREGATION];

// Operator Priorities
export type SearchOperatorPriority =
  (typeof SEARCH_OPERATOR.PRIORITIES)[keyof typeof SEARCH_OPERATOR.PRIORITIES];

// Utility Functions
export function searchOperatorGetBooleanLabel(operator: SearchBooleanOperator): string {
  const labels: Record<SearchBooleanOperator, string> = {
    [SEARCH_OPERATOR.BOOLEAN.AND]: 'AND',
    [SEARCH_OPERATOR.BOOLEAN.OR]: 'OR',
    [SEARCH_OPERATOR.BOOLEAN.NOT]: 'NOT',
    [SEARCH_OPERATOR.BOOLEAN.XOR]: 'XOR',
    [SEARCH_OPERATOR.BOOLEAN.NAND]: 'NAND',
    [SEARCH_OPERATOR.BOOLEAN.NOR]: 'NOR',
  };
  return labels[operator] || 'Unknown Boolean Operator';
}

export function searchOperatorGetComparisonLabel(operator: SearchComparisonOperator): string {
  const labels: Record<SearchComparisonOperator, string> = {
    [SEARCH_OPERATOR.COMPARISON.EQ]: 'Equals (=)',
    [SEARCH_OPERATOR.COMPARISON.NEQ]: 'Not Equals (!=)',
    [SEARCH_OPERATOR.COMPARISON.GT]: 'Greater Than (>)',
    [SEARCH_OPERATOR.COMPARISON.GTE]: 'Greater Than or Equals (>=)',
    [SEARCH_OPERATOR.COMPARISON.LT]: 'Less Than (<)',
    [SEARCH_OPERATOR.COMPARISON.LTE]: 'Less Than or Equals (<=)',
    [SEARCH_OPERATOR.COMPARISON.IN]: 'IN',
    [SEARCH_OPERATOR.COMPARISON.NIN]: 'NIN',
  };
  return labels[operator] || 'Unknown Comparison Operator';
}

export function searchOperatorGetStringLabel(operator: SearchStringOperator): string {
  const labels: Record<SearchStringOperator, string> = {
    [SEARCH_OPERATOR.STRING.CONTAINS]: 'Contains',
    [SEARCH_OPERATOR.STRING.STARTS_WITH]: 'Starts With',
    [SEARCH_OPERATOR.STRING.ENDS_WITH]: 'Ends With',
    [SEARCH_OPERATOR.STRING.MATCHES]: 'Matches',
    [SEARCH_OPERATOR.STRING.LIKE]: 'Like',
    [SEARCH_OPERATOR.STRING.ILIKE]: 'Ilike',
    [SEARCH_OPERATOR.STRING.REGEX]: 'Regex',
    [SEARCH_OPERATOR.STRING.FUZZY]: 'Fuzzy',
  };
  return labels[operator] || 'Unknown String Operator';
}

export function searchOperatorGetGeoLabel(operator: SearchGeoOperator): string {
  const labels: Record<SearchGeoOperator, string> = {
    [SEARCH_OPERATOR.GEO.WITHIN]: 'Within',
    [SEARCH_OPERATOR.GEO.INTERSECTS]: 'Intersects',
    [SEARCH_OPERATOR.GEO.DISJOINT]: 'Disjoint',
    [SEARCH_OPERATOR.GEO.CONTAINS]: 'Contains',
    [SEARCH_OPERATOR.GEO.DISTANCE]: 'Distance',
    [SEARCH_OPERATOR.GEO.NEAR]: 'Near',
  };
  return labels[operator] || 'Unknown Geo Operator';
}

export function searchOperatorGetDateLabel(operator: SearchDateOperator): string {
  const labels: Record<SearchDateOperator, string> = {
    [SEARCH_OPERATOR.DATE.BEFORE]: 'Before',
    [SEARCH_OPERATOR.DATE.AFTER]: 'After',
    [SEARCH_OPERATOR.DATE.ON]: 'On',
    [SEARCH_OPERATOR.DATE.BETWEEN]: 'Between',
    [SEARCH_OPERATOR.DATE.IN_LAST]: 'In Last',
    [SEARCH_OPERATOR.DATE.IN_NEXT]: 'In Next',
  };
  return labels[operator] || 'Unknown Date Operator';
}

export function searchOperatorIsBoolean(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.BOOLEAN).includes(operator as SearchBooleanOperator);
}

export function searchOperatorIsComparison(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.COMPARISON).includes(operator as SearchComparisonOperator);
}

export function searchOperatorIsString(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.STRING).includes(operator as SearchStringOperator);
}

export function searchOperatorIsGeo(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.GEO).includes(operator as SearchGeoOperator);
}

export function searchOperatorIsDate(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.DATE).includes(operator as SearchDateOperator);
}

export function searchOperatorIsArray(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.ARRAY).includes(operator as SearchArrayOperator);
}

export function searchOperatorIsLogical(operator: string): boolean {
  return Object.values(SEARCH_OPERATOR.LOGICAL).includes(operator as SearchLogicalOperator);
}

export function searchOperatorGetPriority(operator: string): number {
  const priorities: Record<string, number> = {
    [SEARCH_OPERATOR.BOOLEAN.NOT]: SEARCH_OPERATOR.PRIORITIES.NOT,
    [SEARCH_OPERATOR.BOOLEAN.AND]: SEARCH_OPERATOR.PRIORITIES.AND,
    [SEARCH_OPERATOR.BOOLEAN.XOR]: SEARCH_OPERATOR.PRIORITIES.XOR,
    [SEARCH_OPERATOR.BOOLEAN.OR]: SEARCH_OPERATOR.PRIORITIES.OR,
    [SEARCH_OPERATOR.BOOLEAN.NAND]: SEARCH_OPERATOR.PRIORITIES.NAND,
    [SEARCH_OPERATOR.BOOLEAN.NOR]: SEARCH_OPERATOR.PRIORITIES.NOR,
  };
  return priorities[operator] || 0;
}
