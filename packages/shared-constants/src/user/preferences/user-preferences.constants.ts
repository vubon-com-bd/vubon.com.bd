/**
 * User Preferences Constants
 * Core user preferences-related constants
 */

import { USER_PREFERENCES_TYPE } from './user-preferences-type.constants';
import { USER_PREFERENCES_STATUS } from './user-preferences-status.constants';

export const USER_PREFERENCES = {
  // Default values
  DEFAULTS: {
    STATUS: USER_PREFERENCES_STATUS.ACTIVE,
    TYPE: USER_PREFERENCES_TYPE.GENERAL,
    LANGUAGE: 'bn',
    CURRENCY: 'BDT',
    TIMEZONE: 'Asia/Dhaka',
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: '24h',
    WEEK_START: 'saturday',
  },

  // Language options
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
    ARABIC: 'ar',
    HINDI: 'hi',
    URDU: 'ur',
  },

  // Currency options
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    INR: 'INR',
    AED: 'AED',
    SAR: 'SAR',
  },

  // Date formats
  DATE_FORMATS: {
    DD_MM_YYYY: 'DD/MM/YYYY',
    MM_DD_YYYY: 'MM/DD/YYYY',
    YYYY_MM_DD: 'YYYY/MM/DD',
    DD_MM_YY: 'DD/MM/YY',
    MM_DD_YY: 'MM/DD/YY',
    YYYY_MM_DD_DASH: 'YYYY-MM-DD',
  },

  // Time formats
  TIME_FORMATS: {
    '12H': '12h',
    '24H': '24h',
  },

  // Week start days
  WEEK_START: {
    SATURDAY: 'saturday',
    SUNDAY: 'sunday',
    MONDAY: 'monday',
  },

  // Notification preferences
  NOTIFICATIONS: {
    EMAIL: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      CATEGORIES: ['orders', 'promotions', 'newsletter', 'security', 'support'],
    },
    SMS: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      CATEGORIES: ['orders', 'security', 'delivery'],
    },
    PUSH: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      CATEGORIES: ['orders', 'promotions', 'security', 'reminders'],
    },
    IN_APP: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      CATEGORIES: ['orders', 'promotions', 'security', 'reminders', 'system'],
    },
  },

  // Display preferences
  DISPLAY: {
    THEME: 'light',
    FONT_SIZE: 'medium',
    COMPACT_VIEW: false,
    SHOW_IMAGES: true,
    ANIMATIONS: true,
    REDUCED_MOTION: false,
    HIGH_CONTRAST: false,
  },

  // Shopping preferences
  SHOPPING: {
    DEFAULT_SHIPPING_ADDRESS: null,
    DEFAULT_BILLING_ADDRESS: null,
    DEFAULT_PAYMENT_METHOD: null,
    SAVE_CARDS: true,
    REMEMBER_ME: true,
    WISHLIST_VISIBILITY: 'public',
    REVIEWS_VISIBILITY: 'public',
  },

  // Privacy preferences
  PRIVACY: {
    PROFILE_VISIBILITY: 'public',
    ONLINE_STATUS: true,
    SHOW_ACTIVITY: true,
    ALLOW_SEARCH: true,
    ALLOW_MESSAGES: true,
    ALLOW_COMMENTS: true,
    READ_RECEIPTS: true,
  },

  // Communication preferences
  COMMUNICATION: {
    EMAIL: {
      ORDER_CONFIRMATION: true,
      ORDER_SHIPPED: true,
      ORDER_DELIVERED: true,
      PROMOTIONAL: true,
      NEWSLETTER: true,
      SUPPORT_RESPONSE: true,
      SECURITY_ALERTS: true,
      ACCOUNT_UPDATES: true,
    },
    SMS: {
      ORDER_SHIPPED: true,
      ORDER_DELIVERED: true,
      OTP: true,
      SECURITY_ALERTS: true,
    },
    WHATSAPP: {
      ORDER_SHIPPED: true,
      ORDER_DELIVERED: true,
      SUPPORT_RESPONSE: true,
    },
  },

  // Accessibility preferences
  ACCESSIBILITY: {
    FONT_SIZE: 'medium',
    HIGH_CONTRAST: false,
    REDUCED_MOTION: false,
    SCREEN_READER: false,
    KEYBOARD_NAVIGATION: true,
    LARGE_CURSOR: false,
    COLOR_BLIND_MODE: false,
  },

  // Preferences fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    LANGUAGE: 'language',
    CURRENCY: 'currency',
    TIMEZONE: 'timezone',
    DATE_FORMAT: 'dateFormat',
    TIME_FORMAT: 'timeFormat',
    WEEK_START: 'weekStart',
    NOTIFICATIONS: 'notifications',
    DISPLAY: 'display',
    SHOPPING: 'shopping',
    PRIVACY: 'privacy',
    COMMUNICATION: 'communication',
    ACCESSIBILITY: 'accessibility',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Font size options
  FONT_SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    EXTRA_LARGE: 'extra-large',
  },

  // Frequency options
  FREQUENCY: {
    REALTIME: 'realtime',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    NEVER: 'never',
  },
} as const;

