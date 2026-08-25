/**
 * User Settings Types
 * Type definitions for user settings based on shared-constants
 * @module UserSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user settings
// ============================================================
import {
  // Core Settings Constants
  USER_SETTINGS,
  UserSettingsTheme,
  UserSettingsFrequency,
  TwoFactorMethod,
  SessionTimeout,
  getThemeLabel,
  getFrequencyLabel,
  getTwoFactorMethodLabel,
  getSessionTimeoutLabel,
  isTwoFactorEnabled,
  getDefaultNotificationSettings,
  getDefaultPrivacySettings,
  getDefaultSecuritySettings,
  getDefaultCommunicationSettings,
  getSessionTimeoutOptions,
  getTwoFactorMethods,
  getThemeOptions,
  getFrequencyOptions,
  isSecurePassword,
  isUserSettingsActive,
  isUserSettingsRestricted,
  canUserModifySettings,
  // Settings Type Constants
  USER_SETTINGS_TYPE,
  USER_SETTINGS_TYPE_LABELS,
  USER_SETTINGS_TYPE_DESCRIPTIONS,
  PUBLIC_SETTINGS_TYPES,
  PRIVATE_SETTINGS_TYPES,
  UserSettingsType,
  isPublicSetting,
  isPrivateSetting,
  getSettingsTypeLabel,
  getSettingsTypeDescription,
  getSettingsTypeByCategory,
  // Settings Status Constants
  USER_SETTINGS_STATUS,
  USER_SETTINGS_STATUS_LABELS,
  USER_SETTINGS_STATUS_COLORS,
  ACTIVE_SETTINGS_STATUSES,
  INACTIVE_SETTINGS_STATUSES,
  RESTRICTED_SETTINGS_STATUSES,
  UserSettingsStatus,
  isSettingsActive,
  isSettingsRestricted,
  canModifySettings,
  getSettingsStatusLabel,
  getSettingsStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Settings Extended Types
// ============================================================

/**
 * User settings with additional metadata
 */
export interface UserSettingsExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserSettingsType;
  status: UserSettingsStatus;
  theme: UserSettingsTheme;
  frequency: UserSettingsFrequency;
  twoFactorMethod: TwoFactorMethod;
  sessionTimeout: SessionTimeout;
  notifications: UserNotificationSettings;
  privacy: UserPrivacySettings;
  security: UserSecuritySettings;
  communication: UserCommunicationSettings;
  isTwoFactorEnabled: boolean;
  isSecurePassword: boolean;
  isActive: boolean;
  isRestricted: boolean;
  canModify: boolean;
  isPublic: boolean;
  isPrivate: boolean;
  metadata?: Metadata;
}

/**
 * User notification settings
 */
export interface UserNotificationSettings {
  email: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    categories: {
      security: boolean;
      marketing: boolean;
      order: boolean;
      payment: boolean;
      product: boolean;
      system: boolean;
    };
  };
  sms: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    categories: {
      security: boolean;
      order: boolean;
      payment: boolean;
      system: boolean;
    };
  };
  push: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    categories: {
      security: boolean;
      marketing: boolean;
      order: boolean;
      payment: boolean;
      system: boolean;
    };
  };
  inApp: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    categories: {
      security: boolean;
      marketing: boolean;
      order: boolean;
      payment: boolean;
      product: boolean;
      system: boolean;
    };
  };
}

/**
 * User privacy settings
 */
export interface UserPrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
  showActivity: boolean;
  allowDataCollection: boolean;
  allowDataSharing: boolean;
  allowMarketingEmails: boolean;
  allowAnalytics: boolean;
}

/**
 * User security settings
 */
export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: TwoFactorMethod;
  sessionTimeout: SessionTimeout;
  requirePasswordChange: boolean;
  passwordChangeInterval: number; // days
  maxLoginAttempts: number;
  lockoutDuration: number; // minutes
  trustedDevices: UserTrustedDevice[];
  activeSessions: UserActiveSession[];
}

/**
 * User trusted device
 */
export interface UserTrustedDevice {
  id: string;
  name: string;
  type: string;
  lastUsedAt: Date;
  isActive: boolean;
}

/**
 * User active session
 */
export interface UserActiveSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  startedAt: Date;
  lastActivityAt: Date;
  isActive: boolean;
}

/**
 * User communication settings
 */
export interface UserCommunicationSettings {
  email: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    language: string;
    format: 'html' | 'text';
  };
  sms: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    language: string;
  };
  push: {
    enabled: boolean;
    frequency: UserSettingsFrequency;
    sound: boolean;
    badge: boolean;
  };
}

/**
 * User settings filter
 */
export interface UserSettingsFilter {
  userIds?: ID[];
  types?: UserSettingsType[];
  statuses?: UserSettingsStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isRestricted?: boolean;
  isTwoFactorEnabled?: boolean;
  isSecurePassword?: boolean;
  searchTerm?: string;
}

/**
 * User settings history
 */
export interface UserSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  settingsId: ID;
  section: 'notification' | 'privacy' | 'security' | 'communication' | 'general';
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
 * User settings validation result
 */
export interface UserSettingsValidationResult {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  metadata?: Metadata;
}

/**
 * User settings export
 */
export interface UserSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  sections: ('notification' | 'privacy' | 'security' | 'communication' | 'general')[];
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
  // Core Settings Constants
  USER_SETTINGS,
  UserSettingsTheme,
  UserSettingsFrequency,
  TwoFactorMethod,
  SessionTimeout,
  getThemeLabel,
  getFrequencyLabel,
  getTwoFactorMethodLabel,
  getSessionTimeoutLabel,
  isTwoFactorEnabled,
  getDefaultNotificationSettings,
  getDefaultPrivacySettings,
  getDefaultSecuritySettings,
  getDefaultCommunicationSettings,
  getSessionTimeoutOptions,
  getTwoFactorMethods,
  getThemeOptions,
  getFrequencyOptions,
  isSecurePassword,
  isUserSettingsActive,
  isUserSettingsRestricted,
  canUserModifySettings,
  // Settings Type Constants
  USER_SETTINGS_TYPE,
  USER_SETTINGS_TYPE_LABELS,
  USER_SETTINGS_TYPE_DESCRIPTIONS,
  PUBLIC_SETTINGS_TYPES,
  PRIVATE_SETTINGS_TYPES,
  UserSettingsType,
  isPublicSetting,
  isPrivateSetting,
  getSettingsTypeLabel,
  getSettingsTypeDescription,
  getSettingsTypeByCategory,
  // Settings Status Constants
  USER_SETTINGS_STATUS,
  USER_SETTINGS_STATUS_LABELS,
  USER_SETTINGS_STATUS_COLORS,
  ACTIVE_SETTINGS_STATUSES,
  INACTIVE_SETTINGS_STATUSES,
  RESTRICTED_SETTINGS_STATUSES,
  UserSettingsStatus,
  isSettingsActive,
  isSettingsRestricted,
  canModifySettings,
  getSettingsStatusLabel,
  getSettingsStatusColor,
};
