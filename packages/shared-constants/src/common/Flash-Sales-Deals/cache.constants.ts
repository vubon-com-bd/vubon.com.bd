/**
 * Flash Sales & Deals Cache Constants
 * Contains all caching-related constants for flash sales and deals management
 */

// ==================== Type Definitions ====================

type CacheParams = Record<string, string | number | boolean | null | undefined>;
type CacheKeyParts = string[];

// ==================== Cache TTL (Time To Live) in seconds ====================

export const FlashSalesDealsCacheTTL = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 600,
  VERY_LONG: 3600,
  EXTRA_LONG: 86400,
  DEFAULT: 300,
  MIN: 1,
  MAX: 86400,
} as const;

// ==================== Cache Prefixes ====================

export const FlashSalesDealsCachePrefixes = {
  FLASH_SALE: 'fs:',
  DEAL: 'deal:',
  PRODUCT_DEAL: 'pd:',
  BUNDLE_DEAL: 'bd:',
  SCHEDULE: 'sch:',
  PARTICIPANT: 'part:',
  INVENTORY: 'inv:',
  PRICE: 'price:',
  COUPON: 'coup:',
  VOUCHER: 'vouch:',
  RULE: 'rule:',
  NOTIFICATION: 'notif:',
  WISHLIST: 'wish:',
  SHARE: 'share:',
  ANALYTICS: 'anal:',
  REPORT: 'report:',
  SETTINGS: 'settings:',
  USER: 'user:',
  SESSION: 'session:',
  API: 'api:',
  PAGINATION: 'page:',
  LIST: 'list:',
  DETAIL: 'detail:',
} as const;

export type FlashSalesDealsCachePrefix =
  (typeof FlashSalesDealsCachePrefixes)[keyof typeof FlashSalesDealsCachePrefixes];

// ==================== Cache Key Delimiters ====================

export const FlashSalesDealsCacheDelimiters = {
  DEFAULT: ':',
  DOT: '.',
  UNDERSCORE: '_',
  HYPHEN: '-',
} as const;

export type FlashSalesDealsCacheDelimiter =
  (typeof FlashSalesDealsCacheDelimiters)[keyof typeof FlashSalesDealsCacheDelimiters];

// ==================== Cache Version ====================

export const FlashSalesDealsCacheVersion = {
  VERSION: 'v1',
  VERSION_PREFIX: 'v1:',
} as const;

// ==================== Cache Strategies ====================

export const FlashSalesDealsCacheStrategies = {
  CACHE_FIRST: 'cache_first',
  NETWORK_FIRST: 'network_first',
  CACHE_ONLY: 'cache_only',
  NETWORK_ONLY: 'network_only',
  STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
} as const;

export type FlashSalesDealsCacheStrategy =
  (typeof FlashSalesDealsCacheStrategies)[keyof typeof FlashSalesDealsCacheStrategies];

// ==================== Cache Refresh ====================

export const FlashSalesDealsCacheRefresh = {
  INTERVAL: 60,
  THRESHOLD: 0.8,
  BATCH_SIZE: 100,
  CONCURRENCY: 10,
} as const;

// ==================== Cache Size ====================

export const FlashSalesDealsCacheSize = {
  MAX: 10000,
  MAX_MEMORY: '1gb',
  WARNING: 0.8,
  CRITICAL: 0.9,
} as const;

// ==================== Cache Eviction Policies ====================

export const FlashSalesDealsCacheEviction = {
  LRU: 'lru',
  LFU: 'lfu',
  FIFO: 'fifo',
  TTL: 'ttl',
} as const;

export type FlashSalesDealsCacheEvictionPolicy =
  (typeof FlashSalesDealsCacheEviction)[keyof typeof FlashSalesDealsCacheEviction];

// ==================== Redis Configuration ====================

export const FlashSalesDealsRedisConfig = {
  HOST: 'localhost',
  PORT: 6379,
  PASSWORD: '',
  DB: 0,
  KEY_PREFIX: 'flash-sales-deals:',
  CONNECT_TIMEOUT: 10000,
  MAX_RETRIES_PER_REQUEST: 3,
  ENABLE_READY_CHECK: true,
  ENABLE_AUTO_PIPELINING: true,
  MAX_MEMORY: '1gb',
  EVICTION_POLICY: 'allkeys-lru',
  RETRY_DELAY: 1000,
  MAX_RETRY_DELAY: 5000,
  RETRY_MAX_ATTEMPTS: 10,
} as const;

// ==================== Memcached Configuration ====================

