/**
 * @fileoverview Cache constants and configurations
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
  /** File-based cache */
  FILE = 'FILE',
  /** Database cache */
  DATABASE = 'DATABASE',
  /** LocalStorage cache (browser) */
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  /** SessionStorage cache (browser) */
  SESSION_STORAGE = 'SESSION_STORAGE',
  /** Custom cache */
  CUSTOM = 'CUSTOM',
}

/**
 * Cache eviction strategies
 */
export enum CacheEvictionStrategy {
  /** Time To Live based eviction */
  TTL_BASED = 'TTL_BASED',
  /** Least Recently Used eviction */
  LRU = 'LRU',
  /** Least Frequently Used eviction */
  LFU = 'LFU',
  /** First In First Out eviction */
  FIFO = 'FIFO',
  /** Random eviction */
  RANDOM = 'RANDOM',
  /** Size-based eviction */
  SIZE_BASED = 'SIZE_BASED',
  /** Custom eviction */
  CUSTOM = 'CUSTOM',
}

/**
 * Cache refresh policies
 */
export enum CacheRefreshPolicy {
  /** Lazy refresh - refresh on access */
  LAZY = 'LAZY',
  /** Eager refresh - refresh proactively */
  EAGER = 'EAGER',
  /** Scheduled refresh - refresh on schedule */
  SCHEDULED = 'SCHEDULED',
  /** On-demand refresh - refresh on demand */
  ON_DEMAND = 'ON_DEMAND',
  /** Hybrid refresh - combination of strategies */
  HYBRID = 'HYBRID',
}

/**
 * Cache read strategies
 */
export enum CacheReadStrategy {
  /** Cache-Aside (Lazy Loading) */
  CACHE_ASIDE = 'CACHE_ASIDE',
  /** Read-Through */
  READ_THROUGH = 'READ_THROUGH',
  /** Write-Through */
  WRITE_THROUGH = 'WRITE_THROUGH',
  /** Write-Behind (Write-Back) */
  WRITE_BEHIND = 'WRITE_BEHIND',
  /** Refresh-Ahead */
  REFRESH_AHEAD = 'REFRESH_AHEAD',
}

/**
 * Cache write strategies
 */
export enum CacheWriteStrategy {
  /** Write-Through */
  WRITE_THROUGH = 'WRITE_THROUGH',
  /** Write-Behind (Write-Back) */
  WRITE_BEHIND = 'WRITE_BEHIND',
  /** Write-Around */
  WRITE_AROUND = 'WRITE_AROUND',
  /** Write-Only */
  WRITE_ONLY = 'WRITE_ONLY',
  /** Cache-Aside Write */
  CACHE_ASIDE_WRITE = 'CACHE_ASIDE_WRITE',
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Storage type */
  storage: CacheStorageType;
  /** Max size in MB */
  maxSizeMB: number;
  /** Default TTL in seconds */
  defaultTTLSeconds: number;
  /** Eviction strategy */
  evictionStrategy: CacheEvictionStrategy;
  /** Refresh policy */
  refreshPolicy: CacheRefreshPolicy;
  /** Read strategy */
  readStrategy: CacheReadStrategy;
  /** Write strategy */
  writeStrategy: CacheWriteStrategy;
  /** Enable compression */
  enableCompression: boolean;
  /** Enable encryption */
  enableEncryption: boolean;
  /** Enable monitoring */
  enableMonitoring: boolean;
}

/**
 * Default cache configuration
 */
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  storage: CacheStorageType.MEMORY,
  maxSizeMB: 1024,
  defaultTTLSeconds: 300, // 5 minutes
  evictionStrategy: CacheEvictionStrategy.LRU,
  refreshPolicy: CacheRefreshPolicy.LAZY,
  readStrategy: CacheReadStrategy.CACHE_ASIDE,
  writeStrategy: CacheWriteStrategy.WRITE_THROUGH,
  enableCompression: true,
  enableEncryption: false,
  enableMonitoring: true,
};

/**
 * Cache TTL presets in seconds
 */
