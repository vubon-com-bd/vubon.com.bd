/**
 * Cache Port
 * Defines the contract for caching operations (set, get, delete, invalidate)
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface ICache {
  /**
   * Get data from cache
   * @param key - The cache key
   * @returns A promise that resolves to the cached data or null if not found
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set data in cache
   * @param key - The cache key
   * @param value - The data to cache
   * @param ttl - Time to live in seconds (optional)
   * @returns A promise that resolves when the data is cached
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Delete data from cache
   * @param key - The cache key to delete
   * @returns A promise that resolves when the data is deleted
   */
  delete(key: string): Promise<void>;

  /**
   * Invalidate cache entries matching a pattern
   * @param pattern - The pattern to match (e.g., 'user:*', 'session:*')
   * @returns A promise that resolves when the cache is invalidated
   */
  invalidate(pattern: string): Promise<void>;
}
