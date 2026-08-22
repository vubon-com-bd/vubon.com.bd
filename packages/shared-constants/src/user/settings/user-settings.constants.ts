/**
 * User Settings Constants
 * Core user settings-related constants
 */

import { USER_SETTINGS_TYPE } from './user-settings-type.constants';
import { USER_SETTINGS_STATUS } from './user-settings-status.constants';

export const USER_SETTINGS = {
  // Default values
  DEFAULTS: {
    STATUS: USER_SETTINGS_STATUS.ACTIVE,
    TYPE: USER_SETTINGS_TYPE.GENERAL,
    CURRENCY: 'BDT',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    COUNTRY: 'Bangladesh',
    THEME: 'light',
  },

  // Theme options
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
    CUSTOM: 'custom',
  },

  // Notification preferences
  NOTIFICATION_PREFERENCES: {
    EMAIL: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      TYPES: ['order', 'promotion', 'newsletter', 'support', 'security'],
    },
    SMS: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      TYPES: ['order', 'security', 'delivery'],
    },
    PUSH: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      TYPES: ['order', 'promotion', 'support', 'reminder'],
    },
    IN_APP: {
      ENABLED: true,
      FREQUENCY: 'realtime',
      TYPES: ['order', 'promotion', 'support', 'reminder', 'system'],
    },
  },

  // Privacy settings
  PRIVACY: {
    PROFILE_VISIBILITY: 'public',
    ONLINE_STATUS: true,
    READ_RECEIPTS: true,
    SHOW_ACTIVITY: true,
    ALLOW_SEARCH: true,
    ALLOW_FOLLOW: true,
    ALLOW_MESSAGES: true,
    ALLOW_COMMENTS: true,
  },

  // Security settings
  SECURITY: {
    TWO_FACTOR_AUTH: false,
    TWO_FACTOR_METHOD: 'authenticator',
    SESSION_TIMEOUT: 3600,
    MAX_LOGIN_ATTEMPTS: 5,
    PASSWORD_EXPIRY_DAYS: 90,
    REQUIRE_PASSWORD_CHANGE: false,
    TRUSTED_DEVICES: [],
    ALLOWED_IPS: [],
    BLOCKED_IPS: [],
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

  // Settings fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    CURRENCY: 'currency',
    LANGUAGE: 'language',
    TIMEZONE: 'timezone',
    COUNTRY: 'country',
    THEME: 'theme',
    NOTIFICATIONS: 'notifications',
    PRIVACY: 'privacy',
    SECURITY: 'security',
    COMMUNICATION: 'communication',
    PREFERENCES: 'preferences',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
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

  // Two-factor authentication methods
  TWO_FACTOR_METHODS: {
    AUTHENTICATOR: 'authenticator',
    SMS: 'sms',
    EMAIL: 'email',
    BACKUP_CODES: 'backup-codes',
    BIOMETRIC: 'biometric',
  },

  // Session timeout options (in seconds)
  SESSION_TIMEOUTS: {
    FIFTEEN_MINUTES: 900,
    THIRTY_MINUTES: 1800,
    ONE_HOUR: 3600,
    TWO_HOURS: 7200,
    FOUR_HOURS: 14400,
    EIGHT_HOURS: 28800,
    TWELVE_HOURS: 43200,
    TWENTY_FOUR_HOURS: 86400,
  },
} as const;

export type UserSettingsTheme = (typeof USER_SETTINGS.THEME)[keyof typeof USER_SETTINGS.THEME];
export type UserSettingsFrequency =
  (typeof USER_SETTINGS.FREQUENCY)[keyof typeof USER_SETTINGS.FREQUENCY];
export type TwoFactorMethod =
  (typeof USER_SETTINGS.TWO_FACTOR_METHODS)[keyof typeof USER_SETTINGS.TWO_FACTOR_METHODS];
export type SessionTimeout =
  (typeof USER_SETTINGS.SESSION_TIMEOUTS)[keyof typeof USER_SETTINGS.SESSION_TIMEOUTS];

export function getThemeLabel(theme: UserSettingsTheme): string {
  const labels: Record<UserSettingsTheme, string> = {
    [USER_SETTINGS.THEME.LIGHT]: 'Light',
    [USER_SETTINGS.THEME.DARK]: 'Dark',
    [USER_SETTINGS.THEME.SYSTEM]: 'System Default',
    [USER_SETTINGS.THEME.CUSTOM]: 'Custom',
  };
  return labels[theme] || 'Light';
}

