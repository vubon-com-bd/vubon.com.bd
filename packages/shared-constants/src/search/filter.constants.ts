/**
 * Filter Constants
 * Filter configurations for search (consolidated from search-filter)
 */

export const SEARCH_FILTER_CONSOLIDATED = {
  // Filter Types
  TYPES: {
    TERM: 'term',
    TERMS: 'terms',
    RANGE: 'range',
    BOOLEAN: 'boolean',
    EXISTS: 'exists',
    PREFIX: 'prefix',
    WILDCARD: 'wildcard',
    REGEX: 'regex',
    FUZZY: 'fuzzy',
    NESTED: 'nested',
    GEO: 'geo',
    SCRIPT: 'script',
    CUSTOM: 'custom',
  } as const,

  // Filter Operators
  OPERATORS: {
    EQ: 'eq',
    NEQ: 'neq',
    GT: 'gt',
    GTE: 'gte',
    LT: 'lt',
    LTE: 'lte',
    IN: 'in',
    NIN: 'nin',
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    BETWEEN: 'between',
    EXISTS: 'exists',
    NOT_EXISTS: 'not_exists',
    GEO_WITHIN: 'geo_within',
    GEO_DISTANCE: 'geo_distance',
  } as const,

  // Filter Logic
  LOGIC: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    MUST: 'must',
    SHOULD: 'should',
    MUST_NOT: 'must_not',
  } as const,

  // Filter Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'term',
    DEFAULT_OPERATOR: 'eq',
    DEFAULT_LOGIC: 'must',
    MAX_FILTERS: 20,
    MAX_NESTED_DEPTH: 5,
    CASE_SENSITIVE: false,
  } as const,

  // Filter Limits
  LIMITS: {
    MAX_FILTERS: 20,
    MAX_NESTED_DEPTH: 5,
    MAX_TERMS: 100,
    MAX_REGEX_LENGTH: 100,
    MAX_GEO_DISTANCE: 100000,
  } as const,
} as const;

// Filter Types
export type SearchFilterConsolidatedType =
  (typeof SEARCH_FILTER_CONSOLIDATED.TYPES)[keyof typeof SEARCH_FILTER_CONSOLIDATED.TYPES];

// Filter Operators
export type SearchFilterConsolidatedOperator =
  (typeof SEARCH_FILTER_CONSOLIDATED.OPERATORS)[keyof typeof SEARCH_FILTER_CONSOLIDATED.OPERATORS];

// Filter Logic
export type SearchFilterConsolidatedLogic =
  (typeof SEARCH_FILTER_CONSOLIDATED.LOGIC)[keyof typeof SEARCH_FILTER_CONSOLIDATED.LOGIC];

// Filter Defaults
export type SearchFilterConsolidatedDefault =
  (typeof SEARCH_FILTER_CONSOLIDATED.DEFAULTS)[keyof typeof SEARCH_FILTER_CONSOLIDATED.DEFAULTS];

// Filter Limits
export type SearchFilterConsolidatedLimit =
  (typeof SEARCH_FILTER_CONSOLIDATED.LIMITS)[keyof typeof SEARCH_FILTER_CONSOLIDATED.LIMITS];

// Utility Functions
export function searchFilterConsolidatedGetTypeLabel(type: SearchFilterConsolidatedType): string {
  const labels: Record<SearchFilterConsolidatedType, string> = {
    [SEARCH_FILTER_CONSOLIDATED.TYPES.TERM]: 'Term',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.TERMS]: 'Terms',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.RANGE]: 'Range',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.BOOLEAN]: 'Boolean',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.EXISTS]: 'Exists',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.PREFIX]: 'Prefix',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.WILDCARD]: 'Wildcard',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.REGEX]: 'Regex',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.FUZZY]: 'Fuzzy',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.NESTED]: 'Nested',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.GEO]: 'Geo',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.SCRIPT]: 'Script',
    [SEARCH_FILTER_CONSOLIDATED.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Filter Type';
}

export function searchFilterConsolidatedGetOperatorLabel(
  operator: SearchFilterConsolidatedOperator
): string {
  const labels: Record<SearchFilterConsolidatedOperator, string> = {
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.EQ]: 'Equals',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.NEQ]: 'Not Equals',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.GT]: 'Greater Than',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.GTE]: 'Greater Than or Equals',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.LT]: 'Less Than',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.LTE]: 'Less Than or Equals',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.IN]: 'In',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.NIN]: 'Not In',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.CONTAINS]: 'Contains',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.STARTS_WITH]: 'Starts With',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.ENDS_WITH]: 'Ends With',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.BETWEEN]: 'Between',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.EXISTS]: 'Exists',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.NOT_EXISTS]: 'Not Exists',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.GEO_WITHIN]: 'Geo Within',
    [SEARCH_FILTER_CONSOLIDATED.OPERATORS.GEO_DISTANCE]: 'Geo Distance',
  };
  return labels[operator] || 'Unknown Operator';
}

export function searchFilterConsolidatedGetLogicLabel(
  logic: SearchFilterConsolidatedLogic
): string {
  const labels: Record<SearchFilterConsolidatedLogic, string> = {
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.AND]: 'And',
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.OR]: 'Or',
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.NOT]: 'Not',
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.MUST]: 'Must',
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.SHOULD]: 'Should',
    [SEARCH_FILTER_CONSOLIDATED.LOGIC.MUST_NOT]: 'Must Not',
  };
  return labels[logic] || 'Unknown Logic';
}

export function searchFilterConsolidatedIsTermType(type: SearchFilterConsolidatedType): boolean {
  const termTypes: SearchFilterConsolidatedType[] = [
    SEARCH_FILTER_CONSOLIDATED.TYPES.TERM,
    SEARCH_FILTER_CONSOLIDATED.TYPES.TERMS,
    SEARCH_FILTER_CONSOLIDATED.TYPES.PREFIX,
    SEARCH_FILTER_CONSOLIDATED.TYPES.WILDCARD,
  ];
  return termTypes.includes(type);
}

export function searchFilterConsolidatedIsRangeType(type: SearchFilterConsolidatedType): boolean {
  return type === SEARCH_FILTER_CONSOLIDATED.TYPES.RANGE;
}

export function searchFilterConsolidatedIsGeoType(type: SearchFilterConsolidatedType): boolean {
  return type === SEARCH_FILTER_CONSOLIDATED.TYPES.GEO;
}

export function searchFilterConsolidatedIsNestedType(type: SearchFilterConsolidatedType): boolean {
  return type === SEARCH_FILTER_CONSOLIDATED.TYPES.NESTED;
}

export function searchFilterConsolidatedGetMaxFilters(): number {
  return SEARCH_FILTER_CONSOLIDATED.DEFAULTS.MAX_FILTERS;
}

export function searchFilterConsolidatedGetDefaultLogic(): SearchFilterConsolidatedLogic {
  return SEARCH_FILTER_CONSOLIDATED.DEFAULTS.DEFAULT_LOGIC;
}

export function searchFilterConsolidatedIsCaseSensitive(): boolean {
  return SEARCH_FILTER_CONSOLIDATED.DEFAULTS.CASE_SENSITIVE;
}

export function searchFilterConsolidatedGetMaxNestedDepth(): number {
  return SEARCH_FILTER_CONSOLIDATED.DEFAULTS.MAX_NESTED_DEPTH;
}
