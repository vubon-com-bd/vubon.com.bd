/**
 * Multi-Factor Authentication Constants
 * Core MFA configuration and management
 */

import { AUTH_MFA_TYPE } from './auth-mfa-type.constants';
import { AUTH_MFA_STATUS } from './auth-mfa-status.constants';

export const AUTH_MFA_LEVEL = {
  NONE: 0,
  BASIC: 1,
  STANDARD: 2,
  ENHANCED: 3,
  HIGH: 4,
  MAXIMUM: 5,
} as const;

export const AUTH_MFA = {
  CONFIG: {
    TOTP: {
      ALGORITHM: 'SHA1',
      DIGITS: 6,
      PERIOD: 30,
      WINDOW: 1,
      SECRET_LENGTH: 32,
      ISSUER: 'Vubon E-Commerce',
      APP_NAME: 'Vubon',
    },
    SMS: {
      CODE_LENGTH: 6,
      EXPIRY_TIME: 300,
      MAX_ATTEMPTS: 3,
      RESEND_COOLDOWN: 60,
    },
    EMAIL: {
      CODE_LENGTH: 6,
      EXPIRY_TIME: 600,
      MAX_ATTEMPTS: 3,
      RESEND_COOLDOWN: 120,
    },
    BACKUP_CODE: {
      CODE_LENGTH: 8,
      COUNT: 10,
      ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      EXPIRY_DAYS: 365,
    },
    BIOMETRIC: {
      MAX_DEVICES: 5,
      SESSION_TIMEOUT: 300,
      REAUTHENTICATION_INTERVAL: 3600,
    },
  },

  METHODS: {
    TOTP: 'totp',
    SMS: 'sms',
    EMAIL: 'email',
    BACKUP_CODE: 'backup_code',
    BIOMETRIC: 'biometric',
    PUSH_NOTIFICATION: 'push_notification',
    HARDWARE_TOKEN: 'hardware_token',
    RECOVERY_CODE: 'recovery_code',
  },

  LEVELS: AUTH_MFA_LEVEL,

  EVENTS: {
    ENABLED: 'mfa:enabled',
    DISABLED: 'mfa:disabled',
    VERIFIED: 'mfa:verified',
    FAILED: 'mfa:failed',
    RESET: 'mfa:reset',
    RECOVERED: 'mfa:recovered',
    BACKUP_CODES_GENERATED: 'mfa:backup-codes-generated',
    BACKUP_CODE_USED: 'mfa:backup-code-used',
    DEVICE_REGISTERED: 'mfa:device-registered',
    DEVICE_REMOVED: 'mfa:device-removed',
  },

  DEFAULTS: {
    TYPE: AUTH_MFA_TYPE.TOTP,
    STATUS: AUTH_MFA_STATUS.DISABLED,
    LEVEL: AUTH_MFA_LEVEL.NONE,
    REQUIRE_MFA: false,
  },
} as const;

export type AuthMFAConfig = typeof AUTH_MFA.CONFIG;
export type AuthMFAMethod = (typeof AUTH_MFA.METHODS)[keyof typeof AUTH_MFA.METHODS];
export type AuthMFALevel = (typeof AUTH_MFA_LEVEL)[keyof typeof AUTH_MFA_LEVEL];
export type AuthMFAEvent = (typeof AUTH_MFA.EVENTS)[keyof typeof AUTH_MFA.EVENTS];
export type AuthMFADefaults = typeof AUTH_MFA.DEFAULTS;

export const AUTHMFA_METHODS_LIST: AuthMFAMethod[] = [
  AUTH_MFA.METHODS.TOTP,
  AUTH_MFA.METHODS.SMS,
  AUTH_MFA.METHODS.EMAIL,
  AUTH_MFA.METHODS.BACKUP_CODE,
  AUTH_MFA.METHODS.BIOMETRIC,
  AUTH_MFA.METHODS.PUSH_NOTIFICATION,
  AUTH_MFA.METHODS.HARDWARE_TOKEN,
  AUTH_MFA.METHODS.RECOVERY_CODE,
];

