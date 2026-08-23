/**
 * Search Filter Constants
 * Filter configurations for search
 */

export const SEARCH_FILTER = {
  // Filter Types
  TYPES: {
    TERM: 'term',
    RANGE: 'range',
    BOOLEAN: 'boolean',
    EXISTS: 'exists',
    PREFIX: 'prefix',
    WILDCARD: 'wildcard',
    REGEX: 'regex',
    FUZZY: 'fuzzy',
    TERMS: 'terms',
    NESTED: 'nested',
    HAS_CHILD: 'has_child',
    HAS_PARENT: 'has_parent',
    GEO: 'geo',
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
    EXISTS: 'exists',
    NOT_EXISTS: 'not_exists',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    CONTAINS: 'contains',
    REGEX: 'regex',
    FUZZY: 'fuzzy',
    GEO_WITHIN: 'geo_within',
    GEO_DISTANCE: 'geo_distance',
    CUSTOM: 'custom',
  } as const,

  // Filter Logic
  LOGICS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    SHOULD: 'should',
    MUST: 'must',
    MUST_NOT: 'must_not',
    FILTER: 'filter',
  } as const,

  // Filter Modes
  MODES: {
    INCLUSIVE: 'inclusive',
    EXCLUSIVE: 'exclusive',
    HYBRID: 'hybrid',
    CUSTOM: 'custom',
  } as const,

  // Filter Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'term',
    DEFAULT_OPERATOR: 'eq',
    DEFAULT_LOGIC: 'must',
    DEFAULT_MODE: 'inclusive',
    MAX_FILTERS: 20,
    MAX_NESTED_FILTERS: 5,
    DEFAULT_CASE_SENSITIVE: false,
    DEFAULT_FUZZY_EDIT_DISTANCE: 2,
  } as const,

  // Filter Limits
  LIMITS: {
    MIN_FILTERS: 0,
    MAX_FILTERS: 20,
    MAX_NESTED_FILTERS: 5,
    MAX_TERMS: 100,
    MAX_GEO_DISTANCE: 100000,
    MAX_REGEX_LENGTH: 100,
  } as const,
} as const;

// Filter Types
export type SearchFilterType = (typeof SEARCH_FILTER.TYPES)[keyof typeof SEARCH_FILTER.TYPES];

// Filter Operators
export type SearchFilterOperator =
  (typeof SEARCH_FILTER.OPERATORS)[keyof typeof SEARCH_FILTER.OPERATORS];

// Filter Logic
export type SearchFilterLogic = (typeof SEARCH_FILTER.LOGICS)[keyof typeof SEARCH_FILTER.LOGICS];

// Filter Modes
export type SearchFilterMode = (typeof SEARCH_FILTER.MODES)[keyof typeof SEARCH_FILTER.MODES];

// Filter Defaults
export type SearchFilterDefault =
  (typeof SEARCH_FILTER.DEFAULTS)[keyof typeof SEARCH_FILTER.DEFAULTS];

// Filter Limits
export type SearchFilterLimit = (typeof SEARCH_FILTER.LIMITS)[keyof typeof SEARCH_FILTER.LIMITS];

