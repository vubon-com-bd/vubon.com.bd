/**
 * User Settings Constants (EXTENDS common/types)
 * @module shared-constants/user/user-settings.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_SETTINGS = {
  // Base types from common
  ...TYPES,

  // Setting categories
  CATEGORIES: {
    ACCOUNT: 'account',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    NOTIFICATIONS: 'notifications',
    PREFERENCES: 'preferences',
    APPEARANCE: 'appearance',
    LANGUAGE: 'language',
    REGIONAL: 'regional',
    ACCESSIBILITY: 'accessibility',
    INTEGRATIONS: 'integrations',
    ADVANCED: 'advanced',
  } as const,

  // Setting types
  TYPES: {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    TEXT: 'text',
    TEXTAREA: 'textarea',
    JSON: 'json',
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    COLOR: 'color',
    FILE: 'file',
    IMAGE: 'image',
    PASSWORD: 'password',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
  } as const,

  // Setting groups
  GROUPS: {
    GENERAL: 'general',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    NOTIFICATIONS: 'notifications',
    DISPLAY: 'display',
    LANGUAGE: 'language',
    REGIONAL: 'regional',
  } as const,

  // Security settings
  SECURITY: {
    TWO_FACTOR_AUTH: 'two_factor_auth',
    SESSION_TIMEOUT: 'session_timeout',
    MAX_SESSIONS: 'max_sessions',
    DEVICE_VERIFICATION: 'device_verification',
    IP_WHITELIST: 'ip_whitelist',
    PASSWORD_CHANGE_INTERVAL: 'password_change_interval',
    LOGIN_ALERTS: 'login_alerts',
    SUSPICIOUS_ACTIVITY_ALERTS: 'suspicious_activity_alerts',
  } as const,

  // Privacy settings
  PRIVACY: {
    PROFILE_VISIBILITY: 'profile_visibility',
    EMAIL_VISIBILITY: 'email_visibility',
    PHONE_VISIBILITY: 'phone_visibility',
    ADDRESS_VISIBILITY: 'address_visibility',
    ACTIVITY_VISIBILITY: 'activity_visibility',
    ONLINE_STATUS: 'online_status',
    LAST_SEEN: 'last_seen',
    READ_RECEIPTS: 'read_receipts',
    DATA_SHARING: 'data_sharing',
    ANALYTICS: 'analytics',
  } as const,

  // Notification settings
  NOTIFICATIONS: {
    EMAIL: 'email_notifications',
    SMS: 'sms_notifications',
    PUSH: 'push_notifications',
    IN_APP: 'in_app_notifications',
    ORDER_UPDATES: 'order_updates',
    PAYMENT_UPDATES: 'payment_updates',
    SHIPPING_UPDATES: 'shipping_updates',
    PROMOTIONS: 'promotions',
    NEWSLETTER: 'newsletter',
    SYSTEM_UPDATES: 'system_updates',
    SECURITY_ALERTS: 'security_alerts',
  } as const,

  // Display settings
  DISPLAY: {
    THEME: 'theme',
    DARK_MODE: 'dark_mode',
    FONT_SIZE: 'font_size',
    FONT_FAMILY: 'font_family',
    LAYOUT: 'layout',
    COMPACT_VIEW: 'compact_view',
    ANIMATIONS: 'animations',
    SOUNDS: 'sounds',
    NOTIFICATION_POSITION: 'notification_position',
    SIDEBAR_POSITION: 'sidebar_position',
  } as const,

  // Language settings
  LANGUAGE: {
    APP_LANGUAGE: 'app_language',
    CONTENT_LANGUAGE: 'content_language',
    FALLBACK_LANGUAGE: 'fallback_language',
    DATE_FORMAT: 'date_format',
    TIME_FORMAT: 'time_format',
    NUMBER_FORMAT: 'number_format',
    CURRENCY: 'currency',
    TIMEZONE: 'timezone',
  } as const,

  // Default values
  DEFAULTS: {
    THEME: 'light',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    CURRENCY: 'BDT',
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: 'hh:mm A',
    SESSION_TIMEOUT: 3600,
    MAX_SESSIONS: 5,
    PROFILE_VISIBILITY: 'public',
    EMAIL_NOTIFICATIONS: true,
    SMS_NOTIFICATIONS: true,
    PUSH_NOTIFICATIONS: true,
    IN_APP_NOTIFICATIONS: true,
    TWO_FACTOR_AUTH: false,
    DEVICE_VERIFICATION: true,
    DATA_SHARING: false,
    ANALYTICS: true,
    DARK_MODE: false,
    COMPACT_VIEW: false,
    ANIMATIONS: true,
    SOUNDS: true,
  },
} as const;

export type UserSettingCategory =
  (typeof USER_SETTINGS.CATEGORIES)[keyof typeof USER_SETTINGS.CATEGORIES];
export type UserSettingType = (typeof USER_SETTINGS.TYPES)[keyof typeof USER_SETTINGS.TYPES];
export type UserSettingGroup = (typeof USER_SETTINGS.GROUPS)[keyof typeof USER_SETTINGS.GROUPS];
