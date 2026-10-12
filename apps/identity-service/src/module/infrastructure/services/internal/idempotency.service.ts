/**
 * IdempotencyService — façade over IdempotencyCacheRepository
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { IdempotencyCacheRepository } from '../../persistence/cache/repositories/idempotency.cache.repository.js';

@Injectable()
export class IdempotencyService {
  constructor(private readonly cache: IdempotencyCacheRepository) {}

  async lookup(key: string): Promise<string | null> {
    const hit = await this.cache.get(key);
    return hit?.result ?? null;
  }

  async remember(key: string, result: string): Promise<void> {
    await this.cache.set(key, result);
  }

  async forget(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async tryLock(key: string): Promise<boolean> {
    return this.cache.tryLock(key);
  }

  async releaseLock(key: string): Promise<void> {
    return this.cache.releaseLock(key);
  }

  async withIdempotency<TResult>(
    key: string,
    fn: () => Promise<TResult>,
  ): Promise<TResult> {
    const cached = await this.lookup(key);
    if (cached !== null) {
      return JSON.parse(cached) as TResult;
    }
    const locked = await this.tryLock(key);
    if (!locked) {
      throw new Error('idempotency_lock_conflict');
    }
    try {
      const result = await fn();
      await this.remember(key, JSON.stringify(result));
      return result;
    } finally {
      await this.releaseLock(key);
    }
  }
}