export const CACHE_TTL_PRESETS = {
  /** 1 second */
  ONE_SECOND: 1,
  /** 5 seconds */
  FIVE_SECONDS: 5,
  /** 10 seconds */
  TEN_SECONDS: 10,
  /** 30 seconds */
  THIRTY_SECONDS: 30,
  /** 1 minute */
  ONE_MINUTE: 60,
  /** 5 minutes */
  FIVE_MINUTES: 300,
  /** 10 minutes */
  TEN_MINUTES: 600,
  /** 15 minutes */
  FIFTEEN_MINUTES: 900,
  /** 30 minutes */
  THIRTY_MINUTES: 1800,
  /** 1 hour */
  ONE_HOUR: 3600,
  /** 6 hours */
  SIX_HOURS: 21600,
  /** 12 hours */
  TWELVE_HOURS: 43200,
  /** 24 hours (1 day) */
  ONE_DAY: 86400,
  /** 7 days (1 week) */
  ONE_WEEK: 604800,
  /** 30 days (1 month) */
  ONE_MONTH: 2592000,
  /** 365 days (1 year) */
  ONE_YEAR: 31536000,
} as const;

/**
 * Cache key prefixes
 */
export const CACHE_KEY_PREFIXES = {
  /** User cache prefix */
  USER: 'user:',
  /** Session cache prefix */
  SESSION: 'session:',
  /** Report cache prefix */
  REPORT: 'report:',
  /** Dashboard cache prefix */
  DASHBOARD: 'dashboard:',
  /** Widget cache prefix */
  WIDGET: 'widget:',
  /** Filter cache prefix */
  FILTER: 'filter:',
  /** Export cache prefix */
  EXPORT: 'export:',
  /** Template cache prefix */
  TEMPLATE: 'template:',
  /** Settings cache prefix */
  SETTINGS: 'settings:',
  /** Config cache prefix */
  CONFIG: 'config:',
  /** Data cache prefix */
  DATA: 'data:',
  /** API cache prefix */
  API: 'api:',
  /** Auth cache prefix */
  AUTH: 'auth:',
  /** Cache prefix for lists */
  LIST: 'list:',
  /** Cache prefix for single items */
  ITEM: 'item:',
  /** Cache prefix for search results */
  SEARCH: 'search:',
  /** Cache prefix for aggregation results */
  AGGREGATION: 'agg:',
} as const;

/**
 * Cache partition settings
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
  /** Read preference */
  readPreference: 'PRIMARY' | 'SECONDARY' | 'NEAREST';
}

export const DEFAULT_CACHE_REPLICATION_SETTINGS: CacheReplicationSettings = {
  enableReplication: false,
  replicaCount: 1,
  replicationFactor: 1,
  syncStrategy: 'ASYNC',
  readPreference: 'PRIMARY',
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
  strategy: 'STANDALONE' | 'SENTINEL' | 'CLUSTER';
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
  /** Collect latency */
  collectLatency: boolean;
  /** Collect size */
  collectSize: boolean;
  /** Collect eviction count */
  collectEvictionCount: boolean;
  /** Metrics retention in seconds */
  metricsRetentionSeconds: number;
}

export const DEFAULT_CACHE_MONITORING_SETTINGS: CacheMonitoringSettings = {
  enableMonitoring: true,
  collectMetrics: true,
  collectHitRate: true,
  collectLatency: true,
  collectSize: true,
  collectEvictionCount: true,
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
  /** Eviction rate threshold (per minute) */
  evictionRateThreshold: number;
  /** Memory usage threshold (percentage) */
  memoryUsageThreshold: number;
  /** Error rate threshold (percentage) */
  errorRateThreshold: number;
}

export const DEFAULT_CACHE_ALERT_THRESHOLDS: CacheAlertThresholds = {
  hitRateThreshold: 80,
  missRateThreshold: 20,
  latencyThresholdMs: 100,
  evictionRateThreshold: 10,
  memoryUsageThreshold: 80,
  errorRateThreshold: 5,
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
    | 'GET_COUNT'
    | 'SET_COUNT'
    | 'DELETE_COUNT'
    | 'EVICTION_COUNT'
    | 'HIT_RATE'
    | 'MISS_RATE'
    | 'AVG_LATENCY'
    | 'MAX_LATENCY'
    | 'MIN_LATENCY'
    | 'CURRENT_SIZE'
    | 'MAX_SIZE'
    | 'USAGE_PERCENTAGE'
    | 'ERROR_COUNT'
    | 'ERROR_RATE'
  )[];
  /** Export metrics */
  exportMetrics: boolean;
  /** Metrics export format */
  exportFormat: 'PROMETHEUS' | 'STATSD' | 'JSON' | 'CSV';
}

