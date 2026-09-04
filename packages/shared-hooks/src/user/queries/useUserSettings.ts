/**
 * useUserSettings Hook
 * ইউজার সেটিংস পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { SettingsEndpoints } from '@vubon/shared-api';
import { UserSettings } from '@vubon/shared-types';
import { USER_SETTINGS } from '@vubon/shared-constants';

export const useUserSettings = (settingsEndpoints: SettingsEndpoints) => {
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', 'settings'],
    queryFn: async (): Promise<UserSettings> => {
      // SettingsEndpoints থেকে রিয়েল ডেটা ফেচ করার চেষ্টা
      const userId = 'me';

      // ডিফল্ট সেটিংস তৈরি করা
      const defaultSettings: UserSettings = {
        id: '',
        userId: userId,
        notifications: {
          email: {
            enabled: true,
            digest: USER_SETTINGS.NOTIFICATIONS.EMAIL.DIGEST as 'daily',
            types: ['all'] as ('all' | 'important' | 'none')[],
          },
          sms: {
            enabled: true,
            types: ['all'] as ('all' | 'otp' | 'none')[],
          },
          push: {
            enabled: true,
            types: ['all'] as ('all' | 'important' | 'none')[],
          },
          inApp: {
            enabled: true,
            types: ['all'] as ('all' | 'important' | 'none')[],
          },
        },
        privacy: {
          profileVisibility: USER_SETTINGS.PRIVACY.PROFILE_VISIBILITY as 'public',
          onlineStatus: USER_SETTINGS.PRIVACY.ONLINE_STATUS as 'visible',
          lastSeen: USER_SETTINGS.PRIVACY.LAST_SEEN as 'visible',
          readReceipts: USER_SETTINGS.PRIVACY.READ_RECEIPTS as true,
          shareAnalytics: USER_SETTINGS.PRIVACY.SHARE_ANALYTICS as true,
          acceptCookies: USER_SETTINGS.PRIVACY.ACCEPT_COOKIES as true,
        },
        display: {
          theme: USER_SETTINGS.DISPLAY.THEME as 'light',
          language: USER_SETTINGS.DISPLAY.LANGUAGE as 'en',
          timezone: USER_SETTINGS.DISPLAY.TIMEZONE as 'UTC',
          dateFormat: USER_SETTINGS.DISPLAY.DATE_FORMAT as 'YYYY-MM-DD',
          timeFormat: USER_SETTINGS.DISPLAY.TIME_FORMAT as '24h',
          currency: USER_SETTINGS.DISPLAY.CURRENCY as 'USD',
          numberFormat: USER_SETTINGS.DISPLAY.NUMBER_FORMAT as 'standard',
          compactMode: USER_SETTINGS.DISPLAY.COMPACT_MODE as false,
          reducedMotion: USER_SETTINGS.DISPLAY.REDUCED_MOTION as false,
          highContrast: USER_SETTINGS.DISPLAY.HIGH_CONTRAST as false,
        },
        security: {
          twoFactorAuth: USER_SETTINGS.SECURITY.TWO_FACTOR_AUTH as false,
          biometric: USER_SETTINGS.SECURITY.BIOMETRIC as false,
          sessionTimeout: USER_SETTINGS.SECURITY.SESSION_TIMEOUT as 3600,
          rememberMe: USER_SETTINGS.SECURITY.REMEMBER_ME as true,
          trustedDevices: USER_SETTINGS.SECURITY.TRUSTED_DEVICES as true,
          loginAlerts: USER_SETTINGS.SECURITY.LOGIN_ALERTS as true,
          suspiciousActivityAlert: USER_SETTINGS.SECURITY.SUSPICIOUS_ACTIVITY_ALERT as true,
        },
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      try {
        // সেটিংস ফেচ করার চেষ্টা করা
        const settingsData: Record<string, unknown> = {};

        // সেটিংস কীগুলোর তালিকা
        const settingKeys = [
          'notifications.email.enabled',
          'notifications.email.digest',
          'notifications.email.types',
          'privacy.profileVisibility',
          'display.theme',
          'display.language',
          'display.timezone',
          'display.currency',
          'security.twoFactorAuth',
          'security.sessionTimeout',
        ];

        // প্রতিটি সেটিংস ফেচ করা
        for (const key of settingKeys) {
          try {
            const result = await settingsEndpoints.getSetting(key);
            if (result && result.value !== undefined) {
              settingsData[key] = result.value;
            }
          } catch {
            // এরর হলে সেটিংস সেট না করে চলবে
          }
        }

        // ফেচ করা ডেটা দিয়ে ডিফল্ট সেটিংস ওভাররাইড করা
        const updatedSettings: UserSettings = {
          ...defaultSettings,
          notifications: {
            ...defaultSettings.notifications,
            email: {
              ...defaultSettings.notifications.email,
              enabled:
                (settingsData['notifications.email.enabled'] as boolean) ??
                defaultSettings.notifications.email.enabled,
              digest:
                (settingsData['notifications.email.digest'] as 'daily') ??
                defaultSettings.notifications.email.digest,
              types:
                (settingsData['notifications.email.types'] as ('all' | 'important' | 'none')[]) ??
                defaultSettings.notifications.email.types,
            },
          },
          privacy: {
            ...defaultSettings.privacy,
            profileVisibility:
              (settingsData['privacy.profileVisibility'] as 'public') ??
              defaultSettings.privacy.profileVisibility,
          },
          display: {
            ...defaultSettings.display,
            theme: (settingsData['display.theme'] as 'light') ?? defaultSettings.display.theme,
            language:
              (settingsData['display.language'] as 'en') ?? defaultSettings.display.language,
            timezone:
              (settingsData['display.timezone'] as 'UTC') ?? defaultSettings.display.timezone,
            currency:
              (settingsData['display.currency'] as 'USD') ?? defaultSettings.display.currency,
          },
          security: {
            ...defaultSettings.security,
            twoFactorAuth:
              (settingsData['security.twoFactorAuth'] as false) ??
              defaultSettings.security.twoFactorAuth,
            sessionTimeout:
              (settingsData['security.sessionTimeout'] as 3600) ??
              defaultSettings.security.sessionTimeout,
          },
        };

        return updatedSettings;
      } catch {
        // কোনো এরর হলে ডিফল্ট সেটিংস রিটার্ন করা
        return defaultSettings;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    settings,
    isLoading,
    error,
    refetch,
  };
};
