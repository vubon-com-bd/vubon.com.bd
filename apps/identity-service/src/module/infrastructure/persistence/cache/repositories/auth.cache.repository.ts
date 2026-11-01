/**
 * Auth Cache Repository — identifier → authId mapping
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const IDENTIFIER_PREFIX = 'auth:identifier:';

@Injectable()
export class AuthCacheRepository {
  private readonly logger = new Logger(AuthCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async getAuthIdByIdentifier(identifier: string): Promise<string | null> {
    return this.redis.get<string>(`${IDENTIFIER_PREFIX}${identifier.toLowerCase()}`);
  }

  async setIdentifier(identifier: string, authId: string): Promise<void> {
    try {
      await this.redis.set(
        `${IDENTIFIER_PREFIX}${identifier.toLowerCase()}`,
        authId,
        CACHE_TTL.FIFTEEN_MINUTES,
      );
    } catch (err) {
      this.logger.warn(`auth identifier cache failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async invalidateIdentifier(identifier: string): Promise<void> {
    await this.redis.del(`${IDENTIFIER_PREFIX}${identifier.toLowerCase()}`);
  }
}
