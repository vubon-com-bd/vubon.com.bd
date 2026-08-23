/**
 * Search Constants
 * Core search configuration and settings
 */

export const SEARCH = {
  // Search Types
  TYPES: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    ORDER: 'order',
    USER: 'user',
    CONTENT: 'content',
    DOCUMENT: 'document',
    ALL: 'all',
    CUSTOM: 'custom',
  } as const,

  // Search Modes
  MODES: {
    EXACT: 'exact',
    FUZZY: 'fuzzy',
    PARTIAL: 'partial',
    PHRASE: 'phrase',
    BOOLEAN: 'boolean',
    SEMANTIC: 'semantic',
    HYBRID: 'hybrid',
  } as const,

  // Search Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    ALL: 'all',
  } as const,

  // Search Regions
  REGIONS: {
    GLOBAL: 'global',
    BD: 'bd',
    US: 'us',
    UK: 'uk',
    EU: 'eu',
    ASIA: 'asia',
    ALL: 'all',
  } as const,

  // Search Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_MODE: 'hybrid',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_REGION: 'global',
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
    MAX_RESULTS: 10000,
    DEFAULT_TIMEOUT: 5000,
    DEFAULT_ANALYZER: 'standard',
    DEFAULT_SEARCH_FIELD: 'title',
    DEFAULT_HIGHLIGHT_TAG: 'em',
    MAX_SEARCH_HISTORY: 100,
    DEFAULT_FUZZY_EDIT_DISTANCE: 2,
    DEFAULT_MIN_SHOULD_MATCH: 0.75,
  } as const,

  // Search Limits
  LIMITS: {
    MIN_QUERY_LENGTH: 2,
    MAX_QUERY_LENGTH: 500,
    MAX_RESULTS: 10000,
    MAX_PAGE_SIZE: 100,
    MAX_FACETS: 50,
    MAX_FILTERS: 20,
    MAX_SORTS: 10,
    MAX_SUGGESTIONS: 10,
    MAX_AUTOCOMPLETE: 10,
    MAX_SYNONYMS: 100,
    MAX_STOPWORDS: 1000,
    MAX_INDEX_FIELDS: 100,
  } as const,

  // Search Errors
  ERRORS: {
    QUERY_TOO_SHORT: 'query_too_short',
    QUERY_TOO_LONG: 'query_too_long',
    INVALID_QUERY: 'invalid_query',
    INDEX_NOT_FOUND: 'index_not_found',
    FIELD_NOT_FOUND: 'field_not_found',
    ANALYZER_ERROR: 'analyzer_error',
    TIMEOUT: 'timeout',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_SORT: 'invalid_sort',
    INVALID_FILTER: 'invalid_filter',
    INVALID_FACET: 'invalid_facet',
  } as const,
} as const;

// Search Types
export type SearchType = (typeof SEARCH.TYPES)[keyof typeof SEARCH.TYPES];

// Search Modes
export type SearchMode = (typeof SEARCH.MODES)[keyof typeof SEARCH.MODES];

// Search Languages
export type SearchLanguage = (typeof SEARCH.LANGUAGES)[keyof typeof SEARCH.LANGUAGES];

// Search Regions
export type SearchRegion = (typeof SEARCH.REGIONS)[keyof typeof SEARCH.REGIONS];

// Search Defaults
export type SearchDefault = (typeof SEARCH.DEFAULTS)[keyof typeof SEARCH.DEFAULTS];

// Search Limits
export type SearchLimit = (typeof SEARCH.LIMITS)[keyof typeof SEARCH.LIMITS];

// Search Errors
export type SearchError = (typeof SEARCH.ERRORS)[keyof typeof SEARCH.ERRORS];

