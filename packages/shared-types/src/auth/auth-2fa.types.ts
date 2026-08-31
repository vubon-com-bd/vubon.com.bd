/**
 * Authentication 2FA Types
 * Types for Two-Factor Authentication (subset of MFA)
 */

import type { AuthMfaMethod, AuthMfaStatus } from '@vubon/shared-constants';
import { AUTH_MFA_METHODS, AUTH_MFA_STATUS, AUTH_MFA_CONFIG } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// 2FA METHOD TYPES
// ============================================================

/**
 * 2FA method types
 * Subset of MFA methods that are commonly used for 2FA
 */
export type Auth2faMethod =
  | typeof AUTH_MFA_METHODS.TOTP
  | typeof AUTH_MFA_METHODS.SMS
  | typeof AUTH_MFA_METHODS.EMAIL
  | typeof AUTH_MFA_METHODS.PUSH
  | typeof AUTH_MFA_METHODS.BACKUP_CODES;

/**
 * 2FA status
 * Subset of MFA statuses relevant to 2FA
 */
export type Auth2faStatus =
  | typeof AUTH_MFA_STATUS.ENABLED
  | typeof AUTH_MFA_STATUS.DISABLED
  | typeof AUTH_MFA_STATUS.SETUP_IN_PROGRESS
  | typeof AUTH_MFA_STATUS.PENDING_VERIFICATION
  | typeof AUTH_MFA_STATUS.REQUIRED;

// ============================================================
// 2FA CONFIGURATION
// ============================================================

/**
 * TOTP configuration for 2FA
 */
export interface Auth2faTotpConfig {
  /** TOTP secret key (base32 encoded) */
  secret: string;
  /** TOTP issuer name */
  issuer: string;
  /** TOTP account name (usually email) */
  accountName: string;
  /** TOTP algorithm */
  algorithm: 'SHA1' | 'SHA256' | 'SHA512';
  /** TOTP time step in seconds */
  timeStep: number;
  /** TOTP code length */
  codeLength: number;
  /** TOTP window size for validation */
  windowSize: number;
}

/**
 * SMS 2FA configuration
 */
export interface Auth2faSmsConfig {
  /** Phone number for SMS */
  phoneNumber: string;
  /** Country code */
  countryCode: string;
}

/**
 * Email 2FA configuration
 */
export interface Auth2faEmailConfig {
  /** Email address for 2FA */
  email: string;
}

// ============================================================
// 2FA RECORD
// ============================================================

/**
 * 2FA record for a user
 */
export interface Auth2faRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** 2FA method */
  method: Auth2faMethod;
  /** 2FA status */
  status: Auth2faStatus;
  /** Whether this is the primary 2FA method */
  isPrimary: boolean;
  /** Whether the method is verified */
  isVerified: boolean;
  /** TOTP configuration (if method is TOTP) */
  totpConfig?: Auth2faTotpConfig;
  /** SMS configuration (if method is SMS) */
  smsConfig?: Auth2faSmsConfig;
  /** Email configuration (if method is Email) */
  emailConfig?: Auth2faEmailConfig;
  /** Last verified at */
  lastVerifiedAt?: Timestamp;
  /** Failed verification attempts */
  failedAttempts: number;
  /** When the method was added */
  addedAt: Timestamp;
  /** When the method was updated */
  updatedAt: Timestamp;
}

// ============================================================
// 2FA REQUEST
// ============================================================

/**
 * Request to enable 2FA
 */
export interface Auth2faEnableRequest {
  /** User ID */
  userId: ID;
  /** 2FA method to enable */
  method: Auth2faMethod;
  /** Phone number (for SMS method) */
  phoneNumber?: string;
  /** Email (for Email method) */
  email?: string;
  /** Whether to make this the primary method */
  isPrimary?: boolean;
}

/**
 * Request to verify 2FA setup
 */
export interface Auth2faVerifyRequest {
  /** User ID */
  userId: ID;
  /** 2FA method being verified */
  method: Auth2faMethod;
  /** Verification code */
  code: string;
  /** TOTP secret (if setting up TOTP) */
  totpSecret?: string;
}

