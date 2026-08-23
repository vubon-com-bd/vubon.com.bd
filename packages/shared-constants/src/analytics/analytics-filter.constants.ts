/**
 * Analytics Filter Constants
 * Filter types and operators for analytics data queries
 */

export const ANALYTICS_FILTER = {
  // Filter Operators
  OPERATORS: {
    // Comparison Operators
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    GREATER_THAN_OR_EQUALS: 'greater_than_or_equals',
    LESS_THAN: 'less_than',
    LESS_THAN_OR_EQUALS: 'less_than_or_equals',
    BETWEEN: 'between',
    NOT_BETWEEN: 'not_between',

    // String Operators
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    MATCHES_REGEX: 'matches_regex',

    // Set Operators
    IN: 'in',
    NOT_IN: 'not_in',
    IS_EMPTY: 'is_empty',
    IS_NOT_EMPTY: 'is_not_empty',

    // Null Operators
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',

    // Logical Operators
    AND: 'and',
    OR: 'or',
    NOT: 'not',
  } as const,

  // Filter Data Types
  DATA_TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    DATE: 'date',
    DATE_TIME: 'date_time',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
  } as const,

  // Filter Categories
  CATEGORIES: {
    // User Filters
    USER: 'user',
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
    USER_STATUS: 'user_status',
    USER_SEGMENT: 'user_segment',

    // Session Filters
    SESSION: 'session',
    SESSION_ID: 'session_id',
    SESSION_TYPE: 'session_type',
    SESSION_STATUS: 'session_status',

    // Location Filters
    LOCATION: 'location',
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    TIMEZONE: 'timezone',

    // Device Filters
    DEVICE: 'device',
    DEVICE_TYPE: 'device_type',
    DEVICE_OS: 'device_os',
    DEVICE_BROWSER: 'device_browser',

    // Traffic Filters
    TRAFFIC: 'traffic',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',

    // Time Filters
    TIME: 'time',
    DATE: 'date',
    DATE_RANGE: 'date_range',
    HOUR: 'hour',
    DAY_OF_WEEK: 'day_of_week',

    // Product Filters
    PRODUCT: 'product',
    PRODUCT_ID: 'product_id',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_BRAND: 'product_brand',
    PRODUCT_PRICE: 'product_price',

    // Order Filters
    ORDER: 'order',
    ORDER_ID: 'order_id',
    ORDER_STATUS: 'order_status',
    ORDER_TYPE: 'order_type',

    // Event Filters
    EVENT: 'event',
    EVENT_CATEGORY: 'event_category',
    EVENT_ACTION: 'event_action',
    EVENT_LABEL: 'event_label',
  } as const,

  // Filter Logic Types
  LOGIC_TYPES: {
    INCLUSIVE: 'inclusive',
    EXCLUSIVE: 'exclusive',
    COMPOUND: 'compound',
    NESTED: 'nested',
  } as const,

  // Filter Match Types
  MATCH_TYPES: {
    EXACT: 'exact',
    PARTIAL: 'partial',
    FUZZY: 'fuzzy',
    REGEX: 'regex',
  } as const,

  // Filter Priority
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Filter Scope
  SCOPE: {
    GLOBAL: 'global',
    ORGANIZATION: 'organization',
    TEAM: 'team',
    USER: 'user',
    SESSION: 'session',
  } as const,
} as const;

// Analytics Filter Operators
export type AnalyticsFilterOperator =
  (typeof ANALYTICS_FILTER.OPERATORS)[keyof typeof ANALYTICS_FILTER.OPERATORS];

// Analytics Filter Data Types
export type AnalyticsFilterDataType =
  (typeof ANALYTICS_FILTER.DATA_TYPES)[keyof typeof ANALYTICS_FILTER.DATA_TYPES];

// Analytics Filter Categories
export type AnalyticsFilterCategory =
  (typeof ANALYTICS_FILTER.CATEGORIES)[keyof typeof ANALYTICS_FILTER.CATEGORIES];

// Analytics Filter Logic Types
export type AnalyticsFilterLogicType =
  (typeof ANALYTICS_FILTER.LOGIC_TYPES)[keyof typeof ANALYTICS_FILTER.LOGIC_TYPES];

// Analytics Filter Match Types
export type AnalyticsFilterMatchType =
  (typeof ANALYTICS_FILTER.MATCH_TYPES)[keyof typeof ANALYTICS_FILTER.MATCH_TYPES];

