/**
 * Vendor Cache Constants
 * Contains all caching-related constants for vendor management
 */

export const VendorCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    VERY_LONG: 86400, // 24 hours
    ETERNAL: 604800, // 7 days
  } as const,

  // Cache key prefixes
  KEY_PREFIX: {
    VENDOR: 'vendor:',
    USER: 'user:',
    PRODUCT: 'product:',
    ORDER: 'order:',
    SESSION: 'session:',
    DOCUMENT: 'document:',
    PAYMENT: 'payment:',
    SUBSCRIPTION: 'subscription:',
    ANALYTICS: 'analytics:',
    REPORT: 'report:',
  } as const,

  // Cache strategies
  STRATEGIES: {
    CACHE_THROUGH: 'cache_through',
    CACHE_ASIDE: 'cache_aside',
    REFRESH_AHEAD: 'refresh_ahead',
    WRITE_THROUGH: 'write_through',
    WRITE_BEHIND: 'write_behind',
  } as const,

  // Cache eviction policies
  EVICTION_POLICY: {
    LRU: 'lru', // Least Recently Used
    LFU: 'lfu', // Least Frequently Used
    FIFO: 'fifo', // First In First Out
    TTL: 'ttl', // Time To Live
  } as const,

  // Cache serialization formats
  SERIALIZATION: {
    JSON: 'json',
    MSGPACK: 'msgpack',
    PROTOBUF: 'protobuf',
    BSON: 'bson',
  } as const,

  // Cache compression
  COMPRESSION: {
    ENABLED: true,
    DISABLED: false,
    LEVEL: {
      MINIMAL: 1,
      MEDIUM: 6,
      MAXIMUM: 9,
    } as const,
  } as const,

  // Cache configuration
  CONFIG: {
    DEFAULT_TTL: 3600,
    MAX_ENTRIES: 10000,
    BATCH_SIZE: 100,
    COMPRESS_THRESHOLD: 1024, // 1KB
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_VENDOR: 'vendor:cache:clear',
    CLEAR_USER: 'vendor:user:clear',
    CLEAR_PRODUCT: 'vendor:product:clear',
    CLEAR_ORDER: 'vendor:order:clear',
    CLEAR_SESSION: 'vendor:session:clear',
    CLEAR_ALL: 'vendor:cache:clear:all',
  } as const,

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'vendor:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '2gb',
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
} as const;

// Cache key builder helper
export const VendorCacheKey = {
  vendor: (id: string): string => `${VendorCache.KEY_PREFIX.VENDOR}${id}`,
  user: (id: string): string => `${VendorCache.KEY_PREFIX.USER}${id}`,
  product: (id: string): string => `${VendorCache.KEY_PREFIX.PRODUCT}${id}`,
  order: (id: string): string => `${VendorCache.KEY_PREFIX.ORDER}${id}`,
  session: (id: string): string => `${VendorCache.KEY_PREFIX.SESSION}${id}`,
  document: (id: string): string => `${VendorCache.KEY_PREFIX.DOCUMENT}${id}`,
  payment: (id: string): string => `${VendorCache.KEY_PREFIX.PAYMENT}${id}`,
  subscription: (id: string): string => `${VendorCache.KEY_PREFIX.SUBSCRIPTION}${id}`,
  analytics: (id: string): string => `${VendorCache.KEY_PREFIX.ANALYTICS}${id}`,
  report: (id: string): string => `${VendorCache.KEY_PREFIX.REPORT}${id}`,
} as const;

// Cache TTL helper
export const VendorCacheTTL = {
  getTTL: (type: keyof typeof VendorCache.TTL): number => {
    return VendorCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(604800, ttl)); // Max 7 days, min 1 second
  },
} as const;

// Cache strategy helper
export const VendorCacheStrategy = {
  getStrategy: (type: keyof typeof VendorCache.STRATEGIES): string => {
    return VendorCache.STRATEGIES[type];
  },
  isCacheThrough: (strategy: string): boolean => {
    return strategy === VendorCache.STRATEGIES.CACHE_THROUGH;
  },
  isCacheAside: (strategy: string): boolean => {
    return strategy === VendorCache.STRATEGIES.CACHE_ASIDE;
  },
  isRefreshAhead: (strategy: string): boolean => {
    return strategy === VendorCache.STRATEGIES.REFRESH_AHEAD;
  },
  isWriteThrough: (strategy: string): boolean => {
    return strategy === VendorCache.STRATEGIES.WRITE_THROUGH;
  },
} as const;
