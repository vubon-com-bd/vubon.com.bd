/**
 * Authentication 2FA Constants
 * Two-Factor Authentication configuration
 */

import { AUTH_2FA_STATUS } from './auth-2fa-status.constants';

export const AUTH_2FA_TYPES = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  AUTHENTICATOR: 'authenticator',
  BACKUP_CODE: 'backup_code',
  RECOVERY_CODE: 'recovery_code',
  BIOMETRIC: 'biometric',
  PUSH_NOTIFICATION: 'push_notification',
  HARDWARE_TOKEN: 'hardware_token',
  VOICE: 'voice',
  WHATSAPP: 'whatsapp',
} as const;

export const AUTH_2FA_CONFIG = {
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
    PROVIDER: 'twilio',
  },

  EMAIL: {
    CODE_LENGTH: 6,
    EXPIRY_TIME: 600,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 120,
  },

  AUTHENTICATOR: {
    APP_NAME: 'Vubon',
    ISSUER: 'Vubon E-Commerce',
    ALGORITHM: 'SHA1',
    DIGITS: 6,
    PERIOD: 30,
  },

  BACKUP_CODE: {
    CODE_LENGTH: 8,
    COUNT: 10,
    ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    EXPIRY_DAYS: 365,
  },

  RECOVERY_CODE: {
    CODE_LENGTH: 12,
    COUNT: 5,
    ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    EXPIRY_DAYS: 730,
  },

  SECURITY: {
    MAX_VERIFICATION_ATTEMPTS: 5,
    LOCKOUT_DURATION: 3600,
    RATE_LIMIT_WINDOW: 900,
    MAX_RATE_LIMIT_ATTEMPTS: 10,
    REQUIRE_VERIFICATION: true,
    ALLOW_SKIP: false,
    SKIP_DURATION: 3600,
  },

  SESSION: {
    TRUST_DEVICE: true,
    TRUST_DURATION: 2592000,
    MAX_TRUSTED_DEVICES: 5,
    INACTIVITY_TIMEOUT: 1800,
  },

  DEFAULTS: {
    STATUS: AUTH_2FA_STATUS.DISABLED,
    TYPE: AUTH_2FA_TYPES.TOTP,
    VERIFIED: false,
    ENABLED: false,
  },
} as const;

export const AUTH_2FA_EVENTS = {
  ENABLED: '2fa:enabled',
  DISABLED: '2fa:disabled',
  VERIFIED: '2fa:verified',
  FAILED: '2fa:failed',
  ATTEMPT: '2fa:attempt',
  RESET: '2fa:reset',
  RECOVERED: '2fa:recovered',
  BACKUP_CODES_GENERATED: '2fa:backup_codes_generated',
  BACKUP_CODE_USED: '2fa:backup_code_used',
  RECOVERY_CODE_GENERATED: '2fa:recovery_code_generated',
  RECOVERY_CODE_USED: '2fa:recovery_code_used',
  DEVICE_TRUSTED: '2fa:device_trusted',
  DEVICE_UNTRUSTED: '2fa:device_untrusted',
  LOCKOUT: '2fa:lockout',
  UNLOCKED: '2fa:unlocked',
} as const;

export const AUTH_2FA = {
  CONFIG: AUTH_2FA_CONFIG,
  TYPES: AUTH_2FA_TYPES,
  EVENTS: AUTH_2FA_EVENTS,
  DEFAULTS: AUTH_2FA_CONFIG.DEFAULTS,
} as const;

export type Auth2FAConfig = typeof AUTH_2FA_CONFIG;
export type Auth2FAType = (typeof AUTH_2FA_TYPES)[keyof typeof AUTH_2FA_TYPES];
export type Auth2FAEvent = (typeof AUTH_2FA_EVENTS)[keyof typeof AUTH_2FA_EVENTS];
export type Auth2FADefaults = typeof AUTH_2FA_CONFIG.DEFAULTS;

