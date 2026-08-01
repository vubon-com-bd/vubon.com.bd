/**
 * Cache management constants for the monorepo
 * All cache-related constants are centralized here for consistent caching strategy
 */

/**
 * Cache key prefixes for different data types
 */
export const CACHE_KEY_PREFIXES = {
  /**
   * User data cache
   */
  USER: 'user:',

  /**
   * Session data cache
   */
  SESSION: 'session:',

  /**
   * Authentication token cache
   */
  TOKEN: 'token:',

  /**
   * OTP/Verification code cache
   */
  OTP: 'otp:',

  /**
   * Product data cache
   */
  PRODUCT: 'product:',

  /**
   * Product list cache
   */
  PRODUCT_LIST: 'product:list:',

  /**
   * Category data cache
   */
  CATEGORY: 'category:',

  /**
   * Order data cache
   */
  ORDER: 'order:',

  /**
   * Payment data cache
   */
  PAYMENT: 'payment:',

  /**
   * User profile cache
   */
  PROFILE: 'profile:',

  /**
   * User settings cache
   */
  SETTINGS: 'settings:',

  /**
   * Permission cache
   */
  PERMISSION: 'permission:',

  /**
   * Role cache
   */
  ROLE: 'role:',

  /**
   * Content cache
   */
  CONTENT: 'content:',

  /**
   * Analytics cache
   */
  ANALYTICS: 'analytics:',

  /**
   * Report cache
   */
  REPORT: 'report:',

  /**
   * API response cache
   */
  API: 'api:',

  /**
   * Search result cache
   */
  SEARCH: 'search:',

  /**
   * Rate limit cache
   */
  RATE_LIMIT: 'rate:limit:',

  /**
   * Session blacklist cache
   */
  SESSION_BLACKLIST: 'session:blacklist:',

  /**
   * Device fingerprint cache
   */
  DEVICE: 'device:',

  /**
   * IP blacklist cache
   */
  IP_BLACKLIST: 'ip:blacklist:',

  /**
   * Webhook cache
   */
  WEBHOOK: 'webhook:',

  /**
   * Template cache
   */
  TEMPLATE: 'template:',

  /**
   * Translation cache
   */
  TRANSLATION: 'translation:',

  /**
   * Configuration cache
   */
  CONFIG: 'config:',

  /**
   * Cache for cache invalidation patterns
   */
  INVALIDATION: 'invalidation:',

  /**
   * Default cache prefix (fallback)
   */
  DEFAULT: 'cache:',
} as const;

export type CacheKeyPrefix = (typeof CACHE_KEY_PREFIXES)[keyof typeof CACHE_KEY_PREFIXES];

/**
 * TTL (Time-To-Live) configurations in seconds
 */
