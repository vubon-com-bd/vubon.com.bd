/**
 * Cache management constants for the monorepo
 * All cache-related constants are centralized here for consistent caching strategy
 */
/**
 * Cache key prefixes for different data types
 */
export declare const CACHE_KEY_PREFIXES: {
    /**
     * User data cache
     */
    readonly USER: "user:";
    /**
     * Session data cache
     */
    readonly SESSION: "session:";
    /**
     * Authentication token cache
     */
    readonly TOKEN: "token:";
    /**
     * OTP/Verification code cache
     */
    readonly OTP: "otp:";
    /**
     * Product data cache
     */
    readonly PRODUCT: "product:";
    /**
     * Product list cache
     */
    readonly PRODUCT_LIST: "product:list:";
    /**
     * Category data cache
     */
    readonly CATEGORY: "category:";
    /**
     * Order data cache
     */
    readonly ORDER: "order:";
    /**
     * Payment data cache
     */
    readonly PAYMENT: "payment:";
    /**
     * User profile cache
     */
    readonly PROFILE: "profile:";
    /**
     * User settings cache
     */
    readonly SETTINGS: "settings:";
    /**
     * Permission cache
     */
    readonly PERMISSION: "permission:";
    /**
     * Role cache
     */
    readonly ROLE: "role:";
    /**
     * Content cache
     */
    readonly CONTENT: "content:";
    /**
     * Analytics cache
     */
    readonly ANALYTICS: "analytics:";
    /**
     * Report cache
     */
    readonly REPORT: "report:";
    /**
     * API response cache
     */
    readonly API: "api:";
    /**
     * Search result cache
     */
    readonly SEARCH: "search:";
    /**
     * Rate limit cache
     */
    readonly RATE_LIMIT: "rate:limit:";
    /**
     * Session blacklist cache
     */
    readonly SESSION_BLACKLIST: "session:blacklist:";
    /**
     * Device fingerprint cache
     */
    readonly DEVICE: "device:";
    /**
     * IP blacklist cache
     */
    readonly IP_BLACKLIST: "ip:blacklist:";
    /**
     * Webhook cache
     */
    readonly WEBHOOK: "webhook:";
    /**
     * Template cache
     */
    readonly TEMPLATE: "template:";
    /**
     * Translation cache
     */
    readonly TRANSLATION: "translation:";
    /**
     * Configuration cache
     */
    readonly CONFIG: "config:";
    /**
     * Cache for cache invalidation patterns
     */
    readonly INVALIDATION: "invalidation:";
    /**
     * Default cache prefix (fallback)
     */
    readonly DEFAULT: "cache:";
};
export type CacheKeyPrefix = (typeof CACHE_KEY_PREFIXES)[keyof typeof CACHE_KEY_PREFIXES];
/**
 * TTL (Time-To-Live) configurations in seconds
 */
export declare const CACHE_TTL: {
    /**
     * Session TTL: 1 hour
     */
    readonly SESSION: 3600;
    /**
     * OTP/Verification TTL: 5 minutes
     */
    readonly OTP: 300;
    /**
     * Email verification TTL: 24 hours
     */
    readonly EMAIL_VERIFICATION: 86400;
    /**
     * Password reset TTL: 30 minutes
     */
    readonly PASSWORD_RESET: 1800;
    /**
     * Access token TTL: 15 minutes
     */
    readonly ACCESS_TOKEN: 900;
    /**
     * Refresh token TTL: 7 days
     */
    readonly REFRESH_TOKEN: 604800;
    /**
     * User data TTL: 1 hour
     */
    readonly USER: 3600;
    /**
     * Product data TTL: 6 hours
     */
    readonly PRODUCT: 21600;
    /**
     * Product list TTL: 1 hour
     */
    readonly PRODUCT_LIST: 3600;
    /**
     * Category data TTL: 12 hours
     */
    readonly CATEGORY: 43200;
    /**
     * Order data TTL: 15 minutes
     */
    readonly ORDER: 900;
    /**
     * Payment data TTL: 30 minutes
     */
    readonly PAYMENT: 1800;
    /**
     * Permission cache TTL: 1 hour
     */
    readonly PERMISSION: 3600;
    /**
     * Role cache TTL: 1 hour
     */
    readonly ROLE: 3600;
    /**
     * API response cache TTL: 5 minutes
     */
    readonly API: 300;
    /**
     * Search result cache TTL: 5 minutes
     */
    readonly SEARCH: 300;
    /**
     * Rate limit TTL: 15 minutes
     */
    readonly RATE_LIMIT: 900;
    /**
     * Device fingerprint TTL: 30 days
     */
    readonly DEVICE: 2592000;
    /**
     * Session blacklist TTL: 7 days
     */
    readonly SESSION_BLACKLIST: 604800;
    /**
     * IP blacklist TTL: 24 hours
     */
    readonly IP_BLACKLIST: 86400;
    /**
     * Webhook cache TTL: 1 hour
     */
    readonly WEBHOOK: 3600;
    /**
     * Template cache TTL: 24 hours
     */
    readonly TEMPLATE: 86400;
    /**
     * Translation cache TTL: 7 days
     */
    readonly TRANSLATION: 604800;
    /**
     * Configuration cache TTL: 24 hours
     */
    readonly CONFIG: 86400;
    /**
     * Default cache TTL: 5 minutes
     */
    readonly DEFAULT: 300;
    /**
     * Short cache TTL: 30 seconds
     */
    readonly SHORT: 30;
    /**
     * Long cache TTL: 24 hours
     */
    readonly LONG: 86400;
    /**
     * Permanent cache TTL: 30 days
     */
    readonly PERMANENT: 2592000;
    /**
     * Never expire (use with caution)
     */
    readonly NEVER: 0;
};
export type CacheTTL = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];
/**
 * Adaptive TTL for different network types in Bangladesh
 */