export const FlashSalesDealsMemcachedConfig = {
  HOST: 'localhost',
  PORT: 11211,
  USERNAME: '',
  PASSWORD: '',
  RETRY: 3,
  TIMEOUT: 5000,
  KEY_PREFIX: 'fsd:',
  CONNECTION_LIMIT: 10,
  POOL_SIZE: 5,
} as const;

// ==================== In-Memory Configuration ====================

export const FlashSalesDealsInMemoryConfig = {
  MAX_SIZE: 10000,
  TTL: 3600,
  CHECK_PERIOD: 600,
  KEY_PREFIX: 'im:',
  CLEANUP_INTERVAL: 300,
} as const;

// ==================== Cache Events ====================

export const FlashSalesDealsCacheEvents = {
  CLEAR_FLASH_SALE: 'cache:fs:clear',
  CLEAR_DEAL: 'cache:deal:clear',
  CLEAR_INVENTORY: 'cache:inv:clear',
  CLEAR_PRICE: 'cache:price:clear',
  CLEAR_COUPON: 'cache:coup:clear',
  CLEAR_VOUCHER: 'cache:vouch:clear',
  CLEAR_WISHLIST: 'cache:wish:clear',
  CLEAR_ALL: 'cache:clear:all',
  CLEAR_PREFIX: 'cache:clear:prefix',
  CLEAR_PATTERN: 'cache:clear:pattern',
  INVALIDATE: 'cache:invalidate',
  REFRESH: 'cache:refresh',
  HIT: 'cache:hit',
  MISS: 'cache:miss',
  EXPIRED: 'cache:expired',
} as const;

export type FlashSalesDealsCacheEvent =
  (typeof FlashSalesDealsCacheEvents)[keyof typeof FlashSalesDealsCacheEvents];

// ==================== Batch Settings ====================

export const FlashSalesDealsCacheBatch = {
  SMALL: 10,
  MEDIUM: 50,
  LARGE: 100,
  XLARGE: 500,
  DEFAULT: 50,
} as const;

// ==================== Pagination Cache ====================

export const FlashSalesDealsCachePagination = {
  MIN: 1,
  MAX: 100,
  DEFAULT: 20,
  CACHE_PAGE: true,
  CACHE_TOTAL: true,
} as const;

// ==================== Compression ====================

export const FlashSalesDealsCacheCompression = {
  ENABLED: true,
  THRESHOLD: 1024,
  ALGORITHM: 'gzip',
  LEVEL: 6,
} as const;

// ==================== Serialization ====================

export const FlashSalesDealsCacheSerialization = {
  FORMAT: 'json',
  ENCODING: 'utf-8',
} as const;

// ==================== Keys to ignore ====================

export const FlashSalesDealsCacheIgnorePatterns: readonly RegExp[] = [
  /^fsd:session:.*/,
  /^fsd:user:.*/,
  /^fsd:api:.*/,
] as const;

// ==================== Keys to never cache ====================

export const FlashSalesDealsCacheNoCachePatterns: readonly RegExp[] = [
  /^fsd:analytics:.*/,
  /^fsd:report:.*/,
] as const;

// ==================== Main Cache Config ====================

export const FlashSalesDealsCache = {
  TTL: FlashSalesDealsCacheTTL,
  PREFIXES: FlashSalesDealsCachePrefixes,
  DELIMITERS: FlashSalesDealsCacheDelimiters,
  VERSION: FlashSalesDealsCacheVersion,
  STRATEGIES: FlashSalesDealsCacheStrategies,
  REFRESH: FlashSalesDealsCacheRefresh,
  SIZE: FlashSalesDealsCacheSize,
  EVICTION: FlashSalesDealsCacheEviction,
  REDIS: FlashSalesDealsRedisConfig,
  MEMCACHED: FlashSalesDealsMemcachedConfig,
  IN_MEMORY: FlashSalesDealsInMemoryConfig,
  EVENTS: FlashSalesDealsCacheEvents,
  BATCH: FlashSalesDealsCacheBatch,
  PAGINATION: FlashSalesDealsCachePagination,
  COMPRESSION: FlashSalesDealsCacheCompression,
  SERIALIZATION: FlashSalesDealsCacheSerialization,
  IGNORE_PATTERNS: FlashSalesDealsCacheIgnorePatterns,
  NO_CACHE_PATTERNS: FlashSalesDealsCacheNoCachePatterns,
} as const;

// ==================== Cache Key Builders ====================

