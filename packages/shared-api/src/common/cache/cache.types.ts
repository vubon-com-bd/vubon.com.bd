export interface CacheEntry<T> {
  readonly value: T;
  readonly expiresAt: number;
  readonly tags: readonly string[];
}

export interface CacheStore {
  get<T>(key: string): CacheEntry<T> | undefined;
  set<T>(key: string, entry: CacheEntry<T>): void;
  delete(key: string): void;
  clear(): void;
  keys(): readonly string[];
}

export interface CacheOptions {
  readonly ttlMs: number;
  readonly tags?: readonly string[];
}
