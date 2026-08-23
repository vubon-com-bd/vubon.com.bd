/**
 * Report Filter Constants
 * Configuration for filters, conditions, and query parameters
 */

export const REPORT_FILTER = {
  // Filter Types
  TYPES: {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    DATETIME: 'datetime',
    BOOLEAN: 'boolean',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    AUTOCOMPLETE: 'autocomplete',
    RANGE: 'range',
    DATE_RANGE: 'date_range',
    TIME: 'time',
    TIME_RANGE: 'time_range',
    CUSTOM: 'custom',
  } as const,

  // Filter Operators
  OPERATORS: {
    // Text operators
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    IS_EMPTY: 'is_empty',
    IS_NOT_EMPTY: 'is_not_empty',

    // Number operators
    GREATER_THAN: 'greater_than',
    GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
    LESS_THAN: 'less_than',
    LESS_THAN_OR_EQUAL: 'less_than_or_equal',
    BETWEEN: 'between',
    NOT_BETWEEN: 'not_between',

    // Date operators
    BEFORE: 'before',
    AFTER: 'after',
    ON: 'on',
    NOT_ON: 'not_on',
    BEFORE_OR_ON: 'before_or_on',
    AFTER_OR_ON: 'after_or_on',
    IN_LAST: 'in_last',
    NOT_IN_LAST: 'not_in_last',
    IN_NEXT: 'in_next',
    NOT_IN_NEXT: 'not_in_next',

    // Boolean operators
    IS_TRUE: 'is_true',
    IS_FALSE: 'is_false',

    // Array operators
    IN: 'in',
    NOT_IN: 'not_in',
    INCLUDES: 'includes',
    EXCLUDES: 'excludes',
    INTERSECTS: 'intersects',

    // Custom operators
    REGEX: 'regex',
    LIKE: 'like',
    ILIKE: 'ilike',
  } as const,

  // Filter Conditions
  CONDITIONS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    AND_NOT: 'and_not',
    OR_NOT: 'or_not',
  } as const,

  // Filter Logic
  LOGIC: {
    ALL: 'all',
    ANY: 'any',
    NONE: 'none',
    CUSTOM: 'custom',
  } as const,

  // Filter Groups
  GROUPS: {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    CUSTOM: 'custom',
  } as const,

  // Filter Data Types
  DATA_TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    INTEGER: 'integer',
    FLOAT: 'float',
    DECIMAL: 'decimal',
    BOOLEAN: 'boolean',
    DATE: 'date',
    DATETIME: 'datetime',
    TIME: 'time',
    TIMESTAMP: 'timestamp',
    JSON: 'json',
    ARRAY: 'array',
    OBJECT: 'object',
  } as const,

  // Filter Input Types
  INPUT_TYPES: {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    DATE: 'date',
    DATETIME: 'datetime',
    TIME: 'time',
    RANGE: 'range',
    SLIDER: 'slider',
    TOGGLE: 'toggle',
    AUTOCOMPLETE: 'autocomplete',
    TAGS: 'tags',
    COLOR: 'color',
    FILE: 'file',
    CUSTOM: 'custom',
  } as const,

  // Filter Operators (for UI display)
  OPERATOR_LABELS: {
    // Text operators
    equals: 'Equals',
    not_equals: 'Does not equal',
    contains: 'Contains',
    not_contains: 'Does not contain',
    starts_with: 'Starts with',
    ends_with: 'Ends with',
    is_empty: 'Is empty',
    is_not_empty: 'Is not empty',

    // Number operators
    greater_than: 'Greater than',
    greater_than_or_equal: 'Greater than or equal',
    less_than: 'Less than',
    less_than_or_equal: 'Less than or equal',
    between: 'Between',
    not_between: 'Not between',

    // Date operators
    before: 'Before',
    after: 'After',
    on: 'On',
    not_on: 'Not on',
    before_or_on: 'Before or on',
    after_or_on: 'After or on',
    in_last: 'In last',
    not_in_last: 'Not in last',
    in_next: 'In next',
    not_in_next: 'Not in next',

    // Boolean operators
    is_true: 'Is true',
    is_false: 'Is false',

    // Array operators
    in: 'In',
    not_in: 'Not in',
    includes: 'Includes',
    excludes: 'Excludes',
    intersects: 'Intersects',

    // Custom operators
    regex: 'Matches regex',
    like: 'Like',
    ilike: 'Like (case insensitive)',
  } as const,

  // Filter Defaults
  DEFAULTS: {
    OPERATOR: 'equals',
    CONDITION: 'and',
    MAX_FILTERS: 20,
    MAX_GROUP_DEPTH: 5,
    CASE_SENSITIVE: false,
    STRICT_MATCH: false,
    ALLOW_EMPTY: true,
  } as const,

  // Filter Limits
  LIMITS: {
    MAX_FILTERS: 50,
    MAX_GROUPS: 10,
    MAX_DEPTH: 10,
    MAX_VALUES: 1000,
    MAX_STRING_LENGTH: 500,
  } as const,
} as const;

