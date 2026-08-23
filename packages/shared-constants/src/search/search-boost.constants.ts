/**
 * Search Boost Constants
 * Boost configurations for search relevance
 */

export const SEARCH_BOOST = {
  // Boost Types
  TYPES: {
    TERM: 'term',
    FIELD: 'field',
    FUNCTION: 'function',
    SCRIPT: 'script',
    WEIGHT: 'weight',
    CUSTOM: 'custom',
  } as const,

  // Boost Factors
  FACTORS: {
    MIN: 0.1,
    DEFAULT: 1.0,
    MAX: 10.0,
    INCREMENT: 0.1,
  } as const,

  // Boost Functions
  FUNCTIONS: {
    LINEAR: 'linear',
    EXPONENTIAL: 'exponential',
    LOGARITHMIC: 'logarithmic',
    SIGMOID: 'sigmoid',
    GAUSS: 'gauss',
    CUSTOM: 'custom',
  } as const,

  // Boost Modes
  MODES: {
    MULTIPLY: 'multiply',
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    FIRST: 'first',
  } as const,

  // Boost Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'field',
    DEFAULT_FACTOR: 1.0,
    DEFAULT_FUNCTION: 'linear',
    DEFAULT_MODE: 'multiply',
    DEFAULT_FIELD_BOOST: 1.0,
    DEFAULT_TERM_BOOST: 1.0,
    MAX_CUSTOM_BOOSTS: 10,
    MAX_FUNCTION_BOOSTS: 5,
  } as const,

  // Boost Limits
  LIMITS: {
    MIN_FACTOR: 0.1,
    MAX_FACTOR: 10.0,
    MAX_CUSTOM_BOOSTS: 10,
    MAX_FUNCTION_BOOSTS: 5,
    MAX_NESTED_BOOSTS: 3,
  } as const,
} as const;

// Boost Types
export type SearchBoostType = (typeof SEARCH_BOOST.TYPES)[keyof typeof SEARCH_BOOST.TYPES];

// Boost Factors
export type SearchBoostFactor = (typeof SEARCH_BOOST.FACTORS)[keyof typeof SEARCH_BOOST.FACTORS];

// Boost Functions
export type SearchBoostFunction =
  (typeof SEARCH_BOOST.FUNCTIONS)[keyof typeof SEARCH_BOOST.FUNCTIONS];

// Boost Modes
export type SearchBoostMode = (typeof SEARCH_BOOST.MODES)[keyof typeof SEARCH_BOOST.MODES];

// Boost Defaults
export type SearchBoostDefault = (typeof SEARCH_BOOST.DEFAULTS)[keyof typeof SEARCH_BOOST.DEFAULTS];

// Boost Limits
export type SearchBoostLimit = (typeof SEARCH_BOOST.LIMITS)[keyof typeof SEARCH_BOOST.LIMITS];

// Utility Functions
export function searchBoostGetTypeLabel(type: SearchBoostType): string {
  const labels: Record<SearchBoostType, string> = {
    [SEARCH_BOOST.TYPES.TERM]: 'Term Boost',
    [SEARCH_BOOST.TYPES.FIELD]: 'Field Boost',
    [SEARCH_BOOST.TYPES.FUNCTION]: 'Function Boost',
    [SEARCH_BOOST.TYPES.SCRIPT]: 'Script Boost',
    [SEARCH_BOOST.TYPES.WEIGHT]: 'Weight Boost',
    [SEARCH_BOOST.TYPES.CUSTOM]: 'Custom Boost',
  };
  return labels[type] || 'Unknown Boost Type';
}

export function searchBoostGetFunctionLabel(func: SearchBoostFunction): string {
  const labels: Record<SearchBoostFunction, string> = {
    [SEARCH_BOOST.FUNCTIONS.LINEAR]: 'Linear',
    [SEARCH_BOOST.FUNCTIONS.EXPONENTIAL]: 'Exponential',
    [SEARCH_BOOST.FUNCTIONS.LOGARITHMIC]: 'Logarithmic',
    [SEARCH_BOOST.FUNCTIONS.SIGMOID]: 'Sigmoid',
    [SEARCH_BOOST.FUNCTIONS.GAUSS]: 'Gauss',
    [SEARCH_BOOST.FUNCTIONS.CUSTOM]: 'Custom',
  };
  return labels[func] || 'Unknown Function';
}

export function searchBoostGetModeLabel(mode: SearchBoostMode): string {
  const labels: Record<SearchBoostMode, string> = {
    [SEARCH_BOOST.MODES.MULTIPLY]: 'Multiply',
    [SEARCH_BOOST.MODES.SUM]: 'Sum',
    [SEARCH_BOOST.MODES.AVG]: 'Average',
    [SEARCH_BOOST.MODES.MIN]: 'Minimum',
    [SEARCH_BOOST.MODES.MAX]: 'Maximum',
    [SEARCH_BOOST.MODES.FIRST]: 'First',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchBoostIsTermType(type: SearchBoostType): boolean {
  return type === SEARCH_BOOST.TYPES.TERM;
}

export function searchBoostIsFieldType(type: SearchBoostType): boolean {
  return type === SEARCH_BOOST.TYPES.FIELD;
}

export function searchBoostIsFunctionType(type: SearchBoostType): boolean {
  return type === SEARCH_BOOST.TYPES.FUNCTION;
}

export function searchBoostIsScriptType(type: SearchBoostType): boolean {
  return type === SEARCH_BOOST.TYPES.SCRIPT;
}

export function searchBoostIsWeightType(type: SearchBoostType): boolean {
  return type === SEARCH_BOOST.TYPES.WEIGHT;
}

export function searchBoostGetDefaultFactor(): number {
  return SEARCH_BOOST.DEFAULTS.DEFAULT_FACTOR;
}

export function searchBoostGetMinFactor(): number {
  return SEARCH_BOOST.FACTORS.MIN;
}

export function searchBoostGetMaxFactor(): number {
  return SEARCH_BOOST.FACTORS.MAX;
}

export function searchBoostGetDefaultFieldBoost(): number {
  return SEARCH_BOOST.DEFAULTS.DEFAULT_FIELD_BOOST;
}

export function searchBoostGetDefaultTermBoost(): number {
  return SEARCH_BOOST.DEFAULTS.DEFAULT_TERM_BOOST;
}
