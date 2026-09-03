/**
 * Preferences Configuration
 * ইউজার প্রেফারেন্স কনফিগারেশন
 */

import { USER_PREFERENCES } from '@vubon/shared-constants';

export interface PreferencesConfig {
  content: {
    languageOptions: string[];
    regionOptions: string[];
    contentTypeOptions: string[];
    notificationTypeOptions: string[];
  };
  ui: {
    themeOptions: string[];
    layoutOptions: string[];
    navigationOptions: string[];
    fontSizeOptions: string[];
  };
  communication: {
    emailFrequencyOptions: string[];
  };
  accessibility: {
    fontSizeOptions: string[];
  };
}

export const createPreferencesConfig = (): PreferencesConfig => ({
  content: {
    languageOptions: ['bn', 'en'],
    regionOptions: ['BD', 'US', 'UK', 'AE', 'IN'],
    contentTypeOptions: Object.values(USER_PREFERENCES.CONTENT.CONTENT_TYPE),
    notificationTypeOptions: Object.values(USER_PREFERENCES.CONTENT.NOTIFICATION_TYPES),
  },
  ui: {
    themeOptions: ['light', 'dark', 'system'],
    layoutOptions: ['default', 'compact', 'sidebar'],
    navigationOptions: ['sidebar', 'top', 'bottom'],
    fontSizeOptions: Object.values(USER_PREFERENCES.ACCESSIBILITY.FONT_SIZE),
  },
  communication: {
    emailFrequencyOptions: ['daily', 'weekly', 'monthly', 'never'],
  },
  accessibility: {
    fontSizeOptions: Object.values(USER_PREFERENCES.ACCESSIBILITY.FONT_SIZE),
  },
});
