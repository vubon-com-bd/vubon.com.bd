/**
 * IdempotencyService — thin façade over IdempotencyCacheRepository
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { IdempotencyCacheRepository } from '../../persistence/cache/repositories/idempotency.cache.repository.js';
import { PaymentIdempotencyService } from '../../../domain/services/payment-idempotency.service.js';
import { IdempotencyKeyVO } from '../../../domain/value-objects/primitives/idempotency-key.vo.js';

@Injectable()
export class IdempotencyService {
  constructor(private readonly cache: IdempotencyCacheRepository) {}

  derive(parts: {
    readonly orderId: string;
    readonly userId: string;
    readonly amount: number;
    readonly method: string;
  }): IdempotencyKeyVO {
    return PaymentIdempotencyService.deriveKey(parts);
  }

  random(): IdempotencyKeyVO {
    return PaymentIdempotencyService.random();
  }

  async lookup(key: string): Promise<string | null> {
    const hit = await this.cache.get(key);
    return hit?.paymentId ?? null;
  }

  async remember(key: string, paymentId: string): Promise<void> {
    await this.cache.set(key, paymentId);
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
