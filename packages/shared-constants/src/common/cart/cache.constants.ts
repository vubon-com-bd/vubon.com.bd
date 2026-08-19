/**
 * Cart Cache Constants
 * Contains all caching-related constants for cart management
 */

export const CartCache = {
  // Cache keys
  KEYS: {
    CART: 'cart',
    CART_ITEMS: 'cart_items',
    CART_TOTAL: 'cart_total',
    CART_COUPON: 'cart_coupon',
    CART_SHIPPING: 'cart_shipping',
    CART_TAX: 'cart_tax',
    CART_SUMMARY: 'cart_summary',
    CART_RECENT: 'cart_recent',
  } as const,

  // Cache TTL (Time To Live) in seconds
  TTL: {
    CART: 1800, // 30 minutes
    CART_ITEMS: 1800, // 30 minutes
    CART_TOTAL: 300, // 5 minutes
    CART_COUPON: 600, // 10 minutes
    CART_SHIPPING: 3600, // 1 hour
    CART_TAX: 1800, // 30 minutes
    CART_SUMMARY: 900, // 15 minutes
    CART_RECENT: 7200, // 2 hours
  } as const,

  // Cache prefix
  PREFIX: 'cart:',

  // Cache version
  VERSION: 'v1',

  // Invalidation rules
  INVALIDATION_RULES: {
    ON_ITEM_ADD: ['cart', 'cart_items', 'cart_total', 'cart_summary'],
    ON_ITEM_UPDATE: ['cart', 'cart_items', 'cart_total', 'cart_summary'],
    ON_ITEM_REMOVE: ['cart', 'cart_items', 'cart_total', 'cart_summary'],
    ON_COUPON_APPLY: ['cart', 'cart_coupon', 'cart_total', 'cart_summary'],
    ON_COUPON_REMOVE: ['cart', 'cart_coupon', 'cart_total', 'cart_summary'],
    ON_SHIPPING_UPDATE: ['cart', 'cart_shipping', 'cart_total', 'cart_summary'],
    ON_CART_CLEAR: [
      'cart',
      'cart_items',
      'cart_total',
      'cart_coupon',
      'cart_shipping',
      'cart_tax',
      'cart_summary',
      'cart_recent',
    ],
  } as const,

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'cart:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '1gb',
    EVICTION_POLICY: 'allkeys-lru',
  } as const,

  // Cache strategies
  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
  } as const,

  // Batch settings
  BATCH: {
    SIZE: {
      SMALL: 5,
      MEDIUM: 20,
      LARGE: 50,
    } as const,
    DEFAULT_SIZE: 20,
  } as const,
} as const;

// Cache key builder helper
export const CartCacheKey = {
  cart: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART}:${userId}`,
  cartItems: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_ITEMS}:${userId}`,
  cartTotal: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_TOTAL}:${userId}`,
  cartCoupon: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_COUPON}:${userId}`,
  cartShipping: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_SHIPPING}:${userId}`,
  cartTax: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_TAX}:${userId}`,
  cartSummary: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_SUMMARY}:${userId}`,
  cartRecent: (userId: string): string =>
    `${CartCache.PREFIX}${CartCache.VERSION}:${CartCache.KEYS.CART_RECENT}:${userId}`,
} as const;

// Cache TTL helper
export const CartCacheTTL = {
  getTTL: (type: keyof typeof CartCache.TTL): number => {
    return CartCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
} as const;
