/**
 * Rate Limiter Port - Domain Layer Interface (Enterprise Grade)
 * 
 * @module domain/ports/rate-limiter.port
 * 
 * @description
 * Port (interface) for rate limiting operations.
 * Defines the contract that infrastructure adapters (Redis, etc.) must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 * 
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Supports multiple rate limit strategies (fixed window, sliding window, token bucket, etc.)
 * ✅ Supports per-user, per-IP, per-endpoint, and custom rate limits
 * ✅ Bangladesh specific - supports district-based and operator-based rate limiting
 * 
 * @example
 * // Domain usage
 * class AuthenticationService {
 *   constructor(private readonly rateLimiter: IRateLimiter) {}
 *   
 *   async login(email: string, ipAddress: string): Promise<void> {
 *     const key = `login:${email}:${ipAddress}`;
 *     const allowed = await this.rateLimiter.allow(key, 5, 60);
 *     if (!allowed) {
 *       throw new Error('Too many login attempts');
 *     }
 *     // ... login logic
 *   }
 * }
 * 
 * // Infrastructure implementation
 * class RedisRateLimiter implements IRateLimiter {
 *   async allow(key: string, limit: number, windowSeconds: number): Promise<boolean> {
 *     const current = await this.redis.incr(key);
 *     if (current === 1) await this.redis.expire(key, windowSeconds);
 *     return current <= limit;
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Rate limit result
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Current count of requests */
  current: number;
  /** Maximum allowed requests */
  limit: number;
  /** Remaining requests in the window */
  remaining: number;
  /** Time when the rate limit resets (timestamp) */
  resetAt: Date;
  /** Time when the rate limit resets (in seconds from now) */
  resetInSeconds: number;
  /** Rate limit window in seconds */
  windowSeconds: number;
  /** Rate limit key */
  key: string;
  /** Whether the rate limit has been exceeded */
  exceeded: boolean;
  /** Time to wait before retrying (in seconds) */
  retryAfterSeconds?: number | undefined;
}

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
  /** Rate limit strategy (fixed, sliding, token-bucket) */
  strategy?: RateLimitStrategy | undefined;
  /** Whether to block requests when limit is exceeded */
  blockOnExceed?: boolean | undefined;
  /** Custom error message when limit is exceeded */
  errorMessage?: string | undefined;
  /** Custom error message in Bengali */
  errorMessageBn?: string | undefined;
  /** Retry after seconds (default: windowSeconds) */
  retryAfterSeconds?: number | undefined;
}

/**
 * Rate limit strategy enum
 */
export enum RateLimitStrategy {
  /** Fixed window - resets at fixed intervals */
  FIXED_WINDOW = 'fixed_window',
  /** Sliding window - smoother rate limiting */
  SLIDING_WINDOW = 'sliding_window',
  /** Token bucket - allows bursts */
  TOKEN_BUCKET = 'token_bucket',
  /** Leaky bucket - smooths out traffic */
  LEAKY_BUCKET = 'leaky_bucket',
}

/**
 * Rate limit scope
 */
export enum RateLimitScope {
  /** Per user ID */
  USER = 'user',
  /** Per IP address */
  IP = 'ip',
  /** Per email address */
  EMAIL = 'email',
  /** Per phone number */
  PHONE = 'phone',
  /** Per API key */
  API_KEY = 'api_key',
  /** Per device ID */
  DEVICE = 'device',
  /** Per session ID */
  SESSION = 'session',
  /** Per district (Bangladesh specific) */
  DISTRICT = 'district',
  /** Per mobile operator (Bangladesh specific) */
  OPERATOR = 'operator',
  /** Per endpoint */
  ENDPOINT = 'endpoint',
  /** Global */
  GLOBAL = 'global',
  /** Custom */
  CUSTOM = 'custom',
}

/**
 * Rate limit violation details
 */
export interface RateLimitViolation {
  /** The key that was violated */
  key: string;
  /** Current count */
  current: number;
  /** Maximum allowed */
  limit: number;
  /** Window in seconds */
  windowSeconds: number;
  /** Timestamp of violation */
  timestamp: Date;
  /** IP address of the requester */
  ipAddress?: string | undefined;
  /** User ID if available */
  userId?: string | undefined;
  /** Endpoint that was called */
  endpoint?: string | undefined;
  /** Additional context */
  context?: Record<string, unknown> | undefined;
}

