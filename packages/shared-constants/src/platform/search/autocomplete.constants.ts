import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const AUTOCOMPLETE = {
  TYPES: {
    ...COMMON_TYPES,
    QUERY: 'query',
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    CONTENT: 'content',
  },
  AUTOCOMPLETE_WEIGHTS: {
    QUERY: 1.0,
    PRODUCT: 1.2,
    CATEGORY: 1.0,
    BRAND: 0.9,
    VENDOR: 0.8,
    CONTENT: 0.6,
  },
  MAX_AUTOCOMPLETE_RESULTS: 10,
  MIN_AUTOCOMPLETE_LENGTH: 2,
  AUTOCOMPLETE_CACHE_TTL_MINUTES: 60,
  DEBOUNCE_DELAY_MS: 300,
} as const;
