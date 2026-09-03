/**
 * User Settings Constants
 * ইউজার সেটিংস সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_SETTINGS = {
  // Notification settings
  NOTIFICATIONS: {
    EMAIL: {
      ENABLED: true,
      DIGEST: 'daily' as const,
      TYPES: ['all', 'important', 'none'] as const,
    },
    SMS: {
      ENABLED: true,
      TYPES: ['all', 'otp', 'none'] as const,
    },
    PUSH: {
      ENABLED: true,
      TYPES: ['all', 'important', 'none'] as const,
    },
    IN_APP: {
      ENABLED: true,
      TYPES: ['all', 'important', 'none'] as const,
    },
  },

  // Privacy settings
  PRIVACY: {
    PROFILE_VISIBILITY: 'public' as const,
    ONLINE_STATUS: 'visible' as const,
    LAST_SEEN: 'visible' as const,
    READ_RECEIPTS: true,
    SHARE_ANALYTICS: true,
    ACCEPT_COOKIES: true,
  },

  // Display settings
  DISPLAY: {
    THEME: 'light' as const,
    LANGUAGE: 'en' as const,
    TIMEZONE: 'UTC' as const,
    DATE_FORMAT: 'YYYY-MM-DD' as const,
    TIME_FORMAT: '24h' as const,
    CURRENCY: 'USD' as const,
    NUMBER_FORMAT: 'standard' as const,
    COMPACT_MODE: false,
    REDUCED_MOTION: false,
    HIGH_CONTRAST: false,
  },

  // Security settings
  SECURITY: {
    TWO_FACTOR_AUTH: false,
    BIOMETRIC: false,
    SESSION_TIMEOUT: 3600,
    REMEMBER_ME: true,
    TRUSTED_DEVICES: true,
    LOGIN_ALERTS: true,
    SUSPICIOUS_ACTIVITY_ALERT: true,
  },

  // Default values
  DEFAULTS: {
    NOTIFICATION_DIGEST: 'daily',
    NOTIFICATION_TYPE: 'all',
    PROFILE_VISIBILITY: 'public',
    THEME: 'light',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    CURRENCY: 'BDT',
  },
} as const;

export type UserSettingsNotificationType = (typeof USER_SETTINGS.NOTIFICATIONS.EMAIL.TYPES)[number];
export type UserSettingsTheme = typeof USER_SETTINGS.DISPLAY.THEME;
export type UserSettingsLanguage = typeof USER_SETTINGS.DISPLAY.LANGUAGE;
export type UserSettingsTimeFormat = typeof USER_SETTINGS.DISPLAY.TIME_FORMAT;
export type UserSettingsDateFormat = typeof USER_SETTINGS.DISPLAY.DATE_FORMAT;