export declare const ADAPTIVE_CACHE_TTL: {
    /**
     * 2G network: Slower, keep cache longer
     */
    readonly '2G': {
        readonly MULTIPLIER: 2;
        readonly DESCRIPTION: "2G Network - Cache for longer periods";
    };
    /**
     * 3G network: Moderate speed
     */
    readonly '3G': {
        readonly MULTIPLIER: 1.5;
        readonly DESCRIPTION: "3G Network - Moderate cache duration";
    };
    /**
     * 4G/LTE network: Fast network
     */
    readonly '4G': {
        readonly MULTIPLIER: 1;
        readonly DESCRIPTION: "4G Network - Standard cache duration";
    };
    /**
     * 5G network: Very fast
     */
    readonly '5G': {
        readonly MULTIPLIER: 0.7;
        readonly DESCRIPTION: "5G Network - Shorter cache duration for fresh data";
    };
    /**
     * WiFi network: Fast and stable
     */
    readonly WIFI: {
        readonly MULTIPLIER: 0.8;
        readonly DESCRIPTION: "WiFi Network - Optimized cache duration";
    };
    /**
     * Unknown network type
     */
    readonly UNKNOWN: {
        readonly MULTIPLIER: 1;
        readonly DESCRIPTION: "Unknown Network - Standard cache duration";
    };
};
export type AdaptiveCacheTTL = (typeof ADAPTIVE_CACHE_TTL)[keyof typeof ADAPTIVE_CACHE_TTL];
/**
 * Cache invalidation patterns
 */
export declare const CACHE_INVALIDATION_PATTERNS: {
    /**
     * Invalidate all user-related caches
     */
    readonly USER: "user:*";
    /**
     * Invalidate specific user cache
     */
    readonly USER_BY_ID: "user:{userId}:*";
    /**
     * Invalidate all session-related caches
     */
    readonly SESSION: "session:*";
    /**
     * Invalidate specific session cache
     */
    readonly SESSION_BY_ID: "session:{sessionId}:*";
    /**
     * Invalidate all product-related caches
     */
    readonly PRODUCT: "product:*";
    /**
     * Invalidate specific product cache
     */
    readonly PRODUCT_BY_ID: "product:{productId}:*";
    /**
     * Invalidate all category-related caches
     */
    readonly CATEGORY: "category:*";
    /**
     * Invalidate all order-related caches
     */
    readonly ORDER: "order:*";
    /**
     * Invalidate all payment-related caches
     */
    readonly PAYMENT: "payment:*";
    /**
     * Invalidate all API response caches
     */
    readonly API: "api:*";
    /**
     * Invalidate all search caches
     */
    readonly SEARCH: "search:*";
    /**
     * Invalidate all permission-related caches
     */
    readonly PERMISSION: "permission:*";
    /**
     * Invalidate all role-related caches
     */
    readonly ROLE: "role:*";
    /**
     * Invalidate all configuration caches
     */
    readonly CONFIG: "config:*";
    /**
     * Invalidate all caches (use with caution)
     */
    readonly ALL: "*";
};
export type CacheInvalidationPattern = (typeof CACHE_INVALIDATION_PATTERNS)[keyof typeof CACHE_INVALIDATION_PATTERNS];
/**
 * Cache invalidation events
 */
export declare const CACHE_INVALIDATION_EVENTS: {
    readonly USER_UPDATED: "user.updated";
    readonly USER_DELETED: "user.deleted";
    readonly USER_ROLE_CHANGED: "user.role.changed";
    readonly USER_STATUS_CHANGED: "user.status.changed";
    readonly USER_PASSWORD_CHANGED: "user.password.changed";
    readonly USER_EMAIL_CHANGED: "user.email.changed";
    readonly SESSION_CREATED: "session.created";
    readonly SESSION_UPDATED: "session.updated";
    readonly SESSION_DELETED: "session.deleted";
    readonly SESSION_REVOKED: "session.revoked";
    readonly PRODUCT_CREATED: "product.created";
    readonly PRODUCT_UPDATED: "product.updated";
    readonly PRODUCT_DELETED: "product.deleted";
    readonly PRODUCT_STATUS_CHANGED: "product.status.changed";
    readonly PRODUCT_PRICE_CHANGED: "product.price.changed";
    readonly PRODUCT_INVENTORY_CHANGED: "product.inventory.changed";
    readonly CATEGORY_CREATED: "category.created";
    readonly CATEGORY_UPDATED: "category.updated";
    readonly CATEGORY_DELETED: "category.deleted";
    readonly ORDER_CREATED: "order.created";
    readonly ORDER_UPDATED: "order.updated";
    readonly ORDER_DELETED: "order.deleted";
    readonly ORDER_STATUS_CHANGED: "order.status.changed";
    readonly PAYMENT_CREATED: "payment.created";
    readonly PAYMENT_UPDATED: "payment.updated";
    readonly PAYMENT_DELETED: "payment.deleted";
    readonly PAYMENT_STATUS_CHANGED: "payment.status.changed";
    readonly SETTINGS_UPDATED: "settings.updated";
    readonly CONFIG_UPDATED: "config.updated";
};
export type CacheInvalidationEvent = (typeof CACHE_INVALIDATION_EVENTS)[keyof typeof CACHE_INVALIDATION_EVENTS];
/**
 * Cache invalidation event to pattern mapping
 */
