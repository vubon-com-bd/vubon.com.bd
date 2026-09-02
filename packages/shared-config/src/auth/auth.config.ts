/**
 * Auth Configuration
 * প্রমীকরণ কনফিগারেশন
 */

import { AUTH } from '@vubon/shared-constants';

export interface AuthConfig {
  enabled: boolean;
  defaultProvider: string;
  sessionTimeout: number;
  refreshTokenExpiry: number;
  verificationExpiry: number;
  passwordResetExpiry: number;
  mfaCodeExpiry: number;
  loginAttemptLimit: number;
  lockoutDuration: number;
  maxSessions: number;
}

export const createAuthConfig = (): AuthConfig => ({
  enabled: true,
  defaultProvider: 'email_password',
  sessionTimeout: AUTH.DEFAULTS.SESSION_TIMEOUT,
  refreshTokenExpiry: AUTH.DEFAULTS.REFRESH_TOKEN_EXPIRY,
  verificationExpiry: AUTH.DEFAULTS.VERIFICATION_EXPIRY,
  passwordResetExpiry: AUTH.DEFAULTS.PASSWORD_RESET_EXPIRY,
  mfaCodeExpiry: AUTH.DEFAULTS.MFA_CODE_EXPIRY,
  loginAttemptLimit: AUTH.DEFAULTS.LOGIN_ATTEMPT_LIMIT,
  lockoutDuration: AUTH.DEFAULTS.LOCKOUT_DURATION,
  maxSessions: 5,
});
