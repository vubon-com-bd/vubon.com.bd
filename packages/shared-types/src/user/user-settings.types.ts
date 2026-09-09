import { BaseEntity } from '../common/base.types';
import { USER_SETTINGS } from '@vubon/shared-constants/src/user/user-settings.constants';
import { NotificationPreferences } from '../auth/auth-preferences.types';

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
 * User settings interface
 */
export interface UserSettings extends BaseEntity {
  settingsId: string;
  userId: string;
  theme: keyof typeof USER_SETTINGS;
  language: string;
  timezone: string;
  currency: string;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  metadata: Record<string, unknown>;
}
