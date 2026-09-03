/**
 * Settings Configuration
 * ইউজার সেটিংস কনফিগারেশন
 */

import { USER_SETTINGS } from '@vubon/shared-constants';

export interface SettingsConfig {
  notifications: {
    email: {
      enabled: boolean;
      digestOptions: string[];
      typeOptions: string[];
    };
    sms: {
      enabled: boolean;
      typeOptions: string[];
    };
    push: {
      enabled: boolean;
      typeOptions: string[];
    };
    inApp: {
      enabled: boolean;
      typeOptions: string[];
    };
  };
  privacy: {
    profileVisibilityOptions: string[];
    onlineStatusOptions: string[];
    lastSeenOptions: string[];
  };
  display: {
    themeOptions: string[];
    languageOptions: string[];
    timezoneOptions: string[];
    dateFormatOptions: string[];
    timeFormatOptions: string[];
    numberFormatOptions: string[];
  };
  security: {
    sessionTimeoutMin: number;
    sessionTimeoutMax: number;
  };
}

export const createSettingsConfig = (): SettingsConfig => ({
  notifications: {
    email: {
      enabled: USER_SETTINGS.NOTIFICATIONS.EMAIL.ENABLED,
      digestOptions: [...USER_SETTINGS.NOTIFICATIONS.EMAIL.DIGEST],
      typeOptions: [...USER_SETTINGS.NOTIFICATIONS.EMAIL.TYPES],
    },
    sms: {
      enabled: USER_SETTINGS.NOTIFICATIONS.SMS.ENABLED,
      typeOptions: [...USER_SETTINGS.NOTIFICATIONS.SMS.TYPES],
    },
    push: {
      enabled: USER_SETTINGS.NOTIFICATIONS.PUSH.ENABLED,
      typeOptions: [...USER_SETTINGS.NOTIFICATIONS.PUSH.TYPES],
    },
    inApp: {
      enabled: USER_SETTINGS.NOTIFICATIONS.IN_APP.ENABLED,
      typeOptions: [...USER_SETTINGS.NOTIFICATIONS.IN_APP.TYPES],
    },
  },
  privacy: {
    profileVisibilityOptions: ['public', 'private', 'contacts', 'friends', 'custom'],
    onlineStatusOptions: ['visible', 'hidden', 'contacts'],
    lastSeenOptions: ['visible', 'hidden', 'contacts'],
  },
  display: {
    themeOptions: ['light', 'dark', 'system'],
    languageOptions: ['bn', 'en'],
    timezoneOptions: ['Asia/Dhaka', 'UTC', 'America/New_York', 'Europe/London'],
    dateFormatOptions: ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM-DD-YYYY'],
    timeFormatOptions: ['12h', '24h'],
    numberFormatOptions: ['standard', 'compact', 'scientific'],
  },
  security: {
    sessionTimeoutMin: 60,
    sessionTimeoutMax: 86400,
  },
});
