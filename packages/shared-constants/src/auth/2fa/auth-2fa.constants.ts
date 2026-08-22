/**
 * Authentication 2FA Constants
 * Two-Factor Authentication configuration
 */

import { AUTH_2FA_STATUS } from './auth-2fa-status.constants';

// Define TYPES first
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

// Define CONFIG
export const AUTH_2FA_CONFIG = {
  // TOTP configuration
  TOTP: {
    ALGORITHM: 'SHA1',
    DIGITS: 6,
    PERIOD: 30,
    WINDOW: 1,
    SECRET_LENGTH: 32,
    ISSUER: 'Vubon E-Commerce',
    APP_NAME: 'Vubon',
  },

  // SMS configuration
  SMS: {
    CODE_LENGTH: 6,
    EXPIRY_TIME: 300,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
    PROVIDER: 'twilio',
  },

  // Email configuration
  EMAIL: {
    CODE_LENGTH: 6,
    EXPIRY_TIME: 600,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 120,
  },

  // Authenticator configuration
  AUTHENTICATOR: {
    APP_NAME: 'Vubon',
    ISSUER: 'Vubon E-Commerce',
    ALGORITHM: 'SHA1',
    DIGITS: 6,
    PERIOD: 30,
  },

  // Backup code configuration
  BACKUP_CODE: {
    CODE_LENGTH: 8,
    COUNT: 10,
    ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    EXPIRY_DAYS: 365,
  },

  // Recovery code configuration
  RECOVERY_CODE: {
    CODE_LENGTH: 12,
    COUNT: 5,
    ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    EXPIRY_DAYS: 730,
  },

  // Security configuration
  SECURITY: {
    MAX_VERIFICATION_ATTEMPTS: 5,
    LOCKOUT_DURATION: 3600,
    RATE_LIMIT_WINDOW: 900,
    MAX_RATE_LIMIT_ATTEMPTS: 10,
    REQUIRE_VERIFICATION: true,
    ALLOW_SKIP: false,
    SKIP_DURATION: 3600,
  },

  // Session configuration
  SESSION: {
    TRUST_DEVICE: true,
    TRUST_DURATION: 2592000,
    MAX_TRUSTED_DEVICES: 5,
    INACTIVITY_TIMEOUT: 1800,
  },

  // Default values
  DEFAULTS: {
    STATUS: AUTH_2FA_STATUS.DISABLED,
    TYPE: AUTH_2FA_TYPES.TOTP,
    VERIFIED: false,
    ENABLED: false,
  },
} as const;

// Define EVENTS
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

// Main AUTH_2FA object
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

export function get2FATypeLabel(type: Auth2FAType): string {
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

export function get2FATypeIcon(type: Auth2FAType): string {
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

export function get2FATypeSecurityLevel(
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

export function getTOTPConfig() {
  return AUTH_2FA_CONFIG.TOTP;
}

export function getSMSConfig() {
  return AUTH_2FA_CONFIG.SMS;
}

export function getEmailConfig() {
  return AUTH_2FA_CONFIG.EMAIL;
}

export function getAuthenticatorConfig() {
  return AUTH_2FA_CONFIG.AUTHENTICATOR;
}

export function getBackupCodeConfig() {
  return AUTH_2FA_CONFIG.BACKUP_CODE;
}

export function getRecoveryCodeConfig() {
  return AUTH_2FA_CONFIG.RECOVERY_CODE;
}

export function get2FACodeExpiry(type: Auth2FAType): number {
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

export function get2FAMaxAttempts(type: Auth2FAType): number {
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

export function get2FALockoutDuration(): number {
  return AUTH_2FA_CONFIG.SECURITY.LOCKOUT_DURATION;
}

export function get2FARateLimitWindow(): number {
  return AUTH_2FA_CONFIG.SECURITY.RATE_LIMIT_WINDOW;
}

export function get2FAMaxRateLimitAttempts(): number {
  return AUTH_2FA_CONFIG.SECURITY.MAX_RATE_LIMIT_ATTEMPTS;
}

export function get2FATrustDuration(): number {
  return AUTH_2FA_CONFIG.SESSION.TRUST_DURATION;
}

export function get2FAMaxTrustedDevices(): number {
  return AUTH_2FA_CONFIG.SESSION.MAX_TRUSTED_DEVICES;
}

export function generate2FACode(length: number = 6): string {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}

export function generateBackupCodes(count: number = 10, length: number = 8): string[] {
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

export function generateRecoveryCodes(count: number = 5, length: number = 12): string[] {
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

export function is2FACodeValid(code: string, type: Auth2FAType): boolean {
  const expectedLength =
    type === AUTH_2FA_TYPES.BACKUP_CODE
      ? AUTH_2FA_CONFIG.BACKUP_CODE.CODE_LENGTH
      : type === AUTH_2FA_TYPES.RECOVERY_CODE
        ? AUTH_2FA_CONFIG.RECOVERY_CODE.CODE_LENGTH
        : 6;

  return code.length === expectedLength && /^\d+$/.test(code);
}

export function is2FACodeExpired(createdAt: Date, expiry: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > expiry;
}

export function get2FACodeRemainingTime(createdAt: Date, expiry: number): number {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return Math.max(0, expiry - age);
}
