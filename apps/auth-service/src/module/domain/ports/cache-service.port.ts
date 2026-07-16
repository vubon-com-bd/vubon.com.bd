/**
 * Cache Service Port - Domain Layer Interface (Enterprise Grade)
 *
 * @module domain/ports/cache-service.port
 *
 * @description
 * Port (interface) for cache operations.
 * Defines the contract that infrastructure adapters (Redis, Memcached, etc.) must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Supports multiple cache strategies (TTL, LRU, etc.)
 * ✅ Supports batch operations
 * ✅ Supports cache tags and invalidation patterns
 * ✅ Bangladesh specific - supports district-based caching
 *
 * @example
 * // Domain usage
 * class UserService {
 *   constructor(private readonly cacheService: ICacheService) {}
 *
 *   async getUser(id: string): Promise<User> {
 *     const cacheKey = `user:${id}`;
 *     const cached = await this.cacheService.get<User>(cacheKey);
 *     if (cached) return cached;
 *
 *     const user = await this.userRepository.findById(id);
 *     await this.cacheService.set(cacheKey, user, 3600);
 *     return user;
 *   }
 * }
 *
 * // Infrastructure implementation
 * class RedisCacheService implements ICacheService {
 *   async get<T>(key: string): Promise<T | null> {
 *     const data = await this.redis.get(key);
 *     return data ? JSON.parse(data) : null;
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Cache operation options
 */
export interface CacheOptions {
  /** Time-to-live in seconds (default: 3600) */
  ttl?: number | undefined;
  /** Cache tags for group invalidation */
  tags?: string[] | undefined;
  /** Whether to compress the value (default: false) */
  compress?: boolean | undefined;
  /** Whether to use read-through strategy */
  readThrough?: boolean | undefined;
  /** Cache key prefix override */
  prefix?: string | undefined;
  /** Cache version for versioning */
  version?: number | undefined;
  /** Namespace for cache isolation */
  namespace?: string | undefined;
  /** Whether to skip cache (for debugging) */
  skip?: boolean | undefined;
  /** Refresh TTL on read (sliding expiration) */
  refreshOnRead?: boolean | undefined;
}

/**
 * Cache result with metadata
 */
export interface CacheResult<T = unknown> {
  /** Whether the value was found in cache */
  found: boolean;
  /** The cached value (if found) */
  value?: T | undefined;
  /** Cache key used */
  key: string;
  /** Time-to-live in seconds */
  ttl: number;
  /** Cache tags associated with the value */
  tags?: string[] | undefined;
  /** Cache hit timestamp */
  hitAt?: Date | undefined;
  /** Cache expiry timestamp */
  expiresAt?: Date | undefined;
  /** Cache source (which tier) */
  source?: 'local' | 'distributed' | undefined;
}

/**
 * Cache statistics
 */
export interface CacheStatistics {
  /** Total cache hits */
  hits: number;
  /** Total cache misses */
  misses: number;
  /** Total cache sets */
  sets: number;
  /** Total cache deletes */
  deletes: number;
  /** Cache hit ratio (0-1) */
  hitRatio: number;
  /** Average latency in milliseconds */
  avgLatencyMs: number;
  /** Cache size (number of keys) */
  size: number;
  /** Memory usage in bytes */
  memoryUsageBytes?: number | undefined;
  /** Eviction count */
  evictions: number;
  /** Expired keys count */
  expired: number;
  /** Cache errors */
  errors: number;
}

/**
 * Cache health status
 */
export interface CacheHealthStatus {
  /** Cache status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Uptime in milliseconds */
  uptimeMs: number;
  /** Latency in milliseconds */
  latencyMs: number;
  /** Memory usage in bytes */
  memoryUsageBytes?: number | undefined;
  /** Number of keys */
  keyCount: number;
  /** Error message if unhealthy */
  error?: string | undefined;
}

/**
 * Cache invalidation pattern
 */
export interface InvalidationPattern {
  /** Pattern to match keys */
  pattern: string;
  /** Tags to invalidate */
  tags?: string[] | undefined;
  /** Keys to invalidate */
  keys?: string[] | undefined;
  /** Whether to invalidate recursively */
  recursive?: boolean | undefined;
}

/**
 * Cache batch operation result
 */
export interface CacheBatchResult<T = unknown> {
  /** Successful operations */
  success: Array<{ key: string; value?: T | undefined }>;
  /** Failed operations */
  failed: Array<{ key: string; error: string }>;
}

