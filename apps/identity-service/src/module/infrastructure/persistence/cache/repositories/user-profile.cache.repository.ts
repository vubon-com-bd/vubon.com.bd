/**
 * User Profile Cache Repository
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'identity:profile:';

@Injectable()
export class UserProfileCacheRepository {
  private readonly logger = new Logger(UserProfileCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(userId: string): Promise<unknown | null> {
    return this.redis.get(`${PREFIX}${userId}`);
  }

  async set(userId: string, data: unknown): Promise<void> {
    try {
      await this.redis.set(`${PREFIX}${userId}`, data, CACHE_TTL.FIFTEEN_MINUTES);
    } catch (err) {
      this.logger.warn(`profile cache set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${userId}`);
  }
}