export const CACHE_TTL = {
  /**
   * Session TTL: 1 hour
   */
  SESSION: 3600, // 1 hour

  /**
   * OTP/Verification TTL: 5 minutes
   */
  OTP: 300, // 5 minutes

  /**
   * Email verification TTL: 24 hours
   */
  EMAIL_VERIFICATION: 86400, // 24 hours

  /**
   * Password reset TTL: 30 minutes
   */
  PASSWORD_RESET: 1800, // 30 minutes

  /**
   * Access token TTL: 15 minutes
   */
  ACCESS_TOKEN: 900, // 15 minutes

  /**
   * Refresh token TTL: 7 days
   */
  REFRESH_TOKEN: 604800, // 7 days

  /**
   * User data TTL: 1 hour
   */
  USER: 3600, // 1 hour

  /**
   * Product data TTL: 6 hours
   */
  PRODUCT: 21600, // 6 hours

  /**
   * Product list TTL: 1 hour
   */
  PRODUCT_LIST: 3600, // 1 hour

  /**
   * Category data TTL: 12 hours
   */
  CATEGORY: 43200, // 12 hours

  /**
   * Order data TTL: 15 minutes
   */
  ORDER: 900, // 15 minutes

  /**
   * Payment data TTL: 30 minutes
   */
  PAYMENT: 1800, // 30 minutes

  /**
   * Permission cache TTL: 1 hour
   */
  PERMISSION: 3600, // 1 hour

  /**
   * Role cache TTL: 1 hour
   */
  ROLE: 3600, // 1 hour

  /**
   * API response cache TTL: 5 minutes
   */
  API: 300, // 5 minutes

  /**
   * Search result cache TTL: 5 minutes
   */
  SEARCH: 300, // 5 minutes

  /**
   * Rate limit TTL: 15 minutes
   */
  RATE_LIMIT: 900, // 15 minutes

  /**
   * Device fingerprint TTL: 30 days
   */
  DEVICE: 2592000, // 30 days

  /**
   * Session blacklist TTL: 7 days
   */
  SESSION_BLACKLIST: 604800, // 7 days

  /**
   * IP blacklist TTL: 24 hours
   */
  IP_BLACKLIST: 86400, // 24 hours

  /**
   * Webhook cache TTL: 1 hour
   */
  WEBHOOK: 3600, // 1 hour

  /**
   * Template cache TTL: 24 hours
   */
  TEMPLATE: 86400, // 24 hours

  /**
   * Translation cache TTL: 7 days
   */
  TRANSLATION: 604800, // 7 days

  /**
   * Configuration cache TTL: 24 hours
   */
  CONFIG: 86400, // 24 hours

  /**
   * Default cache TTL: 5 minutes
   */
  DEFAULT: 300, // 5 minutes

  /**
   * Short cache TTL: 30 seconds
   */
  SHORT: 30, // 30 seconds

  /**
   * Long cache TTL: 24 hours
   */
  LONG: 86400, // 24 hours

  /**
   * Permanent cache TTL: 30 days
   */
  PERMANENT: 2592000, // 30 days

  /**
   * Never expire (use with caution)
   */
  NEVER: 0, // No expiry
} as const;

export type CacheTTL = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];

/**
 * Adaptive TTL for different network types in Bangladesh
 */
export const ADAPTIVE_CACHE_TTL = {
  /**
   * 2G network: Slower, keep cache longer
   */
  '2G': {
    MULTIPLIER: 2.0,
    DESCRIPTION: '2G Network - Cache for longer periods',
  },

  /**
   * 3G network: Moderate speed
   */
  '3G': {
    MULTIPLIER: 1.5,
    DESCRIPTION: '3G Network - Moderate cache duration',
  },

  /**
   * 4G/LTE network: Fast network
   */
  '4G': {
    MULTIPLIER: 1.0,
    DESCRIPTION: '4G Network - Standard cache duration',
  },

  /**
   * 5G network: Very fast
   */
  '5G': {
    MULTIPLIER: 0.7,
    DESCRIPTION: '5G Network - Shorter cache duration for fresh data',
  },

  /**
   * WiFi network: Fast and stable
   */
  WIFI: {
    MULTIPLIER: 0.8,
    DESCRIPTION: 'WiFi Network - Optimized cache duration',
  },

  /**
   * Unknown network type
   */
  UNKNOWN: {
    MULTIPLIER: 1.0,
    DESCRIPTION: 'Unknown Network - Standard cache duration',
  },
} as const;

export type AdaptiveCacheTTL = (typeof ADAPTIVE_CACHE_TTL)[keyof typeof ADAPTIVE_CACHE_TTL];

/**
 * Cache invalidation patterns
 */
export const CACHE_INVALIDATION_PATTERNS = {
  /**
   * Invalidate all user-related caches
   */
  USER: 'user:*',

  /**
   * Invalidate specific user cache
   */
  USER_BY_ID: 'user:{userId}:*',

  /**
   * Invalidate all session-related caches
   */
  SESSION: 'session:*',

  /**
   * Invalidate specific session cache
   */
  SESSION_BY_ID: 'session:{sessionId}:*',

  /**
   * Invalidate all product-related caches
   */
  PRODUCT: 'product:*',

  /**
   * Invalidate specific product cache
   */
  PRODUCT_BY_ID: 'product:{productId}:*',

  /**
   * Invalidate all category-related caches
   */
  CATEGORY: 'category:*',

  /**
   * Invalidate all order-related caches
   */
  ORDER: 'order:*',

  /**
   * Invalidate all payment-related caches
   */
  PAYMENT: 'payment:*',

  /**
   * Invalidate all API response caches
   */
  API: 'api:*',

  /**
   * Invalidate all search caches
   */
  SEARCH: 'search:*',

  /**
   * Invalidate all permission-related caches
   */
  PERMISSION: 'permission:*',

  /**
   * Invalidate all role-related caches
   */
  ROLE: 'role:*',

  /**
   * Invalidate all configuration caches
   */
  CONFIG: 'config:*',

  /**
   * Invalidate all caches (use with caution)
   */
  ALL: '*',
} as const;

