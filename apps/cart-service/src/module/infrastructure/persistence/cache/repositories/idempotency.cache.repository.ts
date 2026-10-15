/**
 * IdempotencyCacheRepository — distributed idempotency tracking
 * @module cart-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'cart:idempotency:';
const LOCK_PREFIX = 'cart:idempotency:lock:';
const LOCK_TTL_SECONDS = 30;
const RECORD_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export interface IdempotencyRecord {
  readonly cartId: string;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  private readonly logger = new Logger(IdempotencyCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(key: string): Promise<IdempotencyRecord | null> {
    return this.redis.get<IdempotencyRecord>(`${PREFIX}${key}`);
  }

  async set(key: string, cartId: string): Promise<void> {
    await this.redis.set(
      `${PREFIX}${key}`,
      { cartId, createdAt: new Date().toISOString() },
      RECORD_TTL_SECONDS,
    );
    this.logger.debug(`Idempotency record saved: ${key} → ${cartId}`);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async tryLock(key: string): Promise<boolean> {
    const lockKey = `${LOCK_PREFIX}${key}`;
    const exists = await this.redis.exists(lockKey);
    if (exists) return false;
    await this.redis.set(lockKey, 'locked', LOCK_TTL_SECONDS);
    return true;
  }

  async releaseLock(key: string): Promise<void> {
    await this.redis.del(`${LOCK_PREFIX}${key}`);
  }
}
