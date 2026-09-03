/**
 * Settings Validator
 * ইউজার সেটিংস ভ্যালিডেটর
 */

import {
  UserSettings,
  UserSettingsCreateInput,
  UserSettingsUpdateInput,
} from '@vubon/shared-types';

// লোকাল টাইপ ডিফাইন - UserSettings টাইপের সাথে মিলিয়ে
type DefaultSettings = {
  notifications: {
    email: {
      enabled: boolean;
      digest: 'daily' | 'weekly' | 'monthly' | 'never';
      types: ('all' | 'important' | 'none')[];
    };
    sms: { enabled: boolean; types: ('all' | 'otp' | 'none')[] };
    push: { enabled: boolean; types: ('all' | 'important' | 'none')[] };
    inApp: { enabled: boolean; types: ('all' | 'important' | 'none')[] };
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts' | 'friends' | 'custom';
    onlineStatus: 'visible' | 'hidden' | 'contacts';
    lastSeen: 'visible' | 'hidden' | 'contacts';
    readReceipts: boolean;
    shareAnalytics: boolean;
    acceptCookies: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'bn';
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    currency: 'BDT' | 'USD';
    numberFormat: 'standard' | 'compact' | 'scientific';
    compactMode: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    biometric: boolean;
    sessionTimeout: number;
    rememberMe: boolean;
    trustedDevices: boolean;
    loginAlerts: boolean;
    suspiciousActivityAlert: boolean;
  };
};

export const SettingsValidator = {
  /**
   * Validate settings data
   * সেটিংস ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserSettings>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.display?.timezone && !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      errors.push('Invalid timezone');
    }

    if (data.display?.language && data.display.language.length !== 2) {
      errors.push('Language must be a 2-letter code');
    }

    if (data.display?.currency && data.display.currency.length !== 3) {
      errors.push('Currency must be a 3-letter code');
    }

    if (data.security?.sessionTimeout && data.security.sessionTimeout < 60) {
      errors.push('Session timeout must be at least 60 seconds');
    }

    if (
      data.notifications?.email?.digest &&
      !['daily', 'weekly', 'monthly', 'never'].includes(data.notifications.email.digest)
    ) {
      errors.push('Invalid email digest frequency');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate settings creation
   * সেটিংস তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserSettingsCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (data.display?.timezone && !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      errors.push('Invalid timezone');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate settings update
   * সেটিংস আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserSettingsUpdateInput): { valid: boolean; errors: string[] } => {
    return SettingsValidator.validate(data);
  },

  /**
   * Get default settings
   * ডিফল্ট সেটিংস পাওয়া
   */
  getDefaults: (): DefaultSettings => {
    return {
      notifications: {
        email: { enabled: true, digest: 'daily', types: ['all'] },
        sms: { enabled: true, types: ['all'] },
        push: { enabled: true, types: ['all'] },
        inApp: { enabled: true, types: ['all'] },
      },
      privacy: {
        profileVisibility: 'public',
        onlineStatus: 'visible',
        lastSeen: 'visible',
        readReceipts: true,
        shareAnalytics: true,
        acceptCookies: true,
      },
      display: {
        theme: 'light',
        language: 'bn',
        timezone: 'Asia/Dhaka',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        currency: 'BDT',
        numberFormat: 'standard',
        compactMode: false,
        reducedMotion: false,
        highContrast: false,
      },
      security: {
        twoFactorAuth: false,
        biometric: false,
        sessionTimeout: 3600,
        rememberMe: true,
        trustedDevices: true,
        loginAlerts: true,
        suspiciousActivityAlert: true,
      },
    };
  },
};
