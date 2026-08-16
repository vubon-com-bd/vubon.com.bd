/**
 * @fileoverview Cache configuration and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Cache storage types
 */
export enum CacheStorageType {
  /** In-memory cache */
  MEMORY = 'MEMORY',
  /** Redis cache */
  REDIS = 'REDIS',
  /** Memcached cache */
  MEMCACHED = 'MEMCACHED',
  /** File system cache */
  FILE = 'FILE',
  /** Database cache */
  DATABASE = 'DATABASE',
  /** Multi-level cache */
  MULTI_LEVEL = 'MULTI_LEVEL',
}

/**
 * Cache eviction strategy
 */
export enum CacheEvictionStrategy {
  /** Least Recently Used */
  LRU = 'LRU',
  /** Least Frequently Used */
  LFU = 'LFU',
  /** First In First Out */
  FIFO = 'FIFO',
  /** Time To Live */
  TTL = 'TTL',
  /** Random Replacement */
  RANDOM = 'RANDOM',
  /** Most Recently Used */
  MRU = 'MRU',
}

/**
 * Cache refresh policy
 */
export enum CacheRefreshPolicy {
  /** Never refresh */
  NEVER = 'NEVER',
  /** Refresh on read */
  ON_READ = 'ON_READ',
  /** Refresh on write */
  ON_WRITE = 'ON_WRITE',
  /** Refresh periodically */
  PERIODIC = 'PERIODIC',
  /** Refresh on expiry */
  ON_EXPIRY = 'ON_EXPIRY',
  /** Refresh on demand */
  ON_DEMAND = 'ON_DEMAND',
  /** Refresh asynchronously */
  ASYNC = 'ASYNC',
}

/**
 * Cache read strategy
 */
export enum CacheReadStrategy {
  /** Read from cache first, then database */
  CACHE_THEN_DB = 'CACHE_THEN_DB',
  /** Read from database first, then cache */
  DB_THEN_CACHE = 'DB_THEN_CACHE',
  /** Read from cache only */
  CACHE_ONLY = 'CACHE_ONLY',
  /** Read from database only */
  DB_ONLY = 'DB_ONLY',
  /** Read from both and compare */
  BOTH_COMPARE = 'BOTH_COMPARE',
  /** Read from nearest available */
  NEAREST = 'NEAREST',
}

/**
 * Cache write strategy
 */
export enum CacheWriteStrategy {
  /** Write to cache then database */
  CACHE_THEN_DB = 'CACHE_THEN_DB',
  /** Write to database then cache */
  DB_THEN_CACHE = 'DB_THEN_CACHE',
  /** Write to cache only */
  CACHE_ONLY = 'CACHE_ONLY',
  /** Write to database only */
  DB_ONLY = 'DB_ONLY',
  /** Write to both */
  WRITE_BOTH = 'WRITE_BOTH',
  /** Write to nearest available */
  NEAREST = 'NEAREST',
  /** Write through */
  WRITE_THROUGH = 'WRITE_THROUGH',
  /** Write behind */
  WRITE_BEHIND = 'WRITE_BEHIND',
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Cache name */
  name: string;
  /** Storage type */
  storageType: CacheStorageType;
  /** Eviction strategy */
  evictionStrategy: CacheEvictionStrategy;
  /** Read strategy */
  readStrategy: CacheReadStrategy;
  /** Write strategy */
  writeStrategy: CacheWriteStrategy;
  /** Refresh policy */
  refreshPolicy: CacheRefreshPolicy;
  /** Default TTL in seconds */
  defaultTTLSeconds: number;
  /** Max size */
  maxSize: number;
  /** Enable compression */
  compression: boolean;
  /** Enable encryption */
  encryption: boolean;
}

/**
 * Default cache configuration
 */
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  name: 'default',
  storageType: CacheStorageType.MEMORY,
  evictionStrategy: CacheEvictionStrategy.LRU,
  readStrategy: CacheReadStrategy.CACHE_THEN_DB,
  writeStrategy: CacheWriteStrategy.WRITE_BOTH,
  refreshPolicy: CacheRefreshPolicy.ON_EXPIRY,
  defaultTTLSeconds: 3600,
  maxSize: 1000,
  compression: false,
  encryption: false,
};

