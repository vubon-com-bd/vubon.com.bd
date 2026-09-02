/**
 * Auth MFA Configuration
 * প্রমীকরণ MFA কনফিগারেশন
 */

import { AUTH_MFA } from '@vubon/shared-constants';

export interface AuthMfaConfig {
  enabled: boolean;
  methods: string[];
  totp: {
    interval: number;
    digits: number;
    algorithm: string;
  };
  backupCodes: {
    count: number;
    length: number;
  };
  maxAttempts: number;
  lockoutDuration: number;
  recoveryCodeExpiry: number;
}

export const createAuthMfaConfig = (): AuthMfaConfig => ({
  enabled: true,
  methods: ['totp', 'backup_code', 'sms', 'email'],
  totp: {
    interval: AUTH_MFA.DEFAULTS.TOTP_INTERVAL,
    digits: AUTH_MFA.DEFAULTS.TOTP_DIGITS,
    algorithm: AUTH_MFA.DEFAULTS.TOTP_ALGORITHM,
  },
  backupCodes: {
    count: AUTH_MFA.DEFAULTS.BACKUP_CODE_COUNT,
    length: AUTH_MFA.DEFAULTS.BACKUP_CODE_LENGTH,
  },
  maxAttempts: AUTH_MFA.DEFAULTS.MAX_ATTEMPTS,
  lockoutDuration: AUTH_MFA.DEFAULTS.LOCKOUT_DURATION,
  recoveryCodeExpiry: AUTH_MFA.DEFAULTS.RECOVERY_CODE_EXPIRY,
});
