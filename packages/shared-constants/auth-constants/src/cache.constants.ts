/**
 * Cache Constants - Pure immutable cache configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-constants/auth-constants/cache.constants

 * RULES:
 * ✅ NO redis client, cache set/get operations
 * ✅ NO functions - ONLY pure string constants
 * ✅ NO dynamic values
 * ✅ NO business logic
 * ✅ ONLY readonly constants with string patterns
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// Redis key prefixes (namespace isolation)
// ============================================================
export const CACHE_KEY_PREFIXES = {
  // Core domain prefixes
  USER: 'user:',
  SESSION: 'session:',
  PRODUCT: 'product:',
  CATEGORY: 'category:',
  ORDER: 'order:',
  CART: 'cart:',
  INVENTORY: 'inventory:',
  PRICE: 'price:',

  // Performance & optimization
  RATE_LIMIT: 'ratelimit:',
  API_RESPONSE: 'api:',
  VIEW_COUNT: 'view:',
  SEARCH: 'search:',

  // Authorization
  PERMISSION: 'perm:',
  ROLE: 'role:',

  // System
  CONFIG: 'config:',
  COUNTER: 'counter:',
  LOCK: 'lock:',
  QUEUE: 'queue:',

  // E-commerce specific (Bangladesh)
  BANNER: 'banner:',
  OFFER: 'offer:',
  COUPON: 'coupon:',
  FLASH_SALE: 'flash:',
  BRAND: 'brand:',
  REVIEW: 'review:',
  RATING: 'rating:',

  // Multi-vendor support
  VENDOR: 'vendor:',
  VENDOR_PRODUCT: 'vendor_product:',

  // Geographic (Bangladesh specific)
  DISTRICT: 'district:',
  CITY: 'city:',
  SHIPPING_ZONE: 'shipping_zone:',

  // SEO & Static
  SITEMAP: 'sitemap:',
  SEO_REDIRECT: 'seo_redirect:',
  STATIC_PAGE: 'static:',
} as const;

export type CacheKeyPrefix = ValueOf<typeof CACHE_KEY_PREFIXES>;

// ============================================================
// Cache key patterns (String-based - NO FUNCTIONS ALLOWED)
// Format: use {{placeholder}} for dynamic parts
// Consumer will do: pattern.replace('{{id}}', actualId)
// ============================================================
export const CACHE_KEY_PATTERNS = {
  // ========== User related ==========
  /** Pattern: user:profile:{{userId}} */
  USER_PROFILE: `${CACHE_KEY_PREFIXES.USER}profile:{{userId}}`,
  USER_SETTINGS: `${CACHE_KEY_PREFIXES.USER}settings:{{userId}}`,
  USER_ADDRESSES: `${CACHE_KEY_PREFIXES.USER}addresses:{{userId}}`,
  USER_RECENT_VIEWS: `${CACHE_KEY_PREFIXES.USER}recent_views:{{userId}}`,
  USER_WISHLIST: `${CACHE_KEY_PREFIXES.USER}wishlist:{{userId}}`,
  USER_COMPARE: `${CACHE_KEY_PREFIXES.USER}compare:{{userId}}`,

  // ========== Session related ==========
  SESSION_DATA: `${CACHE_KEY_PREFIXES.SESSION}{{sessionId}}`,
  SESSION_USER_DEVICE: `${CACHE_KEY_PREFIXES.SESSION}user:{{userId}}:{{deviceId}}`,
  SESSION_USER_LIST: `${CACHE_KEY_PREFIXES.SESSION}list:{{userId}}`,

  // ========== Product related ==========
  PRODUCT_DETAIL: `${CACHE_KEY_PREFIXES.PRODUCT}detail:{{productId}}`,
  PRODUCT_DETAIL_BY_SLUG: `${CACHE_KEY_PREFIXES.PRODUCT}detail:slug:{{slug}}`,
  PRODUCT_LIST_BY_CATEGORY: `${CACHE_KEY_PREFIXES.PRODUCT}list:category:{{categoryId}}:page:{{page}}:limit:{{limit}}:sort:{{sort}}`,
  PRODUCT_LIST_BY_BRAND: `${CACHE_KEY_PREFIXES.PRODUCT}list:brand:{{brandId}}:page:{{page}}`,
  PRODUCT_LIST_SEARCH: `${CACHE_KEY_PREFIXES.PRODUCT}list:search:{{queryHash}}:page:{{page}}`,
  PRODUCT_FLASH_SALE: `${CACHE_KEY_PREFIXES.PRODUCT}flash_sale:{{saleId}}`,
  PRODUCT_VARIANTS: `${CACHE_KEY_PREFIXES.PRODUCT}variants:{{productId}}`,
  PRODUCT_RELATED: `${CACHE_KEY_PREFIXES.PRODUCT}related:{{productId}}:limit:{{limit}}`,
  PRODUCT_REVIEWS: `${CACHE_KEY_PREFIXES.PRODUCT}reviews:{{productId}}:page:{{page}}`,
  PRODUCT_RATING: `${CACHE_KEY_PREFIXES.PRODUCT}rating:{{productId}}`,
  PRODUCT_STOCK: `${CACHE_KEY_PREFIXES.PRODUCT}stock:{{productId}}`,
  PRODUCT_LOW_STOCK: `${CACHE_KEY_PREFIXES.PRODUCT}low_stock`,

  // ========== Category related ==========
  CATEGORY_TREE: `${CACHE_KEY_PREFIXES.CATEGORY}tree`,
  CATEGORY_DETAIL: `${CACHE_KEY_PREFIXES.CATEGORY}detail:{{categoryId}}`,
  CATEGORY_PATH: `${CACHE_KEY_PREFIXES.CATEGORY}path:{{categoryId}}`,
  CATEGORY_CHILDREN: `${CACHE_KEY_PREFIXES.CATEGORY}children:{{parentId}}`,
  CATEGORY_META: `${CACHE_KEY_PREFIXES.CATEGORY}meta:{{categoryId}}`,

  // ========== Cart related ==========
  CART_USER: `${CACHE_KEY_PREFIXES.CART}{{userId}}`,
  CART_COUNT: `${CACHE_KEY_PREFIXES.CART}count:{{userId}}`,
  CART_COUPON: `${CACHE_KEY_PREFIXES.CART}coupon:{{userId}}`,

  // ========== Order related ==========
  ORDER_DETAIL: `${CACHE_KEY_PREFIXES.ORDER}detail:{{orderId}}`,
  ORDER_TRACKING: `${CACHE_KEY_PREFIXES.ORDER}tracking:{{trackingId}}`,
  ORDER_USER_HISTORY: `${CACHE_KEY_PREFIXES.ORDER}user:{{userId}}:page:{{page}}`,
  ORDER_STATUS: `${CACHE_KEY_PREFIXES.ORDER}status:{{orderId}}`,
  ORDER_PENDING_COUNT: `${CACHE_KEY_PREFIXES.ORDER}pending_count`,

  // ========== Inventory related ==========
  INVENTORY_BY_SKU: `${CACHE_KEY_PREFIXES.INVENTORY}sku:{{sku}}`,
  INVENTORY_PRODUCT_VARIANT: `${CACHE_KEY_PREFIXES.INVENTORY}product:{{productId}}:variant:{{variantId}}`,
  INVENTORY_RESERVED: `${CACHE_KEY_PREFIXES.INVENTORY}reserved:{{sessionId}}`,

  // ========== Price related ==========
  PRICE_PRODUCT: `${CACHE_KEY_PREFIXES.PRICE}product:{{productId}}`,
  PRICE_USER_SPECIFIC: `${CACHE_KEY_PREFIXES.PRICE}user:{{userId}}:product:{{productId}}`,
  PRICE_BULK_DISCOUNT: `${CACHE_KEY_PREFIXES.PRICE}bulk:product:{{productId}}:quantity:{{quantity}}`,

  // ========== API Response cache ==========
  API_RESPONSE_CACHE: `${CACHE_KEY_PREFIXES.API_RESPONSE}{{endpointHash}}:{{paramsHash}}`,

  // ========== Search cache ==========
  SEARCH_RESULTS: `${CACHE_KEY_PREFIXES.SEARCH}{{queryHash}}:page:{{page}}:limit:{{limit}}`,
  SEARCH_SUGGESTIONS: `${CACHE_KEY_PREFIXES.SEARCH}suggestions:{{partialQuery}}`,
  SEARCH_POPULAR: `${CACHE_KEY_PREFIXES.SEARCH}popular`,
  SEARCH_HISTORY: `${CACHE_KEY_PREFIXES.SEARCH}history:{{userId}}`,

  // ========== Permission & Role ==========
  PERMISSION_USER: `${CACHE_KEY_PREFIXES.PERMISSION}user:{{userId}}`,
  PERMISSION_ROLE: `${CACHE_KEY_PREFIXES.PERMISSION}role:{{roleId}}`,
  ROLE_DATA: `${CACHE_KEY_PREFIXES.ROLE}{{roleId}}`,

  // ========== Vendor (Multi-vendor) ==========
  VENDOR_DETAIL: `${CACHE_KEY_PREFIXES.VENDOR}detail:{{vendorId}}`,
  VENDOR_PRODUCTS: `${CACHE_KEY_PREFIXES.VENDOR}products:{{vendorId}}:page:{{page}}`,
  VENDOR_REVENUE: `${CACHE_KEY_PREFIXES.VENDOR}revenue:{{vendorId}}:date:{{date}}`,

  // ========== Bangladesh specific (Geo) ==========
  DISTRICT_LIST: `${CACHE_KEY_PREFIXES.DISTRICT}list`,
  DISTRICT_CITIES: `${CACHE_KEY_PREFIXES.DISTRICT}{{districtId}}:cities`,
  SHIPPING_ZONE_BY_POSTAL: `${CACHE_KEY_PREFIXES.SHIPPING_ZONE}postal:{{postalCode}}`,

  // ========== Offers & Promotions ==========
  OFFER_ACTIVE_HOMEPAGE: `${CACHE_KEY_PREFIXES.OFFER}active:homepage`,
  OFFER_BY_CATEGORY: `${CACHE_KEY_PREFIXES.OFFER}category:{{categoryId}}`,
  COUPON_BY_CODE: `${CACHE_KEY_PREFIXES.COUPON}code:{{couponCode}}`,
  FLASH_SALE_ACTIVE: `${CACHE_KEY_PREFIXES.FLASH_SALE}active`,
  FLASH_SALE_PRODUCTS: `${CACHE_KEY_PREFIXES.FLASH_SALE}{{saleId}}:products`,

  // ========== Rate Limiting ==========
  RATE_LIMIT_KEY: `${CACHE_KEY_PREFIXES.RATE_LIMIT}{{ip}}:{{endpoint}}`,
  RATE_LIMIT_USER: `${CACHE_KEY_PREFIXES.RATE_LIMIT}user:{{userId}}:{{endpoint}}`,

  // ========== Locks ==========
  LOCK_RESOURCE: `${CACHE_KEY_PREFIXES.LOCK}resource:{{resourceId}}`,
  LOCK_ORDER: `${CACHE_KEY_PREFIXES.LOCK}order:{{orderId}}`,
  LOCK_INVENTORY: `${CACHE_KEY_PREFIXES.LOCK}inventory:{{productId}}`,

  // ========== Static & SEO ==========
  SITEMAP_PAGE: `${CACHE_KEY_PREFIXES.SITEMAP}{{type}}:page:{{page}}`,
  STATIC_PAGE_CONTENT: `${CACHE_KEY_PREFIXES.STATIC_PAGE}{{pageSlug}}`,
  BANNER_BY_LOCATION: `${CACHE_KEY_PREFIXES.BANNER}location:{{location}}`,

  // ========== System ==========
  SYSTEM_CONFIG: `${CACHE_KEY_PREFIXES.CONFIG}{{key}}`,
  COUNTER_DAILY: `${CACHE_KEY_PREFIXES.COUNTER}{{name}}:{{date}}`,
  QUEUE_PROCESSING: `${CACHE_KEY_PREFIXES.QUEUE}{{queueName}}:processing`,
} as const;