// Filter Types
export type ReportFilterType = (typeof REPORT_FILTER.TYPES)[keyof typeof REPORT_FILTER.TYPES];

// Filter Operators
export type ReportFilterOperator =
  (typeof REPORT_FILTER.OPERATORS)[keyof typeof REPORT_FILTER.OPERATORS];

// Filter Conditions
export type ReportFilterCondition =
  (typeof REPORT_FILTER.CONDITIONS)[keyof typeof REPORT_FILTER.CONDITIONS];

// Filter Logic
export type ReportFilterLogic = (typeof REPORT_FILTER.LOGIC)[keyof typeof REPORT_FILTER.LOGIC];

// Filter Groups
export type ReportFilterGroup = (typeof REPORT_FILTER.GROUPS)[keyof typeof REPORT_FILTER.GROUPS];

// Filter Data Types
export type ReportFilterDataType =
  (typeof REPORT_FILTER.DATA_TYPES)[keyof typeof REPORT_FILTER.DATA_TYPES];

// Filter Input Types
export type ReportFilterInputType =
  (typeof REPORT_FILTER.INPUT_TYPES)[keyof typeof REPORT_FILTER.INPUT_TYPES];

// Utility Functions
export function reportFilterGetTypeLabel(type: ReportFilterType): string {
  const labels: Record<ReportFilterType, string> = {
    [REPORT_FILTER.TYPES.TEXT]: 'Text Filter',
    [REPORT_FILTER.TYPES.NUMBER]: 'Number Filter',
    [REPORT_FILTER.TYPES.DATE]: 'Date Filter',
    [REPORT_FILTER.TYPES.DATETIME]: 'DateTime Filter',
    [REPORT_FILTER.TYPES.BOOLEAN]: 'Boolean Filter',
    [REPORT_FILTER.TYPES.SELECT]: 'Select Filter',
    [REPORT_FILTER.TYPES.MULTI_SELECT]: 'Multi-Select Filter',
    [REPORT_FILTER.TYPES.AUTOCOMPLETE]: 'Autocomplete Filter',
    [REPORT_FILTER.TYPES.RANGE]: 'Range Filter',
    [REPORT_FILTER.TYPES.DATE_RANGE]: 'Date Range Filter',
    [REPORT_FILTER.TYPES.TIME]: 'Time Filter',
    [REPORT_FILTER.TYPES.TIME_RANGE]: 'Time Range Filter',
    [REPORT_FILTER.TYPES.CUSTOM]: 'Custom Filter',
  };
  return labels[type] || 'Unknown Filter';
}

export function reportFilterGetOperatorLabel(operator: ReportFilterOperator): string {
  return (
    REPORT_FILTER.OPERATOR_LABELS[operator as keyof typeof REPORT_FILTER.OPERATOR_LABELS] ||
    'Unknown Operator'
  );
}

export function reportFilterGetConditionLabel(condition: ReportFilterCondition): string {
  const labels: Record<ReportFilterCondition, string> = {
    [REPORT_FILTER.CONDITIONS.AND]: 'AND',
    [REPORT_FILTER.CONDITIONS.OR]: 'OR',
    [REPORT_FILTER.CONDITIONS.NOT]: 'NOT',
    [REPORT_FILTER.CONDITIONS.AND_NOT]: 'AND NOT',
    [REPORT_FILTER.CONDITIONS.OR_NOT]: 'OR NOT',
  };
  return labels[condition] || 'Unknown Condition';
}

export function reportFilterGetLogicLabel(logic: ReportFilterLogic): string {
  const labels: Record<ReportFilterLogic, string> = {
    [REPORT_FILTER.LOGIC.ALL]: 'All',
    [REPORT_FILTER.LOGIC.ANY]: 'Any',
    [REPORT_FILTER.LOGIC.NONE]: 'None',
    [REPORT_FILTER.LOGIC.CUSTOM]: 'Custom',
  };
  return labels[logic] || 'Unknown Logic';
}

