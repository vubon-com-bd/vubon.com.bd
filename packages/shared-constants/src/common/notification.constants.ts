/**
 * Notification Constants
 * @module shared-constants/common/notification.constants
 */

export const NOTIFICATION = {
  // Notification channels
  CHANNEL: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
  } as const,

  // Notification types
  TYPE: {
    // System
    SYSTEM: 'system',
    MAINTENANCE: 'maintenance',
    UPDATE: 'update',
    ALERT: 'alert',

    // User
    WELCOME: 'welcome',
    VERIFICATION: 'verification',
    PASSWORD_RESET: 'password_reset',
    PROFILE_UPDATE: 'profile_update',
    ACCOUNT_ACTIVITY: 'account_activity',
    SECURITY_ALERT: 'security_alert',

    // Order
    ORDER_CONFIRMATION: 'order_confirmation',
    ORDER_STATUS_UPDATE: 'order_status_update',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_CANCELLED: 'order_cancelled',
    ORDER_RETURNED: 'order_returned',

    // Payment
    PAYMENT_CONFIRMATION: 'payment_confirmation',
    PAYMENT_SUCCESS: 'payment_success',
    PAYMENT_FAILED: 'payment_failed',
    REFUND_PROCESSED: 'refund_processed',

    // Product
    PRODUCT_APPROVED: 'product_approved',
    PRODUCT_REJECTED: 'product_rejected',
    PRICE_DROP: 'price_drop',
    BACK_IN_STOCK: 'back_in_stock',

    // Marketing
    PROMOTION: 'promotion',
    OFFER: 'offer',
    DISCOUNT: 'discount',
    COUPON: 'coupon',
    NEWSLETTER: 'newsletter',

    // Support
    TICKET_CREATED: 'ticket_created',
    TICKET_UPDATED: 'ticket_updated',
    TICKET_RESOLVED: 'ticket_resolved',

    // Social
    FOLLOW: 'follow',
    LIKE: 'like',
    COMMENT: 'comment',
    SHARE: 'share',
    MENTION: 'mention',

    // Transactional
    TRANSACTION: 'transaction',
    WITHDRAWAL: 'withdrawal',
    DEPOSIT: 'deposit',
    TRANSFER: 'transfer',
  } as const,

  // Priority levels
  PRIORITY: {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    URGENT: 3,
    CRITICAL: 4,
  } as const,

  // Status
  NOTIFICATION_STATUS: {
    PENDING: 'pending',
    QUEUED: 'queued',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    BOUNCED: 'bounced',
    SPAM: 'spam',
    EXPIRED: 'expired',
  } as const,

  // Delivery settings
  DELIVERY: {
    MAX_RETRY: 3,
    RETRY_DELAY: 300, // 5 minutes
    BATCH_SIZE: 100,
    QUEUE_PREFIX: 'notification:',
    CONCURRENCY: 10,
  },

  // Rate limits
  RATE_LIMIT: {
    EMAIL: {
      PER_SECOND: 10,
      PER_MINUTE: 60,
      PER_HOUR: 1000,
      PER_DAY: 10000,
    },
    SMS: {
      PER_SECOND: 5,
      PER_MINUTE: 30,
      PER_HOUR: 500,
      PER_DAY: 5000,
    },
    PUSH: {
      PER_SECOND: 20,
      PER_MINUTE: 100,
      PER_HOUR: 2000,
      PER_DAY: 20000,
    },
  },

  // Template settings
  TEMPLATE: {
    MAX_NAME_LENGTH: 100,
    MAX_SUBJECT_LENGTH: 200,
    MAX_BODY_LENGTH: 10000,
    CACHE_TTL: 3600, // 1 hour
  },

  // Schedule
  SCHEDULE: {
    MAX_DELAY: 604800, // 7 days
    MIN_DELAY: 60, // 1 minute
    DEFAULT_DELAY: 0,
  },

  // Content limits
  CONTENT: {
    SMS_MAX_LENGTH: 160,
    EMAIL_SUBJECT_MAX: 200,
    EMAIL_BODY_MAX: 100000,
    PUSH_TITLE_MAX: 50,
    PUSH_BODY_MAX: 200,
    IN_APP_MESSAGE_MAX: 500,
  },

  // Categories
  CATEGORY: {
    TRANSACTIONAL: 'transactional',
    MARKETING: 'marketing',
    SYSTEM: 'system',
    SOCIAL: 'social',
    SUPPORT: 'support',
  } as const,

  // Actions
  ACTION: {
    VIEW: 'view',
    REPLY: 'reply',
    DELETE: 'delete',
    ARCHIVE: 'archive',
    MARK_READ: 'mark_read',
    MARK_UNREAD: 'mark_unread',
    MUTE: 'mute',
    UNMUTE: 'unmute',
  } as const,

  // Device types for push
  PUSH_DEVICE: {
    ANDROID: 'android',
    IOS: 'ios',
    WEB: 'web',
  } as const,

  // Push notification platform
  PUSH_PLATFORM: {
    FCM: 'fcm', // Firebase Cloud Messaging
    APNS: 'apns', // Apple Push Notification Service
    WEB_PUSH: 'web_push',
  } as const,
} as const;

export type NotificationChannel = (typeof NOTIFICATION.CHANNEL)[keyof typeof NOTIFICATION.CHANNEL];
export type NotificationType = (typeof NOTIFICATION.TYPE)[keyof typeof NOTIFICATION.TYPE];
export type NotificationPriority =
  (typeof NOTIFICATION.PRIORITY)[keyof typeof NOTIFICATION.PRIORITY];
export type NotificationStatusType =
  (typeof NOTIFICATION.NOTIFICATION_STATUS)[keyof typeof NOTIFICATION.NOTIFICATION_STATUS];
export type NotificationCategory =
  (typeof NOTIFICATION.CATEGORY)[keyof typeof NOTIFICATION.CATEGORY];
export type NotificationAction = (typeof NOTIFICATION.ACTION)[keyof typeof NOTIFICATION.ACTION];
export type PushDeviceType =
  (typeof NOTIFICATION.PUSH_DEVICE)[keyof typeof NOTIFICATION.PUSH_DEVICE];
export type PushPlatform =
  (typeof NOTIFICATION.PUSH_PLATFORM)[keyof typeof NOTIFICATION.PUSH_PLATFORM];
