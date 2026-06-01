/**
 * Cache Service Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/cache.service.interface
 * 
 * @description
 * Interface for cache operations (Redis or other cache providers).
 * Used for session storage, rate limiting, temporary data, and distributed caching.
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Support for TTL and batch operations
 * ✅ Generic type support
 * ✅ Bangladesh specific - Session caching for poor networks
 */

// ============================================================
// Cache Options
// ============================================================

export interface CacheOptions {
  ttl?: number;           // Time to live in seconds
  nx?: boolean;           // Only set if key does not exist
  xx?: boolean;           // Only set if key already exists
  prefix?: string;        // Custom key prefix
}

export interface CacheSetOptions extends CacheOptions {
  keepTTL?: boolean;      // Keep existing TTL when updating
}

export interface CacheMultiGetResult<T> {
  key: string;
  value: T | null;
  found: boolean;
}

// ============================================================
// Cache Statistics
// ============================================================

export interface CacheStatistics {
  hits: number;
  misses: number;
  hitRate: number;
  totalOperations: number;
  keysCount: number;
  memoryUsage?: number;   // Bytes (if available)
  // Bangladesh specific - network performance
  averageLatencyMs?: number;
  p95LatencyMs?: number;
}

// ============================================================
// Cache Service Interface
// ============================================================

export interface CacheService {
  // ============================================================
  // Basic Operations
  // ============================================================
  
  /**
   * Get value by key
   * @param key - Cache key
   * @returns Value or null if not found
   */
  get<T = any>(key: string): Promise<T | null>;

  /**
   * Set value with optional TTL
   * @param key - Cache key
   * @param value - Value to store
   * @param ttl - Time to live in seconds
   * @param options - Additional options
   */
  set<T>(key: string, value: T, ttl?: number, options?: CacheSetOptions): Promise<void>;

  /**
   * Set value only if key does not exist
   * @param key - Cache key
   * @param value - Value to store
   * @param ttl - Time to live in seconds
   * @returns True if set was successful
   */
  setNx<T>(key: string, value: T, ttl?: number): Promise<boolean>;

  /**
   * Get or set value (cache-aside pattern)
   * @param key - Cache key
   * @param factory - Function to generate value if not cached
   * @param ttl - Time to live in seconds
   * @returns Cached or generated value
   */
  getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number
  ): Promise<T>;

  // ============================================================
  // Batch Operations
  // ============================================================

  /**
   * Get multiple values at once (batch)
   * @param keys - Array of cache keys
   * @returns Array of values (null for missing keys)
   */
  mget<T = any>(keys: string[]): Promise<(T | null)[]>;

  /**
   * Get multiple values with keys (batch)
   * @param keys - Array of cache keys
   * @returns Array of results with key and value
   */
  mgetWithKeys<T = any>(keys: string[]): Promise<CacheMultiGetResult<T>[]>;

  /**
   * Set multiple values at once (batch)
   * @param entries - Array of key-value pairs
   * @param ttl - Time to live in seconds
   */
  mset<T>(entries: Array<{ key: string; value: T }>, ttl?: number): Promise<void>;

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
  hset(key: string, field: string, value: any): Promise<void>;

  /**
   * Get field from hash
   * @param key - Hash key
   * @param field - Field name
   * @returns Field value or null
   */
  hget<T = any>(key: string, field: string): Promise<T | null>;

  /**
   * Get all fields from hash
   * @param key - Hash key
   * @returns All fields as object
   */
  hgetall<T = any>(key: string): Promise<Record<string, T>>;

  /**
   * Get multiple fields from hash
   * @param key - Hash key
   * @param fields - Field names
   * @returns Array of field values
   */
  hmget<T = any>(key: string, fields: string[]): Promise<(T | null)[]>;

  /**
   * Set multiple fields in hash
   * @param key - Hash key
   * @param entries - Field-value pairs
   */
  hmset(key: string, entries: Record<string, any>): Promise<void>;

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
  lpop<T = any>(key: string): Promise<T | null>;

  /**
   * Pop from right of list
   * @param key - List key
   * @returns Value or null
   */
  rpop<T = any>(key: string): Promise<T | null>;

  /**
   * Get range from list
   * @param key - List key
   * @param start - Start index
   * @param stop - Stop index
   * @returns Array of values
   */
  lrange<T = any>(key: string, start: number, stop: number): Promise<T[]>;

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
   * @returns Cache statistics
   */
  getStatistics(): Promise<CacheStatistics>;

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
}

