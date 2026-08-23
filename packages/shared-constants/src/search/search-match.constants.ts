/**
 * Search Match Constants
 * Match configurations for search queries
 */

export const SEARCH_MATCH = {
  // Match Types
  TYPES: {
    MATCH: 'match',
    MATCH_PHRASE: 'match_phrase',
    MATCH_PHRASE_PREFIX: 'match_phrase_prefix',
    MATCH_BOOL_PREFIX: 'match_bool_prefix',
    MULTI_MATCH: 'multi_match',
    TERM: 'term',
    TERMS: 'terms',
    PREFIX: 'prefix',
    WILDCARD: 'wildcard',
    REGEXP: 'regexp',
    FUZZY: 'fuzzy',
    RANGE: 'range',
    EXISTS: 'exists',
    QUERY_STRING: 'query_string',
    SIMPLE_QUERY_STRING: 'simple_query_string',
    CUSTOM: 'custom',
  } as const,

  // Match Operators
  OPERATORS: {
    OR: 'or',
    AND: 'and',
    SHOULD: 'should',
    MUST: 'must',
    MUST_NOT: 'must_not',
    FILTER: 'filter',
  } as const,

  // Match Modes
  MODES: {
    BEST_FIELDS: 'best_fields',
    MOST_FIELDS: 'most_fields',
    CROSS_FIELDS: 'cross_fields',
    PHRASE: 'phrase',
    PHRASE_PREFIX: 'phrase_prefix',
    BOOL_PREFIX: 'bool_prefix',
  } as const,

  // Match Zero Terms
  ZERO_TERMS: {
    NONE: 'none',
    ALL: 'all',
    CUSTOM: 'custom',
  } as const,

  // Match Fuzziness
  FUZZINESS: {
    AUTO: 'AUTO',
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3',
  } as const,

  // Match Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'match',
    DEFAULT_OPERATOR: 'or',
    DEFAULT_MODE: 'best_fields',
    DEFAULT_ZERO_TERMS: 'none',
    DEFAULT_FUZZINESS: 'AUTO',
    DEFAULT_PREFIX_LENGTH: 0,
    DEFAULT_MAX_EXPANSIONS: 50,
    DEFAULT_FUZZY_TRANSPOSITIONS: true,
    DEFAULT_CASE_INSENSITIVE: true,
    DEFAULT_MIN_SHOULD_MATCH: '75%',
    DEFAULT_OPERATOR_AND: false,
  } as const,

  // Match Limits
  LIMITS: {
    MAX_EXPANSIONS: 100,
    MIN_PREFIX_LENGTH: 1,
    MAX_PREFIX_LENGTH: 10,
    MAX_FUZZY_EDIT_DISTANCE: 5,
  } as const,
} as const;

// Match Types
export type SearchMatchType = (typeof SEARCH_MATCH.TYPES)[keyof typeof SEARCH_MATCH.TYPES];

// Match Operators
export type SearchMatchOperator =
  (typeof SEARCH_MATCH.OPERATORS)[keyof typeof SEARCH_MATCH.OPERATORS];

// Match Modes
export type SearchMatchMode = (typeof SEARCH_MATCH.MODES)[keyof typeof SEARCH_MATCH.MODES];

// Match Zero Terms
export type SearchMatchZeroTerms =
  (typeof SEARCH_MATCH.ZERO_TERMS)[keyof typeof SEARCH_MATCH.ZERO_TERMS];

// Match Fuzziness
export type SearchMatchFuzziness =
  (typeof SEARCH_MATCH.FUZZINESS)[keyof typeof SEARCH_MATCH.FUZZINESS];

// Match Defaults
export type SearchMatchDefault = (typeof SEARCH_MATCH.DEFAULTS)[keyof typeof SEARCH_MATCH.DEFAULTS];

// Match Limits
export type SearchMatchLimit = (typeof SEARCH_MATCH.LIMITS)[keyof typeof SEARCH_MATCH.LIMITS];

