/**
 * NotificationDelivery Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const NOTIFICATION_DELIVERY_REPOSITORY = Symbol('NOTIFICATION_DELIVERY_REPOSITORY');

export interface NotificationDeliveryRepository
  extends BaseRepository<NotificationDeliveryEntity, string> {
  findByNotification(notificationId: NotificationIdVO | string): Promise<NotificationDeliveryEntity | null>;
  findByStatus(status: string): Promise<readonly NotificationDeliveryEntity[]>;
  findRetryable(): Promise<readonly NotificationDeliveryEntity[]>;
  findStuck(olderThanMinutes: number): Promise<readonly NotificationDeliveryEntity[]>;
}
