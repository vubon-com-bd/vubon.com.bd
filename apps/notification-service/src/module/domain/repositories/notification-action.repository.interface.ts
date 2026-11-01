/**
 * NotificationAction Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationActionEntity } from '@domain/entities/notification-action.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const NOTIFICATION_ACTION_REPOSITORY = Symbol('NOTIFICATION_ACTION_REPOSITORY');

export interface NotificationActionRepository
  extends BaseRepository<NotificationActionEntity, string> {
  findByNotification(notificationId: NotificationIdVO | string): Promise<readonly NotificationActionEntity[]>;
  findTriggered(notificationId: string): Promise<readonly NotificationActionEntity[]>;
  findUntriggered(notificationId: string): Promise<readonly NotificationActionEntity[]>;
  recordTrigger(id: string, by: string, at: string): Promise<void>;
}
