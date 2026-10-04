export const EMAIL_MARKETING_TYPE = {
  NEWSLETTER: 'newsletter',
  PROMOTIONAL: 'promotional',
  TRANSACTIONAL: 'transactional',
  WELCOME: 'welcome',
  ABANDONED_CART: 'abandoned_cart',
  RE_ENGAGEMENT: 're_engagement',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  PRODUCT_LAUNCH: 'product_launch',
  SEASONAL: 'seasonal',
  DRIP: 'drip',
} as const;

export const EMAIL_MARKETING_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const EMAIL_MARKETING = {
  TYPE: EMAIL_MARKETING_TYPE,
  STATUS: EMAIL_MARKETING_STATUS,
  SUBJECT_MAX_LENGTH: 200,
  PREHEADER_MAX_LENGTH: 150,
  BODY_MAX_LENGTH: 500000,
  MAX_RECIPIENTS: 1000000,
  BATCH_SIZE: 500,
  RATE_LIMIT_PER_SECOND: 100,
  RATE_LIMIT_PER_DAY: 500000,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 25,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 60,
  TRACK_OPENS: true,
  TRACK_CLICKS: true,
  UNSUBSCRIBE_LINK_REQUIRED: true,
  DAILY_SEND_LIMIT_PER_USER: 5,
  MAX_ACTIVE_CAMPAIGNS: 100,
  RETENTION_DAYS: 365,
} as const;

export type EmailMarketingTypeType =
  (typeof EMAIL_MARKETING_TYPE)[keyof typeof EMAIL_MARKETING_TYPE];
export type EmailMarketingStatusType =
  (typeof EMAIL_MARKETING_STATUS)[keyof typeof EMAIL_MARKETING_STATUS];
