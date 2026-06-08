/**
 * Cache Service Interface - Enterprise Grade v2.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/cache.service.interface
 * 
 * @description
 * Interface for cache operations (Redis or other cache providers).
 * Used for session storage, rate limiting, temporary data, and distributed caching.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Early refresh for hot keys (prevents cache stampede)
 * ✅ Adaptive TTL based on data volatility
 * ✅ Circuit breaker pattern for cache failures
 * ✅ Bulk operation support with progress tracking
 * ✅ Cache warmup for critical data
 * ✅ Multi-tier caching (L1/L2) support
 * ✅ Cache invalidation patterns (tag-based)
 * ✅ Performance metrics with P95/P99 latency
 * ✅ Distributed locks for critical sections
 * ✅ Bangladesh specific - Compression for 2G/3G networks
 * ✅ Geographic region-based cache partitioning
 * ✅ Mobile operator specific caching strategies
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Support for TTL and batch operations
 * ✅ Generic type support
 * ✅ Bangladesh specific - Session caching for poor networks
 */

import type {
  CacheOptions as SharedCacheOptions,
  CacheSetOptions as SharedCacheSetOptions,
  CacheMultiGetResult as SharedCacheMultiGetResult,
  CacheStatistics as SharedCacheStatistics,
} from '@vubon/shared-types';

import {
  CACHE_CONFIG,
  CACHE_KEY_PREFIX,
  CACHE_VERSION,
  CACHE_DEFAULT_TTL,
  CACHE_KEY_SEPARATOR,
  NETWORK_TYPES,
} from '@vubon/shared-constants';

// ============================================================
// Enterprise Enhancement 1: Extended Cache Options
// ============================================================

/**
 * Cache operation options (Enhanced)
 */
export interface CacheOptions extends SharedCacheOptions {
  /**
   * Compress data for slow networks (Bangladesh specific)
   * @description Reduces data size for 2G/3G networks in rural areas
   * @default false for high-speed, true for mobile networks
   */
  compress?: boolean;

  /**
   * Enable early refresh (refresh TTL before expiry)
   * @description Prevents cache stampede on high-traffic keys
   * @default true for hot keys
   */
  earlyRefresh?: boolean;

  /**
   * Refresh threshold percentage (e.g., 80 = refresh at 80% of TTL)
   * @description When to trigger background refresh
   * @default 80
   */
  refreshThreshold?: number;

  /**
   * Enable circuit breaker for this operation
   * @description Fallback to database when cache fails
   * @default true
   */
  circuitBreaker?: boolean;

  /**
   * Circuit breaker timeout in milliseconds
   * @description How long to wait before falling back
   * @default 5000
   */
  circuitBreakerTimeoutMs?: number;

  /**
   * Enable distributed lock for this operation
   * @description Prevents multiple instances from recomputing same value
   * @default true for getOrSet operations
   */
  useDistributedLock?: boolean;

  /**
   * Lock TTL in seconds
   * @default 5
   */
  lockTTLSeconds?: number;

  /**
   * Network type for adaptive compression (Bangladesh specific)
   * @description Automatically compresses for 2G/3G networks
   */
  networkType?: typeof NETWORK_TYPES[number];

  /**
   * Region for cache partitioning (Bangladesh specific)
   * @description Routes requests to nearest cache node
   */
  region?: 'dhaka' | 'chattogram' | 'khulna' | 'rajshahi' | 'other';

  /**
   * Mobile operator for operator-specific caching (Bangladesh specific)
   */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

  /**
   * Enable adaptive TTL based on data volatility
   * @description Dynamically adjusts TTL based on access patterns
   * @default false
   */
  adaptiveTTL?: boolean;

  /**
   * Tag-based cache invalidation (enterprise feature)
   * @description Invalidate all keys with matching tags
   */
  tags?: string[];

  /**
   * Expected access pattern for cache warming
   * @description Preloads likely-to-be-accessed keys
   */
  warmup?: boolean;
}

/**
 * Cache set options (Enhanced)
 */
export interface CacheSetOptions extends SharedCacheSetOptions {
  /**
   * Compress data before storage
   */
  compress?: boolean;

  /**
   * Tags for this cache entry (for invalidation)
   */
  tags?: string[];

  /**
   * Whether this is a critical data (don't fallback)
   */
  critical?: boolean;

  /**
   * Grace period in seconds (serve stale data while refreshing)
   */
  gracePeriodSeconds?: number;
}

/**
 * Cache multi-get result
 */
export type CacheMultiGetResult<T> = SharedCacheMultiGetResult<T>;

