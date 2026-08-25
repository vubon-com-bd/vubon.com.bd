/**
 * Auth Settings Types
 * Type definitions for authentication settings based on shared-constants
 * @module AuthSettingsTypes
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
// Auth Settings Types
// ============================================================

/**
 * Authentication settings
 */
export interface AuthSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  session: AuthSessionSettings;
  token: AuthTokenSettings;
  verification: AuthVerificationSettings;
  password: AuthPasswordSettings;
  mfa: AuthMFASettings;
  security: AuthSecuritySettings;
  notification: AuthNotificationSettings;
  privacy: AuthPrivacySettings;
  metadata?: Metadata;
}

/**
 * Session settings
 */
export interface AuthSessionSettings {
  maxConcurrentSessions: number;
  sessionTimeout: number; // minutes
  rememberMeDuration: number; // days
  extendOnActivity: boolean;
  extendThreshold: number; // minutes
  requireMFAForNewSession: boolean;
  validateIP: boolean;
  validateUserAgent: boolean;
  autoTerminateInactive: boolean;
  inactiveTimeout: number; // minutes
}

/**
 * Token settings
 */
export interface AuthTokenSettings {
  accessTokenExpiry: number; // seconds
  refreshTokenExpiry: number; // seconds
  algorithm: AuthTokenAlgorithm;
  allowBearerTokens: boolean;
  allowSingleUseTokens: boolean;
  rotateRefreshToken: boolean;
  expireOnUserLogout: boolean;
  maxTokensPerUser: number;
}

/**
 * Verification settings
 */
export interface AuthVerificationSettings {
  requiredLevel: AuthVerificationLevel;
  defaultChannel: AuthVerificationChannel;
  codeLength: number;
  codeExpiry: number; // minutes
  maxAttempts: number;
  requireIdentityVerification: boolean;
  requireDocumentVerification: boolean;
  requireContactVerification: boolean;
}

/**
 * Password settings
 */
export interface AuthPasswordSettings {
  minLength: number;
  maxLength: number;
  requiredCharacters: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  requireStrongPassword: boolean;
  preventCommonPasswords: boolean;
  preventPasswordReuse: boolean;
  passwordHistoryCount: number;
  passwordExpiryDays: number;
  expiryWarningDays: number;
}

/**
 * MFA settings
 */
export interface AuthMFASettings {
  enabled: boolean;
  defaultMethod: string;
  requiredMethods: string[];
  optionalMethods: string[];
  backupCodesCount: number;
  backupCodeLength: number;
  totpPeriod: number;
  totpDigits: number;
  totpWindow: number;
  codeExpirySeconds: number;
  maxAttempts: number;
  blockDurationMinutes: number;
  allowMethodChange: boolean;
  requireMFAForAll: boolean;
}

/**
 * Security settings
 */
export interface AuthSecuritySettings {
  maxLoginAttempts: number;
  lockoutDuration: number; // minutes
  resetAfterMinutes: number;
  requireCaptchaAfterAttempts: number;
  requireReauthForSensitiveActions: boolean;
  reauthTimeout: number; // minutes
  trustDeviceDuration: number; // days
  maxTrustedDevices: number;
  suspiciousActivityDetection: boolean;
  ipWhitelist?: string[];
  ipBlacklist?: string[];
}

/**
 * Notification settings
 */
export interface AuthNotificationSettings {
  onLogin: boolean;
  onFailedLogin: boolean;
  onPasswordChange: boolean;
  onVerification: boolean;
  onMFAChange: boolean;
  onDeviceChange: boolean;
  onLockout: boolean;
  onSuspiciousActivity: boolean;
  channels: ('email' | 'sms' | 'push' | 'in_app')[];
}

/**
 * Privacy settings
 */
export interface AuthPrivacySettings {
  storeLoginHistory: boolean;
  storeDeviceHistory: boolean;
  storeIPAddress: boolean;
  storeUserAgent: boolean;
  storeLocation: boolean;
  dataRetentionDays: number;
  anonymizeData: boolean;
  allowDataExport: boolean;
  allowDataDeletion: boolean;
}

/**
 * Auth settings filter
 */
export interface AuthSettingsFilter {
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Auth settings history
 */
export interface AuthSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  section:
    | 'session'
    | 'token'
    | 'verification'
    | 'password'
    | 'mfa'
    | 'security'
    | 'notification'
    | 'privacy';
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
 * Auth settings validation result
 */
export interface AuthSettingsValidationResult {
  isValid: boolean;
  section: string;
  field: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Auth settings export
 */
export interface AuthSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  sections: (
    | 'session'
    | 'token'
    | 'verification'
    | 'password'
    | 'mfa'
    | 'security'
    | 'notification'
    | 'privacy'
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
