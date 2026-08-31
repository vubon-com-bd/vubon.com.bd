/**
 * Authentication Preferences Types
 * User authentication preferences and settings
 */

import type { AuthMfaMethod } from '@vubon/shared-constants';
import { AUTH_MFA_METHODS, AUTH_SESSION_CONFIG } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// AUTHENTICATION PREFERENCES
// ============================================================

/**
 * User authentication preferences
 */
export interface AuthPreferences {
  /** User ID */
  userId: ID;
  /** MFA preferences */
  mfa: AuthMfaPreferences;
  /** Session preferences */
  session: AuthSessionPreferences;
  /** Security preferences */
  security: AuthSecurityPreferences;
  /** Notification preferences */
  notifications: AuthNotificationPreferences;
  /** When preferences were updated */
  updatedAt: Timestamp;
}

// ============================================================
// MFA PREFERENCES
// ============================================================

/**
 * MFA preferences
 */
export interface AuthMfaPreferences {
  /** Whether MFA is enabled */
  enabled: boolean;
  /** Default MFA method */
  defaultMethod?: AuthMfaMethod;
  /** Available MFA methods */
  availableMethods: AuthMfaMethod[];
  /** Whether to remember device for MFA */
  rememberDevices: boolean;
  /** Trusted devices */
  trustedDevices: ID[];
}

// ============================================================
// SESSION PREFERENCES
// ============================================================

/**
 * Session preferences
 */
export interface AuthSessionPreferences {
  /** Default session timeout in milliseconds */
  defaultTimeout: number;
  /** Whether to keep sessions active */
  keepActive: boolean;
  /** Maximum concurrent sessions */
  maxConcurrentSessions: number;
  /** Whether to require re-authentication for sensitive actions */
  requireReauthForSensitive: boolean;
  /** Re-authentication timeout in milliseconds */
  reauthTimeout: number;
}

// ============================================================
// SECURITY PREFERENCES
// ============================================================

/**
 * Security preferences
 */
export interface AuthSecurityPreferences {
  /** Whether to enable password change */
  allowPasswordChange: boolean;
  /** Password change interval in days */
  passwordChangeInterval: number;
  /** Whether to require password history check */
  requirePasswordHistory: boolean;
  /** Number of previous passwords to remember */
  passwordHistoryCount: number;
  /** Whether to enable device tracking */
  enableDeviceTracking: boolean;
  /** Whether to enable location tracking */
  enableLocationTracking: boolean;
  /** Whether to enable suspicious activity alerts */
  enableSuspiciousAlerts: boolean;
}

// ============================================================
// NOTIFICATION PREFERENCES
// ============================================================

/**
 * Notification preferences
 */
export interface AuthNotificationPreferences {
  /** Whether to receive login notifications */
  loginNotifications: boolean;
  /** Whether to receive MFA notifications */
  mfaNotifications: boolean;
  /** Whether to receive password change notifications */
  passwordChangeNotifications: boolean;
  /** Whether to receive session notifications */
  sessionNotifications: boolean;
  /** Whether to receive security alert notifications */
  securityAlerts: boolean;
  /** Notification channels */
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
}

// ============================================================
// PREFERENCES REQUEST
// ============================================================

/**
 * Update preferences request
 */
export interface AuthUpdatePreferencesRequest {
  /** MFA preferences (partial) */
  mfa?: Partial<AuthMfaPreferences>;
  /** Session preferences (partial) */
  session?: Partial<AuthSessionPreferences>;
  /** Security preferences (partial) */
  security?: Partial<AuthSecurityPreferences>;
  /** Notification preferences (partial) */
  notifications?: Partial<AuthNotificationPreferences>;
}

/**
 * Update MFA preferences request
 */
export interface AuthUpdateMfaPreferencesRequest {
  /** Default MFA method */
  defaultMethod?: AuthMfaMethod;
  /** Whether to remember devices */
  rememberDevices?: boolean;
  /** Trusted device IDs */
  trustedDevices?: ID[];
}

// ============================================================
// PREFERENCES RESPONSE
// ============================================================

/**
 * Preferences response
 */
export interface AuthPreferencesResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Updated preferences (if successful) */
  preferences?: AuthPreferences;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get default MFA preferences
 */
export function getDefaultMfaPreferences(): AuthMfaPreferences {
  return {
    enabled: false,
    availableMethods: [AUTH_MFA_METHODS.TOTP, AUTH_MFA_METHODS.SMS],
    rememberDevices: true,
    trustedDevices: [],
  };
}

/**
 * Get default session preferences
 */
export function getDefaultSessionPreferences(): AuthSessionPreferences {
  return {
    defaultTimeout: AUTH_SESSION_CONFIG.TIMEOUT,
    keepActive: true,
    maxConcurrentSessions: AUTH_SESSION_CONFIG.MAX_CONCURRENT_SESSIONS,
    requireReauthForSensitive: true,
    reauthTimeout: 300000, // 5 minutes
  };
}

/**
 * Get default security preferences
 */
export function getDefaultSecurityPreferences(): AuthSecurityPreferences {
  return {
    allowPasswordChange: true,
    passwordChangeInterval: 90, // 90 days
    requirePasswordHistory: true,
    passwordHistoryCount: 5,
    enableDeviceTracking: true,
    enableLocationTracking: true,
    enableSuspiciousAlerts: true,
  };
}

/**
 * Get default notification preferences
 */
export function getDefaultNotificationPreferences(): AuthNotificationPreferences {
  return {
    loginNotifications: true,
    mfaNotifications: true,
    passwordChangeNotifications: true,
    sessionNotifications: true,
    securityAlerts: true,
    channels: {
      email: true,
      sms: true,
      push: true,
      inApp: true,
    },
  };
}

/**
 * Get default preferences
 */
export function getDefaultPreferences(userId: ID): AuthPreferences {
  return {
    userId,
    mfa: getDefaultMfaPreferences(),
    session: getDefaultSessionPreferences(),
    security: getDefaultSecurityPreferences(),
    notifications: getDefaultNotificationPreferences(),
    updatedAt: new Date(),
  };
}

/**
 * Check if MFA method is valid
 */
export function isValidMfaMethod(method: string): method is AuthMfaMethod {
  return Object.values(AUTH_MFA_METHODS).includes(method as AuthMfaMethod);
}

/**
 * Validate MFA preferences
 */
export function validateMfaPreferences(preferences: Partial<AuthMfaPreferences>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (preferences.defaultMethod && !isValidMfaMethod(preferences.defaultMethod)) {
    errors.push('Invalid default MFA method');
  }

  if (preferences.availableMethods) {
    for (const method of preferences.availableMethods) {
      if (!isValidMfaMethod(method)) {
        errors.push(`Invalid MFA method: ${method}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate session preferences
 */
export function validateSessionPreferences(preferences: Partial<AuthSessionPreferences>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (preferences.defaultTimeout && preferences.defaultTimeout < 60000) {
    errors.push('Session timeout must be at least 1 minute');
  }

  if (preferences.maxConcurrentSessions && preferences.maxConcurrentSessions < 1) {
    errors.push('Maximum concurrent sessions must be at least 1');
  }

  if (preferences.reauthTimeout && preferences.reauthTimeout < 60000) {
    errors.push('Re-authentication timeout must be at least 1 minute');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