// ============================================================
// Main Port Interface
// ============================================================

/**
 * Cache Service Port Interface
 *
 * Defines the contract for cache operations.
 * All caching should go through this interface.
 *
 * Enterprise Features:
 * ✅ Get, set, delete operations with TTL
 * ✅ Batch operations (multi-get, multi-set)
 * ✅ Cache tags for group invalidation
 * ✅ Cache versioning and namespacing
 * ✅ Cache statistics and health monitoring
 * ✅ Read-through caching strategy
 * ✅ Compression support
 * ✅ Bangladesh specific - district-based cache keys
 *
 * @example
 * // Using the port in domain service
 * class OrderService {
 *   constructor(private readonly cacheService: ICacheService) {}
 *
 *   async getOrder(id: string): Promise<Order> {
 *     const key = `order:${id}`;
 *     const cached = await this.cacheService.get<Order>(key);
 *     if (cached) return cached;
 *
 *     const order = await this.orderRepository.findById(id);
 *     await this.cacheService.set(key, order, {
 *       ttl: 3600,
 *       tags: [`order:${id}`, `user:${order.userId}`]
 *     });
 *     return order;
 *   }
 * }
 */
export interface ICacheService {
  // ============================================================
  // Basic Operations
  // ============================================================

  /**
   * Get a value from cache
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns Cached value or null if not found
   *
   * @example
   * const user = await cacheService.get<User>('user:123');
   * if (user) {
   *   console.log('Cache hit!');
   * }
   */
  get<T = unknown>(key: string, options?: CacheOptions): Promise<T | null>;

  /**
   * Get a value with metadata
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns Cache result with metadata
   *
   * @example
   * const result = await cacheService.getWithMeta<User>('user:123');
   * if (result.found) {
   *   console.log(`Cache hit! Value: ${result.value}, TTL: ${result.ttl}s`);
   * }
   */
  getWithMeta<T = unknown>(key: string, options?: CacheOptions): Promise<CacheResult<T>>;

  /**
   * Set a value in cache
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options (TTL, tags, etc.)
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.set('user:123', user, {
   *   ttl: 3600,
   *   tags: ['user:123', 'users']
   * });
   */
  set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>;

  /**
   * Set a value if it doesn't exist (SETNX)
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options
   * @returns Whether value was set
   *
   * @example
   * const locked = await cacheService.setIfNotExist('lock:order:123', true, { ttl: 10 });
   * if (locked) {
   *   // Process order
   * }
   */
  setIfNotExist<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>;

  /**
   * Delete a value from cache
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.delete('user:123');
   */
  delete(key: string, options?: CacheOptions): Promise<boolean>;

  /**
   * Check if a key exists in cache
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns Whether key exists
   *
   * @example
   * const exists = await cacheService.exists('user:123');
   */
  exists(key: string, options?: CacheOptions): Promise<boolean>;

  /**
   * Get TTL for a key
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns TTL in seconds (-1 if no expiry, -2 if not found)
   *
   * @example
   * const ttl = await cacheService.getTTL('user:123');
   * console.log(`Key expires in ${ttl} seconds`);
   */
  getTTL(key: string, options?: CacheOptions): Promise<number>;

  /**
   * Update TTL for a key
   *
   * @param key - Cache key
   * @param ttl - New TTL in seconds
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.setTTL('user:123', 7200);
   */
  setTTL(key: string, ttl: number, options?: CacheOptions): Promise<boolean>;

  // ============================================================
  // Batch Operations
  // ============================================================

  /**
   * Get multiple values from cache
   *
   * @param keys - Array of cache keys
   * @param options - Cache options
   * @returns Map of key to value
   *
   * @example
   * const users = await cacheService.getMany(['user:123', 'user:456']);
   * console.log(users.get('user:123')); // User object or null
   */
  getMany<T = unknown>(keys: string[], options?: CacheOptions): Promise<Map<string, T | null>>;

  /**
   * Get multiple values with metadata
   *
   * @param keys - Array of cache keys
   * @param options - Cache options
   * @returns Map of key to cache result
   */
  getManyWithMeta<T = unknown>(
    keys: string[],
    options?: CacheOptions,
  ): Promise<Map<string, CacheResult<T>>>;