export declare const CACHE_INVALIDATION_MAPPING: Record<CacheInvalidationEvent, CacheInvalidationPattern[]>;
/**
 * Caching strategies
 */
export declare const CACHING_STRATEGIES: {
    /**
     * Cache-Aside (Lazy Loading)
     * Application checks cache first, loads from DB on miss
     */
    readonly CACHE_ASIDE: "cache-aside";
    /**
     * Write-Through
     * Application writes to cache and DB simultaneously
     */
    readonly WRITE_THROUGH: "write-through";
    /**
     * Write-Behind (Write-Back)
     * Application writes to cache, DB writes asynchronously
     */
    readonly WRITE_BEHIND: "write-behind";
    /**
     * Read-Through
     * Cache loads data from DB automatically on miss
     */
    readonly READ_THROUGH: "read-through";
    /**
     * Refresh-Ahead
     * Cache proactively refreshes frequently accessed data
     */
    readonly REFRESH_AHEAD: "refresh-ahead";
    /**
     * Time-to-Live (TTL)
     * Standard TTL-based expiration
     */
    readonly TTL: "ttl";
    /**
     * Least Recently Used (LRU)
     * Evict least recently used items
     */
    readonly LRU: "lru";
    /**
     * Least Frequently Used (LFU)
     * Evict least frequently used items
     */
    readonly LFU: "lfu";
};
export type CachingStrategy = (typeof CACHING_STRATEGIES)[keyof typeof CACHING_STRATEGIES];
/**
 * Cache strategy configuration
 */
export declare const CACHE_STRATEGY_CONFIG: {
    readonly "cache-aside": {
        readonly priority: 1;
        readonly description: "Lazy loading - Check cache first, load from DB on miss";
        readonly isDefault: true;
    };
    readonly "write-through": {
        readonly priority: 2;
        readonly description: "Write to cache and DB simultaneously";
        readonly isDefault: false;
    };
    readonly "write-behind": {
        readonly priority: 3;
        readonly description: "Write to cache, async DB writes";
        readonly isDefault: false;
    };
    readonly "read-through": {
        readonly priority: 4;
        readonly description: "Cache auto-loads from DB on miss";
        readonly isDefault: false;
    };
    readonly "refresh-ahead": {
        readonly priority: 5;
        readonly description: "Proactive refresh of frequently accessed data";
        readonly isDefault: false;
    };
    readonly ttl: {
        readonly priority: 6;
        readonly description: "Standard TTL-based expiration";
        readonly isDefault: true;
    };
    readonly lru: {
        readonly priority: 7;
        readonly description: "Evict least recently used items";
        readonly isDefault: false;
    };
    readonly lfu: {
        readonly priority: 8;
        readonly description: "Evict least frequently used items";
        readonly isDefault: false;
    };
};
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
export declare const DEFAULT_CACHE_CONFIGS: Record<string, Omit<CacheConfig, 'prefix'>>;
/**
 * Cache metrics types
 */
export declare const CACHE_METRICS: {
    readonly HIT_RATE: "cache.hit.rate";
    readonly MISS_RATE: "cache.miss.rate";
    readonly HIT_COUNT: "cache.hit.count";
    readonly MISS_COUNT: "cache.miss.count";
    readonly SIZE: "cache.size";
    readonly EVICTION_COUNT: "cache.eviction.count";
    readonly TTL_EXPIRY_COUNT: "cache.ttl.expiry.count";
    readonly AVERAGE_LOAD_TIME: "cache.load.time.avg";
    readonly MAX_LOAD_TIME: "cache.load.time.max";
    readonly MIN_LOAD_TIME: "cache.load.time.min";
    readonly AVERAGE_SAVE_TIME: "cache.save.time.avg";
    readonly MAX_SAVE_TIME: "cache.save.time.max";
    readonly MIN_SAVE_TIME: "cache.save.time.min";
    readonly CURRENT_SIZE: "cache.current.size";
    readonly MAX_SIZE: "cache.max.size";
    readonly MEMORY_USAGE: "cache.memory.usage";
};
export type CacheMetric = (typeof CACHE_METRICS)[keyof typeof CACHE_METRICS];
/**
 * Cache error messages
 */
export declare const CACHE_ERROR_MESSAGES: {
    readonly KEY_NOT_FOUND: "Cache key not found";
    readonly KEY_EXPIRED: "Cache key has expired";
    readonly KEY_INVALID: "Invalid cache key format";
    readonly CONNECTION_FAILED: "Cache connection failed";
    readonly WRITE_FAILED: "Cache write failed";
    readonly READ_FAILED: "Cache read failed";
    readonly DELETE_FAILED: "Cache delete failed";
    readonly INVALIDATION_FAILED: "Cache invalidation failed";
    readonly SERIALIZATION_FAILED: "Cache serialization failed";
    readonly DESERIALIZATION_FAILED: "Cache deserialization failed";
    readonly COMPRESSION_FAILED: "Cache compression failed";
    readonly DECOMPRESSION_FAILED: "Cache decompression failed";
    readonly MAX_SIZE_EXCEEDED: "Cache maximum size exceeded";
};
export type CacheErrorMessage = (typeof CACHE_ERROR_MESSAGES)[keyof typeof CACHE_ERROR_MESSAGES];
/**
 * Cache success messages
 */
