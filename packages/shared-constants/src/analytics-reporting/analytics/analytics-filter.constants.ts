/**
 * @fileoverview Analytics filter operators and types definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Filter operators for analytics queries
 */
export enum AnalyticsFilterOperator {
  /** Equals operator */
  EQUALS = 'EQUALS',
  /** Not equals operator */
  NOT_EQUALS = 'NOT_EQUALS',
  /** Greater than operator */
  GREATER_THAN = 'GREATER_THAN',
  /** Less than operator */
  LESS_THAN = 'LESS_THAN',
  /** Greater than or equal operator */
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  /** Less than or equal operator */
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  /** Between operator (inclusive) */
  BETWEEN = 'BETWEEN',
  /** In list operator */
  IN = 'IN',
  /** Not in list operator */
  NOT_IN = 'NOT_IN',
  /** Contains substring operator */
  CONTAINS = 'CONTAINS',
  /** Starts with operator */
  STARTS_WITH = 'STARTS_WITH',
  /** Ends with operator */
  ENDS_WITH = 'ENDS_WITH',
  /** Is null operator */
  IS_NULL = 'IS_NULL',
  /** Is not null operator */
  IS_NOT_NULL = 'IS_NOT_NULL',
  /** Date range operator */
  DATE_RANGE = 'DATE_RANGE',
  /** Time range operator */
  TIME_RANGE = 'TIME_RANGE',
  /** Matches regex pattern */
  MATCHES_REGEX = 'MATCHES_REGEX',
  /** Does not match regex pattern */
  NOT_MATCHES_REGEX = 'NOT_MATCHES_REGEX',
  /** Is empty string */
  IS_EMPTY = 'IS_EMPTY',
  /** Is not empty string */
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
  /** Contains any of the values */
  CONTAINS_ANY = 'CONTAINS_ANY',
  /** Contains all of the values */
  CONTAINS_ALL = 'CONTAINS_ALL',
  /** Between dates (exclusive) */
  DATE_BETWEEN_EXCLUSIVE = 'DATE_BETWEEN_EXCLUSIVE',
  /** Time between (inclusive) */
  TIME_BETWEEN = 'TIME_BETWEEN',
  /** Within last N days */
  WITHIN_LAST_DAYS = 'WITHIN_LAST_DAYS',
  /** Within next N days */
  WITHIN_NEXT_DAYS = 'WITHIN_NEXT_DAYS',
  /** Before specific date */
  BEFORE = 'BEFORE',
  /** After specific date */
  AFTER = 'AFTER',
}

/**
 * Filter operator type classification
 */
export enum AnalyticsFilterOperatorType {
  /** Comparison operators */
  COMPARISON = 'COMPARISON',
  /** Logical operators */
  LOGICAL = 'LOGICAL',
  /** String operators */
  STRING = 'STRING',
  /** Null operators */
  NULL = 'NULL',
  /** Date/Time operators */
  DATETIME = 'DATETIME',
  /** List operators */
  LIST = 'LIST',
  /** Array operators */
  ARRAY = 'ARRAY',
  /** Regex operators */
  REGEX = 'REGEX',
}

/**
 * Filter operator category mapping
 */
export const ANALYTICS_FILTER_OPERATOR_CATEGORY: Record<
  AnalyticsFilterOperator,
  AnalyticsFilterOperatorType