export type CacheKeyPattern = ValueOf<typeof CACHE_KEY_PATTERNS>;

// ============================================================
// Cache TTL values (in seconds) - Production optimized
// ============================================================
export const CACHE_TTL = {
  // ========== Time constants ==========
  SECOND: 1,
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,

  // ========== Short-lived caches (High volatility) ==========
  RATE_LIMIT: 60,
  LOCK: 30,
  ORDER_STATUS: 30,
  INVENTORY_RESERVED: 300,
  FLASH_SALE: 60,

  // ========== Short-medium caches ==========
  VERY_SHORT: 300,
  SHORT: 900,
  SEARCH_RESULTS: 600,
  PRODUCT_LIST: 900,
  CART_DATA: 600,

  // ========== Medium-lived caches ==========
  MEDIUM: 1800,
  DEFAULT: 3600,
  STANDARD: 3600,
  USER_PROFILE: 3600,
  PRODUCT_DETAIL: 7200,

  // ========== Long-lived caches ==========
  LONG: 86400,
  CATEGORY_TREE: 86400,
  BRAND_LIST: 86400,
  DISTRICT_LIST: 604800,

  // ========== Very long caches ==========
  VERY_LONG: 604800,
  EXTENDED: 2592000,
  STATIC_PAGE: 2592000,
  SITEMAP: 86400,

  // ========== Cache stampede protection ==========
  MAX_JITTER_PERCENT: 20,

  // ========== Special values ==========
  NEVER_EXPIRE: -1,
  SESSION: 7200,
} as const;