export function getAuth2faTypeLabel(type: Auth2FAType): string {
  const labels: Record<Auth2FAType, string> = {
    [AUTH_2FA_TYPES.TOTP]: 'Authenticator App (TOTP)',
    [AUTH_2FA_TYPES.SMS]: 'SMS Verification',
    [AUTH_2FA_TYPES.EMAIL]: 'Email Verification',
    [AUTH_2FA_TYPES.AUTHENTICATOR]: 'Authenticator App',
    [AUTH_2FA_TYPES.BACKUP_CODE]: 'Backup Codes',
    [AUTH_2FA_TYPES.RECOVERY_CODE]: 'Recovery Codes',
    [AUTH_2FA_TYPES.BIOMETRIC]: 'Biometric Authentication',
    [AUTH_2FA_TYPES.PUSH_NOTIFICATION]: 'Push Notification',
    [AUTH_2FA_TYPES.HARDWARE_TOKEN]: 'Hardware Token',
    [AUTH_2FA_TYPES.VOICE]: 'Voice Call',
    [AUTH_2FA_TYPES.WHATSAPP]: 'WhatsApp',
  };

  return labels[type] || 'Unknown Type';
}

export function getAuth2faTypeIcon(type: Auth2FAType): string {
  const icons: Record<Auth2FAType, string> = {
    [AUTH_2FA_TYPES.TOTP]: '📱',
    [AUTH_2FA_TYPES.SMS]: '📲',
    [AUTH_2FA_TYPES.EMAIL]: '✉️',
    [AUTH_2FA_TYPES.AUTHENTICATOR]: '🔐',
    [AUTH_2FA_TYPES.BACKUP_CODE]: '🔑',
    [AUTH_2FA_TYPES.RECOVERY_CODE]: '🔄',
    [AUTH_2FA_TYPES.BIOMETRIC]: '👆',
    [AUTH_2FA_TYPES.PUSH_NOTIFICATION]: '🔔',
    [AUTH_2FA_TYPES.HARDWARE_TOKEN]: '🛡️',
    [AUTH_2FA_TYPES.VOICE]: '📞',
    [AUTH_2FA_TYPES.WHATSAPP]: '💬',
  };

  return icons[type] || '🔒';
}

export function getAuth2faTypeSecurityLevel(
  type: Auth2FAType
): 'low' | 'medium' | 'high' | 'very_high' {
  const levels: Record<Auth2FAType, 'low' | 'medium' | 'high' | 'very_high'> = {
    [AUTH_2FA_TYPES.TOTP]: 'high',
    [AUTH_2FA_TYPES.SMS]: 'medium',
    [AUTH_2FA_TYPES.EMAIL]: 'medium',
    [AUTH_2FA_TYPES.AUTHENTICATOR]: 'high',
    [AUTH_2FA_TYPES.BACKUP_CODE]: 'high',
    [AUTH_2FA_TYPES.RECOVERY_CODE]: 'high',
    [AUTH_2FA_TYPES.BIOMETRIC]: 'very_high',
    [AUTH_2FA_TYPES.PUSH_NOTIFICATION]: 'high',
    [AUTH_2FA_TYPES.HARDWARE_TOKEN]: 'very_high',
    [AUTH_2FA_TYPES.VOICE]: 'medium',
    [AUTH_2FA_TYPES.WHATSAPP]: 'medium',
  };

  return levels[type] || 'medium';
}

export function getAuth2faTOTPConfig() {
  return AUTH_2FA_CONFIG.TOTP;
}

export function getAuth2faSMSConfig() {
  return AUTH_2FA_CONFIG.SMS;
}

export function getAuth2faEmailConfig() {
  return AUTH_2FA_CONFIG.EMAIL;
}

export function getAuth2faAuthenticatorConfig() {
  return AUTH_2FA_CONFIG.AUTHENTICATOR;
}

export function getAuth2faBackupCodeConfig() {
  return AUTH_2FA_CONFIG.BACKUP_CODE;
}

export function getAuth2faRecoveryCodeConfig() {
  return AUTH_2FA_CONFIG.RECOVERY_CODE;
}

export function getAuth2faCodeExpiry(type: Auth2FAType): number {
  const expiryMap: Record<Auth2FAType, number> = {
    [AUTH_2FA_TYPES.TOTP]: AUTH_2FA_CONFIG.TOTP.PERIOD,
    [AUTH_2FA_TYPES.SMS]: AUTH_2FA_CONFIG.SMS.EXPIRY_TIME,
    [AUTH_2FA_TYPES.EMAIL]: AUTH_2FA_CONFIG.EMAIL.EXPIRY_TIME,
    [AUTH_2FA_TYPES.AUTHENTICATOR]: AUTH_2FA_CONFIG.AUTHENTICATOR.PERIOD,
    [AUTH_2FA_TYPES.BACKUP_CODE]: AUTH_2FA_CONFIG.BACKUP_CODE.EXPIRY_DAYS * 86400,
    [AUTH_2FA_TYPES.RECOVERY_CODE]: AUTH_2FA_CONFIG.RECOVERY_CODE.EXPIRY_DAYS * 86400,
    [AUTH_2FA_TYPES.BIOMETRIC]: 300,
    [AUTH_2FA_TYPES.PUSH_NOTIFICATION]: 300,
    [AUTH_2FA_TYPES.HARDWARE_TOKEN]: 300,
    [AUTH_2FA_TYPES.VOICE]: 300,
    [AUTH_2FA_TYPES.WHATSAPP]: 300,
  };

  return expiryMap[type] || 300;
}

