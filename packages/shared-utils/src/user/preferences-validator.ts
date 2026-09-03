/**
 * Preferences Validator
 * ইউজার প্রেফারেন্স ভ্যালিডেটর
 */

import {
  UserPreferences,
  UserPreferencesCreateInput,
  UserPreferencesUpdateInput,
  UserPreferencesLanguage,
} from '@vubon/shared-types';
import { USER_PREFERENCES } from '@vubon/shared-constants';

export const PreferencesValidator = {
  /**
   * Validate preferences data
   * প্রেফারেন্স ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserPreferences>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // USER_PREFERENCES ব্যবহার করে ভ্যালিডেট করা
    if (data.content?.language && data.content.language.length !== 2) {
      errors.push('Language must be a 2-letter code');
    }

    // USER_PREFERENCES থেকে ডিফল্ট ভাষা ব্যবহার
    const defaultLanguage = USER_PREFERENCES.DEFAULTS.LANGUAGE;
    if (data.content?.language && !['bn', 'en'].includes(data.content.language)) {
      errors.push(`Language must be 'bn' or 'en' (default: ${defaultLanguage})`);
    }

    if (data.content?.region && data.content.region.length !== 2) {
      errors.push('Region must be a 2-letter code');
    }

    // USER_PREFERENCES.UI.THEME ব্যবহার করে থিম ভ্যালিডেট
    const validThemes = ['light', 'dark', 'system'];
    if (data.ui?.theme && !validThemes.includes(data.ui.theme)) {
      errors.push(`Invalid theme. Must be one of: ${validThemes.join(', ')}`);
    }

    // accessibility ফিল্ডে fontSize আছে
    const validFontSizes = ['small', 'medium', 'large', 'x-large'];
    if (data.accessibility?.fontSize && !validFontSizes.includes(data.accessibility.fontSize)) {
      errors.push(`Invalid font size. Must be one of: ${validFontSizes.join(', ')}`);
    }

    // USER_PREFERENCES.COMMUNICATION.EMAIL_FREQUENCY ব্যবহার
    const validFrequencies = ['daily', 'weekly', 'monthly', 'never'];
    if (
      data.communication?.emailFrequency &&
      !validFrequencies.includes(data.communication.emailFrequency)
    ) {
      errors.push(`Invalid email frequency. Must be one of: ${validFrequencies.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate preferences creation
   * প্রেফারেন্স তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserPreferencesCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (data.content?.language && data.content.language.length !== 2) {
      errors.push('Language must be a 2-letter code');
    }

    // USER_PREFERENCES ব্যবহার
    if (data.content?.language && !['bn', 'en'].includes(data.content.language)) {
      errors.push(`Language must be 'bn' or 'en' (default: ${USER_PREFERENCES.DEFAULTS.LANGUAGE})`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate preferences update
   * প্রেফারেন্স আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserPreferencesUpdateInput): { valid: boolean; errors: string[] } => {
    // Convert UpdateInput to Partial<UserPreferences> for validation
    const validationData: Partial<UserPreferences> = {
      content: data.content as UserPreferences['content'],
      ui: data.ui as UserPreferences['ui'],
      communication: data.communication as UserPreferences['communication'],
      accessibility: data.accessibility as UserPreferences['accessibility'],
      metadata: data.metadata,
    };

    return PreferencesValidator.validate(validationData);
  },

  /**
   * Get default preferences
   * ডিফল্ট প্রেফারেন্স পাওয়া
   */
  getDefaults: (userId: string = ''): UserPreferencesCreateInput => {
    return {
      userId,
      content: {
        language: 'bn' as UserPreferencesLanguage,
        region: 'BD',
        contentType: ['article', 'video', 'image'],
        notificationTypes: ['email', 'push'],
      },
      ui: {
        theme: 'light',
        layout: 'default',
        navigation: 'sidebar',
        compact: false,
        animations: true,
        sound: true,
        vibration: true,
      },
      communication: {
        emailFrequency: 'daily',
        smsEnabled: true,
        pushEnabled: true,
        inAppEnabled: true,
        marketingEmails: false,
        newsletter: false,
      },
      accessibility: {
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false,
        screenReader: false,
        captions: false,
      },
    };
  },
};
