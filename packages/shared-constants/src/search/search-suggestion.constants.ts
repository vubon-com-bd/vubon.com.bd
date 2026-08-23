/**
 * Search Suggestion Constants
 * Suggestion configurations for search
 */

export const SEARCH_SUGGESTION = {
  // Suggestion Types
  TYPES: {
    QUERY: 'query',
    TERM: 'term',
    PHRASE: 'phrase',
    COMPLETION: 'completion',
    CONTEXT: 'context',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRODUCT: 'product',
    CUSTOM: 'custom',
  } as const,

  // Suggestion Modes
  MODES: {
    POPULAR: 'popular',
    RECENT: 'recent',
    RELEVANT: 'relevant',
    CONTEXTUAL: 'contextual',
    PERSONALIZED: 'personalized',
    HYBRID: 'hybrid',
  } as const,

  // Suggestion Weights
  WEIGHTS: {
    POPULARITY: 1.0,
    RECENCY: 0.8,
    RELEVANCE: 0.6,
    CONTEXT: 0.4,
    PERSONALIZATION: 0.3,
    DEFAULT: 0.5,
  } as const,

  // Suggestion Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'completion',
    DEFAULT_MODE: 'hybrid',
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50,
    MIN_CHARS: 2,
    MAX_CHARS: 100,
    DEFAULT_WEIGHT: 0.5,
    MAX_SUGGESTIONS_PER_QUERY: 10,
    CACHE_TTL: 3600,
    MIN_POPULARITY_THRESHOLD: 10,
    MAX_CONTEXT_FIELDS: 5,
  } as const,

  // Suggestion Limits
  LIMITS: {
    MIN_CHARS: 2,
    MAX_CHARS: 100,
    MAX_LIMIT: 50,
    DEFAULT_LIMIT: 10,
    MAX_CONTEXT_FIELDS: 5,
    MAX_WEIGHT: 1.0,
    MIN_WEIGHT: 0.1,
    MAX_SUGGESTIONS_PER_QUERY: 20,
  } as const,
} as const;

// Suggestion Types
export type SearchSuggestionType =
  (typeof SEARCH_SUGGESTION.TYPES)[keyof typeof SEARCH_SUGGESTION.TYPES];

// Suggestion Modes
export type SearchSuggestionMode =
  (typeof SEARCH_SUGGESTION.MODES)[keyof typeof SEARCH_SUGGESTION.MODES];

// Suggestion Weights
export type SearchSuggestionWeight =
  (typeof SEARCH_SUGGESTION.WEIGHTS)[keyof typeof SEARCH_SUGGESTION.WEIGHTS];

// Suggestion Defaults
export type SearchSuggestionDefault =
  (typeof SEARCH_SUGGESTION.DEFAULTS)[keyof typeof SEARCH_SUGGESTION.DEFAULTS];

// Suggestion Limits
export type SearchSuggestionLimit =
  (typeof SEARCH_SUGGESTION.LIMITS)[keyof typeof SEARCH_SUGGESTION.LIMITS];

// Utility Functions
export function searchSuggestionGetTypeLabel(type: SearchSuggestionType): string {
  const labels: Record<SearchSuggestionType, string> = {
    [SEARCH_SUGGESTION.TYPES.QUERY]: 'Query',
    [SEARCH_SUGGESTION.TYPES.TERM]: 'Term',
    [SEARCH_SUGGESTION.TYPES.PHRASE]: 'Phrase',
    [SEARCH_SUGGESTION.TYPES.COMPLETION]: 'Completion',
    [SEARCH_SUGGESTION.TYPES.CONTEXT]: 'Context',
    [SEARCH_SUGGESTION.TYPES.CATEGORY]: 'Category',
    [SEARCH_SUGGESTION.TYPES.BRAND]: 'Brand',
    [SEARCH_SUGGESTION.TYPES.PRODUCT]: 'Product',
    [SEARCH_SUGGESTION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Suggestion Type';
}

export function searchSuggestionGetModeLabel(mode: SearchSuggestionMode): string {
  const labels: Record<SearchSuggestionMode, string> = {
    [SEARCH_SUGGESTION.MODES.POPULAR]: 'Popular',
    [SEARCH_SUGGESTION.MODES.RECENT]: 'Recent',
    [SEARCH_SUGGESTION.MODES.RELEVANT]: 'Relevant',
    [SEARCH_SUGGESTION.MODES.CONTEXTUAL]: 'Contextual',
    [SEARCH_SUGGESTION.MODES.PERSONALIZED]: 'Personalized',
    [SEARCH_SUGGESTION.MODES.HYBRID]: 'Hybrid',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchSuggestionGetWeightLabel(weight: SearchSuggestionWeight): string {
  const labels: Record<SearchSuggestionWeight, string> = {
    [SEARCH_SUGGESTION.WEIGHTS.POPULARITY]: 'Popularity',
    [SEARCH_SUGGESTION.WEIGHTS.RECENCY]: 'Recency',
    [SEARCH_SUGGESTION.WEIGHTS.RELEVANCE]: 'Relevance',
    [SEARCH_SUGGESTION.WEIGHTS.CONTEXT]: 'Context',
    [SEARCH_SUGGESTION.WEIGHTS.PERSONALIZATION]: 'Personalization',
    [SEARCH_SUGGESTION.WEIGHTS.DEFAULT]: 'Default',
  };
  return labels[weight] || 'Unknown Weight';
}

export function searchSuggestionIsQueryType(type: SearchSuggestionType): boolean {
  return type === SEARCH_SUGGESTION.TYPES.QUERY;
}

export function searchSuggestionIsCompletionType(type: SearchSuggestionType): boolean {
  return type === SEARCH_SUGGESTION.TYPES.COMPLETION;
}

export function searchSuggestionIsContextType(type: SearchSuggestionType): boolean {
  return type === SEARCH_SUGGESTION.TYPES.CONTEXT;
}

export function searchSuggestionGetDefaultLimit(): number {
  return SEARCH_SUGGESTION.DEFAULTS.DEFAULT_LIMIT;
}

export function searchSuggestionGetMaxLimit(): number {
  return SEARCH_SUGGESTION.DEFAULTS.MAX_LIMIT;
}

export function searchSuggestionGetMinChars(): number {
  return SEARCH_SUGGESTION.DEFAULTS.MIN_CHARS;
}

export function searchSuggestionGetDefaultWeight(): number {
  return SEARCH_SUGGESTION.DEFAULTS.DEFAULT_WEIGHT;
}

export function searchSuggestionIsPopularMode(mode: SearchSuggestionMode): boolean {
  return mode === SEARCH_SUGGESTION.MODES.POPULAR;
}

export function searchSuggestionIsPersonalizedMode(mode: SearchSuggestionMode): boolean {
  return mode === SEARCH_SUGGESTION.MODES.PERSONALIZED;
}

export function searchSuggestionIsHybridMode(mode: SearchSuggestionMode): boolean {
  return mode === SEARCH_SUGGESTION.MODES.HYBRID;
}
