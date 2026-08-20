/**
 * SEO & AI Cache Constants
 * Contains all caching-related constants for SEO and AI management
 */

export const SeoAiCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    DAY: 86400, // 24 hours
    AI_PREDICTION: 300, // 5 minutes
    SEO_AUDIT: 3600, // 1 hour
    KEYWORD_RANKING: 3600, // 1 hour
    CONTENT_RECOMMENDATION: 600, // 10 minutes
    MODEL_CACHE: 86400, // 24 hours
    TRAINING_DATA: 86400, // 24 hours
  } as const,

  // Cache key prefixes
  PREFIX: {
    AI: 'ai:',
    SEO: 'seo:',
    MODEL: 'model:',
    RECOMMENDATION: 'rec:',
    KEYWORD: 'keyword:',
    AUDIT: 'audit:',
    CONTENT: 'content:',
    TRAINING: 'training:',
    PREDICTION: 'prediction:',
    RANKING: 'ranking:',
  } as const,

  // Maximum cache size (number of entries)
  MAX_SIZE: 10000,

  // Cache strategies
  STRATEGY: {
    TTL: 'ttl',
    LRU: 'lru',
    LFU: 'lfu',
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_AI: 'seo-ai:ai:clear',
    CLEAR_SEO: 'seo-ai:seo:clear',
    CLEAR_MODEL: 'seo-ai:model:clear',
    CLEAR_RECOMMENDATION: 'seo-ai:rec:clear',
    CLEAR_KEYWORD: 'seo-ai:keyword:clear',
    CLEAR_AUDIT: 'seo-ai:audit:clear',
    CLEAR_ALL: 'seo-ai:clear:all',
  } as const,

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'seo-ai:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '1gb',
    EVICTION_POLICY: 'allkeys-lru',
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
export const SeoAiCacheKey = {
  ai: (id: string): string => `${SeoAiCache.PREFIX.AI}${id}`,
  seo: (id: string): string => `${SeoAiCache.PREFIX.SEO}${id}`,
  model: (id: string): string => `${SeoAiCache.PREFIX.MODEL}${id}`,
  recommendation: (id: string): string => `${SeoAiCache.PREFIX.RECOMMENDATION}${id}`,
  keyword: (id: string): string => `${SeoAiCache.PREFIX.KEYWORD}${id}`,
  audit: (id: string): string => `${SeoAiCache.PREFIX.AUDIT}${id}`,
  content: (id: string): string => `${SeoAiCache.PREFIX.CONTENT}${id}`,
  training: (id: string): string => `${SeoAiCache.PREFIX.TRAINING}${id}`,
  prediction: (id: string): string => `${SeoAiCache.PREFIX.PREDICTION}${id}`,
  ranking: (id: string): string => `${SeoAiCache.PREFIX.RANKING}${id}`,
  buildKey: (prefix: string, ...parts: string[]): string => {
    return `${prefix}${parts.join(':')}`;
  },
} as const;

// Cache TTL helper
export const SeoAiCacheTTL = {
  getTTL: (type: keyof typeof SeoAiCache.TTL): number => {
    return SeoAiCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(604800, ttl)); // Max 7 days, min 1 second
  },
} as const;

// Cache configuration helper
export const SeoAiCacheConfig = {
  getPrefix: (type: keyof typeof SeoAiCache.PREFIX): string => {
    return SeoAiCache.PREFIX[type];
  },
  getStrategy: (type: keyof typeof SeoAiCache.STRATEGY): string => {
    return SeoAiCache.STRATEGY[type];
  },
  getMaxSize: (): number => {
    return SeoAiCache.MAX_SIZE;
  },
} as const;
