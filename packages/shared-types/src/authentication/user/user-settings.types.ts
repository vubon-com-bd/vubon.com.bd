/**
 * User Settings Types Module
 * User-specific settings and preferences for the e-commerce platform
 * Handles notification preferences, privacy settings, and customization
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from '../auth/core-primitives.types';

// Import settings constants from shared-constants
const { AUTH_SUPPORTED_LANGUAGES, AUTH_DEFAULT_LANGUAGE, AUTH_DATE_FORMAT, AUTH_TIMEZONE } =
  authentication;

/**
 * User Settings
 * Complete user settings
 */
export interface UserSettings {
  userId: UserId;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notificationPreferences: NotificationPreferences;
  privacySettings: PrivacySettings;
  securitySettings: SecuritySettings;
  displaySettings: DisplaySettings;
  accessibilitySettings: AccessibilitySettings;
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
  productRecommendations: boolean;
  surveyRequests: boolean;
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
  addressVisibility: 'public' | 'private' | 'contacts';
  activityVisibility: 'public' | 'private' | 'contacts';
  orderHistoryVisibility: 'public' | 'private' | 'contacts';
  dataSharing: boolean;
  analyticsTracking: boolean;
  personalizedAds: boolean;
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
 * Security Settings
 * User security settings
 */
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms' | 'email';
  loginNotifications: boolean;
  deviceManagement: boolean;
  sessionManagement: boolean;
  passwordChangeReminder: boolean;
  rememberDevices: boolean;
  trustedDevices: string[];
  emailVerificationRequired: boolean;
  phoneVerificationRequired: boolean;
  lastPasswordChange: Timestamp;
  securityQuestions: SecurityQuestion[];
  metadata?: Record<string, unknown>;
}

/**
 * Security Question
 * Security question for account recovery
 */
export interface SecurityQuestion {
  id: string;
  question: string;
  answerHash: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Display Settings
 * User display preferences
 */
export interface DisplaySettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  density: 'compact' | 'comfortable' | 'spacious';
  animations: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  showProductSuggestions: boolean;
  showRecentOrders: boolean;
  showWishlist: boolean;
  customCSS?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Accessibility Settings
 * User accessibility preferences
 */
export interface AccessibilitySettings {
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  captions: boolean;
  textToSpeech: boolean;
  colorBlindMode: boolean;
  zoomLevel: number;
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
  receiveProductReviews: boolean;
  receiveAbandonedCart: boolean;
  receivePriceAlerts: boolean;
  receiveStockAlerts: boolean;
  emailFrequency: 'realtime' | 'daily' | 'weekly' | 'monthly' | 'never';
  metadata?: Record<string, unknown>;
}

/**
 * Settings Update Request
 * Request to update settings
 */
export interface SettingsUpdateRequest {
  userId: UserId;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  currency?: string;
  notificationPreferences?: Partial<NotificationPreferences>;
  privacySettings?: Partial<PrivacySettings>;
  securitySettings?: Partial<SecuritySettings>;
  displaySettings?: Partial<DisplaySettings>;
  accessibilitySettings?: Partial<AccessibilitySettings>;
  emailPreferences?: Partial<EmailPreferences>;
  metadata?: Record<string, unknown>;
}

/**
 * Settings Update Response
 * Response after settings update
 */
export interface SettingsUpdateResponse {
  success: boolean;
  data?: {
    settings: UserSettings;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Settings Get Request
 * Request to get settings
 */
export interface SettingsGetRequest {
  userId: UserId;
  fields?: string[];
}

/**
 * Settings Get Response
 * Response after getting settings
 */
export interface SettingsGetResponse {
  success: boolean;
  data?: {
    settings: UserSettings;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Settings Filter
 * Filter criteria for settings queries
 */
export interface SettingsFilter {
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
 * Settings Response Builder
 * Helper for building settings responses
 */
export interface SettingsResponseBuilder {
  getSuccess(response: SettingsGetResponse): SettingsGetResponse;
  updateSuccess(response: SettingsUpdateResponse): SettingsUpdateResponse;
  error(code: string, message: string, details?: Record<string, unknown>): SettingsErrorResponse;
}

/**
 * Settings Error Response
 * Error response for settings operations
 */
export interface SettingsErrorResponse {
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
 * Settings Constants
 * Settings-related constants (re-exported from shared-constants)
 */
export const SETTINGS_DEFAULTS = {
  language: AUTH_DEFAULT_LANGUAGE,
  supportedLanguages: AUTH_SUPPORTED_LANGUAGES,
  dateFormat: AUTH_DATE_FORMAT,
  timezone: AUTH_TIMEZONE,
} as const;

/**
 * Default Settings Configuration
 */
export const DEFAULT_SETTINGS = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  currency: 'USD',
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
    productRecommendations: true,
    surveyRequests: true,
    notificationFrequency: 'realtime' as const,
  },
  privacySettings: {
    profileVisibility: 'private' as const,
    emailVisibility: 'private' as const,
    phoneVisibility: 'private' as const,
    addressVisibility: 'private' as const,
    activityVisibility: 'private' as const,
    orderHistoryVisibility: 'private' as const,
    dataSharing: false,
    analyticsTracking: true,
    personalizedAds: false,
    cookiePreferences: {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
      preferences: true,
    },
  },
  securitySettings: {
    twoFactorEnabled: false,
    twoFactorMethod: 'authenticator' as const,
    loginNotifications: true,
    deviceManagement: true,
    sessionManagement: true,
    passwordChangeReminder: true,
    rememberDevices: true,
    trustedDevices: [],
    emailVerificationRequired: true,
    phoneVerificationRequired: false,
    securityQuestions: [],
  },
  displaySettings: {
    theme: 'system' as const,
    accentColor: '#007bff',
    fontSize: 'medium' as const,
    density: 'comfortable' as const,
    animations: true,
    imageQuality: 'medium' as const,
    showProductSuggestions: true,
    showRecentOrders: true,
    showWishlist: true,
  },
  accessibilitySettings: {
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    captions: true,
    textToSpeech: false,
    colorBlindMode: false,
    zoomLevel: 1,
  },
  emailPreferences: {
    receiveNewsletter: false,
    receivePromotions: false,
    receiveOrderUpdates: true,
    receiveSecurityAlerts: true,
    receiveAccountActivity: true,
    receiveProductRecommendations: true,
    receiveSurveyRequests: true,
    receiveProductReviews: true,
    receiveAbandonedCart: true,
    receivePriceAlerts: true,
    receiveStockAlerts: true,
    emailFrequency: 'realtime' as const,
  },
} as const;

/**
 * Settings Audit Log
 * Audit log for settings operations
 */
export interface SettingsAuditLog {
  id: string;
  userId: UserId;
  operation: 'update' | 'get' | 'reset' | 'clear';
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
 * Settings Statistics
 * Statistical data about settings
 */
export interface SettingsStatistics {
  totalUsers: number;
  byLanguage: Record<string, number>;
  byTimezone: Record<string, number>;
  byTheme: Record<string, number>;
  notificationEnabled: number;
  notificationDisabled: number;
  twoFactorEnabled: number;
  twoFactorDisabled: number;
  averageSettingsPerUser: number;
  timestamp: Timestamp;
}
