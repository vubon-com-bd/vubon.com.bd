/**
 * Authentication MFA Constants
 * Multi-Factor Authentication configuration and constants
 */

import { HTTP_STATUS } from '../common/http-status.constants';

/**
 * MFA Methods
 * Types of Multi-Factor Authentication methods
 */
export const MFA_METHODS = {
  /** Time-based One-Time Password (TOTP) - Google Authenticator, Authy, etc. */
  TOTP: 'totp',
  /** SMS-based One-Time Password */
  SMS: 'sms',
  /** Email-based One-Time Password */
  EMAIL: 'email',
  /** Backup codes for recovery */
  BACKUP_CODES: 'backup_codes',
  /** Push notification to mobile app */
  PUSH: 'push',
  /** Biometric authentication */
  BIOMETRIC: 'biometric',
  /** Hardware security key (U2F/WebAuthn) */
  HARDWARE: 'hardware',
  /** Security questions */
  SECURITY_QUESTIONS: 'security_questions',
} as const;

export type MfaMethod = (typeof MFA_METHODS)[keyof typeof MFA_METHODS];

/**
 * MFA Status
 * Status of MFA configuration for a user
 */
export const MFA_STATUS = {
  /** MFA is enabled for the user */
  ENABLED: 'enabled',
  /** MFA is disabled for the user */
  DISABLED: 'disabled',
  /** MFA setup is in progress */
  SETUP_IN_PROGRESS: 'setup_in_progress',
  /** MFA setup is pending verification */
  PENDING_VERIFICATION: 'pending_verification',
  /** MFA is locked due to failed attempts */
  LOCKED: 'locked',
  /** MFA is required for this user */
  REQUIRED: 'required',
} as const;

export type MfaStatus = (typeof MFA_STATUS)[keyof typeof MFA_STATUS];

/**
 * MFA Configuration
 * Default configuration values for MFA
 */
export const MFA_CONFIG = {
  /** TOTP code length */
  TOTP_CODE_LENGTH: 6,
  /** TOTP code expiry in seconds (30 seconds) */
  TOTP_CODE_EXPIRY: 30,
  /** TOTP time step in seconds (30 seconds) */
  TOTP_TIME_STEP: 30,
  /** TOTP algorithm */
  TOTP_ALGORITHM: 'SHA1' as const,
  /** TOTP issuer name */
  TOTP_ISSUER: 'Vubon.com.bd',
  /** SMS code length */
  SMS_CODE_LENGTH: 6,
  /** SMS code expiry in seconds (5 minutes) */
  SMS_CODE_EXPIRY: 300,
  /** Email code length */
  EMAIL_CODE_LENGTH: 6,
  /** Email code expiry in seconds (5 minutes) */
  EMAIL_CODE_EXPIRY: 300,
  /** Backup codes count */
  BACKUP_CODES_COUNT: 10,
  /** Backup code length */
  BACKUP_CODE_LENGTH: 8,
  /** Maximum MFA verification attempts */
  MAX_VERIFICATION_ATTEMPTS: 5,
  /** MFA lockout duration in seconds (15 minutes) */
  LOCKOUT_DURATION: 900,
  /** Number of allowed MFA methods per user */
  MAX_METHODS_PER_USER: 3,
  /** Number of recovery codes required */
  REQUIRED_RECOVERY_CODES: 5,
  /** MFA session timeout in seconds (5 minutes) */
  SESSION_TIMEOUT: 300,
} as const;

export type MfaConfig = (typeof MFA_CONFIG)[keyof typeof MFA_CONFIG];

/**
 * MFA Error Messages
 * Error messages for MFA failures
 */
export const MFA_ERRORS = {
  /** Invalid MFA code */
  INVALID_CODE: 'Invalid MFA code',
  /** Expired MFA code */
  CODE_EXPIRED: 'MFA code has expired',
  /** Too many MFA attempts */
  TOO_MANY_ATTEMPTS: 'Too many MFA attempts. Please try again later',
  /** MFA is required for this account */
  MFA_REQUIRED: 'MFA is required for this account',
  /** MFA is not enabled for this account */
  MFA_NOT_ENABLED: 'MFA is not enabled for this account',
  /** MFA setup failed */
  SETUP_FAILED: 'MFA setup failed',
  /** MFA verification failed */
  VERIFICATION_FAILED: 'MFA verification failed',
  /** MFA is locked */
  LOCKED: 'MFA is locked. Please contact support',
  /** Invalid TOTP code */
  INVALID_TOTP: 'Invalid TOTP code. Please make sure your authenticator app is synced',
  /** Invalid backup code */
  INVALID_BACKUP_CODE: 'Invalid backup code',
  /** No backup codes available */
  NO_BACKUP_CODES: 'No backup codes available. Please generate new ones',
  /** MFA method not found */
  METHOD_NOT_FOUND: 'MFA method not found',
  /** MFA method already exists */
  METHOD_ALREADY_EXISTS: 'MFA method already exists',
  /** MFA method not supported */
  METHOD_NOT_SUPPORTED: 'MFA method not supported',
  /** Recovery failed */
  RECOVERY_FAILED: 'MFA recovery failed',
  /** Device not trusted */
  DEVICE_NOT_TRUSTED: 'Device is not trusted for MFA bypass',
} as const;