export type CacheInvalidationPattern =
  (typeof CACHE_INVALIDATION_PATTERNS)[keyof typeof CACHE_INVALIDATION_PATTERNS];

/**
 * Cache invalidation events
 */
export const CACHE_INVALIDATION_EVENTS = {
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_ROLE_CHANGED: 'user.role.changed',
  USER_STATUS_CHANGED: 'user.status.changed',
  USER_PASSWORD_CHANGED: 'user.password.changed',
  USER_EMAIL_CHANGED: 'user.email.changed',

  SESSION_CREATED: 'session.created',
  SESSION_UPDATED: 'session.updated',
  SESSION_DELETED: 'session.deleted',
  SESSION_REVOKED: 'session.revoked',

  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  PRODUCT_STATUS_CHANGED: 'product.status.changed',
  PRODUCT_PRICE_CHANGED: 'product.price.changed',
  PRODUCT_INVENTORY_CHANGED: 'product.inventory.changed',

  CATEGORY_CREATED: 'category.created',
  CATEGORY_UPDATED: 'category.updated',
  CATEGORY_DELETED: 'category.deleted',

  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_DELETED: 'order.deleted',
  ORDER_STATUS_CHANGED: 'order.status.changed',

  PAYMENT_CREATED: 'payment.created',
  PAYMENT_UPDATED: 'payment.updated',
  PAYMENT_DELETED: 'payment.deleted',
  PAYMENT_STATUS_CHANGED: 'payment.status.changed',

  SETTINGS_UPDATED: 'settings.updated',
  CONFIG_UPDATED: 'config.updated',
} as const;

export type CacheInvalidationEvent =
  (typeof CACHE_INVALIDATION_EVENTS)[keyof typeof CACHE_INVALIDATION_EVENTS];

/**
 * Cache invalidation event to pattern mapping
 */
export const CACHE_INVALIDATION_MAPPING: Record<
  CacheInvalidationEvent,
  CacheInvalidationPattern[]
> = {
  'user.updated': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID],
  'user.deleted': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID, CACHE_INVALIDATION_PATTERNS.USER],
  'user.role.changed': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID],
  'user.status.changed': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID],
  'user.password.changed': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID],
  'user.email.changed': [CACHE_INVALIDATION_PATTERNS.USER_BY_ID],
  'session.created': [CACHE_INVALIDATION_PATTERNS.SESSION_BY_ID],
  'session.updated': [CACHE_INVALIDATION_PATTERNS.SESSION_BY_ID],
  'session.deleted': [
    CACHE_INVALIDATION_PATTERNS.SESSION_BY_ID,
    CACHE_INVALIDATION_PATTERNS.SESSION,
  ],
  'session.revoked': [CACHE_INVALIDATION_PATTERNS.SESSION_BY_ID],
  'product.created': [
    CACHE_INVALIDATION_PATTERNS.PRODUCT,
    CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID,
  ],
  'product.updated': [CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID],
  'product.deleted': [
    CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID,
    CACHE_INVALIDATION_PATTERNS.PRODUCT,
  ],
  'product.status.changed': [CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID],
  'product.price.changed': [CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID],
  'product.inventory.changed': [CACHE_INVALIDATION_PATTERNS.PRODUCT_BY_ID],
  'category.created': [CACHE_INVALIDATION_PATTERNS.CATEGORY],
  'category.updated': [CACHE_INVALIDATION_PATTERNS.CATEGORY],
  'category.deleted': [CACHE_INVALIDATION_PATTERNS.CATEGORY],
  'order.created': [CACHE_INVALIDATION_PATTERNS.ORDER],
  'order.updated': [CACHE_INVALIDATION_PATTERNS.ORDER],
  'order.deleted': [CACHE_INVALIDATION_PATTERNS.ORDER],
  'order.status.changed': [CACHE_INVALIDATION_PATTERNS.ORDER],
  'payment.created': [CACHE_INVALIDATION_PATTERNS.PAYMENT],
  'payment.updated': [CACHE_INVALIDATION_PATTERNS.PAYMENT],
  'payment.deleted': [CACHE_INVALIDATION_PATTERNS.PAYMENT],
  'payment.status.changed': [CACHE_INVALIDATION_PATTERNS.PAYMENT],
  'settings.updated': [CACHE_INVALIDATION_PATTERNS.CONFIG],
  'config.updated': [CACHE_INVALIDATION_PATTERNS.CONFIG],
} as const;

