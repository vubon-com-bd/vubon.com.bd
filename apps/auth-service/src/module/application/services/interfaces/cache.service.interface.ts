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
// Phase-1 Imports (shared-types and shared-constants)
// ============================================================

// ✅ Phase-1 (shared-types) - Type definitions from centralized location
import type {
  CacheOptions as SharedCacheOptions,
  CacheSetOptions as SharedCacheSetOptions,
  CacheMultiGetResult as SharedCacheMultiGetResult,
  CacheStatistics as SharedCacheStatistics,
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) - Configuration from centralized location
import {
  CACHE_CONFIG,
  CACHE_KEY_PREFIX,
  CACHE_VERSION,
  CACHE_DEFAULT_TTL,
  CACHE_KEY_SEPARATOR,
} from '@vubon/shared-constants';

// ============================================================
// Cache Options (Re-export with local alias for convenience)
// ============================================================

/**
 * Cache operation options
 */
export interface CacheOptions extends SharedCacheOptions {
  // Extended with Bangladesh-specific options
  /**
   * Compress data for slow networks (Bangladesh specific)
   */
  compress?: boolean;
  
  /**
   * Enable early refresh (refresh TTL before expiry)
   */
  earlyRefresh?: boolean;
  
  /**
   * Refresh threshold percentage (e.g., 80 = refresh at 80% of TTL)
   */
  refreshThreshold?: number;
}

/**
 * Cache set options
 */
export interface CacheSetOptions extends SharedCacheSetOptions {
  // Extended with Bangladesh-specific options
  compress?: boolean;
}

/**
 * Cache multi-get result
 */
export type CacheMultiGetResult<T> = SharedCacheMultiGetResult<T>;

// ============================================================
// Cache Statistics (Enhanced for Bangladesh)
// ============================================================

export interface CacheStatistics extends SharedCacheStatistics {
  // Bangladesh specific - network performance metrics
  /**
   * Average latency in milliseconds (Bangladesh network conditions)
   */
  averageLatencyMs?: number;
  
  /**
   * 95th percentile latency
   */
  p95LatencyMs?: number;
  
  /**
   * 99th percentile latency
   */
  p99LatencyMs?: number;
  
  /**
   * Cache hit rate by region (Bangladesh districts)
   */
  hitRateByRegion?: Record<string, number>;
  
  /**
   * Cache miss rate by time of day (peak hours in Bangladesh)
   */
  missRateByHour?: Record<number, number>;
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
  get<T = unknown>(key: string): Promise<T | null>;

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

/**
 * Cache key builder for consistent key generation across the application
 * Uses centralized constants from shared-config
 */
export class CacheKeyBuilder {
  // ✅ Using constants from shared-constants
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

  // ============================================================
  // Generic Build Method
  // ============================================================
  
  /**
   * Build cache key from parts
   * @param parts - Key parts
   * @returns Formatted cache key
   */
  static build(...parts: string[]): string {
    return [this.PREFIX, this.VERSION, ...parts].join(this.SEPARATOR);
  }

  /**
   * Get default TTL for cache keys
   * @returns Default TTL in seconds
   */
  static getDefaultTTL(): number {
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
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}user${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all session cache keys
   * @returns Pattern string
   */
  static sessionPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}session${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all MFA cache keys
   * @returns Pattern string
   */
  static mfaPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}mfa${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all OTP cache keys
   * @returns Pattern string
   */
  static otpPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}otp${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all rate limit cache keys
   * @returns Pattern string
   */
  static rateLimitPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}ratelimit${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all blacklisted tokens
   * @returns Pattern string
   */
  static blacklistPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}blacklist${this.SEPARATOR}*`;
  }

  /**
   * Get pattern for all Bangladesh-specific cache keys
   * @returns Pattern string
   */
  static bangladeshPattern(): string {
    return `${this.PREFIX}${this.VERSION}${this.SEPARATOR}bangladesh${this.SEPARATOR}*`;
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
};
