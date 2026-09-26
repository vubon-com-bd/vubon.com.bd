export const NOTIFICATION_PREFERENCE_TYPE = {
  OPT_IN: 'opt_in',
  OPT_OUT: 'opt_out',
  CHANNEL_SPECIFIC: 'channel_specific',
  CATEGORY_SPECIFIC: 'category_specific',
  QUIET_HOURS: 'quiet_hours',
  FREQUENCY: 'frequency',
} as const;

export const NOTIFICATION_PREFERENCE_FREQUENCY = {
  INSTANT: 'instant',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  NEVER: 'never',
} as const;

export const NOTIFICATION_PREFERENCE_DEFAULT = {
  EMAIL: true,
  SMS: false,
  PUSH: true,
  IN_APP: true,
  WEBHOOK: false,
  WHATSAPP: false,
  MARKETING_EMAIL: false,
  MARKETING_SMS: false,
  MARKETING_PUSH: false,
  ORDER_UPDATES: true,
  PAYMENT_UPDATES: true,
  SHIPPING_UPDATES: true,
  SECURITY_ALERTS: true,
  PROMOTIONAL: false,
  NEWSLETTER: false,
} as const;

export const NOTIFICATION_PREFERENCE = {
  ALLOW_CHANGE: true,
  REQUIRE_VERIFICATION: false,
  QUIET_HOURS_ENABLED: true,
  QUIET_HOURS_START: 22,
  QUIET_HOURS_END: 8,
  TIMEZONE_DEFAULT: 'Asia/Dhaka',
  MAX_CATEGORIES: 50,
  LOCALE_FALLBACK: 'en',
} as const;

export type NotificationPreferenceTypeType =
  (typeof NOTIFICATION_PREFERENCE_TYPE)[keyof typeof NOTIFICATION_PREFERENCE_TYPE];
export type NotificationPreferenceFrequencyType =
  (typeof NOTIFICATION_PREFERENCE_FREQUENCY)[keyof typeof NOTIFICATION_PREFERENCE_FREQUENCY];