export const DEFAULT_CACHE_METRICS_COLLECTION: CacheMetricsCollectionSettings = {
  enableCollection: true,
  collectionIntervalSeconds: 60,
  metrics: ['HIT_RATE', 'MISS_RATE', 'AVG_LATENCY', 'USAGE_PERCENTAGE', 'ERROR_RATE'],
  exportMetrics: false,
  exportFormat: 'JSON',
};

/**
 * Cache hit/miss thresholds
 */
export interface CacheHitMissThresholds {
  /** Critical hit rate (below this is critical) */
  criticalHitRate: number;
  /** Warning hit rate (below this is warning) */
  warningHitRate: number;
  /** Critical miss rate (above this is critical) */
  criticalMissRate: number;
  /** Warning miss rate (above this is warning) */
  warningMissRate: number;
}

export const DEFAULT_CACHE_HIT_MISS_THRESHOLDS: CacheHitMissThresholds = {
  criticalHitRate: 50,
  warningHitRate: 70,
  criticalMissRate: 50,
  warningMissRate: 30,
};

/**
 * Cache penetration protection settings
 */
export interface CachePenetrationSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** Empty result TTL in seconds */
  emptyResultTTLSeconds: number;
  /** Bloom filter enabled */
  enableBloomFilter: boolean;
  /** Bloom filter size */
  bloomFilterSize: number;
  /** Bloom filter hash functions */
  bloomFilterHashFunctions: number;
}

export const DEFAULT_CACHE_PENETRATION_SETTINGS: CachePenetrationSettings = {
  enableProtection: true,
  emptyResultTTLSeconds: 60,
  enableBloomFilter: false,
  bloomFilterSize: 100000,
  bloomFilterHashFunctions: 3,
};

/**
 * Cache avalanche protection settings
 */
export interface CacheAvalancheSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** TTL jitter range in seconds */
  ttlJitterSeconds: number;
  /** Use random TTL */
  useRandomTTL: boolean;
  /** Random TTL range in seconds */
  randomTTLRangeSeconds: number;
}

export const DEFAULT_CACHE_AVALANCHE_SETTINGS: CacheAvalancheSettings = {
  enableProtection: true,
  ttlJitterSeconds: 30,
  useRandomTTL: false,
  randomTTLRangeSeconds: 60,
};

/**
 * Cache breakdown protection settings
 */
export interface CacheBreakdownSettings {
  /** Enable protection */
  enableProtection: boolean;
  /** Mutex timeout in seconds */
  mutexTimeoutSeconds: number;
  /** Use distributed lock */
  useDistributedLock: boolean;
  /** Lock timeout in seconds */
  lockTimeoutSeconds: number;
  /** Retry attempts */
  retryAttempts: number;
}

export const DEFAULT_CACHE_BREAKDOWN_SETTINGS: CacheBreakdownSettings = {
  enableProtection: true,
  mutexTimeoutSeconds: 5,
  useDistributedLock: true,
  lockTimeoutSeconds: 10,
  retryAttempts: 3,
};

/**
 * Cache constants
 */
export const CACHE_CONSTANTS = {
  /** Default TTL in seconds */
  DEFAULT_TTL_SECONDS: 300,
  /** Default max size in MB */
  DEFAULT_MAX_SIZE_MB: 1024,
  /** Default eviction strategy */
  DEFAULT_EVICTION_STRATEGY: CacheEvictionStrategy.LRU,
  /** Default refresh policy */
  DEFAULT_REFRESH_POLICY: CacheRefreshPolicy.LAZY,
  /** Default read strategy */
  DEFAULT_READ_STRATEGY: CacheReadStrategy.CACHE_ASIDE,
  /** Default write strategy */
  DEFAULT_WRITE_STRATEGY: CacheWriteStrategy.WRITE_THROUGH,
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
  /** Default hit rate threshold */
  DEFAULT_HIT_RATE_THRESHOLD: 80,
  /** Default miss rate threshold */
  DEFAULT_MISS_RATE_THRESHOLD: 20,
  /** Default latency threshold in milliseconds */
  DEFAULT_LATENCY_THRESHOLD_MS: 100,
} as const;

/**
 * Get cache storage type label
 */
export function getCacheStorageTypeLabel(type: CacheStorageType): string {
  const labels: Record<CacheStorageType, string> = {
    [CacheStorageType.MEMORY]: 'Memory',
    [CacheStorageType.REDIS]: 'Redis',
    [CacheStorageType.MEMCACHED]: 'Memcached',
    [CacheStorageType.FILE]: 'File',
    [CacheStorageType.DATABASE]: 'Database',
    [CacheStorageType.LOCAL_STORAGE]: 'Local Storage',
    [CacheStorageType.SESSION_STORAGE]: 'Session Storage',
    [CacheStorageType.CUSTOM]: 'Custom',
  };
  return labels[type] || type;
}