// Utility Functions
export function searchFilterGetTypeLabel(type: SearchFilterType): string {
  const labels: Record<SearchFilterType, string> = {
    [SEARCH_FILTER.TYPES.TERM]: 'Term',
    [SEARCH_FILTER.TYPES.RANGE]: 'Range',
    [SEARCH_FILTER.TYPES.BOOLEAN]: 'Boolean',
    [SEARCH_FILTER.TYPES.EXISTS]: 'Exists',
    [SEARCH_FILTER.TYPES.PREFIX]: 'Prefix',
    [SEARCH_FILTER.TYPES.WILDCARD]: 'Wildcard',
    [SEARCH_FILTER.TYPES.REGEX]: 'Regex',
    [SEARCH_FILTER.TYPES.FUZZY]: 'Fuzzy',
    [SEARCH_FILTER.TYPES.TERMS]: 'Terms',
    [SEARCH_FILTER.TYPES.NESTED]: 'Nested',
    [SEARCH_FILTER.TYPES.HAS_CHILD]: 'Has Child',
    [SEARCH_FILTER.TYPES.HAS_PARENT]: 'Has Parent',
    [SEARCH_FILTER.TYPES.GEO]: 'Geo',
    [SEARCH_FILTER.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Filter Type';
}

export function searchFilterGetOperatorLabel(operator: SearchFilterOperator): string {
  const labels: Record<SearchFilterOperator, string> = {
    [SEARCH_FILTER.OPERATORS.EQ]: 'Equals',
    [SEARCH_FILTER.OPERATORS.NEQ]: 'Not Equals',
    [SEARCH_FILTER.OPERATORS.GT]: 'Greater Than',
    [SEARCH_FILTER.OPERATORS.GTE]: 'Greater Than or Equals',
    [SEARCH_FILTER.OPERATORS.LT]: 'Less Than',
    [SEARCH_FILTER.OPERATORS.LTE]: 'Less Than or Equals',
    [SEARCH_FILTER.OPERATORS.IN]: 'In',
    [SEARCH_FILTER.OPERATORS.NIN]: 'Not In',
    [SEARCH_FILTER.OPERATORS.EXISTS]: 'Exists',
    [SEARCH_FILTER.OPERATORS.NOT_EXISTS]: 'Not Exists',
    [SEARCH_FILTER.OPERATORS.STARTS_WITH]: 'Starts With',
    [SEARCH_FILTER.OPERATORS.ENDS_WITH]: 'Ends With',
    [SEARCH_FILTER.OPERATORS.CONTAINS]: 'Contains',
    [SEARCH_FILTER.OPERATORS.REGEX]: 'Regex',
    [SEARCH_FILTER.OPERATORS.FUZZY]: 'Fuzzy',
    [SEARCH_FILTER.OPERATORS.GEO_WITHIN]: 'Geo Within',
    [SEARCH_FILTER.OPERATORS.GEO_DISTANCE]: 'Geo Distance',
    [SEARCH_FILTER.OPERATORS.CUSTOM]: 'Custom',
  };
  return labels[operator] || 'Unknown Operator';
}

export function searchFilterGetLogicLabel(logic: SearchFilterLogic): string {
  const labels: Record<SearchFilterLogic, string> = {
    [SEARCH_FILTER.LOGICS.AND]: 'And',
    [SEARCH_FILTER.LOGICS.OR]: 'Or',
    [SEARCH_FILTER.LOGICS.NOT]: 'Not',
    [SEARCH_FILTER.LOGICS.SHOULD]: 'Should',
    [SEARCH_FILTER.LOGICS.MUST]: 'Must',
    [SEARCH_FILTER.LOGICS.MUST_NOT]: 'Must Not',
    [SEARCH_FILTER.LOGICS.FILTER]: 'Filter',
  };
  return labels[logic] || 'Unknown Logic';
}

export function searchFilterGetModeLabel(mode: SearchFilterMode): string {
  const labels: Record<SearchFilterMode, string> = {
    [SEARCH_FILTER.MODES.INCLUSIVE]: 'Inclusive',
    [SEARCH_FILTER.MODES.EXCLUSIVE]: 'Exclusive',
    [SEARCH_FILTER.MODES.HYBRID]: 'Hybrid',
    [SEARCH_FILTER.MODES.CUSTOM]: 'Custom',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchFilterIsTermType(type: SearchFilterType): boolean {
  const termTypes: SearchFilterType[] = [
    SEARCH_FILTER.TYPES.TERM,
    SEARCH_FILTER.TYPES.PREFIX,
    SEARCH_FILTER.TYPES.WILDCARD,
    SEARCH_FILTER.TYPES.TERMS,
  ];
  return termTypes.includes(type);
}

export function searchFilterIsRangeType(type: SearchFilterType): boolean {
  return type === SEARCH_FILTER.TYPES.RANGE;
}

export function searchFilterIsBoolType(type: SearchFilterType): boolean {
  return type === SEARCH_FILTER.TYPES.BOOLEAN;
}

export function searchFilterIsGeoType(type: SearchFilterType): boolean {
  return type === SEARCH_FILTER.TYPES.GEO;
}

export function searchFilterIsNestedType(type: SearchFilterType): boolean {
  const nestedTypes: SearchFilterType[] = [
    SEARCH_FILTER.TYPES.NESTED,
    SEARCH_FILTER.TYPES.HAS_CHILD,
    SEARCH_FILTER.TYPES.HAS_PARENT,
  ];
  return nestedTypes.includes(type);
}

export function searchFilterGetDefaultLogic(): SearchFilterLogic {
  return SEARCH_FILTER.DEFAULTS.DEFAULT_LOGIC;
}

export function searchFilterGetMaxFilters(): number {
  return SEARCH_FILTER.DEFAULTS.MAX_FILTERS;
}