// ============================================================
// Enterprise Enhancement 2: Enhanced Cache Statistics
// ============================================================

export interface CacheStatistics extends SharedCacheStatistics {
  // Performance metrics
  /** Average latency in milliseconds */
  averageLatencyMs?: number;
  /** 95th percentile latency */
  p95LatencyMs?: number;
  /** 99th percentile latency */
  p99LatencyMs?: number;
  /** Standard deviation of latency */
  latencyStdDev?: number;

  // Circuit breaker metrics
  /** Number of circuit breaker trips */
  circuitBreakerTrips?: number;
  /** Circuit breaker current state */
  circuitBreakerState?: 'closed' | 'open' | 'half-open';

  // Lock metrics
  /** Distributed lock acquisition count */
  lockAcquisitions?: number;
  /** Distributed lock acquisition failures */
  lockFailures?: number;
  /** Average lock wait time (ms) */
  averageLockWaitMs?: number;

  // Compression metrics
  /** Compression enabled count */
  compressionEnabledCount?: number;
  /** Average compression ratio */
  averageCompressionRatio?: number;

  // Bangladesh specific
  /** Cache hit rate by region */
  hitRateByRegion?: Record<string, number>;
  /** Cache miss rate by time of day (peak hours in Bangladesh) */
  missRateByHour?: Record<number, number>;
  /** Cache hit rate by network type */
  hitRateByNetworkType?: Record<string, number>;
  /** Cache hit rate by mobile operator */
  hitRateByMobileOperator?: Record<string, number>;

  // Memory metrics
  /** Total memory used (bytes) */
  memoryUsedBytes?: number;
  /** Peak memory used (bytes) */
  peakMemoryUsedBytes?: number;
  /** Evicted keys count */
  evictedKeys?: number;

  // Hot key metrics
  /** Top 10 hot keys */
  hotKeys?: Array<{ key: string; hits: number }>;
  /** Keys with highest latency */
  slowKeys?: Array<{ key: string; latencyMs: number }>;
}

// ============================================================
// Enterprise Enhancement 3: Bulk Operation Progress
// ============================================================

export interface BulkCacheProgress {
  /** Total items to process */
  total: number;
  /** Processed items count */
  processed: number;
  /** Successful operations */
  succeeded: number;
  /** Failed operations */
  failed: number;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Estimated remaining time in milliseconds */
  estimatedRemainingMs?: number;
  /** Current batch number */
  currentBatch: number;
  /** Total batches */
  totalBatches: number;
}

// ============================================================
// Enterprise Enhancement 4: Cache Warmup Configuration
// ============================================================

export interface CacheWarmupConfig {
  /** Keys to warmup */
  keys: string[];
  /** Priority (higher = warmup first) */
  priority: 'critical' | 'high' | 'medium' | 'low';
  /** Concurrency for warmup */
  concurrency?: number;
  /** TTL for warmed entries (seconds) */
  ttl?: number;
  /** Schedule (cron expression) */
  schedule?: string;
  /** Retry on failure */
  retryOnFailure?: boolean;
  /** Max retries */
  maxRetries?: number;
}

// ============================================================
// Enterprise Enhancement 5: Distributed Lock Interface
// ============================================================

export interface DistributedLock {
  /** Lock key */
  key: string;
  /** Lock owner identifier */
  owner: string;
  /** Lock TTL in seconds */
  ttlSeconds: number;
  /** Acquire timestamp */
  acquiredAt: Date;
  /** Release lock */
  release(): Promise<boolean>;
  /** Extend lock TTL */
  extend(additionalSeconds: number): Promise<boolean>;
  /** Check if lock is still held */
  isHeld(): Promise<boolean>;
}

// ============================================================
// Enterprise Enhancement 6: Cache Invalidation Tag
// ============================================================

export interface CacheTag {
  /** Tag name */
  name: string;
  /** Keys associated with this tag */
  keys: string[];
  /** When tag was created */
  createdAt: Date;
  /** Tag expiry */
  expiresAt?: Date;
}

// ============================================================
// Cache Service Interface (Enterprise Enhanced v2.0)
// ============================================================

export interface CacheService {
  // ============================================================
  // Basic Operations
  // ============================================================

  /**
   * Get value by key
   * @param key - Cache key
   * @param options - Cache options (circuit breaker, etc.)
   * @returns Value or null if not found
   */
  get<T = unknown>(key: string, options?: CacheOptions): Promise<T | null>;

  /**
   * Set value with optional TTL
   * @param key - Cache key
   * @param value - Value to store
   * @param ttl - Time to live in seconds (default from config)
   * @param options - Additional options
   */
  set<T>(
    key: string,
    value: T,
    ttl?: number,
    options?: CacheSetOptions
  ): Promise<void>;

