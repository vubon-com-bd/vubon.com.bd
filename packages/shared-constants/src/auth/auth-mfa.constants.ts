/**
 * Auth MFA Constants (EXTENDS common/types)
 * @module shared-constants/auth/auth-mfa.constants
 */

import { TYPES } from '../common/types.constants';

export const AUTH_MFA = {
  // Base types
  ...TYPES,

  // MFA methods
  METHODS: {
    TOTP: 'totp',
    HOTP: 'hotp',
    SMS: 'sms',
    EMAIL: 'email',
    PUSH: 'push',
    BIOMETRIC: 'biometric',
    BACKUP_CODE: 'backup_code',
    RECOVERY_CODE: 'recovery_code',
    SECURITY_KEY: 'security_key',
    AUTHENTICATOR: 'authenticator',
  } as const,

  // MFA status
  STATUS: {
    DISABLED: 'disabled',
    ENABLED: 'enabled',
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  } as const,

  // MFA settings
  SETTINGS: {
    DEFAULT_METHOD: 'totp',
    CODE_LENGTH: 6,
    CODE_EXPIRY_SECONDS: 120,
    MAX_ATTEMPTS: 5,
    BACKUP_CODES_COUNT: 10,
    RECOVERY_CODES_COUNT: 5,
    TOTP_PERIOD: 30,
    TOTP_DIGITS: 6,
    HOTP_COUNTER: 0,
  },

  // MFA verification
  VERIFICATION: {
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 300, // 5 minutes
    VERIFICATION_TIMEOUT: 120, // 2 minutes
    RESEND_COOLDOWN: 30, // 30 seconds
  },

  // Backup codes
  BACKUP_CODES: {
    LENGTH: 8,
    COUNT: 10,
    EXPIRY_DAYS: 0, // never expires
    ALLOWED_REUSE: false,
    MAX_REUSE_COUNT: 0,
  },

  // Recovery codes
  RECOVERY_CODES: {
    LENGTH: 10,
    COUNT: 5,
    EXPIRY_DAYS: 365,
    ALLOWED_REUSE: false,
    MAX_REUSE_COUNT: 1,
  },
} as const;

export type MfaMethod = (typeof AUTH_MFA.METHODS)[keyof typeof AUTH_MFA.METHODS];
export type MfaStatus = (typeof AUTH_MFA.STATUS)[keyof typeof AUTH_MFA.STATUS];
