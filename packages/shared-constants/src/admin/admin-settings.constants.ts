/**
 * Admin Settings Constants
 * অ্যাডমিন সেটিংস সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_SETTINGS = {
  // Setting categories
  CATEGORIES: {
    GENERAL: 'general',
    SECURITY: 'security',
    NOTIFICATION: 'notification',
    PREFERENCE: 'preference',
    SYSTEM: 'system',
    INTEGRATION: 'integration',
    FEATURE: 'feature',
  },

  // Setting types
  TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
    JSON: 'json',
  },

  // Default values
  DEFAULTS: {
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    DATE_FORMAT: 'DD-MM-YYYY',
    TIME_FORMAT: '24h',
    ITEMS_PER_PAGE: 25,
    NOTIFICATION_ENABLED: true,
    AUDIT_ENABLED: true,
    LOG_LEVEL: 'info',
  },
} as const;

export type AdminSettingCategory =
  (typeof ADMIN_SETTINGS.CATEGORIES)[keyof typeof ADMIN_SETTINGS.CATEGORIES];
export type AdminSettingType = (typeof ADMIN_SETTINGS.TYPES)[keyof typeof ADMIN_SETTINGS.TYPES];
