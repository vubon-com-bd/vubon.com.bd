/**
 * Token Cache Repository — token revocation + freshness cache
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { TokenEntity } from '../../../../domain/entities/token.entity.js';

const PREFIX = 'auth:token:';
const REVOKED_PREFIX = 'auth:token:revoked:';

@Injectable()
export class TokenCacheRepository {
  private readonly logger = new Logger(TokenCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(jti: string): Promise<{ jti: string; userId: string; expiresAt: number } | null> {
    return this.redis.get(`${PREFIX}${jti}`);
  }

  async set(jti: string, entity: TokenEntity): Promise<void> {
    try {
      await this.redis.set(
        `${PREFIX}${jti}`,
        {
          jti,
          userId: entity.userId.value,
          expiresAt: entity.expiry.expiresAt,
        },
        CACHE_TTL.FIFTEEN_MINUTES,
      );
    } catch (err) {
      this.logger.warn(`token cache set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async markRevoked(jti: string, ttlSeconds: number): Promise<void> {
    try {
      await this.redis.set(`${REVOKED_PREFIX}${jti}`, true, ttlSeconds);
    } catch (err) {
      this.logger.warn(`token revoke cache failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async isRevoked(jti: string): Promise<boolean> {
    return this.redis.exists(`${REVOKED_PREFIX}${jti}`);
  }

  async invalidate(jti: string): Promise<void> {
    await this.redis.del(`${PREFIX}${jti}`);
  }
}
