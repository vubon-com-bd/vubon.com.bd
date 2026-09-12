/**
 * Cache Configuration Constants
 * @module shared-constants/common/cache.constants
 */

export const CACHE = {
  // Default TTL in seconds
  DEFAULT_TTL: 3600, // 1 hour
  SHORT_TTL: 300, // 5 minutes
  MEDIUM_TTL: 1800, // 30 minutes
  LONG_TTL: 86400, // 24 hours
  EXTRA_LONG_TTL: 604800, // 7 days

  // Cache key prefixes
  PREFIX: {
    USER: 'user:',
    SESSION: 'session:',
    PRODUCT: 'product:',
    CATEGORY: 'category:',
    ORDER: 'order:',
    CART: 'cart:',
    WISHLIST: 'wishlist:',
    REVIEW: 'review:',
    RATING: 'rating:',
    SEARCH: 'search:',
    FILTER: 'filter:',
    PAGINATION: 'pagination:',
    AUTH: 'auth:',
    TOKEN: 'token:',
    PERMISSION: 'permission:',
    ROLE: 'role:',
    CONFIG: 'config:',
    SETTING: 'setting:',
    TRANSLATION: 'translation:',
    GEO: 'geo:',
    LOCATION: 'location:',
    DIVISION: 'division:',
    DISTRICT: 'district:',
    UPAZILA: 'upazila:',
    CURRENCY: 'currency:',
    EXCHANGE_RATE: 'exchange_rate:',
    PRICE: 'price:',
    DISCOUNT: 'discount:',
    TAX: 'tax:',
    SHIPPING: 'shipping:',
    PAYMENT: 'payment:',
    NOTIFICATION: 'notification:',
    EMAIL: 'email:',
    SMS: 'sms:',
    ANALYTICS: 'analytics:',
    REPORT: 'report:',
    DASHBOARD: 'dashboard:',
    STATS: 'stats:',
  } as const,

  // Cache strategies
  STRATEGY: {
    CACHE_THROUGH: 'cache-through',
    CACHE_ASIDE: 'cache-aside',
    WRITE_THROUGH: 'write-through',
    WRITE_BEHIND: 'write-behind',
    REFRESH_AHEAD: 'refresh-ahead',
  } as const,

  // Eviction policies
  EVICTION: {
    LRU: 'lru', // Least Recently Used
    LFU: 'lfu', // Least Frequently Used
    FIFO: 'fifo', // First In First Out
    TTL: 'ttl', // Time To Live
    RANDOM: 'random',
  } as const,

  // Max items per cache
  MAX_ITEMS: {
    SMALL: 100,
    MEDIUM: 1000,
    LARGE: 10000,
    XLARGE: 100000,
  } as const,

  // Max memory in MB
  MAX_MEMORY: {
    SMALL: 64,
    MEDIUM: 256,
    LARGE: 512,
    XLARGE: 1024,
  } as const,
} as const;

export type CachePrefix = (typeof CACHE.PREFIX)[keyof typeof CACHE.PREFIX];
export type CacheStrategy = (typeof CACHE.STRATEGY)[keyof typeof CACHE.STRATEGY];
export type CacheEviction = (typeof CACHE.EVICTION)[keyof typeof CACHE.EVICTION];
