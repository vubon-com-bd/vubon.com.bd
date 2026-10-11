/**
 * IdempotencyCacheRepository — Redis-backed idempotency store
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Flow:
 *  - Before creating → check get(key). If exists → return existing id.
 *  - After create → set(key, entityId, ttl).
 *  - Concurrent-safe: tryLock(key) reserves during processing.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'idem:notif:';
const LOCK_PREFIX = 'idem:notif:lock:';
const LOCK_TTL_SECONDS = 30;

export interface IdempotencyEntry {
  readonly notificationId: string;
  readonly channel: string;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  private readonly logger = new Logger(IdempotencyCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(key: string): Promise<IdempotencyEntry | null> {
    return this.redis.get<IdempotencyEntry>(`${PREFIX}${key}`);
  }

  async set(key: string, notificationId: string, channel: string): Promise<void> {
    const entry: IdempotencyEntry = {
      notificationId,
      channel,
      createdAt: new Date().toISOString(),
    };
    await this.redis.set(`${PREFIX}${key}`, entry, CACHE_TTL.ONE_DAY);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async exists(key: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}${key}`);
  }

  /** SET NX semantics — returns true if lock acquired. */
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