  /**
   * Set multiple values in cache
   *
   * @param entries - Map of key to value
   * @param options - Cache options (applied to all)
   * @returns Batch operation result
   *
   * @example
   * await cacheService.setMany(new Map([
   *   ['user:123', user1],
   *   ['user:456', user2]
   * ]), { ttl: 3600 });
   */
  setMany<T>(entries: Map<string, T>, options?: CacheOptions): Promise<CacheBatchResult>;

  /**
   * Delete multiple values from cache
   *
   * @param keys - Array of cache keys
   * @param options - Cache options
   * @returns Number of keys deleted
   *
   * @example
   * const deleted = await cacheService.deleteMany(['user:123', 'user:456']);
   */
  deleteMany(keys: string[], options?: CacheOptions): Promise<number>;

  // ============================================================
  // Cache Tag Operations
  // ============================================================

  /**
   * Set a value with tags
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param tags - Array of tags
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.setWithTags('user:123', user, ['user:123', 'users']);
   */
  setWithTags<T>(key: string, value: T, tags: string[], options?: CacheOptions): Promise<boolean>;

  /**
   * Invalidate cache by tag
   *
   * @param tag - Cache tag
   * @param options - Cache options
   * @returns Number of keys invalidated
   *
   * @example
   * // Invalidate all user-related caches
   * const count = await cacheService.invalidateByTag('users');
   */
  invalidateByTag(tag: string, options?: CacheOptions): Promise<number>;

  /**
   * Invalidate cache by multiple tags
   *
   * @param tags - Array of tags
   * @param options - Cache options
   * @returns Total number of keys invalidated
   *
   * @example
   * const count = await cacheService.invalidateByTags(['user:123', 'order:456']);
   */
  invalidateByTags(tags: string[], options?: CacheOptions): Promise<number>;

  /**
   * Get all keys with a specific tag
   *
   * @param tag - Cache tag
   * @param options - Cache options
   * @returns Array of keys
   *
   * @example
   * const keys = await cacheService.getKeysByTag('users');
   */
  getKeysByTag(tag: string, options?: CacheOptions): Promise<string[]>;

  // ============================================================
  // Pattern-Based Operations
  // ============================================================

  /**
   * Find keys matching a pattern
   *
   * @param pattern - Key pattern (e.g., 'user:*')
   * @param options - Cache options
   * @returns Array of matching keys
   *
   * @example
   * const keys = await cacheService.findKeys('user:*');
   */
  findKeys(pattern: string, options?: CacheOptions): Promise<string[]>;

  /**
   * Delete all keys matching a pattern
   *
   * @param pattern - Key pattern
   * @param options - Cache options
   * @returns Number of keys deleted
   *
   * @example
   * const count = await cacheService.deleteByPattern('session:*');
   */
  deleteByPattern(pattern: string, options?: CacheOptions): Promise<number>;

  /**
   * Invalidate cache by pattern
   *
   * @param pattern - Invalidation pattern
   * @param options - Cache options
   * @returns Number of keys invalidated
   *
   * @example
   * const count = await cacheService.invalidateByPattern({
   *   pattern: 'user:*',
   *   tags: ['users']
   * });
   */
  invalidateByPattern(pattern: InvalidationPattern, options?: CacheOptions): Promise<number>;

  // ============================================================
  // Cache Version & Namespace Operations
  // ============================================================

  /**
   * Increment cache version for a namespace
   *
   * @param namespace - Cache namespace
   * @param options - Cache options
   * @returns New version number
   *
   * @example
   * // Invalidate all caches in 'users' namespace
   * const version = await cacheService.incrementVersion('users');
   */
  incrementVersion(namespace: string, options?: CacheOptions): Promise<number>;

  /**
   * Get current version for a namespace
   *
   * @param namespace - Cache namespace
   * @param options - Cache options
   * @returns Current version number
   *
   * @example
   * const version = await cacheService.getVersion('users');
   */
  getVersion(namespace: string, options?: CacheOptions): Promise<number>;

  /**
   * Clear entire namespace
   *
   * @param namespace - Cache namespace
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.clearNamespace('users');
   */
  clearNamespace(namespace: string, options?: CacheOptions): Promise<boolean>;

  // ============================================================
  // Cache Statistics & Monitoring
  // ============================================================

  /**
   * Get cache statistics
   *
   * @param options - Cache options
   * @returns Cache statistics
   *
   * @example
   * const stats = await cacheService.getStatistics();
   * console.log(`Hit ratio: ${stats.hitRatio}`);
   */
  getStatistics(options?: CacheOptions): Promise<CacheStatistics>;

