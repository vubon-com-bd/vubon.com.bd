export const EMAIL_PROVIDER = {
  SMTP: 'smtp',
  SENDGRID: 'sendgrid',
  MAILGUN: 'mailgun',
  SES: 'ses',
  POSTMARK: 'postmark',
  RESEND: 'resend',
  BREVO: 'brevo',
  CUSTOM: 'custom',
} as const;

export const EMAIL_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  OPENED: 'opened',
  CLICKED: 'clicked',
  BOUNCED: 'bounced',
  COMPLAINED: 'complained',
  UNSUBSCRIBED: 'unsubscribed',
  FAILED: 'failed',
} as const;

export const EMAIL_PRIORITY = {
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low',
} as const;

export const EMAIL = {
  MAX_RECIPIENTS_PER_EMAIL: 100,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 25,
  MAX_TOTAL_SIZE_MB: 100,
  SUBJECT_MAX_LENGTH: 200,
  BODY_MAX_LENGTH: 500000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 60,
  RATE_LIMIT_PER_SECOND: 100,
  RATE_LIMIT_PER_DAY: 50000,
  BATCH_SIZE: 500,
  TRACK_OPENS: true,
  TRACK_CLICKS: true,
  UNSUBSCRIBE_LINK_REQUIRED: true,
} as const;

export type EmailProviderType = (typeof EMAIL_PROVIDER)[keyof typeof EMAIL_PROVIDER];
export type EmailStatusType = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS];
export type EmailPriorityType = (typeof EMAIL_PRIORITY)[keyof typeof EMAIL_PRIORITY];
