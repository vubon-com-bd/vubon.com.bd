/**
 * Settings Constants
 * @module shared-constants/common/settings
 *
 * Cross-cutting settings keys।
 */

export const SETTINGS_CATEGORY = {
  GENERAL: 'general',
  APPEARANCE: 'appearance',
  NOTIFICATION: 'notification',
  PRIVACY: 'privacy',
  SECURITY: 'security',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  CURRENCY: 'currency',
  EXPORT: 'export',
  INTEGRATION: 'integration',
} as const;

export const SETTINGS_KEY = {
  THEME: 'theme',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  CURRENCY: 'currency',
  DATE_FORMAT: 'date_format',
  TIME_FORMAT: 'time_format',
  NUMBER_FORMAT: 'number_format',
  ITEMS_PER_PAGE: 'items_per_page',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  ENABLE_NOTIFICATIONS: 'enable_notifications',
  ENABLE_EMAIL: 'enable_email',
  ENABLE_SMS: 'enable_sms',
  ENABLE_PUSH: 'enable_push',
} as const;

export type SettingsCategoryType = (typeof SETTINGS_CATEGORY)[keyof typeof SETTINGS_CATEGORY];
export type SettingsKeyType = (typeof SETTINGS_KEY)[keyof typeof SETTINGS_KEY];
