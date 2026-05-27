/**
 * Cache Constants - Pure immutable cache configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/auth-constants/cache.constants
 *
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

  /** Pattern: user:settings:{{userId}} */
  USER_SETTINGS: `${CACHE_KEY_PREFIXES.USER}settings:{{userId}}`,

  /** Pattern: user:addresses:{{userId}} */
  USER_ADDRESSES: `${CACHE_KEY_PREFIXES.USER}addresses:{{userId}}`,

  /** Pattern: user:recent_views:{{userId}} */
  USER_RECENT_VIEWS: `${CACHE_KEY_PREFIXES.USER}recent_views:{{userId}}`,

  /** Pattern: user:wishlist:{{userId}} */
  USER_WISHLIST: `${CACHE_KEY_PREFIXES.USER}wishlist:{{userId}}`,

  /** Pattern: user:compare:{{userId}} */
  USER_COMPARE: `${CACHE_KEY_PREFIXES.USER}compare:{{userId}}`,

  // ========== Session related ==========
  /** Pattern: session:{{sessionId}} */
  SESSION_DATA: `${CACHE_KEY_PREFIXES.SESSION}{{sessionId}}`,

  /** Pattern: session:user:{{userId}}:{{deviceId}} */
  SESSION_USER_DEVICE: `${CACHE_KEY_PREFIXES.SESSION}user:{{userId}}:{{deviceId}}`,

  /** Pattern: session:list:{{userId}} */
  SESSION_USER_LIST: `${CACHE_KEY_PREFIXES.SESSION}list:{{userId}}`,

  // ========== Product related ==========
  /** Pattern: product:detail:{{productId}} */
  PRODUCT_DETAIL: `${CACHE_KEY_PREFIXES.PRODUCT}detail:{{productId}}`,

  /** Pattern: product:detail:slug:{{slug}} */
  PRODUCT_DETAIL_BY_SLUG: `${CACHE_KEY_PREFIXES.PRODUCT}detail:slug:{{slug}}`,

  /** Pattern: product:list:category:{{categoryId}}:page:{{page}}:limit:{{limit}}:sort:{{sort}} */
  PRODUCT_LIST_BY_CATEGORY: `${CACHE_KEY_PREFIXES.PRODUCT}list:category:{{categoryId}}:page:{{page}}:limit:{{limit}}:sort:{{sort}}`,

  /** Pattern: product:list:brand:{{brandId}}:page:{{page}} */
  PRODUCT_LIST_BY_BRAND: `${CACHE_KEY_PREFIXES.PRODUCT}list:brand:{{brandId}}:page:{{page}}`,

  /** Pattern: product:list:search:{{queryHash}}:page:{{page}} */
  PRODUCT_LIST_SEARCH: `${CACHE_KEY_PREFIXES.PRODUCT}list:search:{{queryHash}}:page:{{page}}`,

  /** Pattern: product:list:flash_sale:{{saleId}} */
  PRODUCT_FLASH_SALE: `${CACHE_KEY_PREFIXES.PRODUCT}flash_sale:{{saleId}}`,

  /** Pattern: product:variants:{{productId}} */
  PRODUCT_VARIANTS: `${CACHE_KEY_PREFIXES.PRODUCT}variants:{{productId}}`,

  /** Pattern: product:related:{{productId}}:limit:{{limit}} */
  PRODUCT_RELATED: `${CACHE_KEY_PREFIXES.PRODUCT}related:{{productId}}:limit:{{limit}}`,

  /** Pattern: product:reviews:{{productId}}:page:{{page}} */
  PRODUCT_REVIEWS: `${CACHE_KEY_PREFIXES.PRODUCT}reviews:{{productId}}:page:{{page}}`,

  /** Pattern: product:rating:{{productId}} */
  PRODUCT_RATING: `${CACHE_KEY_PREFIXES.PRODUCT}rating:{{productId}}`,

  /** Pattern: product:stock:{{productId}} */
  PRODUCT_STOCK: `${CACHE_KEY_PREFIXES.PRODUCT}stock:{{productId}}`,

  /** Pattern: product:low_stock */
  PRODUCT_LOW_STOCK: `${CACHE_KEY_PREFIXES.PRODUCT}low_stock`,

  // ========== Category related ==========
  /** Pattern: category:tree */
  CATEGORY_TREE: `${CACHE_KEY_PREFIXES.CATEGORY}tree`,

  /** Pattern: category:detail:{{categoryId}} */
  CATEGORY_DETAIL: `${CACHE_KEY_PREFIXES.CATEGORY}detail:{{categoryId}}`,

  /** Pattern: category:path:{{categoryId}} */
  CATEGORY_PATH: `${CACHE_KEY_PREFIXES.CATEGORY}path:{{categoryId}}`,

  /** Pattern: category:children:{{parentId}} */
  CATEGORY_CHILDREN: `${CACHE_KEY_PREFIXES.CATEGORY}children:{{parentId}}`,

  /** Pattern: category:meta:{{categoryId}} */
  CATEGORY_META: `${CACHE_KEY_PREFIXES.CATEGORY}meta:{{categoryId}}`,

  // ========== Cart related ==========
  /** Pattern: cart:{{userId}} */
  CART_USER: `${CACHE_KEY_PREFIXES.CART}{{userId}}`,

  /** Pattern: cart:count:{{userId}} */
  CART_COUNT: `${CACHE_KEY_PREFIXES.CART}count:{{userId}}`,

  /** Pattern: cart:coupon:{{userId}} */
  CART_COUPON: `${CACHE_KEY_PREFIXES.CART}coupon:{{userId}}`,

  // ========== Order related ==========
  /** Pattern: order:detail:{{orderId}} */
  ORDER_DETAIL: `${CACHE_KEY_PREFIXES.ORDER}detail:{{orderId}}`,

  /** Pattern: order:tracking:{{trackingId}} */
  ORDER_TRACKING: `${CACHE_KEY_PREFIXES.ORDER}tracking:{{trackingId}}`,

  /** Pattern: order:user:{{userId}}:page:{{page}} */
  ORDER_USER_HISTORY: `${CACHE_KEY_PREFIXES.ORDER}user:{{userId}}:page:{{page}}`,

  /** Pattern: order:status:{{orderId}} */
  ORDER_STATUS: `${CACHE_KEY_PREFIXES.ORDER}status:{{orderId}}`,

  /** Pattern: order:pending_count */
  ORDER_PENDING_COUNT: `${CACHE_KEY_PREFIXES.ORDER}pending_count`,

  // ========== Inventory related ==========
  /** Pattern: inventory:sku:{{sku}} */
  INVENTORY_BY_SKU: `${CACHE_KEY_PREFIXES.INVENTORY}sku:{{sku}}`,

  /** Pattern: inventory:product:{{productId}}:variant:{{variantId}} */
  INVENTORY_PRODUCT_VARIANT: `${CACHE_KEY_PREFIXES.INVENTORY}product:{{productId}}:variant:{{variantId}}`,

  /** Pattern: inventory:reserved:{{sessionId}} */
  INVENTORY_RESERVED: `${CACHE_KEY_PREFIXES.INVENTORY}reserved:{{sessionId}}`,

  // ========== Price related ==========
  /** Pattern: price:product:{{productId}} */
  PRICE_PRODUCT: `${CACHE_KEY_PREFIXES.PRICE}product:{{productId}}`,

  /** Pattern: price:user:{{userId}}:product:{{productId}} */
  PRICE_USER_SPECIFIC: `${CACHE_KEY_PREFIXES.PRICE}user:{{userId}}:product:{{productId}}`,

  /** Pattern: price:bulk:product:{{productId}}:quantity:{{quantity}} */
  PRICE_BULK_DISCOUNT: `${CACHE_KEY_PREFIXES.PRICE}bulk:product:{{productId}}:quantity:{{quantity}}`,

  // ========== API Response cache ==========
  /** Pattern: api:{{endpointHash}}:{{paramsHash}} */
  API_RESPONSE_CACHE: `${CACHE_KEY_PREFIXES.API_RESPONSE}{{endpointHash}}:{{paramsHash}}`,

  // ========== Search cache ==========
  /** Pattern: search:{{queryHash}}:page:{{page}}:limit:{{limit}} */
  SEARCH_RESULTS: `${CACHE_KEY_PREFIXES.SEARCH}{{queryHash}}:page:{{page}}:limit:{{limit}}`,

  /** Pattern: search:suggestions:{{partialQuery}} */
  SEARCH_SUGGESTIONS: `${CACHE_KEY_PREFIXES.SEARCH}suggestions:{{partialQuery}}`,

  /** Pattern: search:popular */
  SEARCH_POPULAR: `${CACHE_KEY_PREFIXES.SEARCH}popular`,

  /** Pattern: search:history:{{userId}} */
  SEARCH_HISTORY: `${CACHE_KEY_PREFIXES.SEARCH}history:{{userId}}`,

  // ========== Permission & Role ==========
  /** Pattern: perm:user:{{userId}} */
  PERMISSION_USER: `${CACHE_KEY_PREFIXES.PERMISSION}user:{{userId}}`,

  /** Pattern: perm:role:{{roleId}} */
  PERMISSION_ROLE: `${CACHE_KEY_PREFIXES.PERMISSION}role:{{roleId}}`,

  /** Pattern: role:{{roleId}} */
  ROLE_DATA: `${CACHE_KEY_PREFIXES.ROLE}{{roleId}}`,

  // ========== Vendor (Multi-vendor) ==========
  /** Pattern: vendor:detail:{{vendorId}} */
  VENDOR_DETAIL: `${CACHE_KEY_PREFIXES.VENDOR}detail:{{vendorId}}`,

  /** Pattern: vendor:products:{{vendorId}}:page:{{page}} */
  VENDOR_PRODUCTS: `${CACHE_KEY_PREFIXES.VENDOR}products:{{vendorId}}:page:{{page}}`,

  /** Pattern: vendor:revenue:{{vendorId}}:date:{{date}} */
  VENDOR_REVENUE: `${CACHE_KEY_PREFIXES.VENDOR}revenue:{{vendorId}}:date:{{date}}`,

  // ========== Bangladesh specific (Geo) ==========
  /** Pattern: district:list */
  DISTRICT_LIST: `${CACHE_KEY_PREFIXES.DISTRICT}list`,

  /** Pattern: district:{{districtId}}:cities */
  DISTRICT_CITIES: `${CACHE_KEY_PREFIXES.DISTRICT}{{districtId}}:cities`,

  /** Pattern: shipping:zone:{{postalCode}} */
  SHIPPING_ZONE_BY_POSTAL: `${CACHE_KEY_PREFIXES.SHIPPING_ZONE}postal:{{postalCode}}`,

  // ========== Offers & Promotions ==========
  /** Pattern: offer:active:homepage */
  OFFER_ACTIVE_HOMEPAGE: `${CACHE_KEY_PREFIXES.OFFER}active:homepage`,

  /** Pattern: offer:category:{{categoryId}} */
  OFFER_BY_CATEGORY: `${CACHE_KEY_PREFIXES.OFFER}category:{{categoryId}}`,

  /** Pattern: coupon:code:{{couponCode}} */
  COUPON_BY_CODE: `${CACHE_KEY_PREFIXES.COUPON}code:{{couponCode}}`,

  /** Pattern: flash_sale:active */
  FLASH_SALE_ACTIVE: `${CACHE_KEY_PREFIXES.FLASH_SALE}active`,

  /** Pattern: flash_sale:{{saleId}}:products */
  FLASH_SALE_PRODUCTS: `${CACHE_KEY_PREFIXES.FLASH_SALE}{{saleId}}:products`,

  // ========== Rate Limiting ==========
  /** Pattern: ratelimit:{{ip}}:{{endpoint}} */
  RATE_LIMIT_KEY: `${CACHE_KEY_PREFIXES.RATE_LIMIT}{{ip}}:{{endpoint}}`,

  /** Pattern: ratelimit:user:{{userId}}:{{endpoint}} */
  RATE_LIMIT_USER: `${CACHE_KEY_PREFIXES.RATE_LIMIT}user:{{userId}}:{{endpoint}}`,

  // ========== Locks ==========
  /** Pattern: lock:resource:{{resourceId}} */
  LOCK_RESOURCE: `${CACHE_KEY_PREFIXES.LOCK}resource:{{resourceId}}`,

  /** Pattern: lock:order:{{orderId}} */
  LOCK_ORDER: `${CACHE_KEY_PREFIXES.LOCK}order:{{orderId}}`,

  /** Pattern: lock:inventory:{{productId}} */
  LOCK_INVENTORY: `${CACHE_KEY_PREFIXES.LOCK}inventory:{{productId}}`,

  // ========== Static & SEO ==========
  /** Pattern: sitemap:{{type}}:page:{{page}} */
  SITEMAP_PAGE: `${CACHE_KEY_PREFIXES.SITEMAP}{{type}}:page:{{page}}`,

  /** Pattern: static:{{pageSlug}} */
  STATIC_PAGE_CONTENT: `${CACHE_KEY_PREFIXES.STATIC_PAGE}{{pageSlug}}`,

  /** Pattern: banner:location:{{location}} */
  BANNER_BY_LOCATION: `${CACHE_KEY_PREFIXES.BANNER}location:{{location}}`,

  // ========== System ==========
  /** Pattern: config:{{key}} */
  SYSTEM_CONFIG: `${CACHE_KEY_PREFIXES.CONFIG}{{key}}`,

  /** Pattern: counter:{{name}}:{{date}} */
  COUNTER_DAILY: `${CACHE_KEY_PREFIXES.COUNTER}{{name}}:{{date}}`,

  /** Pattern: queue:{{queueName}}:processing */
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
  RATE_LIMIT: 60,                       // 1 minute
  LOCK: 30,                             // 30 seconds
  ORDER_STATUS: 30,                     // 30 seconds
  INVENTORY_RESERVED: 300,              // 5 minutes
  FLASH_SALE: 60,                       // 1 minute

  // ========== Short-medium caches ==========
  VERY_SHORT: 300,                      // 5 minutes
  SHORT: 900,                           // 15 minutes
  SEARCH_RESULTS: 600,                  // 10 minutes
  PRODUCT_LIST: 900,                    // 15 minutes
  CART_DATA: 600,                       // 10 minutes

  // ========== Medium-lived caches ==========
  MEDIUM: 1800,                         // 30 minutes
  DEFAULT: 3600,                        // 1 hour
  STANDARD: 3600,                       // 1 hour
  USER_PROFILE: 3600,                   // 1 hour
  PRODUCT_DETAIL: 7200,                 // 2 hours

  // ========== Long-lived caches ==========
  LONG: 86400,                          // 24 hours
  CATEGORY_TREE: 86400,                 // 24 hours
  BRAND_LIST: 86400,                    // 24 hours
  DISTRICT_LIST: 604800,                // 7 days

  // ========== Very long caches ==========
  VERY_LONG: 604800,                    // 7 days
  EXTENDED: 2592000,                    // 30 days
  STATIC_PAGE: 2592000,                 // 30 days
  SITEMAP: 86400,                       // 24 hours

  // ========== Cache stampede protection ==========
  // Add jitter to avoid mass expiration (consumer will add random ±20%)
  MAX_JITTER_PERCENT: 20,

  // ========== Special values ==========
  NEVER_EXPIRE: -1,                     // No expiration
  SESSION: 7200,                        // 2 hours
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
  CACHE_THROUGH: 'cache_through',      // Read: cache → DB miss → populate
  WRITE_THROUGH: 'write_through',      // Write: DB → cache simultaneously
  WRITE_BEHIND: 'write_behind',        // Write: cache → async DB
  REFRESH_AHEAD: 'refresh_ahead',      // Refresh before expiry
  PROACTIVE_REFRESH: 'proactive',      // Pre-load hot data
} as const;