/**
 * Cache TTL presets (in seconds)
 */
export const CACHE_TTL_PRESETS = {
  /** Very short: 1 minute */
  VERY_SHORT: 60,
  /** Short: 5 minutes */
  SHORT: 300,
  /** Medium: 15 minutes */
  MEDIUM: 900,
  /** Long: 1 hour */
  LONG: 3600,
  /** Very long: 6 hours */
  VERY_LONG: 21600,
  /** Day: 24 hours */
  DAY: 86400,
  /** Week: 7 days */
  WEEK: 604800,
  /** Month: 30 days */
  MONTH: 2592000,
  /** Year: 365 days */
  YEAR: 31536000,
  /** Forever (never expires) */
  FOREVER: -1,
} as const;

/**
 * Cache key prefixes
 */
export const CACHE_KEY_PREFIXES = {
  /** Authentication cache */
  AUTH: 'auth:',
  /** User cache */
  USER: 'user:',
  /** Session cache */
  SESSION: 'session:',
  /** Product cache */
  PRODUCT: 'product:',
  /** Category cache */
  CATEGORY: 'category:',
  /** Cart cache */
  CART: 'cart:',
  /** Order cache */
  ORDER: 'order:',
  /** Payment cache */
  PAYMENT: 'payment:',
  /** Notification cache */
  NOTIFICATION: 'notification:',
  /** Settings cache */
  SETTINGS: 'settings:',
  /** API cache */
  API: 'api:',
  /** View cache */
  VIEW: 'view:',
  /** Fragment cache */
  FRAGMENT: 'fragment:',
  /** Page cache */
  PAGE: 'page:',
  /** Widget cache */
  WIDGET: 'widget:',
  /** Menu cache */
  MENU: 'menu:',
  /** Translation cache */
  TRANSLATION: 'translation:',
  /** Asset cache */
  ASSET: 'asset:',
  /** Cache for computed values */
  COMPUTED: 'computed:',
  /** Cache for queries */
  QUERY: 'query:',
  /** Cache for API responses */
  RESPONSE: 'response:',
  /** Default cache prefix */
  DEFAULT: 'default:',
} as const;

/**
 * Cache partitioning settings
 */
export interface CachePartitionSettings {
  /** Enable partitioning */
  enablePartitioning: boolean;
  /** Partition count */
  partitionCount: number;
  /** Partition key */
  partitionKey: string;
  /** Partition strategy */
  strategy: 'HASH' | 'RANGE' | 'ROUND_ROBIN' | 'CUSTOM';
}

export const DEFAULT_CACHE_PARTITION_SETTINGS: CachePartitionSettings = {
  enablePartitioning: false,
  partitionCount: 1,
  partitionKey: 'id',
  strategy: 'HASH',
};

/**
 * Cache replication settings
 */
export interface CacheReplicationSettings {
  /** Enable replication */
  enableReplication: boolean;
  /** Replica count */
  replicaCount: number;
  /** Replication factor */
  replicationFactor: number;
  /** Sync strategy */
  syncStrategy: 'SYNC' | 'ASYNC' | 'SEMI_SYNC';
}

export const DEFAULT_CACHE_REPLICATION_SETTINGS: CacheReplicationSettings = {
  enableReplication: false,
  replicaCount: 1,
  replicationFactor: 1,
  syncStrategy: 'ASYNC',
};

/**
 * Cache clustering settings
 */
export interface CacheClusteringSettings {
  /** Enable clustering */
  enableClustering: boolean;
  /** Cluster size */
  clusterSize: number;
  /** Cluster strategy */
  strategy: 'STANDALONE' | 'CLUSTER' | 'SENTINEL';
  /** Auto-discovery */
  enableAutoDiscovery: boolean;
  /** Heartbeat interval in seconds */
  heartbeatIntervalSeconds: number;
}

