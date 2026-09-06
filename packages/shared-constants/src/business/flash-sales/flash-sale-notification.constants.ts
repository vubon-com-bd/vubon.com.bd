/**
 * Flash Sale Notification Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-notification.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_NOTIFICATION = {
  // Base status from common
  STATUS: STATUS,

  // Notification specific
  NOTIFICATION_CACHE_TTL: 3600,
  MAX_NOTIFICATIONS_PER_USER: 50,
  NOTIFICATION_RETENTION_DAYS: 30,

  // Notification type
  FLASH_SALE_NOTIFICATION_TYPE: {
    UPCOMING: 'upcoming',
    STARTED: 'started',
    ENDING: 'ending',
    EXTENDED: 'extended',
    CANCELLED: 'cancelled',
    SOLD_OUT: 'sold_out',
    BACK_IN_STOCK: 'back_in_stock',
    PRICE_DROP: 'price_drop',
    REMINDER: 'reminder',
  } as const,

  // Notification channel
  FLASH_SALE_NOTIFICATION_CHANNEL: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
  } as const,

  // Notification status
  FLASH_SALE_NOTIFICATION_STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Notification priority
  FLASH_SALE_NOTIFICATION_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,
} as const;

export type FlashSaleNotificationType =
  (typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_TYPE)[keyof typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_TYPE];
export type FlashSaleNotificationChannel =
  (typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_CHANNEL)[keyof typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_CHANNEL];
export type FlashSaleNotificationStatus =
  (typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_STATUS)[keyof typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_STATUS];
export type FlashSaleNotificationPriority =
  (typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_PRIORITY)[keyof typeof FLASH_SALE_NOTIFICATION.FLASH_SALE_NOTIFICATION_PRIORITY];
