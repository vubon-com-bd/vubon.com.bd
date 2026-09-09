import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-delivery-status.constants';
import { Notification } from './notification.types';

export interface NotificationDelivery extends BaseEntity {
  deliveryId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof NOTIFICATION_DELIVERY_STATUS | string;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt?: Date;
  nextAttemptAt?: Date;
  error?: string;
  metadata: Record<string, unknown>;
}
