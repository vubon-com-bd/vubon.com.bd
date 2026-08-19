/**
 * Checkout Cache Constants
 * Contains all caching-related constants for checkout management
 */

export const CheckoutCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    ORDER: 300, // 5 minutes
    PAYMENT: 600, // 10 minutes
    CHECKOUT: 1800, // 30 minutes
    CART: 1800, // 30 minutes
    SHIPPING: 3600, // 1 hour
    COUPON: 300, // 5 minutes
    TRANSACTION: 7200, // 2 hours
    SESSION: 900, // 15 minutes
    INVENTORY: 60, // 1 minute
    PRICE: 120, // 2 minutes
  } as const,

  // Cache key prefixes
  KEY_PREFIX: {
    ORDER: 'order:',
    PAYMENT: 'payment:',
    CHECKOUT: 'checkout:',
    CART: 'cart:',
    SHIPPING: 'shipping:',
    COUPON: 'coupon:',
    TRANSACTION: 'transaction:',
    SESSION: 'session:',
  } as const,

  // Cache strategies
  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_ORDER: 'checkout:order:clear',
    CLEAR_PAYMENT: 'checkout:payment:clear',
    CLEAR_CHECKOUT: 'checkout:clear',
    CLEAR_CART: 'checkout:cart:clear',
    CLEAR_SHIPPING: 'checkout:shipping:clear',
    CLEAR_COUPON: 'checkout:coupon:clear',
    CLEAR_TRANSACTION: 'checkout:transaction:clear',
    CLEAR_SESSION: 'checkout:session:clear',
    CLEAR_ALL: 'checkout:clear:all',
  } as const,

  // Cache batch settings
  BATCH: {
    SIZE: {
      SMALL: 5,
      MEDIUM: 20,
      LARGE: 50,
    } as const,
    DEFAULT_SIZE: 20,
  } as const,

  // Cache pagination settings
  PAGINATION: {
    SIZE: {
      MIN: 1,
      MAX: 50,
      DEFAULT: 10,
    } as const,
    CACHE_PAGE: true,
    CACHE_TOTAL: true,
  } as const,
} as const;

// Cache key builder helper
export const CheckoutCacheKey = {
  order: (id: string): string => `${CheckoutCache.KEY_PREFIX.ORDER}${id}`,
  payment: (id: string): string => `${CheckoutCache.KEY_PREFIX.PAYMENT}${id}`,
  checkout: (id: string): string => `${CheckoutCache.KEY_PREFIX.CHECKOUT}${id}`,
  cart: (userId: string): string => `${CheckoutCache.KEY_PREFIX.CART}${userId}`,
  shipping: (id: string): string => `${CheckoutCache.KEY_PREFIX.SHIPPING}${id}`,
  coupon: (code: string): string => `${CheckoutCache.KEY_PREFIX.COUPON}${code}`,
  transaction: (id: string): string => `${CheckoutCache.KEY_PREFIX.TRANSACTION}${id}`,
  session: (id: string): string => `${CheckoutCache.KEY_PREFIX.SESSION}${id}`,
} as const;

// Cache TTL helper
export const CheckoutCacheTTL = {
  getTTL: (type: keyof typeof CheckoutCache.TTL): number => {
    return CheckoutCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
  getAllTTL: (): typeof CheckoutCache.TTL => {
    return CheckoutCache.TTL;
  },
} as const;
