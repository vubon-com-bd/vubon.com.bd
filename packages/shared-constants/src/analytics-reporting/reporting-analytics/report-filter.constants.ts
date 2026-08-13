/**
 * @fileoverview Report filter constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Filter operator types
 */
export enum FilterOperator {
  /** Equal to */
  EQUAL = 'EQUAL',
  /** Not equal to */
  NOT_EQUAL = 'NOT_EQUAL',
  /** Greater than */
  GREATER_THAN = 'GREATER_THAN',
  /** Less than */
  LESS_THAN = 'LESS_THAN',
  /** Greater than or equal to */
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  /** Less than or equal to */
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  /** Between (inclusive) */
  BETWEEN = 'BETWEEN',
  /** Not between (inclusive) */
  NOT_BETWEEN = 'NOT_BETWEEN',
  /** In list */
  IN = 'IN',
  /** Not in list */
  NOT_IN = 'NOT_IN',
  /** Contains substring */
  CONTAINS = 'CONTAINS',
  /** Does not contain substring */
  NOT_CONTAINS = 'NOT_CONTAINS',
  /** Starts with */
  STARTS_WITH = 'STARTS_WITH',
  /** Ends with */
  ENDS_WITH = 'ENDS_WITH',
  /** Like (pattern matching) */
  LIKE = 'LIKE',
  /** Not like */
  NOT_LIKE = 'NOT_LIKE',
  /** Is null */
  IS_NULL = 'IS_NULL',
  /** Is not null */
  IS_NOT_NULL = 'IS_NOT_NULL',
  /** Is empty string */
  IS_EMPTY = 'IS_EMPTY',
  /** Is not empty string */
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
}

/**
 * Filter data types
 */
export enum FilterDataType {
  /** String data type */
  STRING = 'STRING',
  /** Number data type */
  NUMBER = 'NUMBER',
  /** Integer data type */
  INTEGER = 'INTEGER',
  /** Float data type */
  FLOAT = 'FLOAT',
  /** Boolean data type */
  BOOLEAN = 'BOOLEAN',
  /** Date data type */
  DATE = 'DATE',
  /** Time data type */
  TIME = 'TIME',
  /** DateTime data type */
  DATETIME = 'DATETIME',
  /** Timestamp data type */
  TIMESTAMP = 'TIMESTAMP',
  /** JSON data type */
  JSON = 'JSON',
  /** Array data type */
  ARRAY = 'ARRAY',
  /** Enum data type */
  ENUM = 'ENUM',
  /** UUID data type */
  UUID = 'UUID',
  /** Email data type */
  EMAIL = 'EMAIL',
  /** Phone data type */
  PHONE = 'PHONE',
  /** URL data type */
  URL = 'URL',
  /** Currency data type */
  CURRENCY = 'CURRENCY',
  /** Percentage data type */
  PERCENTAGE = 'PERCENTAGE',
}

/**
 * Filter logic types
 */
export enum FilterLogic {
  /** And logic - all conditions must match */
  AND = 'AND',
  /** Or logic - any condition can match */
  OR = 'OR',
  /** Not logic - negates the condition */
  NOT = 'NOT',
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  /** Filter ID */
  id: string;
  /** Filter name */
  name: string;
  /** Filter description */
  description?: string;
  /** Field name */
  field: string;
  /** Data type */
  dataType: FilterDataType;
  /** Operator */
  operator: FilterOperator;
  /** Default value */
  defaultValue?: unknown;
  /** Is required */
  required: boolean;
  /** Is multi-select */
  multiSelect: boolean;
  /** Options for enum types */
  options?: Array<{ label: string; value: unknown }>;
  /** Validation rules */
  validation?: FilterValidationRules;
  /** Dependencies */
  dependencies?: FilterDependency[];
  /** Is cascading */
  cascading: boolean;
  /** Cascading parent */
  cascadingParent?: string;
}

/**
 * Filter validation rules
 */
export interface FilterValidationRules {
  /** Minimum length */
  minLength?: number;
  /** Maximum length */
  maxLength?: number;
  /** Minimum value */
  minValue?: number;
  /** Maximum value */
  maxValue?: number;
  /** Regex pattern */
  pattern?: string;
  /** Custom validation function */
  customValidation?: (value: unknown) => boolean;
  /** Error message */
  errorMessage?: string;
}

/**
 * Filter dependency
 */
export interface FilterDependency {
  /** Dependent field */
  field: string;
  /** Operator */
  operator: FilterOperator;
  /** Value */
  value: unknown;
  /** Logic */
  logic: FilterLogic;
}

