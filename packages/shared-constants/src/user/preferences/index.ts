/**
 * User Preferences Constants Index
 * Export all user preferences-related constants and types
 */

// Core Preferences Constants
export {
  USER_PREFERENCES,
  getLanguageLabel,
  getCurrencySymbol,
  getDateFormatLabel,
  getTimeFormatLabel,
  getWeekStartLabel,
  getFontSizeLabel,
  getFrequencyLabel,
  getDefaultDisplayPreferences,
  getDefaultShoppingPreferences,
  getDefaultPrivacyPreferences,
  getDefaultCommunicationPreferences,
  getDefaultAccessibilityPreferences,
  getDefaultNotificationPreferences,
  getLanguageOptions,
  getCurrencyOptions,
  getDateFormatOptions,
  getTimeFormatOptions,
  getWeekStartOptions,
  getFontSizeOptions,
  getFrequencyOptions,
  isNotificationEnabled,
  getNotificationFrequency,
  getNotificationCategories,
} from './user-preferences.constants';

export type {
  UserPreferencesLanguage,
  UserPreferencesCurrency,
  UserPreferencesDateFormat,
  UserPreferencesTimeFormat,
  UserPreferencesWeekStart,
  UserPreferencesFontSize,
  UserPreferencesFrequency,
} from './user-preferences.constants';

// Preferences Type Constants
export {
  USER_PREFERENCES_TYPE,
  USER_PREFERENCES_TYPE_LABELS,
  USER_PREFERENCES_TYPE_DESCRIPTIONS,
  PUBLIC_PREFERENCES_TYPES,
  PRIVATE_PREFERENCES_TYPES,
  isPublicPreference,
  isPrivatePreference,
  getPreferencesTypeLabel,
  getPreferencesTypeDescription,
  getPreferencesTypeByCategory,
} from './user-preferences-type.constants';

export type { UserPreferencesType } from './user-preferences-type.constants';

// Preferences Status Constants
export {
  USER_PREFERENCES_STATUS,
  USER_PREFERENCES_STATUS_LABELS,
  USER_PREFERENCES_STATUS_COLORS,
  ACTIVE_PREFERENCES_STATUSES,
  INACTIVE_PREFERENCES_STATUSES,
  RESTRICTED_PREFERENCES_STATUSES,
  isPreferencesActive,
  isPreferencesRestricted,
  canModifyPreferences,
  getPreferencesStatusLabel,
  getPreferencesStatusColor,
} from './user-preferences-status.constants';

export type { UserPreferencesStatus } from './user-preferences-status.constants';