export type CacheTTL = ValueOf<typeof CACHE_TTL>;

// ============================================================
// Cache namespaces (For logical grouping)
// ============================================================
export const CACHE_NAMESPACES = {
  USER_SESSION: 'session',
  USER_DATA: 'user_data',
  USER_PREFERENCES: 'user_prefs',
  PRODUCT_CATALOG: 'catalog',
  PRICE_CACHE: 'pricing',
  INVENTORY_STATUS: 'inventory',
  ORDER_DATA: 'orders',
  CONFIGURATION: 'config',
  TEMPLATES: 'templates',
  TRANSLATIONS: 'i18n',
  SEO_DATA: 'seo',
  REPORT_DATA: 'reports',
  ANALYTICS: 'analytics',
} as const;

export type CacheNamespace = ValueOf<typeof CACHE_NAMESPACES>;

// ============================================================
// Cache invalidation patterns (Wildcard based)
// ============================================================
export const CACHE_INVALIDATION_PATTERNS = {
  // User related invalidation patterns
  USER_ALL: `${CACHE_KEY_PREFIXES.USER}*`,
  USER_PROFILE_PATTERN: `${CACHE_KEY_PREFIXES.USER}profile:*`,
  USER_SESSION_PATTERN: `${CACHE_KEY_PREFIXES.SESSION}*`,

  // Product related invalidation patterns
  PRODUCT_ALL: `${CACHE_KEY_PREFIXES.PRODUCT}*`,
  PRODUCT_DETAIL_PATTERN: `${CACHE_KEY_PREFIXES.PRODUCT}detail:*`,
  PRODUCT_LIST_PATTERN: `${CACHE_KEY_PREFIXES.PRODUCT}list:*`,

  // Category related invalidation patterns
  CATEGORY_ALL: `${CACHE_KEY_PREFIXES.CATEGORY}*`,
  CATEGORY_TREE_PATTERN: `${CACHE_KEY_PREFIXES.CATEGORY}tree*`,

  // Cart invalidation
  CART_USER_PATTERN: `${CACHE_KEY_PREFIXES.CART}*`,

  // Order invalidation
  ORDER_ALL: `${CACHE_KEY_PREFIXES.ORDER}*`,

  // Inventory invalidation
  INVENTORY_ALL: `${CACHE_KEY_PREFIXES.INVENTORY}*`,

  // Price invalidation
  PRICE_ALL: `${CACHE_KEY_PREFIXES.PRICE}*`,

  // Search invalidation
  SEARCH_ALL: `${CACHE_KEY_PREFIXES.SEARCH}*`,

  // Vendor invalidation
  VENDOR_ALL: `${CACHE_KEY_PREFIXES.VENDOR}*`,

  // Offer invalidation
  OFFER_ALL: `${CACHE_KEY_PREFIXES.OFFER}*`,
  FLASH_SALE_ALL: `${CACHE_KEY_PREFIXES.FLASH_SALE}*`,

  // System invalidation
  CONFIG_ALL: `${CACHE_KEY_PREFIXES.CONFIG}*`,
  STATIC_ALL: `${CACHE_KEY_PREFIXES.STATIC_PAGE}*`,
} as const;

