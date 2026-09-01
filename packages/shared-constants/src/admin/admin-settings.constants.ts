/**
 * Admin Settings Constants
 * Settings and configuration definitions
 */

/**
 * Settings categories
 */
export const SETTINGS_CATEGORY = {
  GENERAL: 'general',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
  PREFERENCE: 'preference',
  INTEGRATION: 'integration',
  API: 'api',
  SYSTEM: 'system',
  BUSINESS: 'business',
  USER: 'user',
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  TAX: 'tax',
  INVENTORY: 'inventory',
  REPORT: 'report',
  ANALYTICS: 'analytics',
} as const;

/**
 * Setting types
 */
export const SETTING_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  JSON: 'json',
  ENUM: 'enum',
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
  EMAIL: 'email',
  URL: 'url',
  PHONE: 'phone',
  PASSWORD: 'password',
  COLOR: 'color',
  FILE: 'file',
  IMAGE: 'image',
} as const;

/**
 * Setting visibility
 */
export const SETTING_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  PROTECTED: 'protected',
  HIDDEN: 'hidden',
} as const;

/**
 * Setting validation rules
 */
export const SETTING_VALIDATION = {
  STRING_MIN_LENGTH: 0,
  STRING_MAX_LENGTH: 500,
  NUMBER_MIN_VALUE: 0,
  NUMBER_MAX_VALUE: 999999999,
  ARRAY_MAX_ITEMS: 100,
} as const;

/**
 * System settings
 */
export const SYSTEM_SETTINGS = {
  SITE_NAME: 'site_name',
  SITE_URL: 'site_url',
  ADMIN_EMAIL: 'admin_email',
  TIMEZONE: 'timezone',
  DATE_FORMAT: 'date_format',
  TIME_FORMAT: 'time_format',
  CURRENCY: 'currency',
  LANGUAGE: 'language',
  LOCALE: 'locale',
} as const;

/**
 * Security settings
 */
export const SECURITY_SETTINGS = {
  MFA_ENABLED: 'mfa_enabled',
  PASSWORD_POLICY: 'password_policy',
  SESSION_TIMEOUT: 'session_timeout',
  MAX_LOGIN_ATTEMPTS: 'max_login_attempts',
  IP_WHITELIST: 'ip_whitelist',
  IP_BLACKLIST: 'ip_blacklist',
  ALLOWED_DOMAINS: 'allowed_domains',
  BLOCKED_DOMAINS: 'blocked_domains',
} as const;

/**
 * Get setting type label
 */
export function getSettingTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    [SETTING_TYPE.STRING]: 'Text',
    [SETTING_TYPE.NUMBER]: 'Number',
    [SETTING_TYPE.BOOLEAN]: 'Yes/No',
    [SETTING_TYPE.OBJECT]: 'Object',
    [SETTING_TYPE.ARRAY]: 'List',
    [SETTING_TYPE.JSON]: 'JSON',
    [SETTING_TYPE.ENUM]: 'Dropdown',
    [SETTING_TYPE.DATE]: 'Date',
    [SETTING_TYPE.TIME]: 'Time',
    [SETTING_TYPE.DATETIME]: 'Date & Time',
    [SETTING_TYPE.EMAIL]: 'Email',
    [SETTING_TYPE.URL]: 'URL',
    [SETTING_TYPE.PHONE]: 'Phone',
    [SETTING_TYPE.PASSWORD]: 'Password',
    [SETTING_TYPE.COLOR]: 'Color',
    [SETTING_TYPE.FILE]: 'File',
    [SETTING_TYPE.IMAGE]: 'Image',
  };
  return labels[type] || type;
}

/**
 * Get setting visibility label
 */
export function getSettingVisibilityLabel(visibility: string): string {
  const labels: Record<string, string> = {
    [SETTING_VISIBILITY.PUBLIC]: 'Public',
    [SETTING_VISIBILITY.PRIVATE]: 'Private',
    [SETTING_VISIBILITY.PROTECTED]: 'Protected',
    [SETTING_VISIBILITY.HIDDEN]: 'Hidden',
  };
  return labels[visibility] || visibility;
}

/**
 * Check if setting is system critical
 */
export function isSystemCriticalSetting(key: string): boolean {
  const criticalKeys = [
    'site_url',
    'admin_email',
    'database_config',
    'cache_config',
    'queue_config',
    'payment_gateway',
    'api_keys',
    'secret_key',
  ];
  return criticalKeys.some((k) => key.includes(k));
}

/**
 * Check if setting requires restart
 */
export function requiresRestart(key: string): boolean {
  const restartKeys = [
    'database',
    'cache',
    'queue',
    'session_timeout',
    'mfa_enabled',
    'password_policy',
  ];
  return restartKeys.some((k) => key.includes(k));
}