/**
 * Request to disable 2FA
 */
export interface Auth2faDisableRequest {
  /** User ID */
  userId: ID;
  /** 2FA method to disable */
  method: Auth2faMethod;
  /** Verification code (required for security) */
  code: string;
}

/**
 * Request to verify 2FA code during login
 */
export interface Auth2faLoginVerifyRequest {
  /** User ID */
  userId: ID;
  /** 2FA method used */
  method: Auth2faMethod;
  /** Verification code */
  code: string;
  /** Session ID (if applicable) */
  sessionId?: ID;
  /** Whether to trust the device */
  trustDevice?: boolean;
}

// ============================================================
// 2FA RESPONSE
// ============================================================

/**
 * 2FA operation response
 */
export interface Auth2faResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** 2FA record (if applicable) */
  record?: Auth2faRecord;
  /** TOTP secret (for TOTP setup) */
  totpSecret?: string;
  /** TOTP QR code URL (for TOTP setup) */
  totpQrUrl?: string;
  /** Whether verification is required */
  verificationRequired?: boolean;
  /** Error message if failed */
  error?: string;
}

/**
 * 2FA login verification response
 */
export interface Auth2faLoginVerifyResponse {
  /** Whether verification was successful */
  success: boolean;
  /** Whether the device is trusted */
  deviceTrusted: boolean;
  /** Access token (if verification successful) */
  accessToken?: string;
  /** Refresh token (if verification successful) */
  refreshToken?: string;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// 2FA FILTER
// ============================================================

/**
 * Filter for querying 2FA records
 */
export interface Auth2faFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by method */
  method?: Auth2faMethod | Auth2faMethod[];
  /** Filter by status */
  status?: Auth2faStatus | Auth2faStatus[];
  /** Filter by verification status */
  verifiedOnly?: boolean;
  /** Filter by primary method */
  primaryOnly?: boolean;
}

// ============================================================
// 2FA SUMMARY
// ============================================================

/**
 * 2FA summary for a user
 */
export interface Auth2faSummary {
  /** User ID */
  userId: ID;
  /** Whether 2FA is enabled */
  isEnabled: boolean;
  /** Whether 2FA is required */
  isRequired: boolean;
  /** Total number of 2FA methods */
  totalMethods: number;
  /** Number of verified methods */
  verifiedMethods: number;
  /** Primary 2FA method */
  primaryMethod?: Auth2faMethod;
  /** All 2FA methods */
  methods: Auth2faMethod[];
  /** Whether backup codes are available */
  hasBackupCodes: boolean;
}

// ============================================================
// 2FA SESSION
// ============================================================

/**
 * 2FA session (for login flow)
 */
export interface Auth2faSession {
  /** Session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** 2FA method to use */
  method: Auth2faMethod;
  /** Session status */
  status: 'pending' | 'verified' | 'expired';
  /** When the session was created */
  createdAt: Timestamp;
  /** When the session expires */
  expiresAt: Timestamp;
  /** Whether the device is trusted */
  deviceTrusted: boolean;
  /** Number of attempts */
  attempts: number;
}

// ============================================================
// 2FA CONFIG
// ============================================================

/**
 * 2FA configuration
 */
