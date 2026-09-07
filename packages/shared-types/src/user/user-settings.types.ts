import { USER_SETTINGS } from '@vubon/shared-constants';

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export interface PrivacySettings {
  profileVisibility: string;
  emailVisibility: boolean;
  phoneVisibility: boolean;
  addressVisibility: boolean;
}

export interface UserSettings {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
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