export function reportFilterGetGroupLabel(group: ReportFilterGroup): string {
  const labels: Record<ReportFilterGroup, string> = {
    [REPORT_FILTER.GROUPS.BASIC]: 'Basic Filters',
    [REPORT_FILTER.GROUPS.ADVANCED]: 'Advanced Filters',
    [REPORT_FILTER.GROUPS.CUSTOM]: 'Custom Filters',
  };
  return labels[group] || 'Unknown Group';
}

export function reportFilterGetDataTypeLabel(dataType: ReportFilterDataType): string {
  const labels: Record<ReportFilterDataType, string> = {
    [REPORT_FILTER.DATA_TYPES.STRING]: 'String',
    [REPORT_FILTER.DATA_TYPES.NUMBER]: 'Number',
    [REPORT_FILTER.DATA_TYPES.INTEGER]: 'Integer',
    [REPORT_FILTER.DATA_TYPES.FLOAT]: 'Float',
    [REPORT_FILTER.DATA_TYPES.DECIMAL]: 'Decimal',
    [REPORT_FILTER.DATA_TYPES.BOOLEAN]: 'Boolean',
    [REPORT_FILTER.DATA_TYPES.DATE]: 'Date',
    [REPORT_FILTER.DATA_TYPES.DATETIME]: 'DateTime',
    [REPORT_FILTER.DATA_TYPES.TIME]: 'Time',
    [REPORT_FILTER.DATA_TYPES.TIMESTAMP]: 'Timestamp',
    [REPORT_FILTER.DATA_TYPES.JSON]: 'JSON',
    [REPORT_FILTER.DATA_TYPES.ARRAY]: 'Array',
    [REPORT_FILTER.DATA_TYPES.OBJECT]: 'Object',
  };
  return labels[dataType] || 'Unknown Data Type';
}

export function reportFilterGetInputTypeLabel(inputType: ReportFilterInputType): string {
  const labels: Record<ReportFilterInputType, string> = {
    [REPORT_FILTER.INPUT_TYPES.TEXT]: 'Text Input',
    [REPORT_FILTER.INPUT_TYPES.TEXTAREA]: 'Text Area',
    [REPORT_FILTER.INPUT_TYPES.NUMBER]: 'Number Input',
    [REPORT_FILTER.INPUT_TYPES.SELECT]: 'Select Dropdown',
    [REPORT_FILTER.INPUT_TYPES.MULTI_SELECT]: 'Multi-Select',
    [REPORT_FILTER.INPUT_TYPES.CHECKBOX]: 'Checkbox',
    [REPORT_FILTER.INPUT_TYPES.RADIO]: 'Radio Buttons',
    [REPORT_FILTER.INPUT_TYPES.DATE]: 'Date Picker',
    [REPORT_FILTER.INPUT_TYPES.DATETIME]: 'DateTime Picker',
    [REPORT_FILTER.INPUT_TYPES.TIME]: 'Time Picker',
    [REPORT_FILTER.INPUT_TYPES.RANGE]: 'Range Slider',
    [REPORT_FILTER.INPUT_TYPES.SLIDER]: 'Slider',
    [REPORT_FILTER.INPUT_TYPES.TOGGLE]: 'Toggle Switch',
    [REPORT_FILTER.INPUT_TYPES.AUTOCOMPLETE]: 'Autocomplete',
    [REPORT_FILTER.INPUT_TYPES.TAGS]: 'Tags Input',
    [REPORT_FILTER.INPUT_TYPES.COLOR]: 'Color Picker',
    [REPORT_FILTER.INPUT_TYPES.FILE]: 'File Upload',
    [REPORT_FILTER.INPUT_TYPES.CUSTOM]: 'Custom Input',
  };
  return labels[inputType] || 'Unknown Input Type';
}

