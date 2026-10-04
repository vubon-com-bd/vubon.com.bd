/**
 * IdempotencyCacheRepository — Redis-backed idempotency store
 * @module payment-service/infrastructure/persistence/cache/repositories
 *
 * Flow:
 *  - Before creating a payment, check `get(key)`.
 *  - If a payment id exists → return the same (dedup).
 *  - After create, `set(key, paymentId, ttl)`.
 *  - Locking: `tryLock(key)` reserves the key to avoid double-processing
 *    during concurrent requests.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_CONFIG } from '@vubon/shared-config/business';

const PREFIX = 'idem:payment:';
const LOCK_PREFIX = 'idem:lock:';
const LOCK_TTL_SECONDS = 30;

export interface IdempotencyEntry {
  readonly paymentId: string;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  private readonly logger = new Logger(IdempotencyCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  private ttl(): number {
    return PAYMENT_CONFIG.idempotencyTtlSeconds || CACHE_TTL.ONE_DAY;
  }

  async get(key: string): Promise<IdempotencyEntry | null> {
    return this.redis.get<IdempotencyEntry>(`${PREFIX}${key}`);
  }

  async set(key: string, paymentId: string): Promise<void> {
    const entry: IdempotencyEntry = {
      paymentId,
      createdAt: new Date().toISOString(),
    };
    await this.redis.set(`${PREFIX}${key}`, entry, this.ttl());
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async exists(key: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}${key}`);
  }

  /**
   * Try to acquire a short-lived lock on the key. Returns true if acquired.
   * Uses SET NX EX semantics via underlying ioredis client.
   */
  async tryLock(key: string): Promise<boolean> {
    const raw = this.redis.raw;
    const result = await raw.set(
      `${LOCK_PREFIX}${key}`,
      '1',
      'EX',
      LOCK_TTL_SECONDS,
      'NX',
    );
    return result === 'OK';
  }

  async releaseLock(key: string): Promise<void> {
    await this.redis.del(`${LOCK_PREFIX}${key}`);
  }
}