export const DEFAULT_CACHE_CLUSTERING_SETTINGS: CacheClusteringSettings = {
  enableClustering: false,
  clusterSize: 1,
  strategy: 'STANDALONE',
  enableAutoDiscovery: true,
  heartbeatIntervalSeconds: 5,
};

/**
 * Cache monitoring settings
 */
export interface CacheMonitoringSettings {
  /** Enable monitoring */
  enableMonitoring: boolean;
  /** Collect metrics */
  collectMetrics: boolean;
  /** Collect hit rate */
  collectHitRate: boolean;
  /** Collect miss rate */
  collectMissRate: boolean;
  /** Collect latency */
  collectLatency: boolean;
  /** Collect error count */
  collectErrorCount: boolean;
  /** Metrics retention in seconds */
  metricsRetentionSeconds: number;
}

export const DEFAULT_CACHE_MONITORING_SETTINGS: CacheMonitoringSettings = {
  enableMonitoring: true,
  collectMetrics: true,
  collectHitRate: true,
  collectMissRate: true,
  collectLatency: true,
  collectErrorCount: true,
  metricsRetentionSeconds: 3600,
};

/**
 * Cache alert thresholds
 */
export interface CacheAlertThresholds {
  /** Hit rate threshold (percentage) */
  hitRateThreshold: number;
  /** Miss rate threshold (percentage) */
  missRateThreshold: number;
  /** Latency threshold in milliseconds */
  latencyThresholdMs: number;
  /** Error rate threshold (percentage) */
  errorRateThreshold: number;
  /** Memory usage threshold (percentage) */
  memoryUsageThreshold: number;
}

export const DEFAULT_CACHE_ALERT_THRESHOLDS: CacheAlertThresholds = {
  hitRateThreshold: 80,
  missRateThreshold: 20,
  latencyThresholdMs: 10,
  errorRateThreshold: 1,
  memoryUsageThreshold: 80,
};

/**
 * Cache metrics collection settings
 */
export interface CacheMetricsCollectionSettings {
  /** Enable collection */
  enableCollection: boolean;
  /** Collection interval in seconds */
  collectionIntervalSeconds: number;
  /** Metrics to collect */
  metrics: (
    | 'HIT_COUNT'
    | 'MISS_COUNT'
    | 'HIT_RATE'
    | 'MISS_RATE'
    | 'AVG_LATENCY'
    | 'P95_LATENCY'
    | 'P99_LATENCY'
    | 'ERROR_COUNT'
    | 'SIZE'
    | 'ITEM_COUNT'
    | 'MEMORY_USAGE'
    | 'EVICTION_COUNT'
    | 'EXPIRATION_COUNT'
  )[];
  /** Export metrics */
  exportMetrics: boolean;
  /** Metrics export format */
  exportFormat: 'PROMETHEUS' | 'STATSD' | 'JSON' | 'CSV';
}

export const DEFAULT_CACHE_METRICS_COLLECTION: CacheMetricsCollectionSettings = {
  enableCollection: true,
  collectionIntervalSeconds: 60,
  metrics: ['HIT_COUNT', 'MISS_COUNT', 'HIT_RATE', 'MISS_RATE', 'AVG_LATENCY', 'ERROR_COUNT'],
  exportMetrics: false,
  exportFormat: 'JSON',
};

/**
 * Cache hit/miss thresholds
 */
export interface CacheHitMissThresholds {
  /** Optimal hit rate */
  optimalHitRate: number;
  /** Critical hit rate */
  criticalHitRate: number;
  /** Optimal miss rate */
  optimalMissRate: number;
  /** Critical miss rate */
  criticalMissRate: number;
}

export const DEFAULT_CACHE_HIT_MISS_THRESHOLDS: CacheHitMissThresholds = {
  optimalHitRate: 90,
  criticalHitRate: 70,
  optimalMissRate: 10,
  criticalMissRate: 30,
};

/**
 * Cache penetration settings
 */
