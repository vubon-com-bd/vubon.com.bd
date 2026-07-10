/**
 * Cache Types - Enterprise Grade Type Contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/cache.types
 * 
 * @description
 * Type definitions for caching operations with enterprise features.
 * Supports multi-tier caching, distributed caching, and Bangladesh-specific optimizations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multi-tier caching (L1 memory, L2 Redis, L3 distributed)
 * ✅ Cache warming and preloading strategies
 * ✅ Stale-while-revalidate pattern
 * ✅ Cache stampede protection
 * ✅ Adaptive TTL based on network type (Bangladesh specific)
 * ✅ Compression for low-bandwidth (2G/3G networks)
 * ✅ Distributed locking for cache updates
 * ✅ Cache invalidation patterns with dependency tracking
 * ✅ Bulk operations with progress tracking
 * ✅ Cache health monitoring and metrics
 * ✅ Bangladesh specific - Network-aware caching (2G/3G/4G/5G/WiFi)
 * 
 * @example
 * const cacheOptions: CacheOptions = {
 *   ttl: 3600,
 *   namespace: 'user',
 *   networkType: '4g',
 *   compression: true,
 *   staleWhileRevalidate: true
 * };
 */

// ============================================================
// Network Type (Bangladesh specific)
// ============================================================

/**
 * Network type for adaptive caching (Bangladesh specific)
 */
export type NetworkType = 
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'mobile_unknown'
  | 'wifi'
  | 'wifi_public'
  | 'ethernet'
  | 'vpn'
  | 'proxy'
  | 'tor'
  | 'unknown';

// ============================================================
// Base Cache Types
// ============================================================

/**
 * Cache operation status
 */
export type CacheStatus = 'hit' | 'miss' | 'stale' | 'error' | 'bypass';

/**
 * Cache operation type
 */
export type CacheOperation = 'get' | 'set' | 'delete' | 'clear' | 'invalidate' | 'warm' | 'stats';

/**
 * Cache key type (string or array for hierarchical keys)
 */
export type CacheKey = string | readonly string[];

/**
 * Cache storage tier
 */
export type CacheTier = 
  | 'memory'         // In-memory (fastest, smallest)
  | 'local'          // Local disk
  | 'distributed'    // Distributed cache (Redis, Memcached)
  | 'persistent'     // Persistent storage (database)
  | 'cdn';           // CDN cache

/**
 * Cache eviction policy
 */
export type EvictionPolicy = 'lru' | 'lfu' | 'fifo' | 'ttl' | 'manual';

/**
 * Cache invalidation strategy
 */
export type InvalidationStrategy = 
  | 'immediate'      // Invalidate immediately
  | 'deferred'       // Invalidate after a delay
  | 'soft'           // Mark as stale but serve stale data
  | 'scheduled'      // Invalidate on a schedule
  | 'versioned';     // Use version-based invalidation

/**
 * Cache warming strategy
 */
export type WarmingStrategy = 'eager' | 'lazy' | 'scheduled' | 'predictive';

/**
 * Cache compression level
 */
export type CompressionLevel = 'none' | 'low' | 'medium' | 'high';

/**
 * Compression strategy
 */
export type CompressionStrategy = 'gzip' | 'deflate' | 'brotli' | 'zstd' | 'none';

/**
 * Cache namespace
 */
export type CacheNamespace = string;

/**
 * Cache tag
 */
export type CacheTag = string;

/**
 * Cache version
 */
export type CacheVersion = string;

// ============================================================
// Cache Policy Types
// ============================================================

/**
 * Cache policy (for multi-tier caching)
 */
export interface CachePolicy {
  /** Policy name */
  name: string;
  /** Eviction policy */
  eviction: EvictionPolicy;
  /** Maximum entries */
  maxEntries?: number;
  /** Maximum memory usage (bytes) */
  maxMemoryBytes?: number;
  /** Default TTL (seconds) */
  defaultTtl?: number;
  /** Whether to use compression */
  compression?: boolean;
  /** Whether to use stale-while-revalidate */
  staleWhileRevalidate?: boolean;
}