// ============================================================
// Main Port Interface
// ============================================================

/**
 * Rate Limiter Port Interface
 * 
 * Defines the contract for rate limiting operations.
 * All rate limiting should go through this interface.
 * 
 * Enterprise Features:
 * ✅ Multiple rate limit strategies (fixed, sliding, token-bucket)
 * ✅ Per-user, per-IP, per-endpoint, and custom rate limits
 * ✅ Rate limit configuration and management
 * ✅ Rate limit violation tracking and blocking
 * ✅ Reset and clear rate limits
 * ✅ Batch rate limit checking
 * ✅ Bangladesh specific - district-based and operator-based rate limiting
 * 
 * @example
 * // Using the port in domain service
 * class LoginService {
 *   constructor(private readonly rateLimiter: IRateLimiter) {}
 * 
 *   async login(email: string, ipAddress: string): Promise<void> {
 *     // Check rate limit by email and IP
 *     const key = `login:${email}:${ipAddress}`;
 *     const result = await this.rateLimiter.check(key, 5, 60);
 *     
 *     if (!result.allowed) {
 *       throw new Error(`Too many login attempts. Try again in ${result.retryAfterSeconds} seconds.`);
 *     }
 *     
 *     // ... login logic
 *   }
 * }
 */
export interface IRateLimiter {
  // ============================================================
  // Basic Rate Limit Operations
  // ============================================================

  /**
   * Check if a request is allowed under the rate limit
   * 
   * @param key - Rate limit key (e.g., 'login:user@example.com')
   * @param limit - Maximum requests allowed in the window
   * @param windowSeconds - Window duration in seconds
   * @param strategy - Rate limit strategy (optional)
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.check('login:user@example.com', 5, 60);
   * if (result.allowed) {
   *   // Process request
   * } else {
   *   // Rate limited
   * }
   */
  check(
    key: string,
    limit: number,
    windowSeconds: number,
    strategy?: RateLimitStrategy,
  ): Promise<RateLimitResult>;

  /**
   * Allow a request (increment counter and check if allowed)
   * 
   * @param key - Rate limit key
   * @param limit - Maximum requests allowed in the window
   * @param windowSeconds - Window duration in seconds
   * @param strategy - Rate limit strategy (optional)
   * @returns True if request is allowed
   * 
   * @example
   * const allowed = await rateLimiter.allow('login:user@example.com', 5, 60);
   * if (allowed) {
   *   // Process request
   * }
   */
  allow(
    key: string,
    limit: number,
    windowSeconds: number,
    strategy?: RateLimitStrategy,
  ): Promise<boolean>;

  /**
   * Increment the rate limit counter without checking
   * 
   * @param key - Rate limit key
   * @param windowSeconds - Window duration in seconds
   * @param incrementBy - Amount to increment by (default: 1)
   * @returns New count
   * 
   * @example
   * const count = await rateLimiter.increment('login:user@example.com', 60);
   */
  increment(
    key: string,
    windowSeconds: number,
    incrementBy?: number,
  ): Promise<number>;

  /**
   * Get the current count for a rate limit key
   * 
   * @param key - Rate limit key
   * @returns Current count
   * 
   * @example
   * const count = await rateLimiter.get('login:user@example.com');
   */
  get(key: string): Promise<number>;