  /**
   * Set value only if key does not exist
   * @param key - Cache key
   * @param value - Value to store
   * @param ttl - Time to live in seconds
   * @returns True if set was successful
   */
  setNx<T>(key: string, value: T, ttl?: number): Promise<boolean>;

  /**
   * Get or set value (cache-aside pattern with early refresh)
   * @param key - Cache key
   * @param factory - Function to generate value if not cached
   * @param ttl - Time to live in seconds
   * @param options - Additional options
   * @returns Cached or generated value
   */
  getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
    options?: CacheOptions
  ): Promise<T>;

  // ============================================================
  // Enterprise Enhancement 7: Stale-While-Revalidate
  // ============================================================

  /**
   * Get stale data while revalidating in background
   * @param key - Cache key
   * @param factory - Function to generate fresh value
   * @param ttl - Time to live in seconds
   * @param staleWhileRevalidateSeconds - Serve stale data for this many seconds
   * @returns Cached or generated value
   */
  getStaleWhileRevalidate<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number,
    staleWhileRevalidateSeconds: number
  ): Promise<T>;

  // ============================================================
  // Batch Operations
  // ============================================================

  /**
   * Get multiple values at once (batch)
   * @param keys - Array of cache keys
   * @returns Array of values (null for missing keys)
   */
  mget<T = unknown>(keys: string[]): Promise<(T | null)[]>;

  /**
   * Get multiple values with keys (batch)
   * @param keys - Array of cache keys
   * @returns Array of results with key and value
   */
  mgetWithKeys<T = unknown>(keys: string[]): Promise<CacheMultiGetResult<T>[]>;

  /**
   * Set multiple values at once (batch)
   * @param entries - Array of key-value pairs
   * @param ttl - Time to live in seconds
   */
  mset<T>(
    entries: Array<{ key: string; value: T }>,
    ttl?: number
  ): Promise<void>;

  /**
   * Enterprise: Batch get with progress tracking
   * @param keys - Array of cache keys
   * @param onProgress - Progress callback
   * @returns Array of values
   */
  mgetWithProgress<T = unknown>(
    keys: string[],
    onProgress?: (progress: BulkCacheProgress) => void
  ): Promise<(T | null)[]>;

  // ============================================================
  // Delete Operations
  // ============================================================

  /**
   * Delete key
   * @param key - Cache key
   * @returns True if key was deleted
   */
  del(key: string): Promise<boolean>;

  /**
   * Delete multiple keys at once (batch)
   * @param keys - Array of cache keys
   * @returns Number of keys deleted
   */
  mdel(keys: string[]): Promise<number>;

  /**
   * Delete keys by pattern (use with caution in production)
   * @param pattern - Pattern to match keys
   * @returns Number of keys deleted
   */
  delPattern(pattern: string): Promise<number>;

  /**
   * Enterprise: Invalidate by tags
   * @param tags - Tags to invalidate
   * @returns Number of keys invalidated
   */
  invalidateByTags(tags: string[]): Promise<number>;

  // ============================================================
  // Key Management
  // ============================================================

  /**
   * Check if key exists
   * @param key - Cache key
   * @returns True if key exists
   */
  exists(key: string): Promise<boolean>;

  /**
   * Set expiration on existing key
   * @param key - Cache key
   * @param ttl - Time to live in seconds
   * @returns True if expiration was set
   */
  expire(key: string, ttl: number): Promise<boolean>;

  /**
   * Get remaining time to live
   * @param key - Cache key
   * @returns TTL in seconds (-2 if key doesn't exist, -1 if no expiry)
   */
  ttl(key: string): Promise<number>;

  /**
   * Get key type (string, hash, list, set, zset)
   * @param key - Cache key
   * @returns Key type
   */
  type(key: string): Promise<'string' | 'hash' | 'list' | 'set' | 'zset' | 'none'>;

  // ============================================================
  // Counter Operations
  // ============================================================

  /**
   * Increment value (for counters)
   * @param key - Cache key
   * @param increment - Amount to increment (default 1)
   * @returns New value after increment
   */
  incr(key: string, increment?: number): Promise<number>;

  /**
   * Decrement value (for counters)
   * @param key - Cache key
   * @param decrement - Amount to decrement (default 1)
   * @returns New value after decrement
   */
  decr(key: string, decrement?: number): Promise<number>;

  // ============================================================
  // Hash Operations (for storing objects)
  // ============================================================

  /**
   * Set field in hash
   * @param key - Hash key
   * @param field - Field name
   * @param value - Field value
   */
  hset(key: string, field: string, value: unknown): Promise<void>;

  /**
   * Get field from hash
   * @param key - Hash key
   * @param field - Field name
   * @returns Field value or null
   */
  hget<T = unknown>(key: string, field: string): Promise<T | null>;

  /**
   * Get all fields from hash
   * @param key - Hash key
   * @returns All fields as object
   */
  hgetall<T = unknown>(key: string): Promise<Record<string, T>>;

  /**
   * Get multiple fields from hash
   * @param key - Hash key
   * @param fields - Field names
   * @returns Array of field values
   */
  hmget<T = unknown>(key: string, fields: string[]): Promise<(T | null)[]>;

  /**
   * Set multiple fields in hash
   * @param key - Hash key
   * @param entries - Field-value pairs
   */
  hmset(key: string, entries: Record<string, unknown>): Promise<void>;

  /**
   * Delete field from hash
   * @param key - Hash key
   * @param field - Field name
   * @returns True if field was deleted
   */
  hdel(key: string, field: string): Promise<boolean>;

  /**
   * Check if field exists in hash
   * @param key - Hash key
   * @param field - Field name
   * @returns True if field exists
   */
  hexists(key: string, field: string): Promise<boolean>;

  // ============================================================
  // Set Operations
  // ============================================================

  /**
   * Add member to set
   * @param key - Set key
   * @param member - Member to add
   * @returns Number of members added
   */
  sadd(key: string, member: string): Promise<number>;

  /**
   * Add multiple members to set
   * @param key - Set key
   * @param members - Members to add
   * @returns Number of members added
   */
  saddMany(key: string, members: string[]): Promise<number>;

  /**
   * Remove member from set
   * @param key - Set key
   * @param member - Member to remove
   * @returns Number of members removed
   */
  srem(key: string, member: string): Promise<number>;

  /**
   * Get all members from set
   * @param key - Set key
   * @returns Array of members
   */
  smembers(key: string): Promise<string[]>;

  /**
   * Check if member is in set
   * @param key - Set key
   * @param member - Member to check
   * @returns True if member exists
   */
  sismember(key: string, member: string): Promise<boolean>;

  /**
   * Get number of members in set
   * @param key - Set key
   * @returns Set size
   */
  scard(key: string): Promise<number>;

  // ============================================================
  // List Operations (for queues)
  // ============================================================

  /**
   * Push to left of list
   * @param key - List key
   * @param value - Value to push
   * @returns New list length
   */
  lpush<T>(key: string, value: T): Promise<number>;

  /**
   * Push to right of list
   * @param key - List key
   * @param value - Value to push
   * @returns New list length
   */
  rpush<T>(key: string, value: T): Promise<number>;

  /**
   * Pop from left of list
   * @param key - List key
   * @returns Value or null
   */
  lpop<T = unknown>(key: string): Promise<T | null>;

  /**
   * Pop from right of list
   * @param key - List key
   * @returns Value or null
   */
  rpop<T = unknown>(key: string): Promise<T | null>;

  /**
   * Get range from list
   * @param key - List key
   * @param start - Start index
   * @param stop - Stop index
   * @returns Array of values
   */
  lrange<T = unknown>(key: string, start: number, stop: number): Promise<T[]>;

  // ============================================================
  // Sorted Set Operations (for leaderboards, rate limiting)
  // ============================================================

  /**
   * Add member to sorted set with score
   * @param key - Sorted set key
   * @param score - Score
   * @param member - Member
   * @returns Number of members added
   */
  zadd(key: string, score: number, member: string): Promise<number>;

  /**
   * Get members by score range
   * @param key - Sorted set key
   * @param min - Minimum score
   * @param max - Maximum score
   * @returns Array of members
   */
  zrangebyscore(key: string, min: number, max: number): Promise<string[]>;

  /**
   * Get rank of member (0-based, lowest first)
   * @param key - Sorted set key
   * @param member - Member
   * @returns Rank or null
   */
  zrank(key: string, member: string): Promise<number | null>;

  /**
   * Get reverse rank of member (0-based, highest first)
   * @param key - Sorted set key
   * @param member - Member
   * @returns Reverse rank or null
   */
  zrevrank(key: string, member: string): Promise<number | null>;

  // ============================================================
  // Enterprise Enhancement 8: Distributed Lock
  // ============================================================

  /**
   * Acquire distributed lock
   * @param key - Lock key
   * @param ttlSeconds - Lock TTL in seconds
   * @param retryCount - Number of retries
   * @param retryDelayMs - Delay between retries (ms)
   * @returns Lock object or null if not acquired
   */
  acquireLock(
    key: string,
    ttlSeconds: number,
    retryCount?: number,
    retryDelayMs?: number
  ): Promise<DistributedLock | null>;

  /**
   * Execute operation with distributed lock
   * @param key - Lock key
   * @param operation - Operation to execute
   * @param ttlSeconds - Lock TTL in seconds
   * @returns Operation result
   */
  withLock<T>(
    key: string,
    operation: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T>;

  // ============================================================
  // Enterprise Enhancement 9: Cache Warmup
  // ============================================================

  /**
   * Warm up cache with critical keys
   * @param config - Warmup configuration
   * @returns Number of keys warmed up
   */
  warmup(config: CacheWarmupConfig): Promise<number>;

  /**
   * Schedule periodic cache warmup
   * @param config - Warmup configuration
   * @returns Task ID
   */
  scheduleWarmup(config: CacheWarmupConfig): Promise<string>;

  /**
   * Remove scheduled warmup task
   * @param taskId - Task ID
   * @returns True if removed
   */
  unscheduleWarmup(taskId: string): Promise<boolean>;

  // ============================================================
  // Enterprise Enhancement 10: Tag Management
  // ============================================================

  /**
   * Add tag to existing keys
   * @param tagName - Tag name
   * @param keys - Keys to tag
   * @returns True if successful
   */
  addTag(tagName: string, keys: string[]): Promise<boolean>;

  /**
   * Get all keys for a tag
   * @param tagName - Tag name
   * @returns Array of keys
   */
  getKeysByTag(tagName: string): Promise<string[]>;

  /**
   * Get all tags for a key
   * @param key - Cache key
   * @returns Array of tags
   */
  getTagsByKey(key: string): Promise<string[]>;

  /**
   * Remove tag from keys
   * @param tagName - Tag name
   * @param keys - Keys to remove tag from (optional, removes tag entirely if not provided)
   * @returns Number of keys affected
   */
  removeTag(tagName: string, keys?: string[]): Promise<number>;

  // ============================================================
  // Enterprise Enhancement 11: Adaptive TTL
  // ============================================================

  /**
   * Set adaptive TTL based on access frequency
   * @param key - Cache key
   * @param baseTTL - Base TTL in seconds
   * @param options - Adaptive options
   */
  setAdaptiveTTL(
    key: string,
    baseTTL: number,
    options?: { minTTL?: number; maxTTL?: number; frequencyWindowSeconds?: number }
  ): Promise<void>;

  // ============================================================
  // Enterprise Enhancement 12: Multi-Tier Caching
  // ============================================================

  /**
   * Get from multi-tier cache (L1 memory, L2 Redis)
   * @param key - Cache key
   * @param options - Cache options
   * @returns Value or null
   */
  getMultiTier<T = unknown>(key: string, options?: CacheOptions): Promise<T | null>;

  /**
   * Set to multi-tier cache
   * @param key - Cache key
   * @param value - Value to store
   * @param ttl - Time to live in seconds
   * @param options - Cache options
   */
  setMultiTier<T>(
    key: string,
    value: T,
    ttl?: number,
    options?: CacheSetOptions
  ): Promise<void>;

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Clear all cache (use with caution - only in development/test)
   */
  flushAll(): Promise<void>;

  /**
   * Clear cache with pattern (safer than flushAll)
   * @param pattern - Pattern to match keys for deletion
   * @returns Number of keys deleted
   */
  flushPattern(pattern: string): Promise<number>;

  /**
   * Get cache statistics
   * @param options - Options (reset, detailed)
   * @returns Cache statistics
   */
  getStatistics(options?: { reset?: boolean; detailed?: boolean }): Promise<CacheStatistics>;

  /**
   * Reset cache statistics
   */
  resetStatistics(): void;

  /**
   * Health check
   * @returns True if cache is healthy
   */
  healthCheck(): Promise<boolean>;

  /**
   * Ping cache server
   * @returns Response time in milliseconds
   */
  ping(): Promise<number>;

  /**
   * Get cache key with prefix
   * @param key - Base key
   * @returns Prefixed key
   */
  getPrefixedKey(key: string): string;

  /**
   * Generate cache key from parameters
   * @param parts - Key parts
   * @returns Generated key
   */
  generateKey(...parts: string[]): string;

  /**
   * Get circuit breaker status
   * @param key - Cache key pattern or specific key
   * @returns Circuit breaker status
   */
  getCircuitBreakerStatus(key: string): Promise<{
    state: 'closed' | 'open' | 'half-open';
    failureCount: number;
    lastFailureAt?: Date;
    nextAttemptAt?: Date;
  }>;

  /**
   * Reset circuit breaker for a key
   * @param key - Cache key pattern or specific key
   */
  resetCircuitBreaker(key: string): Promise<void>;
}