/**
 * Cache eviction policy configuration
 */
export interface CacheEvictionPolicy {
  /** Policy type */
  type: EvictionPolicy;
  /** Maximum entries before eviction */
  maxEntries: number;
  /** Maximum memory before eviction (bytes) */
  maxMemoryBytes?: number;
  /** Eviction batch size */
  batchSize?: number;
  /** Whether to evict expired entries first */
  evictExpiredFirst?: boolean;
}

/**
 * Cache warming policy configuration
 */
export interface CacheWarmingPolicy {
  /** Warming strategy */
  strategy: WarmingStrategy;
  /** Keys to warm eagerly */
  eagerKeys?: readonly string[];
  /** Schedule for scheduled warming (cron expression) */
  schedule?: string;
  /** Maximum number of keys to warm in one batch */
  batchSize?: number;
  /** Whether to warm in parallel */
  parallel?: boolean;
  /** TTL to use for warmed entries (seconds) */
  ttl?: number;
}

/**
 * Cache invalidation policy configuration
 */
export interface CacheInvalidationPolicy {
  /** Invalidation strategy */
  strategy: InvalidationStrategy;
  /** Delay in seconds (for deferred invalidation) */
  delaySeconds?: number;
  /** Whether to cascade invalidation to dependent keys */
  cascade?: boolean;
  /** Whether to invalidate all tags */
  invalidateAll?: boolean;
}

/**
 * Cache tier configuration
 */
export interface CacheTierConfig {
  /** Tier name */
  name: CacheTier;
  /** Whether tier is enabled */
  enabled: boolean;
  /** Maximum entries */
  maxEntries: number;
  /** Maximum memory usage (bytes) */
  maxMemoryBytes: number;
  /** Default TTL (seconds) */
  defaultTtl: number;
  /** Read priority (1 = highest) */
  readPriority: number;
  /** Write priority (1 = highest) */
  writePriority: number;
  /** Connection string or config */
  connection?: string | Record<string, unknown>;
  /** Whether to use compression */
  compression: boolean;
  /** Whether to use encryption */
  encryption: boolean;
}

/**
 * Cache configuration (service level)
 */
export interface CacheConfig {
  /** Whether caching is enabled */
  enabled: boolean;
  /** Default TTL (seconds) */
  defaultTtl: number;
  /** Maximum TTL allowed (seconds) */
  maxTtl: number;
  /** Minimum TTL allowed (seconds) */
  minTtl: number;
  /** Default cache namespace */
  defaultNamespace: string;
  /** Default cache tier */
  defaultTier: CacheTier;
  /** Default eviction policy */
  evictionPolicy: EvictionPolicy;
  /** Maximum number of entries per tier */
  maxEntriesPerTier: Partial<Record<CacheTier, number>>;
  /** Maximum memory usage per tier (bytes) */
  maxMemoryPerTier: Partial<Record<CacheTier, number>>;
  /** Whether to enable compression by default */
  compressionEnabled: boolean;
  /** Default compression level */
  compressionLevel: CompressionLevel;
  /** Whether to enable stale-while-revalidate by default */
  staleWhileRevalidateEnabled: boolean;
  /** Default stale-while-revalidate max age (seconds) */
  staleWhileRevalidateMaxAge: number;
  /** Whether to enable stampede protection by default */
  stampedeProtectionEnabled: boolean;
  /** Whether to enable metrics collection */
  metricsEnabled: boolean;
  /** Metrics collection interval (seconds) */
  metricsInterval: number;
  /** Whether to log cache operations */
  logOperations: boolean;
  /** Network-specific TTL multipliers (Bangladesh specific) */
  networkTtlMultipliers: Partial<Record<NetworkType, number>>;
  /** Whether to enable adaptive compression based on network */
  adaptiveNetworkCompression: boolean;
}

// ============================================================
// Cache Value with Metadata
// ============================================================

/**
 * Cache value with metadata
 */
