/**
 * Cache Constants
 * Common cache configurations, TTL values, and cache key patterns
 */

/**
 * Cache TTL (Time To Live) values in seconds
 */
export const CACHE_TTL = {
  /** 1 minute */
  ONE_MINUTE: 60,
  /** 5 minutes */
  FIVE_MINUTES: 300,
  /** 10 minutes */
  TEN_MINUTES: 600,
  /** 15 minutes */
  FIFTEEN_MINUTES: 900,
  /** 30 minutes */
  THIRTY_MINUTES: 1800,
  /** 1 hour */
  ONE_HOUR: 3600,
  /** 2 hours */
  TWO_HOURS: 7200,
  /** 6 hours */
  SIX_HOURS: 21600,
  /** 12 hours */
  TWELVE_HOURS: 43200,
  /** 24 hours / 1 day */
  ONE_DAY: 86400,
  /** 2 days */
  TWO_DAYS: 172800,
  /** 7 days / 1 week */
  ONE_WEEK: 604800,
  /** 30 days / 1 month */
  ONE_MONTH: 2592000,
  /** 365 days / 1 year */
  ONE_YEAR: 31536000,
  /** No expiration / permanent */
  PERMANENT: 0,
} as const;

/**
 * Cache TTL values in milliseconds
 */
export const CACHE_TTL_MS = {
  ONE_MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  TEN_MINUTES: 10 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  THIRTY_MINUTES: 30 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  TWO_HOURS: 2 * 60 * 60 * 1000,
  SIX_HOURS: 6 * 60 * 60 * 1000,
  TWELVE_HOURS: 12 * 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  TWO_DAYS: 2 * 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
  ONE_MONTH: 30 * 24 * 60 * 60 * 1000,
  ONE_YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

/**
 * Cache key prefixes for different modules
 */
export const CACHE_KEY_PREFIX = {
  AUTH: 'auth:',
  USER: 'user:',
  ADMIN: 'admin:',
  VENDOR: 'vendor:',
  PRODUCT: 'product:',
  CATEGORY: 'category:',
  BRAND: 'brand:',
  CART: 'cart:',
  ORDER: 'order:',
  PAYMENT: 'payment:',
  SESSION: 'session:',
  TOKEN: 'token:',
  OTP: 'otp:',
  VERIFICATION: 'verification:',
  SEARCH: 'search:',
  ANALYTICS: 'analytics:',
  NOTIFICATION: 'notification:',
  REPORT: 'report:',
  SEO: 'seo:',
  SETTINGS: 'settings:',
  CONFIG: 'config:',
  TRANSLATION: 'translation:',
  RATE_LIMIT: 'rate_limit:',
  LOCK: 'lock:',
  QUEUE: 'queue:',
  JOB: 'job:',
  SCHEDULE: 'schedule:',
  WEBSOCKET: 'ws:',
  EVENT: 'event:',
  LOG: 'log:',
  AUDIT: 'audit:',
  METRIC: 'metric:',
  STATISTIC: 'statistic:',
  GEO: 'geo:',
  IP: 'ip:',
  LOCATION: 'location:',
  CURRENCY: 'currency:',
  EXCHANGE_RATE: 'exchange_rate:',
  TAX: 'tax:',
  SHIPPING: 'shipping:',
  INVENTORY: 'inventory:',
  WAREHOUSE: 'warehouse:',
  SUPPLIER: 'supplier:',
  COUPON: 'coupon:',
  PROMOTION: 'promotion:',
  FLASH_SALE: 'flash_sale:',
  DEAL: 'deal:',
  REVIEW: 'review:',
  RATING: 'rating:',
  COMMENT: 'comment:',
  LIKE: 'like:',
  FOLLOW: 'follow:',
  FAVORITE: 'favorite:',
  WISHLIST: 'wishlist:',
  COMPARE: 'compare:',
  RECENTLY_VIEWED: 'recently_viewed:',
  RECOMMENDATION: 'recommendation:',
  PERSONALIZATION: 'personalization:',
} as const;

/**
 * Cache key patterns for common operations
 */
export const CACHE_KEY_PATTERN = {
  /** Single item by ID */
  BY_ID: ':id',
  /** Collection/list */
  LIST: ':list',
  /** Paginated list */
  PAGINATED: ':paginated',
  /** Sorted list */
  SORTED: ':sorted',
  /** Filtered list */
  FILTERED: ':filtered',
  /** Search results */
  SEARCH: ':search',
  /** Count/Total */
  COUNT: ':count',
  /** Existence check */
  EXISTS: ':exists',
  /** Latest entry */
  LATEST: ':latest',
  /** Active entries */
  ACTIVE: ':active',
  /** Inactive entries */
  INACTIVE: ':inactive',
  /** Pending entries */
  PENDING: ':pending',
  /** Approved entries */
  APPROVED: ':approved',
  /** Rejected entries */
  REJECTED: ':rejected',
  /** Deleted entries */
  DELETED: ':deleted',
  /** By user */
  BY_USER: ':user',
  /** By vendor */
  BY_VENDOR: ':vendor',
  /** By admin */
  BY_ADMIN: ':admin',
  /** By date */
  BY_DATE: ':date',
  /** By month */
  BY_MONTH: ':month',
  /** By year */
  BY_YEAR: ':year',
  /** By status */
  BY_STATUS: ':status',
  /** By type */
  BY_TYPE: ':type',
  /** By category */
  BY_CATEGORY: ':category',
  /** By brand */
  BY_BRAND: ':brand',
  /** By price range */
  BY_PRICE: ':price',
  /** By location */
  BY_LOCATION: ':location',
  /** By IP address */
  BY_IP: ':ip',
  /** By device */
  BY_DEVICE: ':device',
  /** By browser */
  BY_BROWSER: ':browser',
  /** By platform */
  BY_PLATFORM: ':platform',
  /** By language */
  BY_LANGUAGE: ':language',
  /** By currency */
  BY_CURRENCY: ':currency',
  /** By time range */
  BY_TIME: ':time',
  /** Date range */
  DATE_RANGE: ':date_range',
  /** Time range */
  TIME_RANGE: ':time_range',
} as const;

/**
 * Cache operation types
 */
export const CACHE_OPERATION = {
  GET: 'get',
  SET: 'set',
  DELETE: 'delete',
  CLEAR: 'clear',
  EXISTS: 'exists',
  EXPIRE: 'expire',
  PERSIST: 'persist',
  TTL: 'ttl',
  INCR: 'incr',
  DECR: 'decr',
  APPEND: 'append',
  PREPEND: 'prepend',
  HSET: 'hset',
  HGET: 'hget',
  HDEL: 'hdel',
  HGETALL: 'hgetall',
  LPUSH: 'lpush',
  RPUSH: 'rpush',
  LPOP: 'lpop',
  RPOP: 'rpop',
  LRANGE: 'lrange',
  SADD: 'sadd',
  SREM: 'srem',
  SMEMBERS: 'smembers',
  SISMEMBER: 'sismember',
  ZADD: 'zadd',
  ZREM: 'zrem',
  ZRANGE: 'zrange',
  ZREVRANGE: 'zrevrange',
  ZRANK: 'zrank',
  ZREVRANK: 'zrevrank',
} as const;

/**
 * Cache invalidation strategies
 */
export const CACHE_INVALIDATION = {
  /** Invalidate on write */
  ON_WRITE: 'on_write',
  /** Invalidate on update */
  ON_UPDATE: 'on_update',
  /** Invalidate on delete */
  ON_DELETE: 'on_delete',
  /** Invalidate on schedule */
  ON_SCHEDULE: 'on_schedule',
  /** Invalidate manually */
  MANUAL: 'manual',
  /** Never invalidate (permanent) */
  NEVER: 'never',
  /** Invalidate all related */
  RELATED: 'related',
  /** Invalidate by pattern */
  PATTERN: 'pattern',
} as const;

/**
 * Cache storage types
 */
export const CACHE_STORAGE = {
  MEMORY: 'memory',
  REDIS: 'redis',
  MEMCACHED: 'memcached',
  FILE: 'file',
  DATABASE: 'database',
  S3: 's3',
  CLOUD: 'cloud',
  LOCAL: 'local',
} as const;

/**
 * Cache compression types
 */
export const CACHE_COMPRESSION = {
  NONE: 'none',
  GZIP: 'gzip',
  DEFLATE: 'deflate',
  BROTLI: 'brotli',
  ZSTD: 'zstd',
} as const;

/**
 * Build cache key with prefix and identifier
 */
export function buildCacheKey(prefix: string, identifier: string | number): string {
  return `${prefix}${identifier}`;
}

/**
 * Build cache key with multiple parts
 */
export function buildCacheKeyWithParts(prefix: string, ...parts: (string | number)[]): string {
  return `${prefix}${parts.join(':')}`;
}

/**
 * Build cache key for paginated data
 */
export function buildPaginatedCacheKey(
  prefix: string,
  page: number,
  limit: number,
  ...filters: string[]
): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.PAGINATED}`;
  const filterPart = filters.length > 0 ? `:${filters.join(':')}` : '';
  return `${baseKey}:page${page}:limit${limit}${filterPart}`;
}

/**
 * Build cache key for sorted data
 */
export function buildSortedCacheKey(
  prefix: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  ...filters: string[]
): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.SORTED}`;
  const filterPart = filters.length > 0 ? `:${filters.join(':')}` : '';
  return `${baseKey}:${sortBy}:${sortOrder}${filterPart}`;
}

