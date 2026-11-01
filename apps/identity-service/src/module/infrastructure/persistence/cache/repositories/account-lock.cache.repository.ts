/**
 * Account Lock Cache Repository — quick lock-status lookup
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'auth:lock:';

export interface LockCacheEntry {
  readonly userId: string;
  readonly reason: string;
  readonly lockedUntil: string;
  readonly lockedAt: string;
}

@Injectable()
export class AccountLockCacheRepository {
  private readonly logger = new Logger(AccountLockCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(userId: string): Promise<LockCacheEntry | null> {
    return this.redis.get<LockCacheEntry>(`${PREFIX}${userId}`);
  }

  async set(entry: LockCacheEntry): Promise<void> {
    try {
      const ttlSeconds = Math.max(
        60,
        Math.floor((Date.parse(entry.lockedUntil) - Date.now()) / 1000),
      );
      await this.redis.set(`${PREFIX}${entry.userId}`, entry, ttlSeconds);
    } catch (err) {
      this.logger.warn(`lock cache set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async isLocked(userId: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}${userId}`);
  }

  async clear(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${userId}`);
  }
}