/**
 * Filter group
 */
export interface FilterGroup {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Filters */
  filters: FilterConfig[];
  /** Logic */
  logic: FilterLogic;
  /** Is enabled */
  enabled: boolean;
}

/**
 * Filter operator configuration
 */
export const FILTER_OPERATOR_CONFIG: Record<
  FilterOperator,
  {
    label: string;
    description: string;
    valueCount: number;
    dataTypes: FilterDataType[];
  }
> = {
  [FilterOperator.EQUAL]: {
    label: 'Equals',
    description: 'Value equals the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.NOT_EQUAL]: {
    label: 'Not Equals',
    description: 'Value does not equal the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.GREATER_THAN]: {
    label: 'Greater Than',
    description: 'Value is greater than the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.LESS_THAN]: {
    label: 'Less Than',
    description: 'Value is less than the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.GREATER_THAN_OR_EQUAL]: {
    label: 'Greater Than or Equal',
    description: 'Value is greater than or equal to the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.LESS_THAN_OR_EQUAL]: {
    label: 'Less Than or Equal',
    description: 'Value is less than or equal to the specified value',
    valueCount: 1,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.BETWEEN]: {
    label: 'Between',
    description: 'Value is between two specified values (inclusive)',
    valueCount: 2,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.NOT_BETWEEN]: {
    label: 'Not Between',
    description: 'Value is not between two specified values (inclusive)',
    valueCount: 2,
    dataTypes: [
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
    ],
  },
  [FilterOperator.IN]: {
    label: 'In',
    description: 'Value is in the specified list',
    valueCount: -1,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.NOT_IN]: {
    label: 'Not In',
    description: 'Value is not in the specified list',
    valueCount: -1,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.CONTAINS]: {
    label: 'Contains',
    description: 'String contains the specified substring',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.NOT_CONTAINS]: {
    label: 'Not Contains',
    description: 'String does not contain the specified substring',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.STARTS_WITH]: {
    label: 'Starts With',
    description: 'String starts with the specified prefix',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.ENDS_WITH]: {
    label: 'Ends With',
    description: 'String ends with the specified suffix',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.LIKE]: {
    label: 'Like',
    description: 'String matches the specified pattern',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.NOT_LIKE]: {
    label: 'Not Like',
    description: 'String does not match the specified pattern',
    valueCount: 1,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.IS_NULL]: {
    label: 'Is Null',
    description: 'Value is null',
    valueCount: 0,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.IS_NOT_NULL]: {
    label: 'Is Not Null',
    description: 'Value is not null',
    valueCount: 0,
    dataTypes: [
      FilterDataType.STRING,
      FilterDataType.NUMBER,
      FilterDataType.INTEGER,
      FilterDataType.FLOAT,
      FilterDataType.BOOLEAN,
      FilterDataType.DATE,
      FilterDataType.TIME,
      FilterDataType.DATETIME,
      FilterDataType.TIMESTAMP,
      FilterDataType.UUID,
      FilterDataType.EMAIL,
      FilterDataType.PHONE,
      FilterDataType.URL,
      FilterDataType.CURRENCY,
      FilterDataType.PERCENTAGE,
      FilterDataType.ENUM,
    ],
  },
  [FilterOperator.IS_EMPTY]: {
    label: 'Is Empty',
    description: 'String is empty or only whitespace',
    valueCount: 0,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
  [FilterOperator.IS_NOT_EMPTY]: {
    label: 'Is Not Empty',
    description: 'String is not empty and has content',
    valueCount: 0,
    dataTypes: [FilterDataType.STRING, FilterDataType.EMAIL, FilterDataType.URL],
  },
};

/**
 * Filter data type label mapping
 */
export const FILTER_DATA_TYPE_LABELS: Record<FilterDataType, string> = {
  [FilterDataType.STRING]: 'String',
  [FilterDataType.NUMBER]: 'Number',
  [FilterDataType.INTEGER]: 'Integer',
  [FilterDataType.FLOAT]: 'Float',
  [FilterDataType.BOOLEAN]: 'Boolean',
  [FilterDataType.DATE]: 'Date',
  [FilterDataType.TIME]: 'Time',
  [FilterDataType.DATETIME]: 'DateTime',
  [FilterDataType.TIMESTAMP]: 'Timestamp',
  [FilterDataType.JSON]: 'JSON',
  [FilterDataType.ARRAY]: 'Array',
  [FilterDataType.ENUM]: 'Enum',
  [FilterDataType.UUID]: 'UUID',
  [FilterDataType.EMAIL]: 'Email',
  [FilterDataType.PHONE]: 'Phone',
  [FilterDataType.URL]: 'URL',
  [FilterDataType.CURRENCY]: 'Currency',
  [FilterDataType.PERCENTAGE]: 'Percentage',
};

/**
 * Filter sanitization settings
 */
export interface FilterSanitizationSettings {
  /** Enable sanitization */
  enableSanitization: boolean;
  /** Trim whitespace */
  trimWhitespace: boolean;
  /** Escape special characters */
  escapeSpecialChars: boolean;
  /** Remove HTML tags */
  removeHtmlTags: boolean;
  /** Max length */
  maxLength?: number;
}

/**
 * Filter permission settings
 */
export interface FilterPermissionSettings {
  /** Enable permissions */
  enablePermissions: boolean;
  /** View roles */
  viewRoles: string[];
  /** Edit roles */
  editRoles: string[];
  /** Admin roles */
  adminRoles: string[];
}

/**
 * Filter caching settings
 */
export interface FilterCacheSettings {
  /** Enable caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Cache key prefix */
  keyPrefix?: string;
  /** Invalidate on update */
  invalidateOnUpdate: boolean;
}

/**
 * Filter indexing settings
 */
export interface FilterIndexingSettings {
  /** Enable indexing */
  enableIndexing: boolean;
  /** Index fields */
  indexFields: string[];
  /** Enable full-text search */
  enableFullTextSearch: boolean;
  /** Index refresh interval in seconds */
  refreshIntervalSeconds: number;
}

/**
 * Filter constants
 */
export const FILTER_CONSTANTS = {
  /** Default operator */
  DEFAULT_OPERATOR: FilterOperator.EQUAL,
  /** Default logic */
  DEFAULT_LOGIC: FilterLogic.AND,
  /** Max filters per group */
  MAX_FILTERS_PER_GROUP: 20,
  /** Max filter groups */
  MAX_FILTER_GROUPS: 10,
  /** Max options for enum type */
  MAX_OPTIONS: 1000,
} as const;

/**
 * Get operator label
 */
export function getOperatorLabel(operator: FilterOperator): string {
  return FILTER_OPERATOR_CONFIG[operator]?.label || operator;
}

/**
 * Get operator description
 */
export function getOperatorDescription(operator: FilterOperator): string {
  return FILTER_OPERATOR_CONFIG[operator]?.description || '';
}

/**
 * Get data type label
 */
export function getDataTypeLabel(dataType: FilterDataType): string {
  return FILTER_DATA_TYPE_LABELS[dataType] || dataType;
}

/**
 * Check if operator supports data type
 */
export function operatorSupportsDataType(
  operator: FilterOperator,
  dataType: FilterDataType
): boolean {
  return FILTER_OPERATOR_CONFIG[operator]?.dataTypes.includes(dataType) || false;
}

/**
 * Get operators for data type
 */
export function getOperatorsForDataType(dataType: FilterDataType): FilterOperator[] {
  return Object.values(FilterOperator).filter((operator) =>
    operatorSupportsDataType(operator, dataType)
  );
}

/**
 * Check if filter value is valid
 */
export function isValidFilterValue(operator: FilterOperator, value: unknown): boolean {
  const config = FILTER_OPERATOR_CONFIG[operator];
  if (!config) return false;

  const valueCount = config.valueCount;

  if (valueCount === 0) {
    return value === null || value === undefined;
  }

  if (valueCount === 1) {
    return value !== null && value !== undefined && !Array.isArray(value);
  }

  if (valueCount === 2) {
    return Array.isArray(value) && value.length === 2;
  }

  if (valueCount === -1) {
    return Array.isArray(value) && value.length > 0;
  }

  return false;
}

/**
 * Validate filter value
 */
export function validateFilterValue(
  operator: FilterOperator,
  value: unknown,
  dataType: FilterDataType
): { valid: boolean; message?: string } {
  // Check if value is valid for operator
  if (!isValidFilterValue(operator, value)) {
    return { valid: false, message: 'Invalid value for operator' };
  }

  // Type specific validation
  const config = FILTER_OPERATOR_CONFIG[operator];
  if (!config) {
    return { valid: false, message: 'Operator not found' };
  }

  if (!config.dataTypes.includes(dataType)) {
    return { valid: false, message: `Operator not supported for ${dataType}` };
  }

  return { valid: true };
}
