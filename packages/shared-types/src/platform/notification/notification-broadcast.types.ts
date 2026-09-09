import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/src/platform/notification/notification-broadcast.constants';
import { Notification } from './notification.types';

export interface NotificationBroadcast extends BaseEntity {
  broadcastId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof NOTIFICATION_BROADCAST.STATUS | string;
  type: keyof typeof NOTIFICATION_BROADCAST.TYPES | string;
  recipients: string[];
  recipientCount: number;
  deliveredCount: number;
  failedCount: number;
  batchSize: number;
  totalBatches: number;
  currentBatch: number;
  sentAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
