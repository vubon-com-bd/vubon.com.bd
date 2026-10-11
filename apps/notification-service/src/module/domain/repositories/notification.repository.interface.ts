/**
 * Notification Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationEntity } from '../entities/notification.entity.js';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { NotificationStatusVO } from '../value-objects/primitives/notification-status.vo.js';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';
import { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../value-objects/primitives/notification-category.vo.js';
import { ReadStatusVO } from '../value-objects/primitives/read-status.vo.js';

export const NOTIFICATION_REPOSITORY = Symbol('NOTIFICATION_REPOSITORY');

export interface NotificationListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly category?: string;
  readonly channel?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly readStatus?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
  readonly referenceType?: string;
  readonly referenceId?: string;
}

export interface NotificationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'sentAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: NotificationListFilter;
}

export interface NotificationPaginationResult {
  readonly items: readonly NotificationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface NotificationStats {
  readonly total: number;
  readonly unread: number;
  readonly byChannel: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byCategory: Readonly<Record<string, number>>;
}

export interface NotificationRepository extends BaseRepository<NotificationEntity, string> {
  findByIdVO(id: NotificationIdVO): Promise<NotificationEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly NotificationEntity[]>;
  findByStatus(status: NotificationStatusVO): Promise<readonly NotificationEntity[]>;
  findByChannel(channel: NotificationChannelVO): Promise<readonly NotificationEntity[]>;
  findByType(type: NotificationTypeVO): Promise<readonly NotificationEntity[]>;
  findByCategory(category: NotificationCategoryVO): Promise<readonly NotificationEntity[]>;
  findByReadStatus(status: ReadStatusVO): Promise<readonly NotificationEntity[]>;
  findUnreadByUserId(userId: UserIdVO): Promise<readonly NotificationEntity[]>;
  findByReference(
    referenceType: string,
    referenceId: string,
  ): Promise<readonly NotificationEntity[]>;
  findPaginated(options: NotificationListOptions): Promise<NotificationPaginationResult>;
  countUnread(userId: UserIdVO): Promise<number>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<NotificationStats>;
  /** Pending/queued notifications older than N minutes. */
  findStalePending(olderThanMinutes: number): Promise<readonly NotificationEntity[]>;
  /** Scheduled notifications whose scheduledAt is now due. */
  findDueScheduled(at?: Date): Promise<readonly NotificationEntity[]>;
  /** Failed notifications eligible for retry. */
  findRetryable(maxAttempts: number): Promise<readonly NotificationEntity[]>;
  /** Notifications whose expiresAt has passed. */
  findExpired(at?: Date): Promise<readonly NotificationEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
  markAllReadForUser(userId: UserIdVO): Promise<number>;
}