export type CacheInvalidationPattern = ValueOf<typeof CACHE_INVALIDATION_PATTERNS>;

// ============================================================
// Events that trigger cache invalidation
// ============================================================
export const CACHE_INVALIDATION_EVENTS = {
  // User events
  USER_UPDATED: 'cache.invalidate.user',
  USER_DELETED: 'cache.invalidate.user.delete',
  USER_SESSION_CHANGED: 'cache.invalidate.user.session',

  // Product events
  PRODUCT_CREATED: 'cache.invalidate.product.create',
  PRODUCT_UPDATED: 'cache.invalidate.product.update',
  PRODUCT_DELETED: 'cache.invalidate.product.delete',
  PRODUCT_PRICE_CHANGED: 'cache.invalidate.product.price',
  PRODUCT_STOCK_CHANGED: 'cache.invalidate.product.stock',

  // Category events
  CATEGORY_UPDATED: 'cache.invalidate.category',
  CATEGORY_DELETED: 'cache.invalidate.category.delete',

  // Order events
  ORDER_CREATED: 'cache.invalidate.order.create',
  ORDER_UPDATED: 'cache.invalidate.order.update',
  ORDER_STATUS_CHANGED: 'cache.invalidate.order.status',

  // Cart events
  CART_UPDATED: 'cache.invalidate.cart',

  // Inventory events
  INVENTORY_CHANGED: 'cache.invalidate.inventory',

  // Price events
  PRICE_CHANGED: 'cache.invalidate.price',
  BULK_PRICE_CHANGED: 'cache.invalidate.price.bulk',

  // Config events
  CONFIG_CHANGED: 'cache.invalidate.config',

  // Offer events
  OFFER_CREATED: 'cache.invalidate.offer.create',
  OFFER_UPDATED: 'cache.invalidate.offer.update',
  OFFER_EXPIRED: 'cache.invalidate.offer.expire',
  FLASH_SALE_STARTED: 'cache.invalidate.flash_sale.start',
  FLASH_SALE_ENDED: 'cache.invalidate.flash_sale.end',

  // Search events
  SEARCH_INDEX_UPDATED: 'cache.invalidate.search',

  // Vendor events
  VENDOR_UPDATED: 'cache.invalidate.vendor',
} as const;

