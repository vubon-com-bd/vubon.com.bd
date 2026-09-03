/**
 * User Settings Types
 * ইউজার সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_SETTINGS } from '@vubon/shared-constants';

export interface UserSettings extends BaseEntity {
  userId: string;
  notifications: {
    email: {
      enabled: boolean;
      digest: typeof USER_SETTINGS.NOTIFICATIONS.EMAIL.DIGEST;
      types: (typeof USER_SETTINGS.NOTIFICATIONS.EMAIL.TYPES)[number][];
    };
    sms: {
      enabled: boolean;
      types: (typeof USER_SETTINGS.NOTIFICATIONS.SMS.TYPES)[number][];
    };
    push: {
      enabled: boolean;
      types: (typeof USER_SETTINGS.NOTIFICATIONS.PUSH.TYPES)[number][];
    };
    inApp: {
      enabled: boolean;
      types: (typeof USER_SETTINGS.NOTIFICATIONS.IN_APP.TYPES)[number][];
    };
  };
  privacy: {
    profileVisibility: typeof USER_SETTINGS.PRIVACY.PROFILE_VISIBILITY;
    onlineStatus: typeof USER_SETTINGS.PRIVACY.ONLINE_STATUS;
    lastSeen: typeof USER_SETTINGS.PRIVACY.LAST_SEEN;
    readReceipts: typeof USER_SETTINGS.PRIVACY.READ_RECEIPTS;
    shareAnalytics: typeof USER_SETTINGS.PRIVACY.SHARE_ANALYTICS;
    acceptCookies: typeof USER_SETTINGS.PRIVACY.ACCEPT_COOKIES;
  };
  display: {
    theme: typeof USER_SETTINGS.DISPLAY.THEME;
    language: typeof USER_SETTINGS.DISPLAY.LANGUAGE;
    timezone: typeof USER_SETTINGS.DISPLAY.TIMEZONE;
    dateFormat: typeof USER_SETTINGS.DISPLAY.DATE_FORMAT;
    timeFormat: typeof USER_SETTINGS.DISPLAY.TIME_FORMAT;
    currency: typeof USER_SETTINGS.DISPLAY.CURRENCY;
    numberFormat: typeof USER_SETTINGS.DISPLAY.NUMBER_FORMAT;
    compactMode: typeof USER_SETTINGS.DISPLAY.COMPACT_MODE;
    reducedMotion: typeof USER_SETTINGS.DISPLAY.REDUCED_MOTION;
    highContrast: typeof USER_SETTINGS.DISPLAY.HIGH_CONTRAST;
  };
  security: {
    twoFactorAuth: typeof USER_SETTINGS.SECURITY.TWO_FACTOR_AUTH;
    biometric: typeof USER_SETTINGS.SECURITY.BIOMETRIC;
    sessionTimeout: typeof USER_SETTINGS.SECURITY.SESSION_TIMEOUT;
    rememberMe: typeof USER_SETTINGS.SECURITY.REMEMBER_ME;
    trustedDevices: typeof USER_SETTINGS.SECURITY.TRUSTED_DEVICES;
    loginAlerts: typeof USER_SETTINGS.SECURITY.LOGIN_ALERTS;
    suspiciousActivityAlert: typeof USER_SETTINGS.SECURITY.SUSPICIOUS_ACTIVITY_ALERT;
  };
  metadata?: Record<string, unknown>;
}

// USER_SETTINGS ব্যবহার করে টাইপ তৈরি করা
export type UserSettingsNotificationDigest = typeof USER_SETTINGS.NOTIFICATIONS.EMAIL.DIGEST;
export type UserSettingsTheme = typeof USER_SETTINGS.DISPLAY.THEME;
export type UserSettingsLanguage = typeof USER_SETTINGS.DISPLAY.LANGUAGE;
export type UserSettingsTimeFormat = typeof USER_SETTINGS.DISPLAY.TIME_FORMAT;
export type UserSettingsDateFormat = typeof USER_SETTINGS.DISPLAY.DATE_FORMAT;
export type UserSettingsCurrency = typeof USER_SETTINGS.DISPLAY.CURRENCY;

// Empty interface সরিয়ে type alias ব্যবহার করা
export type UserSettingsUpdateInput = Partial<Omit<UserSettings, keyof BaseEntity>>;
export type UserSettingsCreateInput = Omit<UserSettings, keyof BaseEntity>;
