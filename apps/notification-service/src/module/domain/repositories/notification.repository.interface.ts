/**
 * Notification Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationEntity } from '@domain/entities/notification.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

// ─── DI Token ─────────────────────────────
export const NOTIFICATION_REPOSITORY = Symbol('NOTIFICATION_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface NotificationListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly category?: string;
  readonly channel?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly isRead?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

// ─── List Options ─────────────────────────
export interface NotificationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: NotificationListFilter;
}

// ─── Pagination Result ────────────────────
export interface NotificationPaginationResult {
  readonly items: readonly NotificationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface NotificationStats {
  readonly total: number;
  readonly unreadCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byChannel: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface NotificationRepository extends BaseRepository<NotificationEntity, string> {
  findByIdVO(id: NotificationIdVO): Promise<NotificationEntity | null>;
  findByUser(userId: UserIdVO | string): Promise<readonly NotificationEntity[]>;
  findByStatus(status: string): Promise<readonly NotificationEntity[]>;
  findByChannel(channel: string): Promise<readonly NotificationEntity[]>;

  findPaginated(options: NotificationListOptions): Promise<NotificationPaginationResult>;

  findUnreadForUser(userId: string, limit?: number): Promise<readonly NotificationEntity[]>;
  findScheduledBefore(cutoff: string): Promise<readonly NotificationEntity[]>;
  findExpiredBefore(cutoff: string): Promise<readonly NotificationEntity[]>;
  findStale(olderThanMinutes: number): Promise<readonly NotificationEntity[]>;
  findRetryable(maxAttempts: number): Promise<readonly NotificationEntity[]>;

  countUnreadForUser(userId: string): Promise<number>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<NotificationStats>;

  markAllAsRead(userId: string, readAt: string): Promise<number>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeOlderThan(cutoff: string): Promise<number>;
}