export type MfaError = (typeof MFA_ERRORS)[keyof typeof MFA_ERRORS];

/**
 * MFA Success Messages
 * Success messages for MFA operations
 */
export const MFA_SUCCESS = {
  SETUP_COMPLETED: 'MFA setup completed successfully',
  VERIFIED: 'MFA verification successful',
  DISABLED: 'MFA disabled successfully',
  CODES_GENERATED: 'Backup codes generated successfully',
  METHOD_ADDED: 'MFA method added successfully',
  METHOD_REMOVED: 'MFA method removed successfully',
  RECOVERY_COMPLETED: 'MFA recovery completed successfully',
} as const;

export type MfaSuccess = (typeof MFA_SUCCESS)[keyof typeof MFA_SUCCESS];

/**
 * MFA Status HTTP Mapping
 * Maps MFA status to HTTP status codes
 */
export const MFA_STATUS_HTTP_MAP: Record<MfaStatus, number> = {
  [MFA_STATUS.ENABLED]: HTTP_STATUS.OK,
  [MFA_STATUS.DISABLED]: HTTP_STATUS.OK,
  [MFA_STATUS.SETUP_IN_PROGRESS]: HTTP_STATUS.ACCEPTED,
  [MFA_STATUS.PENDING_VERIFICATION]: HTTP_STATUS.ACCEPTED,
  [MFA_STATUS.LOCKED]: HTTP_STATUS.FORBIDDEN,
  [MFA_STATUS.REQUIRED]: HTTP_STATUS.UNAUTHORIZED,
} as const;

/**
 * MFA Status Messages
 * Human-readable messages for each MFA status
 */
export const MFA_STATUS_MESSAGES: Record<MfaStatus, string> = {
  [MFA_STATUS.ENABLED]: 'MFA is enabled for this account',
  [MFA_STATUS.DISABLED]: 'MFA is disabled for this account',
  [MFA_STATUS.SETUP_IN_PROGRESS]: 'MFA setup is in progress',
  [MFA_STATUS.PENDING_VERIFICATION]: 'MFA setup is pending verification',
  [MFA_STATUS.LOCKED]: 'MFA is locked due to failed attempts',
  [MFA_STATUS.REQUIRED]: 'MFA is required for this account',
} as const;

/**
 * MFA Method Labels
 * Human-readable labels for each MFA method
 */
export const MFA_METHOD_LABELS: Record<MfaMethod, string> = {
  [MFA_METHODS.TOTP]: 'Authenticator App (TOTP)',
  [MFA_METHODS.SMS]: 'SMS Code',
  [MFA_METHODS.EMAIL]: 'Email Code',
  [MFA_METHODS.BACKUP_CODES]: 'Backup Codes',
  [MFA_METHODS.PUSH]: 'Push Notification',
  [MFA_METHODS.BIOMETRIC]: 'Biometric',
  [MFA_METHODS.HARDWARE]: 'Hardware Security Key',
  [MFA_METHODS.SECURITY_QUESTIONS]: 'Security Questions',
} as const;

/**
 * MFA Method Descriptions
 * Detailed descriptions for each MFA method
 */
export const MFA_METHOD_DESCRIPTIONS: Record<MfaMethod, string> = {
  [MFA_METHODS.TOTP]:
    'Time-based One-Time Password using authenticator apps like Google Authenticator, Authy, or Microsoft Authenticator',
  [MFA_METHODS.SMS]: 'One-Time Password sent via SMS to your registered mobile number',
  [MFA_METHODS.EMAIL]: 'One-Time Password sent via email to your registered email address',
  [MFA_METHODS.BACKUP_CODES]:
    'Pre-generated codes for emergency access when primary MFA is unavailable',
  [MFA_METHODS.PUSH]: 'Push notification sent to your registered mobile app',
  [MFA_METHODS.BIOMETRIC]:
    'Biometric authentication using fingerprint, face recognition, or other biometric data',
  [MFA_METHODS.HARDWARE]: 'Hardware security key (FIDO2/WebAuthn) for physical authentication',
  [MFA_METHODS.SECURITY_QUESTIONS]: 'Security questions verification',
} as const;

/**
 * MFA Method Security Levels
 * Higher number = more secure
 */