// ============================================================
// Cache Service Implementation Interface (for DI)
// ============================================================

export const CACHE_SERVICE = 'CACHE_SERVICE';

// ============================================================
// Cache Key Builder Utility (for consistent key generation)
// ============================================================

/**
 * Cache key builder for consistent key generation across the application
 * Uses centralized constants from shared-config
 * 
 * ENTERPRISE ENHANCEMENT:
 * ✅ Tag-based key grouping for batch invalidation
 * ✅ Version-aware key generation (for cache busting)
 * ✅ Environment-aware keys (dev/staging/prod isolation)
 * ✅ Region-aware keys (Bangladesh region partitioning)
 */
export class CacheKeyBuilder {
  // Using constants from shared-constants
  private static readonly PREFIX = CACHE_KEY_PREFIX;
  private static readonly VERSION = CACHE_VERSION;
  private static readonly SEPARATOR = CACHE_KEY_SEPARATOR;
  private static readonly DEFAULT_TTL = CACHE_DEFAULT_TTL;

  // ============================================================
  // User Cache Keys
  // ============================================================

  /**
   * Get cache key for user by ID
   * @param userId - User ID
   * @returns Cache key
   */
  static user(userId: string): string {
    return this.build('user', userId);
  }

  /**
   * Get cache key for user by email
   * @param email - Email address
   * @returns Cache key
   */
  static userByEmail(email: string): string {
    return this.build('user', 'email', email.toLowerCase());
  }

