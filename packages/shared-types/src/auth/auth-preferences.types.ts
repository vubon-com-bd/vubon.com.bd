/**
 * Auth Preferences Types
 * Type definitions for authentication preferences based on shared-constants
 * @module AuthPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth
// ============================================================
import {
  // Auth Session
  AuthSessionType,
  AuthSessionStatus,
  // Auth Token
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  // Auth Verification
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationLevel,
  AuthVerificationChannel,
  // Auth Password
  AuthPasswordStrength,
} from '@vubon/shared-constants';

// ============================================================
// Auth Preferences Types
// ============================================================

/**
 * Authentication preferences
 */
export interface AuthPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  general: AuthGeneralPreferences;
  security: AuthSecurityPreferences;
  notification: AuthNotificationPreferences;
  appearance: AuthAppearancePreferences;
  accessibility: AuthAccessibilityPreferences;
  privacy: AuthPrivacyPreferences;
  metadata?: Metadata;
}

/**
 * General preferences
 */
export interface AuthGeneralPreferences {
  defaultLanguage: string;
  defaultTimezone: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
}

/**
 * Security preferences
 */
export interface AuthSecurityPreferences {
  defaultMFA: string;
  requireMFA: boolean;
  rememberMe: boolean;
  trustDevice: boolean;
  trustDeviceDuration: number; // days
  requireReauth: boolean;
  reauthTimeout: number; // minutes
  sessionTimeout: number; // minutes
  logoutOnInactivity: boolean;
  inactivityTimeout: number; // minutes
}

/**
 * Notification preferences
 */
export interface AuthNotificationPreferences {
  email: AuthNotificationChannelPreferences;
  sms: AuthNotificationChannelPreferences;
  push: AuthNotificationChannelPreferences;
  inApp: AuthNotificationChannelPreferences;
  categories: {
    security: boolean;
    login: boolean;
    verification: boolean;
    password: boolean;
    mfa: boolean;
    device: boolean;
    system: boolean;
    marketing: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

/**
 * Notification channel preferences
 */
export interface AuthNotificationChannelPreferences {
  enabled: boolean;
  frequency: 'realtime' | 'daily' | 'weekly' | 'never';
  digest: boolean;
  digestFrequency: 'daily' | 'weekly';
}

/**
 * Appearance preferences
 */
export interface AuthAppearancePreferences {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'comfortable' | 'spacious';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  customCSS?: string;
}

/**
 * Accessibility preferences
 */
export interface AuthAccessibilityPreferences {
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSizeMultiplier: number;
  colorBlindMode: boolean;
  darkMode: boolean;
}

/**
 * Privacy preferences
 */
export interface AuthPrivacyPreferences {
  shareAnalytics: boolean;
  shareMarketing: boolean;
  sharePartner: boolean;
  storeActivity: boolean;
  storeDeviceInfo: boolean;
  storeLocation: boolean;
  dataRetention: '1m' | '3m' | '6m' | '1y' | 'forever';
  allowDataExport: boolean;
  allowDataDeletion: boolean;
}

/**
 * Auth preferences filter
 */
export interface AuthPreferencesFilter {
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Auth preferences history
 */
export interface AuthPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  section: 'general' | 'security' | 'notification' | 'appearance' | 'accessibility' | 'privacy';
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
 * Auth preferences validation result
 */
export interface AuthPreferencesValidationResult {
  isValid: boolean;
  section: string;
  field: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Auth preferences export
 */
export interface AuthPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  sections: (
    'general' | 'security' | 'notification' | 'appearance' | 'accessibility' | 'privacy'
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
  // Auth Session types
  AuthSessionType,
  AuthSessionStatus,
  // Auth Token types
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  // Auth Verification types
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationLevel,
  AuthVerificationChannel,
  // Auth Password types
  AuthPasswordStrength,
};
