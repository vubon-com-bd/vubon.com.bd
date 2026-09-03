/**
 * User Preferences Constants
 * ইউজার প্রেফারেন্স সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_PREFERENCES = {
  // Content preferences
  CONTENT: {
    LANGUAGE: 'en' as const,
    REGION: 'BD' as const,
    CONTENT_TYPE: ['article', 'video', 'image'] as const,
    NOTIFICATION_TYPES: ['email', 'sms', 'push', 'in_app'] as const,
  },

  // UI preferences
  UI: {
    THEME: 'light' as const,
    LAYOUT: 'default' as const,
    NAVIGATION: 'sidebar' as const,
    COMPACT: false,
    ANIMATIONS: true,
    SOUND: true,
    VIBRATION: true,
  },

  // Communication preferences
  COMMUNICATION: {
    EMAIL_FREQUENCY: 'daily' as const,
    SMS_ENABLED: true,
    PUSH_ENABLED: true,
    IN_APP_ENABLED: true,
    MARKETING_EMAILS: false,
    NEWSLETTER: false,
  },

  // Accessibility preferences
  ACCESSIBILITY: {
    FONT_SIZE: 'medium' as const,
    HIGH_CONTRAST: false,
    REDUCED_MOTION: false,
    SCREEN_READER: false,
    CAPTIONS: false,
  },

  // Default values
  DEFAULTS: {
    THEME: 'light',
    LANGUAGE: 'bn',
    EMAIL_FREQUENCY: 'daily',
    FONT_SIZE: 'medium',
  },
} as const;

export type UserPreferencesTheme = typeof USER_PREFERENCES.UI.THEME;
export type UserPreferencesLanguage = typeof USER_PREFERENCES.CONTENT.LANGUAGE;
export type UserPreferencesEmailFrequency = typeof USER_PREFERENCES.COMMUNICATION.EMAIL_FREQUENCY;
export type UserPreferencesFontSize = typeof USER_PREFERENCES.ACCESSIBILITY.FONT_SIZE;
