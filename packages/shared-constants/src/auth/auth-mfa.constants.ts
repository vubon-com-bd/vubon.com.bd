/**
 * Authentication MFA Constants
 * Multi-Factor Authentication configuration and constants
 */

import { HTTP_STATUS } from '../common/http-status.constants';

// ============================================================
// AUTH MFA METHODS
// ============================================================
export const AUTH_MFA_METHODS = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP_CODES: 'backup_codes',
  PUSH: 'push',
  BIOMETRIC: 'biometric',
  HARDWARE: 'hardware',
  SECURITY_QUESTIONS: 'security_questions',
} as const;

export type AuthMfaMethod = (typeof AUTH_MFA_METHODS)[keyof typeof AUTH_MFA_METHODS];

// ============================================================
// AUTH MFA STATUS
// ============================================================
export const AUTH_MFA_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  SETUP_IN_PROGRESS: 'setup_in_progress',
  PENDING_VERIFICATION: 'pending_verification',
  LOCKED: 'locked',
  REQUIRED: 'required',
} as const;

export type AuthMfaStatus = (typeof AUTH_MFA_STATUS)[keyof typeof AUTH_MFA_STATUS];

// ============================================================
// AUTH MFA CONFIG
// ============================================================
export const AUTH_MFA_CONFIG = {
  TOTP_CODE_LENGTH: 6,
  TOTP_CODE_EXPIRY: 30,
  TOTP_TIME_STEP: 30,
  TOTP_ALGORITHM: 'SHA1' as const,
  TOTP_ISSUER: 'Vubon.com.bd',
  SMS_CODE_LENGTH: 6,
  SMS_CODE_EXPIRY: 300,
  EMAIL_CODE_LENGTH: 6,
  EMAIL_CODE_EXPIRY: 300,
  BACKUP_CODES_COUNT: 10,
  BACKUP_CODE_LENGTH: 8,
  MAX_VERIFICATION_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900,
  MAX_METHODS_PER_USER: 3,
  REQUIRED_RECOVERY_CODES: 5,
  SESSION_TIMEOUT: 300,
} as const;

export type AuthMfaConfig = (typeof AUTH_MFA_CONFIG)[keyof typeof AUTH_MFA_CONFIG];

// ============================================================
// AUTH MFA ERRORS
// ============================================================
export const AUTH_MFA_ERRORS = {
  INVALID_CODE: 'Invalid MFA code',
  CODE_EXPIRED: 'MFA code has expired',
  TOO_MANY_ATTEMPTS: 'Too many MFA attempts. Please try again later',
  MFA_REQUIRED: 'MFA is required for this account',
  MFA_NOT_ENABLED: 'MFA is not enabled for this account',
  SETUP_FAILED: 'MFA setup failed',
  VERIFICATION_FAILED: 'MFA verification failed',
  LOCKED: 'MFA is locked. Please contact support',
  INVALID_TOTP: 'Invalid TOTP code. Please make sure your authenticator app is synced',
  INVALID_BACKUP_CODE: 'Invalid backup code',
  NO_BACKUP_CODES: 'No backup codes available. Please generate new ones',
  METHOD_NOT_FOUND: 'MFA method not found',
  METHOD_ALREADY_EXISTS: 'MFA method already exists',
  METHOD_NOT_SUPPORTED: 'MFA method not supported',
  RECOVERY_FAILED: 'MFA recovery failed',
  DEVICE_NOT_TRUSTED: 'Device is not trusted for MFA bypass',
} as const;

export type AuthMfaError = (typeof AUTH_MFA_ERRORS)[keyof typeof AUTH_MFA_ERRORS];

// ============================================================
// AUTH MFA SUCCESS
// ============================================================
export const AUTH_MFA_SUCCESS = {
  SETUP_COMPLETED: 'MFA setup completed successfully',
  VERIFIED: 'MFA verification successful',
  DISABLED: 'MFA disabled successfully',
  CODES_GENERATED: 'Backup codes generated successfully',
  METHOD_ADDED: 'MFA method added successfully',
  METHOD_REMOVED: 'MFA method removed successfully',
  RECOVERY_COMPLETED: 'MFA recovery completed successfully',
} as const;

export type AuthMfaSuccess = (typeof AUTH_MFA_SUCCESS)[keyof typeof AUTH_MFA_SUCCESS];