export const MFA_METHOD_SECURITY_LEVELS: Record<MfaMethod, number> = {
  [MFA_METHODS.TOTP]: 8,
  [MFA_METHODS.SMS]: 5,
  [MFA_METHODS.EMAIL]: 4,
  [MFA_METHODS.BACKUP_CODES]: 6,
  [MFA_METHODS.PUSH]: 9,
  [MFA_METHODS.BIOMETRIC]: 10,
  [MFA_METHODS.HARDWARE]: 10,
  [MFA_METHODS.SECURITY_QUESTIONS]: 3,
} as const;

/**
 * Recommended MFA Methods
 * Methods recommended for production use
 */
export const RECOMMENDED_MFA_METHODS: MfaMethod[] = [
  MFA_METHODS.TOTP,
  MFA_METHODS.PUSH,
  MFA_METHODS.BIOMETRIC,
  MFA_METHODS.HARDWARE,
] as const;

/**
 * MFA Method Icons
 * Icon names for each MFA method
 */
export const MFA_METHOD_ICONS: Record<MfaMethod, string> = {
  [MFA_METHODS.TOTP]: 'qr_code',
  [MFA_METHODS.SMS]: 'sms',
  [MFA_METHODS.EMAIL]: 'email',
  [MFA_METHODS.BACKUP_CODES]: 'security',
  [MFA_METHODS.PUSH]: 'notifications',
  [MFA_METHODS.BIOMETRIC]: 'fingerprint',
  [MFA_METHODS.HARDWARE]: 'usb',
  [MFA_METHODS.SECURITY_QUESTIONS]: 'question_answer',
} as const;

/**
 * Helper function to check if MFA method is valid
 */
export function isValidMfaMethod(method: string): method is MfaMethod {
  return Object.values(MFA_METHODS).includes(method as MfaMethod);
}

/**
 * Helper function to check if MFA status is valid
 */
export function isValidMfaStatus(status: string): status is MfaStatus {
  return Object.values(MFA_STATUS).includes(status as MfaStatus);
}

/**
 * Helper function to get MFA method label
 */
export function getMfaMethodLabel(method: MfaMethod): string {
  return MFA_METHOD_LABELS[method] || 'Unknown Method';
}

/**
 * Helper function to get MFA method description
 */
export function getMfaMethodDescription(method: MfaMethod): string {
  return MFA_METHOD_DESCRIPTIONS[method] || 'No description available';
}

/**
 * Helper function to get MFA method security level
 */
export function getMfaMethodSecurityLevel(method: MfaMethod): number {
  return MFA_METHOD_SECURITY_LEVELS[method] || 0;
}

/**
 * Helper function to check if MFA method is recommended
 */
export function isRecommendedMfaMethod(method: MfaMethod): boolean {
  return RECOMMENDED_MFA_METHODS.includes(method);
}

/**
 * Helper function to get MFA method icon
 */
export function getMfaMethodIcon(method: MfaMethod): string {
  return MFA_METHOD_ICONS[method] || 'security';
}

/**
 * Helper function to get HTTP status for MFA status
 */
export function getHttpStatusForMfaStatus(status: MfaStatus): number {
  return MFA_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Helper function to get MFA status message
 */
export function getMfaStatusMessage(status: MfaStatus): string {
  return MFA_STATUS_MESSAGES[status] || 'Unknown MFA status';
}

/**
 * Helper function to check if TOTP code is valid
 * This checks if the code is 6 digits and not expired
 */
export function isTotpCodeValid(code: string, createdAt: Date): boolean {
  // Check if code is 6 digits
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }

  // Check if code is expired
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= MFA_CONFIG.TOTP_CODE_EXPIRY;
}

/**
 * Helper function to check if SMS code is valid
 */
export function isSmsCodeValid(code: string, createdAt: Date): boolean {
  // Check if code is 6 digits
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }

  // Check if code is expired
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= MFA_CONFIG.SMS_CODE_EXPIRY;
}

/**
 * Helper function to check if email code is valid
 */
export function isEmailCodeValid(code: string, createdAt: Date): boolean {
  // Check if code is 6 digits
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }

  // Check if code is expired
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= MFA_CONFIG.EMAIL_CODE_EXPIRY;
}

/**
 * Helper function to generate MFA session ID
 * This is a simple UUID v4 generator for MFA sessions
 */
export function generateMfaSessionId(): string {
  const chunks: string[] = [];
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      chunks.push('-');
    } else if (i === 14) {
      chunks.push('4');
    } else if (i === 19) {
      chunks.push('89ab'[Math.floor(Math.random() * 4)]);
    } else {
      chunks.push(Math.floor(Math.random() * 16).toString(16));
    }
  }
  return chunks.join('');
}