/**
 * Caching strategies
 */
export const CACHING_STRATEGIES = {
  /**
   * Cache-Aside (Lazy Loading)
   * Application checks cache first, loads from DB on miss
   */
  CACHE_ASIDE: 'cache-aside',

  /**
   * Write-Through
   * Application writes to cache and DB simultaneously
   */
  WRITE_THROUGH: 'write-through',

  /**
   * Write-Behind (Write-Back)
   * Application writes to cache, DB writes asynchronously
   */
  WRITE_BEHIND: 'write-behind',

  /**
   * Read-Through
   * Cache loads data from DB automatically on miss
   */
  READ_THROUGH: 'read-through',

  /**
   * Refresh-Ahead
   * Cache proactively refreshes frequently accessed data
   */
  REFRESH_AHEAD: 'refresh-ahead',

  /**
   * Time-to-Live (TTL)
   * Standard TTL-based expiration
   */
  TTL: 'ttl',

  /**
   * Least Recently Used (LRU)
   * Evict least recently used items
   */
  LRU: 'lru',

  /**
   * Least Frequently Used (LFU)
   * Evict least frequently used items
   */
  LFU: 'lfu',
} as const;

export type CachingStrategy = (typeof CACHING_STRATEGIES)[keyof typeof CACHING_STRATEGIES];

/**
 * Cache strategy configuration
 */
export const CACHE_STRATEGY_CONFIG = {
  [CACHING_STRATEGIES.CACHE_ASIDE]: {
    priority: 1,
    description: 'Lazy loading - Check cache first, load from DB on miss',
    isDefault: true,
  },
  [CACHING_STRATEGIES.WRITE_THROUGH]: {
    priority: 2,
    description: 'Write to cache and DB simultaneously',
    isDefault: false,
  },
  [CACHING_STRATEGIES.WRITE_BEHIND]: {
    priority: 3,
    description: 'Write to cache, async DB writes',
    isDefault: false,
  },
  [CACHING_STRATEGIES.READ_THROUGH]: {
    priority: 4,
    description: 'Cache auto-loads from DB on miss',
    isDefault: false,
  },
  [CACHING_STRATEGIES.REFRESH_AHEAD]: {
    priority: 5,
    description: 'Proactive refresh of frequently accessed data',
    isDefault: false,
  },
  [CACHING_STRATEGIES.TTL]: {
    priority: 6,
    description: 'Standard TTL-based expiration',
    isDefault: true,
  },
  [CACHING_STRATEGIES.LRU]: {
    priority: 7,
    description: 'Evict least recently used items',
    isDefault: false,
  },
  [CACHING_STRATEGIES.LFU]: {
    priority: 8,
    description: 'Evict least frequently used items',
    isDefault: false,
  },
} as const;

/**
 * Cache configuration interface
 */
export interface CacheConfig {
  /**
   * Cache key prefix
   */
  prefix: CacheKeyPrefix;

  /**
   * Cache TTL in seconds
   */
  ttl: number;

  /**
   * Caching strategy
   */
  strategy: CachingStrategy;

  /**
   * Whether to enable adaptive TTL
   */
  adaptiveTTL: boolean;

  /**
   * Maximum cache size in MB
   */
  maxSizeMB: number;

  /**
   * Whether to compress cache data
   */
  compression: boolean;

  /**
   * Compression threshold in bytes
   */
  compressionThreshold: number;

  /**
   * Cache namespace/group
   */
  namespace: string;

  /**
   * Whether to enable cache analytics
   */
  analytics: boolean;

