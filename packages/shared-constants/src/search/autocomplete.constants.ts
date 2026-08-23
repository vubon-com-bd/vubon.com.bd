/**
 * Autocomplete Constants
 * Autocomplete configurations for search
 */

export const SEARCH_AUTOCOMPLETE = {
  // Autocomplete Types
  TYPES: {
    QUERY: 'query',
    TERM: 'term',
    PHRASE: 'phrase',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRODUCT: 'product',
    CONTEXTUAL: 'contextual',
    CUSTOM: 'custom',
  } as const,

  // Autocomplete Modes
  MODES: {
    PREFIX: 'prefix',
    INFIX: 'infix',
    SUFFIX: 'suffix',
    FUZZY: 'fuzzy',
    SMART: 'smart',
    HYBRID: 'hybrid',
  } as const,

  // Autocomplete Sources
  SOURCES: {
    INDEX: 'index',
    HISTORY: 'history',
    POPULAR: 'popular',
    TRENDING: 'trending',
    PERSONALIZED: 'personalized',
    CONTEXTUAL: 'contextual',
    HYBRID: 'hybrid',
  } as const,

  // Autocomplete Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'query',
    DEFAULT_MODE: 'hybrid',
    DEFAULT_SOURCE: 'hybrid',
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50,
    MIN_CHARS: 2,
    MAX_CHARS: 100,
    CACHE_TTL: 3600,
    DEBOUNCE_MS: 300,
    HIGHLIGHT: true,
    FUZZY_EDIT_DISTANCE: 2,
    MAX_SUGGESTIONS: 10,
    DEFAULT_WEIGHT: 0.5,
  } as const,

  // Autocomplete Limits
  LIMITS: {
    MIN_CHARS: 1,
    MAX_CHARS: 100,
    MAX_LIMIT: 50,
    DEFAULT_LIMIT: 10,
    MAX_SUGGESTIONS: 20,
    MIN_FUZZY_EDIT_DISTANCE: 1,
    MAX_FUZZY_EDIT_DISTANCE: 3,
    MAX_CONTEXT_FIELDS: 5,
  } as const,
} as const;

// Autocomplete Types
export type SearchAutocompleteType =
  (typeof SEARCH_AUTOCOMPLETE.TYPES)[keyof typeof SEARCH_AUTOCOMPLETE.TYPES];

// Autocomplete Modes
export type SearchAutocompleteMode =
  (typeof SEARCH_AUTOCOMPLETE.MODES)[keyof typeof SEARCH_AUTOCOMPLETE.MODES];

// Autocomplete Sources
export type SearchAutocompleteSource =
  (typeof SEARCH_AUTOCOMPLETE.SOURCES)[keyof typeof SEARCH_AUTOCOMPLETE.SOURCES];

// Autocomplete Defaults
export type SearchAutocompleteDefault =
  (typeof SEARCH_AUTOCOMPLETE.DEFAULTS)[keyof typeof SEARCH_AUTOCOMPLETE.DEFAULTS];

// Autocomplete Limits
export type SearchAutocompleteLimit =
  (typeof SEARCH_AUTOCOMPLETE.LIMITS)[keyof typeof SEARCH_AUTOCOMPLETE.LIMITS];

// Utility Functions
export function searchAutocompleteGetTypeLabel(type: SearchAutocompleteType): string {
  const labels: Record<SearchAutocompleteType, string> = {
    [SEARCH_AUTOCOMPLETE.TYPES.QUERY]: 'Query',
    [SEARCH_AUTOCOMPLETE.TYPES.TERM]: 'Term',
    [SEARCH_AUTOCOMPLETE.TYPES.PHRASE]: 'Phrase',
    [SEARCH_AUTOCOMPLETE.TYPES.CATEGORY]: 'Category',
    [SEARCH_AUTOCOMPLETE.TYPES.BRAND]: 'Brand',
    [SEARCH_AUTOCOMPLETE.TYPES.PRODUCT]: 'Product',
    [SEARCH_AUTOCOMPLETE.TYPES.CONTEXTUAL]: 'Contextual',
    [SEARCH_AUTOCOMPLETE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Autocomplete Type';
}

export function searchAutocompleteGetModeLabel(mode: SearchAutocompleteMode): string {
  const labels: Record<SearchAutocompleteMode, string> = {
    [SEARCH_AUTOCOMPLETE.MODES.PREFIX]: 'Prefix',
    [SEARCH_AUTOCOMPLETE.MODES.INFIX]: 'Infix',
    [SEARCH_AUTOCOMPLETE.MODES.SUFFIX]: 'Suffix',
    [SEARCH_AUTOCOMPLETE.MODES.FUZZY]: 'Fuzzy',
    [SEARCH_AUTOCOMPLETE.MODES.SMART]: 'Smart',
    [SEARCH_AUTOCOMPLETE.MODES.HYBRID]: 'Hybrid',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchAutocompleteGetSourceLabel(source: SearchAutocompleteSource): string {
  const labels: Record<SearchAutocompleteSource, string> = {
    [SEARCH_AUTOCOMPLETE.SOURCES.INDEX]: 'Index',
    [SEARCH_AUTOCOMPLETE.SOURCES.HISTORY]: 'History',
    [SEARCH_AUTOCOMPLETE.SOURCES.POPULAR]: 'Popular',
    [SEARCH_AUTOCOMPLETE.SOURCES.TRENDING]: 'Trending',
    [SEARCH_AUTOCOMPLETE.SOURCES.PERSONALIZED]: 'Personalized',
    [SEARCH_AUTOCOMPLETE.SOURCES.CONTEXTUAL]: 'Contextual',
    [SEARCH_AUTOCOMPLETE.SOURCES.HYBRID]: 'Hybrid',
  };
  return labels[source] || 'Unknown Source';
}

export function searchAutocompleteIsQueryType(type: SearchAutocompleteType): boolean {
  return type === SEARCH_AUTOCOMPLETE.TYPES.QUERY;
}

export function searchAutocompleteIsProductType(type: SearchAutocompleteType): boolean {
  return type === SEARCH_AUTOCOMPLETE.TYPES.PRODUCT;
}

export function searchAutocompleteIsContextualType(type: SearchAutocompleteType): boolean {
  return type === SEARCH_AUTOCOMPLETE.TYPES.CONTEXTUAL;
}

export function searchAutocompleteGetDefaultLimit(): number {
  return SEARCH_AUTOCOMPLETE.DEFAULTS.DEFAULT_LIMIT;
}

export function searchAutocompleteGetMaxLimit(): number {
  return SEARCH_AUTOCOMPLETE.DEFAULTS.MAX_LIMIT;
}

export function searchAutocompleteGetMinChars(): number {
  return SEARCH_AUTOCOMPLETE.DEFAULTS.MIN_CHARS;
}

export function searchAutocompleteGetDebounceMs(): number {
  return SEARCH_AUTOCOMPLETE.DEFAULTS.DEBOUNCE_MS;
}

export function searchAutocompleteShouldHighlight(): boolean {
  return SEARCH_AUTOCOMPLETE.DEFAULTS.HIGHLIGHT;
}

export function searchAutocompleteIsPrefixMode(mode: SearchAutocompleteMode): boolean {
  return mode === SEARCH_AUTOCOMPLETE.MODES.PREFIX;
}

export function searchAutocompleteIsFuzzyMode(mode: SearchAutocompleteMode): boolean {
  return mode === SEARCH_AUTOCOMPLETE.MODES.FUZZY;
}

export function searchAutocompleteIsSmartMode(mode: SearchAutocompleteMode): boolean {
  return mode === SEARCH_AUTOCOMPLETE.MODES.SMART;
}
