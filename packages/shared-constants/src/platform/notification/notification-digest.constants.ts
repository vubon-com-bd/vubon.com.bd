export const NOTIFICATION_DIGEST_FREQUENCY = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
} as const;

export const NOTIFICATION_DIGEST_TYPE = {
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  CATEGORIZED: 'categorized',
  PRIORITY_BASED: 'priority_based',
} as const;

export const NOTIFICATION_DIGEST_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  READY: 'ready',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const NOTIFICATION_DIGEST = {
  DEFAULT_FREQUENCY: NOTIFICATION_DIGEST_FREQUENCY.DAILY,
  DEFAULT_SEND_HOUR: 9,
  TIMEZONE_DEFAULT: 'Asia/Dhaka',
  MAX_ITEMS_PER_DIGEST: 50,
  MIN_ITEMS_TO_SEND: 1,
  INCLUDE_UNREAD_ONLY: false,
  GROUP_BY_CATEGORY: true,
  ALLOW_CUSTOM_TIME: true,
  RETENTION_DAYS: 90,
} as const;

export type NotificationDigestFrequencyType =
  (typeof NOTIFICATION_DIGEST_FREQUENCY)[keyof typeof NOTIFICATION_DIGEST_FREQUENCY];
export type NotificationDigestTypeType =
  (typeof NOTIFICATION_DIGEST_TYPE)[keyof typeof NOTIFICATION_DIGEST_TYPE];
export type NotificationDigestStatusType =
  (typeof NOTIFICATION_DIGEST_STATUS)[keyof typeof NOTIFICATION_DIGEST_STATUS];