export function getFrequencyLabel(frequency: UserSettingsFrequency): string {
  const labels: Record<UserSettingsFrequency, string> = {
    [USER_SETTINGS.FREQUENCY.REALTIME]: 'Real-time',
    [USER_SETTINGS.FREQUENCY.HOURLY]: 'Hourly',
    [USER_SETTINGS.FREQUENCY.DAILY]: 'Daily',
    [USER_SETTINGS.FREQUENCY.WEEKLY]: 'Weekly',
    [USER_SETTINGS.FREQUENCY.MONTHLY]: 'Monthly',
    [USER_SETTINGS.FREQUENCY.NEVER]: 'Never',
  };
  return labels[frequency] || 'Unknown';
}

export function getTwoFactorMethodLabel(method: TwoFactorMethod): string {
  const labels: Record<TwoFactorMethod, string> = {
    [USER_SETTINGS.TWO_FACTOR_METHODS.AUTHENTICATOR]: 'Authenticator App',
    [USER_SETTINGS.TWO_FACTOR_METHODS.SMS]: 'SMS',
    [USER_SETTINGS.TWO_FACTOR_METHODS.EMAIL]: 'Email',
    [USER_SETTINGS.TWO_FACTOR_METHODS.BACKUP_CODES]: 'Backup Codes',
    [USER_SETTINGS.TWO_FACTOR_METHODS.BIOMETRIC]: 'Biometric',
  };
  return labels[method] || 'Unknown';
}

export function getSessionTimeoutLabel(timeout: SessionTimeout): string {
  const labels: Record<SessionTimeout, string> = {
    [USER_SETTINGS.SESSION_TIMEOUTS.FIFTEEN_MINUTES]: '15 minutes',
    [USER_SETTINGS.SESSION_TIMEOUTS.THIRTY_MINUTES]: '30 minutes',
    [USER_SETTINGS.SESSION_TIMEOUTS.ONE_HOUR]: '1 hour',
    [USER_SETTINGS.SESSION_TIMEOUTS.TWO_HOURS]: '2 hours',
    [USER_SETTINGS.SESSION_TIMEOUTS.FOUR_HOURS]: '4 hours',
    [USER_SETTINGS.SESSION_TIMEOUTS.EIGHT_HOURS]: '8 hours',
    [USER_SETTINGS.SESSION_TIMEOUTS.TWELVE_HOURS]: '12 hours',
    [USER_SETTINGS.SESSION_TIMEOUTS.TWENTY_FOUR_HOURS]: '24 hours',
  };
  return labels[timeout] || 'Unknown';
}

export function isTwoFactorEnabled(settings: {
  SECURITY: {
    TWO_FACTOR_AUTH: boolean;
  };
}): boolean {
  return settings.SECURITY.TWO_FACTOR_AUTH;
}

export function getDefaultNotificationSettings() {
  return USER_SETTINGS.NOTIFICATION_PREFERENCES;
}

export function getDefaultPrivacySettings() {
  return USER_SETTINGS.PRIVACY;
}

export function getDefaultSecuritySettings() {
  return USER_SETTINGS.SECURITY;
}

export function getDefaultCommunicationSettings() {
  return USER_SETTINGS.COMMUNICATION;
}

export function getSessionTimeoutOptions(): SessionTimeout[] {
  return Object.values(USER_SETTINGS.SESSION_TIMEOUTS);
}

export function getTwoFactorMethods(): TwoFactorMethod[] {
  return Object.values(USER_SETTINGS.TWO_FACTOR_METHODS);
}

export function getThemeOptions(): UserSettingsTheme[] {
  return Object.values(USER_SETTINGS.THEME);
}

export function getFrequencyOptions(): UserSettingsFrequency[] {
  return Object.values(USER_SETTINGS.FREQUENCY);
}

export function isSecurePassword(password: string): boolean {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecial;
}

// রিনেম করা ফাংশন (User প্রিফিক্স যোগ করা হয়েছে)
export function isUserSettingsActive(status: string): boolean {
  return status === USER_SETTINGS_STATUS.ACTIVE;
}

export function isUserSettingsRestricted(status: string): boolean {
  // RESTRICTED না থাকায় SUSPENDED চেক করা হচ্ছে
  return status === USER_SETTINGS_STATUS.SUSPENDED;
}

export function canUserModifySettings(status: string): boolean {
  return status === USER_SETTINGS_STATUS.ACTIVE || status === USER_SETTINGS_STATUS.INACTIVE;
}