export function reportFilterGetOperatorsForType(type: ReportFilterType): ReportFilterOperator[] {
  const operatorMap: Record<ReportFilterType, ReportFilterOperator[]> = {
    [REPORT_FILTER.TYPES.TEXT]: [
      REPORT_FILTER.OPERATORS.EQUALS,
      REPORT_FILTER.OPERATORS.NOT_EQUALS,
      REPORT_FILTER.OPERATORS.CONTAINS,
      REPORT_FILTER.OPERATORS.NOT_CONTAINS,
      REPORT_FILTER.OPERATORS.STARTS_WITH,
      REPORT_FILTER.OPERATORS.ENDS_WITH,
      REPORT_FILTER.OPERATORS.IS_EMPTY,
      REPORT_FILTER.OPERATORS.IS_NOT_EMPTY,
    ],
    [REPORT_FILTER.TYPES.NUMBER]: [
      REPORT_FILTER.OPERATORS.EQUALS,
      REPORT_FILTER.OPERATORS.NOT_EQUALS,
      REPORT_FILTER.OPERATORS.GREATER_THAN,
      REPORT_FILTER.OPERATORS.GREATER_THAN_OR_EQUAL,
      REPORT_FILTER.OPERATORS.LESS_THAN,
      REPORT_FILTER.OPERATORS.LESS_THAN_OR_EQUAL,
      REPORT_FILTER.OPERATORS.BETWEEN,
      REPORT_FILTER.OPERATORS.NOT_BETWEEN,
    ],
    [REPORT_FILTER.TYPES.DATE]: [
      REPORT_FILTER.OPERATORS.BEFORE,
      REPORT_FILTER.OPERATORS.AFTER,
      REPORT_FILTER.OPERATORS.ON,
      REPORT_FILTER.OPERATORS.NOT_ON,
      REPORT_FILTER.OPERATORS.BEFORE_OR_ON,
      REPORT_FILTER.OPERATORS.AFTER_OR_ON,
      REPORT_FILTER.OPERATORS.IN_LAST,
      REPORT_FILTER.OPERATORS.NOT_IN_LAST,
      REPORT_FILTER.OPERATORS.IN_NEXT,
      REPORT_FILTER.OPERATORS.NOT_IN_NEXT,
    ],
    [REPORT_FILTER.TYPES.DATETIME]: [
      REPORT_FILTER.OPERATORS.BEFORE,
      REPORT_FILTER.OPERATORS.AFTER,
      REPORT_FILTER.OPERATORS.ON,
      REPORT_FILTER.OPERATORS.NOT_ON,
      REPORT_FILTER.OPERATORS.BEFORE_OR_ON,
      REPORT_FILTER.OPERATORS.AFTER_OR_ON,
      REPORT_FILTER.OPERATORS.IN_LAST,
      REPORT_FILTER.OPERATORS.NOT_IN_LAST,
      REPORT_FILTER.OPERATORS.IN_NEXT,
      REPORT_FILTER.OPERATORS.NOT_IN_NEXT,
    ],
    [REPORT_FILTER.TYPES.BOOLEAN]: [
      REPORT_FILTER.OPERATORS.IS_TRUE,
      REPORT_FILTER.OPERATORS.IS_FALSE,
    ],
    [REPORT_FILTER.TYPES.SELECT]: [
      REPORT_FILTER.OPERATORS.EQUALS,
      REPORT_FILTER.OPERATORS.NOT_EQUALS,
      REPORT_FILTER.OPERATORS.IN,
      REPORT_FILTER.OPERATORS.NOT_IN,
    ],
    [REPORT_FILTER.TYPES.MULTI_SELECT]: [
      REPORT_FILTER.OPERATORS.IN,
      REPORT_FILTER.OPERATORS.NOT_IN,
      REPORT_FILTER.OPERATORS.INCLUDES,
      REPORT_FILTER.OPERATORS.EXCLUDES,
      REPORT_FILTER.OPERATORS.INTERSECTS,
    ],
    [REPORT_FILTER.TYPES.AUTOCOMPLETE]: [
      REPORT_FILTER.OPERATORS.EQUALS,
      REPORT_FILTER.OPERATORS.NOT_EQUALS,
      REPORT_FILTER.OPERATORS.CONTAINS,
      REPORT_FILTER.OPERATORS.STARTS_WITH,
      REPORT_FILTER.OPERATORS.ENDS_WITH,
    ],
    [REPORT_FILTER.TYPES.RANGE]: [
      REPORT_FILTER.OPERATORS.BETWEEN,
      REPORT_FILTER.OPERATORS.NOT_BETWEEN,
      REPORT_FILTER.OPERATORS.GREATER_THAN,
      REPORT_FILTER.OPERATORS.GREATER_THAN_OR_EQUAL,
      REPORT_FILTER.OPERATORS.LESS_THAN,
      REPORT_FILTER.OPERATORS.LESS_THAN_OR_EQUAL,
    ],
    [REPORT_FILTER.TYPES.DATE_RANGE]: [
      REPORT_FILTER.OPERATORS.BETWEEN,
      REPORT_FILTER.OPERATORS.NOT_BETWEEN,
      REPORT_FILTER.OPERATORS.IN_LAST,
      REPORT_FILTER.OPERATORS.NOT_IN_LAST,
      REPORT_FILTER.OPERATORS.IN_NEXT,
      REPORT_FILTER.OPERATORS.NOT_IN_NEXT,
    ],
    [REPORT_FILTER.TYPES.TIME]: [
      REPORT_FILTER.OPERATORS.BEFORE,
      REPORT_FILTER.OPERATORS.AFTER,
      REPORT_FILTER.OPERATORS.ON,
      REPORT_FILTER.OPERATORS.NOT_ON,
      REPORT_FILTER.OPERATORS.BEFORE_OR_ON,
      REPORT_FILTER.OPERATORS.AFTER_OR_ON,
    ],
    [REPORT_FILTER.TYPES.TIME_RANGE]: [
      REPORT_FILTER.OPERATORS.BETWEEN,
      REPORT_FILTER.OPERATORS.NOT_BETWEEN,
    ],
    [REPORT_FILTER.TYPES.CUSTOM]: [
      REPORT_FILTER.OPERATORS.EQUALS,
      REPORT_FILTER.OPERATORS.NOT_EQUALS,
      REPORT_FILTER.OPERATORS.CONTAINS,
      REPORT_FILTER.OPERATORS.REGEX,
      REPORT_FILTER.OPERATORS.LIKE,
      REPORT_FILTER.OPERATORS.ILIKE,
    ],
  };
  return operatorMap[type] || [];
}

