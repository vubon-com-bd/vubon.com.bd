/**
 * Notification Template Constants
 * Core notification template configuration and settings
 */

export const NOTIFICATIONTEMPLATE = {
  // Template Types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    CUSTOM: 'custom',
  } as const,

  // Template Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    ALERT: 'alert',
    REMINDER: 'reminder',
    UPDATE: 'update',
    PROMOTIONAL: 'promotional',
    SECURITY: 'security',
    SOCIAL: 'social',
    EDUCATIONAL: 'educational',
    CUSTOM: 'custom',
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
    JSON: 'json',
    XML: 'xml',
    CUSTOM: 'custom',
  } as const,

  // Template Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    PT: 'pt',
    IT: 'it',
    KO: 'ko',
    CUSTOM: 'custom',
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
    CURRENCY: 'currency',
    PERCENTAGE: 'percentage',
    CUSTOM: 'custom',
  } as const,

  // Template Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'email',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_FORMAT: 'html',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_STATUS: 'draft',
    DEFAULT_VERSION: '1.0.0',
    MAX_VARIABLES: 50,
    MAX_SECTIONS: 20,
    MAX_ATTACHMENTS: 5,
    MAX_IMAGE_SIZE_MB: 5,
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
    MAX_VERSIONS: 100,
  } as const,

  // Template Errors
  ERRORS: {
    INVALID_TEMPLATE: 'invalid_template',
    MISSING_VARIABLE: 'missing_variable',
    INVALID_VARIABLE: 'invalid_variable',
    RENDER_FAILED: 'render_failed',
    COMPILE_FAILED: 'compile_failed',
    PARSE_FAILED: 'parse_failed',
    VALIDATION_FAILED: 'validation_failed',
    DUPLICATE_NAME: 'duplicate_name',
    VERSION_CONFLICT: 'version_conflict',
  } as const,
} as const;

// Template Types
export type NotificationTemplateType =
  (typeof NOTIFICATIONTEMPLATE.TYPES)[keyof typeof NOTIFICATIONTEMPLATE.TYPES];

// Template Categories
export type NotificationTemplateCategory =
  (typeof NOTIFICATIONTEMPLATE.CATEGORIES)[keyof typeof NOTIFICATIONTEMPLATE.CATEGORIES];

// Template Formats
export type NotificationTemplateFormat =
  (typeof NOTIFICATIONTEMPLATE.FORMATS)[keyof typeof NOTIFICATIONTEMPLATE.FORMATS];

// Template Languages
export type NotificationTemplateLanguage =
  (typeof NOTIFICATIONTEMPLATE.LANGUAGES)[keyof typeof NOTIFICATIONTEMPLATE.LANGUAGES];

// Template Variable Types
export type NotificationTemplateVariableType =
  (typeof NOTIFICATIONTEMPLATE.VARIABLE_TYPES)[keyof typeof NOTIFICATIONTEMPLATE.VARIABLE_TYPES];

// Template Defaults
export type NotificationTemplateDefault =
  (typeof NOTIFICATIONTEMPLATE.DEFAULTS)[keyof typeof NOTIFICATIONTEMPLATE.DEFAULTS];

// Template Limits
export type NotificationTemplateLimit =
  (typeof NOTIFICATIONTEMPLATE.LIMITS)[keyof typeof NOTIFICATIONTEMPLATE.LIMITS];

// Template Errors
export type NotificationTemplateError =
  (typeof NOTIFICATIONTEMPLATE.ERRORS)[keyof typeof NOTIFICATIONTEMPLATE.ERRORS];