export interface CacheEntry<T = unknown> {
  /** The cached value */
  value: T;
  /** When the entry was created */
  createdAt: Date;
  /** When the entry expires */
  expiresAt: Date;
  /** Time-to-live in seconds */
  ttl: number;
  /** Last access time */
  lastAccessedAt?: Date;
  /** Access count (for popularity-based eviction) */
  accessCount?: number;
  /** Cache version */
  version?: string;
  /** Tags for group invalidation */
  tags?: readonly string[];
  /** Whether this is a stale entry */
  isStale?: boolean;
  /** Network type when cached (Bangladesh specific) */
  networkType?: NetworkType;
  /** Whether the value is compressed */
  isCompressed?: boolean;
  /** Original size before compression (bytes) */
  originalSize?: number;
  /** Compressed size (bytes) */
  compressedSize?: number;
}

// ============================================================
// Cache Options Interfaces
// ============================================================

/**
 * Cache Options (Enterprise Enhanced)
 */
export interface CacheOptions {
  /** Cache namespace (for isolation) */
  namespace?: string;
  /** Time-to-live in seconds */
  ttl?: number;
  /** Cache key prefix */
  keyPrefix?: string;
  /** Tags for group operations */
  tags?: readonly string[];
  /** Whether to enable compression (Bangladesh specific) */
  compression?: boolean | CompressionLevel;
  /** Whether to use stale-while-revalidate */
  staleWhileRevalidate?: boolean;
  /** Network type for adaptive caching (Bangladesh specific) */
  networkType?: NetworkType;
  /** Whether to skip cache (force read from source) */
  skipCache?: boolean;
  /** Whether to update cache on read */
  updateOnRead?: boolean;
  /** Custom cache key separator */
  keySeparator?: string;
  /** Whether to wait for cache operation to complete */
  waitForCompletion?: boolean;
  /** Operation timeout in milliseconds */
  timeoutMs?: number;
  /** Retry count for failed operations */
  retryCount?: number;
  /** Retry delay in milliseconds */
  retryDelayMs?: number;
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  /** Whether to log cache operations (for debugging) */
  logOperations?: boolean;
}

/**
 * Cache Get Options
 */
export interface CacheGetOptions extends CacheOptions {
  /** Whether to return stale data if available */
  allowStale?: boolean;
  /** Whether to update access metadata */
  updateAccess?: boolean;
  /** Whether to read from any tier (vs. only specified tier) */
  readFromAnyTier?: boolean;
  /** Whether to track access for popularity */
  trackAccess?: boolean;
}

/**
 * Cache Set Options
 */
export interface CacheSetOptions extends CacheOptions {
  /** Whether to only set if key doesn't exist */
  onlyIfNotExists?: boolean;
  /** Whether to only set if key exists */
  onlyIfExists?: boolean;
  /** Whether to return the old value */
  returnOldValue?: boolean;
  /** Custom TTL for this specific set operation */
  ttl?: number;
}

/**
 * Cache Delete Options
 */
export interface CacheDeleteOptions extends CacheOptions {
  /** Whether to propagate deletion to all tiers */
  propagateToAllTiers?: boolean;
  /** Whether to wait for propagation to complete */
  waitForPropagation?: boolean;
  /** Whether to invalidate dependent keys */
  invalidateDependencies?: boolean;
  /** Whether to log deletion (for audit) */
  logDeletion?: boolean;
}

/**
 * Cache Invalidate Options
 */
export interface CacheInvalidateOptions extends CacheOptions {
  /** Invalidation strategy */
  strategy?: InvalidationStrategy;
  /** Delay in seconds (for deferred invalidation) */
  delaySeconds?: number;
  /** Whether to invalidate all tags */
  invalidateAll?: boolean;
  /** Whether to cascade invalidation to dependent keys */
  cascade?: boolean;
}

/**
 * Cache Clear Options
 */