export interface Auth2faConfig {
  /** TOTP code length */
  totpCodeLength: number;
  /** TOTP code expiry in seconds */
  totpCodeExpiry: number;
  /** TOTP time step in seconds */
  totpTimeStep: number;
  /** TOTP algorithm */
  totpAlgorithm: 'SHA1' | 'SHA256' | 'SHA512';
  /** TOTP issuer */
  totpIssuer: string;
  /** SMS code length */
  smsCodeLength: number;
  /** SMS code expiry in seconds */
  smsCodeExpiry: number;
  /** Email code length */
  emailCodeLength: number;
  /** Email code expiry in seconds */
  emailCodeExpiry: number;
  /** Maximum verification attempts */
  maxVerificationAttempts: number;
  /** Lockout duration in seconds */
  lockoutDuration: number;
  /** Maximum methods per user */
  maxMethodsPerUser: number;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if 2FA method is valid
 */
export function isValidAuth2faMethod(method: string): method is Auth2faMethod {
  const validMethods: Auth2faMethod[] = [
    AUTH_MFA_METHODS.TOTP,
    AUTH_MFA_METHODS.SMS,
    AUTH_MFA_METHODS.EMAIL,
    AUTH_MFA_METHODS.PUSH,
    AUTH_MFA_METHODS.BACKUP_CODES,
  ];
  return validMethods.includes(method as Auth2faMethod);
}

/**
 * Check if 2FA status is valid
 */
export function isValidAuth2faStatus(status: string): status is Auth2faStatus {
  const validStatuses: Auth2faStatus[] = [
    AUTH_MFA_STATUS.ENABLED,
    AUTH_MFA_STATUS.DISABLED,
    AUTH_MFA_STATUS.SETUP_IN_PROGRESS,
    AUTH_MFA_STATUS.PENDING_VERIFICATION,
    AUTH_MFA_STATUS.REQUIRED,
  ];
  return validStatuses.includes(status as Auth2faStatus);
}

/**
 * Check if 2FA is enabled
 */
export function isAuth2faEnabled(status: Auth2faStatus): boolean {
  return status === AUTH_MFA_STATUS.ENABLED || status === AUTH_MFA_STATUS.REQUIRED;
}

/**
 * Check if 2FA needs setup
 */
export function isAuth2faSetupRequired(status: Auth2faStatus): boolean {
  return status === AUTH_MFA_STATUS.DISABLED || status === AUTH_MFA_STATUS.SETUP_IN_PROGRESS;
}

/**
 * Check if 2FA is pending verification
 */
export function isAuth2faPendingVerification(status: Auth2faStatus): boolean {
  return status === AUTH_MFA_STATUS.PENDING_VERIFICATION;
}

/**
 * Get human-readable label for 2FA method
 */
export function getAuth2faMethodLabel(method: Auth2faMethod): string {
  const labels: Record<Auth2faMethod, string> = {
    totp: 'Authenticator App (TOTP)',
    sms: 'SMS Code',
    email: 'Email Code',
    push: 'Push Notification',
    backup_codes: 'Backup Codes',
  };
  return labels[method] || 'Unknown Method';
}

/**
 * Get human-readable label for 2FA status
 */
export function getAuth2faStatusLabel(status: Auth2faStatus): string {
  const labels: Record<Auth2faStatus, string> = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    setup_in_progress: 'Setup In Progress',
    pending_verification: 'Pending Verification',
    required: 'Required',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Generate TOTP secret
 */
export function generateAuth2faTotpSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

/**
 * Generate TOTP QR URL
 */
export function generateAuth2faTotpQrUrl(
  secret: string,
  accountName: string,
  issuer: string = 'Vubon.com.bd'
): string {
  return `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Validate TOTP code
 */
export function validateAuth2faTotpCode(
  code: string,
  secret: string,
  windowSize: number = 1
): boolean {
  // This is a placeholder - actual validation would use a TOTP library
  // In a real implementation, you'd use something like 'otplib' or 'speakeasy'
  const isCodeValid = code.length === 6 && /^\d{6}$/.test(code);
  return isCodeValid && secret.length > 0 && windowSize >= 0;
}

/**
 * Check if 2FA code is valid format
 */
export function isAuth2faCodeValidFormat(code: string, method: Auth2faMethod): boolean {
  if (method === AUTH_MFA_METHODS.TOTP) {
    return /^\d{6}$/.test(code);
  }
  if (method === AUTH_MFA_METHODS.SMS || method === AUTH_MFA_METHODS.EMAIL) {
    return /^\d{6}$/.test(code);
  }
  if (method === AUTH_MFA_METHODS.BACKUP_CODES) {
    return /^[A-Z0-9]{8}$/.test(code);
  }
  return true;
}

/**
 * Get default 2FA config
 */
export function getAuthDefault2faConfig(): Auth2faConfig {
  return {
    totpCodeLength: AUTH_MFA_CONFIG.TOTP_CODE_LENGTH,
    totpCodeExpiry: AUTH_MFA_CONFIG.TOTP_CODE_EXPIRY,
    totpTimeStep: AUTH_MFA_CONFIG.TOTP_TIME_STEP,
    totpAlgorithm: AUTH_MFA_CONFIG.TOTP_ALGORITHM,
    totpIssuer: AUTH_MFA_CONFIG.TOTP_ISSUER,
    smsCodeLength: AUTH_MFA_CONFIG.SMS_CODE_LENGTH,
    smsCodeExpiry: AUTH_MFA_CONFIG.SMS_CODE_EXPIRY,
    emailCodeLength: AUTH_MFA_CONFIG.EMAIL_CODE_LENGTH,
    emailCodeExpiry: AUTH_MFA_CONFIG.EMAIL_CODE_EXPIRY,
    maxVerificationAttempts: AUTH_MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS,
    lockoutDuration: AUTH_MFA_CONFIG.LOCKOUT_DURATION,
    maxMethodsPerUser: AUTH_MFA_CONFIG.MAX_METHODS_PER_USER,
  };
}

/**
 * Check if 2FA method is recommended
 */
export function isAuth2faMethodRecommended(method: Auth2faMethod): boolean {
  const recommended: Auth2faMethod[] = [AUTH_MFA_METHODS.TOTP, AUTH_MFA_METHODS.PUSH];
  return recommended.includes(method);
}

/**
 * Get 2FA method security level
 */
export function getAuth2faMethodSecurityLevel(method: Auth2faMethod): number {
  const levels: Record<Auth2faMethod, number> = {
    totp: 8,
    sms: 5,
    email: 4,
    push: 9,
    backup_codes: 6,
  };
  return levels[method] || 0;
}

/**
 * Convert MFA method to 2FA method
 */
export function convertAuthMfaMethodTo2fa(method: AuthMfaMethod): Auth2faMethod | null {
  const valid2faMethods: Auth2faMethod[] = [
    AUTH_MFA_METHODS.TOTP,
    AUTH_MFA_METHODS.SMS,
    AUTH_MFA_METHODS.EMAIL,
    AUTH_MFA_METHODS.PUSH,
    AUTH_MFA_METHODS.BACKUP_CODES,
  ];
  return valid2faMethods.includes(method as Auth2faMethod) ? (method as Auth2faMethod) : null;
}

/**
 * Convert 2FA status to MFA status
 */
export function convertAuth2faStatusToMfa(status: Auth2faStatus): AuthMfaStatus {
  // Map 2FA status to full MFA status
  const statusMap: Record<Auth2faStatus, AuthMfaStatus> = {
    [AUTH_MFA_STATUS.ENABLED]: AUTH_MFA_STATUS.ENABLED,
    [AUTH_MFA_STATUS.DISABLED]: AUTH_MFA_STATUS.DISABLED,
    [AUTH_MFA_STATUS.SETUP_IN_PROGRESS]: AUTH_MFA_STATUS.SETUP_IN_PROGRESS,
    [AUTH_MFA_STATUS.PENDING_VERIFICATION]: AUTH_MFA_STATUS.PENDING_VERIFICATION,
    [AUTH_MFA_STATUS.REQUIRED]: AUTH_MFA_STATUS.REQUIRED,
  };
  return statusMap[status] || AUTH_MFA_STATUS.DISABLED;
}

/**
 * Check if 2FA method is compatible with device
 */
export function isAuth2faMethodCompatible(method: Auth2faMethod, deviceType: string): boolean {
  // TOTP works on all devices
  if (method === AUTH_MFA_METHODS.TOTP) return true;

  // SMS works on phones
  if (method === AUTH_MFA_METHODS.SMS) {
    return deviceType === 'mobile' || deviceType === 'tablet';
  }

  // Email works on all devices
  if (method === AUTH_MFA_METHODS.EMAIL) return true;

  // Push works on mobile devices
  if (method === AUTH_MFA_METHODS.PUSH) {
    return deviceType === 'mobile' || deviceType === 'tablet';
  }

  // Backup codes work on all devices
  if (method === AUTH_MFA_METHODS.BACKUP_CODES) return true;

  return false;
}