// Utility Functions
export function searchGetTypeLabel(type: SearchType): string {
  const labels: Record<SearchType, string> = {
    [SEARCH.TYPES.PRODUCT]: 'Product',
    [SEARCH.TYPES.CATEGORY]: 'Category',
    [SEARCH.TYPES.BRAND]: 'Brand',
    [SEARCH.TYPES.VENDOR]: 'Vendor',
    [SEARCH.TYPES.ORDER]: 'Order',
    [SEARCH.TYPES.USER]: 'User',
    [SEARCH.TYPES.CONTENT]: 'Content',
    [SEARCH.TYPES.DOCUMENT]: 'Document',
    [SEARCH.TYPES.ALL]: 'All',
    [SEARCH.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Search Type';
}

export function searchGetModeLabel(mode: SearchMode): string {
  const labels: Record<SearchMode, string> = {
    [SEARCH.MODES.EXACT]: 'Exact Match',
    [SEARCH.MODES.FUZZY]: 'Fuzzy Match',
    [SEARCH.MODES.PARTIAL]: 'Partial Match',
    [SEARCH.MODES.PHRASE]: 'Phrase Match',
    [SEARCH.MODES.BOOLEAN]: 'Boolean Search',
    [SEARCH.MODES.SEMANTIC]: 'Semantic Search',
    [SEARCH.MODES.HYBRID]: 'Hybrid Search',
  };
  return labels[mode] || 'Unknown Search Mode';
}

export function searchGetLanguageLabel(language: SearchLanguage): string {
  const labels: Record<SearchLanguage, string> = {
    [SEARCH.LANGUAGES.EN]: 'English',
    [SEARCH.LANGUAGES.BN]: 'Bengali',
    [SEARCH.LANGUAGES.HI]: 'Hindi',
    [SEARCH.LANGUAGES.AR]: 'Arabic',
    [SEARCH.LANGUAGES.ES]: 'Spanish',
    [SEARCH.LANGUAGES.FR]: 'French',
    [SEARCH.LANGUAGES.DE]: 'German',
    [SEARCH.LANGUAGES.ZH]: 'Chinese',
    [SEARCH.LANGUAGES.JA]: 'Japanese',
    [SEARCH.LANGUAGES.RU]: 'Russian',
    [SEARCH.LANGUAGES.ALL]: 'All Languages',
  };
  return labels[language] || 'Unknown Language';
}

export function searchGetRegionLabel(region: SearchRegion): string {
  const labels: Record<SearchRegion, string> = {
    [SEARCH.REGIONS.GLOBAL]: 'Global',
    [SEARCH.REGIONS.BD]: 'Bangladesh',
    [SEARCH.REGIONS.US]: 'United States',
    [SEARCH.REGIONS.UK]: 'United Kingdom',
    [SEARCH.REGIONS.EU]: 'Europe',
    [SEARCH.REGIONS.ASIA]: 'Asia',
    [SEARCH.REGIONS.ALL]: 'All Regions',
  };
  return labels[region] || 'Unknown Region';
}

export function searchGetErrorLabel(error: SearchError): string {
  const labels: Record<SearchError, string> = {
    [SEARCH.ERRORS.QUERY_TOO_SHORT]: 'Query Too Short',
    [SEARCH.ERRORS.QUERY_TOO_LONG]: 'Query Too Long',
    [SEARCH.ERRORS.INVALID_QUERY]: 'Invalid Query',
    [SEARCH.ERRORS.INDEX_NOT_FOUND]: 'Index Not Found',
    [SEARCH.ERRORS.FIELD_NOT_FOUND]: 'Field Not Found',
    [SEARCH.ERRORS.ANALYZER_ERROR]: 'Analyzer Error',
    [SEARCH.ERRORS.TIMEOUT]: 'Search Timeout',
    [SEARCH.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [SEARCH.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [SEARCH.ERRORS.INVALID_SORT]: 'Invalid Sort',
    [SEARCH.ERRORS.INVALID_FILTER]: 'Invalid Filter',
    [SEARCH.ERRORS.INVALID_FACET]: 'Invalid Facet',
  };
  return labels[error] || 'Unknown Error';
}

export function searchGetDefaultPageSize(): number {
  return SEARCH.DEFAULTS.DEFAULT_PAGE_SIZE;
}

export function searchGetMaxPageSize(): number {
  return SEARCH.DEFAULTS.MAX_PAGE_SIZE;
}

export function searchGetDefaultTimeout(): number {
  return SEARCH.DEFAULTS.DEFAULT_TIMEOUT;
}

export function searchIsExactMode(mode: SearchMode): boolean {
  return mode === SEARCH.MODES.EXACT;
}

export function searchIsFuzzyMode(mode: SearchMode): boolean {
  return mode === SEARCH.MODES.FUZZY;
}

export function searchIsSemanticMode(mode: SearchMode): boolean {
  return mode === SEARCH.MODES.SEMANTIC;
}

export function searchIsHybridMode(mode: SearchMode): boolean {
  return mode === SEARCH.MODES.HYBRID;
}

export function searchGetDefaultFuzzyEditDistance(): number {
  return SEARCH.DEFAULTS.DEFAULT_FUZZY_EDIT_DISTANCE;
}

export function searchGetDefaultMinShouldMatch(): number {
  return SEARCH.DEFAULTS.DEFAULT_MIN_SHOULD_MATCH;
}