/**
 * Get cache eviction strategy label
 */
export function getCacheEvictionStrategyLabel(strategy: CacheEvictionStrategy): string {
  const labels: Record<CacheEvictionStrategy, string> = {
    [CacheEvictionStrategy.TTL_BASED]: 'TTL Based',
    [CacheEvictionStrategy.LRU]: 'Least Recently Used (LRU)',
    [CacheEvictionStrategy.LFU]: 'Least Frequently Used (LFU)',
    [CacheEvictionStrategy.FIFO]: 'First In First Out (FIFO)',
    [CacheEvictionStrategy.RANDOM]: 'Random',
    [CacheEvictionStrategy.SIZE_BASED]: 'Size Based',
    [CacheEvictionStrategy.CUSTOM]: 'Custom',
  };
  return labels[strategy] || strategy;
}

/**
 * Get cache refresh policy label
 */
export function getCacheRefreshPolicyLabel(policy: CacheRefreshPolicy): string {
  const labels: Record<CacheRefreshPolicy, string> = {
    [CacheRefreshPolicy.LAZY]: 'Lazy',
    [CacheRefreshPolicy.EAGER]: 'Eager',
    [CacheRefreshPolicy.SCHEDULED]: 'Scheduled',
    [CacheRefreshPolicy.ON_DEMAND]: 'On-Demand',
    [CacheRefreshPolicy.HYBRID]: 'Hybrid',
  };
  return labels[policy] || policy;
}

/**
 * Get cache read strategy label
 */
export function getCacheReadStrategyLabel(strategy: CacheReadStrategy): string {
  const labels: Record<CacheReadStrategy, string> = {
    [CacheReadStrategy.CACHE_ASIDE]: 'Cache-Aside',
    [CacheReadStrategy.READ_THROUGH]: 'Read-Through',
    [CacheReadStrategy.WRITE_THROUGH]: 'Write-Through',
    [CacheReadStrategy.WRITE_BEHIND]: 'Write-Behind',
    [CacheReadStrategy.REFRESH_AHEAD]: 'Refresh-Ahead',
  };
  return labels[strategy] || strategy;
}

/**
 * Get cache write strategy label
 */
export function getCacheWriteStrategyLabel(strategy: CacheWriteStrategy): string {
  const labels: Record<CacheWriteStrategy, string> = {
    [CacheWriteStrategy.WRITE_THROUGH]: 'Write-Through',
    [CacheWriteStrategy.WRITE_BEHIND]: 'Write-Behind',
    [CacheWriteStrategy.WRITE_AROUND]: 'Write-Around',
    [CacheWriteStrategy.WRITE_ONLY]: 'Write-Only',
    [CacheWriteStrategy.CACHE_ASIDE_WRITE]: 'Cache-Aside Write',
  };
  return labels[strategy] || strategy;
}

/**
 * Get TTL preset label
 */
export function getTTLPresetLabel(preset: keyof typeof CACHE_TTL_PRESETS): string {
  const seconds = CACHE_TTL_PRESETS[preset];
  const labels: Record<string, string> = {
    ONE_SECOND: '1 Second',
    FIVE_SECONDS: '5 Seconds',
    TEN_SECONDS: '10 Seconds',
    THIRTY_SECONDS: '30 Seconds',
    ONE_MINUTE: '1 Minute',
    FIVE_MINUTES: '5 Minutes',
    TEN_MINUTES: '10 Minutes',
    FIFTEEN_MINUTES: '15 Minutes',
    THIRTY_MINUTES: '30 Minutes',
    ONE_HOUR: '1 Hour',
    SIX_HOURS: '6 Hours',
    TWELVE_HOURS: '12 Hours',
    ONE_DAY: '1 Day',
    ONE_WEEK: '1 Week',
    ONE_MONTH: '1 Month',
    ONE_YEAR: '1 Year',
  };
  return labels[preset] || `${seconds}s`;
}

/**
 * Get TTL in seconds from preset
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
 * Build cache key with multiple parts
 */
export function buildCacheKeyFromParts(
  prefix: keyof typeof CACHE_KEY_PREFIXES,
  ...parts: string[]
): string {
  return `${CACHE_KEY_PREFIXES[prefix]}${parts.join(':')}`;
}
