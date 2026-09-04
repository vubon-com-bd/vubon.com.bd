/**
 * Admin Notification Types
 * অ্যাডমিন নোটিফিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_NOTIFICATION } from '@vubon/shared-constants';

export interface AdminNotification extends BaseEntity {
  adminId: string;
  type: (typeof ADMIN_NOTIFICATION.TYPES)[keyof typeof ADMIN_NOTIFICATION.TYPES];
  priority: (typeof ADMIN_NOTIFICATION.PRIORITIES)[keyof typeof ADMIN_NOTIFICATION.PRIORITIES];
  status: (typeof ADMIN_NOTIFICATION.STATUS)[keyof typeof ADMIN_NOTIFICATION.STATUS];
  title: string;
  message: string;
  data?: Record<string, unknown>;
  readAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface AdminNotificationCreateInput {
  adminId: string;
  type: (typeof ADMIN_NOTIFICATION.TYPES)[keyof typeof ADMIN_NOTIFICATION.TYPES];
  priority?: (typeof ADMIN_NOTIFICATION.PRIORITIES)[keyof typeof ADMIN_NOTIFICATION.PRIORITIES];
  title: string;
  message: string;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface AdminNotificationUpdateInput {
  status?: (typeof ADMIN_NOTIFICATION.STATUS)[keyof typeof ADMIN_NOTIFICATION.STATUS];
  readAt?: Date;
}

export interface AdminNotificationListResponse {
  notifications: AdminNotification[];
  unreadCount: number;
  total: number;
  page: number;
  limit: number;
}
