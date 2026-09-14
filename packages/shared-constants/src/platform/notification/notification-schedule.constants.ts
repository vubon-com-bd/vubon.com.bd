export const NOTIFICATION_SCHEDULE_TYPE = {
  IMMEDIATE: 'immediate',
  SCHEDULED: 'scheduled',
  RECURRING: 'recurring',
  DELAYED: 'delayed',
  TRIGGERED: 'triggered',
} as const;

export const NOTIFICATION_SCHEDULE_RECURRENCE = {
  NONE: 'none',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const;

export const NOTIFICATION_SCHEDULE_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

export const NOTIFICATION_SCHEDULE = {
  MAX_FUTURE_DAYS: 365,
  MIN_DELAY_SECONDS: 60,
  MAX_DELAY_DAYS: 365,
  MAX_ACTIVE_SCHEDULES: 1000,
  TIMEZONE_DEFAULT: 'Asia/Dhaka',
  ALLOW_PAST: false,
  RETRY_FAILED: true,
  MAX_RETRIES: 3,
} as const;

export type NotificationScheduleTypeType =
  (typeof NOTIFICATION_SCHEDULE_TYPE)[keyof typeof NOTIFICATION_SCHEDULE_TYPE];
export type NotificationScheduleRecurrenceType =
  (typeof NOTIFICATION_SCHEDULE_RECURRENCE)[keyof typeof NOTIFICATION_SCHEDULE_RECURRENCE];
export type NotificationScheduleStatusType =
  (typeof NOTIFICATION_SCHEDULE_STATUS)[keyof typeof NOTIFICATION_SCHEDULE_STATUS];
