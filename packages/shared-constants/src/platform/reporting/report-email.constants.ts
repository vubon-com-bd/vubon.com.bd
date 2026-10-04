export const REPORT_EMAIL_TYPE = {
  SCHEDULED: 'scheduled',
  MANUAL: 'manual',
  TRIGGERED: 'triggered',
  ALERT: 'alert',
  DIGEST: 'digest',
} as const;

export const REPORT_EMAIL_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  BOUNCED: 'bounced',
} as const;

export const REPORT_EMAIL_FORMAT = {
  INLINE: 'inline',
  ATTACHMENT: 'attachment',
  LINK: 'link',
  HYBRID: 'hybrid',
} as const;

export const REPORT_EMAIL = {
  MAX_RECIPIENTS: 100,
  MAX_CC: 50,
  MAX_BCC: 50,
  MAX_ATTACHMENT_SIZE_MB: 25,
  MAX_TOTAL_ATTACHMENT_SIZE_MB: 100,
  MAX_ATTACHMENTS: 10,
  SUBJECT_MAX_LENGTH: 200,
  BODY_MAX_LENGTH: 500000,
  INLINE_PREVIEW: true,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 300,
  TRACK_OPENS: true,
  TRACK_CLICKS: true,
  REQUIRE_CONFIRMATION: false,
} as const;

export type ReportEmailTypeType = (typeof REPORT_EMAIL_TYPE)[keyof typeof REPORT_EMAIL_TYPE];
export type ReportEmailStatusType = (typeof REPORT_EMAIL_STATUS)[keyof typeof REPORT_EMAIL_STATUS];
export type ReportEmailFormatType = (typeof REPORT_EMAIL_FORMAT)[keyof typeof REPORT_EMAIL_FORMAT];
