/**
 * Cache Configuration
 * বাংলাদেশের কনটেক্সট অনুযায়ী ক্যাশ কনফিগারেশন
 */
export const CACHE = {
  // Time to Live (in seconds)
  TTL: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    DAY: 86400, // 24 hours
    WEEK: 604800, // 7 days
    MONTH: 2592000, // 30 days
  },

  // Cache key prefixes
  PREFIX: {
    USER: 'user:',
    SESSION: 'session:',
    PRODUCT: 'product:',
    CATEGORY: 'category:',
    ORDER: 'order:',
    PAYMENT: 'payment:',
    CONFIG: 'config:',
    RATE_LIMIT: 'rate_limit:',
    OTP: 'otp:',
    VERIFICATION: 'verification:',
    RESET_PASSWORD: 'reset_password:',
    AUTH: 'auth:',
  },

  // Cache control headers
  HEADERS: {
    NO_STORE: 'no-store',
    NO_CACHE: 'no-cache',
    MUST_REVALIDATE: 'must-revalidate',
    PUBLIC: 'public',
    PRIVATE: 'private',
    MAX_AGE: 'max-age',
    S_MAXAGE: 's-maxage',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    STALE_IF_ERROR: 'stale-if-error',
  },

  // Default cache control values
  DEFAULT: {
    MAX_AGE: 3600,
    STALE_WHILE_REVALIDATE: 86400,
    STALE_IF_ERROR: 3600,
  },
} as const;

export type CacheTTL = (typeof CACHE.TTL)[keyof typeof CACHE.TTL];
export type CachePrefix = (typeof CACHE.PREFIX)[keyof typeof CACHE.PREFIX];
