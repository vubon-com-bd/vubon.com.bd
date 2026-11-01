/**
 * IdempotencyCacheRepository — distributed idempotency tracking
 * @module vendor-service/infrastructure/persistence/cache/repositories
 *
 * Used to prevent duplicate operations on register/payout/subscription.
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'vendor:idempotency:';
const LOCK_PREFIX = 'vendor:idempotency:lock:';
const LOCK_TTL_SECONDS = 30;
const RECORD_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export interface IdempotencyRecord {
  readonly resourceId: string;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(key: string): Promise<IdempotencyRecord | null> {
    return this.redis.get<IdempotencyRecord>(`${PREFIX}${key}`);
  }

  async set(key: string, resourceId: string): Promise<void> {
    await this.redis.set(
      `${PREFIX}${key}`,
      { resourceId, createdAt: new Date().toISOString() },
      RECORD_TTL_SECONDS,
    );
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async tryLock(key: string): Promise<boolean> {
    const lockKey = `${LOCK_PREFIX}${key}`;
    const existing = await this.redis.exists(lockKey);
    if (existing) return false;
    await this.redis.set(lockKey, 'locked', LOCK_TTL_SECONDS);
    return true;
  }

  async releaseLock(key: string): Promise<void> {
    await this.redis.del(`${LOCK_PREFIX}${key}`);
  }
}
