/**
 * User Preferences Types
 * Type definitions for user preferences based on shared-constants
 * @module UserPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user preferences
// ============================================================
import {
  // Core Preferences Constants
  USER_PREFERENCES,
  UserPreferencesLanguage,
  UserPreferencesCurrency,
  UserPreferencesDateFormat,
  UserPreferencesTimeFormat,
  UserPreferencesWeekStart,
  UserPreferencesFontSize,
  UserPreferencesFrequency,
  getLanguageLabel,
  getCurrencySymbol,
  getDateFormatLabel,
  getTimeFormatLabel,
  getWeekStartLabel,
  getFontSizeLabel,
  getPreferencesFrequencyLabel,
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
  getPreferencesFrequencyOptions,
  isNotificationEnabled,
  getNotificationFrequency,
  getNotificationCategories,
  // Preferences Type Constants
  USER_PREFERENCES_TYPE,
  USER_PREFERENCES_TYPE_LABELS,
  USER_PREFERENCES_TYPE_DESCRIPTIONS,
  PUBLIC_PREFERENCES_TYPES,
  PRIVATE_PREFERENCES_TYPES,
  UserPreferencesType,
  isPublicPreference,
  isPrivatePreference,
  getPreferencesTypeLabel,
  getPreferencesTypeDescription,
  getPreferencesTypeByCategory,
  // Preferences Status Constants
  USER_PREFERENCES_STATUS,
  USER_PREFERENCES_STATUS_LABELS,
  USER_PREFERENCES_STATUS_COLORS,
  ACTIVE_PREFERENCES_STATUSES,
  INACTIVE_PREFERENCES_STATUSES,
  RESTRICTED_PREFERENCES_STATUSES,
  UserPreferencesStatus,
  isPreferencesActive,
  isPreferencesRestricted,
  canModifyPreferences,
  getPreferencesStatusLabel,
  getPreferencesStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Preferences Extended Types
// ============================================================

/**
 * User preferences with additional metadata
 */
export interface UserPreferencesExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserPreferencesType;
  status: UserPreferencesStatus;
  display: UserDisplayPreferences;
  shopping: UserShoppingPreferences;
  privacy: UserPrivacyPreferences;
  communication: UserCommunicationPreferences;
  accessibility: UserAccessibilityPreferences;
  notification: UserNotificationPreferences;
  isActive: boolean;
  isRestricted: boolean;
  canModify: boolean;
  isPublic: boolean;
  isPrivate: boolean;
  metadata?: Metadata;
}

/**
 * User display preferences
 */
export interface UserDisplayPreferences {
  language: UserPreferencesLanguage;
  currency: UserPreferencesCurrency;
  dateFormat: UserPreferencesDateFormat;
  timeFormat: UserPreferencesTimeFormat;
  weekStart: UserPreferencesWeekStart;
  fontSize: UserPreferencesFontSize;
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
  customCSS?: string;
}

/**
 * User shopping preferences
 */
export interface UserShoppingPreferences {
  defaultPaymentMethod?: string;
  defaultShippingAddress?: string;
  defaultBillingAddress?: string;
  savePaymentMethods: boolean;
  saveAddresses: boolean;
  orderConfirmationEmail: boolean;
  shippingUpdatesEmail: boolean;
  promotionalEmails: boolean;
  wishlistVisibility: 'public' | 'private' | 'friends';
  recentlyViewedEnabled: boolean;
}

/**
 * User privacy preferences
 */
export interface UserPrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
  showActivity: boolean;
  allowDataCollection: boolean;
  allowDataSharing: boolean;
  allowMarketingEmails: boolean;
  allowAnalytics: boolean;
  allowCookies: boolean;
}

/**
 * User communication preferences
 */
export interface UserCommunicationPreferences {
  email: {
    enabled: boolean;
    frequency: UserPreferencesFrequency;
    language: UserPreferencesLanguage;
    format: 'html' | 'text';
  };
  sms: {
    enabled: boolean;
    frequency: UserPreferencesFrequency;
  };
  push: {
    enabled: boolean;
    frequency: UserPreferencesFrequency;
    sound: boolean;
    badge: boolean;
    vibration: boolean;
  };
  inApp: {
    enabled: boolean;
    frequency: UserPreferencesFrequency;
    sound: boolean;
    badge: boolean;
  };
}

/**
 * User accessibility preferences
 */
export interface UserAccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  fontSizeMultiplier: number;
  colorBlindMode: boolean;
  darkMode: boolean;
  largeText: boolean;
  descriptiveLinks: boolean;
}

/**
 * User notification preferences
 */
export interface UserNotificationPreferences {
  enabled: boolean;
  frequency: UserPreferencesFrequency;
  categories: {
    security: boolean;
    marketing: boolean;
    order: boolean;
    payment: boolean;
    product: boolean;
    system: boolean;
    social: boolean;
    support: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  digest: {
    enabled: boolean;
    frequency: UserPreferencesFrequency;
  };
}

/**
 * User preferences filter
 */
export interface UserPreferencesFilter {
  userIds?: ID[];
  types?: UserPreferencesType[];
  statuses?: UserPreferencesStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isRestricted?: boolean;
  isPublic?: boolean;
  isPrivate?: boolean;
  searchTerm?: string;
}

/**
 * User preferences history
 */
export interface UserPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferencesId: ID;
  section: 'display' | 'shopping' | 'privacy' | 'communication' | 'accessibility' | 'notification';
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User preferences validation result
 */
export interface UserPreferencesValidationResult {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  metadata?: Metadata;
}

/**
 * User preferences export
 */
export interface UserPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  sections: (
    'display' | 'shopping' | 'privacy' | 'communication' | 'accessibility' | 'notification'
  )[];
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Preferences Constants
  USER_PREFERENCES,
  UserPreferencesLanguage,
  UserPreferencesCurrency,
  UserPreferencesDateFormat,
  UserPreferencesTimeFormat,
  UserPreferencesWeekStart,
  UserPreferencesFontSize,
  UserPreferencesFrequency,
  getLanguageLabel,
  getCurrencySymbol,
  getDateFormatLabel,
  getTimeFormatLabel,
  getWeekStartLabel,
  getFontSizeLabel,
  getPreferencesFrequencyLabel,
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
  getPreferencesFrequencyOptions,
  isNotificationEnabled,
  getNotificationFrequency,
  getNotificationCategories,
  // Preferences Type Constants
  USER_PREFERENCES_TYPE,
  USER_PREFERENCES_TYPE_LABELS,
  USER_PREFERENCES_TYPE_DESCRIPTIONS,
  PUBLIC_PREFERENCES_TYPES,
  PRIVATE_PREFERENCES_TYPES,
  UserPreferencesType,
  isPublicPreference,
  isPrivatePreference,
  getPreferencesTypeLabel,
  getPreferencesTypeDescription,
  getPreferencesTypeByCategory,
  // Preferences Status Constants
  USER_PREFERENCES_STATUS,
  USER_PREFERENCES_STATUS_LABELS,
  USER_PREFERENCES_STATUS_COLORS,
  ACTIVE_PREFERENCES_STATUSES,
  INACTIVE_PREFERENCES_STATUSES,
  RESTRICTED_PREFERENCES_STATUSES,
  UserPreferencesStatus,
  isPreferencesActive,
  isPreferencesRestricted,
  canModifyPreferences,
  getPreferencesStatusLabel,
  getPreferencesStatusColor,
};