  /**
   * Whether to enable cache logging
   */
  logging: boolean;
}

/**
 * Default cache configuration by type
 */
export const DEFAULT_CACHE_CONFIGS: Record<string, Omit<CacheConfig, 'prefix'>> = {
  user: {
    ttl: CACHE_TTL.USER,
    strategy: CACHING_STRATEGIES.CACHE_ASIDE,
    adaptiveTTL: true,
    maxSizeMB: 100,
    compression: true,
    compressionThreshold: 1024,
    namespace: 'user',
    analytics: true,
    logging: true,
  },
  session: {
    ttl: CACHE_TTL.SESSION,
    strategy: CACHING_STRATEGIES.WRITE_THROUGH,
    adaptiveTTL: false,
    maxSizeMB: 50,
    compression: false,
    compressionThreshold: 0,
    namespace: 'session',
    analytics: true,
    logging: true,
  },
  otp: {
    ttl: CACHE_TTL.OTP,
    strategy: CACHING_STRATEGIES.TTL,
    adaptiveTTL: false,
    maxSizeMB: 10,
    compression: false,
    compressionThreshold: 0,
    namespace: 'otp',
    analytics: true,
    logging: true,
  },
  product: {
    ttl: CACHE_TTL.PRODUCT,
    strategy: CACHING_STRATEGIES.CACHE_ASIDE,
    adaptiveTTL: true,
    maxSizeMB: 500,
    compression: true,
    compressionThreshold: 2048,
    namespace: 'product',
    analytics: true,
    logging: true,
  },
  api: {
    ttl: CACHE_TTL.API,
    strategy: CACHING_STRATEGIES.CACHE_ASIDE,
    adaptiveTTL: true,
    maxSizeMB: 200,
    compression: true,
    compressionThreshold: 1024,
    namespace: 'api',
    analytics: true,
    logging: false,
  },
} as const;

/**
 * Cache metrics types
 */
export const CACHE_METRICS = {
  HIT_RATE: 'cache.hit.rate',
  MISS_RATE: 'cache.miss.rate',
  HIT_COUNT: 'cache.hit.count',
  MISS_COUNT: 'cache.miss.count',
  SIZE: 'cache.size',
  EVICTION_COUNT: 'cache.eviction.count',
  TTL_EXPIRY_COUNT: 'cache.ttl.expiry.count',
  AVERAGE_LOAD_TIME: 'cache.load.time.avg',
  MAX_LOAD_TIME: 'cache.load.time.max',
  MIN_LOAD_TIME: 'cache.load.time.min',
  AVERAGE_SAVE_TIME: 'cache.save.time.avg',
  MAX_SAVE_TIME: 'cache.save.time.max',
  MIN_SAVE_TIME: 'cache.save.time.min',
  CURRENT_SIZE: 'cache.current.size',
  MAX_SIZE: 'cache.max.size',
  MEMORY_USAGE: 'cache.memory.usage',
} as const;

export type CacheMetric = (typeof CACHE_METRICS)[keyof typeof CACHE_METRICS];

/**
 * Cache error messages
 */
export const CACHE_ERROR_MESSAGES = {
  KEY_NOT_FOUND: 'Cache key not found',
  KEY_EXPIRED: 'Cache key has expired',
  KEY_INVALID: 'Invalid cache key format',
  CONNECTION_FAILED: 'Cache connection failed',
  WRITE_FAILED: 'Cache write failed',
  READ_FAILED: 'Cache read failed',
  DELETE_FAILED: 'Cache delete failed',
  INVALIDATION_FAILED: 'Cache invalidation failed',
  SERIALIZATION_FAILED: 'Cache serialization failed',
  DESERIALIZATION_FAILED: 'Cache deserialization failed',
  COMPRESSION_FAILED: 'Cache compression failed',
  DECOMPRESSION_FAILED: 'Cache decompression failed',
  MAX_SIZE_EXCEEDED: 'Cache maximum size exceeded',
} as const;

export type CacheErrorMessage = (typeof CACHE_ERROR_MESSAGES)[keyof typeof CACHE_ERROR_MESSAGES];

/**
 * Cache success messages
 */