export function reportFilterIsValidType(type: string): type is ReportFilterType {
  return Object.values(REPORT_FILTER.TYPES).includes(type as ReportFilterType);
}

export function reportFilterIsValidOperator(operator: string): operator is ReportFilterOperator {
  return Object.values(REPORT_FILTER.OPERATORS).includes(operator as ReportFilterOperator);
}

export function reportFilterIsValidCondition(
  condition: string
): condition is ReportFilterCondition {
  return Object.values(REPORT_FILTER.CONDITIONS).includes(condition as ReportFilterCondition);
}

export function reportFilterGetDefaultOperator(type: ReportFilterType): ReportFilterOperator {
  const defaultOperators: Record<ReportFilterType, ReportFilterOperator> = {
    [REPORT_FILTER.TYPES.TEXT]: REPORT_FILTER.OPERATORS.CONTAINS,
    [REPORT_FILTER.TYPES.NUMBER]: REPORT_FILTER.OPERATORS.EQUALS,
    [REPORT_FILTER.TYPES.DATE]: REPORT_FILTER.OPERATORS.ON,
    [REPORT_FILTER.TYPES.DATETIME]: REPORT_FILTER.OPERATORS.ON,
    [REPORT_FILTER.TYPES.BOOLEAN]: REPORT_FILTER.OPERATORS.IS_TRUE,
    [REPORT_FILTER.TYPES.SELECT]: REPORT_FILTER.OPERATORS.EQUALS,
    [REPORT_FILTER.TYPES.MULTI_SELECT]: REPORT_FILTER.OPERATORS.IN,
    [REPORT_FILTER.TYPES.AUTOCOMPLETE]: REPORT_FILTER.OPERATORS.CONTAINS,
    [REPORT_FILTER.TYPES.RANGE]: REPORT_FILTER.OPERATORS.BETWEEN,
    [REPORT_FILTER.TYPES.DATE_RANGE]: REPORT_FILTER.OPERATORS.BETWEEN,
    [REPORT_FILTER.TYPES.TIME]: REPORT_FILTER.OPERATORS.ON,
    [REPORT_FILTER.TYPES.TIME_RANGE]: REPORT_FILTER.OPERATORS.BETWEEN,
    [REPORT_FILTER.TYPES.CUSTOM]: REPORT_FILTER.OPERATORS.EQUALS,
  };
  return defaultOperators[type] || REPORT_FILTER.OPERATORS.EQUALS;
}

export function reportFilterGetMaxFilters(): number {
  return REPORT_FILTER.LIMITS.MAX_FILTERS;
}

export function reportFilterGetMaxDepth(): number {
  return REPORT_FILTER.LIMITS.MAX_DEPTH;
}