  /**
   * Get the current count and remaining time for a rate limit key
   * 
   * @param key - Rate limit key
   * @param limit - Maximum requests allowed in the window
   * @param windowSeconds - Window duration in seconds
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.getStatus('login:user@example.com', 5, 60);
   * console.log(`Remaining: ${result.remaining}, Reset in: ${result.resetInSeconds}s`);
   */
  getStatus(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;

  /**
   * Reset a rate limit counter
   * 
   * @param key - Rate limit key
   * @returns True if reset was successful
   * 
   * @example
   * await rateLimiter.reset('login:user@example.com');
   */
  reset(key: string): Promise<boolean>;

  /**
   * Delete a rate limit counter
   * 
   * @param key - Rate limit key
   * @returns True if deletion was successful
   * 
   * @example
   * await rateLimiter.delete('login:user@example.com');
   */
  delete(key: string): Promise<boolean>;

  // ============================================================
  // Advanced Rate Limit Operations
  // ============================================================

  /**
   * Check rate limit with configuration
   * 
   * @param key - Rate limit key
   * @param config - Rate limit configuration
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.checkWithConfig('login:user@example.com', {
   *   limit: 5,
   *   windowSeconds: 60,
   *   strategy: RateLimitStrategy.SLIDING_WINDOW,
   *   blockOnExceed: true,
   *   errorMessage: 'Too many login attempts',
   * });
   */
  checkWithConfig(key: string, config: RateLimitConfig): Promise<RateLimitResult>;

  /**
   * Allow a request with configuration
   * 
   * @param key - Rate limit key
   * @param config - Rate limit configuration
   * @returns True if request is allowed
   */
  allowWithConfig(key: string, config: RateLimitConfig): Promise<boolean>;

  /**
   * Check multiple rate limits at once
   * 
   * @param keys - Array of rate limit keys
   * @param limits - Array of limits for each key
   * @param windowSeconds - Window duration in seconds
   * @returns Array of rate limit results
   * 
   * @example
   * const results = await rateLimiter.checkBatch(
   *   ['user:123', 'ip:192.168.1.1'],
   *   [5, 10],
   *   60
   * );
   */
  checkBatch(
    keys: string[],
    limits: number[],
    windowSeconds: number,
  ): Promise<RateLimitResult[]>;

  /**
   * Allow multiple rate limits at once
   * 
   * @param keys - Array of rate limit keys
   * @param limits - Array of limits for each key
   * @param windowSeconds - Window duration in seconds
   * @returns Array of booleans indicating if each request is allowed
   */
  allowBatch(
    keys: string[],
    limits: number[],
    windowSeconds: number,
  ): Promise<boolean[]>;

  /**
   * Get remaining limit for a key
   * 
   * @param key - Rate limit key
   * @param limit - Maximum requests allowed in the window
   * @param windowSeconds - Window duration in seconds
   * @returns Remaining requests
   * 
   * @example
   * const remaining = await rateLimiter.getRemaining('login:user@example.com', 5, 60);
   */
  getRemaining(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<number>;

  /**
   * Get time until rate limit resets
   * 
   * @param key - Rate limit key
   * @param windowSeconds - Window duration in seconds
   * @returns Seconds until reset
   * 
   * @example
   * const seconds = await rateLimiter.getResetTime('login:user@example.com', 60);
   */
  getResetTime(key: string, windowSeconds: number): Promise<number>;

  // ============================================================
  // Rate Limit Violation Operations
  // ============================================================

  /**
   * Record a rate limit violation
   * 
   * @param violation - Rate limit violation details
   * @returns True if violation was recorded
   * 
   * @example
   * await rateLimiter.recordViolation({
   *   key: 'login:user@example.com',
   *   current: 6,
   *   limit: 5,
   *   windowSeconds: 60,
   *   timestamp: new Date(),
   *   ipAddress: '192.168.1.1',
   *   endpoint: '/auth/login',
   * });
   */
  recordViolation(violation: RateLimitViolation): Promise<boolean>;

  /**
   * Get violation history for a key
   * 
   * @param key - Rate limit key
   * @param limit - Maximum number of violations to return
   * @param offset - Offset for pagination
   * @returns Array of violations
   * 
   * @example
   * const violations = await rateLimiter.getViolations('login:user@example.com', 10, 0);
   */
  getViolations(
    key: string,
    limit?: number,
    offset?: number,
  ): Promise<RateLimitViolation[]>;

  /**
   * Get violation count for a key
   * 
   * @param key - Rate limit key
   * @param windowSeconds - Window duration in seconds
   * @returns Number of violations
   * 
   * @example
   * const count = await rateLimiter.getViolationCount('login:user@example.com', 3600);
   */
  getViolationCount(key: string, windowSeconds: number): Promise<number>;

  /**
   * Check if a key is blocked
   * 
   * @param key - Rate limit key
   * @returns True if key is blocked
   * 
   * @example
   * const blocked = await rateLimiter.isBlocked('login:user@example.com');
   */
  isBlocked(key: string): Promise<boolean>;

  /**
   * Block a key (permanently or temporarily)
   * 
   * @param key - Rate limit key
   * @param durationSeconds - Duration to block (0 for permanent)
   * @param reason - Block reason
   * @returns True if key was blocked
   * 
   * @example
   * await rateLimiter.block('login:user@example.com', 3600, 'Too many violations');
   */
  block(
    key: string,
    durationSeconds?: number,
    reason?: string,
  ): Promise<boolean>;

  /**
   * Unblock a key
   * 
   * @param key - Rate limit key
   * @returns True if key was unblocked
   * 
   * @example
   * await rateLimiter.unblock('login:user@example.com');
   */
  unblock(key: string): Promise<boolean>;

  // ============================================================
  // Rate Limit Configuration Management
  // ============================================================

  /**
   * Set rate limit configuration for a key pattern
   * 
   * @param pattern - Key pattern (e.g., 'login:*')
   * @param config - Rate limit configuration
   * @returns True if configuration was set
   * 
   * @example
   * await rateLimiter.setConfig('login:*', {
   *   limit: 5,
   *   windowSeconds: 60,
   *   strategy: RateLimitStrategy.SLIDING_WINDOW,
   * });
   */
  setConfig(pattern: string, config: RateLimitConfig): Promise<boolean>;

  /**
   * Get rate limit configuration for a key pattern
   * 
   * @param pattern - Key pattern
   * @returns Rate limit configuration or null if not found
   * 
   * @example
   * const config = await rateLimiter.getConfig('login:*');
   */
  getConfig(pattern: string): Promise<RateLimitConfig | null>;

  /**
   * Delete rate limit configuration for a key pattern
   * 
   * @param pattern - Key pattern
   * @returns True if configuration was deleted
   * 
   * @example
   * await rateLimiter.deleteConfig('login:*');
   */
  deleteConfig(pattern: string): Promise<boolean>;

  /**
   * Get all rate limit configurations
   * 
   * @returns Map of patterns to configurations
   * 
   * @example
   * const configs = await rateLimiter.getAllConfigs();
   */
  getAllConfigs(): Promise<Map<string, RateLimitConfig>>;

  // ============================================================
  // Rate Limit Statistics
  // ============================================================

  /**
   * Get statistics for a rate limit key
   * 
   * @param key - Rate limit key
   * @param windowSeconds - Window duration in seconds
   * @returns Rate limit statistics
   * 
   * @example
   * const stats = await rateLimiter.getStats('login:user@example.com', 3600);
   * console.log(`Total requests: ${stats.totalRequests}, Violations: ${stats.violations}`);
   */
  getStats(
    key: string,
    windowSeconds: number,
  ): Promise<{
    totalRequests: number;
    allowedRequests: number;
    deniedRequests: number;
    violations: number;
    averageRequestsPerSecond: number;
    peakRequestsPerSecond: number;
    lastRequestAt?: Date | undefined;
    firstRequestAt?: Date | undefined;
  }>;

  /**
   * Get global rate limit statistics
   * 
   * @param options - Filter options
   * @returns Global statistics
   * 
   * @example
   * const stats = await rateLimiter.getGlobalStats({
   *   from: new Date('2024-01-01'),
   *   to: new Date('2024-01-31'),
   * });
   */
  getGlobalStats(options?: {
    from?: Date | undefined;
    to?: Date | undefined;
    scope?: RateLimitScope | undefined;
    endpoint?: string | undefined;
  }): Promise<{
    totalRequests: number;
    totalViolations: number;
    totalBlockedKeys: number;
    averageRequestsPerSecond: number;
    peakRequestsPerSecond: number;
    topKeys: Array<{ key: string; count: number }>;
    topScopes: Array<{ scope: RateLimitScope; count: number }>;
  }>;

  // ============================================================
  // Bangladesh Specific Operations
  // ============================================================

  /**
   * Check rate limit by district (Bangladesh specific)
   * 
   * @param district - District name
   * @param limit - Maximum requests allowed
   * @param windowSeconds - Window duration in seconds
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.checkByDistrict('Dhaka', 100, 60);
   */
  checkByDistrict(
    district: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;

  /**
   * Check rate limit by mobile operator (Bangladesh specific)
   * 
   * @param operator - Mobile operator ('gp', 'robi', 'banglalink', 'teletalk')
   * @param limit - Maximum requests allowed
   * @param windowSeconds - Window duration in seconds
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.checkByOperator('gp', 50, 60);
   */
  checkByOperator(
    operator: 'gp' | 'robi' | 'banglalink' | 'teletalk',
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;

  /**
   * Check rate limit by MFS (bKash/Nagad/Rocket) phone number
   * 
   * @param phoneNumber - MFS phone number (E.164 format)
   * @param provider - MFS provider
   * @param limit - Maximum requests allowed
   * @param windowSeconds - Window duration in seconds
   * @returns Rate limit result
   * 
   * @example
   * const result = await rateLimiter.checkByMFS(
   *   '+8801712345678',
   *   'bkash',
   *   10,
   *   60
   * );
   */
  checkByMFS(
    phoneNumber: string,
    provider: 'bkash' | 'nagad' | 'rocket',
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;

  // ============================================================
  // Utility Operations
  // ============================================================

  /**
   * Clear all rate limits (for testing)
   * 
   * @returns True if cleared successfully
   * 
   * @example
   * await rateLimiter.clearAll();
   */
  clearAll(): Promise<boolean>;

  /**
   * Get rate limiter health status
   * 
   * @returns Health status
   * 
   * @example
   * const health = await rateLimiter.getHealth();
   * console.log(health.status); // 'healthy' | 'degraded' | 'unhealthy'
   */
  getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptimeMs: number;
    totalKeys: number;
    totalViolations: number;
    totalBlockedKeys: number;
    error?: string | undefined;
  }>;

  /**
   * Generate a rate limit key from context
   * 
   * @param scope - Rate limit scope
   * @param identifier - Identifier (user ID, IP, email, etc.)
   * @param prefix - Optional prefix for the key
   * @returns Rate limit key
   * 
   * @example
   * const key = rateLimiter.generateKey(
   *   RateLimitScope.USER,
   *   'user_123',
   *   'login'
   * );
   * // Returns: 'login:user:user_123'
   */
  generateKey(
    scope: RateLimitScope,
    identifier: string,
    prefix?: string,
  ): string;

  /**
   * Parse a rate limit key to get its components
   * 
   * @param key - Rate limit key
   * @returns Key components
   * 
   * @example
   * const components = rateLimiter.parseKey('login:user:user_123');
   * // Returns: { prefix: 'login', scope: 'user', identifier: 'user_123' }
   */
  parseKey(key: string): {
    prefix?: string | undefined;
    scope: RateLimitScope;
    identifier: string;
  };
}

// ============================================================
// Mock Rate Limiter (for testing) - FULLY FIXED v3
// ============================================================

export class MockRateLimiter implements IRateLimiter {
  private counters: Map<string, { count: number; expiresAt: Date }> = new Map();
  private configs: Map<string, RateLimitConfig> = new Map();
  private violations: Map<string, RateLimitViolation[]> = new Map();
  private blockedKeys: Map<string, { expiresAt?: Date | undefined; reason?: string | undefined }> = new Map();
  private startTime: Date = new Date();

  constructor(
    private readonly shouldFail: boolean = false,
    private readonly failProbability: number = 0,
    private readonly defaultLimit: number = 100,
  ) {}

  private async delay(): Promise<void> {
    // No delay in mock for speed
  }

  private shouldThrowError(): boolean {
    if (this.shouldFail) {
      return Math.random() < this.failProbability;
    }
    return false;
  }

  private getExpiresAt(windowSeconds: number): Date {
    return new Date(Date.now() + windowSeconds * 1000);
  }

  private getRemainingSeconds(expiresAt: Date): number {
    return Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  }

  private getCurrentCount(key: string): number {
    const entry = this.counters.get(key);
    if (!entry) return 0;
    if (entry.expiresAt < new Date()) {
      this.counters.delete(key);
      return 0;
    }
    return entry.count;
  }

  private incrementCount(key: string, windowSeconds: number, incrementBy: number = 1): number {
    const current = this.getCurrentCount(key);
    const newCount = current + incrementBy;
    let expiresAt = this.getExpiresAt(windowSeconds);
    
    // If key exists, keep existing expiration
    const existing = this.counters.get(key);
    if (existing && existing.expiresAt > new Date()) {
      expiresAt = existing.expiresAt;
    }
    
    this.counters.set(key, { count: newCount, expiresAt });
    return newCount;
  }

  async check(
    key: string,
    limit: number,
    windowSeconds: number,
    _strategy?: RateLimitStrategy,
  ): Promise<RateLimitResult> {
    await this.delay();

    if (this.shouldThrowError()) {
      throw new Error('Mock rate limiter error');
    }

    // Check if key is blocked
    const blocked = this.blockedKeys.get(key);
    if (blocked) {
      if (blocked.expiresAt && blocked.expiresAt > new Date()) {
        return {
          allowed: false,
          current: 0,
          limit,
          remaining: 0,
          resetAt: blocked.expiresAt,
          resetInSeconds: this.getRemainingSeconds(blocked.expiresAt),
          windowSeconds,
          key,
          exceeded: true,
          retryAfterSeconds: this.getRemainingSeconds(blocked.expiresAt),
        };
      }
      if (!blocked.expiresAt) {
        // Permanent block
        return {
          allowed: false,
          current: 0,
          limit,
          remaining: 0,
          resetAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          resetInSeconds: 365 * 24 * 60 * 60,
          windowSeconds,
          key,
          exceeded: true,
          retryAfterSeconds: 365 * 24 * 60 * 60,
        };
      }
      // Block expired
      this.blockedKeys.delete(key);
    }

    const current = this.getCurrentCount(key);
    const allowed = current < limit;
    const remaining = Math.max(0, limit - current);
    const exceedsLimit = current >= limit;
    
    const expiresAt = this.counters.get(key)?.expiresAt || this.getExpiresAt(windowSeconds);
    const resetInSeconds = this.getRemainingSeconds(expiresAt);

    return {
      allowed,
      current,
      limit,
      remaining,
      resetAt: expiresAt,
      resetInSeconds,
      windowSeconds,
      key,
      exceeded: exceedsLimit,
      retryAfterSeconds: exceedsLimit ? resetInSeconds : undefined,
    };
  }

  async allow(
    key: string,
    limit: number,
    windowSeconds: number,
    strategy?: RateLimitStrategy,
  ): Promise<boolean> {
    const result = await this.check(key, limit, windowSeconds, strategy);
    if (result.allowed) {
      this.incrementCount(key, windowSeconds);
      return true;
    }
    return false;
  }

  async increment(
    key: string,
    windowSeconds: number,
    incrementBy: number = 1,
  ): Promise<number> {
    await this.delay();
    if (this.shouldThrowError()) {
      throw new Error('Mock rate limiter error');
    }
    return this.incrementCount(key, windowSeconds, incrementBy);
  }

  async get(key: string): Promise<number> {
    await this.delay();
    return this.getCurrentCount(key);
  }

  async getStatus(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult> {
    const current = this.getCurrentCount(key);
    const expiresAt = this.counters.get(key)?.expiresAt || this.getExpiresAt(windowSeconds);
    
    return {
      allowed: current < limit,
      current,
      limit,
      remaining: Math.max(0, limit - current),
      resetAt: expiresAt,
      resetInSeconds: this.getRemainingSeconds(expiresAt),
      windowSeconds,
      key,
      exceeded: current >= limit,
    };
  }

  async reset(key: string): Promise<boolean> {
    await this.delay();
    this.counters.delete(key);
    this.blockedKeys.delete(key);
    return true;
  }

  async delete(key: string): Promise<boolean> {
    return this.reset(key);
  }

  async checkWithConfig(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
    return this.check(
      key,
      config.limit,
      config.windowSeconds,
      config.strategy,
    );
  }

  async allowWithConfig(key: string, config: RateLimitConfig): Promise<boolean> {
    return this.allow(
      key,
      config.limit,
      config.windowSeconds,
      config.strategy,
    );
  }

  async checkBatch(
    keys: string[],
    limits: number[],
    windowSeconds: number,
  ): Promise<RateLimitResult[]> {
    const results: RateLimitResult[] = [];
    for (let i = 0; i < keys.length; i++) {
      // ✅ FIXED: Properly handle undefined values with type guards
      const key = keys[i];
      const limit = limits[i];
      
      // ✅ FIXED: Use type guard to ensure key and limit are defined
      if (key && limit !== undefined) {
        const result = await this.check(key, limit, windowSeconds);
        results.push(result);
      } else {
        // Fallback for missing data
        const fallbackKey = key || 'unknown';
        const fallbackLimit = limit !== undefined ? limit : this.defaultLimit;
        const result = await this.check(fallbackKey, fallbackLimit, windowSeconds);
        results.push(result);
      }
    }
    return results;
  }

  async allowBatch(
    keys: string[],
    limits: number[],
    windowSeconds: number,
  ): Promise<boolean[]> {
    const results: boolean[] = [];
    for (let i = 0; i < keys.length; i++) {
      // ✅ FIXED: Properly handle undefined values with type guards
      const key = keys[i];
      const limit = limits[i];
      
      // ✅ FIXED: Use type guard to ensure key and limit are defined
      if (key && limit !== undefined) {
        const allowed = await this.allow(key, limit, windowSeconds);
        results.push(allowed);
      } else {
        // Fallback for missing data
        const fallbackKey = key || 'unknown';
        const fallbackLimit = limit !== undefined ? limit : this.defaultLimit;
        const allowed = await this.allow(fallbackKey, fallbackLimit, windowSeconds);
        results.push(allowed);
      }
    }
    return results;
  }

  async getRemaining(
    key: string,
    limit: number,
    _windowSeconds: number,
  ): Promise<number> {
    const current = this.getCurrentCount(key);
    return Math.max(0, limit - current);
  }

  async getResetTime(key: string, _windowSeconds: number): Promise<number> {
    const entry = this.counters.get(key);
    if (!entry) return 0;
    return this.getRemainingSeconds(entry.expiresAt);
  }

  async recordViolation(violation: RateLimitViolation): Promise<boolean> {
    await this.delay();
    if (!this.violations.has(violation.key)) {
      this.violations.set(violation.key, []);
    }
    const violations = this.violations.get(violation.key);
    if (violations) {
      violations.push(violation);
    }
    return true;
  }

  async getViolations(
    key: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<RateLimitViolation[]> {
    const violations = this.violations.get(key) || [];
    return violations.slice(offset, offset + limit);
  }

  async getViolationCount(key: string, windowSeconds: number): Promise<number> {
    const violations = this.violations.get(key) || [];
    const cutoff = new Date(Date.now() - windowSeconds * 1000);
    return violations.filter(v => v.timestamp >= cutoff).length;
  }

  async isBlocked(key: string): Promise<boolean> {
    const blocked = this.blockedKeys.get(key);
    if (!blocked) return false;
    if (blocked.expiresAt && blocked.expiresAt < new Date()) {
      this.blockedKeys.delete(key);
      return false;
    }
    return true;
  }

  async block(
    key: string,
    durationSeconds?: number,
    reason?: string,
  ): Promise<boolean> {
    await this.delay();
    const expiresAt = durationSeconds ? new Date(Date.now() + durationSeconds * 1000) : undefined;
    this.blockedKeys.set(key, { expiresAt, reason });
    return true;
  }

  async unblock(key: string): Promise<boolean> {
    await this.delay();
    this.blockedKeys.delete(key);
    return true;
  }

  async setConfig(pattern: string, config: RateLimitConfig): Promise<boolean> {
    await this.delay();
    this.configs.set(pattern, config);
    return true;
  }

  async getConfig(pattern: string): Promise<RateLimitConfig | null> {
    return this.configs.get(pattern) || null;
  }

  async deleteConfig(pattern: string): Promise<boolean> {
    await this.delay();
    this.configs.delete(pattern);
    return true;
  }

  async getAllConfigs(): Promise<Map<string, RateLimitConfig>> {
    return new Map(this.configs);
  }

  async getStats(
    key: string,
    windowSeconds: number,
  ): Promise<{
    totalRequests: number;
    allowedRequests: number;
    deniedRequests: number;
    violations: number;
    averageRequestsPerSecond: number;
    peakRequestsPerSecond: number;
    lastRequestAt?: Date | undefined;
    firstRequestAt?: Date | undefined;
  }> {
    const current = this.getCurrentCount(key);
    const violationCount = await this.getViolationCount(key, windowSeconds);
    
    return {
      totalRequests: current,
      allowedRequests: Math.max(0, current - violationCount),
      deniedRequests: violationCount,
      violations: violationCount,
      averageRequestsPerSecond: current / windowSeconds,
      peakRequestsPerSecond: current,
      lastRequestAt: new Date(),
      firstRequestAt: new Date(Date.now() - windowSeconds * 1000),
    };
  }

  async getGlobalStats(_options?: {
    from?: Date | undefined;
    to?: Date | undefined;
    scope?: RateLimitScope | undefined;
    endpoint?: string | undefined;
  }): Promise<{
    totalRequests: number;
    totalViolations: number;
    totalBlockedKeys: number;
    averageRequestsPerSecond: number;
    peakRequestsPerSecond: number;
    topKeys: Array<{ key: string; count: number }>;
    topScopes: Array<{ scope: RateLimitScope; count: number }>;
  }> {
    let totalRequests = 0;
    let totalViolations = 0;
    
    for (const [, entry] of this.counters) {
      totalRequests += entry.count;
    }
    
    for (const [, violations] of this.violations) {
      totalViolations += violations.length;
    }
    
    return {
      totalRequests,
      totalViolations,
      totalBlockedKeys: this.blockedKeys.size,
      averageRequestsPerSecond: totalRequests / 60,
      peakRequestsPerSecond: totalRequests,
      topKeys: Array.from(this.counters.entries())
        .map(([key, entry]) => ({ key, count: entry.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      topScopes: [
        { scope: RateLimitScope.IP, count: totalRequests },
        { scope: RateLimitScope.USER, count: totalRequests / 2 },
      ],
    };
  }

  async checkByDistrict(
    district: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult> {
    const key = `district:${district}`;
    return this.check(key, limit, windowSeconds);
  }

  async checkByOperator(
    operator: 'gp' | 'robi' | 'banglalink' | 'teletalk',
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult> {
    const key = `operator:${operator}`;
    return this.check(key, limit, windowSeconds);
  }

  async checkByMFS(
    phoneNumber: string,
    provider: 'bkash' | 'nagad' | 'rocket',
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult> {
    const key = `mfs:${provider}:${phoneNumber}`;
    return this.check(key, limit, windowSeconds);
  }

  async clearAll(): Promise<boolean> {
    this.counters.clear();
    this.configs.clear();
    this.violations.clear();
    this.blockedKeys.clear();
    return true;
  }

  async getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptimeMs: number;
    totalKeys: number;
    totalViolations: number;
    totalBlockedKeys: number;
    error?: string | undefined;
  }> {
    let totalViolations = 0;
    for (const [, violations] of this.violations) {
      totalViolations += violations.length;
    }

    return {
      status: 'healthy',
      uptimeMs: Date.now() - this.startTime.getTime(),
      totalKeys: this.counters.size,
      totalViolations,
      totalBlockedKeys: this.blockedKeys.size,
    };
  }

  generateKey(
    scope: RateLimitScope,
    identifier: string,
    prefix?: string,
  ): string {
    const parts: string[] = [];
    if (prefix) parts.push(prefix);
    parts.push(scope);
    parts.push(identifier);
    return parts.join(':');
  }


parseKey(key: string): {
  prefix?: string | undefined;
  scope: RateLimitScope;
  identifier: string;
} {
  const parts = key.split(':');
  
  // Check if first part is a prefix (not a known scope)
  const scopeValues = Object.values(RateLimitScope) as string[];
  let prefix: string | undefined;
  let scopeIndex = 0;
  
  // ✅ FIXED: Use parts[i] instead of parts[1]
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    // ✅ FIXED: Ensure part is defined before checking
    if (part && scopeValues.includes(part)) {
      scopeIndex = i;
      break;
    }
  }
  
  // ✅ FIXED: Ensure scopeIndex is within bounds
  if (scopeIndex > 0 && scopeIndex < parts.length) {
    prefix = parts.slice(0, scopeIndex).join(':');
  }
  
  // ✅ FIXED: Get the scope part safely
  const scopePart = parts[scopeIndex];
  // ✅ FIXED: Use fallback if scopePart is undefined
  const scope = (scopePart && scopeValues.includes(scopePart)) 
    ? scopePart as RateLimitScope 
    : RateLimitScope.CUSTOM;
  
  // ✅ FIXED: Ensure identifier is never undefined
  const identifier = parts.slice(scopeIndex + 1).join(':') || '';
  
  return {
    prefix,
    scope,
    identifier,
  };
}
}
// ============================================================
// Type Exports (for convenience)
// ============================================================

export type { IRateLimiter as RateLimiterPort };
