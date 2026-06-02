/**
 * Cache Constants - Enterprise Grade with Connection Config
 * Production-ready for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/cache.constants
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
// CRITICAL: Cache Connection Configuration
// ============================================================
export const CACHE_CONNECTION_CONFIG = {
  // Primary Redis Cache Store
  REDIS: {
    HOST: process.env.REDIS_CACHE_HOST || process.env.REDIS_HOST || 'localhost',
    PORT: parseInt(process.env.REDIS_CACHE_PORT || process.env.REDIS_PORT || '6379'),
    PASSWORD: process.env.REDIS_CACHE_PASSWORD || process.env.REDIS_PASSWORD,
    DB_INDEX: parseInt(process.env.REDIS_CACHE_DB || '1'), // Separate DB for cache
    
    // Connection Pool
    POOL: {
      MIN: 10,
      MAX: 50,
      ACQUIRE_TIMEOUT_MS: 5000,
      IDLE_TIMEOUT_MS: 60000,
      FIFO: true,
    },
    
    // Cluster Configuration (Production)
    CLUSTER_ENABLED: process.env.REDIS_CLUSTER_ENABLED === 'true',
    CLUSTER_NODES: process.env.REDIS_CLUSTER_NODES?.split(',') || [],
    CLUSTER_MAX_REDIRECTS: 3,
    
    // TLS/SSL Configuration
    TLS_ENABLED: process.env.REDIS_TLS === 'true',
    TLS_CA: process.env.REDIS_CA_CERT,
    TLS_CERT: process.env.REDIS_CERT,
    TLS_KEY: process.env.REDIS_KEY,
    TLS_REJECT_UNAUTHORIZED: process.env.NODE_ENV === 'production',
    
    // Timeouts
    TIMEOUT: {
      CONNECT_MS: 3000,
      READ_MS: 2000,
      WRITE_MS: 2000,
      COMMAND_MS: 5000,
    },
    
    // Retry Strategy
    RETRY_STRATEGY: {
      MAX_RETRIES: 3,
      RETRY_DELAY_MS: 500,
      BACKOFF_MULTIPLIER: 2,
      MAX_RETRY_DELAY_MS: 2000,
      RETRYABLE_ERRORS: ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'],
    },
    
    // Circuit Breaker
    CIRCUIT_BREAKER: {
      ENABLED: true,
      FAILURE_THRESHOLD: 5,
      RESET_TIMEOUT_MS: 30000,
      HALF_OPEN_MAX_ATTEMPTS: 3,
      ROLLING_WINDOW_MS: 60000,
    },
    
    // Health Check
    HEALTH_CHECK: {
      ENABLED: true,
      INTERVAL_MS: 30000,
      TIMEOUT_MS: 2000,
    },
  },
  
  // Read Replica for load balancing
  READ_REPLICA: {
    ENABLED: process.env.REDIS_REPLICA_ENABLED === 'true',
    HOST: process.env.REDIS_REPLICA_HOST,
    PORT: parseInt(process.env.REDIS_REPLICA_PORT || '6379'),
    PASSWORD: process.env.REDIS_REPLICA_PASSWORD,
    WEIGHT: 0.7, // 70% of reads go to replica
    HEALTH_CHECK_INTERVAL_MS: 60000,
  },
  
  // Fallback In-Memory Cache (when Redis is down)
  FALLBACK: {
    ENABLED: true,
    TYPE: 'memory',
    MAX_ITEMS: 10000,
    TTL_SECONDS: 300, // 5 minutes only
    CLEANUP_INTERVAL_MS: 60000,
    MAX_MEMORY_MB: 512,
  },
  
  // Write Strategy
  WRITE_STRATEGY: {
    MODE: 'write_through', // 'write_through', 'write_behind', 'write_around'
    CONSISTENCY: 'eventual',
    WRITE_TIMEOUT_MS: 1000,
    ASYNC_WRITE: false,
  },
} as const;

// ============================================================
// Cache Sync Configuration (Multi-server)
// ============================================================
export const CACHE_SYNC_CONFIG = {
  ENABLED: true,
  
  // Pub/Sub for cache invalidation
  PUB_SUB: {
    ENABLED: true,
    CHANNEL: 'vubon:cache:invalidate',
    USE_REDIS: true,
    MESSAGE_TIMEOUT_MS: 5000,
    MAX_SUBSCRIBERS: 100,
  },
  
  // Broadcast invalidation to all servers
  BROADCAST_INVALIDATION: true,
  
  // Max latency for sync (milliseconds)
  MAX_LATENCY_MS: 500,
  
  // Sync batch size
  BATCH_SIZE: 100,
  
  // Conflict resolution
  CONFLICT_RESOLUTION: {
    STRATEGY: 'last_write_wins',
    TIMESTAMP_TOLERANCE_MS: 100,
  },
} as const;

// ============================================================
// Cache Monitoring & Metrics
// ============================================================
export const CACHE_MONITORING = {
  ENABLED: true,
  
  // Prometheus metrics
  METRICS: {
    HIT_RATIO: 'vubon_cache_hit_ratio',
    LATENCY_MS: 'vubon_cache_latency_ms',
    MEMORY_USAGE_BYTES: 'vubon_cache_memory_bytes',
    EVICTED_KEYS: 'vubon_cache_evicted_keys_total',
    CONNECTION_POOL_SIZE: 'vubon_cache_pool_size',
    KEY_COUNT: 'vubon_cache_key_count',
    OPERATIONS_TOTAL: 'vubon_cache_operations_total',
  },
  
  // Health check endpoint
  HEALTH_CHECK: {
    ENABLED: true,
    INTERVAL_MS: 30000,
    TIMEOUT_MS: 2000,
    ENDPOINT: '/health/cache',
    DETAILED: process.env.NODE_ENV !== 'production',
  },
  
  // Alerting rules
  ALERTS: {
    HIT_RATIO_BELOW: 0.7, // Alert if hit ratio < 70%
    LATENCY_ABOVE_MS: 100, // Alert if latency > 100ms
    CONNECTION_FAILURES: 5, // Alert after 5 failures
    MEMORY_USAGE_ABOVE_MB: 1024, // Alert if memory > 1GB
    ERROR_RATE_ABOVE: 0.05, // Alert if error rate > 5%
    
    // Alert channels
    SLACK_WEBHOOK: process.env.SLACK_ALERTS_WEBHOOK,
    EMAIL_RECIPIENTS: process.env.ALERT_EMAILS?.split(','),
    
    // Cooldown between alerts (seconds)
    COOLDOWN_SECONDS: 300,
  },
} as const;

// ============================================================
// Cache Eviction Policy
// ============================================================
export const CACHE_EVICTION = {
  POLICY: 'lru', // 'lru', 'lfu', 'ttl_only', 'random'
  MAX_MEMORY_MB: parseInt(process.env.CACHE_MAX_MEMORY_MB || '1024'),
  EVICTION_STRATEGY: 'allkeys-lru', // 'allkeys-lru', 'volatile-lru', 'allkeys-random', 'volatile-random'
  SAMPLE_SIZE: 5,
  
  // LFU specific (if used)
  LFU: {
    LOG_FACTOR: 10,
    DECAY_TIME: 60, // minutes
  },
  
  // Max keys limit
  MAX_KEYS: 1000000,
} as const;

// ============================================================
// Cache Key Prefixes (namespace isolation)
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
// Cache key patterns (Keep your existing patterns)
// ============================================================
export const CACHE_KEY_PATTERNS = {
  // User related
  USER_PROFILE: `${CACHE_KEY_PREFIXES.USER}profile:{{userId}}`,
  USER_SETTINGS: `${CACHE_KEY_PREFIXES.USER}settings:{{userId}}`,
  USER_ADDRESSES: `${CACHE_KEY_PREFIXES.USER}addresses:{{userId}}`,
  USER_RECENT_VIEWS: `${CACHE_KEY_PREFIXES.USER}recent_views:{{userId}}`,
  USER_WISHLIST: `${CACHE_KEY_PREFIXES.USER}wishlist:{{userId}}`,
  USER_COMPARE: `${CACHE_KEY_PREFIXES.USER}compare:{{userId}}`,

  // Session related
  SESSION_DATA: `${CACHE_KEY_PREFIXES.SESSION}{{sessionId}}`,
  SESSION_USER_DEVICE: `${CACHE_KEY_PREFIXES.SESSION}user:{{userId}}:{{deviceId}}`,
  SESSION_USER_LIST: `${CACHE_KEY_PREFIXES.SESSION}list:{{userId}}`,

  // Product related
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

  // Category related
  CATEGORY_TREE: `${CACHE_KEY_PREFIXES.CATEGORY}tree`,
  CATEGORY_DETAIL: `${CACHE_KEY_PREFIXES.CATEGORY}detail:{{categoryId}}`,
  CATEGORY_PATH: `${CACHE_KEY_PREFIXES.CATEGORY}path:{{categoryId}}`,
  CATEGORY_CHILDREN: `${CACHE_KEY_PREFIXES.CATEGORY}children:{{parentId}}`,
  CATEGORY_META: `${CACHE_KEY_PREFIXES.CATEGORY}meta:{{categoryId}}`,

  // Cart related
  CART_USER: `${CACHE_KEY_PREFIXES.CART}{{userId}}`,
  CART_COUNT: `${CACHE_KEY_PREFIXES.CART}count:{{userId}}`,
  CART_COUPON: `${CACHE_KEY_PREFIXES.CART}coupon:{{userId}}`,

  // Order related
  ORDER_DETAIL: `${CACHE_KEY_PREFIXES.ORDER}detail:{{orderId}}`,
  ORDER_TRACKING: `${CACHE_KEY_PREFIXES.ORDER}tracking:{{trackingId}}`,
  ORDER_USER_HISTORY: `${CACHE_KEY_PREFIXES.ORDER}user:{{userId}}:page:{{page}}`,
  ORDER_STATUS: `${CACHE_KEY_PREFIXES.ORDER}status:{{orderId}}`,
  ORDER_PENDING_COUNT: `${CACHE_KEY_PREFIXES.ORDER}pending_count`,

  // Inventory related
  INVENTORY_BY_SKU: `${CACHE_KEY_PREFIXES.INVENTORY}sku:{{sku}}`,
  INVENTORY_PRODUCT_VARIANT: `${CACHE_KEY_PREFIXES.INVENTORY}product:{{productId}}:variant:{{variantId}}`,
  INVENTORY_RESERVED: `${CACHE_KEY_PREFIXES.INVENTORY}reserved:{{sessionId}}`,

  // Price related
  PRICE_PRODUCT: `${CACHE_KEY_PREFIXES.PRICE}product:{{productId}}`,
  PRICE_USER_SPECIFIC: `${CACHE_KEY_PREFIXES.PRICE}user:{{userId}}:product:{{productId}}`,
  PRICE_BULK_DISCOUNT: `${CACHE_KEY_PREFIXES.PRICE}bulk:product:{{productId}}:quantity:{{quantity}}`,

  // API Response cache
  API_RESPONSE_CACHE: `${CACHE_KEY_PREFIXES.API_RESPONSE}{{endpointHash}}:{{paramsHash}}`,

  // Search cache
  SEARCH_RESULTS: `${CACHE_KEY_PREFIXES.SEARCH}{{queryHash}}:page:{{page}}:limit:{{limit}}`,
  SEARCH_SUGGESTIONS: `${CACHE_KEY_PREFIXES.SEARCH}suggestions:{{partialQuery}}`,
  SEARCH_POPULAR: `${CACHE_KEY_PREFIXES.SEARCH}popular`,
  SEARCH_HISTORY: `${CACHE_KEY_PREFIXES.SEARCH}history:{{userId}}`,

  // Permission & Role
  PERMISSION_USER: `${CACHE_KEY_PREFIXES.PERMISSION}user:{{userId}}`,
  PERMISSION_ROLE: `${CACHE_KEY_PREFIXES.PERMISSION}role:{{roleId}}`,
  ROLE_DATA: `${CACHE_KEY_PREFIXES.ROLE}{{roleId}}`,

  // Vendor (Multi-vendor)
  VENDOR_DETAIL: `${CACHE_KEY_PREFIXES.VENDOR}detail:{{vendorId}}`,
  VENDOR_PRODUCTS: `${CACHE_KEY_PREFIXES.VENDOR}products:{{vendorId}}:page:{{page}}`,
  VENDOR_REVENUE: `${CACHE_KEY_PREFIXES.VENDOR}revenue:{{vendorId}}:date:{{date}}`,

  // Bangladesh specific (Geo)
  DISTRICT_LIST: `${CACHE_KEY_PREFIXES.DISTRICT}list`,
  DISTRICT_CITIES: `${CACHE_KEY_PREFIXES.DISTRICT}{{districtId}}:cities`,
  SHIPPING_ZONE_BY_POSTAL: `${CACHE_KEY_PREFIXES.SHIPPING_ZONE}postal:{{postalCode}}`,

  // Offers & Promotions
  OFFER_ACTIVE_HOMEPAGE: `${CACHE_KEY_PREFIXES.OFFER}active:homepage`,
  OFFER_BY_CATEGORY: `${CACHE_KEY_PREFIXES.OFFER}category:{{categoryId}}`,
  COUPON_BY_CODE: `${CACHE_KEY_PREFIXES.COUPON}code:{{couponCode}}`,
  FLASH_SALE_ACTIVE: `${CACHE_KEY_PREFIXES.FLASH_SALE}active`,
  FLASH_SALE_PRODUCTS: `${CACHE_KEY_PREFIXES.FLASH_SALE}{{saleId}}:products`,

  // Rate Limiting
  RATE_LIMIT_KEY: `${CACHE_KEY_PREFIXES.RATE_LIMIT}{{ip}}:{{endpoint}}`,
  RATE_LIMIT_USER: `${CACHE_KEY_PREFIXES.RATE_LIMIT}user:{{userId}}:{{endpoint}}`,

  // Locks
  LOCK_RESOURCE: `${CACHE_KEY_PREFIXES.LOCK}resource:{{resourceId}}`,
  LOCK_ORDER: `${CACHE_KEY_PREFIXES.LOCK}order:{{orderId}}`,
  LOCK_INVENTORY: `${CACHE_KEY_PREFIXES.LOCK}inventory:{{productId}}`,

  // Static & SEO
  SITEMAP_PAGE: `${CACHE_KEY_PREFIXES.SITEMAP}{{type}}:page:{{page}}`,
  STATIC_PAGE_CONTENT: `${CACHE_KEY_PREFIXES.STATIC_PAGE}{{pageSlug}}`,
  BANNER_BY_LOCATION: `${CACHE_KEY_PREFIXES.BANNER}location:{{location}}`,

  // System
  SYSTEM_CONFIG: `${CACHE_KEY_PREFIXES.CONFIG}{{key}}`,
  COUNTER_DAILY: `${CACHE_KEY_PREFIXES.COUNTER}{{name}}:{{date}}`,
  QUEUE_PROCESSING: `${CACHE_KEY_PREFIXES.QUEUE}{{queueName}}:processing`,
} as const;

export type CacheKeyPattern = ValueOf<typeof CACHE_KEY_PATTERNS>;

// ============================================================
// Cache TTL values (in seconds) - Keep your existing
// ============================================================
export const CACHE_TTL = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,

  RATE_LIMIT: 60,
  LOCK: 30,
  ORDER_STATUS: 30,
  INVENTORY_RESERVED: 300,
  FLASH_SALE: 60,
  VERY_SHORT: 300,
  SHORT: 900,
  SEARCH_RESULTS: 600,
  PRODUCT_LIST: 900,
  CART_DATA: 600,
  MEDIUM: 1800,
  DEFAULT: 3600,
  STANDARD: 3600,
  USER_PROFILE: 3600,
  PRODUCT_DETAIL: 7200,
  LONG: 86400,
  CATEGORY_TREE: 86400,
  BRAND_LIST: 86400,
  DISTRICT_LIST: 604800,
  VERY_LONG: 604800,
  EXTENDED: 2592000,
  STATIC_PAGE: 2592000,
  SITEMAP: 86400,
  MAX_JITTER_PERCENT: 20,
  NEVER_EXPIRE: -1,
  SESSION: 7200,
} as const;

export type CacheTTL = ValueOf<typeof CACHE_TTL>;

// ============================================================
// Cache Invalidation Patterns
// ============================================================
export const CACHE_INVALIDATION_PATTERNS = {
  USER_ALL: `${CACHE_KEY_PREFIXES.USER}*`,
  USER_PROFILE_PATTERN: `${CACHE_KEY_PREFIXES.USER}profile:*`,
  USER_SESSION_PATTERN: `${CACHE_KEY_PREFIXES.SESSION}*`,
  PRODUCT_ALL: `${CACHE_KEY_PREFIXES.PRODUCT}*`,
  PRODUCT_DETAIL_PATTERN: `${CACHE_KEY_PREFIXES.PRODUCT}detail:*`,
  PRODUCT_LIST_PATTERN: `${CACHE_KEY_PREFIXES.PRODUCT}list:*`,
  CATEGORY_ALL: `${CACHE_KEY_PREFIXES.CATEGORY}*`,
  CATEGORY_TREE_PATTERN: `${CACHE_KEY_PREFIXES.CATEGORY}tree*`,
  CART_USER_PATTERN: `${CACHE_KEY_PREFIXES.CART}*`,
  ORDER_ALL: `${CACHE_KEY_PREFIXES.ORDER}*`,
  INVENTORY_ALL: `${CACHE_KEY_PREFIXES.INVENTORY}*`,
  PRICE_ALL: `${CACHE_KEY_PREFIXES.PRICE}*`,
  SEARCH_ALL: `${CACHE_KEY_PREFIXES.SEARCH}*`,
  VENDOR_ALL: `${CACHE_KEY_PREFIXES.VENDOR}*`,
  OFFER_ALL: `${CACHE_KEY_PREFIXES.OFFER}*`,
  FLASH_SALE_ALL: `${CACHE_KEY_PREFIXES.FLASH_SALE}*`,
  CONFIG_ALL: `${CACHE_KEY_PREFIXES.CONFIG}*`,
  STATIC_ALL: `${CACHE_KEY_PREFIXES.STATIC_PAGE}*`,
} as const;

export type CacheInvalidationPattern = ValueOf<typeof CACHE_INVALIDATION_PATTERNS>;

// ============================================================
// Cache Invalidation Events
// ============================================================
export const CACHE_INVALIDATION_EVENTS = {
  USER_UPDATED: 'cache.invalidate.user',
  USER_DELETED: 'cache.invalidate.user.delete',
  USER_SESSION_CHANGED: 'cache.invalidate.user.session',
  PRODUCT_CREATED: 'cache.invalidate.product.create',
  PRODUCT_UPDATED: 'cache.invalidate.product.update',
  PRODUCT_DELETED: 'cache.invalidate.product.delete',
  PRODUCT_PRICE_CHANGED: 'cache.invalidate.product.price',
  PRODUCT_STOCK_CHANGED: 'cache.invalidate.product.stock',
  CATEGORY_UPDATED: 'cache.invalidate.category',
  CATEGORY_DELETED: 'cache.invalidate.category.delete',
  ORDER_CREATED: 'cache.invalidate.order.create',
  ORDER_UPDATED: 'cache.invalidate.order.update',
  ORDER_STATUS_CHANGED: 'cache.invalidate.order.status',
  CART_UPDATED: 'cache.invalidate.cart',
  INVENTORY_CHANGED: 'cache.invalidate.inventory',
  PRICE_CHANGED: 'cache.invalidate.price',
  BULK_PRICE_CHANGED: 'cache.invalidate.price.bulk',
  CONFIG_CHANGED: 'cache.invalidate.config',
  OFFER_CREATED: 'cache.invalidate.offer.create',
  OFFER_UPDATED: 'cache.invalidate.offer.update',
  OFFER_EXPIRED: 'cache.invalidate.offer.expire',
  FLASH_SALE_STARTED: 'cache.invalidate.flash_sale.start',
  FLASH_SALE_ENDED: 'cache.invalidate.flash_sale.end',
  SEARCH_INDEX_UPDATED: 'cache.invalidate.search',
  VENDOR_UPDATED: 'cache.invalidate.vendor',
} as const;

export type CacheInvalidationEvent = ValueOf<typeof CACHE_INVALIDATION_EVENTS>;

// ============================================================
// Cache Strategies
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
// Cache Stampede Protection
// ============================================================
export const CACHE_STAMPEDE_PROTECTION = {
  ENABLED: true,
  USE_STALE_ON_RECOMPUTE: true,
  EARLY_RECOMPUTE_PROBABILITY: 10,
  RECOMPUTE_LOCK_MS: 5000,
  MAX_RECOMPUTE_TIME_SECONDS: 30,
} as const;

// ============================================================
// Cache Compression Settings
// ============================================================
export const CACHE_COMPRESSION = {
  ENABLED: true,
  MIN_SIZE_BYTES: 1024,
  ALGORITHM: 'gzip',
  COMPRESSION_LEVEL: 6,
  SKIP_PATTERNS: [
    `${CACHE_KEY_PREFIXES.RATE_LIMIT}*`,
    `${CACHE_KEY_PREFIXES.LOCK}*`,
  ],
} as const;

// ============================================================
// Hot Cache Warming
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
// Cache Namespaces
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
// Export all configs
// ============================================================
export type CacheConnectionConfig = typeof CACHE_CONNECTION_CONFIG;
export type CacheSyncConfig = typeof CACHE_SYNC_CONFIG;
export type CacheMonitoring = typeof CACHE_MONITORING;
export type CacheEviction = typeof CACHE_EVICTION;