export type CacheInvalidationEvent = ValueOf<typeof CACHE_INVALIDATION_EVENTS>;

// ============================================================
// Cache strategies
// ============================================================
export const CACHE_STRATEGIES = {
  CACHE_THROUGH: 'cache_through',
  WRITE_THROUGH: 'write_through',
  WRITE_BEHIND: 'write_behind',
  REFRESH_AHEAD: 'refresh_ahead',
  PROACTIVE_REFRESH: 'proactive',
} as const;

export type CacheStrategy = ValueOf<typeof CACHE_STRATEGIES>;

// ============================================================
// Cache stampede protection (Catch up cache)
// ============================================================
export const CACHE_STAMPEDE_PROTECTION = {
  ENABLED: true,
  USE_STALE_ON_RECOMPUTE: true,
  EARLY_RECOMPUTE_PROBABILITY: 10,
  RECOMPUTE_LOCK_MS: 5000,
  MAX_RECOMPUTE_TIME_SECONDS: 30,
} as const;

// ============================================================
// Cache compression settings
// ============================================================
export const CACHE_COMPRESSION = {
  ENABLED: true,
  MIN_SIZE_BYTES: 1024,
  ALGORITHM: 'gzip' as const,
  COMPRESSION_LEVEL: 6,
  SKIP_PATTERNS: [
    `${CACHE_KEY_PREFIXES.RATE_LIMIT}*`,
    `${CACHE_KEY_PREFIXES.LOCK}*`,
  ],
} as const;

