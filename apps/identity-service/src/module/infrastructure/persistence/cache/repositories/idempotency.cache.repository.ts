/**
 * Idempotency Cache Repository — distributed idempotency tracking
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'auth:idempotency:';
const LOCK_TTL_SECONDS = 30;
const RECORD_TTL_SECONDS = 24 * 60 * 60; // 24h

export interface IdempotencyRecord {
  readonly key: string;
  readonly result: string;
  readonly createdAt: string;
}

@Injectable()
export class IdempotencyCacheRepository {
  private readonly logger = new Logger(IdempotencyCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(key: string): Promise<IdempotencyRecord | null> {
    return this.redis.get<IdempotencyRecord>(`${PREFIX}${key}`);
  }

  async set(key: string, result: string): Promise<void> {
    try {
      await this.redis.set(
        `${PREFIX}${key}`,
        { key, result, createdAt: new Date().toISOString() },
        RECORD_TTL_SECONDS,
      );
    } catch (err) {
      this.logger.warn(`idempotency set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async tryLock(key: string): Promise<boolean> {
    const lockKey = `${PREFIX}lock:${key}`;
    const existing = await this.redis.exists(lockKey);
    if (existing) return false;
    await this.redis.set(lockKey, 'locked', LOCK_TTL_SECONDS);
    return true;
  }

  async releaseLock(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}lock:${key}`);
  }
}