export type UserPreferencesLanguage =
  (typeof USER_PREFERENCES.LANGUAGES)[keyof typeof USER_PREFERENCES.LANGUAGES];
export type UserPreferencesCurrency =
  (typeof USER_PREFERENCES.CURRENCIES)[keyof typeof USER_PREFERENCES.CURRENCIES];
export type UserPreferencesDateFormat =
  (typeof USER_PREFERENCES.DATE_FORMATS)[keyof typeof USER_PREFERENCES.DATE_FORMATS];
export type UserPreferencesTimeFormat =
  (typeof USER_PREFERENCES.TIME_FORMATS)[keyof typeof USER_PREFERENCES.TIME_FORMATS];
export type UserPreferencesWeekStart =
  (typeof USER_PREFERENCES.WEEK_START)[keyof typeof USER_PREFERENCES.WEEK_START];
export type UserPreferencesFontSize =
  (typeof USER_PREFERENCES.FONT_SIZES)[keyof typeof USER_PREFERENCES.FONT_SIZES];
export type UserPreferencesFrequency =
  (typeof USER_PREFERENCES.FREQUENCY)[keyof typeof USER_PREFERENCES.FREQUENCY];

export function getLanguageLabel(language: UserPreferencesLanguage): string {
  const labels: Record<UserPreferencesLanguage, string> = {
    [USER_PREFERENCES.LANGUAGES.BENGALI]: 'Bengali',
    [USER_PREFERENCES.LANGUAGES.ENGLISH]: 'English',
    [USER_PREFERENCES.LANGUAGES.ARABIC]: 'Arabic',
    [USER_PREFERENCES.LANGUAGES.HINDI]: 'Hindi',
    [USER_PREFERENCES.LANGUAGES.URDU]: 'Urdu',
  };
  return labels[language] || 'Unknown';
}

export function getCurrencySymbol(currency: UserPreferencesCurrency): string {
  const symbols: Record<UserPreferencesCurrency, string> = {
    [USER_PREFERENCES.CURRENCIES.BDT]: '৳',
    [USER_PREFERENCES.CURRENCIES.USD]: '$',
    [USER_PREFERENCES.CURRENCIES.EUR]: '€',
    [USER_PREFERENCES.CURRENCIES.GBP]: '£',
    [USER_PREFERENCES.CURRENCIES.INR]: '₹',
    [USER_PREFERENCES.CURRENCIES.AED]: 'د.إ',
    [USER_PREFERENCES.CURRENCIES.SAR]: '﷼',
  };
  return symbols[currency] || '৳';
}

export function getDateFormatLabel(format: UserPreferencesDateFormat): string {
  const labels: Record<UserPreferencesDateFormat, string> = {
    [USER_PREFERENCES.DATE_FORMATS.DD_MM_YYYY]: 'DD/MM/YYYY',
    [USER_PREFERENCES.DATE_FORMATS.MM_DD_YYYY]: 'MM/DD/YYYY',
    [USER_PREFERENCES.DATE_FORMATS.YYYY_MM_DD]: 'YYYY/MM/DD',
    [USER_PREFERENCES.DATE_FORMATS.DD_MM_YY]: 'DD/MM/YY',
    [USER_PREFERENCES.DATE_FORMATS.MM_DD_YY]: 'MM/DD/YY',
    [USER_PREFERENCES.DATE_FORMATS.YYYY_MM_DD_DASH]: 'YYYY-MM-DD',
  };
  return labels[format] || 'DD/MM/YYYY';
}

export function getTimeFormatLabel(format: UserPreferencesTimeFormat): string {
  const labels: Record<UserPreferencesTimeFormat, string> = {
    [USER_PREFERENCES.TIME_FORMATS['12H']]: '12-hour',
    [USER_PREFERENCES.TIME_FORMATS['24H']]: '24-hour',
  };
  return labels[format] || '24-hour';
}

