/**
 * User Preferences Types
 * ইউজার প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_PREFERENCES } from '@vubon/shared-constants';

export interface UserPreferences extends BaseEntity {
  userId: string;
  content: {
    language: typeof USER_PREFERENCES.CONTENT.LANGUAGE;
    region: typeof USER_PREFERENCES.CONTENT.REGION;
    contentType: (typeof USER_PREFERENCES.CONTENT.CONTENT_TYPE)[number][];
    notificationTypes: (typeof USER_PREFERENCES.CONTENT.NOTIFICATION_TYPES)[number][];
  };
  ui: {
    theme: typeof USER_PREFERENCES.UI.THEME;
    layout: typeof USER_PREFERENCES.UI.LAYOUT;
    navigation: typeof USER_PREFERENCES.UI.NAVIGATION;
    compact: typeof USER_PREFERENCES.UI.COMPACT;
    animations: typeof USER_PREFERENCES.UI.ANIMATIONS;
    sound: typeof USER_PREFERENCES.UI.SOUND;
    vibration: typeof USER_PREFERENCES.UI.VIBRATION;
  };
  communication: {
    emailFrequency: typeof USER_PREFERENCES.COMMUNICATION.EMAIL_FREQUENCY;
    smsEnabled: typeof USER_PREFERENCES.COMMUNICATION.SMS_ENABLED;
    pushEnabled: typeof USER_PREFERENCES.COMMUNICATION.PUSH_ENABLED;
    inAppEnabled: typeof USER_PREFERENCES.COMMUNICATION.IN_APP_ENABLED;
    marketingEmails: typeof USER_PREFERENCES.COMMUNICATION.MARKETING_EMAILS;
    newsletter: typeof USER_PREFERENCES.COMMUNICATION.NEWSLETTER;
  };
  accessibility: {
    fontSize: typeof USER_PREFERENCES.ACCESSIBILITY.FONT_SIZE;
    highContrast: typeof USER_PREFERENCES.ACCESSIBILITY.HIGH_CONTRAST;
    reducedMotion: typeof USER_PREFERENCES.ACCESSIBILITY.REDUCED_MOTION;
    screenReader: typeof USER_PREFERENCES.ACCESSIBILITY.SCREEN_READER;
    captions: typeof USER_PREFERENCES.ACCESSIBILITY.CAPTIONS;
  };
  metadata?: Record<string, unknown>;
}

// USER_PREFERENCES ব্যবহার করে টাইপ তৈরি করা
export type UserPreferencesTheme = typeof USER_PREFERENCES.UI.THEME;
export type UserPreferencesLanguage = typeof USER_PREFERENCES.CONTENT.LANGUAGE;
export type UserPreferencesEmailFrequency = typeof USER_PREFERENCES.COMMUNICATION.EMAIL_FREQUENCY;
export type UserPreferencesFontSize = typeof USER_PREFERENCES.ACCESSIBILITY.FONT_SIZE;

// empty interface সরিয়ে type alias ব্যবহার
export type UserPreferencesUpdateInput = Partial<Omit<UserPreferences, keyof BaseEntity>>;
export type UserPreferencesCreateInput = Omit<UserPreferences, keyof BaseEntity>;
