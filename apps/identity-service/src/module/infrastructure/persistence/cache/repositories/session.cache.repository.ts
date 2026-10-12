/**
 * Session Cache Repository — Redis-backed session lookup cache
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { SessionEntity } from '../../../../domain/entities/session.entity.js';

const PREFIX = 'auth:session:';

@Injectable()
export class SessionCacheRepository {
  private readonly logger = new Logger(SessionCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(sessionId: string): Promise<SessionEntity | null> {
    const cached = await this.redis.get<{ sessionId: string }>(`${PREFIX}${sessionId}`);
    if (!cached) return null;
    // Note: full entity reconstitution is not cached; only id marker
    return null;
  }

  async set(sessionId: string, entity: SessionEntity): Promise<void> {
    try {
      await this.redis.set(
        `${PREFIX}${sessionId}`,
        {
          sessionId,
          userId: entity.userId.value,
          status: entity.status.value,
          expiresAt: new Date(entity.expiry.absoluteExpiresAt * 1000).toISOString(),
        },
        CACHE_TTL.FIFTEEN_MINUTES,
      );
    } catch (err) {
      this.logger.warn(`session cache set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async invalidate(sessionId: string): Promise<void> {
    try {
      await this.redis.del(`${PREFIX}${sessionId}`);
    } catch (err) {
      this.logger.warn(`session cache invalidate failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async invalidateByUser(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}user:${userId}`);
  }

  async exists(sessionId: string): Promise<boolean> {
    return this.redis.exists(`${PREFIX}${sessionId}`);
  }
}
