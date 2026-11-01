export const SMS_MARKETING_TYPE = {
  PROMOTIONAL: 'promotional',
  TRANSACTIONAL: 'transactional',
  OTP: 'otp',
  ALERT: 'alert',
  REMINDER: 'reminder',
  CAMPAIGN: 'campaign',
  FLASH_SALE: 'flash_sale',
} as const;

export const SMS_MARKETING_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

export const SMS_MARKETING = {
  TYPE: SMS_MARKETING_TYPE,
  STATUS: SMS_MARKETING_STATUS,
  MAX_LENGTH: 160,
  MAX_LENGTH_UNICODE: 70,
  MAX_MULTIPART: 5,
  MAX_RECIPIENTS: 100000,
  BATCH_SIZE: 1000,
  RATE_LIMIT_PER_SECOND: 60,
  RATE_LIMIT_PER_DAY: 100000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 30,
  TRACK_DELIVERY: true,
  SUPPORT_UNICODE: true,
  DAILY_SEND_LIMIT_PER_USER: 3,
  QUIET_HOURS_START: 21,
  QUIET_HOURS_END: 9,
  REQUIRE_CONSENT: true,
  SENDER_ID_MAX_LENGTH: 11,
  RETENTION_DAYS: 365,
} as const;

export type SmsMarketingTypeType = (typeof SMS_MARKETING_TYPE)[keyof typeof SMS_MARKETING_TYPE];
export type SmsMarketingStatusType =
  (typeof SMS_MARKETING_STATUS)[keyof typeof SMS_MARKETING_STATUS];