export function getAuth2faMaxAttempts(type: Auth2FAType): number {
  const attemptsMap: Record<Auth2FAType, number> = {
    [AUTH_2FA_TYPES.TOTP]: AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS,
    [AUTH_2FA_TYPES.SMS]: AUTH_2FA_CONFIG.SMS.MAX_ATTEMPTS,
    [AUTH_2FA_TYPES.EMAIL]: AUTH_2FA_CONFIG.EMAIL.MAX_ATTEMPTS,
    [AUTH_2FA_TYPES.AUTHENTICATOR]: AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS,
    [AUTH_2FA_TYPES.BACKUP_CODE]: 10,
    [AUTH_2FA_TYPES.RECOVERY_CODE]: 5,
    [AUTH_2FA_TYPES.BIOMETRIC]: AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS,
    [AUTH_2FA_TYPES.PUSH_NOTIFICATION]: 5,
    [AUTH_2FA_TYPES.HARDWARE_TOKEN]: 3,
    [AUTH_2FA_TYPES.VOICE]: AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS,
    [AUTH_2FA_TYPES.WHATSAPP]: AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS,
  };

  return attemptsMap[type] || AUTH_2FA_CONFIG.SECURITY.MAX_VERIFICATION_ATTEMPTS;
}

export function getAuth2faLockoutDuration(): number {
  return AUTH_2FA_CONFIG.SECURITY.LOCKOUT_DURATION;
}

export function getAuth2faRateLimitWindow(): number {
  return AUTH_2FA_CONFIG.SECURITY.RATE_LIMIT_WINDOW;
}

export function getAuth2faMaxRateLimitAttempts(): number {
  return AUTH_2FA_CONFIG.SECURITY.MAX_RATE_LIMIT_ATTEMPTS;
}

export function getAuth2faTrustDuration(): number {
  return AUTH_2FA_CONFIG.SESSION.TRUST_DURATION;
}

export function getAuth2faMaxTrustedDevices(): number {
  return AUTH_2FA_CONFIG.SESSION.MAX_TRUSTED_DEVICES;
}

export function generateAuth2faCode(length: number = 6): string {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}

export function generateAuth2faBackupCodes(count: number = 10, length: number = 8): string[] {
  const alphabet = AUTH_2FA_CONFIG.BACKUP_CODE.ALPHABET;
  const codes: string[] = [];

  for (let i = 0; i < Math.min(count, AUTH_2FA_CONFIG.BACKUP_CODE.COUNT); i++) {
    let code = '';
    for (let j = 0; j < length; j++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    codes.push(code);
  }

  return codes;
}

export function generateAuth2faRecoveryCodes(count: number = 5, length: number = 12): string[] {
  const alphabet = AUTH_2FA_CONFIG.RECOVERY_CODE.ALPHABET;
  const codes: string[] = [];

  for (let i = 0; i < Math.min(count, AUTH_2FA_CONFIG.RECOVERY_CODE.COUNT); i++) {
    let code = '';
    for (let j = 0; j < length; j++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    codes.push(code);
  }

  return codes;
}

export function isAuth2faCodeValid(code: string, type: Auth2FAType): boolean {
  const expectedLength =
    type === AUTH_2FA_TYPES.BACKUP_CODE
      ? AUTH_2FA_CONFIG.BACKUP_CODE.CODE_LENGTH
      : type === AUTH_2FA_TYPES.RECOVERY_CODE
        ? AUTH_2FA_CONFIG.RECOVERY_CODE.CODE_LENGTH
        : 6;

  return code.length === expectedLength && /^\d+$/.test(code);
}

export function isAuth2faCodeExpired(createdAt: Date, expiry: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > expiry;
}

export function getAuth2faCodeRemainingTime(createdAt: Date, expiry: number): number {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return Math.max(0, expiry - age);
}