export declare const CACHE_SUCCESS_MESSAGES: {
    readonly KEY_SET: "Cache key set successfully";
    readonly KEY_GET: "Cache key retrieved successfully";
    readonly KEY_DELETED: "Cache key deleted successfully";
    readonly INVALIDATED: "Cache invalidated successfully";
    readonly CLEARED: "Cache cleared successfully";
    readonly SERIALIZED: "Cache data serialized successfully";
    readonly DESERIALIZED: "Cache data deserialized successfully";
};
export type CacheSuccessMessage = (typeof CACHE_SUCCESS_MESSAGES)[keyof typeof CACHE_SUCCESS_MESSAGES];
/**
 * Helper function to build cache key
 */
export declare const buildCacheKey: (prefix: CacheKeyPrefix, identifier: string | number) => string;
/**
 * Helper function to build cache key with namespace
 */
export declare const buildCacheKeyWithNamespace: (prefix: CacheKeyPrefix, namespace: string, identifier: string | number) => string;
/**
 * Helper function to get adaptive TTL based on network type
 */
export declare const getAdaptiveTTL: (baseTTL: number, networkType: keyof typeof ADAPTIVE_CACHE_TTL) => number;
/**
 * Helper function to get TTL for data type
 */
export declare const getTTLForDataType: (dataType: keyof typeof CACHE_TTL) => number;
/**
 * Helper function to get cache prefix for data type
 */
export declare const getCachePrefixForDataType: (dataType: keyof typeof CACHE_KEY_PREFIXES) => CacheKeyPrefix;
/**
 * Helper function to get invalidation patterns for event
 */
export declare const getInvalidationPatterns: (event: CacheInvalidationEvent) => CacheInvalidationPattern[];
/**
 * Helper function to generate invalidation keys
 */
export declare const generateInvalidationKeys: (pattern: CacheInvalidationPattern, placeholders: Record<string, string>) => string;
/**
 * All cache constants for export
 */
