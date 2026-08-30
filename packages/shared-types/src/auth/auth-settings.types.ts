/**
 * Authentication Settings Types
 * User authentication and security settings data types
 */

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Authentication Settings
 * Complete user authentication settings
 */
export interface AuthSettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Is two-factor authentication enabled */
  isTwoFactorEnabled: boolean;
  /** Two-factor authentication method (totp, sms, email) */
  twoFactorMethod?: string;
  /** Is email verification required */
  isEmailVerificationRequired: boolean;
  /** Is phone verification required */
  isPhoneVerificationRequired: boolean;
  /** Is device verification required */
  isDeviceVerificationRequired: boolean;
  /** Maximum login attempts before lockout */
  maxLoginAttempts: number;
  /** Lockout duration in minutes */
  lockoutDurationMinutes: number;
  /** Session timeout in minutes */
  sessionTimeoutMinutes: number;
  /** Remember me duration in days */
  rememberMeDurationDays: number;
  /** Is session management enabled */
  isSessionManagementEnabled: boolean;
  /** Is device management enabled */
  isDeviceManagementEnabled: boolean;
  /** Is login history enabled */
  isLoginHistoryEnabled: boolean;
  /** Is suspicious login detection enabled */
  isSuspiciousLoginDetectionEnabled: boolean;
  /** Allowed IP addresses (whitelist) */
  allowedIPs?: string[];
  /** Blocked IP addresses (blacklist) */
  blockedIPs?: string[];
  /** Allowed countries */
  allowedCountries?: string[];
  /** Blocked countries */
  blockedCountries?: string[];
  /** Settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Security Settings
 * Security-related authentication settings
 */
export interface SecuritySettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Is password change required */
  isPasswordChangeRequired: boolean;
  /** Password last changed timestamp */
  passwordLastChangedAt?: Timestamp;
  /** Password expiry in days */
  passwordExpiryDays: number;
  /** Minimum password length */
  minPasswordLength: number;
  /** Require uppercase in password */
  requireUppercase: boolean;
  /** Require lowercase in password */
  requireLowercase: boolean;
  /** Require numbers in password */
  requireNumbers: boolean;
  /** Require special characters in password */
  requireSpecialChars: boolean;
  /** Prevent password reuse count */
  preventReuseCount: number;
  /** Is MFA enforced */
  isMfaEnforced: boolean;
  /** Trusted devices duration in days */
  trustedDevicesDurationDays: number;
  /** Is IP whitelist enabled */
  isIpWhitelistEnabled: boolean;
  /** Is IP blacklist enabled */
  isIpBlacklistEnabled: boolean;
  /** Security settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Privacy Settings
 * Privacy-related authentication settings
 */
export interface PrivacySettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Is profile public */
  isProfilePublic: boolean;
  /** Show email in profile */
  showEmail: boolean;
  /** Show phone in profile */
  showPhone: boolean;
  /** Show last login time */
  showLastLogin: boolean;
  /** Show online status */
  showOnlineStatus: boolean;
  /** Allow search by email */
  allowSearchByEmail: boolean;
  /** Allow search by phone */
  allowSearchByPhone: boolean;
  /** Is activity tracking enabled */
  isActivityTrackingEnabled: boolean;
  /** Is location tracking enabled */
  isLocationTrackingEnabled: boolean;
  /** Allow data export */
  allowDataExport: boolean;
  /** Allow data deletion */
  allowDataDeletion: boolean;
  /** Privacy settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Notification Settings
 * Notification-related authentication settings
 */