  /**
   * Get cache health status
   *
   * @param options - Cache options
   * @returns Health status
   *
   * @example
   * const health = await cacheService.getHealth();
   * if (health.status === 'unhealthy') {
   *   alert('Cache service is down!');
   * }
   */
  getHealth(options?: CacheOptions): Promise<CacheHealthStatus>;

  /**
   * Reset cache statistics
   *
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.resetStatistics();
   */
  resetStatistics(options?: CacheOptions): Promise<boolean>;

  /**
   * Clear all cache
   *
   * @param options - Cache options
   * @returns Whether operation was successful
   *
   * @example
   * await cacheService.clear();
   */
  clear(options?: CacheOptions): Promise<boolean>;

  // ============================================================
  // Atomic Operations
  // ============================================================

  /**
   * Increment a numeric value
   *
   * @param key - Cache key
   * @param incrementBy - Amount to increment by (default: 1)
   * @param options - Cache options
   * @returns New value
   *
   * @example
   * const count = await cacheService.increment('counter', 1);
   */
  increment(key: string, incrementBy?: number, options?: CacheOptions): Promise<number>;

  /**
   * Decrement a numeric value
   *
   * @param key - Cache key
   * @param decrementBy - Amount to decrement by (default: 1)
   * @param options - Cache options
   * @returns New value
   *
   * @example
   * const count = await cacheService.decrement('counter', 1);
   */
  decrement(key: string, decrementBy?: number, options?: CacheOptions): Promise<number>;

  /**
   * Get and set a value atomically
   *
   * @param key - Cache key
   * @param value - New value
   * @param options - Cache options
   * @returns Old value
   *
   * @example
   * const oldValue = await cacheService.getAndSet('user:123', newUser);
   */
  getAndSet<T = unknown>(key: string, value: T, options?: CacheOptions): Promise<T | null>;

  // ============================================================
  // Bangladesh Specific Operations
  // ============================================================

  /**
   * Generate cache key for district (Bangladesh specific)
   *
   * @param district - District name
   * @param prefix - Optional prefix
   * @returns Cache key
   *
   * @example
   * const key = cacheService.generateDistrictKey('Dhaka', 'user');
   * // Returns: 'district:Dhaka:user'
   */
  generateDistrictKey(district: string, prefix?: string): string;

  /**
   * Generate cache key for mobile operator (Bangladesh specific)
   *
   * @param operator - Mobile operator ('gp', 'robi', 'banglalink', 'teletalk')
   * @param prefix - Optional prefix
   * @returns Cache key
   *
   * @example
   * const key = cacheService.generateOperatorKey('gp', 'session');
   * // Returns: 'operator:gp:session'
   */
  generateOperatorKey(operator: 'gp' | 'robi' | 'banglalink' | 'teletalk', prefix?: string): string;

  /**
   * Generate cache key for MFS (Bangladesh specific)
   *
   * @param provider - MFS provider ('bkash', 'nagad', 'rocket')
   * @param phoneNumber - Phone number
   * @param prefix - Optional prefix
   * @returns Cache key
   *
   * @example
   * const key = cacheService.generateMFSKey('bkash', '+8801712345678', 'otp');
   * // Returns: 'mfs:bkash:+8801712345678:otp'
   */
  generateMFSKey(
    provider: 'bkash' | 'nagad' | 'rocket',
    phoneNumber: string,
    prefix?: string,
  ): string;

  // ============================================================
  // Utility Operations
  // ============================================================

  /**
   * Get cache key with proper prefix and namespace
   *
   * @param key - Cache key
   * @param options - Cache options
   * @returns Formatted cache key
   *
   * @example
   * const formattedKey = cacheService.formatKey('user:123', { namespace: 'auth' });
   * // Returns: 'auth:user:123'
   */
  formatKey(key: string, options?: CacheOptions): string;

  /**
   * Generate a cache key from parts
   *
   * @param parts - Key parts
   * @returns Joined key
   *
   * @example
   * const key = cacheService.joinKeys('user', '123', 'profile');
   * // Returns: 'user:123:profile'
   */
  joinKeys(...parts: string[]): string;

