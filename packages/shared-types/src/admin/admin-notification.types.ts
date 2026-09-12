import { BaseEntity } from '../common/base.types';
import { NOTIFICATION } from '@vubon/shared-constants/src/common/notification.constants';

/**
 * Notification type and priority values
 */
export type AdminNotificationType = (typeof NOTIFICATION.TYPE)[keyof typeof NOTIFICATION.TYPE];
export type AdminNotificationPriority =
  (typeof NOTIFICATION.PRIORITY)[keyof typeof NOTIFICATION.PRIORITY];

/**
 * Admin notification interface
 *
 * Design notes:
 * - `adminId` only — no Admin summary embed.
 * - `isRead`/`readAt` track per-admin read state.
 */
export interface AdminNotification extends BaseEntity {
  notificationId: string;
  adminId: string;
  type: AdminNotificationType;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: Date;
  priority: AdminNotificationPriority;
}