export const AUTHMFA_REQUIRED_METHODS: AuthMFAMethod[] = [
  AUTH_MFA.METHODS.TOTP,
  AUTH_MFA.METHODS.BACKUP_CODE,
];

export const AUTHMFA_OPTIONAL_METHODS: AuthMFAMethod[] = [
  AUTH_MFA.METHODS.SMS,
  AUTH_MFA.METHODS.EMAIL,
  AUTH_MFA.METHODS.BIOMETRIC,
  AUTH_MFA.METHODS.PUSH_NOTIFICATION,
  AUTH_MFA.METHODS.HARDWARE_TOKEN,
  AUTH_MFA.METHODS.RECOVERY_CODE,
];

export function isAuthmfaMethod(method: string): method is AuthMFAMethod {
  return AUTHMFA_METHODS_LIST.includes(method as AuthMFAMethod);
}

export function isAuthmfaRequiredMethod(method: AuthMFAMethod): boolean {
  return AUTHMFA_REQUIRED_METHODS.includes(method);
}

export function isAuthmfaOptionalMethod(method: AuthMFAMethod): boolean {
  return AUTHMFA_OPTIONAL_METHODS.includes(method);
}

export function getAuthmfaMethodLabel(method: AuthMFAMethod): string {
  const labels: Record<AuthMFAMethod, string> = {
    [AUTH_MFA.METHODS.TOTP]: 'Authenticator App (TOTP)',
    [AUTH_MFA.METHODS.SMS]: 'SMS Verification',
    [AUTH_MFA.METHODS.EMAIL]: 'Email Verification',
    [AUTH_MFA.METHODS.BACKUP_CODE]: 'Backup Codes',
    [AUTH_MFA.METHODS.BIOMETRIC]: 'Biometric Authentication',
    [AUTH_MFA.METHODS.PUSH_NOTIFICATION]: 'Push Notification',
    [AUTH_MFA.METHODS.HARDWARE_TOKEN]: 'Hardware Token',
    [AUTH_MFA.METHODS.RECOVERY_CODE]: 'Recovery Code',
  };

  return labels[method] || 'Unknown Method';
}

export function getAuthmfaMethodSecurityLevel(method: AuthMFAMethod): AuthMFALevel {
  const levels: Record<AuthMFAMethod, AuthMFALevel> = {
    [AUTH_MFA.METHODS.TOTP]: AUTH_MFA_LEVEL.HIGH,
    [AUTH_MFA.METHODS.SMS]: AUTH_MFA_LEVEL.STANDARD,
    [AUTH_MFA.METHODS.EMAIL]: AUTH_MFA_LEVEL.BASIC,
    [AUTH_MFA.METHODS.BACKUP_CODE]: AUTH_MFA_LEVEL.HIGH,
    [AUTH_MFA.METHODS.BIOMETRIC]: AUTH_MFA_LEVEL.ENHANCED,
    [AUTH_MFA.METHODS.PUSH_NOTIFICATION]: AUTH_MFA_LEVEL.STANDARD,
    [AUTH_MFA.METHODS.HARDWARE_TOKEN]: AUTH_MFA_LEVEL.MAXIMUM,
    [AUTH_MFA.METHODS.RECOVERY_CODE]: AUTH_MFA_LEVEL.HIGH,
  };

  return levels[method] || AUTH_MFA_LEVEL.NONE;
}

export function getAuthmfaLevelLabel(level: AuthMFALevel): string {
  const labels: Record<AuthMFALevel, string> = {
    [AUTH_MFA_LEVEL.NONE]: 'None',
    [AUTH_MFA_LEVEL.BASIC]: 'Basic',
    [AUTH_MFA_LEVEL.STANDARD]: 'Standard',
    [AUTH_MFA_LEVEL.ENHANCED]: 'Enhanced',
    [AUTH_MFA_LEVEL.HIGH]: 'High',
    [AUTH_MFA_LEVEL.MAXIMUM]: 'Maximum',
  };

  return labels[level] || 'Unknown';
}

