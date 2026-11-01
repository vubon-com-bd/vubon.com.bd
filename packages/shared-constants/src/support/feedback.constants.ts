export const FEEDBACK_TYPE = {
  GENERAL: 'general',
  PRODUCT: 'product',
  SERVICE: 'service',
  WEBSITE: 'website',
  APP: 'app',
  SUPPORT: 'support',
  SUGGESTION: 'suggestion',
  COMPLAINT: 'complaint',
  PRAISE: 'praise',
} as const;

export const FEEDBACK_STATUS = {
  NEW: 'new',
  REVIEWED: 'reviewed',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
} as const;

export const FEEDBACK_RATING = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 5,
} as const;

export const FEEDBACK = {
  TYPE: FEEDBACK_TYPE,
  STATUS: FEEDBACK_STATUS,
  RATING: FEEDBACK_RATING,
  TITLE_MAX_LENGTH: 200,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
  MAX_ATTACHMENTS: 5,
  MAX_ATTACHMENT_SIZE_MB: 10,
  ANONYMOUS_ALLOWED: true,
  REQUIRE_EMAIL: false,
  AUTO_TAG: true,
  RETENTION_DAYS: 1095,
} as const;

export type FeedbackTypeType = (typeof FEEDBACK_TYPE)[keyof typeof FEEDBACK_TYPE];
export type FeedbackStatusType = (typeof FEEDBACK_STATUS)[keyof typeof FEEDBACK_STATUS];
