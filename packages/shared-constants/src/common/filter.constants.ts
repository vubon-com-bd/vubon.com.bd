/**
 * Filter Constants
 * @module shared-constants/common/filter.constants
 */

export const FILTER = {
  // Filter operators
  OPERATORS: {
    EQ: 'eq', // equals
    NE: 'ne', // not equals
    GT: 'gt', // greater than
    GTE: 'gte', // greater than or equal
    LT: 'lt', // less than
    LTE: 'lte', // less than or equal
    IN: 'in', // in array
    NIN: 'nin', // not in array
    LIKE: 'like', // contains
    NOT_LIKE: 'not_like', // does not contain
    STARTS: 'starts', // starts with
    ENDS: 'ends', // ends with
    BETWEEN: 'between', // between values
    IS_NULL: 'is_null', // is null
    IS_NOT_NULL: 'is_not_null', // is not null
    IS_EMPTY: 'is_empty', // is empty
    IS_NOT_EMPTY: 'is_not_empty', // is not empty
    CONTAINS: 'contains', // array contains
    NOT_CONTAINS: 'not_contains', // array does not contain
  } as const,

  // Filter types
  TYPES: {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    DATE_RANGE: 'date_range',
    TIME: 'time',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SWITCH: 'switch',
    SLIDER: 'slider',
    RANGE: 'range',
    SEARCH: 'search',
    AUTOCOMPLETE: 'autocomplete',
    CUSTOM: 'custom',
  } as const,

  // Filter logic
  LOGIC: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
  } as const,

  // Filter groups
  GROUPS: {
    PRICE: 'price',
    CATEGORY: 'category',
    BRAND: 'brand',
    RATING: 'rating',
    STATUS: 'status',
    DATE: 'date',
    LOCATION: 'location',
    SIZE: 'size',
    COLOR: 'color',
    MATERIAL: 'material',
    FEATURES: 'features',
    AVAILABILITY: 'availability',
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
  } as const,

  // Filter UI
  UI: {
    COLLAPSIBLE: true,
    SEARCHABLE: true,
    MULTI_SELECT: true,
    CLEARABLE: true,
    APPLY_BUTTON: false,
    LIVE_UPDATE: true,
    DEBOUNCE_MS: 300,
  },

  // Filter modes
  MODES: {
    STRICT: 'strict',
    LENIENT: 'lenient',
    AUTO: 'auto',
  } as const,

  // Default values
  DEFAULT: {
    OPERATOR: 'eq',
    LOGIC: 'and',
    MODE: 'auto',
  },
} as const;

export type FilterOperator = (typeof FILTER.OPERATORS)[keyof typeof FILTER.OPERATORS];
export type FilterType = (typeof FILTER.TYPES)[keyof typeof FILTER.TYPES];
export type FilterLogic = (typeof FILTER.LOGIC)[keyof typeof FILTER.LOGIC];
export type FilterGroup = (typeof FILTER.GROUPS)[keyof typeof FILTER.GROUPS];
export type FilterMode = (typeof FILTER.MODES)[keyof typeof FILTER.MODES];