export interface CacheClearOptions extends CacheOptions {
  /** Whether to clear all tiers */
  clearAllTiers?: boolean;
  /** Whether to clear only expired entries */
  onlyExpired?: boolean;
  /** Whether to clear only stale entries */
  onlyStale?: boolean;
  /** Whether to clear matching pattern */
  pattern?: string;
  /** Whether to wait for clear to complete */
  waitForCompletion?: boolean;
}

/**
 * Cache Bulk Get Options
 */
export interface CacheBulkGetOptions extends CacheOptions {
  /** Whether to continue on error */
  continueOnError?: boolean;
  /** Whether to return keys in the same order */
  preserveOrder?: boolean;
  /** Whether to include missing keys in result */
  includeMissing?: boolean;
  /** Maximum number of keys to fetch in parallel */
  parallelLimit?: number;
}

// ============================================================
// Cache Read/Write Strategies
// ============================================================

/**
 * Cache read-through strategy
 */
export interface ReadThroughStrategy<T = unknown> {
  /** Function to load data on cache miss */
  loader: (key: string) => Promise<T>;
  /** Optional timeout for loader (seconds) */
  loaderTimeout?: number;
  /** Whether to cache the loaded result */
  cacheResult?: boolean;
}

/**
 * Cache write-through strategy
 */
export interface WriteThroughStrategy<T = unknown> {
  /** Function to write data to source */
  writer: (key: string, value: T) => Promise<void>;
  /** Whether to wait for write to complete */
  waitForWrite?: boolean;
  /** Write timeout (seconds) */
  writeTimeout?: number;
}

// ============================================================
// Cache Stale-While-Revalidate & Stampede Protection
// ============================================================

/**
 * Cache stale-while-revalidate configuration
 */
export interface StaleWhileRevalidateConfig {
  /** Whether to enable stale-while-revalidate */
  enabled: boolean;
  /** Maximum age of stale data to serve (seconds) */
  maxStaleAge?: number;
  /** Number of concurrent revalidation requests allowed */
  maxConcurrentRevalidations?: number;
  /** Cooldown between revalidation attempts (seconds) */
  revalidationCooldown?: number;
}

/**
 * Cache stampede protection configuration
 */
export interface StampedeProtectionConfig {
  /** Whether to enable stampede protection */
  enabled: boolean;
  /** Lock TTL for stampede protection (seconds) */
  lockTtl?: number;
  /** Number of retries for acquiring lock */
  retryCount?: number;
  /** Retry delay (milliseconds) */
  retryDelayMs?: number;
}

// ============================================================
// Cache Warming & Compression
// ============================================================

/**
 * Cache warming configuration
 */
export interface CacheWarmingConfig {
  /** Warming strategy */
  strategy: WarmingStrategy;
  /** Keys to warm eagerly */
  eagerKeys?: readonly string[];
  /** Schedule for scheduled warming (cron expression) */
  schedule?: string;
  /** Maximum number of keys to warm in one batch */
  batchSize?: number;
  /** Whether to warm in parallel */
  parallel?: boolean;
}

/**
 * Cache compression configuration
 */
export interface CacheCompressionConfig {
  /** Compression level */
  level: CompressionLevel;
  /** Minimum size to compress (bytes) */
  minSizeBytes?: number;
  /** Whether to compress based on network type (Bangladesh specific) */
  adaptiveNetworkCompression?: boolean;
  /** Network types that should always use compression */
  compressOnNetworks?: readonly NetworkType[];
}

/**
 * Network-aware cache options (Bangladesh specific)
 */
export interface NetworkAwareCacheOptions extends CacheOptions {
  /** Network type for adaptive caching */
  networkType: NetworkType;
  /** Whether to use network-adaptive TTL */
  adaptiveTtl?: boolean;
  /** Whether to use network-adaptive compression */
  adaptiveCompression?: boolean;
  /** Whether to use network-adaptive stale-while-revalidate */
  adaptiveStaleWhileRevalidate?: boolean;
}

/**
 * Adaptive cache configuration (Bangladesh specific)
 */
