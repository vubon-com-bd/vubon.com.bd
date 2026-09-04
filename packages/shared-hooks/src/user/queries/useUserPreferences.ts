/**
 * useUserPreferences Hook
 * ইউজার প্রেফারেন্স পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { PreferencesEndpoints } from '@vubon/shared-api';
import { UserPreferences } from '@vubon/shared-types';
import { USER_PREFERENCES } from '@vubon/shared-constants';

export const useUserPreferences = (preferencesEndpoints: PreferencesEndpoints) => {
  const {
    data: preferences,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', 'preferences'],
    queryFn: async (): Promise<UserPreferences> => {
      // PreferencesEndpoints থেকে ডেটা ফেচ করা
      let result = null;
      try {
        result = await preferencesEndpoints.getPreferences();
      } catch {
        // যদি ফেচ ব্যর্থ হয়, null ধরা হবে
      }

      // ডিফল্ট প্রেফারেন্স তৈরি করা
      const defaultPreferences: UserPreferences = {
        id: '',
        userId: 'me',
        content: {
          language: USER_PREFERENCES.DEFAULTS.LANGUAGE,
          region: 'BD',
          contentType: ['article', 'video', 'image'],
          notificationTypes: ['email', 'push'],
        },
        ui: {
          theme: USER_PREFERENCES.DEFAULTS.THEME,
          layout: 'default',
          navigation: 'sidebar',
          compact: false,
          animations: true,
          sound: true,
          vibration: true,
        },
        communication: {
          emailFrequency: USER_PREFERENCES.DEFAULTS.EMAIL_FREQUENCY,
          smsEnabled: true,
          pushEnabled: true,
          inAppEnabled: true,
          marketingEmails: false,
          newsletter: false,
        },
        accessibility: {
          fontSize: USER_PREFERENCES.DEFAULTS.FONT_SIZE,
          highContrast: false,
          reducedMotion: false,
          screenReader: false,
          captions: false,
        },
        metadata: {} as Record<string, unknown>,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // যদি রেজাল্ট না থাকে, ডিফল্ট রিটার্ন
      if (!result) {
        return defaultPreferences;
      }

      // রেজাল্ট থেকে মান নেওয়া (যদি থাকে)
      return {
        id: typeof result.id === 'string' ? result.id : defaultPreferences.id,
        userId: typeof result.userId === 'string' ? result.userId : defaultPreferences.userId,
        content: {
          language:
            typeof result.language === 'string'
              ? (result.language as 'bn' | 'en')
              : defaultPreferences.content.language,
          region:
            typeof result.region === 'string' ? result.region : defaultPreferences.content.region,
          contentType: Array.isArray(result.contentType)
            ? result.contentType
            : defaultPreferences.content.contentType,
          notificationTypes: Array.isArray(result.notificationTypes)
            ? result.notificationTypes
            : defaultPreferences.content.notificationTypes,
        },
        ui: {
          theme:
            typeof result.theme === 'string'
              ? (result.theme as 'light' | 'dark' | 'system')
              : defaultPreferences.ui.theme,
          layout:
            typeof result.layout === 'string'
              ? (result.layout as 'default' | 'compact' | 'sidebar')
              : defaultPreferences.ui.layout,
          navigation:
            typeof result.navigation === 'string'
              ? (result.navigation as 'sidebar' | 'top' | 'bottom')
              : defaultPreferences.ui.navigation,
          compact:
            typeof result.compact === 'boolean' ? result.compact : defaultPreferences.ui.compact,
          animations:
            typeof result.animations === 'boolean'
              ? result.animations
              : defaultPreferences.ui.animations,
          sound: typeof result.sound === 'boolean' ? result.sound : defaultPreferences.ui.sound,
          vibration:
            typeof result.vibration === 'boolean'
              ? result.vibration
              : defaultPreferences.ui.vibration,
        },
        communication: {
          emailFrequency:
            typeof result.emailFrequency === 'string'
              ? (result.emailFrequency as 'daily' | 'weekly' | 'monthly' | 'never')
              : defaultPreferences.communication.emailFrequency,
          smsEnabled:
            typeof result.smsEnabled === 'boolean'
              ? result.smsEnabled
              : defaultPreferences.communication.smsEnabled,
          pushEnabled:
            typeof result.pushEnabled === 'boolean'
              ? result.pushEnabled
              : defaultPreferences.communication.pushEnabled,
          inAppEnabled:
            typeof result.inAppEnabled === 'boolean'
              ? result.inAppEnabled
              : defaultPreferences.communication.inAppEnabled,
          marketingEmails:
            typeof result.marketingEmails === 'boolean'
              ? result.marketingEmails
              : defaultPreferences.communication.marketingEmails,
          newsletter:
            typeof result.newsletter === 'boolean'
              ? result.newsletter
              : defaultPreferences.communication.newsletter,
        },
        accessibility: {
          fontSize:
            typeof result.fontSize === 'string'
              ? (result.fontSize as 'small' | 'medium' | 'large' | 'x-large')
              : defaultPreferences.accessibility.fontSize,
          highContrast:
            typeof result.highContrast === 'boolean'
              ? result.highContrast
              : defaultPreferences.accessibility.highContrast,
          reducedMotion:
            typeof result.reducedMotion === 'boolean'
              ? result.reducedMotion
              : defaultPreferences.accessibility.reducedMotion,
          screenReader:
            typeof result.screenReader === 'boolean'
              ? result.screenReader
              : defaultPreferences.accessibility.screenReader,
          captions:
            typeof result.captions === 'boolean'
              ? result.captions
              : defaultPreferences.accessibility.captions,
        },
        metadata: (result.metadata && typeof result.metadata === 'object'
          ? result.metadata
          : {}) as Record<string, unknown>,
        createdAt:
          result.createdAt instanceof Date ? result.createdAt : defaultPreferences.createdAt,
        updatedAt:
          result.updatedAt instanceof Date ? result.updatedAt : defaultPreferences.updatedAt,
        deletedAt:
          result.deletedAt instanceof Date ? result.deletedAt : defaultPreferences.deletedAt,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    preferences,
    isLoading,
    error,
    refetch,
  };
};