// ============================================================
// Hot cache warming configuration
// ============================================================
export const CACHE_WARMING = {
  ENABLED: true,
  HOT_KEYS: [
    CACHE_KEY_PATTERNS.CATEGORY_TREE,
    CACHE_KEY_PATTERNS.DISTRICT_LIST,
    CACHE_KEY_PATTERNS.OFFER_ACTIVE_HOMEPAGE,
    CACHE_KEY_PATTERNS.FLASH_SALE_ACTIVE,
  ],
  SCHEDULE: '0 */6 * * *',
  MAX_CONCURRENT: 5,
} as const;

// ============================================================
// Cache metrics (For monitoring)
// ============================================================
export const CACHE_METRICS = {
  ENABLED: true,
  TRACKED_NAMESPACES: [
    CACHE_NAMESPACES.PRODUCT_CATALOG,
    CACHE_NAMESPACES.USER_DATA,
    CACHE_NAMESPACES.SESSION,
  ],
  METRIC_KEYS: {
    HIT: 'cache.hit',
    MISS: 'cache.miss',
    SET: 'cache.set',
    DELETE: 'cache.delete',
    INVALIDATE: 'cache.invalidate',
    RECOMPUTE_TIME: 'cache.recompute.time',
    COMPRESSION_RATIO: 'cache.compression.ratio',
  },
} as const;

// ============================================================
// Helper function to build cache keys (Safe utility)
// ============================================================
/**
 * Safely replaces placeholders in cache key patterns
 * @param pattern - Cache key pattern with {{placeholder}}
 * @param params - Object containing key-value pairs for replacement
 * @returns Built cache key string
 * 
 * @example
 * buildCacheKey(CACHE_KEY_PATTERNS.PRODUCT_DETAIL, { productId: '123' })
 * // Returns: 'product:detail:123'
 */
export function buildCacheKey<T extends Record<string, string | number>>(
  pattern: CacheKeyPattern,
  params: T
): string {
  let result = pattern;
  for (const [key, value] of Object.entries(params)) {
    const placeholder = `{{${key}}}`;
    if (!pattern.includes(placeholder)) {
      throw new Error(`Placeholder ${placeholder} not found in pattern: ${pattern}`);
    }
    result = result.replace(new RegExp(placeholder, 'g'), String(value));
  }
  return result;
}

// ============================================================
// Helper to add jitter to TTL (Prevent cache stampede)
// ============================================================
/**
 * Adds random jitter to TTL to prevent mass cache expiration
 * @param ttl - Base TTL in seconds
 * @returns TTL with jitter applied
 */
export function addCacheJitter(ttl: CacheTTL): number {
  if (ttl === CACHE_TTL.NEVER_EXPIRE) return ttl;
  const maxJitter = Math.floor(ttl * (CACHE_TTL.MAX_JITTER_PERCENT / 100));
  const jitter = Math.floor(Math.random() * maxJitter);
  const jitterDirection = Math.random() > 0.5 ? 1 : -1;
  return Math.max(1, ttl + (jitter * jitterDirection));
}

// ============================================================
// Freeze everything for immutability (deep freeze)
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;
  
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  
  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  CACHE_KEY_PREFIXES,
  CACHE_KEY_PATTERNS,
  CACHE_TTL,
  CACHE_NAMESPACES,
  CACHE_INVALIDATION_PATTERNS,
  CACHE_INVALIDATION_EVENTS,
  CACHE_STRATEGIES,
  CACHE_STAMPEDE_PROTECTION,
  CACHE_COMPRESSION,
  CACHE_WARMING,
  CACHE_METRICS,
});

// ============================================================
// Type guard for cache key patterns
// ============================================================
export function isCacheKeyPattern(value: unknown): value is CacheKeyPattern {
  return Object.values(CACHE_KEY_PATTERNS).includes(value as CacheKeyPattern);
}

// ============================================================
// Type guard for cache namespaces
// ============================================================
export function isCacheNamespace(value: unknown): value is CacheNamespace {
  return Object.values(CACHE_NAMESPACES).includes(value as CacheNamespace);
}