// Utility Functions
export function notificationtemplateGetTypeLabel(type: NotificationTemplateType): string {
  const labels: Record<NotificationTemplateType, string> = {
    [NOTIFICATIONTEMPLATE.TYPES.EMAIL]: 'Email',
    [NOTIFICATIONTEMPLATE.TYPES.SMS]: 'SMS',
    [NOTIFICATIONTEMPLATE.TYPES.PUSH]: 'Push',
    [NOTIFICATIONTEMPLATE.TYPES.IN_APP]: 'In-App',
    [NOTIFICATIONTEMPLATE.TYPES.WEBHOOK]: 'Webhook',
    [NOTIFICATIONTEMPLATE.TYPES.SLACK]: 'Slack',
    [NOTIFICATIONTEMPLATE.TYPES.TEAMS]: 'Microsoft Teams',
    [NOTIFICATIONTEMPLATE.TYPES.DISCORD]: 'Discord',
    [NOTIFICATIONTEMPLATE.TYPES.WHATSAPP]: 'WhatsApp',
    [NOTIFICATIONTEMPLATE.TYPES.TELEGRAM]: 'Telegram',
    [NOTIFICATIONTEMPLATE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Template Type';
}

export function notificationtemplateGetCategoryLabel(
  category: NotificationTemplateCategory
): string {
  const labels: Record<NotificationTemplateCategory, string> = {
    [NOTIFICATIONTEMPLATE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONTEMPLATE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONTEMPLATE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONTEMPLATE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONTEMPLATE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONTEMPLATE.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATIONTEMPLATE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONTEMPLATE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONTEMPLATE.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONTEMPLATE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONTEMPLATE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [NOTIFICATIONTEMPLATE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationtemplateGetFormatLabel(format: NotificationTemplateFormat): string {
  const labels: Record<NotificationTemplateFormat, string> = {
    [NOTIFICATIONTEMPLATE.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONTEMPLATE.FORMATS.TEXT]: 'Text',
    [NOTIFICATIONTEMPLATE.FORMATS.PLAIN]: 'Plain',
    [NOTIFICATIONTEMPLATE.FORMATS.MARKDOWN]: 'Markdown',
    [NOTIFICATIONTEMPLATE.FORMATS.HANDLEBARS]: 'Handlebars',
    [NOTIFICATIONTEMPLATE.FORMATS.MUSTACHE]: 'Mustache',
    [NOTIFICATIONTEMPLATE.FORMATS.LIQUID]: 'Liquid',
    [NOTIFICATIONTEMPLATE.FORMATS.JSON]: 'JSON',
    [NOTIFICATIONTEMPLATE.FORMATS.XML]: 'XML',
    [NOTIFICATIONTEMPLATE.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationtemplateGetLanguageLabel(
  language: NotificationTemplateLanguage
): string {
  const labels: Record<NotificationTemplateLanguage, string> = {
    [NOTIFICATIONTEMPLATE.LANGUAGES.EN]: 'English',
    [NOTIFICATIONTEMPLATE.LANGUAGES.BN]: 'Bengali',
    [NOTIFICATIONTEMPLATE.LANGUAGES.HI]: 'Hindi',
    [NOTIFICATIONTEMPLATE.LANGUAGES.AR]: 'Arabic',
    [NOTIFICATIONTEMPLATE.LANGUAGES.ES]: 'Spanish',
    [NOTIFICATIONTEMPLATE.LANGUAGES.FR]: 'French',
    [NOTIFICATIONTEMPLATE.LANGUAGES.DE]: 'German',
    [NOTIFICATIONTEMPLATE.LANGUAGES.ZH]: 'Chinese',
    [NOTIFICATIONTEMPLATE.LANGUAGES.JA]: 'Japanese',
    [NOTIFICATIONTEMPLATE.LANGUAGES.RU]: 'Russian',
    [NOTIFICATIONTEMPLATE.LANGUAGES.PT]: 'Portuguese',
    [NOTIFICATIONTEMPLATE.LANGUAGES.IT]: 'Italian',
    [NOTIFICATIONTEMPLATE.LANGUAGES.KO]: 'Korean',
    [NOTIFICATIONTEMPLATE.LANGUAGES.CUSTOM]: 'Custom',
  };
  return labels[language] || 'Unknown Language';
}

export function notificationtemplateGetVariableTypeLabel(
  variableType: NotificationTemplateVariableType
): string {
  const labels: Record<NotificationTemplateVariableType, string> = {
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.TEXT]: 'Text',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.NUMBER]: 'Number',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.BOOLEAN]: 'Boolean',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.DATE]: 'Date',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.DATETIME]: 'DateTime',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.ARRAY]: 'Array',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.OBJECT]: 'Object',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.HTML]: 'HTML',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.URL]: 'URL',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.EMAIL]: 'Email',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.PHONE]: 'Phone',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.CURRENCY]: 'Currency',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.PERCENTAGE]: 'Percentage',
    [NOTIFICATIONTEMPLATE.VARIABLE_TYPES.CUSTOM]: 'Custom',
  };
  return labels[variableType] || 'Unknown Variable Type';
}

export function notificationtemplateGetErrorLabel(error: NotificationTemplateError): string {
  const labels: Record<NotificationTemplateError, string> = {
    [NOTIFICATIONTEMPLATE.ERRORS.INVALID_TEMPLATE]: 'Invalid Template',
    [NOTIFICATIONTEMPLATE.ERRORS.MISSING_VARIABLE]: 'Missing Variable',
    [NOTIFICATIONTEMPLATE.ERRORS.INVALID_VARIABLE]: 'Invalid Variable',
    [NOTIFICATIONTEMPLATE.ERRORS.RENDER_FAILED]: 'Render Failed',
    [NOTIFICATIONTEMPLATE.ERRORS.COMPILE_FAILED]: 'Compile Failed',
    [NOTIFICATIONTEMPLATE.ERRORS.PARSE_FAILED]: 'Parse Failed',
    [NOTIFICATIONTEMPLATE.ERRORS.VALIDATION_FAILED]: 'Validation Failed',
    [NOTIFICATIONTEMPLATE.ERRORS.DUPLICATE_NAME]: 'Duplicate Name',
    [NOTIFICATIONTEMPLATE.ERRORS.VERSION_CONFLICT]: 'Version Conflict',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationtemplateGetDefaultVersion(): string {
  return NOTIFICATIONTEMPLATE.DEFAULTS.DEFAULT_VERSION;
}

export function notificationtemplateIsEmailType(type: NotificationTemplateType): boolean {
  return type === NOTIFICATIONTEMPLATE.TYPES.EMAIL;
}

export function notificationtemplateIsSMSType(type: NotificationTemplateType): boolean {
  return type === NOTIFICATIONTEMPLATE.TYPES.SMS;
}

export function notificationtemplateIsPushType(type: NotificationTemplateType): boolean {
  return type === NOTIFICATIONTEMPLATE.TYPES.PUSH;
}

export function notificationtemplateIsInAppType(type: NotificationTemplateType): boolean {
  return type === NOTIFICATIONTEMPLATE.TYPES.IN_APP;
}