/**
 * Build cache key for filtered data
 */
export function buildFilteredCacheKey(prefix: string, ...filters: string[]): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.FILTERED}`;
  return `${baseKey}:${filters.join(':')}`;
}

/**
 * Build cache key for search results
 */
export function buildSearchCacheKey(prefix: string, query: string, ...filters: string[]): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.SEARCH}`;
  const filterPart = filters.length > 0 ? `:${filters.join(':')}` : '';
  return `${baseKey}:${query.toLowerCase().trim()}${filterPart}`;
}

/**
 * Build cache key for user-specific data
 */
export function buildUserCacheKey(
  prefix: string,
  userId: string | number,
  ...parts: string[]
): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.BY_USER}`;
  const part = parts.length > 0 ? `:${parts.join(':')}` : '';
  return `${baseKey}:${userId}${part}`;
}

/**
 * Build cache key for vendor-specific data
 */
export function buildVendorCacheKey(
  prefix: string,
  vendorId: string | number,
  ...parts: string[]
): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.BY_VENDOR}`;
  const part = parts.length > 0 ? `:${parts.join(':')}` : '';
  return `${baseKey}:${vendorId}${part}`;
}

/**
 * Build cache key for date-specific data
 */
export function buildDateCacheKey(prefix: string, date: Date, ...parts: string[]): string {
  const baseKey = `${prefix}${CACHE_KEY_PATTERN.BY_DATE}`;
  const dateStr = date.toISOString().split('T')[0];
  const part = parts.length > 0 ? `:${parts.join(':')}` : '';
  return `${baseKey}:${dateStr}${part}`;
}

/**
 * Get TTL in seconds from milliseconds
 */
export function msToSeconds(ms: number): number {
  return Math.floor(ms / 1000);
}

/**
 * Get TTL in milliseconds from seconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Check if TTL is permanent (0 means no expiration)
 */
export function isPermanentCache(ttl: number): boolean {
  return ttl === 0;
}

/**
 * Get expiration timestamp from TTL
 */
export function getExpirationTimestamp(ttl: number): number {
  if (isPermanentCache(ttl)) {
    return -1;
  }
  return Date.now() + secondsToMs(ttl);
}

/**
 * Calculate remaining TTL from expiration timestamp
 */
export function getRemainingTTL(expirationTimestamp: number): number {
  if (expirationTimestamp === -1) {
    return 0;
  }
  const remaining = expirationTimestamp - Date.now();
  return remaining > 0 ? msToSeconds(remaining) : 0;
}
