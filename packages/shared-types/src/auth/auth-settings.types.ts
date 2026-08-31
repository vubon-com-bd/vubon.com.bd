/**
 * Authentication Settings Types
 * Types for authentication system configuration
 */

import type { AuthMfaMethod } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// PASSWORD POLICY
// ============================================================

/**
 * Password policy settings
 */
export interface AuthPasswordPolicy {
  /** Minimum password length */
  minLength: number;
  /** Maximum password length */
  maxLength: number;
  /** Require uppercase letters */
  requireUppercase: boolean;
  /** Require lowercase letters */
  requireLowercase: boolean;
  /** Require numbers */
  requireNumbers: boolean;
  /** Require special characters */
  requireSpecial: boolean;
  /** Maximum password age in days (0 = never) */
  maxAgeDays: number;
  /** Prevent password reuse count */
  preventReuseCount: number;
  /** Minimum unique characters */
  minUniqueChars: number;
  /** Maximum consecutive repeats */
  maxConsecutiveRepeats: number;
}

// ============================================================
// SESSION POLICY
// ============================================================

/**
 * Session policy settings
 */
export interface AuthSessionPolicy {
  /** Session timeout in seconds */
  timeout: number;
  /** Idle timeout in seconds */
  idleTimeout: number;
  /** Maximum concurrent sessions per user */
  maxConcurrentSessions: number;
  /** Whether to remember me is allowed */
  allowRememberMe: boolean;
  /** Remember me duration in seconds */
  rememberMeDuration: number;
}

// ============================================================
// MFA POLICY
// ============================================================

/**
 * MFA policy settings
 */
export interface AuthMfaPolicy {
  /** Whether MFA is required */
  required: boolean;
  /** Available MFA methods */
  availableMethods: AuthMfaMethod[];
  /** Recommended MFA methods */
  recommendedMethods: AuthMfaMethod[];
  /** Whether users can choose their own methods */
  allowUserChoice: boolean;
  /** Minimum security level required */
  minSecurityLevel: number;
}

// ============================================================
// AUTH SETTINGS
// ============================================================

/**
 * Complete authentication settings
 */
export interface AuthSettings {
  /** Unique ID */
  id: ID;
  /** Whether authentication is enabled */
  isEnabled: boolean;
  /** Whether registration is allowed */
  allowRegistration: boolean;
  /** Whether email verification is required */
  requireEmailVerification: boolean;
  /** Whether phone verification is required */
  requirePhoneVerification: boolean;
  /** Password policy */
  passwordPolicy: AuthPasswordPolicy;
  /** Session policy */
  sessionPolicy: AuthSessionPolicy;
  /** MFA policy */
  mfaPolicy: AuthMfaPolicy;
  /** Login attempt settings */
  loginAttempts: {
    /** Maximum failed attempts before lockout */
    maxFailedAttempts: number;
    /** Lockout duration in seconds */
    lockoutDuration: number;
    /** Attempt window in seconds */
    attemptWindow: number;
  };
  /** Social login settings */
  socialLogin: {
    /** Whether social login is enabled */
    enabled: boolean;
    /** Available providers */
    providers: string[];
  };
  /** SSO settings */
  sso: {
    /** Whether SSO is enabled */
    enabled: boolean;
    /** Available providers */
    providers: string[];
  };
  /** When the settings were last updated */
  updatedAt: Timestamp;
  /** Who updated the settings */
  updatedBy?: ID;
}

// ============================================================
// AUTH SETTINGS REQUEST
// ============================================================

/**
 * Request to update auth settings
 */
export interface AuthUpdateSettingsRequest {
  /** Whether authentication is enabled */
  isEnabled?: boolean;
  /** Whether registration is allowed */
  allowRegistration?: boolean;
  /** Whether email verification is required */
  requireEmailVerification?: boolean;
  /** Whether phone verification is required */
  requirePhoneVerification?: boolean;
  /** Password policy updates */
  passwordPolicy?: Partial<AuthPasswordPolicy>;
  /** Session policy updates */
  sessionPolicy?: Partial<AuthSessionPolicy>;
  /** MFA policy updates */
  mfaPolicy?: Partial<AuthMfaPolicy>;
  /** Login attempt updates */
  loginAttempts?: Partial<{
    maxFailedAttempts: number;
    lockoutDuration: number;
    attemptWindow: number;
  }>;
  /** Social login updates */
  socialLogin?: Partial<{
    enabled: boolean;
    providers: string[];
  }>;
  /** SSO updates */
  sso?: Partial<{
    enabled: boolean;
    providers: string[];
  }>;
}

// ============================================================
// AUTH SETTINGS RESPONSE
// ============================================================

/**
 * Auth settings response
 */
export interface AuthSettingsResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Settings (if successful) */
  settings?: AuthSettings;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get default password policy
 */
export function getAuthDefaultPasswordPolicy(): AuthPasswordPolicy {
  return {
    minLength: 8,
    maxLength: 100,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true,
    maxAgeDays: 90,
    preventReuseCount: 5,
    minUniqueChars: 4,
    maxConsecutiveRepeats: 3,
  };
}

/**
 * Get default session policy
 */
export function getAuthDefaultSessionPolicy(): AuthSessionPolicy {
  return {
    timeout: 86400, // 24 hours
    idleTimeout: 1800, // 30 minutes
    maxConcurrentSessions: 5,
    allowRememberMe: true,
    rememberMeDuration: 2592000, // 30 days
  };
}

/**
 * Get default MFA policy
 */
export function getAuthDefaultMfaPolicy(): AuthMfaPolicy {
  return {
    required: false,
    availableMethods: ['totp', 'sms', 'email', 'backup_codes'],
    recommendedMethods: ['totp', 'backup_codes'],
    allowUserChoice: true,
    minSecurityLevel: 5,
  };
}

/**
 * Validate password against policy
 */
export function validateAuthPasswordAgainstPolicy(
  password: string,
  policy: AuthPasswordPolicy
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters`);
  }
  if (password.length > policy.maxLength) {
    errors.push(`Password must not exceed ${policy.maxLength} characters`);
  }
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (policy.requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