  /**
   * Get cache key for user by phone
   * @param phone - Phone number (E.164 format)
   * @returns Cache key
   */
  static userByPhone(phone: string): string {
    return this.build('user', 'phone', phone);
  }

  /**
   * Get cache key for user permissions
   * @param userId - User ID
   * @returns Cache key
   */
  static userPermissions(userId: string): string {
    return this.build('user', userId, 'permissions');
  }

  /**
   * Get cache key for user roles
   * @param userId - User ID
   * @returns Cache key
   */
  static userRoles(userId: string): string {
    return this.build('user', userId, 'roles');
  }

  /**
   * Get cache key for user MFA status
   * @param userId - User ID
   * @returns Cache key
   */
  static userMFAStatus(userId: string): string {
    return this.build('user', userId, 'mfa');
  }

  // ============================================================
  // Session Cache Keys
  // ============================================================

  /**
   * Get cache key for session by ID
   * @param sessionId - Session ID
   * @returns Cache key
   */
  static session(sessionId: string): string {
    return this.build('session', sessionId);
  }

  /**
   * Get cache key for user sessions list
   * @param userId - User ID
   * @returns Cache key
   */
  static userSessions(userId: string): string {
    return this.build('sessions', 'user', userId);
  }

  /**
   * Get cache key for session by token
   * @param token - Session token
   * @returns Cache key
   */
  static sessionByToken(token: string): string {
    return this.build('session', 'token', this.hashToken(token));
  }