export interface CachePenetrationSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** Empty value TTL in seconds */
  emptyValueTTLSeconds: number;
  /** Max empty values per key */
  maxEmptyValuesPerKey: number;
  /** Empty value cooldown in seconds */
  emptyValueCooldownSeconds: number;
}

export const DEFAULT_CACHE_PENETRATION_SETTINGS: CachePenetrationSettings = {
  enableProtection: true,
  emptyValueTTLSeconds: 60,
  maxEmptyValuesPerKey: 10,
  emptyValueCooldownSeconds: 300,
};

/**
 * Cache avalanche settings
 */
export interface CacheAvalancheSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** TTL jitter in seconds */
  ttlJitterSeconds: number;
  /** TTL jitter percentage */
  ttlJitterPercentage: number;
  /** Random TTL range in seconds */
  randomTTLRangeSeconds: number;
}

export const DEFAULT_CACHE_AVALANCHE_SETTINGS: CacheAvalancheSettings = {
  enableProtection: true,
  ttlJitterSeconds: 300,
  ttlJitterPercentage: 10,
  randomTTLRangeSeconds: 600,
};

/**
 * Cache breakdown settings
 */
export interface CacheBreakdownSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** Mutex timeout in seconds */
  mutexTimeoutSeconds: number;
  /** Mutex retry delay in milliseconds */
  mutexRetryDelayMs: number;
  /** Max mutex retries */
  maxMutexRetries: number;
}

export const DEFAULT_CACHE_BREAKDOWN_SETTINGS: CacheBreakdownSettings = {
  enableProtection: true,
  mutexTimeoutSeconds: 5,
  mutexRetryDelayMs: 100,
  maxMutexRetries: 3,
};

/**
 * Cache constants
 */
export const CACHE_CONSTANTS = {
  /** Default max size */
  DEFAULT_MAX_SIZE: 1000,
  /** Default TTL in seconds */
  DEFAULT_TTL_SECONDS: 3600,
  /** Default partition count */
  DEFAULT_PARTITION_COUNT: 1,
  /** Default replica count */
  DEFAULT_REPLICA_COUNT: 1,
  /** Default cluster size */
  DEFAULT_CLUSTER_SIZE: 1,
  /** Default metrics retention in seconds */
  DEFAULT_METRICS_RETENTION: 3600,
  /** Default collection interval in seconds */
  DEFAULT_COLLECTION_INTERVAL: 60,
  /** Default optimal hit rate */
  DEFAULT_OPTIMAL_HIT_RATE: 90,
  /** Default critical hit rate */
  DEFAULT_CRITICAL_HIT_RATE: 70,
  /** Default empty value TTL in seconds */
  DEFAULT_EMPTY_VALUE_TTL: 60,
  /** Default TTL jitter in seconds */
  DEFAULT_TTL_JITTER: 300,
  /** Default mutex timeout in seconds */
  DEFAULT_MUTEX_TIMEOUT: 5,
} as const;

/**
 * Get cache storage type label
 */
export function getCacheStorageTypeLabel(type: CacheStorageType): string {
  const labels: Record<CacheStorageType, string> = {
    [CacheStorageType.MEMORY]: 'Memory',
    [CacheStorageType.REDIS]: 'Redis',
    [CacheStorageType.MEMCACHED]: 'Memcached',
    [CacheStorageType.FILE]: 'File System',
    [CacheStorageType.DATABASE]: 'Database',
    [CacheStorageType.MULTI_LEVEL]: 'Multi-Level',
  };
  return labels[type] || type;
}

/**
 * Get cache eviction strategy label
 */
export function getCacheEvictionStrategyLabel(strategy: CacheEvictionStrategy): string {
  const labels: Record<CacheEvictionStrategy, string> = {
    [CacheEvictionStrategy.LRU]: 'LRU',
    [CacheEvictionStrategy.LFU]: 'LFU',
    [CacheEvictionStrategy.FIFO]: 'FIFO',
    [CacheEvictionStrategy.TTL]: 'TTL',
    [CacheEvictionStrategy.RANDOM]: 'Random',
    [CacheEvictionStrategy.MRU]: 'MRU',
  };
  return labels[strategy] || strategy;
}

