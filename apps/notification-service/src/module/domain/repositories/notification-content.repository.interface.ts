/**
 * NotificationContent Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationContentEntity } from '@domain/entities/notification-content.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const NOTIFICATION_CONTENT_REPOSITORY = Symbol('NOTIFICATION_CONTENT_REPOSITORY');

export interface NotificationContentRepository
  extends BaseRepository<NotificationContentEntity, string> {
  findByNotification(notificationId: NotificationIdVO | string): Promise<NotificationContentEntity | null>;
  findUnrendered(): Promise<readonly NotificationContentEntity[]>;
  markRendered(id: string, renderedAt: string): Promise<void>;
}