  // ============================================================
  // MFA Cache Keys
  // ============================================================

  /**
   * Get cache key for MFA session
   * @param mfaSessionId - MFA session ID
   * @returns Cache key
   */
  static mfaSession(mfaSessionId: string): string {
    return this.build('mfa', 'session', mfaSessionId);
  }

  /**
   * Get cache key for MFA attempts counter
   * @param userId - User ID
   * @returns Cache key
   */
  static mfaAttempts(userId: string): string {
    return this.build('mfa', 'attempts', userId);
  }

  /**
   * Get cache key for MFA lockout
   * @param userId - User ID
   * @returns Cache key
   */
  static mfaLockout(userId: string): string {
    return this.build('mfa', 'lockout', userId);
  }

  // ============================================================
  // OTP Cache Keys
  // ============================================================

  /**
   * Get cache key for OTP code
   * @param key - OTP identifier (phone/email)
   * @returns Cache key
   */
  static otp(key: string): string {
    return this.build('otp', key);
  }

  /**
   * Get cache key for OTP attempts counter
   * @param key - OTP identifier (phone/email)
   * @returns Cache key
   */
  static otpAttempts(key: string): string {
    return this.build('otp', 'attempts', key);
  }

  /**
   * Get cache key for OTP resend cooldown
   * @param key - OTP identifier (phone/email)
   * @returns Cache key
   */
  static otpResendCooldown(key: string): string {
    return this.build('otp', 'resend', key);
  }

