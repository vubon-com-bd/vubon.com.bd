export const NOTIFICATION_TEMPLATE_TYPE = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  WEBHOOK: 'webhook',
  WHATSAPP: 'whatsapp',
} as const;

export const NOTIFICATION_TEMPLATE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

export const NOTIFICATION_TEMPLATE_CATEGORY = {
  AUTH: 'auth',
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  MARKETING: 'marketing',
  SUPPORT: 'support',
  SYSTEM: 'system',
  SECURITY: 'security',
} as const;

export const NOTIFICATION_TEMPLATE = {
  NAME_MAX_LENGTH: 100,
  SUBJECT_MAX_LENGTH: 200,
  BODY_MAX_LENGTH: 500000,
  MAX_VARIABLES: 50,
  VARIABLE_NAME_MAX_LENGTH: 50,
  MAX_VERSIONS: 20,
  RETENTION_DAYS: 365,
  SUPPORT_MARKDOWN: true,
  SUPPORT_HTML: true,
  SUPPORT_MJML: true,
  LOCALE_FALLBACK: 'en',
  MAX_LOCALES: 10,
} as const;

export type NotificationTemplateTypeType =
  (typeof NOTIFICATION_TEMPLATE_TYPE)[keyof typeof NOTIFICATION_TEMPLATE_TYPE];
export type NotificationTemplateStatusType =
  (typeof NOTIFICATION_TEMPLATE_STATUS)[keyof typeof NOTIFICATION_TEMPLATE_STATUS];
export type NotificationTemplateCategoryType =
  (typeof NOTIFICATION_TEMPLATE_CATEGORY)[keyof typeof NOTIFICATION_TEMPLATE_CATEGORY];
