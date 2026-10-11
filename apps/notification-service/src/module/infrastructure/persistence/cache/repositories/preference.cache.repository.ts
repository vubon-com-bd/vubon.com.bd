/**
 * PreferenceCacheRepository — Redis-backed cache for user notification preferences
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * This is the hottest read in the send-path. Every NotificationService.send() call
 * reads the user's preference. Cache TTL is short (5 min) with explicit
 * invalidation on any preference mutation.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { PreferenceResponseDTO } from '../../../../application/dtos/responses/preference-response.dto.js';

const PREFIX = 'pref:user:';

@Injectable()
export class PreferenceCacheRepository {
  private readonly logger = new Logger(PreferenceCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(userId: string): Promise<PreferenceResponseDTO | null> {
    return this.redis.get<PreferenceResponseDTO>(`${PREFIX}${userId}`);
  }

  async set(userId: string, dto: PreferenceResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${userId}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${userId}`);
  }

  async invalidateMany(userIds: readonly string[]): Promise<void> {
    await Promise.all(userIds.map((id) => this.invalidate(id)));
  }
}