export const CACHE_SUCCESS_MESSAGES = {
  KEY_SET: 'Cache key set successfully',
  KEY_GET: 'Cache key retrieved successfully',
  KEY_DELETED: 'Cache key deleted successfully',
  INVALIDATED: 'Cache invalidated successfully',
  CLEARED: 'Cache cleared successfully',
  SERIALIZED: 'Cache data serialized successfully',
  DESERIALIZED: 'Cache data deserialized successfully',
} as const;

export type CacheSuccessMessage =
  (typeof CACHE_SUCCESS_MESSAGES)[keyof typeof CACHE_SUCCESS_MESSAGES];

/**
 * Helper function to build cache key
 */
export const buildCacheKey = (prefix: CacheKeyPrefix, identifier: string | number): string => {
  return `${prefix}${identifier}`;
};

/**
 * Helper function to build cache key with namespace
 */
export const buildCacheKeyWithNamespace = (
  prefix: CacheKeyPrefix,
  namespace: string,
  identifier: string | number
): string => {
  return `${prefix}${namespace}:${identifier}`;
};

/**
 * Helper function to get adaptive TTL based on network type
 */
export const getAdaptiveTTL = (
  baseTTL: number,
  networkType: keyof typeof ADAPTIVE_CACHE_TTL
): number => {
  const adaptive = ADAPTIVE_CACHE_TTL[networkType] || ADAPTIVE_CACHE_TTL.UNKNOWN;
  return Math.round(baseTTL * adaptive.MULTIPLIER);
};

/**
 * Helper function to get TTL for data type
 */
export const getTTLForDataType = (dataType: keyof typeof CACHE_TTL): number => {
  return CACHE_TTL[dataType] || CACHE_TTL.DEFAULT;
};

/**
 * Helper function to get cache prefix for data type
 */
export const getCachePrefixForDataType = (
  dataType: keyof typeof CACHE_KEY_PREFIXES
): CacheKeyPrefix => {
  return CACHE_KEY_PREFIXES[dataType] || CACHE_KEY_PREFIXES.DEFAULT;
};

/**
 * Helper function to get invalidation patterns for event
 */
export const getInvalidationPatterns = (
  event: CacheInvalidationEvent
): CacheInvalidationPattern[] => {
  return CACHE_INVALIDATION_MAPPING[event] || [];
};

/**
 * Helper function to generate invalidation keys
 */
export const generateInvalidationKeys = (
  pattern: CacheInvalidationPattern,
  placeholders: Record<string, string>
): string => {
  let result: string = pattern;
  for (const [placeholder, value] of Object.entries(placeholders)) {
    result = result.replace(`{${placeholder}}`, value);
  }
  return result;
};

/**
 * All cache constants for export
 */
export const CACHE_CONSTANTS = {
  KEY_PREFIXES: CACHE_KEY_PREFIXES,
  TTL: CACHE_TTL,
  ADAPTIVE_TTL: ADAPTIVE_CACHE_TTL,
  INVALIDATION_PATTERNS: CACHE_INVALIDATION_PATTERNS,
  INVALIDATION_EVENTS: CACHE_INVALIDATION_EVENTS,
  INVALIDATION_MAPPING: CACHE_INVALIDATION_MAPPING,
  STRATEGIES: CACHING_STRATEGIES,
  STRATEGY_CONFIG: CACHE_STRATEGY_CONFIG,
  METRICS: CACHE_METRICS,
  ERROR_MESSAGES: CACHE_ERROR_MESSAGES,
  SUCCESS_MESSAGES: CACHE_SUCCESS_MESSAGES,
  DEFAULT_CONFIGS: DEFAULT_CACHE_CONFIGS,
} as const;

/**
 * All cache constants for export
 */
export const ALL_CACHE_CONSTANTS = {
  ...CACHE_KEY_PREFIXES,
  ...CACHE_TTL,
  ...ADAPTIVE_CACHE_TTL,
  ...CACHE_INVALIDATION_PATTERNS,
  ...CACHE_INVALIDATION_EVENTS,
  ...CACHING_STRATEGIES,
  ...CACHE_METRICS,
  ...CACHE_ERROR_MESSAGES,
  ...CACHE_SUCCESS_MESSAGES,
} as const;