export const FlashSalesDealsCacheKey = {
  // Flash Sale Keys
  flashSale: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.FLASH_SALE}${id}`,

  flashSaleDetail: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.FLASH_SALE}${id}:detail`,

  flashSaleList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.FLASH_SALE}list:${JSON.stringify(sorted)}`;
  },

  // Deal Keys
  deal: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.DEAL}${id}`,

  dealDetail: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.DEAL}${id}:detail`,

  dealList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.DEAL}list:${JSON.stringify(sorted)}`;
  },

  // Product Deal Keys
  productDeal: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PRODUCT_DEAL}${id}`,

  productDealList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PRODUCT_DEAL}list:${JSON.stringify(sorted)}`;
  },

  // Bundle Deal Keys
  bundleDeal: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.BUNDLE_DEAL}${id}`,

  bundleDealList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.BUNDLE_DEAL}list:${JSON.stringify(sorted)}`;
  },

  // Schedule Keys
  schedule: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.SCHEDULE}${id}`,

  scheduleList: (flashSaleId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.SCHEDULE}${flashSaleId}:list`,

  // Participant Keys
  participant: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PARTICIPANT}${id}`,

  participantList: (flashSaleId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PARTICIPANT}${flashSaleId}:list`,

  // Inventory Keys
  inventory: (productId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.INVENTORY}${productId}`,

  inventoryReservation: (productId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.INVENTORY}${productId}:reservation`,

  // Price Keys
  price: (productId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PRICE}${productId}`,

  priceDiscount: (productId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.PRICE}${productId}:discount`,

  // Coupon Keys
  coupon: (code: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.COUPON}${code}`,

  couponList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.COUPON}list:${JSON.stringify(sorted)}`;
  },

  // Voucher Keys
  voucher: (code: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.VOUCHER}${code}`,

  voucherList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.VOUCHER}list:${JSON.stringify(sorted)}`;
  },

  // User Keys
  user: (userId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.USER}${userId}`,

  userFlashSales: (userId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.USER}${userId}:flash-sales`,

  userDeals: (userId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.USER}${userId}:deals`,

  // Session Keys
  session: (sessionId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.SESSION}${sessionId}`,

  // API Keys
  apiResponse: (endpoint: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.API}${endpoint}`,

  // Analytics Keys
  analytics: (type: string, params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.ANALYTICS}${type}:${JSON.stringify(sorted)}`;
  },

  // Report Keys
  report: (id: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.REPORT}${id}`,

  reportList: (params: CacheParams): string => {
    const sorted = Object.keys(params)
      .sort()
      .reduce<CacheParams>((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.REPORT}list:${JSON.stringify(sorted)}`;
  },

  // Settings Keys
  settings: (type: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.SETTINGS}${type}`,

  // Wishlist Keys
  wishlist: (userId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.WISHLIST}${userId}`,

  wishlistItem: (userId: string, itemId: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.WISHLIST}${userId}:${itemId}`,

  // Share Keys
  share: (code: string): string =>
    `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${FlashSalesDealsCachePrefixes.SHARE}${code}`,

  // Generic Key Builder
  buildKey: (prefix: FlashSalesDealsCachePrefix, parts: CacheKeyParts): string => {
    const delimiter = FlashSalesDealsCacheDelimiters.DEFAULT;
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${prefix}${parts.join(delimiter)}`;
  },

  // Pattern Builder for Bulk Operations
  buildPattern: (prefix: FlashSalesDealsCachePrefix, pattern: string): string => {
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${prefix}${pattern}`;
  },

  // Build key with custom delimiter
  buildKeyWithDelimiter: (
    prefix: FlashSalesDealsCachePrefix,
    parts: CacheKeyParts,
    delimiter: FlashSalesDealsCacheDelimiter
  ): string => {
    return `${FlashSalesDealsCacheVersion.VERSION_PREFIX}${prefix}${parts.join(delimiter)}`;
  },
};

// ==================== TTL Helper Functions ====================

export const FlashSalesDealsCacheTTLHelper = {
  getTTL: (type: keyof typeof FlashSalesDealsCacheTTL): number => {
    return FlashSalesDealsCacheTTL[type] || FlashSalesDealsCacheTTL.DEFAULT;
  },

  setCustomTTL: (ttl: number): number => {
    return Math.max(FlashSalesDealsCacheTTL.MIN, Math.min(FlashSalesDealsCacheTTL.MAX, ttl));
  },

  getTTLForFlashSale: (status: string): number => {
    switch (status) {
      case 'ACTIVE':
        return FlashSalesDealsCacheTTL.SHORT;
      case 'SCHEDULED':
        return FlashSalesDealsCacheTTL.MEDIUM;
      case 'ENDED':
        return FlashSalesDealsCacheTTL.LONG;
      case 'CANCELLED':
        return FlashSalesDealsCacheTTL.VERY_LONG;
      default:
        return FlashSalesDealsCacheTTL.DEFAULT;
    }
  },

  getTTLForDeal: (status: string): number => {
    switch (status) {
      case 'ACTIVE':
        return FlashSalesDealsCacheTTL.SHORT;
      case 'SCHEDULED':
        return FlashSalesDealsCacheTTL.MEDIUM;
      case 'ENDED':
        return FlashSalesDealsCacheTTL.LONG;
      default:
        return FlashSalesDealsCacheTTL.DEFAULT;
    }
  },

  getTTLForInventory: (_productId: string): number => {
    // Dynamic TTL based on product popularity
    return FlashSalesDealsCacheTTL.SHORT;
  },

  getTTLForPrice: (_productId: string): number => {
    // Dynamic TTL based on price volatility
    return FlashSalesDealsCacheTTL.MEDIUM;
  },
};

// ==================== Cache Configuration Helpers ====================

export const FlashSalesDealsCacheConfig = {
  getPrefix: (type: keyof typeof FlashSalesDealsCachePrefixes): FlashSalesDealsCachePrefix => {
    return FlashSalesDealsCachePrefixes[type];
  },

  getDelimiter: (
    type: keyof typeof FlashSalesDealsCacheDelimiters = 'DEFAULT'
  ): FlashSalesDealsCacheDelimiter => {
    return FlashSalesDealsCacheDelimiters[type] || FlashSalesDealsCacheDelimiters.DEFAULT;
  },

  getVersion: (): string => {
    return FlashSalesDealsCacheVersion.VERSION;
  },

  getVersionPrefix: (): string => {
    return FlashSalesDealsCacheVersion.VERSION_PREFIX;
  },

  isEnabled: (): boolean => {
    return process.env.CACHE_ENABLED !== 'false';
  },

  isCompressionEnabled: (): boolean => {
    return FlashSalesDealsCacheCompression.ENABLED;
  },

  getCompressionThreshold: (): number => {
    return FlashSalesDealsCacheCompression.THRESHOLD;
  },

  getRedisConfig: () => {
    return {
      ...FlashSalesDealsRedisConfig,
      password: process.env.REDIS_PASSWORD || FlashSalesDealsRedisConfig.PASSWORD,
      host: process.env.REDIS_HOST || FlashSalesDealsRedisConfig.HOST,
      port: parseInt(process.env.REDIS_PORT || String(FlashSalesDealsRedisConfig.PORT)),
    };
  },

  getMemcachedConfig: () => {
    return {
      ...FlashSalesDealsMemcachedConfig,
      host: process.env.MEMCACHED_HOST || FlashSalesDealsMemcachedConfig.HOST,
      port: parseInt(process.env.MEMCACHED_PORT || String(FlashSalesDealsMemcachedConfig.PORT)),
    };
  },

  getInMemoryConfig: () => {
    return {
      ...FlashSalesDealsInMemoryConfig,
      maxSize: parseInt(
        process.env.IN_MEMORY_MAX_SIZE || String(FlashSalesDealsInMemoryConfig.MAX_SIZE)
      ),
    };
  },

  getEvictionPolicy: (): FlashSalesDealsCacheEvictionPolicy => {
    const policy = process.env.CACHE_EVICTION_POLICY || FlashSalesDealsCacheEviction.LRU;
    return policy as FlashSalesDealsCacheEvictionPolicy;
  },

  getRefreshInterval: (): number => {
    return parseInt(
      process.env.CACHE_REFRESH_INTERVAL || String(FlashSalesDealsCacheRefresh.INTERVAL)
    );
  },

  getBatchSize: (): number => {
    return parseInt(process.env.CACHE_BATCH_SIZE || String(FlashSalesDealsCacheBatch.DEFAULT));
  },

  getPaginationConfig: () => {
    return FlashSalesDealsCachePagination;
  },

  shouldCache: (key: string): boolean => {
    for (const pattern of FlashSalesDealsCacheNoCachePatterns) {
      if (pattern.test(key)) {
        return false;
      }
    }
    return true;
  },

  shouldIgnore: (key: string): boolean => {
    for (const pattern of FlashSalesDealsCacheIgnorePatterns) {
      if (pattern.test(key)) {
        return true;
      }
    }
    return false;
  },
};