export function getAuthmfaMethodIcon(method: AuthMFAMethod): string {
  const icons: Record<AuthMFAMethod, string> = {
    [AUTH_MFA.METHODS.TOTP]: '📱',
    [AUTH_MFA.METHODS.SMS]: '📲',
    [AUTH_MFA.METHODS.EMAIL]: '✉️',
    [AUTH_MFA.METHODS.BACKUP_CODE]: '🔑',
    [AUTH_MFA.METHODS.BIOMETRIC]: '👆',
    [AUTH_MFA.METHODS.PUSH_NOTIFICATION]: '🔔',
    [AUTH_MFA.METHODS.HARDWARE_TOKEN]: '🛡️',
    [AUTH_MFA.METHODS.RECOVERY_CODE]: '🔐',
  };

  return icons[method] || '🔒';
}

export function getAuthmfaTOTPConfig() {
  return AUTH_MFA.CONFIG.TOTP;
}

export function getAuthmfaSMSConfig() {
  return AUTH_MFA.CONFIG.SMS;
}

export function getAuthmfaEmailConfig() {
  return AUTH_MFA.CONFIG.EMAIL;
}

export function getAuthmfaBackupCodeConfig() {
  return AUTH_MFA.CONFIG.BACKUP_CODE;
}

export function getAuthmfaBiometricConfig() {
  return AUTH_MFA.CONFIG.BIOMETRIC;
}

export function getAuthmfaBackupCodesCount(): number {
  return AUTH_MFA.CONFIG.BACKUP_CODE.COUNT;
}

export function getAuthmfaBackupCodeLength(): number {
  return AUTH_MFA.CONFIG.BACKUP_CODE.CODE_LENGTH;
}

export function getAuthmfaTOTPPeriod(): number {
  return AUTH_MFA.CONFIG.TOTP.PERIOD;
}

export function getAuthmfaTOTPDigits(): number {
  return AUTH_MFA.CONFIG.TOTP.DIGITS;
}

export function getAuthmfaTOTPWindow(): number {
  return AUTH_MFA.CONFIG.TOTP.WINDOW;
}

export function getAuthmfaCodeExpiry(method: AuthMFAMethod): number {
  const expiryMap: Record<AuthMFAMethod, number> = {
    [AUTH_MFA.METHODS.TOTP]: AUTH_MFA.CONFIG.TOTP.PERIOD,
    [AUTH_MFA.METHODS.SMS]: AUTH_MFA.CONFIG.SMS.EXPIRY_TIME,
    [AUTH_MFA.METHODS.EMAIL]: AUTH_MFA.CONFIG.EMAIL.EXPIRY_TIME,
    [AUTH_MFA.METHODS.BACKUP_CODE]: AUTH_MFA.CONFIG.BACKUP_CODE.EXPIRY_DAYS * 86400,
    [AUTH_MFA.METHODS.BIOMETRIC]: AUTH_MFA.CONFIG.BIOMETRIC.SESSION_TIMEOUT,
    [AUTH_MFA.METHODS.PUSH_NOTIFICATION]: 300,
    [AUTH_MFA.METHODS.HARDWARE_TOKEN]: 300,
    [AUTH_MFA.METHODS.RECOVERY_CODE]: 86400,
  };

  return expiryMap[method] || 300;
}

export function getAuthmfaMaxAttempts(method: AuthMFAMethod): number {
  const attemptsMap: Record<AuthMFAMethod, number> = {
    [AUTH_MFA.METHODS.TOTP]: 5,
    [AUTH_MFA.METHODS.SMS]: AUTH_MFA.CONFIG.SMS.MAX_ATTEMPTS,
    [AUTH_MFA.METHODS.EMAIL]: AUTH_MFA.CONFIG.EMAIL.MAX_ATTEMPTS,
    [AUTH_MFA.METHODS.BACKUP_CODE]: 10,
    [AUTH_MFA.METHODS.BIOMETRIC]: 3,
    [AUTH_MFA.METHODS.PUSH_NOTIFICATION]: 5,
    [AUTH_MFA.METHODS.HARDWARE_TOKEN]: 3,
    [AUTH_MFA.METHODS.RECOVERY_CODE]: 3,
  };

  return attemptsMap[method] || 3;
}
