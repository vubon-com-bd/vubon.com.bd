import { BaseEntity } from '../common/base.types';
import { NOTIFICATION } from '@vubon/shared-constants/src/common/notification.constants';
import { AdminPublic } from './admin.types';

/**
 * Notification type and priority values
 */
export type AdminNotificationType = (typeof NOTIFICATION.TYPE)[keyof typeof NOTIFICATION.TYPE];
export type AdminNotificationPriority =
  (typeof NOTIFICATION.PRIORITY)[keyof typeof NOTIFICATION.PRIORITY];

/**
 * Admin notification interface
 */
export interface AdminNotification extends BaseEntity {
  notificationId: string;
  adminId: string;
  admin: AdminPublic;
  type: AdminNotificationType;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: Date;
  priority: AdminNotificationPriority;
}