// ============================================================
// AUTH MFA STATUS HTTP MAP
// ============================================================
export const AUTH_MFA_STATUS_HTTP_MAP: Record<AuthMfaStatus, number> = {
  [AUTH_MFA_STATUS.ENABLED]: HTTP_STATUS.OK,
  [AUTH_MFA_STATUS.DISABLED]: HTTP_STATUS.OK,
  [AUTH_MFA_STATUS.SETUP_IN_PROGRESS]: HTTP_STATUS.ACCEPTED,
  [AUTH_MFA_STATUS.PENDING_VERIFICATION]: HTTP_STATUS.ACCEPTED,
  [AUTH_MFA_STATUS.LOCKED]: HTTP_STATUS.FORBIDDEN,
  [AUTH_MFA_STATUS.REQUIRED]: HTTP_STATUS.UNAUTHORIZED,
} as const;

// ============================================================
// AUTH MFA STATUS MESSAGES
// ============================================================
export const AUTH_MFA_STATUS_MESSAGES: Record<AuthMfaStatus, string> = {
  [AUTH_MFA_STATUS.ENABLED]: 'MFA is enabled for this account',
  [AUTH_MFA_STATUS.DISABLED]: 'MFA is disabled for this account',
  [AUTH_MFA_STATUS.SETUP_IN_PROGRESS]: 'MFA setup is in progress',
  [AUTH_MFA_STATUS.PENDING_VERIFICATION]: 'MFA setup is pending verification',
  [AUTH_MFA_STATUS.LOCKED]: 'MFA is locked due to failed attempts',
  [AUTH_MFA_STATUS.REQUIRED]: 'MFA is required for this account',
} as const;

// ============================================================
// AUTH MFA METHOD LABELS
// ============================================================
export const AUTH_MFA_METHOD_LABELS: Record<AuthMfaMethod, string> = {
  [AUTH_MFA_METHODS.TOTP]: 'Authenticator App (TOTP)',
  [AUTH_MFA_METHODS.SMS]: 'SMS Code',
  [AUTH_MFA_METHODS.EMAIL]: 'Email Code',
  [AUTH_MFA_METHODS.BACKUP_CODES]: 'Backup Codes',
  [AUTH_MFA_METHODS.PUSH]: 'Push Notification',
  [AUTH_MFA_METHODS.BIOMETRIC]: 'Biometric',
  [AUTH_MFA_METHODS.HARDWARE]: 'Hardware Security Key',
  [AUTH_MFA_METHODS.SECURITY_QUESTIONS]: 'Security Questions',
} as const;

// ============================================================
// AUTH MFA METHOD DESCRIPTIONS
// ============================================================
export const AUTH_MFA_METHOD_DESCRIPTIONS: Record<AuthMfaMethod, string> = {
  [AUTH_MFA_METHODS.TOTP]:
    'Time-based One-Time Password using authenticator apps like Google Authenticator, Authy, or Microsoft Authenticator',
  [AUTH_MFA_METHODS.SMS]: 'One-Time Password sent via SMS to your registered mobile number',
  [AUTH_MFA_METHODS.EMAIL]: 'One-Time Password sent via email to your registered email address',
  [AUTH_MFA_METHODS.BACKUP_CODES]:
    'Pre-generated codes for emergency access when primary MFA is unavailable',
  [AUTH_MFA_METHODS.PUSH]: 'Push notification sent to your registered mobile app',
  [AUTH_MFA_METHODS.BIOMETRIC]:
    'Biometric authentication using fingerprint, face recognition, or other biometric data',
  [AUTH_MFA_METHODS.HARDWARE]: 'Hardware security key (FIDO2/WebAuthn) for physical authentication',
  [AUTH_MFA_METHODS.SECURITY_QUESTIONS]: 'Security questions verification',
} as const;

// ============================================================
// AUTH MFA METHOD SECURITY LEVELS
// ============================================================
export const AUTH_MFA_METHOD_SECURITY_LEVELS: Record<AuthMfaMethod, number> = {
  [AUTH_MFA_METHODS.TOTP]: 8,
  [AUTH_MFA_METHODS.SMS]: 5,
  [AUTH_MFA_METHODS.EMAIL]: 4,
  [AUTH_MFA_METHODS.BACKUP_CODES]: 6,
  [AUTH_MFA_METHODS.PUSH]: 9,
  [AUTH_MFA_METHODS.BIOMETRIC]: 10,
  [AUTH_MFA_METHODS.HARDWARE]: 10,
  [AUTH_MFA_METHODS.SECURITY_QUESTIONS]: 3,
} as const;