export interface AdaptiveCacheConfig {
  /** TTL multiplier by network type */
  ttlMultipliers: Partial<Record<NetworkType, number>>;
  /** Compression levels by network type */
  compressionLevels: Partial<Record<NetworkType, CompressionLevel>>;
  /** Stale-while-revalidate enabled by network type */
  staleWhileRevalidateEnabled: Partial<Record<NetworkType, boolean>>;
  /** Cache enabled by network type */
  cacheEnabled: Partial<Record<NetworkType, boolean>>;
}

// ============================================================
// Cache Metrics & Statistics
// ============================================================

/**
 * Cache metrics configuration
 */
export interface CacheMetricsConfig {
  /** Whether to collect metrics */
  enabled: boolean;
  /** Whether to track hit/miss rates */
  trackHitRate?: boolean;
  /** Whether to track latency */
  trackLatency?: boolean;
  /** Whether to track memory usage */
  trackMemoryUsage?: boolean;
  /** Metrics collection interval (seconds) */
  collectionInterval?: number;
}

/**
 * Cache Statistics (Enterprise Enhanced)
 */
export interface CacheStatistics {
  /** Total number of cache entries */
  totalEntries: number;
  /** Number of entries by tier */
  entriesByTier: Partial<Record<CacheTier, number>>;
  /** Total memory usage (bytes) */
  totalMemoryBytes: number;
  /** Memory usage by tier (bytes) */
  memoryByTier: Partial<Record<CacheTier, number>>;
  /** Cache hit count */
  hits: number;
  /** Cache miss count */
  misses: number;
  /** Cache error count */
  errors: number;
  /** Cache hit rate (0-1) */
  hitRate: number;
  /** Average operation latency (milliseconds) */
  averageLatencyMs: number;
  /** P95 latency (milliseconds) */
  p95LatencyMs: number;
  /** P99 latency (milliseconds) */
  p99LatencyMs: number;
  /** Number of stale entries */
  staleEntries: number;
  /** Number of expired entries */
  expiredEntries: number;
  /** Number of evicted entries (since startup) */
  evictedCount: number;
  /** Eviction policy used */
  evictionPolicy: EvictionPolicy;
  /** Network type breakdown (Bangladesh specific) */
  networkTypeBreakdown: Partial<Record<NetworkType, number>>;
  /** Average TTL by network type (seconds) */
  avgTtlByNetwork: Partial<Record<NetworkType, number>>;
  /** Compression ratio (0-1) */
  compressionRatio: number;
  /** Total compressed bytes saved */
  totalCompressedBytes: number;
  /** Uptime of cache (seconds) */
  uptime: number;
  /** Timestamp of statistics collection */
  collectedAt: Date;
  /** Whether caching is healthy */
  isHealthy: boolean;
  /** Health check errors (if any) */
  healthErrors?: readonly string[];
}

// ============================================================
// Cache Health & Performance
// ============================================================

/**
 * Cache health status
 */
export interface CacheHealthStatus {
  /** Overall health status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Whether cache is reachable */
  reachable: boolean;
  /** Response time in milliseconds */
  responseTimeMs: number;
  /** Error rate (0-1) */
  errorRate: number;
  /** Memory usage percentage (0-1) */
  memoryUsagePercent: number;
  /** Cache hit rate (0-1) */
  hitRate: number;
  /** Number of active connections */
  activeConnections: number;
  /** Maximum connections allowed */
  maxConnections: number;
  /** Last error timestamp */
  lastErrorAt?: Date;
  /** Last successful operation timestamp */
  lastSuccessAt?: Date;
  /** Additional health details */
  details?: Record<string, unknown>;
}

/**
 * Cache performance metrics
 */
export interface CachePerformanceMetrics {
  /** Average operation time (milliseconds) */
  averageTimeMs: number;
  /** Maximum operation time (milliseconds) */
  maxTimeMs: number;
  /** Minimum operation time (milliseconds) */
  minTimeMs: number;
  /** P50 latency (milliseconds) */
  p50LatencyMs: number;
  /** P95 latency (milliseconds) */
  p95LatencyMs: number;
  /** P99 latency (milliseconds) */
  p99LatencyMs: number;
  /** Operations per second */
  opsPerSecond: number;
  /** Throughput (bytes per second) */
  throughputBytesPerSecond: number;
  /** Number of concurrent operations */
  concurrentOps: number;
  /** Time window for metrics (seconds) */
  windowSeconds: number;
}

