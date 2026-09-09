import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_DIGEST } from '@vubon/shared-constants/src/platform/notification/notification-digest.constants';
import { Notification } from './notification.types';

export interface NotificationDigest extends BaseEntity {
  digestId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof NOTIFICATION_DIGEST.STATUS | string;
  type: keyof typeof NOTIFICATION_DIGEST.TYPES | string;
  notifications: string[];
  notificationCount: number;
  summary: string;
  generatedAt?: Date;
  sentAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