export interface NotificationSettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Email notifications enabled */
  emailNotifications: {
    loginAlerts: boolean;
    passwordChanges: boolean;
    twoFactorChanges: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** SMS notifications enabled */
  smsNotifications: {
    loginAlerts: boolean;
    twoFactorCodes: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** Push notifications enabled */
  pushNotifications: {
    loginAlerts: boolean;
    twoFactorRequests: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
  };
  /** In-app notifications enabled */
  inAppNotifications: {
    loginAlerts: boolean;
    passwordChanges: boolean;
    twoFactorChanges: boolean;
    deviceRegistrations: boolean;
    suspiciousActivities: boolean;
    accountLockouts: boolean;
    passwordResetRequests: boolean;
  };
  /** Notification settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Session Settings
 * Session management settings
 */
export interface SessionSettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Maximum concurrent sessions */
  maxConcurrentSessions: number;
  /** Session idle timeout in minutes */
  sessionIdleTimeoutMinutes: number;
  /** Session absolute timeout in minutes */
  sessionAbsoluteTimeoutMinutes: number;
  /** Allow multiple sessions */
  allowMultipleSessions: boolean;
  /** Allow session extension */
  allowSessionExtension: boolean;
  /** Session extension duration in minutes */
  sessionExtensionDurationMinutes: number;
  /** Is session termination on password change enabled */
  terminateOnPasswordChange: boolean;
  /** Is session termination on device removal enabled */
  terminateOnDeviceRemoval: boolean;
  /** Session settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Device Settings
 * Device management settings
 */
export interface DeviceSettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Maximum devices per user */
  maxDevicesPerUser: number;
  /** Maximum untrusted devices per user */
  maxUntrustedDevicesPerUser: number;
  /** Device trust duration in days */
  deviceTrustDurationDays: number;
  /** Require MFA for new devices */
  requireMfaForNewDevices: boolean;
  /** Allow new devices without verification */
  allowNewDevicesWithoutVerification: boolean;
  /** Device verification method */
  deviceVerificationMethod: 'email' | 'sms' | 'both';
  /** Device inactivity cleanup days */
  deviceInactivityCleanupDays: number;
  /** Device settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Login Attempt Settings
 * Login attempt monitoring settings
 */
export interface LoginAttemptSettings {
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Maximum failed login attempts */
  maxFailedAttempts: number;
  /** Failed attempt window in minutes */
  failedAttemptWindowMinutes: number;
  /** Lockout duration in minutes */
  lockoutDurationMinutes: number;
  /** Reset failed attempts on successful login */
  resetOnSuccessfulLogin: boolean;
  /** Notify on suspicious login */
  notifyOnSuspiciousLogin: boolean;
  /** Notify on account lockout */
  notifyOnAccountLockout: boolean;
  /** Login attempt settings last updated timestamp */
  updatedAt: Timestamp;
}

/**
 * Update Settings Request
 * Request to update authentication settings
 */
export interface UpdateSettingsRequest {
  /** User ID */
  userId: ID;
  /** Authentication settings updates */
  auth?: Partial<AuthSettings>;
  /** Security settings updates */
  security?: Partial<SecuritySettings>;
  /** Privacy settings updates */
  privacy?: Partial<PrivacySettings>;
  /** Notification settings updates */
  notifications?: Partial<NotificationSettings>;
  /** Session settings updates */
  session?: Partial<SessionSettings>;
  /** Device settings updates */
  device?: Partial<DeviceSettings>;
  /** Login attempt settings updates */
  loginAttempt?: Partial<LoginAttemptSettings>;
}

/**
 * Settings Validation Result
 * Result of settings validation
 */
export interface SettingsValidationResult {
  /** Is settings valid */
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
 * Settings Defaults
 * Default authentication settings
 */
export interface SettingsDefaults {
  /** Default authentication settings */
  auth: Omit<AuthSettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default security settings */
  security: Omit<SecuritySettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default privacy settings */
  privacy: Omit<PrivacySettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default notification settings */
  notifications: Omit<NotificationSettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default session settings */
  session: Omit<SessionSettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default device settings */
  device: Omit<DeviceSettings, 'userId' | 'updatedAt' | 'user'>;
  /** Default login attempt settings */
  loginAttempt: Omit<LoginAttemptSettings, 'userId' | 'updatedAt' | 'user'>;
}

/**
 * Settings Audit Log
 * Settings change audit log entry
 */
export interface SettingsAuditLog {
  /** Log ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** User data (optional, for reference) */
  user?: AuthUser;
  /** Section changed (auth, security, privacy, notifications, session, device, loginAttempt) */
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
