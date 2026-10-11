/**
 * NotificationCacheRepository — Redis-backed cache for Notification read models
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Strategy: cache-aside with 5-min TTL for details, 1-min for list pages.
 * Write-through invalidation from services after mutations.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { NotificationResponseDTO, NotificationSummaryResponseDTO } from '../../../../application/dtos/responses/notification-response.dto.js';

const DETAIL_PREFIX = 'notif:detail:';
const LIST_PREFIX = 'notif:list:';
const UNREAD_PREFIX = 'notif:unread:';

@Injectable()
export class NotificationCacheRepository {
  private readonly logger = new Logger(NotificationCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══ Detail cache ═══
  async getDetail(id: string): Promise<NotificationResponseDTO | null> {
    return this.redis.get<NotificationResponseDTO>(`${DETAIL_PREFIX}${id}`);
  }

  async setDetail(id: string, dto: NotificationResponseDTO): Promise<void> {
    await this.redis.set(`${DETAIL_PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidateDetail(id: string): Promise<void> {
    await this.redis.del(`${DETAIL_PREFIX}${id}`);
  }

  // ═══ List cache ═══
  private listKey(userId: string, page: number, limit: number): string {
    return `${LIST_PREFIX}user:${userId}:p${page}:l${limit}`;
  }

  async getList(
    userId: string,
    page: number,
    limit: number,
  ): Promise<readonly NotificationSummaryResponseDTO[] | null> {
    return this.redis.get<readonly NotificationSummaryResponseDTO[]>(
      this.listKey(userId, page, limit),
    );
  }

  async setList(
    userId: string,
    page: number,
    limit: number,
    items: readonly NotificationSummaryResponseDTO[],
  ): Promise<void> {
    await this.redis.set(this.listKey(userId, page, limit), items, CACHE_TTL.ONE_MINUTE);
  }

  async invalidateList(userId: string): Promise<void> {
    this.logger.debug(`Invalidate list cache for user=${userId}`);
    await this.redis.del(`${LIST_PREFIX}user:${userId}:p*`);
  }

  // ═══ Unread count cache ═══
  async getUnreadCount(userId: string): Promise<number | null> {
    const value = await this.redis.get<number>(`${UNREAD_PREFIX}${userId}`);
    return value ?? null;
  }

  async setUnreadCount(userId: string, count: number): Promise<void> {
    await this.redis.set(`${UNREAD_PREFIX}${userId}`, count, CACHE_TTL.ONE_MINUTE);
  }

  async invalidateUnread(userId: string): Promise<void> {
    await this.redis.del(`${UNREAD_PREFIX}${userId}`);
  }

  // ═══ Bulk invalidation on any mutation ═══
  async invalidateAll(id: string, userId: string): Promise<void> {
    await Promise.all([
      this.invalidateDetail(id),
      this.invalidateList(userId),
      this.invalidateUnread(userId),
    ]);
  }
}
