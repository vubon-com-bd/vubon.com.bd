/**
 * Authentication MFA Types
 * Multi-Factor Authentication data types
 */

import type { MfaMethod, MfaStatus } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';

/**
 * MFA Configuration
 * User's MFA configuration
 */
export interface MfaConfiguration {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** MFA status */
  status: MfaStatus;
  /** Primary MFA method */
  primaryMethod: MfaMethod;
  /** Enabled MFA methods */
  enabledMethods: MfaMethod[];
  /** Is MFA enforced for this user */
  isEnforced: boolean;
  /** When MFA was enabled */
  enabledAt?: Timestamp;
  /** When MFA was last used */
  lastUsedAt?: Timestamp;
  /** MFA metadata */
  metadata?: Record<string, unknown>;
}

/**
 * MFA Method Configuration
 * Configuration for a specific MFA method
 */
export interface MfaMethodConfig {
  /** MFA method type */
  method: MfaMethod;
  /** Is method enabled */
  isEnabled: boolean;
  /** Is method verified */
  isVerified: boolean;
  /** Method-specific configuration */
  config:
    | TOTPConfig
    | SMSConfig
    | EmailConfig
    | BackupCodesConfig
    | PushConfig
    | HardwareConfig
    | SecurityQuestionsConfig;
  /** When method was added */
  addedAt: Timestamp;
  /** When method was last used */
  lastUsedAt?: Timestamp;
}

/**
 * TOTP Configuration
 * Time-based One-Time Password configuration
 */
export interface TOTPConfig {
  /** TOTP secret */
  secret: string;
  /** TOTP algorithm (SHA1, SHA256, SHA512) */
  algorithm: string;
  /** TOTP digits (6 or 8) */
  digits: number;
  /** TOTP time step in seconds */
  timeStep: number;
  /** TOTP issuer */
  issuer: string;
  /** TOTP account name (usually email) */
  accountName: string;
  /** Recovery codes */
  recoveryCodes?: string[];
}

/**
 * SMS Configuration
 * SMS-based OTP configuration
 */
export interface SMSConfig {
  /** Phone number */
  phoneNumber: string;
  /** Country code */
  countryCode: string;
  /** SMS provider */
  provider?: string;
}

/**
 * Email Configuration
 * Email-based OTP configuration
 */
export interface EmailConfig {
  /** Email address */
  email: string;
  /** Email provider */
  provider?: string;
}

/**
 * Backup Codes Configuration
 * Backup codes for recovery
 */
export interface BackupCodesConfig {
  /** List of backup codes (hashed) */
  codes: string[];
  /** Number of codes used */
  usedCount: number;
  /** Total number of codes */
  totalCount: number;
  /** When codes were generated */
  generatedAt: Timestamp;
}

/**
 * Push Configuration
 * Push notification configuration
 */
export interface PushConfig {
  /** Device ID */
  deviceId: string;
  /** Push notification token */
  pushToken: string;
  /** Platform (iOS, Android, etc.) */
  platform: string;
}

/**
 * Hardware Configuration
 * Hardware security key configuration
 */
export interface HardwareConfig {
  /** Device ID */
  deviceId: string;
  /** Hardware key type (FIDO2, U2F, etc.) */
  keyType: string;
  /** Hardware key ID */
  keyId: string;
  /** Public key credential */
  credentialId: string;
}

/**
 * Security Questions Configuration
 * Security questions configuration
 */
export interface SecurityQuestionsConfig {
  /** Security questions and answers (hashed) */
  questions: Array<{
    question: string;
    answerHash: string;
  }>;
}

/**
 * MFA Verification Request
 * Request to verify MFA code
 */
export interface MfaVerificationRequest {
  /** User ID */
  userId: ID;
  /** MFA method */
  method: MfaMethod;
  /** Verification code */
  code: string;
  /** Device ID (for trust) */
  deviceId?: ID;
  /** Trust this device */
  trustDevice?: boolean;
}

/**
 * MFA Verification Result
 * Result of MFA verification
 */