export type CacheStrategy = ValueOf<typeof CACHE_STRATEGIES>;

// ============================================================
// Cache stampede protection (Catch up cache)
// ============================================================
export const CACHE_STAMPEDE_PROTECTION = {
  ENABLED: true,

  // Use stale cache while recomputing
  USE_STALE_ON_RECOMPUTE: true,

  // Probability for early recompute (0-100)
  EARLY_RECOMPUTE_PROBABILITY: 10,

  // Lock duration for recompute (milliseconds)
  RECOMPUTE_LOCK_MS: 5000,

  // Maximum recompute time (seconds)
  MAX_RECOMPUTE_TIME_SECONDS: 30,
} as const;

export type CacheStampedeProtection = typeof CACHE_STAMPEDE_PROTECTION;

// ============================================================
// Cache compression settings
// ============================================================
export const CACHE_COMPRESSION = {
  ENABLED: true,
  MIN_SIZE_BYTES: 1024,                // Compress if > 1KB
  ALGORITHM: 'gzip',
  COMPRESSION_LEVEL: 6,               // 1-9 (balance speed vs size)

  // Skip compression for these patterns
  SKIP_PATTERNS: [
    `${CACHE_KEY_PREFIXES.RATE_LIMIT}*`,
    `${CACHE_KEY_PREFIXES.LOCK}*`,
  ],
} as const;