export declare const CACHE_CONSTANTS: {
    readonly KEY_PREFIXES: {
        /**
         * User data cache
         */
        readonly USER: "user:";
        /**
         * Session data cache
         */
        readonly SESSION: "session:";
        /**
         * Authentication token cache
         */
        readonly TOKEN: "token:";
        /**
         * OTP/Verification code cache
         */
        readonly OTP: "otp:";
        /**
         * Product data cache
         */
        readonly PRODUCT: "product:";
        /**
         * Product list cache
         */
        readonly PRODUCT_LIST: "product:list:";
        /**
         * Category data cache
         */
        readonly CATEGORY: "category:";
        /**
         * Order data cache
         */
        readonly ORDER: "order:";
        /**
         * Payment data cache
         */
        readonly PAYMENT: "payment:";
        /**
         * User profile cache
         */
        readonly PROFILE: "profile:";
        /**
         * User settings cache
         */
        readonly SETTINGS: "settings:";
        /**
         * Permission cache
         */
        readonly PERMISSION: "permission:";
        /**
         * Role cache
         */
        readonly ROLE: "role:";
        /**
         * Content cache
         */
        readonly CONTENT: "content:";
        /**
         * Analytics cache
         */
        readonly ANALYTICS: "analytics:";
        /**
         * Report cache
         */
        readonly REPORT: "report:";
        /**
         * API response cache
         */
        readonly API: "api:";
        /**
         * Search result cache
         */
        readonly SEARCH: "search:";
        /**
         * Rate limit cache
         */
        readonly RATE_LIMIT: "rate:limit:";
        /**
         * Session blacklist cache
         */
        readonly SESSION_BLACKLIST: "session:blacklist:";
        /**
         * Device fingerprint cache
         */
        readonly DEVICE: "device:";
        /**
         * IP blacklist cache
         */
        readonly IP_BLACKLIST: "ip:blacklist:";
        /**
         * Webhook cache
         */
        readonly WEBHOOK: "webhook:";
        /**
         * Template cache
         */
        readonly TEMPLATE: "template:";
        /**
         * Translation cache
         */
        readonly TRANSLATION: "translation:";
        /**
         * Configuration cache
         */
        readonly CONFIG: "config:";
        /**
         * Cache for cache invalidation patterns
         */
        readonly INVALIDATION: "invalidation:";
        /**
         * Default cache prefix (fallback)
         */
        readonly DEFAULT: "cache:";
    };
    readonly TTL: {
        /**
         * Session TTL: 1 hour
         */
        readonly SESSION: 3600;
        /**
         * OTP/Verification TTL: 5 minutes
         */
        readonly OTP: 300;
        /**
         * Email verification TTL: 24 hours
         */
        readonly EMAIL_VERIFICATION: 86400;
        /**
         * Password reset TTL: 30 minutes
         */
        readonly PASSWORD_RESET: 1800;
        /**
         * Access token TTL: 15 minutes
         */
        readonly ACCESS_TOKEN: 900;
        /**
         * Refresh token TTL: 7 days
         */
        readonly REFRESH_TOKEN: 604800;
        /**
         * User data TTL: 1 hour
         */
        readonly USER: 3600;
        /**
         * Product data TTL: 6 hours
         */
        readonly PRODUCT: 21600;
        /**
         * Product list TTL: 1 hour
         */
        readonly PRODUCT_LIST: 3600;
        /**
         * Category data TTL: 12 hours
         */
        readonly CATEGORY: 43200;
        /**
         * Order data TTL: 15 minutes
         */
        readonly ORDER: 900;
        /**
         * Payment data TTL: 30 minutes
         */
        readonly PAYMENT: 1800;
        /**
         * Permission cache TTL: 1 hour
         */
        readonly PERMISSION: 3600;
        /**
         * Role cache TTL: 1 hour
         */
        readonly ROLE: 3600;
        /**
         * API response cache TTL: 5 minutes
         */
        readonly API: 300;
        /**
         * Search result cache TTL: 5 minutes
         */
        readonly SEARCH: 300;
        /**
         * Rate limit TTL: 15 minutes
         */
        readonly RATE_LIMIT: 900;
        /**
         * Device fingerprint TTL: 30 days
         */
        readonly DEVICE: 2592000;
        /**
         * Session blacklist TTL: 7 days
         */
        readonly SESSION_BLACKLIST: 604800;
        /**
         * IP blacklist TTL: 24 hours
         */
        readonly IP_BLACKLIST: 86400;
        /**
         * Webhook cache TTL: 1 hour
         */
        readonly WEBHOOK: 3600;
        /**
         * Template cache TTL: 24 hours
         */
        readonly TEMPLATE: 86400;
        /**
         * Translation cache TTL: 7 days
         */
        readonly TRANSLATION: 604800;
        /**
         * Configuration cache TTL: 24 hours
         */
        readonly CONFIG: 86400;
        /**
         * Default cache TTL: 5 minutes
         */
        readonly DEFAULT: 300;
        /**
         * Short cache TTL: 30 seconds
         */
        readonly SHORT: 30;
        /**
         * Long cache TTL: 24 hours
         */
        readonly LONG: 86400;
        /**
         * Permanent cache TTL: 30 days
         */
        readonly PERMANENT: 2592000;
        /**
         * Never expire (use with caution)
         */
        readonly NEVER: 0;
    };
    readonly ADAPTIVE_TTL: {
        /**
         * 2G network: Slower, keep cache longer
         */
        readonly '2G': {
            readonly MULTIPLIER: 2;
            readonly DESCRIPTION: "2G Network - Cache for longer periods";
        };
        /**
         * 3G network: Moderate speed
         */
        readonly '3G': {
            readonly MULTIPLIER: 1.5;
            readonly DESCRIPTION: "3G Network - Moderate cache duration";
        };
        /**
         * 4G/LTE network: Fast network
         */
        readonly '4G': {
            readonly MULTIPLIER: 1;
            readonly DESCRIPTION: "4G Network - Standard cache duration";
        };
        /**
         * 5G network: Very fast
         */
        readonly '5G': {
            readonly MULTIPLIER: 0.7;
            readonly DESCRIPTION: "5G Network - Shorter cache duration for fresh data";
        };
        /**
         * WiFi network: Fast and stable
         */
        readonly WIFI: {
            readonly MULTIPLIER: 0.8;
            readonly DESCRIPTION: "WiFi Network - Optimized cache duration";
        };
        /**
         * Unknown network type
         */
        readonly UNKNOWN: {
            readonly MULTIPLIER: 1;
            readonly DESCRIPTION: "Unknown Network - Standard cache duration";
        };
    };
    readonly INVALIDATION_PATTERNS: {
        /**
         * Invalidate all user-related caches
         */
        readonly USER: "user:*";
        /**
         * Invalidate specific user cache
         */
        readonly USER_BY_ID: "user:{userId}:*";
        /**
         * Invalidate all session-related caches
         */
        readonly SESSION: "session:*";
        /**
         * Invalidate specific session cache
         */
        readonly SESSION_BY_ID: "session:{sessionId}:*";
        /**
         * Invalidate all product-related caches
         */
        readonly PRODUCT: "product:*";
        /**
         * Invalidate specific product cache
         */
        readonly PRODUCT_BY_ID: "product:{productId}:*";
        /**
         * Invalidate all category-related caches
         */
        readonly CATEGORY: "category:*";
        /**
         * Invalidate all order-related caches
         */
        readonly ORDER: "order:*";
        /**
         * Invalidate all payment-related caches
         */
        readonly PAYMENT: "payment:*";
        /**
         * Invalidate all API response caches
         */
        readonly API: "api:*";
        /**
         * Invalidate all search caches
         */
        readonly SEARCH: "search:*";
        /**
         * Invalidate all permission-related caches
         */
        readonly PERMISSION: "permission:*";
        /**
         * Invalidate all role-related caches
         */
        readonly ROLE: "role:*";
        /**
         * Invalidate all configuration caches
         */
        readonly CONFIG: "config:*";
        /**
         * Invalidate all caches (use with caution)
         */
        readonly ALL: "*";
    };
    readonly INVALIDATION_EVENTS: {
        readonly USER_UPDATED: "user.updated";
        readonly USER_DELETED: "user.deleted";
        readonly USER_ROLE_CHANGED: "user.role.changed";
        readonly USER_STATUS_CHANGED: "user.status.changed";
        readonly USER_PASSWORD_CHANGED: "user.password.changed";
        readonly USER_EMAIL_CHANGED: "user.email.changed";
        readonly SESSION_CREATED: "session.created";
        readonly SESSION_UPDATED: "session.updated";
        readonly SESSION_DELETED: "session.deleted";
        readonly SESSION_REVOKED: "session.revoked";
        readonly PRODUCT_CREATED: "product.created";
        readonly PRODUCT_UPDATED: "product.updated";
        readonly PRODUCT_DELETED: "product.deleted";
        readonly PRODUCT_STATUS_CHANGED: "product.status.changed";
        readonly PRODUCT_PRICE_CHANGED: "product.price.changed";
        readonly PRODUCT_INVENTORY_CHANGED: "product.inventory.changed";
        readonly CATEGORY_CREATED: "category.created";
        readonly CATEGORY_UPDATED: "category.updated";
        readonly CATEGORY_DELETED: "category.deleted";
        readonly ORDER_CREATED: "order.created";
        readonly ORDER_UPDATED: "order.updated";
        readonly ORDER_DELETED: "order.deleted";
        readonly ORDER_STATUS_CHANGED: "order.status.changed";
        readonly PAYMENT_CREATED: "payment.created";
        readonly PAYMENT_UPDATED: "payment.updated";
        readonly PAYMENT_DELETED: "payment.deleted";
        readonly PAYMENT_STATUS_CHANGED: "payment.status.changed";
        readonly SETTINGS_UPDATED: "settings.updated";
        readonly CONFIG_UPDATED: "config.updated";
    };
    readonly INVALIDATION_MAPPING: Record<CacheInvalidationEvent, CacheInvalidationPattern[]>;
    readonly STRATEGIES: {
        /**
         * Cache-Aside (Lazy Loading)
         * Application checks cache first, loads from DB on miss
         */
        readonly CACHE_ASIDE: "cache-aside";
        /**
         * Write-Through
         * Application writes to cache and DB simultaneously
         */
        readonly WRITE_THROUGH: "write-through";
        /**
         * Write-Behind (Write-Back)
         * Application writes to cache, DB writes asynchronously
         */
        readonly WRITE_BEHIND: "write-behind";
        /**
         * Read-Through
         * Cache loads data from DB automatically on miss
         */
        readonly READ_THROUGH: "read-through";
        /**
         * Refresh-Ahead
         * Cache proactively refreshes frequently accessed data
         */
        readonly REFRESH_AHEAD: "refresh-ahead";
        /**
         * Time-to-Live (TTL)
         * Standard TTL-based expiration
         */
        readonly TTL: "ttl";
        /**
         * Least Recently Used (LRU)
         * Evict least recently used items
         */
        readonly LRU: "lru";
        /**
         * Least Frequently Used (LFU)
         * Evict least frequently used items
         */
        readonly LFU: "lfu";
    };
    readonly STRATEGY_CONFIG: {
        readonly "cache-aside": {
            readonly priority: 1;
            readonly description: "Lazy loading - Check cache first, load from DB on miss";
            readonly isDefault: true;
        };
        readonly "write-through": {
            readonly priority: 2;
            readonly description: "Write to cache and DB simultaneously";
            readonly isDefault: false;
        };
        readonly "write-behind": {
            readonly priority: 3;
            readonly description: "Write to cache, async DB writes";
            readonly isDefault: false;
        };
        readonly "read-through": {
            readonly priority: 4;
            readonly description: "Cache auto-loads from DB on miss";
            readonly isDefault: false;
        };
        readonly "refresh-ahead": {
            readonly priority: 5;
            readonly description: "Proactive refresh of frequently accessed data";
            readonly isDefault: false;
        };
        readonly ttl: {
            readonly priority: 6;
            readonly description: "Standard TTL-based expiration";
            readonly isDefault: true;
        };
        readonly lru: {
            readonly priority: 7;
            readonly description: "Evict least recently used items";
            readonly isDefault: false;
        };
        readonly lfu: {
            readonly priority: 8;
            readonly description: "Evict least frequently used items";
            readonly isDefault: false;
        };
    };
    readonly METRICS: {
        readonly HIT_RATE: "cache.hit.rate";
        readonly MISS_RATE: "cache.miss.rate";
        readonly HIT_COUNT: "cache.hit.count";
        readonly MISS_COUNT: "cache.miss.count";
        readonly SIZE: "cache.size";
        readonly EVICTION_COUNT: "cache.eviction.count";
        readonly TTL_EXPIRY_COUNT: "cache.ttl.expiry.count";
        readonly AVERAGE_LOAD_TIME: "cache.load.time.avg";
        readonly MAX_LOAD_TIME: "cache.load.time.max";
        readonly MIN_LOAD_TIME: "cache.load.time.min";
        readonly AVERAGE_SAVE_TIME: "cache.save.time.avg";
        readonly MAX_SAVE_TIME: "cache.save.time.max";
        readonly MIN_SAVE_TIME: "cache.save.time.min";
        readonly CURRENT_SIZE: "cache.current.size";
        readonly MAX_SIZE: "cache.max.size";
        readonly MEMORY_USAGE: "cache.memory.usage";
    };
    readonly ERROR_MESSAGES: {
        readonly KEY_NOT_FOUND: "Cache key not found";
        readonly KEY_EXPIRED: "Cache key has expired";
        readonly KEY_INVALID: "Invalid cache key format";
        readonly CONNECTION_FAILED: "Cache connection failed";
        readonly WRITE_FAILED: "Cache write failed";
        readonly READ_FAILED: "Cache read failed";
        readonly DELETE_FAILED: "Cache delete failed";
        readonly INVALIDATION_FAILED: "Cache invalidation failed";
        readonly SERIALIZATION_FAILED: "Cache serialization failed";
        readonly DESERIALIZATION_FAILED: "Cache deserialization failed";
        readonly COMPRESSION_FAILED: "Cache compression failed";
        readonly DECOMPRESSION_FAILED: "Cache decompression failed";
        readonly MAX_SIZE_EXCEEDED: "Cache maximum size exceeded";
    };
    readonly SUCCESS_MESSAGES: {
        readonly KEY_SET: "Cache key set successfully";
        readonly KEY_GET: "Cache key retrieved successfully";
        readonly KEY_DELETED: "Cache key deleted successfully";
        readonly INVALIDATED: "Cache invalidated successfully";
        readonly CLEARED: "Cache cleared successfully";
        readonly SERIALIZED: "Cache data serialized successfully";
        readonly DESERIALIZED: "Cache data deserialized successfully";
    };
    readonly DEFAULT_CONFIGS: Record<string, Omit<CacheConfig, "prefix">>;
};
/**
 * All cache constants for export
 */
