/**
 * User Cache Repository — Redis-backed user lookup cache
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'identity:user:';

@Injectable()
export class UserCacheRepository {
  private readonly logger = new Logger(UserCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(userId: string): Promise<{ userId: string; email: string; status: string } | null> {
    return this.redis.get(`${PREFIX}${userId}`);
  }

  async set(userId: string, data: { userId: string; email: string; status: string }): Promise<void> {
    try {
      await this.redis.set(`${PREFIX}${userId}`, data, CACHE_TTL.FIFTEEN_MINUTES);
    } catch (err) {
      this.logger.warn(`user cache set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${userId}`);
  }

  async exists(userId: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}${userId}`);
  }
}
