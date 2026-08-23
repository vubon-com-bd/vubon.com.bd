/**
 * Email Template Constants
 * Template definitions for email notifications
 */

export const NOTIFICATIONEMAIL_TEMPLATE = {
  // Template Types
  TYPES: {
    STANDARD: 'standard',
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    WELCOME: 'welcome',
    ORDER: 'order',
    SHIPPING: 'shipping',
    INVOICE: 'invoice',
    RESET_PASSWORD: 'reset_password',
    VERIFICATION: 'verification',
    SURVEY: 'survey',
    EVENT: 'event',
    ANNOUNCEMENT: 'announcement',
    REMINDER: 'reminder',
    CUSTOM: 'custom',
  } as const,

  // Template Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SECURITY: 'security',
  } as const,

  // Template Formats
  FORMATS: {
    HTML: 'html',
    TEXT: 'text',
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HANDLEBARS: 'handlebars',
    MUSTACHE: 'mustache',
    LIQUID: 'liquid',
    CUSTOM: 'custom',
  } as const,

  // Template Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    INACTIVE: 'inactive',
  } as const,

  // Template Variables
  VARIABLE_TYPES: {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    DATETIME: 'datetime',
    ARRAY: 'array',
    OBJECT: 'object',
    HTML: 'html',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
    CUSTOM: 'custom',
  } as const,

  // Template Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'standard',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_FORMAT: 'html',
    DEFAULT_STATUS: 'draft',
    MAX_VARIABLES: 50,
    MAX_SECTIONS: 20,
    DEFAULT_VERSION: '1.0.0',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
  } as const,

  // Template Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_SUBJECT_LENGTH: 200,
    MAX_PREHEADER_LENGTH: 100,
    MAX_BODY_LENGTH: 1000000,
    MAX_VARIABLES: 50,
    MAX_SECTIONS: 20,
    MAX_CSS_SIZE_KB: 50,
    MAX_IMAGE_SIZE_MB: 5,
    MAX_ATTACHMENTS: 5,
  } as const,
} as const;

// Template Types
export type NotificationEmailTemplateType =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.TYPES)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.TYPES];

// Template Categories
export type NotificationEmailTemplateCategory =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES];

// Template Formats
export type NotificationEmailTemplateFormat =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.FORMATS)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.FORMATS];

// Template Statuses
export type NotificationEmailTemplateStatus =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.STATUSES)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.STATUSES];

// Template Variable Types
export type NotificationEmailTemplateVariableType =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES];

// Template Defaults
export type NotificationEmailTemplateDefault =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.DEFAULTS)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.DEFAULTS];

// Template Limits
export type NotificationEmailTemplateLimit =
  (typeof NOTIFICATIONEMAIL_TEMPLATE.LIMITS)[keyof typeof NOTIFICATIONEMAIL_TEMPLATE.LIMITS];

// Utility Functions
export function notificationemailGetTemplateTypeLabel(type: NotificationEmailTemplateType): string {
  const labels: Record<NotificationEmailTemplateType, string> = {
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.STANDARD]: 'Standard',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.NEWSLETTER]: 'Newsletter',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.WELCOME]: 'Welcome',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.ORDER]: 'Order',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.INVOICE]: 'Invoice',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.RESET_PASSWORD]: 'Reset Password',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.VERIFICATION]: 'Verification',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.SURVEY]: 'Survey',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.EVENT]: 'Event',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.ANNOUNCEMENT]: 'Announcement',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.REMINDER]: 'Reminder',
    [NOTIFICATIONEMAIL_TEMPLATE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Template Type';
}

export function notificationemailGetTemplateCategoryLabel(
  category: NotificationEmailTemplateCategory
): string {
  const labels: Record<NotificationEmailTemplateCategory, string> = {
    [NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONEMAIL_TEMPLATE.CATEGORIES.SECURITY]: 'Security',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationemailGetTemplateFormatLabel(
  format: NotificationEmailTemplateFormat
): string {
  const labels: Record<NotificationEmailTemplateFormat, string> = {
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.TEXT]: 'Text',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.PLAIN]: 'Plain',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.MARKDOWN]: 'Markdown',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.HANDLEBARS]: 'Handlebars',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.MUSTACHE]: 'Mustache',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.LIQUID]: 'Liquid',
    [NOTIFICATIONEMAIL_TEMPLATE.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationemailGetTemplateStatusLabel(
  status: NotificationEmailTemplateStatus
): string {
  const labels: Record<NotificationEmailTemplateStatus, string> = {
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.DRAFT]: 'Draft',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.APPROVED]: 'Approved',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.REJECTED]: 'Rejected',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.PUBLISHED]: 'Published',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.ARCHIVED]: 'Archived',
    [NOTIFICATIONEMAIL_TEMPLATE.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function notificationemailGetTemplateVariableTypeLabel(
  variableType: NotificationEmailTemplateVariableType
): string {
  const labels: Record<NotificationEmailTemplateVariableType, string> = {
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.TEXT]: 'Text',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.NUMBER]: 'Number',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.BOOLEAN]: 'Boolean',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.DATE]: 'Date',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.DATETIME]: 'DateTime',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.ARRAY]: 'Array',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.OBJECT]: 'Object',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.HTML]: 'HTML',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.URL]: 'URL',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.EMAIL]: 'Email',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.PHONE]: 'Phone',
    [NOTIFICATIONEMAIL_TEMPLATE.VARIABLE_TYPES.CUSTOM]: 'Custom',
  };
  return labels[variableType] || 'Unknown Variable Type';
}

export function notificationemailIsPublished(status: NotificationEmailTemplateStatus): boolean {
  return status === NOTIFICATIONEMAIL_TEMPLATE.STATUSES.PUBLISHED;
}

export function notificationemailIsDraft(status: NotificationEmailTemplateStatus): boolean {
  return status === NOTIFICATIONEMAIL_TEMPLATE.STATUSES.DRAFT;
}

export function notificationemailIsApproved(status: NotificationEmailTemplateStatus): boolean {
  const approvedStatuses: NotificationEmailTemplateStatus[] = [
    NOTIFICATIONEMAIL_TEMPLATE.STATUSES.APPROVED,
    NOTIFICATIONEMAIL_TEMPLATE.STATUSES.PUBLISHED,
  ];
  return approvedStatuses.includes(status);
}

export function notificationemailGetDefaultTemplateType(): NotificationEmailTemplateType {
  return NOTIFICATIONEMAIL_TEMPLATE.DEFAULTS.DEFAULT_TYPE;
}

export function notificationemailGetDefaultTemplateFormat(): NotificationEmailTemplateFormat {
  return NOTIFICATIONEMAIL_TEMPLATE.DEFAULTS.DEFAULT_FORMAT;
}

export function notificationemailGetDefaultLanguage(): string {
  return NOTIFICATIONEMAIL_TEMPLATE.DEFAULTS.DEFAULT_LANGUAGE;
}
