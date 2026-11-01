/**
 * IdempotencyCacheRepository — Redis-backed idempotency tracking
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Prevents duplicate operations on retries/double-clicks.
 * Pattern (Payment-style):
 *  - lookup(key)    → existing result id (idempotent hit)
 *  - remember(key, id) → persist for 24h
 *  - tryLock(key)   → short lock (30s) for concurrent requests
 *  - releaseLock    → unlock
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'notification:idempotency';
const RECORD_KEY = (scope: string, key: string) => `${PREFIX}:${scope}:${key}`;
const LOCK_KEY = (scope: string, key: string) => `${PREFIX}:lock:${scope}:${key}`;

const LOCK_TTL_SECONDS = 30;
const RECORD_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export type IdempotencyScope =
  | 'send'
  | 'broadcast'
  | 'digest'
  | 'webhook'
  | 'template'
  | 'device';

export interface IdempotencyRecord {
  readonly resultId: string;
  readonly scope: IdempotencyScope;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  private readonly logger = new Logger(IdempotencyCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══════════════ Record ═══════════════
  async lookup(scope: IdempotencyScope, key: string): Promise<string | null> {
    const record = await this.redis.get<IdempotencyRecord>(RECORD_KEY(scope, key));
    return record?.resultId ?? null;
  }

  async getRecord(
    scope: IdempotencyScope,
    key: string,
  ): Promise<IdempotencyRecord | null> {
    return this.redis.get<IdempotencyRecord>(RECORD_KEY(scope, key));
  }

  async remember(
    scope: IdempotencyScope,
    key: string,
    resultId: string,
  ): Promise<void> {
    await this.redis.set(
      RECORD_KEY(scope, key),
      {
        resultId,
        scope,
        createdAt: new Date().toISOString(),
      },
      RECORD_TTL_SECONDS,
    );
    this.logger.debug(`Idempotency remembered: scope=${scope} key=${key} → ${resultId}`);
  }

  async forget(scope: IdempotencyScope, key: string): Promise<void> {
    await this.redis.del(RECORD_KEY(scope, key));
  }

  // ═══════════════ Lock ═══════════════
  async tryLock(scope: IdempotencyScope, key: string): Promise<boolean> {
    const lockKey = LOCK_KEY(scope, key);
    const existing = await this.redis.exists(lockKey);
    if (existing) return false;
    await this.redis.set(lockKey, 'locked', LOCK_TTL_SECONDS);
    this.logger.debug(`Idempotency lock acquired: scope=${scope} key=${key}`);
    return true;
  }

  async releaseLock(scope: IdempotencyScope, key: string): Promise<void> {
    await this.redis.del(LOCK_KEY(scope, key));
    this.logger.debug(`Idempotency lock released: scope=${scope} key=${key}`);
  }

  async isLocked(scope: IdempotencyScope, key: string): Promise<boolean> {
    return this.redis.exists(LOCK_KEY(scope, key));
  }
}