// ============================================================
// Cache Result Types
// ============================================================

/**
 * Cache operation result
 */
export interface CacheResult<T = unknown> {
  /** Whether the operation was successful */
  success: boolean;
  /** The value (if get operation) */
  value?: T;
  /** Cache status */
  status: CacheStatus;
  /** Error message (if any) */
  error?: string;
  /** Operation duration in milliseconds */
  durationMs?: number;
  /** Cache key used */
  key?: string;
  /** Cache tier used */
  tier?: CacheTier;
  /** Whether value was from stale data */
  fromStale?: boolean;
  /** Whether value was compressed */
  isCompressed?: boolean;
  /** Network type used for caching (Bangladesh specific) */
  networkType?: NetworkType;
  /** Correlation ID for tracing */
  correlationId?: string;
}

/**
 * Cache Set Result
 */
export interface CacheSetResult<T = unknown> {
  /** Whether the set was successful */
  success: boolean;
  /** The key that was set */
  key: string;
  /** The old value (if returned) */
  oldValue?: T;
  /** Error message (if any) */
  error?: string;
  /** Actual TTL used */
  ttlUsed?: number;
  /** Whether compression was applied */
  compressed?: boolean;
  /** Compressed size (bytes) */
  compressedSize?: number;
  /** Original size (bytes) */
  originalSize?: number;
}

/**
 * Cache Delete Result
 */
export interface CacheDeleteResult {
  /** Whether the delete was successful */
  success: boolean;
  /** Number of keys deleted */
  deletedCount: number;
  /** Keys that were deleted */
  deletedKeys?: readonly string[];
  /** Error message (if any) */
  error?: string;
  /** Whether deletion was propagated to all tiers */
  propagated?: boolean;
}

/**
 * Cache Clear Result
 */
export interface CacheClearResult {
  /** Whether the clear was successful */
  success: boolean;
  /** Number of keys cleared */
  clearedCount: number;
  /** Number of keys that failed to clear */
  failedCount: number;
  /** Error messages (if any) */
  errors?: readonly string[];
  /** Duration in milliseconds */
  durationMs: number;
}

/**
 * Cache Multi-Get Result
 */
export interface CacheMultiGetResult<T = unknown> {
  /** Map of key to value (successful gets) */
  values: Record<string, T>;
  /** Keys that were not found */
  missing: readonly string[];
  /** Keys that failed with error */
  failed: ReadonlyArray<{ key: string; error: string }>;
  /** Overall success rate (0-1) */
  successRate: number;
  /** Operation duration in milliseconds */
  durationMs: number;
  /** Cache status for each key */
  statuses: Record<string, CacheStatus>;
}

// ============================================================
// Cache Event Types
// ============================================================

/**
 * Cache event type
 */
export type CacheEventType = 
  | 'hit'
  | 'miss'
  | 'set'
  | 'delete'
  | 'clear'
  | 'expire'
  | 'evict'
  | 'stale'
  | 'error'
  | 'warning';

/**
 * Cache event
 */
export interface CacheEvent {
  /** Event type */
  type: CacheEventType;
  /** Cache key (if applicable) */
  key?: string;
  /** Cache tier */
  tier?: CacheTier;
  /** Timestamp of event */
  timestamp: Date;
  /** Duration in milliseconds */
  durationMs?: number;
  /** Error message (if error event) */
  error?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Correlation ID for distributed tracing */
  correlationId?: string;
}

// ============================================================
// Cache Dependency & Invalidation
// ============================================================

/**
 * Cache dependency (for invalidation cascading)
 */
export interface CacheDependency {
  /** Source key */
  sourceKey: string;
  /** Dependent keys */
  dependentKeys: readonly string[];
  /** Dependency type */
  type: 'hard' | 'soft' | 'version';
}