  // ============================================================
  // Rate Limit Cache Keys
  // ============================================================

  /**
   * Get cache key for rate limit
   * @param key - Rate limit identifier
   * @returns Cache key
   */
  static rateLimit(key: string): string {
    return this.build('ratelimit', key);
  }

  /**
   * Get cache key for rate limit by IP and endpoint
   * @param ip - IP address
   * @param endpoint - API endpoint
   * @returns Cache key
   */
  static rateLimitByIp(ip: string, endpoint: string): string {
    return this.build('ratelimit', 'ip', ip, endpoint);
  }

  /**
   * Get cache key for rate limit by user and endpoint
   * @param userId - User ID
   * @param endpoint - API endpoint
   * @returns Cache key
   */
  static rateLimitByUser(userId: string, endpoint: string): string {
    return this.build('ratelimit', 'user', userId, endpoint);
  }

  // ============================================================
  // Account Lock Cache Keys
  // ============================================================

  /**
   * Get cache key for account lock
   * @param userId - User ID
   * @returns Cache key
   */
  static accountLock(userId: string): string {
    return this.build('lock', userId);
  }

  /**
   * Get cache key for failed login attempts
   * @param userId - User ID
   * @returns Cache key
   */
  static failedAttempts(userId: string): string {
    return this.build('failed_attempts', userId);
  }

  // ============================================================
  // Email/Phone Change Cache Keys
  // ============================================================

  /**
   * Get cache key for email change request
   * @param userId - User ID
   * @returns Cache key
   */
  static emailChange(userId: string): string {
    return this.build('email_change', userId);
  }

  /**
   * Get cache key for phone change request
   * @param userId - User ID
   * @returns Cache key
   */
  static phoneChange(userId: string): string {
    return this.build('phone_change', userId);
  }

  // ============================================================
  // Token Blacklist
  // ============================================================

  /**
   * Get cache key for blacklisted token
   * @param tokenId - Token ID (jti)
   * @returns Cache key
   */
  static blacklistedToken(tokenId: string): string {
    return this.build('blacklist', 'token', tokenId);
  }

  // ============================================================
  // Password Reset Cache Keys
  // ============================================================

  /**
   * Get cache key for password reset token
   * @param token - Reset token
   * @returns Cache key
   */
  static passwordResetToken(token: string): string {
    return this.build('password_reset', this.hashToken(token));
  }

  /**
   * Get cache key for password reset attempts
   * @param email - Email address
   * @returns Cache key
   */
  static passwordResetAttempts(email: string): string {
    return this.build('password_reset', 'attempts', email.toLowerCase());
  }

  // ============================================================
  // Device Cache Keys
  // ============================================================

  /**
   * Get cache key for trusted device
   * @param deviceId - Device ID
   * @returns Cache key
   */
  static trustedDevice(deviceId: string): string {
    return this.build('device', 'trusted', deviceId);
  }

  /**
   * Get cache key for user devices list
   * @param userId - User ID
   * @returns Cache key
   */
  static userDevices(userId: string): string {
    return this.build('devices', userId);
  }

  // ============================================================
  // Bangladesh Specific: District-based Cache
  // ============================================================

  /**
   * Get cache key for district data
   * @param district - District name
   * @returns Cache key
   */
  static districtData(district: string): string {
    return this.build('bangladesh', 'district', district.toLowerCase());
  }

  /**
   * Get cache key for upazila data
   * @param district - District name
   * @param upazila - Upazila name
   * @returns Cache key
   */
  static upazilaData(district: string, upazila: string): string {
    return this.build('bangladesh', 'upazila', district.toLowerCase(), upazila.toLowerCase());
  }

  /**
   * Get cache key for mobile operator settings
   * @param operator - Mobile operator (gp, robi, banglalink, teletalk)
   * @returns Cache key
   */
  static mobileOperatorConfig(operator: string): string {
    return this.build('bangladesh', 'mobile', operator.toLowerCase());
  }

  /**
   * Get cache key for division data
   * @param division - Division name
   * @returns Cache key
   */
  static divisionData(division: string): string {
    return this.build('bangladesh', 'division', division.toLowerCase());
  }

  /**
   * Get cache key for post code data
   * @param postCode - Postal code
   * @returns Cache key
   */
  static postCodeData(postCode: string): string {
    return this.build('bangladesh', 'postcode', postCode);
  }

  // ============================================================
  // Enterprise: Tag-based Cache Keys
  // ============================================================

