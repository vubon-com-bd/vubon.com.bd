/**
 * IdempotencyService — thin façade over IdempotencyCacheRepository
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { IdempotencyCacheRepository } from '../../persistence/cache/repositories/idempotency.cache.repository.js';

export const IDEMPOTENCY_SERVICE = Symbol('IDEMPOTENCY_SERVICE');

export interface IdempotencyLookup {
  readonly hit: boolean;
  readonly resultId?: string;
  readonly locked?: boolean;
}

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);

  constructor(private readonly cache: IdempotencyCacheRepository) {}

  async lookup(key: string): Promise<IdempotencyLookup> {
    const existing = await this.cache.get(key);
    if (existing) {
      return { hit: true, resultId: existing.resultId };
    }
    return { hit: false };
  }

  async remember(key: string, resultId: string): Promise<void> {
    await this.cache.set(key, resultId);
    this.logger.debug(`Idempotency recorded: ${key} → ${resultId}`);
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

  async isLocked(key: string): Promise<boolean> {
    return this.cache.isLocked(key);
  }
}
