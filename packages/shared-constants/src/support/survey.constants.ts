export const SURVEY_TYPE = {
  NPS: 'nps',
  CSAT: 'csat',
  CES: 'ces',
  PRODUCT_FEEDBACK: 'product_feedback',
  SERVICE_FEEDBACK: 'service_feedback',
  POST_PURCHASE: 'post_purchase',
  POST_SUPPORT: 'post_support',
  GENERAL: 'general',
} as const;

export const SURVEY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;

export const SURVEY_QUESTION_TYPE = {
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICE: 'multiple_choice',
  TEXT: 'text',
  TEXTAREA: 'textarea',
  RATING: 'rating',
  NPS: 'nps',
  CSAT: 'csat',
  CES: 'ces',
  DATE: 'date',
  NUMBER: 'number',
  EMAIL: 'email',
  PHONE: 'phone',
} as const;

export const SURVEY = {
  TYPE: SURVEY_TYPE,
  STATUS: SURVEY_STATUS,
  QUESTION_TYPE: SURVEY_QUESTION_TYPE,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 2000,
  MAX_QUESTIONS: 50,
  MAX_OPTIONS_PER_QUESTION: 20,
  MAX_RESPONSES: 1000000,
  MIN_RESPONSE_TIME_SECONDS: 10,
  REMINDER_AFTER_HOURS: 48,
  MAX_REMINDERS: 3,
  ANONYMOUS_ALLOWED: true,
  RETENTION_DAYS: 1095,
} as const;

export type SurveyTypeType = (typeof SURVEY_TYPE)[keyof typeof SURVEY_TYPE];
export type SurveyStatusType = (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];
export type SurveyQuestionTypeType =
  (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];
