/**
 * Authentication Preferences Types
 * User authentication and security preferences data types
 */

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Authentication Preferences
 * Complete user authentication preferences
 */
export interface AuthPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Preferred authentication method (local, oauth, sso) */
  preferredAuthMethod: 'local' | 'oauth' | 'sso';
  /** Preferred two-factor authentication method */
  preferredTwoFactorMethod: 'totp' | 'sms' | 'email' | 'none';
  /** Remember me enabled */
  rememberMeEnabled: boolean;
  /** Auto-login enabled */
  autoLoginEnabled: boolean;
  /** Auto-login duration in days */
  autoLoginDurationDays: number;
  /** Login page preference (email, phone, username) */
  loginIdentifierType: 'email' | 'phone' | 'username';
  /** Session persistence (always, on demand, never) */
  sessionPersistence: 'always' | 'on_demand' | 'never';
  /** Preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Security Preferences
 * Security-related authentication preferences
 */
export interface SecurityPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Security questions enabled */
  securityQuestionsEnabled: boolean;
  /** Security questions configured */
  securityQuestionsConfigured: boolean;
  /** Two-factor authentication prompt (always, on new device, never) */
  twoFactorPrompt: 'always' | 'on_new_device' | 'never';
  /** Suspicious login alert (email, sms, push, all, none) */
  suspiciousLoginAlert: 'email' | 'sms' | 'push' | 'all' | 'none';
  /** Password change reminder in days */
  passwordChangeReminderDays: number;
  /** Show password strength indicator */
  showPasswordStrength: boolean;
  /** Security preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Privacy Preferences
 * Privacy-related authentication preferences
 */
export interface PrivacyPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Show online status */
  showOnlineStatus: boolean;
  /** Show last active time */
  showLastActive: boolean;
  /** Show profile picture */
  showProfilePicture: boolean;
  /** Allow search by email */
  allowSearchByEmail: boolean;
  /** Allow search by phone */
  allowSearchByPhone: boolean;
  /** Allow search by username */
  allowSearchByUsername: boolean;
  /** Allow data collection for analytics */
  allowAnalyticsDataCollection: boolean;
  /** Allow personalized recommendations */
  allowPersonalizedRecommendations: boolean;
  /** Allow marketing communications */
  allowMarketingCommunications: boolean;
  /** Privacy preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Notification Preferences
 * Notification-related authentication preferences
 */
export interface NotificationPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Email notification preferences */
  email: {
    loginAlerts: boolean;
    passwordChanges: boolean;
    twoFactorChanges: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** SMS notification preferences */
  sms: {
    loginAlerts: boolean;
    twoFactorCodes: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** Push notification preferences */
  push: {
    loginAlerts: boolean;
    twoFactorRequests: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
  };
  /** In-app notification preferences */
  inApp: {
    loginAlerts: boolean;
    passwordChanges: boolean;
    twoFactorChanges: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** Notification preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Session Preferences
 * Session management preferences
 */
export interface SessionPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Preferred session duration in minutes */
  preferredSessionDurationMinutes: number;
  /** Keep me signed in */
  keepMeSignedIn: boolean;
  /** Remember device */
  rememberDevice: boolean;
  /** Allow session extension */
  allowSessionExtension: boolean;
  /** Session extension reminder */
  sessionExtensionReminder: boolean;
  /** Session preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Device Preferences
 * Device management preferences
 */
export interface DevicePreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Preferred device name */
  preferredDeviceName?: string;
  /** Trust this device */
  trustThisDevice: boolean;
  /** Auto-register new devices */
  autoRegisterNewDevices: boolean;
  /** Device registration approval required */
  deviceRegistrationApprovalRequired: boolean;
  /** Allow device fingerprinting */
  allowDeviceFingerprinting: boolean;
  /** Device preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * UI Preferences
 * User interface preferences for authentication
 */
export interface UIPreferences {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Preferred theme (light, dark, system) */
  theme: 'light' | 'dark' | 'system';
  /** Preferred language */
  language: string;
  /** Timezone */
  timezone: string;
  /** Date format preference */
  dateFormat: string;
  /** Time format preference (12h, 24h) */
  timeFormat: '12h' | '24h';
  /** Show detailed login history */
  showDetailedLoginHistory: boolean;
  /** Show session management UI */
  showSessionManagement: boolean;
  /** Show device management UI */
  showDeviceManagement: boolean;
  /** UI preferences last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Update Preferences Request
 * Request to update authentication preferences
 */
export interface UpdatePreferencesRequest {
  /** User ID */
  userId: ID;
  /** Authentication preferences updates */
  auth?: Partial<AuthPreferences>;
  /** Security preferences updates */
  security?: Partial<SecurityPreferences>;
  /** Privacy preferences updates */
  privacy?: Partial<PrivacyPreferences>;
  /** Notification preferences updates */
  notifications?: Partial<NotificationPreferences>;
  /** Session preferences updates */
  session?: Partial<SessionPreferences>;
  /** Device preferences updates */
  device?: Partial<DevicePreferences>;
  /** UI preferences updates */
  ui?: Partial<UIPreferences>;
}

/**
 * Preferences Validation Result
 * Result of preferences validation
 */
export interface PreferencesValidationResult {
  /** Is preferences valid */
  isValid: boolean;
  /** Validation errors */
  errors?: Array<{
    field: string;
    message: string;
  }>;
  /** Validation warnings */
  warnings?: Array<{
    field: string;
    message: string;
  }>;
  /** Timestamp of validation */
  validatedAt: Timestamp;
}

/**
 * Preferences Defaults
 * Default authentication preferences
 */
export interface PreferencesDefaults {
  /** Default authentication preferences */
  auth: Omit<AuthPreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default security preferences */
  security: Omit<SecurityPreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default privacy preferences */
  privacy: Omit<PrivacyPreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default notification preferences */
  notifications: Omit<NotificationPreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default session preferences */
  session: Omit<SessionPreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default device preferences */
  device: Omit<DevicePreferences, 'userId' | 'updatedAt' | 'user'>;
  /** Default UI preferences */
  ui: Omit<UIPreferences, 'userId' | 'updatedAt' | 'user'>;
}

/**
 * Preferences Export
 * Complete preferences export for a user
 */
export interface PreferencesExport {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Export timestamp */
  exportedAt: Timestamp;
  /** Authentication preferences */
  auth: AuthPreferences;
  /** Security preferences */
  security: SecurityPreferences;
  /** Privacy preferences */
  privacy: PrivacyPreferences;
  /** Notification preferences */
  notifications: NotificationPreferences;
  /** Session preferences */
  session: SessionPreferences;
  /** Device preferences */
  device: DevicePreferences;
  /** UI preferences */
  ui: UIPreferences;
}

/**
 * Preferences Import Request
 * Request to import preferences
 */
export interface PreferencesImportRequest {
  /** User ID */
  userId: ID;
  /** Preferences data to import */
  preferences: Partial<PreferencesExport>;
  /** Override existing preferences */
  override: boolean;
  /** Skip validation */
  skipValidation?: boolean;
}

/**
 * Preferences Audit Log
 * Preferences change audit log entry
 */
export interface PreferencesAuditLog {
  /** Log ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Section changed (auth, security, privacy, notifications, session, device, ui) */
  section: string;
  /** Changes made */
  changes: {
    before: Record<string, unknown>;
    after: Record<string, unknown>;
  };
  /** Performed by (user ID or 'system') */
  performedBy: ID | 'system';
  /** Timestamp */
  performedAt: Timestamp;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}
