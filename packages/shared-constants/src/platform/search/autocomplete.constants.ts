export const AUTOCOMPLETE_TYPE = {
  QUERY: 'query',
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  TAG: 'tag',
  TRENDING: 'trending',
  PERSONALIZED: 'personalized',
} as const;

export const AUTOCOMPLETE = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  MAX_SUGGESTIONS: 10,
  DEBOUNCE_MS: 200,
  CACHE_TTL_SECONDS: 60,
  FUZZY_ENABLED: true,
  TYPO_TOLERANCE: 2,
  HIGHLIGHT_MATCH: true,
  INCLUDE_TRENDING: true,
  INCLUDE_RECENT: true,
  MAX_RECENT: 5,
} as const;

export type AutocompleteTypeType = (typeof AUTOCOMPLETE_TYPE)[keyof typeof AUTOCOMPLETE_TYPE];
