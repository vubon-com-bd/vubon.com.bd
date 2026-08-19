/**
 * Search & Discovery Cache Constants
 * Contains all caching-related constants for search and discovery management
 */

export const SearchCache = {
  // Cache keys
  KEYS: {
    SEARCH: 'search:',
    RECOMMENDATION: 'recommendation:',
    TRENDING: 'trending:',
    POPULAR: 'popular:',
    RELATED: 'related:',
    SUGGESTIONS: 'suggestions:',
    AUTOCOMPLETE: 'autocomplete:',
    HISTORY: 'history:',
    FILTERS: 'filters:',
  } as const,

  // Default cache TTL in seconds
  DEFAULT_TTL: 3600,

  // Cache TTL for different types
  TTL: {
    SEARCH: 3600, // 1 hour
    RECOMMENDATION: 7200, // 2 hours
    TRENDING: 1800, // 30 minutes
    POPULAR: 3600, // 1 hour
    RELATED: 3600, // 1 hour
    SUGGESTIONS: 86400, // 24 hours
    AUTOCOMPLETE: 86400, // 24 hours
    HISTORY: 86400, // 24 hours
    FILTERS: 7200, // 2 hours
  } as const,

  // Maximum cache entries
  MAX_ENTRIES: 1000,

  // Cache strategies
  STRATEGIES: {
    LRU: 'lru',
    TTL: 'ttl',
    TIMESTAMP: 'timestamp',
    LFU: 'lfu',
    FIFO: 'fifo',
  } as const,

  // Cache prefix
  PREFIX: 'search:',

  // Cache version
  VERSION: 'v1',

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'search:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '2gb',
    EVICTION_POLICY: 'allkeys-lru',
    REPLICATION: {
      MASTER: 'master',
      SLAVE: 'slave',
    },
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_SEARCH: 'search:cache:clear',
    CLEAR_RECOMMENDATION: 'search:recommendation:clear',
    CLEAR_TRENDING: 'search:trending:clear',
    CLEAR_POPULAR: 'search:popular:clear',
    CLEAR_ALL: 'search:cache:clear:all',
  } as const,

  // Batch settings
  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
    } as const,
    DEFAULT_SIZE: 50,
  } as const,

  // Pagination cache settings
  PAGINATION: {
    SIZE: {
      MIN: 1,
      MAX: 100,
      DEFAULT: 20,
    } as const,
    CACHE_PAGE: true,
    CACHE_TOTAL: true,
  } as const,
} as const;

// Cache key builder helper
export const SearchCacheKey = {
  search: (query: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.SEARCH}${encodeURIComponent(query)}`,
  recommendation: (userId: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.RECOMMENDATION}${userId}`,
  trending: (category: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.TRENDING}${category}`,
  popular: (category: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.POPULAR}${category}`,
  related: (itemId: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.RELATED}${itemId}`,
  suggestions: (query: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.SUGGESTIONS}${encodeURIComponent(query)}`,
  autocomplete: (query: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.AUTOCOMPLETE}${encodeURIComponent(query)}`,
  history: (userId: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.HISTORY}${userId}`,
  filters: (category: string): string =>
    `${SearchCache.PREFIX}${SearchCache.VERSION}:${SearchCache.KEYS.FILTERS}${category}`,
} as const;

// Cache TTL helper
export const SearchCacheTTL = {
  getTTL: (type: keyof typeof SearchCache.TTL): number => {
    return SearchCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
} as const;