/**
 * Get cache refresh policy label
 */
export function getCacheRefreshPolicyLabel(policy: CacheRefreshPolicy): string {
  const labels: Record<CacheRefreshPolicy, string> = {
    [CacheRefreshPolicy.NEVER]: 'Never',
    [CacheRefreshPolicy.ON_READ]: 'On Read',
    [CacheRefreshPolicy.ON_WRITE]: 'On Write',
    [CacheRefreshPolicy.PERIODIC]: 'Periodic',
    [CacheRefreshPolicy.ON_EXPIRY]: 'On Expiry',
    [CacheRefreshPolicy.ON_DEMAND]: 'On Demand',
    [CacheRefreshPolicy.ASYNC]: 'Async',
  };
  return labels[policy] || policy;
}

/**
 * Get cache read strategy label
 */
export function getCacheReadStrategyLabel(strategy: CacheReadStrategy): string {
  const labels: Record<CacheReadStrategy, string> = {
    [CacheReadStrategy.CACHE_THEN_DB]: 'Cache Then DB',
    [CacheReadStrategy.DB_THEN_CACHE]: 'DB Then Cache',
    [CacheReadStrategy.CACHE_ONLY]: 'Cache Only',
    [CacheReadStrategy.DB_ONLY]: 'DB Only',
    [CacheReadStrategy.BOTH_COMPARE]: 'Both Compare',
    [CacheReadStrategy.NEAREST]: 'Nearest',
  };
  return labels[strategy] || strategy;
}

/**
 * Get cache write strategy label
 */
export function getCacheWriteStrategyLabel(strategy: CacheWriteStrategy): string {
  const labels: Record<CacheWriteStrategy, string> = {
    [CacheWriteStrategy.CACHE_THEN_DB]: 'Cache Then DB',
    [CacheWriteStrategy.DB_THEN_CACHE]: 'DB Then Cache',
    [CacheWriteStrategy.CACHE_ONLY]: 'Cache Only',
    [CacheWriteStrategy.DB_ONLY]: 'DB Only',
    [CacheWriteStrategy.WRITE_BOTH]: 'Write Both',
    [CacheWriteStrategy.NEAREST]: 'Nearest',
    [CacheWriteStrategy.WRITE_THROUGH]: 'Write Through',
    [CacheWriteStrategy.WRITE_BEHIND]: 'Write Behind',
  };
  return labels[strategy] || strategy;
}

/**
 * Get TTL preset label
 */
export function getTTLPresetLabel(preset: keyof typeof CACHE_TTL_PRESETS): string {
  const labels: Record<keyof typeof CACHE_TTL_PRESETS, string> = {
    VERY_SHORT: 'Very Short (1m)',
    SHORT: 'Short (5m)',
    MEDIUM: 'Medium (15m)',
    LONG: 'Long (1h)',
    VERY_LONG: 'Very Long (6h)',
    DAY: 'Day (24h)',
    WEEK: 'Week (7d)',
    MONTH: 'Month (30d)',
    YEAR: 'Year (365d)',
    FOREVER: 'Forever',
  };
  return labels[preset] || preset;
}

/**
 * Get TTL value from preset
 */
export function getTTLFromPreset(preset: keyof typeof CACHE_TTL_PRESETS): number {
  return CACHE_TTL_PRESETS[preset];
}

/**
 * Build cache key with prefix
 */
export function buildCacheKey(prefix: keyof typeof CACHE_KEY_PREFIXES, key: string): string {
  return `${CACHE_KEY_PREFIXES[prefix]}${key}`;
}

/**
 * Build cache key from parts
 */
export function buildCacheKeyFromParts(
  prefix: keyof typeof CACHE_KEY_PREFIXES,
  ...parts: string[]
): string {
  return `${CACHE_KEY_PREFIXES[prefix]}${parts.join(':')}`;
}
