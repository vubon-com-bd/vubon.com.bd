import type { CacheEntry, CacheOptions, CacheStore } from './cache.types';

/**
 * In-memory cache manager.
 * NOTE: This is TRANSPORT cache only (GET responses).
 * App-level cache (React Query etc.) is separate.
 */
export class InMemoryCacheStore implements CacheStore {
  private readonly map = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): CacheEntry<T> | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= Date.now()) {
      this.map.delete(key);
      return undefined;
    }
    return entry as CacheEntry<T>;
  }

  set<T>(key: string, entry: CacheEntry<T>): void {
    this.map.set(key, entry as CacheEntry<unknown>);
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  keys(): readonly string[] {
    return [...this.map.keys()];
  }
}

export class CacheManager {
  constructor(private readonly store: CacheStore = new InMemoryCacheStore()) {}

  get<T>(key: string): T | undefined {
    return this.store.get<T>(key)?.value;
  }

  set<T>(key: string, value: T, options: CacheOptions): void {
    this.store.set<T>(key, {
      value,
      expiresAt: Date.now() + options.ttlMs,
      tags: options.tags ?? [],
    });
  }

  /** Invalidate every entry with the given tag. */
  invalidateByTag(tag: string): void {
    for (const key of this.store.keys()) {
      const entry = this.store.get(key);
      if (entry && entry.tags.includes(tag)) this.store.delete(key);
    }
  }

  invalidate(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

export const cacheManager = new CacheManager();
