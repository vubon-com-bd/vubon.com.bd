/**
 * Notification System Constants
 * Defines all constants used in the notification system
 */

/**
 * Maximum size of a notification in bytes (1MB)
 */
export const NOTIFICATION_MAX_SIZE = 1048576;

/**
 * Default expiration time for notifications (7 days in seconds)
 */
export const NOTIFICATION_DEFAULT_EXPIRY = 604800;

/**
 * Default notification timeout in milliseconds (30 seconds)
 */
export const NOTIFICATION_DEFAULT_TIMEOUT = 30000;

/**
 * Rate limit for notifications per user per minute (60 notifications)
 */
export const NOTIFICATION_RATE_LIMIT = 60;

/**
 * Batch size for processing notifications (100 notifications per batch)
 */
export const NOTIFICATION_BATCH_SIZE = 100;

/**
 * Retry limit for failed notifications (3 retries)
 */
export const NOTIFICATION_RETRY_LIMIT = 3;

/**
 * Delay between retry attempts in milliseconds (5 seconds)
 */
export const NOTIFICATION_RETRY_DELAY = 5000;

/**
 * Maximum number of notifications stored per user (1000 notifications)
 */
export const NOTIFICATION_MAX_PER_USER = 1000;

/**
 * Maximum length of notification title
 */
export const NOTIFICATION_MAX_TITLE_LENGTH = 255;

/**
 * Maximum length of notification message
 */
export const NOTIFICATION_MAX_MESSAGE_LENGTH = 5000;

/**
 * Notification priority levels
 */
export enum NotificationPriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Notification types
 */
export enum NotificationTypeEnum {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/**
 * Notification delivery channels
 */
export enum NotificationChannelEnum {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms',
  IN_APP = 'in_app',
}

/**
 * Notification status
 */
export enum NotificationStatusEnum {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

/**
 * Default notification priority
 */
export const NOTIFICATION_DEFAULT_PRIORITY = NotificationPriorityLevel.MEDIUM;

/**
 * Default notification type
 */
export const NOTIFICATION_DEFAULT_TYPE = NotificationTypeEnum.INFO;

/**
 * Default notification status
 */
export const NOTIFICATION_DEFAULT_STATUS = NotificationStatusEnum.PENDING;

/**
 * Notification expiration time in different formats
 */
export const NOTIFICATION_EXPIRY_TIME = {
  SECONDS: NOTIFICATION_DEFAULT_EXPIRY,
  MINUTES: NOTIFICATION_DEFAULT_EXPIRY / 60,
  HOURS: NOTIFICATION_DEFAULT_EXPIRY / 3600,
  DAYS: NOTIFICATION_DEFAULT_EXPIRY / 86400,
};

/**
 * Notification template configuration
 */
export const NOTIFICATION_TEMPLATE_CONFIG = {
  MAX_VARIABLES: 10,
  VARIABLE_PREFIX: '{{',
  VARIABLE_SUFFIX: '}}',
  MAX_TEMPLATE_LENGTH: 10000,
};

/**
 * WebSocket configuration for real-time notifications
 */
export const NOTIFICATION_WEBSOCKET_CONFIG = {
  PING_INTERVAL: 30000,
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000,
  MAX_PAYLOAD_SIZE: 65536,
};

/**
 * Notification queue configuration
 */
export const NOTIFICATION_QUEUE_CONFIG = {
  MAX_RETRIES: NOTIFICATION_RETRY_LIMIT,
  RETRY_DELAY: NOTIFICATION_RETRY_DELAY,
  QUEUE_NAME: 'notification_queue',
  DEAD_LETTER_QUEUE: 'notification_dead_letter',
  PROCESS_TIMEOUT: 60000,
};

/**
 * Push notification specific constants
 */
export const NOTIFICATION_PUSH_CONFIG = {
  MAX_PAYLOAD_SIZE: 4096,
  TTL: 86400,
  PRIORITY: 'high',
  SOUND: 'default',
  BADGE: 1,
};

/**
 * Email notification specific constants
 */
export const NOTIFICATION_EMAIL_CONFIG = {
  MAX_SUBJECT_LENGTH: 255,
  MAX_BODY_SIZE: 1048576,
  SUPPORTED_FORMATS: ['html', 'plain'],
  DEFAULT_FORMAT: 'html',
};

/**
 * SMS notification specific constants
 */
export const NOTIFICATION_SMS_CONFIG = {
  MAX_CHARACTERS: 160,
  MAX_SEGMENTS: 10,
  SUPPORTED_COUNTRIES: ['BD', 'US', 'UK', 'IN'],
};

/**
 * In-app notification specific constants
 */
export const NOTIFICATION_IN_APP_CONFIG = {
  MAX_DISPLAY_TIME: 10000,
  ANIMATION_DURATION: 300,
  POSITIONS: ['top', 'bottom', 'center'] as const,
  DEFAULT_POSITION: 'top',
};
