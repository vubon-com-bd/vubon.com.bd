export const FLASH_SALE_SCHEDULE = {
  MIN_DURATION_MINUTES: 15,
  MAX_DURATION_HOURS: 168,
  DEFAULT_DURATION_HOURS: 24,
  REMINDER_BEFORE_MINUTES: 30,
  START_NOTIFICATION_MINUTES: 5,
  END_NOTIFICATION_MINUTES: 5,
  TIMEZONE: 'Asia/Dhaka',
  ALLOW_EXTENSION: true,
  MAX_EXTENSIONS: 2,
} as const;

export const FLASH_SALE_RECURRENCE = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const;

export type FlashSaleRecurrenceType =
  (typeof FLASH_SALE_RECURRENCE)[keyof typeof FLASH_SALE_RECURRENCE];