> = {
  [AnalyticsFilterOperator.EQUALS]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.NOT_EQUALS]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.GREATER_THAN]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.LESS_THAN]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.GREATER_THAN_OR_EQUAL]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.LESS_THAN_OR_EQUAL]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.BETWEEN]: AnalyticsFilterOperatorType.COMPARISON,
  [AnalyticsFilterOperator.IN]: AnalyticsFilterOperatorType.LIST,
  [AnalyticsFilterOperator.NOT_IN]: AnalyticsFilterOperatorType.LIST,
  [AnalyticsFilterOperator.CONTAINS]: AnalyticsFilterOperatorType.STRING,
  [AnalyticsFilterOperator.STARTS_WITH]: AnalyticsFilterOperatorType.STRING,
  [AnalyticsFilterOperator.ENDS_WITH]: AnalyticsFilterOperatorType.STRING,
  [AnalyticsFilterOperator.IS_NULL]: AnalyticsFilterOperatorType.NULL,
  [AnalyticsFilterOperator.IS_NOT_NULL]: AnalyticsFilterOperatorType.NULL,
  [AnalyticsFilterOperator.DATE_RANGE]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.TIME_RANGE]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.MATCHES_REGEX]: AnalyticsFilterOperatorType.REGEX,
  [AnalyticsFilterOperator.NOT_MATCHES_REGEX]: AnalyticsFilterOperatorType.REGEX,
  [AnalyticsFilterOperator.IS_EMPTY]: AnalyticsFilterOperatorType.STRING,
  [AnalyticsFilterOperator.IS_NOT_EMPTY]: AnalyticsFilterOperatorType.STRING,
  [AnalyticsFilterOperator.CONTAINS_ANY]: AnalyticsFilterOperatorType.ARRAY,
  [AnalyticsFilterOperator.CONTAINS_ALL]: AnalyticsFilterOperatorType.ARRAY,
  [AnalyticsFilterOperator.DATE_BETWEEN_EXCLUSIVE]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.TIME_BETWEEN]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.WITHIN_LAST_DAYS]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.WITHIN_NEXT_DAYS]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.BEFORE]: AnalyticsFilterOperatorType.DATETIME,
  [AnalyticsFilterOperator.AFTER]: AnalyticsFilterOperatorType.DATETIME,
};

/**
 * Filter operator configuration
 */
export interface AnalyticsFilterOperatorConfig {
  label: string;
  description: string;
  symbol?: string;
  valueCount: number;
  dataTypes: ('string' | 'number' | 'date' | 'boolean' | 'array')[];
  icon?: string;
}

export const ANALYTICS_FILTER_OPERATOR_CONFIG: Record<
  AnalyticsFilterOperator,
  AnalyticsFilterOperatorConfig