export interface MfaVerificationResult {
  /** Is verification successful */
  success: boolean;
  /** MFA status after verification */
  status: MfaStatus;
  /** Access token (if verification completed) */
  accessToken?: string;
  /** Refresh token (if verification completed) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Session data */
  session?: {
    id: string;
    expiresAt: Timestamp;
  };
  /** Is device trusted */
  deviceTrusted?: boolean;
  /** Error message (if failed) */
  error?: string;
}

/**
 * MFA Setup Request
 * Request to set up MFA
 */
export interface MfaSetupRequest {
  /** User ID */
  userId: ID;
  /** MFA method to set up */
  method: MfaMethod;
  /** Method-specific configuration */
  config:
    TOTPConfig | SMSConfig | EmailConfig | PushConfig | HardwareConfig | SecurityQuestionsConfig;
}

/**
 * MFA Setup Result
 * Result of MFA setup
 */
export interface MfaSetupResult {
  /** Is setup successful */
  success: boolean;
  /** MFA status after setup */
  status: MfaStatus;
  /** Method that was set up */
  method: MfaMethod;
  /** QR code URL (for TOTP) */
  qrCode?: string;
  /** Secret key (for TOTP) */
  secret?: string;
  /** Backup codes (if generated) */
  backupCodes?: string[];
  /** Message */
  message: string;
}

/**
 * MFA Disable Request
 * Request to disable MFA
 */
export interface MfaDisableRequest {
  /** User ID */
  userId: ID;
  /** MFA method to disable (if specific) */
  method?: MfaMethod;
  /** Current password for confirmation */
  password: string;
  /** Verification code (if available) */
  code?: string;
}

/**
 * MFA Disable Result
 * Result of MFA disable
 */
export interface MfaDisableResult {
  /** Is disable successful */
  success: boolean;
  /** MFA status after disable */
  status: MfaStatus;
  /** Method that was disabled */
  method?: MfaMethod;
  /** Message */
  message: string;
}

/**
 * MFA Recovery Request
 * Request to recover MFA access
 */
export interface MfaRecoveryRequest {
  /** User ID */
  userId: ID;
  /** Recovery code */
  recoveryCode: string;
  /** Device ID */
  deviceId?: ID;
}

/**
 * MFA Recovery Result
 * Result of MFA recovery
 */
export interface MfaRecoveryResult {
  /** Is recovery successful */
  success: boolean;
  /** New MFA status */
  status: MfaStatus;
  /** Access token (if recovery completed) */
  accessToken?: string;
  /** Refresh token (if recovery completed) */
  refreshToken?: string;
  /** Message */
  message: string;
}

/**
 * MFA Statistics
 * MFA usage statistics
 */
export interface MfaStatistics {
  /** Total users with MFA enabled */
  totalEnabled: number;
  /** Total users with MFA required */
  totalRequired: number;
  /** MFA methods distribution */
  methodsDistribution: Record<MfaMethod, number>;
  /** MFA verification success rate */
  successRate: number;
  /** Average verification time in seconds */
  averageVerificationTime: number;
  /** Failed attempts count */
  failedAttempts: number;
  /** Locked accounts count */
  lockedAccounts: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * MFA Session
 * Active MFA session data
 */
export interface MfaSession {
  /** Session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** MFA method being verified */
  method: MfaMethod;
  /** Session status */
  status: 'pending' | 'verified' | 'expired';
  /** Session start timestamp */
  startedAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Number of attempts made */
  attempts: number;
  /** Is device trusted */
  deviceTrusted: boolean;
  /** Device ID */
  deviceId?: ID;
}

/**
 * MFA Method Preference
 * User's preferred MFA methods
 */
export interface MfaMethodPreference {
  /** User ID */
  userId: ID;
  /** Ordered list of preferred methods */
  preferredMethods: MfaMethod[];
  /** Default method (first in list if not specified) */
  defaultMethod: MfaMethod;
  /** Fallback methods (if primary fails) */
  fallbackMethods: MfaMethod[];
}
