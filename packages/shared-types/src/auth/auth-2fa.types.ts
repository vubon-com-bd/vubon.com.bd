/**
 * Authentication 2FA Types
 * Two-Factor Authentication specific data types
 * (Alias and extension of MFA types for 2FA-specific use cases)
 */

import type { MfaMethod, MfaStatus } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';
import type {
  MfaConfiguration,
  TOTPConfig,
  SMSConfig,
  EmailConfig,
  BackupCodesConfig,
} from './auth-mfa.types';

/**
 * 2FA Configuration
 * Alias for MfaConfiguration - user's 2FA configuration
 */
export type TwoFAConfiguration = MfaConfiguration;

/**
 * 2FA Method Configuration
 * Configuration for a specific 2FA method
 */
export interface TwoFAMethodConfig {
  /** 2FA method type */
  method: MfaMethod;
  /** Is method enabled */
  isEnabled: boolean;
  /** Is method verified */
  isVerified: boolean;
  /** Method-specific configuration */
  config: TOTPConfig | SMSConfig | EmailConfig | BackupCodesConfig;
  /** When method was added */
  addedAt: Timestamp;
  /** When method was last used */
  lastUsedAt?: Timestamp;
}

/**
 * 2FA Setup Request
 * Request to set up 2FA
 */
export interface TwoFASetupRequest {
  /** User ID */
  userId: ID;
  /** 2FA method to set up */
  method: MfaMethod;
  /** Method-specific configuration */
  config: TOTPConfig | SMSConfig | EmailConfig;
}

/**
 * 2FA Setup Result
 * Result of 2FA setup
 */
export interface TwoFASetupResult {
  /** Is setup successful */
  success: boolean;
  /** 2FA status after setup */
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
 * 2FA Verification Request
 * Request to verify 2FA code
 */
export interface TwoFAVerificationRequest {
  /** User ID */
  userId: ID;
  /** Verification code */
  code: string;
  /** 2FA method (optional) */
  method?: MfaMethod;
  /** Device ID (for trust) */
  deviceId?: ID;
  /** Trust this device */
  trustDevice?: boolean;
}

/**
 * 2FA Verification Result
 * Result of 2FA verification
 */
export interface TwoFAVerificationResult {
  /** Is verification successful */
  success: boolean;
  /** 2FA status after verification */
  status: MfaStatus;
  /** User data (if verification completed) */
  user?: AuthUser;
  /** Access token (if verification completed) */
  accessToken?: string;
  /** Refresh token (if verification completed) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Is device trusted */
  deviceTrusted?: boolean;
  /** Error message (if failed) */
  error?: string;
}

/**
 * 2FA Disable Request
 * Request to disable 2FA
 */
export interface TwoFADisableRequest {
  /** User ID */
  userId: ID;
  /** Current password for confirmation */
  password: string;
  /** Verification code (if available) */
  code?: string;
}

/**
 * 2FA Disable Result
 * Result of 2FA disable
 */
export interface TwoFADisableResult {
  /** Is disable successful */
  success: boolean;
  /** 2FA status after disable */
  status: MfaStatus;
  /** Message */
  message: string;
}

/**
 * 2FA Recovery Request
 * Request to recover 2FA access
 */
export interface TwoFARecoveryRequest {
  /** User ID */
  userId: ID;
  /** Recovery code */
  recoveryCode: string;
  /** Device ID */
  deviceId?: ID;
}

/**
 * 2FA Recovery Result
 * Result of 2FA recovery
 */
export interface TwoFARecoveryResult {
  /** Is recovery successful */
  success: boolean;
  /** New 2FA status */
  status: MfaStatus;
  /** User data (if recovery completed) */
  user?: AuthUser;
  /** Access token (if recovery completed) */
  accessToken?: string;
  /** Refresh token (if recovery completed) */
  refreshToken?: string;
  /** Message */
  message: string;
}

/**
 * 2FA Status Response
 * Response for checking 2FA status
 */
export interface TwoFAStatusResponse {
  /** User ID */
  userId: ID;
  /** Is 2FA enabled */
  isEnabled: boolean;
  /** Current 2FA status */
  status: MfaStatus;
  /** Enabled 2FA methods */
  enabledMethods: MfaMethod[];
  /** Is 2FA enforced */
  isEnforced: boolean;
  /** When 2FA was enabled */
  enabledAt?: Timestamp;
}

/**
 * 2FA Method List
 * List of available 2FA methods for a user
 */
export interface TwoFAMethodList {
  /** User ID */
  userId: ID;
  /** Available methods */
  methods: TwoFAMethodConfig[];
  /** Recommended methods */
  recommendedMethods: MfaMethod[];
  /** Maximum methods allowed */
  maxMethods: number;
}

/**
 * 2FA Trusted Device
 * Trusted device for 2FA bypass
 */
export interface TwoFATrustedDevice {
  /** Device ID */
  deviceId: ID;
  /** Device name */
  deviceName: string;
  /** Device type */
  deviceType: string;
  /** When device was trusted */
  trustedAt: Timestamp;
  /** When device trust expires */
  expiresAt: Timestamp;
  /** Last used timestamp */
  lastUsedAt?: Timestamp;
  /** Is device still trusted */
  isTrusted: boolean;
}

/**
 * 2FA Trusted Device List
 * List of trusted devices for a user
 */
export interface TwoFATrustedDeviceList {
  /** User ID */
  userId: ID;
  /** Trusted devices */
  devices: TwoFATrustedDevice[];
  /** Total count */
  total: number;
  /** Maximum trusted devices allowed */
  maxDevices: number;
}

/**
 * 2FA Trust Device Request
 * Request to trust a device
 */
export interface TwoFATrustDeviceRequest {
  /** User ID */
  userId: ID;
  /** Device ID */
  deviceId: ID;
  /** Device name */
  deviceName: string;
  /** Trust duration in seconds (optional) */
  duration?: number;
}

/**
 * 2FA Trust Device Result
 * Result of trusting a device
 */
export interface TwoFATrustDeviceResult {
  /** Is device trusted */
  trusted: boolean;
  /** Device ID */
  deviceId: ID;
  /** Trust expiry timestamp */
  expiresAt: Timestamp;
  /** Message */
  message: string;
}

/**
 * 2FA Untrust Device Request
 * Request to untrust a device
 */
export interface TwoFAUntrustDeviceRequest {
  /** User ID */
  userId: ID;
  /** Device ID */
  deviceId: ID;
}

/**
 * 2FA Untrust Device Result
 * Result of untrusting a device
 */
export interface TwoFAUntrustDeviceResult {
  /** Is device untrusted */
  untrusted: boolean;
  /** Device ID */
  deviceId: ID;
  /** Message */
  message: string;
}

/**
 * 2FA Settings
 * User's 2FA settings
 */
export interface TwoFASettings {
  /** User ID */
  userId: ID;
  /** Is 2FA required */
  isRequired: boolean;
  /** Is 2FA enforced */
  isEnforced: boolean;
  /** Allowed 2FA methods */
  allowedMethods: MfaMethod[];
  /** Default 2FA method */
  defaultMethod?: MfaMethod;
  /** Trust device duration in seconds */
  trustDeviceDuration: number;
  /** Maximum verification attempts */
  maxAttempts: number;
  /** Lockout duration in seconds */
  lockoutDuration: number;
}
