/**
 * IdempotencyService — thin façade over cache repository
 * @module product-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { IdempotencyCacheRepository } from '../../persistence/cache/repositories/idempotency.cache.repository.js';

export const IDEMPOTENCY_SERVICE = Symbol('IDEMPOTENCY_SERVICE');

@Injectable()
export class IdempotencyService {
  constructor(private readonly cache: IdempotencyCacheRepository) {}

  async lookup(key: string): Promise<string | null> {
    const hit = await this.cache.get(key);
    return hit?.aggregateId ?? null;
  }

  async remember(key: string, aggregateId: string): Promise<void> {
    await this.cache.set(key, aggregateId);
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
}
