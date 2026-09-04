/**
 * Notification Constants
 * নোটিফিকেশন সম্পর্কিত সাধারণ কনস্ট্যান্টস
 */

export const NOTIFICATION = {
  // Notification types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    SYSTEM: 'system',
    ALERT: 'alert',
  },

  // Notification channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
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

  // Notification events
  EVENTS: {
    USER_CREATED: 'user_created',
    USER_UPDATED: 'user_updated',
    USER_DELETED: 'user_deleted',
    USER_VERIFIED: 'user_verified',
    PASSWORD_CHANGED: 'password_changed',
    LOGIN: 'login',
    LOGOUT: 'logout',
    ORDER_CREATED: 'order_created',
    ORDER_UPDATED: 'order_updated',
    ORDER_COMPLETED: 'order_completed',
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_FAILED: 'payment_failed',
    SYSTEM_ALERT: 'system_alert',
    MAINTENANCE: 'maintenance',
    UPDATE_AVAILABLE: 'update_available',
  },

  // Default values
  DEFAULTS: {
    BATCH_SIZE: 100,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 5000, // 5 seconds
    EXPIRY_DAYS: 7,
    MAX_NOTIFICATIONS: 1000,
  },
} as const;

export type NotificationType = (typeof NOTIFICATION.TYPES)[keyof typeof NOTIFICATION.TYPES];
export type NotificationChannel =
  (typeof NOTIFICATION.CHANNELS)[keyof typeof NOTIFICATION.CHANNELS];
export type NotificationPriority =
  (typeof NOTIFICATION.PRIORITIES)[keyof typeof NOTIFICATION.PRIORITIES];
export type NotificationStatus = (typeof NOTIFICATION.STATUS)[keyof typeof NOTIFICATION.STATUS];
export type NotificationEvent = (typeof NOTIFICATION.EVENTS)[keyof typeof NOTIFICATION.EVENTS];
