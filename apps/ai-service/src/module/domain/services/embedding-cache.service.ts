export interface CacheEntry<T> {
  readonly key: string;
  readonly value: T;
  readonly expiresAt: number;
}

export class EmbeddingCacheService<T = readonly number[]> {
  private readonly store = new Map<string, CacheEntry<T>>();

  private buildKey(sourceId: string, model: string): string {
    return `${model}:${sourceId}`;
  }

  get(sourceId: string, model: string): T | null {
    const key = this.buildKey(sourceId, model);
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  set(sourceId: string, model: string, value: T, ttlSeconds: number): void {
    const key = this.buildKey(sourceId, model);
    this.store.set(key, {
      key,
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  invalidate(sourceId: string, model: string): void {
    this.store.delete(this.buildKey(sourceId, model));
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }
}
