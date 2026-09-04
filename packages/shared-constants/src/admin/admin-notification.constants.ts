/**
 * Admin Notification Constants
 * অ্যাডমিন নোটিফিকেশন সম্পর্কিত কনস্ট্যান্টস
 */

import { NOTIFICATION } from '../common';

export const ADMIN_NOTIFICATION = {
  ...NOTIFICATION,

  // Notification types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    SYSTEM: 'system',
    ALERT: 'alert',
  },

  // Notification priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    CRITICAL: 'critical',
  },

  // Notification status
  STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },

  // Default values
  DEFAULTS: {
    BATCH_SIZE: 100,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 5000,
    EXPIRY_DAYS: 7,
  },
} as const;

export type AdminNotificationType =
  (typeof ADMIN_NOTIFICATION.TYPES)[keyof typeof ADMIN_NOTIFICATION.TYPES];
export type AdminNotificationPriority =
  (typeof ADMIN_NOTIFICATION.PRIORITIES)[keyof typeof ADMIN_NOTIFICATION.PRIORITIES];
export type AdminNotificationStatus =
  (typeof ADMIN_NOTIFICATION.STATUS)[keyof typeof ADMIN_NOTIFICATION.STATUS];