// ============================================================
// RECOMMENDED AUTH MFA METHODS
// ============================================================
export const RECOMMENDED_AUTH_MFA_METHODS: AuthMfaMethod[] = [
  AUTH_MFA_METHODS.TOTP,
  AUTH_MFA_METHODS.PUSH,
  AUTH_MFA_METHODS.BIOMETRIC,
  AUTH_MFA_METHODS.HARDWARE,
] as const;

// ============================================================
// AUTH MFA METHOD ICONS
// ============================================================
export const AUTH_MFA_METHOD_ICONS: Record<AuthMfaMethod, string> = {
  [AUTH_MFA_METHODS.TOTP]: 'qr_code',
  [AUTH_MFA_METHODS.SMS]: 'sms',
  [AUTH_MFA_METHODS.EMAIL]: 'email',
  [AUTH_MFA_METHODS.BACKUP_CODES]: 'security',
  [AUTH_MFA_METHODS.PUSH]: 'notifications',
  [AUTH_MFA_METHODS.BIOMETRIC]: 'fingerprint',
  [AUTH_MFA_METHODS.HARDWARE]: 'usb',
  [AUTH_MFA_METHODS.SECURITY_QUESTIONS]: 'question_answer',
} as const;

// ============================================================
// AUTH MFA MAIN OBJECT
// ============================================================
export const authMfa = {
  METHODS: AUTH_MFA_METHODS,
  STATUS: AUTH_MFA_STATUS,
  CONFIG: AUTH_MFA_CONFIG,
  ERRORS: AUTH_MFA_ERRORS,
  SUCCESS: AUTH_MFA_SUCCESS,
  STATUS_HTTP_MAP: AUTH_MFA_STATUS_HTTP_MAP,
  STATUS_MESSAGES: AUTH_MFA_STATUS_MESSAGES,
  METHOD_LABELS: AUTH_MFA_METHOD_LABELS,
  METHOD_DESCRIPTIONS: AUTH_MFA_METHOD_DESCRIPTIONS,
  METHOD_SECURITY_LEVELS: AUTH_MFA_METHOD_SECURITY_LEVELS,
  RECOMMENDED_METHODS: RECOMMENDED_AUTH_MFA_METHODS,
  METHOD_ICONS: AUTH_MFA_METHOD_ICONS,
} as const;

export type AuthMfa = typeof authMfa;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isValidAuthMfaMethod(method: string): method is AuthMfaMethod {
  return Object.values(AUTH_MFA_METHODS).includes(method as AuthMfaMethod);
}

export function isValidAuthMfaStatus(status: string): status is AuthMfaStatus {
  return Object.values(AUTH_MFA_STATUS).includes(status as AuthMfaStatus);
}

export function getAuthMfaMethodLabel(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_LABELS[method] || 'Unknown Method';
}

export function getAuthMfaMethodDescription(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_DESCRIPTIONS[method] || 'No description available';
}

export function getAuthMfaMethodSecurityLevel(method: AuthMfaMethod): number {
  return AUTH_MFA_METHOD_SECURITY_LEVELS[method] || 0;
}

export function isRecommendedAuthMfaMethod(method: AuthMfaMethod): boolean {
  return RECOMMENDED_AUTH_MFA_METHODS.includes(method);
}

export function getAuthMfaMethodIcon(method: AuthMfaMethod): string {
  return AUTH_MFA_METHOD_ICONS[method] || 'security';
}

export function getHttpStatusForAuthMfaStatus(status: AuthMfaStatus): number {
  return AUTH_MFA_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

export function getAuthMfaStatusMessage(status: AuthMfaStatus): string {
  return AUTH_MFA_STATUS_MESSAGES[status] || 'Unknown MFA status';
}

export function isAuthTotpCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.TOTP_CODE_EXPIRY;
}

export function isAuthSmsCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.SMS_CODE_EXPIRY;
}

export function isAuthEmailCodeValid(code: string, createdAt: Date): boolean {
  if (!/^[0-9]{6}$/.test(code)) {
    return false;
  }
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age <= AUTH_MFA_CONFIG.EMAIL_CODE_EXPIRY;
}

export function generateAuthMfaSessionId(): string {
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