> = {
  [AnalyticsFilterOperator.EQUALS]: {
    label: 'Equals',
    description: 'Value equals the specified value',
    symbol: '=',
    valueCount: 1,
    dataTypes: ['string', 'number', 'date', 'boolean'],
    icon: 'Equal',
  },
  [AnalyticsFilterOperator.NOT_EQUALS]: {
    label: 'Not Equals',
    description: 'Value does not equal the specified value',
    symbol: '!=',
    valueCount: 1,
    dataTypes: ['string', 'number', 'date', 'boolean'],
    icon: 'NotEqual',
  },
  [AnalyticsFilterOperator.GREATER_THAN]: {
    label: 'Greater Than',
    description: 'Value is greater than the specified value',
    symbol: '>',
    valueCount: 1,
    dataTypes: ['number', 'date'],
    icon: 'GreaterThan',
  },
  [AnalyticsFilterOperator.LESS_THAN]: {
    label: 'Less Than',
    description: 'Value is less than the specified value',
    symbol: '<',
    valueCount: 1,
    dataTypes: ['number', 'date'],
    icon: 'LessThan',
  },
  [AnalyticsFilterOperator.GREATER_THAN_OR_EQUAL]: {
    label: 'Greater Than or Equal',
    description: 'Value is greater than or equal to the specified value',
    symbol: '>=',
    valueCount: 1,
    dataTypes: ['number', 'date'],
    icon: 'GreaterThanOrEqual',
  },
  [AnalyticsFilterOperator.LESS_THAN_OR_EQUAL]: {
    label: 'Less Than or Equal',
    description: 'Value is less than or equal to the specified value',
    symbol: '<=',
    valueCount: 1,
    dataTypes: ['number', 'date'],
    icon: 'LessThanOrEqual',
  },
  [AnalyticsFilterOperator.BETWEEN]: {
    label: 'Between',
    description: 'Value is between two specified values (inclusive)',
    symbol: '≤ x ≤',
    valueCount: 2,
    dataTypes: ['number', 'date'],
    icon: 'Between',
  },
  [AnalyticsFilterOperator.IN]: {
    label: 'In',
    description: 'Value is in the specified list',
    symbol: '∈',
    valueCount: -1,
    dataTypes: ['string', 'number'],
    icon: 'List',
  },
  [AnalyticsFilterOperator.NOT_IN]: {
    label: 'Not In',
    description: 'Value is not in the specified list',
    symbol: '∉',
    valueCount: -1,
    dataTypes: ['string', 'number'],
    icon: 'ListX',
  },
  [AnalyticsFilterOperator.CONTAINS]: {
    label: 'Contains',
    description: 'String contains the specified substring',
    symbol: '⊃',
    valueCount: 1,
    dataTypes: ['string'],
    icon: 'Search',
  },
  [AnalyticsFilterOperator.STARTS_WITH]: {
    label: 'Starts With',
    description: 'String starts with the specified prefix',
    symbol: '^',
    valueCount: 1,
    dataTypes: ['string'],
    icon: 'AlignLeft',
  },
  [AnalyticsFilterOperator.ENDS_WITH]: {
    label: 'Ends With',
    description: 'String ends with the specified suffix',
    symbol: '$',
    valueCount: 1,
    dataTypes: ['string'],
    icon: 'AlignRight',
  },
  [AnalyticsFilterOperator.IS_NULL]: {
    label: 'Is Null',
    description: 'Value is null or undefined',
    symbol: 'null',
    valueCount: 0,
    dataTypes: ['string', 'number', 'date', 'boolean'],
    icon: 'X',
  },
  [AnalyticsFilterOperator.IS_NOT_NULL]: {
    label: 'Is Not Null',
    description: 'Value is not null or undefined',
    symbol: '!null',
    valueCount: 0,
    dataTypes: ['string', 'number', 'date', 'boolean'],
    icon: 'Check',
  },
  [AnalyticsFilterOperator.DATE_RANGE]: {
    label: 'Date Range',
    description: 'Date is within the specified range',
    symbol: '∈ [date1, date2]',
    valueCount: 2,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
  [AnalyticsFilterOperator.TIME_RANGE]: {
    label: 'Time Range',
    description: 'Time is within the specified range',
    symbol: '∈ [time1, time2]',
    valueCount: 2,
    dataTypes: ['date'],
    icon: 'Clock',
  },
  [AnalyticsFilterOperator.MATCHES_REGEX]: {
    label: 'Matches Regex',
    description: 'String matches the specified regex pattern',
    symbol: '~',
    valueCount: 1,
    dataTypes: ['string'],
    icon: 'Regex',
  },
  [AnalyticsFilterOperator.NOT_MATCHES_REGEX]: {
    label: 'Not Matches Regex',
    description: 'String does not match the specified regex pattern',
    symbol: '!~',
    valueCount: 1,
    dataTypes: ['string'],
    icon: 'RegexX',
  },
  [AnalyticsFilterOperator.IS_EMPTY]: {
    label: 'Is Empty',
    description: 'String is empty or has only whitespace',
    symbol: '""',
    valueCount: 0,
    dataTypes: ['string'],
    icon: 'X',
  },
  [AnalyticsFilterOperator.IS_NOT_EMPTY]: {
    label: 'Is Not Empty',
    description: 'String is not empty and has content',
    symbol: '!""',
    valueCount: 0,
    dataTypes: ['string'],
    icon: 'Check',
  },
  [AnalyticsFilterOperator.CONTAINS_ANY]: {
    label: 'Contains Any',
    description: 'Array contains any of the specified values',
    symbol: '∩',
    valueCount: -1,
    dataTypes: ['array'],
    icon: 'List',
  },
  [AnalyticsFilterOperator.CONTAINS_ALL]: {
    label: 'Contains All',
    description: 'Array contains all of the specified values',
    symbol: '⊇',
    valueCount: -1,
    dataTypes: ['array'],
    icon: 'ListCheck',
  },
  [AnalyticsFilterOperator.DATE_BETWEEN_EXCLUSIVE]: {
    label: 'Date Between (Exclusive)',
    description: 'Date is between two specified dates (exclusive)',
    symbol: '∈ (date1, date2)',
    valueCount: 2,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
  [AnalyticsFilterOperator.TIME_BETWEEN]: {
    label: 'Time Between',
    description: 'Time is between two specified times (inclusive)',
    symbol: '∈ [time1, time2]',
    valueCount: 2,
    dataTypes: ['date'],
    icon: 'Clock',
  },
  [AnalyticsFilterOperator.WITHIN_LAST_DAYS]: {
    label: 'Within Last Days',
    description: 'Date is within the last N days',
    symbol: '≤ N days',
    valueCount: 1,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
  [AnalyticsFilterOperator.WITHIN_NEXT_DAYS]: {
    label: 'Within Next Days',
    description: 'Date is within the next N days',
    symbol: '≥ N days',
    valueCount: 1,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
  [AnalyticsFilterOperator.BEFORE]: {
    label: 'Before',
    description: 'Date is before the specified date',
    symbol: '< date',
    valueCount: 1,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
  [AnalyticsFilterOperator.AFTER]: {
    label: 'After',
    description: 'Date is after the specified date',
    symbol: '> date',
    valueCount: 1,
    dataTypes: ['date'],
    icon: 'Calendar',
  },
};

/**
 * Filter condition type enum
 */
export enum AnalyticsFilterConditionType {
  /** And condition - all filters must match */
  AND = 'AND',
  /** Or condition - any filter can match */
  OR = 'OR',
  /** Not condition - negates the filter */
  NOT = 'NOT',
  /** And not condition - excludes matches */
  AND_NOT = 'AND_NOT',
  /** Or not condition - excludes any matches */
  OR_NOT = 'OR_NOT',
}

/**
 * Filter condition configuration
 */
export const ANALYTICS_FILTER_CONDITION_CONFIG: Record<
  AnalyticsFilterConditionType,
  { label: string; description: string; symbol: string }
> = {
  [AnalyticsFilterConditionType.AND]: {
    label: 'And',
    description: 'All conditions must match',
    symbol: '&&',
  },
  [AnalyticsFilterConditionType.OR]: {
    label: 'Or',
    description: 'Any condition can match',
    symbol: '||',
  },
  [AnalyticsFilterConditionType.NOT]: {
    label: 'Not',
    description: 'Negates the condition',
    symbol: '!',
  },
  [AnalyticsFilterConditionType.AND_NOT]: {
    label: 'And Not',
    description: 'Excludes matching conditions',
    symbol: '&& !',
  },
  [AnalyticsFilterConditionType.OR_NOT]: {
    label: 'Or Not',
    description: 'Excludes any matching conditions',
    symbol: '|| !',
  },
};

/**
 * Filter data types
 */
export enum AnalyticsFilterDataType {
  /** String data type */
  STRING = 'STRING',
  /** Number data type */
  NUMBER = 'NUMBER',
  /** Date data type */
  DATE = 'DATE',
  /** Boolean data type */
  BOOLEAN = 'BOOLEAN',
  /** Array data type */
  ARRAY = 'ARRAY',
  /** Object data type */
  OBJECT = 'OBJECT',
  /** Null data type */
  NULL = 'NULL',
}

/**
 * Filter value type
 */
export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | string[]
  | number[]
  | [string, string]
  | [number, number]
  | [Date, Date];

/**
 * Filter condition interface
 */
export interface FilterCondition {
  field: string;
  operator: AnalyticsFilterOperator;
  value: FilterValue;
}

/**
 * Filter group interface
 */
export interface FilterGroup {
  condition: AnalyticsFilterConditionType;
  filters: FilterCondition[];
}

/**
 * Get operator category
 */
export function getOperatorCategory(
  operator: AnalyticsFilterOperator
): AnalyticsFilterOperatorType {
  return ANALYTICS_FILTER_OPERATOR_CATEGORY[operator];
}

/**
 * Get operator label
 */
export function getOperatorLabel(operator: AnalyticsFilterOperator): string {
  return ANALYTICS_FILTER_OPERATOR_CONFIG[operator]?.label || operator;
}

/**
 * Get operator description
 */
export function getOperatorDescription(operator: AnalyticsFilterOperator): string {
  return ANALYTICS_FILTER_OPERATOR_CONFIG[operator]?.description || '';
}

/**
 * Get operator symbol
 */
export function getOperatorSymbol(operator: AnalyticsFilterOperator): string {
  return ANALYTICS_FILTER_OPERATOR_CONFIG[operator]?.symbol || '';
}

/**
 * Get number of values required for operator
 */
export function getOperatorValueCount(operator: AnalyticsFilterOperator): number {
  return ANALYTICS_FILTER_OPERATOR_CONFIG[operator]?.valueCount || 0;
}

/**
 * Check if operator supports data type
 */
export function operatorSupportsDataType(
  operator: AnalyticsFilterOperator,
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'array'
): boolean {
  return ANALYTICS_FILTER_OPERATOR_CONFIG[operator]?.dataTypes?.includes(dataType) || false;
}

/**
 * Get operators by category
 */
export function getOperatorsByCategory(
  category: AnalyticsFilterOperatorType
): AnalyticsFilterOperator[] {
  return Object.entries(ANALYTICS_FILTER_OPERATOR_CATEGORY)
    .filter(([_, cat]) => cat === category)
    .map(([operator]) => operator as AnalyticsFilterOperator);
}

/**
 * Get operators for data type
 */
export function getOperatorsForDataType(
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'array'
): AnalyticsFilterOperator[] {
  return Object.values(AnalyticsFilterOperator).filter((operator) =>
    operatorSupportsDataType(operator, dataType)
  );
}

/**
 * Get string operators
 */
export function getStringOperators(): AnalyticsFilterOperator[] {
  return getOperatorsForDataType('string');
}

/**
 * Get number operators
 */
export function getNumberOperators(): AnalyticsFilterOperator[] {
  return getOperatorsForDataType('number');
}

/**
 * Get date operators
 */
export function getDateOperators(): AnalyticsFilterOperator[] {
  return getOperatorsForDataType('date');
}

/**
 * Get boolean operators
 */
export function getBooleanOperators(): AnalyticsFilterOperator[] {
  return getOperatorsForDataType('boolean');
}

/**
 * Get array operators
 */
export function getArrayOperators(): AnalyticsFilterOperator[] {
  return getOperatorsForDataType('array');
}

/**
 * Check if operator requires values
 */
export function operatorRequiresValues(operator: AnalyticsFilterOperator): boolean {
  return getOperatorValueCount(operator) !== 0;
}

/**
 * Check if operator supports multiple values
 */
export function operatorSupportsMultipleValues(operator: AnalyticsFilterOperator): boolean {
  return getOperatorValueCount(operator) === -1;
}

/**
 * Create filter condition
 */
export function createFilterCondition(
  field: string,
  operator: AnalyticsFilterOperator,
  value: FilterValue
): FilterCondition {
  return {
    field,
    operator,
    value,
  };
}

/**
 * Validate filter condition
 */
export function validateFilterCondition(condition: FilterCondition): boolean {
  const { operator, value } = condition;
  const valueCount = getOperatorValueCount(operator);

  // Check value count
  if (valueCount === 0 && value !== null && value !== undefined) {
    return false;
  }
  if (valueCount === 1 && (!value || Array.isArray(value))) {
    return false;
  }
  if (valueCount === 2 && (!Array.isArray(value) || value.length !== 2)) {
    return false;
  }
  if (valueCount === -1 && (!Array.isArray(value) || value.length === 0)) {
    return false;
  }

  return true;
}

/**
 * Common filter presets
 */
export const FILTER_PRESETS = {
  /** Today filter */
  TODAY: {
    field: 'createdAt',
    operator: AnalyticsFilterOperator.DATE_RANGE,
    value: [new Date(), new Date()],
  },
  /** Last 7 days filter */
  LAST_7_DAYS: {
    field: 'createdAt',
    operator: AnalyticsFilterOperator.WITHIN_LAST_DAYS,
    value: 7,
  },
  /** Last 30 days filter */
  LAST_30_DAYS: {
    field: 'createdAt',
    operator: AnalyticsFilterOperator.WITHIN_LAST_DAYS,
    value: 30,
  },
  /** Last 90 days filter */
  LAST_90_DAYS: {
    field: 'createdAt',
    operator: AnalyticsFilterOperator.WITHIN_LAST_DAYS,
    value: 90,
  },
  /** Active users filter */
  ACTIVE_USERS: {
    field: 'status',
    operator: AnalyticsFilterOperator.EQUALS,
    value: 'active',
  },
  /** High value orders filter */
  HIGH_VALUE_ORDERS: {
    field: 'total',
    operator: AnalyticsFilterOperator.GREATER_THAN,
    value: 100,
  },
  /** Mobile users filter */
  MOBILE_USERS: {
    field: 'deviceType',
    operator: AnalyticsFilterOperator.EQUALS,
    value: 'mobile',
  },
  /** Desktop users filter */
  DESKTOP_USERS: {
    field: 'deviceType',
    operator: AnalyticsFilterOperator.EQUALS,
    value: 'desktop',
  },
  /** Completed orders filter */
  COMPLETED_ORDERS: {
    field: 'status',
    operator: AnalyticsFilterOperator.EQUALS,
    value: 'completed',
  },
  /** Pending orders filter */
  PENDING_ORDERS: {
    field: 'status',
    operator: AnalyticsFilterOperator.EQUALS,
    value: 'pending',
  },
};