export function getWeekStartLabel(day: UserPreferencesWeekStart): string {
  const labels: Record<UserPreferencesWeekStart, string> = {
    [USER_PREFERENCES.WEEK_START.SATURDAY]: 'Saturday',
    [USER_PREFERENCES.WEEK_START.SUNDAY]: 'Sunday',
    [USER_PREFERENCES.WEEK_START.MONDAY]: 'Monday',
  };
  return labels[day] || 'Saturday';
}

export function getFontSizeLabel(size: UserPreferencesFontSize): string {
  const labels: Record<UserPreferencesFontSize, string> = {
    [USER_PREFERENCES.FONT_SIZES.SMALL]: 'Small',
    [USER_PREFERENCES.FONT_SIZES.MEDIUM]: 'Medium',
    [USER_PREFERENCES.FONT_SIZES.LARGE]: 'Large',
    [USER_PREFERENCES.FONT_SIZES.EXTRA_LARGE]: 'Extra Large',
  };
  return labels[size] || 'Medium';
}

export function getFrequencyLabel(frequency: UserPreferencesFrequency): string {
  const labels: Record<UserPreferencesFrequency, string> = {
    [USER_PREFERENCES.FREQUENCY.REALTIME]: 'Real-time',
    [USER_PREFERENCES.FREQUENCY.HOURLY]: 'Hourly',
    [USER_PREFERENCES.FREQUENCY.DAILY]: 'Daily',
    [USER_PREFERENCES.FREQUENCY.WEEKLY]: 'Weekly',
    [USER_PREFERENCES.FREQUENCY.MONTHLY]: 'Monthly',
    [USER_PREFERENCES.FREQUENCY.NEVER]: 'Never',
  };
  return labels[frequency] || 'Real-time';
}

export function getDefaultDisplayPreferences() {
  return USER_PREFERENCES.DISPLAY;
}

export function getDefaultShoppingPreferences() {
  return USER_PREFERENCES.SHOPPING;
}

export function getDefaultPrivacyPreferences() {
  return USER_PREFERENCES.PRIVACY;
}

export function getDefaultCommunicationPreferences() {
  return USER_PREFERENCES.COMMUNICATION;
}

export function getDefaultAccessibilityPreferences() {
  return USER_PREFERENCES.ACCESSIBILITY;
}

export function getDefaultNotificationPreferences() {
  return USER_PREFERENCES.NOTIFICATIONS;
}

export function getLanguageOptions(): UserPreferencesLanguage[] {
  return Object.values(USER_PREFERENCES.LANGUAGES);
}

export function getCurrencyOptions(): UserPreferencesCurrency[] {
  return Object.values(USER_PREFERENCES.CURRENCIES);
}

export function getDateFormatOptions(): UserPreferencesDateFormat[] {
  return Object.values(USER_PREFERENCES.DATE_FORMATS);
}

export function getTimeFormatOptions(): UserPreferencesTimeFormat[] {
  return Object.values(USER_PREFERENCES.TIME_FORMATS);
}

export function getWeekStartOptions(): UserPreferencesWeekStart[] {
  return Object.values(USER_PREFERENCES.WEEK_START);
}

export function getFontSizeOptions(): UserPreferencesFontSize[] {
  return Object.values(USER_PREFERENCES.FONT_SIZES);
}

export function getFrequencyOptions(): UserPreferencesFrequency[] {
  return Object.values(USER_PREFERENCES.FREQUENCY);
}

export function isNotificationEnabled(
  notifications: typeof USER_PREFERENCES.NOTIFICATIONS,
  channel: keyof typeof USER_PREFERENCES.NOTIFICATIONS
): boolean {
  return notifications[channel]?.ENABLED ?? false;
}

export function getNotificationFrequency(
  notifications: typeof USER_PREFERENCES.NOTIFICATIONS,
  channel: keyof typeof USER_PREFERENCES.NOTIFICATIONS
): UserPreferencesFrequency {
  return notifications[channel]?.FREQUENCY || USER_PREFERENCES.FREQUENCY.REALTIME;
}

export function getNotificationCategories(
  notifications: typeof USER_PREFERENCES.NOTIFICATIONS,
  channel: keyof typeof USER_PREFERENCES.NOTIFICATIONS
): readonly string[] {
  return notifications[channel]?.CATEGORIES || [];
}
