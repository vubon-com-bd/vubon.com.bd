import { BaseEntity } from '../common/base.types';
import { USER_SETTINGS } from '@vubon/shared-constants/src/user/user-settings.constants';
import { LANGUAGE } from '@vubon/shared-constants/src/common/language.constants';
import { TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

/**
 * Notification preferences — moved to user scope (was in auth)
 */
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

/**
 * Privacy settings interface
 */
export interface PrivacySettings {
  profileVisibility: string;
  emailVisibility: boolean;
  phoneVisibility: boolean;
  addressVisibility: boolean;
}

/**
 * Value types
 */
export type UserSettingsKey = (typeof USER_SETTINGS)[keyof typeof USER_SETTINGS];
export type LanguageValue = (typeof LANGUAGE)[keyof typeof LANGUAGE];
export type TimezoneValue = (typeof TIMEZONE)[keyof typeof TIMEZONE];
export type CurrencyValue = keyof typeof CURRENCY;

/**
 * User settings interface
 */
export interface UserSettings extends BaseEntity {
  settingsId: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: LanguageValue;
  timezone: TimezoneValue;
  currency: CurrencyValue;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  metadata: Record<string, unknown>;
}
