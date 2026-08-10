// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Cache TTL (Time To Live) values in seconds
 */
export const CACHE_TTL = {
  /** 1 minute */
  SHORT: 60,
  /** 5 minutes */
  MEDIUM: 300,
  /** 1 hour */
  LONG: 3600,
  /** 1 day */
  DAY: 86400,
  /** 7 days */
  WEEK: 604800,
  /** 30 days */
  MONTH: 2592000,
} as const;

/**
 * Cache key prefixes
 */
export const CACHE_PREFIX = {
  USER: 'user',
  SESSION: 'session',
  TOKEN: 'token',
  CONFIG: 'config',
  SETTINGS: 'settings',
  KYC: 'kyc',
  ACTIVITY: 'activity',
  LOG: 'log',
  DEVICE: 'device',
  ADDRESS: 'address',
  CONTACT: 'contact',
  VERIFICATION: 'verification',
} as const;

/**
 * Maximum number of items in cache
 */
export const CACHE_MAX_ITEMS = 1000;

/**
 * Default TTL in seconds (5 minutes)
 */
export const CACHE_DEFAULT_TTL = CACHE_TTL.MEDIUM;

/**
 * Cache configuration
 */
export const CACHE = {
  TTL: CACHE_TTL,
  PREFIX: CACHE_PREFIX,
  MAX_ITEMS: CACHE_MAX_ITEMS,
  DEFAULT_TTL: CACHE_DEFAULT_TTL,
} as const;

/**
 * Type for cache TTL
 */
export type CacheTtl = typeof CACHE_TTL;

/**
 * Type for cache prefix
 */
export type CachePrefix = typeof CACHE_PREFIX;

/**
 * Type for cache prefix key
 */
export type CachePrefixKey = keyof typeof CACHE_PREFIX;

/**
 * Type for cache configuration
 */
export type CacheConfig = typeof CACHE;
