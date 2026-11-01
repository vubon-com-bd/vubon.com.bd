export const SEARCH_SUGGESTION_TYPE = {
  QUERY: 'query',
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  VENDOR: 'vendor',
  TRENDING: 'trending',
  RECENT: 'recent',
  POPULAR: 'popular',
  PERSONALIZED: 'personalized',
} as const;

export const SEARCH_SUGGESTION = {
  MAX_SUGGESTIONS: 10,
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_MS: 300,
  CACHE_TTL_SECONDS: 300,
  PERSONALIZE: true,
  INCLUDE_TRENDING: true,
  INCLUDE_RECENT: true,
  INCLUDE_POPULAR: true,
  MAX_RECENT: 5,
  DIVERSITY_ENABLED: true,
} as const;

export type SearchSuggestionTypeType =
  (typeof SEARCH_SUGGESTION_TYPE)[keyof typeof SEARCH_SUGGESTION_TYPE];
