/**
 * Analytics Cache Constants
 * Contains all caching-related constants for analytics management
 */

export const AnalyticsCache = {
  // Default cache TTL in seconds
  DEFAULT_TTL: 300,

  // Cache TTL in minutes
  TTL_MINUTES: {
    SHORT: 5,
    MEDIUM: 15,
    LONG: 60,
    VERY_LONG: 1440,
  } as const,

  // Cache TTL in hours
  TTL_HOURS: {
    SHORT: 1,
    MEDIUM: 6,
    LONG: 24,
    VERY_LONG: 168,
  } as const,

  // Cache TTL in days
  TTL_DAYS: {
    SHORT: 1,
    MEDIUM: 7,
    LONG: 30,
    VERY_LONG: 365,
  } as const,

  // Maximum cache size (number of entries)
  MAX_SIZE: 10000,

  // Cache storage types
  STORAGE_TYPE: {
    MEMORY: 'memory',
    REDIS: 'redis',
    MEMCACHED: 'memcached',
    FILE: 'file',
    DATABASE: 'database',
  } as const,

  // Cache key prefixes
  KEY_PREFIX: {
    ANALYTICS: 'analytics:',
    REPORT: 'report:',
    DASHBOARD: 'dashboard:',
    METRIC: 'metric:',
    DIMENSION: 'dimension:',
    FILTER: 'filter:',
    QUERY: 'query:',
    RESULT: 'result:',
    AGGREGATION: 'aggregation:',
    TREND: 'trend:',
    FORECAST: 'forecast:',
    INSIGHT: 'insight:',
    ALERT: 'alert:',
    ANOMALY: 'anomaly:',
  } as const,

  // Cache invalidation strategies
  INVALIDATION_STRATEGY: {
    TTL_BASED: 'ttl_based',
    LRU: 'lru',
    LFU: 'lfu',
    FIFO: 'fifo',
    RANDOM: 'random',
  } as const,

  // Cache refresh policies
  REFRESH_POLICY: {
    LAZY: 'lazy',
    EAGER: 'eager',
    SCHEDULED: 'scheduled',
  } as const,

  // Cache eviction policies
  EVICTION_POLICY: {
    LRU: 'lru',
    LFU: 'lfu',
    FIFO: 'fifo',
    TTL: 'ttl',
    SIZE: 'size',
  } as const,

  // Cache read strategies
  READ_STRATEGY: {
    CACHE_ASIDE: 'cache_aside',
    READ_THROUGH: 'read_through',
    WRITE_THROUGH: 'write_through',
    WRITE_BEHIND: 'write_behind',
  } as const,

  // Cache write strategies
  WRITE_STRATEGY: {
    WRITE_THROUGH: 'write_through',
    WRITE_BEHIND: 'write_behind',
    WRITE_AROUND: 'write_around',
  } as const,

  // Cache compression settings
  COMPRESSION: {
    ENABLED: true,
    ALGORITHM: {
      GZIP: 'gzip',
      ZLIB: 'zlib',
      DEFLATE: 'deflate',
      SNAPPY: 'snappy',
      LZ4: 'lz4',
      BROTLI: 'brotli',
    } as const,
    LEVEL: {
      MINIMAL: 1,
      MEDIUM: 6,
      MAXIMUM: 9,
    } as const,
  } as const,

  // Cache encryption settings
  ENCRYPTION: {
    ENABLED: false,
    ALGORITHM: {
      AES_256: 'aes-256-gcm',
      AES_128: 'aes-128-gcm',
    } as const,
  } as const,

  // Cache partitioning settings
  PARTITIONING: {
    ENABLED: false,
    STRATEGY: {
      RANGE: 'range',
      HASH: 'hash',
      LIST: 'list',
    } as const,
    COUNT: 4,
  } as const,

  // Cache replication settings
  REPLICATION: {
    ENABLED: false,
    COUNT: 2,
    SYNC: {
      ASYNC: 'async',
      SYNC: 'sync',
      SEMI_SYNC: 'semi_sync',
    } as const,
  } as const,

  // Cache clustering settings
  CLUSTERING: {
    ENABLED: false,
    TYPE: {
      MASTER_SLAVE: 'master_slave',
      SENTINEL: 'sentinel',
      CLUSTER: 'cluster',
    } as const,
  } as const,

  // Cache monitoring settings
  MONITORING: {
    ENABLED: true,
    INTERVAL: 60, // seconds
    METRICS: {
      HIT_RATE: 'hit_rate',
      MISS_RATE: 'miss_rate',
      SIZE: 'size',
      EVICTIONS: 'evictions',
      LATENCY: 'latency',
      THROUGHPUT: 'throughput',
    } as const,
  } as const,

  // Cache alert thresholds
  ALERT_THRESHOLD: {
    HIT_RATE_LOW: 0.7,
    MISS_RATE_HIGH: 0.3,
    SIZE_HIGH: 0.9,
    LATENCY_HIGH: 100, // milliseconds
  } as const,

  // Cache metrics collection settings
  METRICS_COLLECTION: {
    ENABLED: true,
    INTERVAL: 60, // seconds
    PRECISION: 3, // decimal places
  } as const,

  // Cache hit/miss thresholds
  HIT_MISS_THRESHOLD: {
    HIT_RATE: 0.8,
    MISS_RATE: 0.2,
  } as const,

  // Cache penetration protection settings
  PENETRATION_PROTECTION: {
    ENABLED: true,
    BLOOM_FILTER: {
      ENABLED: true,
      SIZE: 1000000,
      HASH_COUNT: 3,
    } as const,
  } as const,

  // Cache avalanche protection settings
  AVALANCHE_PROTECTION: {
    ENABLED: true,
    STRATEGY: {
      RANDOM_EXPIRY: 'random_expiry',
      MUTEX: 'mutex',
    } as const,
    JITTER: 0.2, // 20% variation
  } as const,

  // Cache breakdown protection settings
  BREAKDOWN_PROTECTION: {
    ENABLED: true,
    STRATEGY: {
      MUTEX: 'mutex',
      SEMAPHORE: 'semaphore',
    } as const,
    TIMEOUT: 5000, // milliseconds
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_ANALYTICS: 'analytics:cache:clear',
    CLEAR_REPORT: 'analytics:report:clear',
    CLEAR_DASHBOARD: 'analytics:dashboard:clear',
    CLEAR_METRIC: 'analytics:metric:clear',
    CLEAR_QUERY: 'analytics:query:clear',
    CLEAR_ALL: 'analytics:cache:clear:all',
  } as const,

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'analytics:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '2gb',
    EVICTION_POLICY: 'allkeys-lru',
  } as const,

  // Memcached configuration
  MEMCACHED_CONFIG: {
    HOST: 'localhost',
    PORT: 11211,
    USERNAME: '',
    PASSWORD: '',
    RETRY: 3,
    TIMEOUT: 5000,
  } as const,

  // File cache configuration
  FILE_CONFIG: {
    PATH: './cache/analytics',
    EXTENSION: '.cache',
    MAX_SIZE: 1000000000, // 1GB
  } as const,

  // Database cache configuration
  DATABASE_CONFIG: {
    TABLE: 'analytics_cache',
    COLUMNS: {
      KEY: 'cache_key',
      VALUE: 'cache_value',
      EXPIRY: 'expiry_time',
    } as const,
  } as const,
} as const;