// Analytics Filter Priority
export type AnalyticsFilterPriority =
  (typeof ANALYTICS_FILTER.PRIORITY)[keyof typeof ANALYTICS_FILTER.PRIORITY];

// Analytics Filter Scope
export type AnalyticsFilterScope =
  (typeof ANALYTICS_FILTER.SCOPE)[keyof typeof ANALYTICS_FILTER.SCOPE];

// Analytics Filter Operator Labels
export function getAnalyticsFilterOperatorLabel(operator: AnalyticsFilterOperator): string {
  const labels: Record<AnalyticsFilterOperator, string> = {
    [ANALYTICS_FILTER.OPERATORS.EQUALS]: 'Equals',
    [ANALYTICS_FILTER.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [ANALYTICS_FILTER.OPERATORS.GREATER_THAN]: 'Greater Than',
    [ANALYTICS_FILTER.OPERATORS.GREATER_THAN_OR_EQUALS]: 'Greater Than or Equals',
    [ANALYTICS_FILTER.OPERATORS.LESS_THAN]: 'Less Than',
    [ANALYTICS_FILTER.OPERATORS.LESS_THAN_OR_EQUALS]: 'Less Than or Equals',
    [ANALYTICS_FILTER.OPERATORS.BETWEEN]: 'Between',
    [ANALYTICS_FILTER.OPERATORS.NOT_BETWEEN]: 'Not Between',
    [ANALYTICS_FILTER.OPERATORS.CONTAINS]: 'Contains',
    [ANALYTICS_FILTER.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [ANALYTICS_FILTER.OPERATORS.STARTS_WITH]: 'Starts With',
    [ANALYTICS_FILTER.OPERATORS.ENDS_WITH]: 'Ends With',
    [ANALYTICS_FILTER.OPERATORS.MATCHES_REGEX]: 'Matches Regex',
    [ANALYTICS_FILTER.OPERATORS.IN]: 'In',
    [ANALYTICS_FILTER.OPERATORS.NOT_IN]: 'Not In',
    [ANALYTICS_FILTER.OPERATORS.IS_EMPTY]: 'Is Empty',
    [ANALYTICS_FILTER.OPERATORS.IS_NOT_EMPTY]: 'Is Not Empty',
    [ANALYTICS_FILTER.OPERATORS.IS_NULL]: 'Is Null',
    [ANALYTICS_FILTER.OPERATORS.IS_NOT_NULL]: 'Is Not Null',
    [ANALYTICS_FILTER.OPERATORS.AND]: 'And',
    [ANALYTICS_FILTER.OPERATORS.OR]: 'Or',
    [ANALYTICS_FILTER.OPERATORS.NOT]: 'Not',
  };
  return labels[operator] || 'Unknown';
}

// Analytics Filter Data Type Labels
export function getAnalyticsFilterDataTypeLabel(dataType: AnalyticsFilterDataType): string {
  const labels: Record<AnalyticsFilterDataType, string> = {
    [ANALYTICS_FILTER.DATA_TYPES.STRING]: 'String',
    [ANALYTICS_FILTER.DATA_TYPES.NUMBER]: 'Number',
    [ANALYTICS_FILTER.DATA_TYPES.DATE]: 'Date',
    [ANALYTICS_FILTER.DATA_TYPES.DATE_TIME]: 'Date & Time',
    [ANALYTICS_FILTER.DATA_TYPES.BOOLEAN]: 'Boolean',
    [ANALYTICS_FILTER.DATA_TYPES.ARRAY]: 'Array',
    [ANALYTICS_FILTER.DATA_TYPES.OBJECT]: 'Object',
  };
  return labels[dataType] || 'Unknown';
}

// Analytics Filter Category Labels
export function getAnalyticsFilterCategoryLabel(category: AnalyticsFilterCategory): string {
  const labels: Record<AnalyticsFilterCategory, string> = {
    [ANALYTICS_FILTER.CATEGORIES.USER]: 'User',
    [ANALYTICS_FILTER.CATEGORIES.USER_ID]: 'User ID',
    [ANALYTICS_FILTER.CATEGORIES.USER_TYPE]: 'User Type',
    [ANALYTICS_FILTER.CATEGORIES.USER_STATUS]: 'User Status',
    [ANALYTICS_FILTER.CATEGORIES.USER_SEGMENT]: 'User Segment',
    [ANALYTICS_FILTER.CATEGORIES.SESSION]: 'Session',
    [ANALYTICS_FILTER.CATEGORIES.SESSION_ID]: 'Session ID',
    [ANALYTICS_FILTER.CATEGORIES.SESSION_TYPE]: 'Session Type',
    [ANALYTICS_FILTER.CATEGORIES.SESSION_STATUS]: 'Session Status',
    [ANALYTICS_FILTER.CATEGORIES.LOCATION]: 'Location',
    [ANALYTICS_FILTER.CATEGORIES.COUNTRY]: 'Country',
    [ANALYTICS_FILTER.CATEGORIES.REGION]: 'Region',
    [ANALYTICS_FILTER.CATEGORIES.CITY]: 'City',
    [ANALYTICS_FILTER.CATEGORIES.TIMEZONE]: 'Timezone',
    [ANALYTICS_FILTER.CATEGORIES.DEVICE]: 'Device',
    [ANALYTICS_FILTER.CATEGORIES.DEVICE_TYPE]: 'Device Type',
    [ANALYTICS_FILTER.CATEGORIES.DEVICE_OS]: 'Device OS',
    [ANALYTICS_FILTER.CATEGORIES.DEVICE_BROWSER]: 'Device Browser',
    [ANALYTICS_FILTER.CATEGORIES.TRAFFIC]: 'Traffic',
    [ANALYTICS_FILTER.CATEGORIES.SOURCE]: 'Source',
    [ANALYTICS_FILTER.CATEGORIES.MEDIUM]: 'Medium',
    [ANALYTICS_FILTER.CATEGORIES.CAMPAIGN]: 'Campaign',
    [ANALYTICS_FILTER.CATEGORIES.CHANNEL]: 'Channel',
    [ANALYTICS_FILTER.CATEGORIES.TIME]: 'Time',
    [ANALYTICS_FILTER.CATEGORIES.DATE]: 'Date',
    [ANALYTICS_FILTER.CATEGORIES.DATE_RANGE]: 'Date Range',
    [ANALYTICS_FILTER.CATEGORIES.HOUR]: 'Hour',
    [ANALYTICS_FILTER.CATEGORIES.DAY_OF_WEEK]: 'Day of Week',
    [ANALYTICS_FILTER.CATEGORIES.PRODUCT]: 'Product',
    [ANALYTICS_FILTER.CATEGORIES.PRODUCT_ID]: 'Product ID',
    [ANALYTICS_FILTER.CATEGORIES.PRODUCT_CATEGORY]: 'Product Category',
    [ANALYTICS_FILTER.CATEGORIES.PRODUCT_BRAND]: 'Product Brand',
    [ANALYTICS_FILTER.CATEGORIES.PRODUCT_PRICE]: 'Product Price',
    [ANALYTICS_FILTER.CATEGORIES.ORDER]: 'Order',
    [ANALYTICS_FILTER.CATEGORIES.ORDER_ID]: 'Order ID',
    [ANALYTICS_FILTER.CATEGORIES.ORDER_STATUS]: 'Order Status',
    [ANALYTICS_FILTER.CATEGORIES.ORDER_TYPE]: 'Order Type',
    [ANALYTICS_FILTER.CATEGORIES.EVENT]: 'Event',
    [ANALYTICS_FILTER.CATEGORIES.EVENT_CATEGORY]: 'Event Category',
    [ANALYTICS_FILTER.CATEGORIES.EVENT_ACTION]: 'Event Action',
    [ANALYTICS_FILTER.CATEGORIES.EVENT_LABEL]: 'Event Label',
  };
  return labels[category] || 'Unknown';
}

// Analytics Filter Logic Type Labels
export function getAnalyticsFilterLogicTypeLabel(logicType: AnalyticsFilterLogicType): string {
  const labels: Record<AnalyticsFilterLogicType, string> = {
    [ANALYTICS_FILTER.LOGIC_TYPES.INCLUSIVE]: 'Inclusive',
    [ANALYTICS_FILTER.LOGIC_TYPES.EXCLUSIVE]: 'Exclusive',
    [ANALYTICS_FILTER.LOGIC_TYPES.COMPOUND]: 'Compound',
    [ANALYTICS_FILTER.LOGIC_TYPES.NESTED]: 'Nested',
  };
  return labels[logicType] || 'Unknown';
}

// Analytics Filter Match Type Labels
export function getAnalyticsFilterMatchTypeLabel(matchType: AnalyticsFilterMatchType): string {
  const labels: Record<AnalyticsFilterMatchType, string> = {
    [ANALYTICS_FILTER.MATCH_TYPES.EXACT]: 'Exact',
    [ANALYTICS_FILTER.MATCH_TYPES.PARTIAL]: 'Partial',
    [ANALYTICS_FILTER.MATCH_TYPES.FUZZY]: 'Fuzzy',
    [ANALYTICS_FILTER.MATCH_TYPES.REGEX]: 'Regex',
  };
  return labels[matchType] || 'Unknown';
}

// Analytics Filter Priority Labels
export function getAnalyticsFilterPriorityLabel(priority: AnalyticsFilterPriority): string {
  const labels: Record<AnalyticsFilterPriority, string> = {
    [ANALYTICS_FILTER.PRIORITY.HIGH]: 'High',
    [ANALYTICS_FILTER.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_FILTER.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Analytics Filter Scope Labels
export function getAnalyticsFilterScopeLabel(scope: AnalyticsFilterScope): string {
  const labels: Record<AnalyticsFilterScope, string> = {
    [ANALYTICS_FILTER.SCOPE.GLOBAL]: 'Global',
    [ANALYTICS_FILTER.SCOPE.ORGANIZATION]: 'Organization',
    [ANALYTICS_FILTER.SCOPE.TEAM]: 'Team',
    [ANALYTICS_FILTER.SCOPE.USER]: 'User',
    [ANALYTICS_FILTER.SCOPE.SESSION]: 'Session',
  };
  return labels[scope] || 'Unknown';
}

// Check if operator is comparison
export function isAnalyticsFilterComparisonOperator(operator: AnalyticsFilterOperator): boolean {
  const comparisonOperators: AnalyticsFilterOperator[] = [
    ANALYTICS_FILTER.OPERATORS.EQUALS,
    ANALYTICS_FILTER.OPERATORS.NOT_EQUALS,
    ANALYTICS_FILTER.OPERATORS.GREATER_THAN,
    ANALYTICS_FILTER.OPERATORS.GREATER_THAN_OR_EQUALS,
    ANALYTICS_FILTER.OPERATORS.LESS_THAN,
    ANALYTICS_FILTER.OPERATORS.LESS_THAN_OR_EQUALS,
    ANALYTICS_FILTER.OPERATORS.BETWEEN,
    ANALYTICS_FILTER.OPERATORS.NOT_BETWEEN,
  ];
  return comparisonOperators.includes(operator);
}

// Check if operator is string
export function isAnalyticsFilterStringOperator(operator: AnalyticsFilterOperator): boolean {
  const stringOperators: AnalyticsFilterOperator[] = [
    ANALYTICS_FILTER.OPERATORS.CONTAINS,
    ANALYTICS_FILTER.OPERATORS.NOT_CONTAINS,
    ANALYTICS_FILTER.OPERATORS.STARTS_WITH,
    ANALYTICS_FILTER.OPERATORS.ENDS_WITH,
    ANALYTICS_FILTER.OPERATORS.MATCHES_REGEX,
  ];
  return stringOperators.includes(operator);
}

// Check if operator is set
export function isAnalyticsFilterSetOperator(operator: AnalyticsFilterOperator): boolean {
  const setOperators: AnalyticsFilterOperator[] = [
    ANALYTICS_FILTER.OPERATORS.IN,
    ANALYTICS_FILTER.OPERATORS.NOT_IN,
    ANALYTICS_FILTER.OPERATORS.IS_EMPTY,
    ANALYTICS_FILTER.OPERATORS.IS_NOT_EMPTY,
  ];
  return setOperators.includes(operator);
}

// Check if operator is null
export function isAnalyticsFilterNullOperator(operator: AnalyticsFilterOperator): boolean {
  const nullOperators: AnalyticsFilterOperator[] = [
    ANALYTICS_FILTER.OPERATORS.IS_NULL,
    ANALYTICS_FILTER.OPERATORS.IS_NOT_NULL,
  ];
  return nullOperators.includes(operator);
}

// Check if operator is logical
export function isAnalyticsFilterLogicalOperator(operator: AnalyticsFilterOperator): boolean {
  const logicalOperators: AnalyticsFilterOperator[] = [
    ANALYTICS_FILTER.OPERATORS.AND,
    ANALYTICS_FILTER.OPERATORS.OR,
    ANALYTICS_FILTER.OPERATORS.NOT,
  ];
  return logicalOperators.includes(operator);
}