// Utility Functions
export function searchMatchGetTypeLabel(type: SearchMatchType): string {
  const labels: Record<SearchMatchType, string> = {
    [SEARCH_MATCH.TYPES.MATCH]: 'Match',
    [SEARCH_MATCH.TYPES.MATCH_PHRASE]: 'Match Phrase',
    [SEARCH_MATCH.TYPES.MATCH_PHRASE_PREFIX]: 'Match Phrase Prefix',
    [SEARCH_MATCH.TYPES.MATCH_BOOL_PREFIX]: 'Match Bool Prefix',
    [SEARCH_MATCH.TYPES.MULTI_MATCH]: 'Multi Match',
    [SEARCH_MATCH.TYPES.TERM]: 'Term',
    [SEARCH_MATCH.TYPES.TERMS]: 'Terms',
    [SEARCH_MATCH.TYPES.PREFIX]: 'Prefix',
    [SEARCH_MATCH.TYPES.WILDCARD]: 'Wildcard',
    [SEARCH_MATCH.TYPES.REGEXP]: 'Regexp',
    [SEARCH_MATCH.TYPES.FUZZY]: 'Fuzzy',
    [SEARCH_MATCH.TYPES.RANGE]: 'Range',
    [SEARCH_MATCH.TYPES.EXISTS]: 'Exists',
    [SEARCH_MATCH.TYPES.QUERY_STRING]: 'Query String',
    [SEARCH_MATCH.TYPES.SIMPLE_QUERY_STRING]: 'Simple Query String',
    [SEARCH_MATCH.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Match Type';
}

export function searchMatchGetOperatorLabel(operator: SearchMatchOperator): string {
  const labels: Record<SearchMatchOperator, string> = {
    [SEARCH_MATCH.OPERATORS.OR]: 'OR',
    [SEARCH_MATCH.OPERATORS.AND]: 'AND',
    [SEARCH_MATCH.OPERATORS.SHOULD]: 'Should',
    [SEARCH_MATCH.OPERATORS.MUST]: 'Must',
    [SEARCH_MATCH.OPERATORS.MUST_NOT]: 'Must Not',
    [SEARCH_MATCH.OPERATORS.FILTER]: 'Filter',
  };
  return labels[operator] || 'Unknown Operator';
}

export function searchMatchGetModeLabel(mode: SearchMatchMode): string {
  const labels: Record<SearchMatchMode, string> = {
    [SEARCH_MATCH.MODES.BEST_FIELDS]: 'Best Fields',
    [SEARCH_MATCH.MODES.MOST_FIELDS]: 'Most Fields',
    [SEARCH_MATCH.MODES.CROSS_FIELDS]: 'Cross Fields',
    [SEARCH_MATCH.MODES.PHRASE]: 'Phrase',
    [SEARCH_MATCH.MODES.PHRASE_PREFIX]: 'Phrase Prefix',
    [SEARCH_MATCH.MODES.BOOL_PREFIX]: 'Bool Prefix',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchMatchGetZeroTermsLabel(zeroTerms: SearchMatchZeroTerms): string {
  const labels: Record<SearchMatchZeroTerms, string> = {
    [SEARCH_MATCH.ZERO_TERMS.NONE]: 'None',
    [SEARCH_MATCH.ZERO_TERMS.ALL]: 'All',
    [SEARCH_MATCH.ZERO_TERMS.CUSTOM]: 'Custom',
  };
  return labels[zeroTerms] || 'Unknown Zero Terms';
}

export function searchMatchIsPhraseType(type: SearchMatchType): boolean {
  const phraseTypes: SearchMatchType[] = [
    SEARCH_MATCH.TYPES.MATCH_PHRASE,
    SEARCH_MATCH.TYPES.MATCH_PHRASE_PREFIX,
  ];
  return phraseTypes.includes(type);
}

export function searchMatchIsTermType(type: SearchMatchType): boolean {
  const termTypes: SearchMatchType[] = [SEARCH_MATCH.TYPES.TERM, SEARCH_MATCH.TYPES.TERMS];
  return termTypes.includes(type);
}

export function searchMatchIsFuzzyType(type: SearchMatchType): boolean {
  return type === SEARCH_MATCH.TYPES.FUZZY;
}

export function searchMatchIsRangeType(type: SearchMatchType): boolean {
  return type === SEARCH_MATCH.TYPES.RANGE;
}

export function searchMatchIsQueryStringType(type: SearchMatchType): boolean {
  const qsTypes: SearchMatchType[] = [
    SEARCH_MATCH.TYPES.QUERY_STRING,
    SEARCH_MATCH.TYPES.SIMPLE_QUERY_STRING,
  ];
  return qsTypes.includes(type);
}

export function searchMatchGetDefaultType(): SearchMatchType {
  return SEARCH_MATCH.DEFAULTS.DEFAULT_TYPE;
}

export function searchMatchGetDefaultOperator(): SearchMatchOperator {
  return SEARCH_MATCH.DEFAULTS.DEFAULT_OPERATOR;
}

export function searchMatchGetDefaultFuzziness(): SearchMatchFuzziness {
  return SEARCH_MATCH.DEFAULTS.DEFAULT_FUZZINESS;
}