export type CacheCompression = typeof CACHE_COMPRESSION;

// ============================================================
// Hot cache warming configuration
// ============================================================
export const CACHE_WARMING = {
  ENABLED: true,

  // Keys to pre-warm on startup
  HOT_KEYS: [
    CACHE_KEY_PATTERNS.CATEGORY_TREE,
    CACHE_KEY_PATTERNS.DISTRICT_LIST,
    CACHE_KEY_PATTERNS.OFFER_ACTIVE_HOMEPAGE,
    CACHE_KEY_PATTERNS.FLASH_SALE_ACTIVE,
  ],

  // Warm on schedule (cron pattern)
  SCHEDULE: '0 */6 * * *',            // Every 6 hours

  // Max concurrent warming jobs
  MAX_CONCURRENT: 5,
} as const;

export type CacheWarming = typeof CACHE_WARMING;

// ============================================================
// Cache metrics (For monitoring)
// ============================================================
export const CACHE_METRICS = {
  ENABLED: true,

  // Track metrics for these namespaces
  TRACKED_NAMESPACES: [
    CACHE_NAMESPACES.PRODUCT_CATALOG,
    CACHE_NAMESPACES.USER_DATA,
    CACHE_NAMESPACES.SESSION,
  ],

  // Metric keys
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

export type CacheMetrics = typeof CACHE_METRICS;

// ============================================================
// Deep freeze everything for immutability
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
