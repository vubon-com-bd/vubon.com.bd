/**
 * Auth Account Lock Configuration
 * প্রমীকরণ অ্যাকাউন্ট লক কনফিগারেশন
 */

import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

export interface AuthAccountLockConfig {
  enabled: boolean;
  maxAttempts: number;
  lockoutDuration: number;
  windowSize: number;
  blockDuration: number;
  cleanupInterval: number;
  lockReasons: {
    tooManyAttempts: boolean;
    suspiciousActivity: boolean;
    unusualLocation: boolean;
    unusualDevice: boolean;
    unusualTime: boolean;
    adminBlocked: boolean;
  };
}

export const createAuthAccountLockConfig = (): AuthAccountLockConfig => ({
  enabled: true,
  maxAttempts: AUTH_LOGIN_ATTEMPT.DEFAULTS.MAX_ATTEMPTS,
  lockoutDuration: AUTH_LOGIN_ATTEMPT.DEFAULTS.LOCKOUT_DURATION,
  windowSize: AUTH_LOGIN_ATTEMPT.DEFAULTS.WINDOW_SIZE,
  blockDuration: AUTH_LOGIN_ATTEMPT.DEFAULTS.BLOCK_DURATION,
  cleanupInterval: AUTH_LOGIN_ATTEMPT.DEFAULTS.CLEANUP_INTERVAL,
  lockReasons: {
    tooManyAttempts: true,
    suspiciousActivity: true,
    unusualLocation: true,
    unusualDevice: true,
    unusualTime: true,
    adminBlocked: true,
  },
});
