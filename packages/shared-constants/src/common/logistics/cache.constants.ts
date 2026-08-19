/**
 * Logistics Cache Constants
 * Contains all caching-related constants for logistics management
 */

export const LogisticsCache = {
  // Default cache timeout in seconds
  DEFAULT_TIMEOUT: 3600,

  // Maximum cache size (number of entries)
  MAX_SIZE: 10000,

  // Cache storage types
  STORAGE_TYPE: {
    REDIS: 'redis',
    MEMCACHED: 'memcached',
    IN_MEMORY: 'in_memory',
  } as const,

  // Cache key prefixes
  KEY_PREFIX: {
    SHIPMENT: 'shipment:',
    TRACKING: 'tracking:',
    DELIVERY: 'delivery:',
    CARRIER: 'carrier:',
    ROUTE: 'route:',
    LOCATION: 'location:',
    INVENTORY: 'inventory:',
    WAREHOUSE: 'warehouse:',
    ORDER: 'order:',
    CUSTOMER: 'customer:',
  } as const,

  // Cache TTL (Time To Live) in seconds
  TTL: {
    SHIPMENT: 3600, // 1 hour
    TRACKING: 300, // 5 minutes
    DELIVERY: 1800, // 30 minutes
    CARRIER: 7200, // 2 hours
    ROUTE: 1800, // 30 minutes
    LOCATION: 300, // 5 minutes
    INVENTORY: 60, // 1 minute
    WAREHOUSE: 3600, // 1 hour
    ORDER: 3600, // 1 hour
    CUSTOMER: 86400, // 24 hours
  } as const,

  // Cache refresh interval in seconds
  REFRESH_INTERVAL: {
    SHIPMENT: 300, // 5 minutes
    TRACKING: 60, // 1 minute
    DELIVERY: 120, // 2 minutes
    CARRIER: 600, // 10 minutes
    ROUTE: 120, // 2 minutes
    LOCATION: 30, // 30 seconds
    INVENTORY: 30, // 30 seconds
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
    CLEAR_SHIPMENT: 'logistics:shipment:clear',
    CLEAR_TRACKING: 'logistics:tracking:clear',
    CLEAR_DELIVERY: 'logistics:delivery:clear',
    CLEAR_CARRIER: 'logistics:carrier:clear',
    CLEAR_ROUTE: 'logistics:route:clear',
    CLEAR_LOCATION: 'logistics:location:clear',
    CLEAR_INVENTORY: 'logistics:inventory:clear',
    CLEAR_WAREHOUSE: 'logistics:warehouse:clear',
    CLEAR_ORDER: 'logistics:order:clear',
    CLEAR_ALL: 'logistics:clear:all',
  } as const,

  // Redis configuration (fallback values)
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'logistics:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '2gb',
    EVICTION_POLICY: 'allkeys-lru',
  } as const,

  // Batch settings
  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
    } as const,
    DEFAULT_SIZE: 50,
  } as const,

  // Pagination cache settings
  PAGINATION: {
    SIZE: {
      MIN: 1,
      MAX: 100,
      DEFAULT: 20,
    } as const,
    CACHE_PAGE: true,
    CACHE_TOTAL: true,
  } as const,
} as const;

// Cache key builder helper
export const LogisticsCacheKey = {
  shipment: (id: string): string => `${LogisticsCache.KEY_PREFIX.SHIPMENT}${id}`,
  tracking: (number: string): string => `${LogisticsCache.KEY_PREFIX.TRACKING}${number}`,
  delivery: (id: string): string => `${LogisticsCache.KEY_PREFIX.DELIVERY}${id}`,
  carrier: (id: string): string => `${LogisticsCache.KEY_PREFIX.CARRIER}${id}`,
  route: (id: string): string => `${LogisticsCache.KEY_PREFIX.ROUTE}${id}`,
  location: (id: string): string => `${LogisticsCache.KEY_PREFIX.LOCATION}${id}`,
  inventory: (id: string): string => `${LogisticsCache.KEY_PREFIX.INVENTORY}${id}`,
  warehouse: (id: string): string => `${LogisticsCache.KEY_PREFIX.WAREHOUSE}${id}`,
  order: (id: string): string => `${LogisticsCache.KEY_PREFIX.ORDER}${id}`,
  customer: (id: string): string => `${LogisticsCache.KEY_PREFIX.CUSTOMER}${id}`,
} as const;

// Cache TTL helper
export const LogisticsCacheTTL = {
  getTTL: (type: keyof typeof LogisticsCache.TTL): number => {
    return LogisticsCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
  getDefaultTimeout: (): number => {
    return LogisticsCache.DEFAULT_TIMEOUT;
  },
} as const;

// Cache configuration helper
export const LogisticsCacheConfig = {
  getStorageType: (type: keyof typeof LogisticsCache.STORAGE_TYPE): string => {
    return LogisticsCache.STORAGE_TYPE[type];
  },
  getRefreshInterval: (type: keyof typeof LogisticsCache.REFRESH_INTERVAL): number => {
    return LogisticsCache.REFRESH_INTERVAL[type];
  },
  getMaxSize: (): number => {
    return LogisticsCache.MAX_SIZE;
  },
} as const;