/**
 * Cache invalidation pattern (for bulk operations)
 */
export interface InvalidationPattern {
  /** Pattern to match */
  pattern: string;
  /** Invalidation strategy */
  strategy: InvalidationStrategy;
  /** Tags to apply */
  tags?: readonly string[];
  /** Whether to cascade */
  cascade?: boolean;
}

// ============================================================
// Cache Builder & Factory Types
// ============================================================

/**
 * Cache key builder function
 */
export type CacheKeyBuilder = (...args: unknown[]) => string;

/**
 * Cache value transformer
 */
export type CacheValueTransformer<TInput = unknown, TOutput = unknown> = (
  value: TInput
) => TOutput;

/**
 * Cache key validator
 */
export type CacheKeyValidator = (key: string) => boolean;

/**
 * Cache hook (for lifecycle events)
 */
export type CacheHook = (
  event: CacheEvent
) => void | Promise<void>;

/**
 * Cache interceptor (for cross-cutting concerns)
 */
export interface CacheInterceptor {
  /** Called before cache operation */
  before?: (operation: string, key: string, options?: CacheOptions) => void | Promise<void>;
  /** Called after cache operation */
  after?: (operation: string, key: string, result: CacheResult) => void | Promise<void>;
  /** Called on error */
  onError?: (operation: string, key: string, error: Error) => void | Promise<void>;
}

// ============================================================
// Cache Service Configuration
// ============================================================

/**
 * Cache service configuration (Enterprise)
 */
export interface CacheServiceConfig {
  /** Whether caching is enabled */
  enabled: boolean;
  /** Default TTL (seconds) */
  defaultTtl: number;
  /** Maximum TTL allowed (seconds) */
  maxTtl: number;
  /** Minimum TTL allowed (seconds) */
  minTtl: number;
  /** Default cache namespace */
  defaultNamespace: string;
  /** Default cache tier */
  defaultTier: CacheTier;
  /** Default eviction policy */
  evictionPolicy: EvictionPolicy;
  /** Maximum number of entries per tier */
  maxEntriesPerTier: Partial<Record<CacheTier, number>>;
  /** Maximum memory usage per tier (bytes) */
  maxMemoryPerTier: Partial<Record<CacheTier, number>>;
  /** Whether to enable compression by default */
  compressionEnabled: boolean;
  /** Default compression level */
  compressionLevel: CompressionLevel;
  /** Whether to enable stale-while-revalidate by default */
  staleWhileRevalidateEnabled: boolean;
  /** Default stale-while-revalidate max age (seconds) */
  staleWhileRevalidateMaxAge: number;
  /** Whether to enable stampede protection by default */
  stampedeProtectionEnabled: boolean;
  /** Whether to enable metrics collection */
  metricsEnabled: boolean;
  /** Metrics collection interval (seconds) */
  metricsInterval: number;
  /** Whether to log cache operations */
  logOperations: boolean;
  /** Network-specific TTL multipliers (Bangladesh specific) */
  networkTtlMultipliers: Partial<Record<NetworkType, number>>;
  /** Whether to enable adaptive compression based on network */
  adaptiveNetworkCompression: boolean;
}

// ============================================================
// Type Exports (All types must be exported)
// ============================================================