// Cache key builder helper
export const AnalyticsCacheKey = {
  analytics: (id: string): string => `${AnalyticsCache.KEY_PREFIX.ANALYTICS}${id}`,
  report: (id: string): string => `${AnalyticsCache.KEY_PREFIX.REPORT}${id}`,
  dashboard: (id: string): string => `${AnalyticsCache.KEY_PREFIX.DASHBOARD}${id}`,
  metric: (name: string): string => `${AnalyticsCache.KEY_PREFIX.METRIC}${name}`,
  dimension: (name: string): string => `${AnalyticsCache.KEY_PREFIX.DIMENSION}${name}`,
  filter: (name: string): string => `${AnalyticsCache.KEY_PREFIX.FILTER}${name}`,
  query: (hash: string): string => `${AnalyticsCache.KEY_PREFIX.QUERY}${hash}`,
  result: (id: string): string => `${AnalyticsCache.KEY_PREFIX.RESULT}${id}`,
  aggregation: (id: string): string => `${AnalyticsCache.KEY_PREFIX.AGGREGATION}${id}`,
  trend: (id: string): string => `${AnalyticsCache.KEY_PREFIX.TREND}${id}`,
  forecast: (id: string): string => `${AnalyticsCache.KEY_PREFIX.FORECAST}${id}`,
  insight: (id: string): string => `${AnalyticsCache.KEY_PREFIX.INSIGHT}${id}`,
  alert: (id: string): string => `${AnalyticsCache.KEY_PREFIX.ALERT}${id}`,
  anomaly: (id: string): string => `${AnalyticsCache.KEY_PREFIX.ANOMALY}${id}`,
  buildKey: (prefix: string, ...parts: string[]): string => {
    return `${prefix}${parts.join(':')}`;
  },
} as const;

// Cache TTL helper
export const AnalyticsCacheTTL = {
  getDefaultTTL: (): number => AnalyticsCache.DEFAULT_TTL,
  getTTLMinutes: (type: keyof typeof AnalyticsCache.TTL_MINUTES): number => {
    return AnalyticsCache.TTL_MINUTES[type] * 60;
  },
  getTTLHours: (type: keyof typeof AnalyticsCache.TTL_HOURS): number => {
    return AnalyticsCache.TTL_HOURS[type] * 3600;
  },
  getTTLDays: (type: keyof typeof AnalyticsCache.TTL_DAYS): number => {
    return AnalyticsCache.TTL_DAYS[type] * 86400;
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(31536000, ttl)); // Max 1 year, min 1 second
  },
} as const;

// Cache configuration helper
export const AnalyticsCacheConfig = {
  getStorageType: (type: keyof typeof AnalyticsCache.STORAGE_TYPE): string => {
    return AnalyticsCache.STORAGE_TYPE[type];
  },
  getEvictionPolicy: (type: keyof typeof AnalyticsCache.EVICTION_POLICY): string => {
    return AnalyticsCache.EVICTION_POLICY[type];
  },
  getReadStrategy: (type: keyof typeof AnalyticsCache.READ_STRATEGY): string => {
    return AnalyticsCache.READ_STRATEGY[type];
  },
  getWriteStrategy: (type: keyof typeof AnalyticsCache.WRITE_STRATEGY): string => {
    return AnalyticsCache.WRITE_STRATEGY[type];
  },
  getMaxSize: (): number => AnalyticsCache.MAX_SIZE,
  isCompressionEnabled: (): boolean => AnalyticsCache.COMPRESSION.ENABLED,
  isEncryptionEnabled: (): boolean => AnalyticsCache.ENCRYPTION.ENABLED,
  isPartitioningEnabled: (): boolean => AnalyticsCache.PARTITIONING.ENABLED,
  isReplicationEnabled: (): boolean => AnalyticsCache.REPLICATION.ENABLED,
  isClusteringEnabled: (): boolean => AnalyticsCache.CLUSTERING.ENABLED,
  isMonitoringEnabled: (): boolean => AnalyticsCache.MONITORING.ENABLED,
} as const;
