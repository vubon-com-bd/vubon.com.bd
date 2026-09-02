/**
 * Auth Login Attempt Configuration
 * প্রমীকরণ লগইন Attempt কনফিগারেশন
 */

import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

export interface AuthLoginAttemptConfig {
  enabled: boolean;
  maxAttempts: number;
  windowSize: number;
  lockoutDuration: number;
  blockDuration: number;
  trackIP: boolean;
  trackUserAgent: boolean;
  trackLocation: boolean;
  cleanupInterval: number;
}

export const createAuthLoginAttemptConfig = (): AuthLoginAttemptConfig => ({
  enabled: true,
  maxAttempts: AUTH_LOGIN_ATTEMPT.DEFAULTS.MAX_ATTEMPTS,
  windowSize: AUTH_LOGIN_ATTEMPT.DEFAULTS.WINDOW_SIZE,
  lockoutDuration: AUTH_LOGIN_ATTEMPT.DEFAULTS.LOCKOUT_DURATION,
  blockDuration: AUTH_LOGIN_ATTEMPT.DEFAULTS.BLOCK_DURATION,
  trackIP: true,
  trackUserAgent: true,
  trackLocation: false,
  cleanupInterval: AUTH_LOGIN_ATTEMPT.DEFAULTS.CLEANUP_INTERVAL,
});
