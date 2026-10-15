/**
 * IdempotencyService — thin façade over cache repository
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { IdempotencyCacheRepository } from '../../persistence/cache/repositories/idempotency.cache.repository.js';

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);

  constructor(private readonly cache: IdempotencyCacheRepository) {}

  async lookup(key: string): Promise<string | null> {
    const hit = await this.cache.get(key);
    return hit?.cartId ?? null;
  }

  async remember(key: string, cartId: string): Promise<void> {
    await this.cache.set(key, cartId);
    this.logger.debug(`Idempotency: ${key} → ${cartId}`);
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