export declare const ALL_CACHE_CONSTANTS: {
    readonly KEY_SET: "Cache key set successfully";
    readonly KEY_GET: "Cache key retrieved successfully";
    readonly KEY_DELETED: "Cache key deleted successfully";
    readonly INVALIDATED: "Cache invalidated successfully";
    readonly CLEARED: "Cache cleared successfully";
    readonly SERIALIZED: "Cache data serialized successfully";
    readonly DESERIALIZED: "Cache data deserialized successfully";
    readonly KEY_NOT_FOUND: "Cache key not found";
    readonly KEY_EXPIRED: "Cache key has expired";
    readonly KEY_INVALID: "Invalid cache key format";
    readonly CONNECTION_FAILED: "Cache connection failed";
    readonly WRITE_FAILED: "Cache write failed";
    readonly READ_FAILED: "Cache read failed";
    readonly DELETE_FAILED: "Cache delete failed";
    readonly INVALIDATION_FAILED: "Cache invalidation failed";
    readonly SERIALIZATION_FAILED: "Cache serialization failed";
    readonly DESERIALIZATION_FAILED: "Cache deserialization failed";
    readonly COMPRESSION_FAILED: "Cache compression failed";
    readonly DECOMPRESSION_FAILED: "Cache decompression failed";
    readonly MAX_SIZE_EXCEEDED: "Cache maximum size exceeded";
    readonly HIT_RATE: "cache.hit.rate";
    readonly MISS_RATE: "cache.miss.rate";
    readonly HIT_COUNT: "cache.hit.count";
    readonly MISS_COUNT: "cache.miss.count";
    readonly SIZE: "cache.size";
    readonly EVICTION_COUNT: "cache.eviction.count";
    readonly TTL_EXPIRY_COUNT: "cache.ttl.expiry.count";
    readonly AVERAGE_LOAD_TIME: "cache.load.time.avg";
    readonly MAX_LOAD_TIME: "cache.load.time.max";
    readonly MIN_LOAD_TIME: "cache.load.time.min";
    readonly AVERAGE_SAVE_TIME: "cache.save.time.avg";
    readonly MAX_SAVE_TIME: "cache.save.time.max";
    readonly MIN_SAVE_TIME: "cache.save.time.min";
    readonly CURRENT_SIZE: "cache.current.size";
    readonly MAX_SIZE: "cache.max.size";
    readonly MEMORY_USAGE: "cache.memory.usage";
    /**
     * Cache-Aside (Lazy Loading)
     * Application checks cache first, loads from DB on miss
     */
    readonly CACHE_ASIDE: "cache-aside";
    /**
     * Write-Through
     * Application writes to cache and DB simultaneously
     */
    readonly WRITE_THROUGH: "write-through";
    /**
     * Write-Behind (Write-Back)
     * Application writes to cache, DB writes asynchronously
     */
    readonly WRITE_BEHIND: "write-behind";
    /**
     * Read-Through
     * Cache loads data from DB automatically on miss
     */
    readonly READ_THROUGH: "read-through";
    /**
     * Refresh-Ahead
     * Cache proactively refreshes frequently accessed data
     */
    readonly REFRESH_AHEAD: "refresh-ahead";
    /**
     * Time-to-Live (TTL)
     * Standard TTL-based expiration
     */
    readonly TTL: "ttl";
    /**
     * Least Recently Used (LRU)
     * Evict least recently used items
     */
    readonly LRU: "lru";
    /**
     * Least Frequently Used (LFU)
     * Evict least frequently used items
     */
    readonly LFU: "lfu";
    readonly USER_UPDATED: "user.updated";
    readonly USER_DELETED: "user.deleted";
    readonly USER_ROLE_CHANGED: "user.role.changed";
    readonly USER_STATUS_CHANGED: "user.status.changed";
    readonly USER_PASSWORD_CHANGED: "user.password.changed";
    readonly USER_EMAIL_CHANGED: "user.email.changed";
    readonly SESSION_CREATED: "session.created";
    readonly SESSION_UPDATED: "session.updated";
    readonly SESSION_DELETED: "session.deleted";
    readonly SESSION_REVOKED: "session.revoked";
    readonly PRODUCT_CREATED: "product.created";
    readonly PRODUCT_UPDATED: "product.updated";
    readonly PRODUCT_DELETED: "product.deleted";
    readonly PRODUCT_STATUS_CHANGED: "product.status.changed";
    readonly PRODUCT_PRICE_CHANGED: "product.price.changed";
    readonly PRODUCT_INVENTORY_CHANGED: "product.inventory.changed";
    readonly CATEGORY_CREATED: "category.created";
    readonly CATEGORY_UPDATED: "category.updated";
    readonly CATEGORY_DELETED: "category.deleted";
    readonly ORDER_CREATED: "order.created";
    readonly ORDER_UPDATED: "order.updated";
    readonly ORDER_DELETED: "order.deleted";
    readonly ORDER_STATUS_CHANGED: "order.status.changed";
    readonly PAYMENT_CREATED: "payment.created";
    readonly PAYMENT_UPDATED: "payment.updated";
    readonly PAYMENT_DELETED: "payment.deleted";
    readonly PAYMENT_STATUS_CHANGED: "payment.status.changed";
    readonly SETTINGS_UPDATED: "settings.updated";
    readonly CONFIG_UPDATED: "config.updated";
    /**
     * Invalidate all user-related caches
     */
    readonly USER: "user:*";
    /**
     * Invalidate specific user cache
     */
    readonly USER_BY_ID: "user:{userId}:*";
    /**
     * Invalidate all session-related caches
     */
    readonly SESSION: "session:*";
    /**
     * Invalidate specific session cache
     */
    readonly SESSION_BY_ID: "session:{sessionId}:*";
    /**
     * Invalidate all product-related caches
     */
    readonly PRODUCT: "product:*";
    /**
     * Invalidate specific product cache
     */
    readonly PRODUCT_BY_ID: "product:{productId}:*";
    /**
     * Invalidate all category-related caches
     */
    readonly CATEGORY: "category:*";
    /**
     * Invalidate all order-related caches
     */
    readonly ORDER: "order:*";
    /**
     * Invalidate all payment-related caches
     */
    readonly PAYMENT: "payment:*";
    /**
     * Invalidate all API response caches
     */
    readonly API: "api:*";
    /**
     * Invalidate all search caches
     */
    readonly SEARCH: "search:*";
    /**
     * Invalidate all permission-related caches
     */
    readonly PERMISSION: "permission:*";
    /**
     * Invalidate all role-related caches
     */
    readonly ROLE: "role:*";
    /**
     * Invalidate all configuration caches
     */
    readonly CONFIG: "config:*";
    /**
     * Invalidate all caches (use with caution)
     */
    readonly ALL: "*";
    /**
     * 2G network: Slower, keep cache longer
     */
    readonly '2G': {
        readonly MULTIPLIER: 2;
        readonly DESCRIPTION: "2G Network - Cache for longer periods";
    };
    /**
     * 3G network: Moderate speed
     */
    readonly '3G': {
        readonly MULTIPLIER: 1.5;
        readonly DESCRIPTION: "3G Network - Moderate cache duration";
    };
    /**
     * 4G/LTE network: Fast network
     */
    readonly '4G': {
        readonly MULTIPLIER: 1;
        readonly DESCRIPTION: "4G Network - Standard cache duration";
    };
    /**
     * 5G network: Very fast
     */
    readonly '5G': {
        readonly MULTIPLIER: 0.7;
        readonly DESCRIPTION: "5G Network - Shorter cache duration for fresh data";
    };
    /**
     * WiFi network: Fast and stable
     */
    readonly WIFI: {
        readonly MULTIPLIER: 0.8;
        readonly DESCRIPTION: "WiFi Network - Optimized cache duration";
    };
    /**
     * Unknown network type
     */
    readonly UNKNOWN: {
        readonly MULTIPLIER: 1;
        readonly DESCRIPTION: "Unknown Network - Standard cache duration";
    };
    /**
     * OTP/Verification TTL: 5 minutes
     */
    readonly OTP: 300;
    /**
     * Email verification TTL: 24 hours
     */
    readonly EMAIL_VERIFICATION: 86400;
    /**
     * Password reset TTL: 30 minutes
     */
    readonly PASSWORD_RESET: 1800;
    /**
     * Access token TTL: 15 minutes
     */
    readonly ACCESS_TOKEN: 900;
    /**
     * Refresh token TTL: 7 days
     */
    readonly REFRESH_TOKEN: 604800;
    /**
     * Product list TTL: 1 hour
     */
    readonly PRODUCT_LIST: 3600;
    /**
     * Rate limit TTL: 15 minutes
     */
    readonly RATE_LIMIT: 900;
    /**
     * Device fingerprint TTL: 30 days
     */
    readonly DEVICE: 2592000;
    /**
     * Session blacklist TTL: 7 days
     */
    readonly SESSION_BLACKLIST: 604800;
    /**
     * IP blacklist TTL: 24 hours
     */
    readonly IP_BLACKLIST: 86400;
    /**
     * Webhook cache TTL: 1 hour
     */
    readonly WEBHOOK: 3600;
    /**
     * Template cache TTL: 24 hours
     */
    readonly TEMPLATE: 86400;
    /**
     * Translation cache TTL: 7 days
     */
    readonly TRANSLATION: 604800;
    /**
     * Default cache TTL: 5 minutes
     */
    readonly DEFAULT: 300;
    /**
     * Short cache TTL: 30 seconds
     */
    readonly SHORT: 30;
    /**
     * Long cache TTL: 24 hours
     */
    readonly LONG: 86400;
    /**
     * Permanent cache TTL: 30 days
     */
    readonly PERMANENT: 2592000;
    /**
     * Never expire (use with caution)
     */
    readonly NEVER: 0;
    /**
     * Authentication token cache
     */
    readonly TOKEN: "token:";
    /**
     * User profile cache
     */
    readonly PROFILE: "profile:";
    /**
     * User settings cache
     */
    readonly SETTINGS: "settings:";
    /**
     * Content cache
     */
    readonly CONTENT: "content:";
    /**
     * Analytics cache
     */
    readonly ANALYTICS: "analytics:";
    /**
     * Report cache
     */
    readonly REPORT: "report:";
    /**
     * Cache for cache invalidation patterns
     */
    readonly INVALIDATION: "invalidation:";
};
//# sourceMappingURL=cache.constants.d.ts.map