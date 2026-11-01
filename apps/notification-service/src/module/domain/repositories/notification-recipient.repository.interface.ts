/**
 * NotificationRecipient Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const NOTIFICATION_RECIPIENT_REPOSITORY = Symbol('NOTIFICATION_RECIPIENT_REPOSITORY');

export interface NotificationRecipientRepository
  extends BaseRepository<NotificationRecipientEntity, string> {
  findByNotification(notificationId: NotificationIdVO | string): Promise<readonly NotificationRecipientEntity[]>;
  findByUser(userId: string): Promise<readonly NotificationRecipientEntity[]>;
  findByDeliveryStatus(status: string): Promise<readonly NotificationRecipientEntity[]>;
  findUndelivered(notificationId: string): Promise<readonly NotificationRecipientEntity[]>;
  countByDeliveryStatus(notificationId: string, status: string): Promise<number>;
}
