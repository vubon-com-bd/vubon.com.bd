/**
 * NotificationCacheRepository — Redis cache for notifications
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Caches:
 *  - Single notification detail (5 min TTL)
 *  - User feed page 1 (1 min TTL)
 *  - Unread count per user (30 sec TTL)
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'notification:notification';
const DETAIL_KEY = (id: string) => `${PREFIX}:${id}`;
const FEED_KEY = (userId: string) => `${PREFIX}:feed:${userId}`;
const UNREAD_KEY = (userId: string) => `${PREFIX}:unread:${userId}`;

export interface NotificationCacheDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly readStatus: string;
  readonly createdAt: string;
  readonly [key: string]: unknown;
}

@Injectable()
export class NotificationCacheRepository {
  private readonly logger = new Logger(NotificationCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══════════════ Detail cache ═══════════════
  async getDetail(id: string): Promise<NotificationCacheDTO | null> {
    return this.redis.get<NotificationCacheDTO>(DETAIL_KEY(id));
  }

  async setDetail(id: string, dto: NotificationCacheDTO): Promise<void> {
    await this.redis.set(DETAIL_KEY(id), dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidateDetail(id: string): Promise<void> {
    await this.redis.del(DETAIL_KEY(id));
  }

  // ═══════════════ Feed cache ═══════════════
  async getFeed(userId: string): Promise<readonly NotificationCacheDTO[] | null> {
    return this.redis.get<readonly NotificationCacheDTO[]>(FEED_KEY(userId));
  }

  async setFeed(userId: string, items: readonly NotificationCacheDTO[]): Promise<void> {
    await this.redis.set(FEED_KEY(userId), items, CACHE_TTL.ONE_MINUTE);
  }

  async invalidateFeed(userId: string): Promise<void> {
    await this.redis.del(FEED_KEY(userId));
  }

  // ═══════════════ Unread count ═══════════════
  async getUnreadCount(userId: string): Promise<number | null> {
    return this.redis.get<number>(UNREAD_KEY(userId));
  }

  async setUnreadCount(userId: string, count: number): Promise<void> {
    await this.redis.set(UNREAD_KEY(userId), count, 30);
  }

  async invalidateUnreadCount(userId: string): Promise<void> {
    await this.redis.del(UNREAD_KEY(userId));
  }

  // ═══════════════ Bulk invalidation ═══════════════
  async invalidateAll(id: string, userId: string): Promise<void> {
    await Promise.all([
      this.invalidateDetail(id),
      this.invalidateFeed(userId),
      this.invalidateUnreadCount(userId),
    ]);
    this.logger.debug(`Cache invalidated: notification=${id} user=${userId}`);
  }
}