export type {
  // Base Types
  CacheStatus as CacheStatusType,
  CacheOperation as CacheOperationType,
  CacheKey as CacheKeyType,
  CacheTier as CacheTierType,
  EvictionPolicy as EvictionPolicyType,
  InvalidationStrategy as InvalidationStrategyType,
  WarmingStrategy as WarmingStrategyType,
  CompressionLevel as CompressionLevelType,
  CompressionStrategy as CompressionStrategyType,
  CacheNamespace as CacheNamespaceType,
  CacheTag as CacheTagType,
  CacheVersion as CacheVersionType,
  
  // Policy Types
  CachePolicy as CachePolicyType,
  CacheEvictionPolicy as CacheEvictionPolicyType,
  CacheWarmingPolicy as CacheWarmingPolicyType,
  CacheInvalidationPolicy as CacheInvalidationPolicyType,
  CacheTierConfig as CacheTierConfigType,
  CacheConfig as CacheConfigType,
  
  // Entry & Options
  CacheEntry as CacheEntryType,
  CacheOptions as CacheOptionsType,
  CacheGetOptions as CacheGetOptionsType,
  CacheSetOptions as CacheSetOptionsType,
  CacheDeleteOptions as CacheDeleteOptionsType,
  CacheInvalidateOptions as CacheInvalidateOptionsType,
  CacheClearOptions as CacheClearOptionsType,
  CacheBulkGetOptions as CacheBulkGetOptionsType,
  
  // Strategies
  ReadThroughStrategy as ReadThroughStrategyType,
  WriteThroughStrategy as WriteThroughStrategyType,
  StaleWhileRevalidateConfig as StaleWhileRevalidateConfigType,
  StampedeProtectionConfig as StampedeProtectionConfigType,
  CacheWarmingConfig as CacheWarmingConfigType,
  CacheCompressionConfig as CacheCompressionConfigType,
  
  // Network-aware (Bangladesh specific)
  NetworkAwareCacheOptions as NetworkAwareCacheOptionsType,
  AdaptiveCacheConfig as AdaptiveCacheConfigType,
  
  // Metrics & Statistics
  CacheMetricsConfig as CacheMetricsConfigType,
  CacheStatistics as CacheStatisticsType,
  CacheHealthStatus as CacheHealthStatusType,
  CachePerformanceMetrics as CachePerformanceMetricsType,
  
  // Results
  CacheResult as CacheResultType,
  CacheSetResult as CacheSetResultType,
  CacheDeleteResult as CacheDeleteResultType,
  CacheClearResult as CacheClearResultType,
  CacheMultiGetResult as CacheMultiGetResultType,
  
  // Events & Dependencies
  CacheEvent as Cache_EventType,
  CacheEventType as CacheEventTypeEnum,
  CacheDependency as CacheDependencyType,
  InvalidationPattern as InvalidationPatternType,
  
  // Builders & Hooks
  CacheKeyBuilder as CacheKeyBuilderType,
  CacheValueTransformer as CacheValueTransformerType,
  CacheKeyValidator as CacheKeyValidatorType,
  CacheHook as CacheHookType,
  CacheInterceptor as CacheInterceptorType,
  
  // Service Config
  CacheServiceConfig as CacheServiceConfigType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// All Types Included:
// 1. ✅ Base Types (CacheStatus, CacheOperation, CacheKey, CacheTier)
// 2. ✅ Policy Types (CachePolicy, CacheEvictionPolicy, CacheWarmingPolicy, CacheInvalidationPolicy)
// 3. ✅ Entry & Options (CacheEntry, CacheOptions, CacheGetOptions, CacheSetOptions, etc.)
// 4. ✅ Strategies (ReadThrough, WriteThrough, StaleWhileRevalidate, StampedeProtection)
// 5. ✅ Network-aware (NetworkAwareCacheOptions, AdaptiveCacheConfig - Bangladesh specific)
// 6. ✅ Metrics & Statistics (CacheStatistics, CacheHealthStatus, CachePerformanceMetrics)
// 7. ✅ Results (CacheResult, CacheSetResult, CacheDeleteResult, CacheClearResult, CacheMultiGetResult)
// 8. ✅ Events & Dependencies (CacheEvent, CacheDependency, InvalidationPattern)
// 9. ✅ Builders & Hooks (CacheKeyBuilder, CacheValueTransformer, CacheInterceptor)
// 10. ✅ Service Config (CacheServiceConfig)
// 
// Bangladesh Specific:
// - NetworkType (2G/3G/4G/5G/WiFi)
// - Network-aware caching (adaptive TTL, compression)
// - Network type breakdown in statistics
// - Adaptive compression for low-bandwidth networks
// 
// ============================================================