// ============================================================
// Cache Service Implementation Interface (for DI)
// ============================================================

export const CACHE_SERVICE = 'CACHE_SERVICE';

// ============================================================
// Cache Key Builder Utility (for consistent key generation)
// ============================================================

export class CacheKeyBuilder {
  private static readonly PREFIX = 'auth:';
  private static readonly SEPARATOR = ':';
  private static readonly VERSION = 'v1';

  // ============================================================
  // User Cache Keys
  // ============================================================
  
  static user(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}${userId}`;
  }

  static userByEmail(email: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}email${this.SEPARATOR}${email.toLowerCase()}`;
  }

  static userByPhone(phone: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}phone${this.SEPARATOR}${phone}`;
  }

  static userPermissions(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}${userId}${this.SEPARATOR}permissions`;
  }

  static userRoles(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}${userId}${this.SEPARATOR}roles`;
  }

  // ============================================================
  // Session Cache Keys
  // ============================================================
  
  static session(sessionId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}session${this.SEPARATOR}${sessionId}`;
  }

  static userSessions(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}sessions${this.SEPARATOR}user${this.SEPARATOR}${userId}`;
  }

  // ============================================================
  // MFA Cache Keys
  // ============================================================
  
  static mfaSession(mfaSessionId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}mfa${this.SEPARATOR}session${this.SEPARATOR}${mfaSessionId}`;
  }

  static mfaAttempts(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}mfa${this.SEPARATOR}attempts${this.SEPARATOR}${userId}`;
  }

  // ============================================================
  // OTP Cache Keys
  // ============================================================
  
  static otp(key: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}otp${this.SEPARATOR}${key}`;
  }

  static otpAttempts(key: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}otp${this.SEPARATOR}attempts${this.SEPARATOR}${key}`;
  }

  // ============================================================
  // Rate Limit Cache Keys
  // ============================================================
  
  static rateLimit(key: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}ratelimit${this.SEPARATOR}${key}`;
  }

  static rateLimitByIp(ip: string, endpoint: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}ratelimit${this.SEPARATOR}ip${this.SEPARATOR}${ip}${this.SEPARATOR}${endpoint}`;
  }

  static rateLimitByUser(userId: string, endpoint: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}ratelimit${this.SEPARATOR}user${this.SEPARATOR}${userId}${this.SEPARATOR}${endpoint}`;
  }

  // ============================================================
  // Account Lock Cache Keys
  // ============================================================
  
  static accountLock(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}lock${this.SEPARATOR}${userId}`;
  }

  static failedAttempts(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}failed_attempts${this.SEPARATOR}${userId}`;
  }

  // ============================================================
  // Email/Phone Change Cache Keys
  // ============================================================
  
  static emailChange(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}email_change${this.SEPARATOR}${userId}`;
  }

  static phoneChange(userId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}phone_change${this.SEPARATOR}${userId}`;
  }

  // ============================================================
  // Token Blacklist
  // ============================================================
  
  static blacklistedToken(tokenId: string): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}blacklist${this.SEPARATOR}token${this.SEPARATOR}${tokenId}`;
  }

  // ============================================================
  // Generic Build Method
  // ============================================================
  
  static build(...parts: string[]): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}${parts.join(this.SEPARATOR)}`;
  }

  // ============================================================
  // Pattern Builders (for batch operations)
  // ============================================================
  
  static userPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}*`;
  }

  static sessionPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}session${this.SEPARATOR}*`;
  }

  static mfaPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}mfa${this.SEPARATOR}*`;
  }

  static otpPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}otp${this.SEPARATOR}*`;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { CacheOptions as CacheOptionsType, CacheSetOptions as CacheSetOptionsType, CacheMultiGetResult as CacheMultiGetResultType, CacheStatistics as CacheStatisticsType };
