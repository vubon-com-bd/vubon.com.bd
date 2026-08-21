/**
 * User Preferences Types Module
 * User preferences and personalization types for the e-commerce platform
 * Handles user settings, preferences, notifications, and personalization
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from '../auth/core-primitives.types';

// Import preferences constants from shared-constants
const { AUTH_SUPPORTED_LANGUAGES, AUTH_DEFAULT_LANGUAGE, AUTH_DATE_FORMAT, AUTH_TIMEZONE } =
  authentication;

/**
 * User Preferences
 * User preferences and settings
 */
export interface UserPreferences {
  userId: UserId;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notificationPreferences: NotificationPreferences;
  privacySettings: PrivacySettings;
  securityPreferences: SecurityPreferences;
  accessibility: AccessibilitySettings;
  theme: ThemePreferences;
  emailPreferences: EmailPreferences;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Notification Preferences
 * User notification preferences
 */
export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  securityAlerts: boolean;
  accountActivity: boolean;
  promotionalMessages: boolean;
  newsletter: boolean;
  notificationFrequency: 'realtime' | 'daily' | 'weekly' | 'never';
  quietHours?: {
    start: string;
    end: string;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Privacy Settings
 * User privacy settings
 */
export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts' | 'custom';
  emailVisibility: 'public' | 'private' | 'contacts';
  phoneVisibility: 'public' | 'private' | 'contacts';
  activityVisibility: 'public' | 'private' | 'contacts';
  dataSharing: boolean;
  analyticsTracking: boolean;
  cookiePreferences: CookiePreferences;
  metadata?: Record<string, unknown>;
}

/**
 * Cookie Preferences
 * User cookie preferences
 */
export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Security Preferences
 * User security preferences
 */
export interface SecurityPreferences {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms' | 'email';
  loginNotifications: boolean;
  deviceManagement: boolean;
  sessionManagement: boolean;
  passwordChangeReminder: boolean;
  rememberDevices: boolean;
  trustedDevices: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Accessibility Settings
 * User accessibility settings
 */
export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  captions: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Theme Preferences
 * User theme preferences
 */
export interface ThemePreferences {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  customCSS?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Email Preferences
 * User email preferences
 */
export interface EmailPreferences {
  receiveNewsletter: boolean;
  receivePromotions: boolean;
  receiveOrderUpdates: boolean;
  receiveSecurityAlerts: boolean;
  receiveAccountActivity: boolean;
  receiveProductRecommendations: boolean;
  receiveSurveyRequests: boolean;
  emailFrequency: 'realtime' | 'daily' | 'weekly' | 'monthly' | 'never';
  metadata?: Record<string, unknown>;
}

/**
 * Preferences Update Request
 * Request to update preferences
 */
export interface PreferencesUpdateRequest {
  userId: UserId;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  currency?: string;
  notificationPreferences?: Partial<NotificationPreferences>;
  privacySettings?: Partial<PrivacySettings>;
  securityPreferences?: Partial<SecurityPreferences>;
  accessibility?: Partial<AccessibilitySettings>;
  theme?: Partial<ThemePreferences>;
  emailPreferences?: Partial<EmailPreferences>;
  metadata?: Record<string, unknown>;
}

/**
 * Preferences Update Response
 * Response after preferences update
 */
export interface PreferencesUpdateResponse {
  success: boolean;
  data?: {
    userId: UserId;
    preferences: UserPreferences;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Preferences Get Request
 * Request to get preferences
 */
export interface PreferencesGetRequest {
  userId: UserId;
  fields?: string[];
}

/**
 * Preferences Get Response
 * Response after getting preferences
 */
export interface PreferencesGetResponse {
  success: boolean;
  data?: {
    userId: UserId;
    preferences: UserPreferences;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Preferences Filter
 * Filter criteria for preferences queries
 */
export interface PreferencesFilter {
  userId?: UserId[];
  language?: string[];
  timezone?: string[];
  theme?: ('light' | 'dark' | 'system')[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Preferences Response Builder
 * Helper for building preferences responses
 */
export interface PreferencesResponseBuilder {
  getSuccess(response: PreferencesGetResponse): PreferencesGetResponse;
  updateSuccess(response: PreferencesUpdateResponse): PreferencesUpdateResponse;
  error(code: string, message: string, details?: Record<string, unknown>): PreferencesErrorResponse;
}

/**
 * Preferences Error Response
 * Error response for preferences operations
 */
export interface PreferencesErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Preferences Constants
 * Preferences-related constants (re-exported from shared-constants)
 */
export const PREFERENCE_DEFAULTS = {
  language: AUTH_DEFAULT_LANGUAGE,
  supportedLanguages: AUTH_SUPPORTED_LANGUAGES,
  dateFormat: AUTH_DATE_FORMAT,
  timezone: AUTH_TIMEZONE,
} as const;

/**
 * Default Preferences Configuration
 */
export const DEFAULT_PREFERENCES = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  currency: 'USD',
  theme: 'system',
  notificationPreferences: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    promotionalMessages: false,
    newsletter: false,
    notificationFrequency: 'realtime' as const,
  },
  privacySettings: {
    profileVisibility: 'private' as const,
    emailVisibility: 'private' as const,
    phoneVisibility: 'private' as const,
    activityVisibility: 'private' as const,
    dataSharing: false,
    analyticsTracking: true,
    cookiePreferences: {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
      preferences: true,
    },
  },
  securityPreferences: {
    twoFactorEnabled: false,
    twoFactorMethod: 'authenticator' as const,
    loginNotifications: true,
    deviceManagement: true,
    sessionManagement: true,
    passwordChangeReminder: true,
    rememberDevices: true,
    trustedDevices: [],
  },
  accessibility: {
    highContrast: false,
    fontSize: 'medium' as const,
    reduceMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    captions: true,
  },
} as const;

/**
 * Preferences Audit Log
 * Audit log for preferences operations
 */
export interface PreferencesAuditLog {
  id: string;
  userId: UserId;
  operation: 'update' | 'get' | 'reset';
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Preferences Statistics
 * Statistical data about preferences
 */
export interface PreferencesStatistics {
  totalUsers: number;
  byLanguage: Record<string, number>;
  byTimezone: Record<string, number>;
  byTheme: Record<string, number>;
  notificationEnabled: number;
  notificationDisabled: number;
  twoFactorEnabled: number;
  twoFactorDisabled: number;
  averagePreferencesPerUser: number;
  timestamp: Timestamp;
}