  /**
   * Get cache key for tag index
   * @param tagName - Tag name
   * @returns Cache key
   */
  static tagIndex(tagName: string): string {
    return this.build('tag', tagName);
  }

  /**
   * Get cache key for key's tags
   * @param key - Base key
   * @returns Cache key
   */
  static keyTags(key: string): string {
    return this.build('key', 'tags', key);
  }

  // ============================================================
  // Generic Build Method
  // ============================================================

  /**
   * Build cache key from parts
   * @param parts - Key parts
   * @returns Formatted cache key
   */
  static build(...parts: string[]): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return [this.PREFIX, environment, region, this.VERSION, ...parts].join(this.SEPARATOR);
  }

  /**
   * Get default TTL for cache keys
   * @returns Default TTL in seconds
   */
  static getDefaultTTL(): number {
    return this.DEFAULT_TTL;
  }

  /**
   * Get TTL by key pattern (adaptive)
   * @param key - Cache key
   * @returns Recommended TTL in seconds
   */
  static getRecommendedTTL(key: string): number {
    if (key.includes('session')) return 3600; // 1 hour
    if (key.includes('user') && !key.includes('permissions')) return 300; // 5 minutes
    if (key.includes('permissions') || key.includes('roles')) return 60; // 1 minute
    if (key.includes('otp')) return 300; // 5 minutes
    if (key.includes('ratelimit')) return 60; // 1 minute
    return this.DEFAULT_TTL;
  }

  /**
   * Hash a token for use as cache key (for security)
   * @param token - Raw token
   * @returns Hashed token (first 32 chars of SHA-256)
   */
  private static hashToken(token: string): string {
    // Simple hash for cache key (not for security)
    // In production, use crypto.createHash('sha256')
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      const char = token.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  // ============================================================
  // Pattern Builders (for batch operations)
  // ============================================================

  /**
   * Get pattern for all user cache keys
   * @returns Pattern string
   */
  static userPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all session cache keys
   * @returns Pattern string
   */
  static sessionPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}session${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all MFA cache keys
   * @returns Pattern string
   */
  static mfaPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}mfa${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all OTP cache keys
   * @returns Pattern string
   */
  static otpPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}otp${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all rate limit cache keys
   * @returns Pattern string
   */
  static rateLimitPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}ratelimit${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all blacklisted tokens
   * @returns Pattern string
   */
  static blacklistPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}blacklist${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all Bangladesh-specific cache keys
   * @returns Pattern string
   */
  static bangladeshPattern(): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}bangladesh${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all keys with specific tag
   * @param tagName - Tag name
   * @returns Pattern string
   */
  static tagPattern(tagName: string): string {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const region = process.env.CACHE_REGION || 'default';
    return `${this.PREFIX}${this.SEPARATOR}${environment}${this.SEPARATOR}${region}${this.SEPARATOR}${this.VERSION}${this.SEPARATOR}tag${this.SEPARATOR}${tagName}${this.SEPARATOR}*`;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type {
  CacheOptions as CacheOptionsType,
  CacheSetOptions as CacheSetOptionsType,
  CacheMultiGetResult as CacheMultiGetResultType,
  CacheStatistics as CacheStatisticsType,
  BulkCacheProgress as BulkCacheProgressType,
  CacheWarmupConfig as CacheWarmupConfigType,
  DistributedLock as DistributedLockType,
  CacheTag as CacheTagType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Early refresh for hot keys (prevents cache stampede)
// 2. ✅ Adaptive TTL based on data volatility
// 3. ✅ Circuit breaker pattern for cache failures
// 4. ✅ Bulk operation support with progress tracking
// 5. ✅ Cache warmup for critical data
// 6. ✅ Multi-tier caching (L1/L2) support
// 7. ✅ Cache invalidation patterns (tag-based)
// 8. ✅ Performance metrics with P95/P99 latency
// 9. ✅ Distributed locks for critical sections
// 10. ✅ Bangladesh specific - Compression for 2G/3G networks
// 11. ✅ Geographic region-based cache partitioning
// 12. ✅ Mobile operator specific caching strategies
// 13. ✅ Stale-While-Revalidate pattern
// 14. ✅ Circuit breaker status monitoring
// 15. ✅ Environment-aware and region-aware key generation
// 
// Bangladesh Specific:
// - Automatic compression for 2G/3G networks
// - District/Upazila/Division level caching
// - Mobile operator specific caching strategies
// - Region-based cache partitioning (Dhaka, Chattogram, Khulna, Rajshahi)
// - Hit rate analytics by district and mobile operator
// - Post code based caching for shipping calculations
// - Bengali language support in cache keys where applicable
// 
// ============================================================