  /**
   * Parse a cache key into parts
   *
   * @param key - Cache key
   * @returns Array of key parts
   *
   * @example
   * const parts = cacheService.splitKeys('user:123:profile');
   * // Returns: ['user', '123', 'profile']
   */
  splitKeys(key: string): string[];
}

// ============================================================
// Mock Cache Service (for testing)
// ============================================================

export class MockCacheService implements ICacheService {
  private cache: Map<string, { value: any; expiresAt: Date; tags: string[] }> = new Map();
  private tagIndex: Map<string, Set<string>> = new Map();
  private versions: Map<string, number> = new Map();
  private statistics: CacheStatistics = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    hitRatio: 0,
    avgLatencyMs: 0,
    size: 0,
    evictions: 0,
    expired: 0,
    errors: 0,
  };
  private startTime: Date = new Date();

  constructor(
    private readonly shouldFail: boolean = false,
    private readonly failProbability: number = 0,
    private readonly defaultTTL: number = 3600,
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

  private getExpiresAt(ttl: number): Date {
    return new Date(Date.now() + ttl * 1000);
  }

  private getRemainingSeconds(expiresAt: Date): number {
    return Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  }

  private isExpired(expiresAt: Date): boolean {
    return expiresAt < new Date();
  }

  private cleanExpired(): void {
    for (const [key, entry] of this.cache) {
      if (this.isExpired(entry.expiresAt)) {
        this.cache.delete(key);
        this.statistics.expired++;
      }
    }
  }

  private getTags(key: string): string[] {
    const entry = this.cache.get(key);
    return entry ? entry.tags : [];
  }

  private addToTagIndex(key: string, tags: string[]): void {
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag)!.add(key);
    }
  }

  private removeFromTagIndex(key: string, tags: string[]): void {
    for (const tag of tags) {
      const keys = this.tagIndex.get(tag);
      if (keys) {
        keys.delete(key);
        if (keys.size === 0) {
          this.tagIndex.delete(tag);
        }
      }
    }
  }

  async get<T = unknown>(key: string, options?: CacheOptions): Promise<T | null> {
    await this.delay();

    if (this.shouldThrowError()) {
      throw new Error('Mock cache service error');
    }

    const formattedKey = this.formatKey(key, options);
    this.cleanExpired();

    const entry = this.cache.get(formattedKey);
    if (!entry) {
      this.statistics.misses++;
      this.statistics.hitRatio = this.calculateHitRatio();
      return null;
    }

    if (this.isExpired(entry.expiresAt)) {
      this.cache.delete(formattedKey);
      this.statistics.misses++;
      this.statistics.expired++;
      this.statistics.hitRatio = this.calculateHitRatio();
      return null;
    }

    // Refresh TTL if requested
    if (options?.refreshOnRead) {
      const ttl = options.ttl || this.defaultTTL;
      entry.expiresAt = this.getExpiresAt(ttl);
      this.cache.set(formattedKey, entry);
    }

    this.statistics.hits++;
    this.statistics.hitRatio = this.calculateHitRatio();
    return entry.value as T;
  }

  async getWithMeta<T = unknown>(key: string, options?: CacheOptions): Promise<CacheResult<T>> {
    const value = await this.get<T>(key, options);
    const formattedKey = this.formatKey(key, options);
    const entry = this.cache.get(formattedKey);
    const ttl = entry ? this.getRemainingSeconds(entry.expiresAt) : 0;
    const tags = entry ? this.getTags(formattedKey) : []; // ✅ Now used

    return {
      found: value !== null,
      value: value !== null ? value : undefined,
      key: formattedKey,
      ttl,
      tags,
      hitAt: entry ? new Date() : undefined,
      expiresAt: entry ? entry.expiresAt : undefined,
    };
  }

  async set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    await this.delay();

    if (this.shouldThrowError()) {
      throw new Error('Mock cache service error');
    }

    const formattedKey = this.formatKey(key, options);
    const ttl = options?.ttl || this.defaultTTL;
    const tags = options?.tags || [];

    // Remove old entry from tag index
    const oldEntry = this.cache.get(formattedKey);
    if (oldEntry) {
      this.removeFromTagIndex(formattedKey, oldEntry.tags);
    }

    const expiresAt = this.getExpiresAt(ttl);
    this.cache.set(formattedKey, { value, expiresAt, tags });
    this.addToTagIndex(formattedKey, tags);

    this.statistics.sets++;
    this.statistics.size = this.cache.size;
    return true;
  }

  async setIfNotExist<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    const formattedKey = this.formatKey(key, options);
    if (await this.exists(formattedKey, options)) {
      return false;
    }
    return this.set(key, value, options);
  }

  async delete(key: string, options?: CacheOptions): Promise<boolean> {
    await this.delay();

    if (this.shouldThrowError()) {
      throw new Error('Mock cache service error');
    }

    const formattedKey = this.formatKey(key, options);
    const entry = this.cache.get(formattedKey);
    if (entry) {
      this.removeFromTagIndex(formattedKey, entry.tags);
    }

    const deleted = this.cache.delete(formattedKey);
    if (deleted) {
      this.statistics.deletes++;
      this.statistics.size = this.cache.size;
    }
    return deleted;
  }

  async exists(key: string, options?: CacheOptions): Promise<boolean> {
    await this.delay();
    const formattedKey = this.formatKey(key, options);
    this.cleanExpired();
    return this.cache.has(formattedKey);
  }

  async getTTL(key: string, options?: CacheOptions): Promise<number> {
    const formattedKey = this.formatKey(key, options);
    const entry = this.cache.get(formattedKey);
    if (!entry) return -2;
    if (this.isExpired(entry.expiresAt)) {
      this.cache.delete(formattedKey);
      return -2;
    }
    return this.getRemainingSeconds(entry.expiresAt);
  }

  async setTTL(key: string, ttl: number, options?: CacheOptions): Promise<boolean> {
    const formattedKey = this.formatKey(key, options);
    const entry = this.cache.get(formattedKey);
    if (!entry) return false;
    entry.expiresAt = this.getExpiresAt(ttl);
    this.cache.set(formattedKey, entry);
    return true;
  }

  async getMany<T = unknown>(
    keys: string[],
    options?: CacheOptions,
  ): Promise<Map<string, T | null>> {
    const result = new Map<string, T | null>();
    for (const key of keys) {
      const value = await this.get<T>(key, options);
      result.set(key, value);
    }
    return result;
  }

  async getManyWithMeta<T = unknown>(
    keys: string[],
    options?: CacheOptions,
  ): Promise<Map<string, CacheResult<T>>> {
    const result = new Map<string, CacheResult<T>>();
    for (const key of keys) {
      const meta = await this.getWithMeta<T>(key, options);
      result.set(key, meta);
    }
    return result;
  }

  async setMany<T>(entries: Map<string, T>, options?: CacheOptions): Promise<CacheBatchResult> {
    const result: CacheBatchResult = { success: [], failed: [] };
    for (const [key, value] of entries) {
      try {
        const success = await this.set(key, value, options);
        if (success) {
          result.success.push({ key, value });
        } else {
          result.failed.push({ key, error: 'Set operation failed' });
        }
      } catch (error) {
        result.failed.push({ key, error: (error as Error).message });
      }
    }
    return result;
  }

  async deleteMany(keys: string[], options?: CacheOptions): Promise<number> {
    let count = 0;
    for (const key of keys) {
      const deleted = await this.delete(key, options);
      if (deleted) count++;
    }
    return count;
  }

  async setWithTags<T>(
    key: string,
    value: T,
    tags: string[],
    options?: CacheOptions,
  ): Promise<boolean> {
    return this.set(key, value, { ...options, tags });
  }

  async invalidateByTag(tag: string, options?: CacheOptions): Promise<number> {
    const keys = this.tagIndex.get(tag);
    if (!keys) return 0;

    const keysArray = Array.from(keys);
    let count = 0;
    for (const key of keysArray) {
      const deleted = await this.delete(key, options);
      if (deleted) count++;
    }
    return count;
  }

  async invalidateByTags(tags: string[], options?: CacheOptions): Promise<number> {
    let total = 0;
    for (const tag of tags) {
      total += await this.invalidateByTag(tag, options);
    }
    return total;
  }

  async getKeysByTag(tag: string, _options?: CacheOptions): Promise<string[]> {
    const keys = this.tagIndex.get(tag);
    return keys ? Array.from(keys) : [];
  }

  async findKeys(pattern: string, _options?: CacheOptions): Promise<string[]> {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    const keys: string[] = [];
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  async deleteByPattern(pattern: string, options?: CacheOptions): Promise<number> {
    const keys = await this.findKeys(pattern, options);
    let count = 0;
    for (const key of keys) {
      const deleted = await this.delete(key, options);
      if (deleted) count++;
    }
    return count;
  }

  async invalidateByPattern(pattern: InvalidationPattern, options?: CacheOptions): Promise<number> {
    let count = 0;
    if (pattern.keys) {
      count += await this.deleteMany(pattern.keys, options);
    }
    if (pattern.tags) {
      count += await this.invalidateByTags(pattern.tags, options);
    }
    if (pattern.pattern) {
      count += await this.deleteByPattern(pattern.pattern, options);
    }
    return count;
  }

  async incrementVersion(namespace: string, _options?: CacheOptions): Promise<number> {
    const current = this.versions.get(namespace) || 0;
    const next = current + 1;
    this.versions.set(namespace, next);
    return next;
  }

  async getVersion(namespace: string, _options?: CacheOptions): Promise<number> {
    return this.versions.get(namespace) || 0;
  }

  async clearNamespace(namespace: string, options?: CacheOptions): Promise<boolean> {
    const keys = await this.findKeys(`${namespace}:*`, options);
    await this.deleteMany(keys, options);
    this.versions.delete(namespace);
    return true;
  }

  async getStatistics(_options?: CacheOptions): Promise<CacheStatistics> {
    this.cleanExpired();
    this.statistics.size = this.cache.size;
    this.statistics.hitRatio = this.calculateHitRatio();
    return { ...this.statistics };
  }

  async getHealth(_options?: CacheOptions): Promise<CacheHealthStatus> {
    return {
      status: 'healthy',
      uptimeMs: Date.now() - this.startTime.getTime(),
      latencyMs: 1,
      keyCount: this.cache.size,
    };
  }

  async resetStatistics(_options?: CacheOptions): Promise<boolean> {
    this.statistics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      hitRatio: 0,
      avgLatencyMs: 0,
      size: 0,
      evictions: 0,
      expired: 0,
      errors: 0,
    };
    return true;
  }

  async clear(_options?: CacheOptions): Promise<boolean> {
    this.cache.clear();
    this.tagIndex.clear();
    this.versions.clear();
    this.statistics.size = 0;
    return true;
  }

  async increment(key: string, incrementBy: number = 1, options?: CacheOptions): Promise<number> {
    const formattedKey = this.formatKey(key, options);
    const current = await this.get<number>(formattedKey, options);
    const newValue = (current || 0) + incrementBy;
    await this.set(formattedKey, newValue, options);
    return newValue;
  }

  async decrement(key: string, decrementBy: number = 1, options?: CacheOptions): Promise<number> {
    return this.increment(key, -decrementBy, options);
  }

  async getAndSet<T = unknown>(key: string, value: T, options?: CacheOptions): Promise<T | null> {
    const oldValue = await this.get<T>(key, options);
    await this.set(key, value, options);
    return oldValue;
  }

  generateDistrictKey(district: string, prefix?: string): string {
    return prefix ? `district:${district}:${prefix}` : `district:${district}`;
  }

  generateOperatorKey(
    operator: 'gp' | 'robi' | 'banglalink' | 'teletalk',
    prefix?: string,
  ): string {
    return prefix ? `operator:${operator}:${prefix}` : `operator:${operator}`;
  }

  generateMFSKey(
    provider: 'bkash' | 'nagad' | 'rocket',
    phoneNumber: string,
    prefix?: string,
  ): string {
    return prefix ? `mfs:${provider}:${phoneNumber}:${prefix}` : `mfs:${provider}:${phoneNumber}`;
  }

  formatKey(key: string, options?: CacheOptions): string {
    let formattedKey = key;
    if (options?.namespace) {
      formattedKey = `${options.namespace}:${formattedKey}`;
    }
    if (options?.prefix) {
      formattedKey = `${options.prefix}:${formattedKey}`;
    }
    if (options?.version !== undefined) {
      formattedKey = `${formattedKey}:v${options.version}`;
    }
    return formattedKey;
  }

  joinKeys(...parts: string[]): string {
    return parts.filter((part) => part !== '').join(':');
  }

  splitKeys(key: string): string[] {
    return key.split(':');
  }

  private calculateHitRatio(): number {
    const total = this.statistics.hits + this.statistics.misses;
    return total === 0 ? 0 : this.statistics.hits / total;
  }
}

// ============================================================
// Type Exports (for convenience)
// ============================================================

export type { ICacheService as CacheServicePort };
