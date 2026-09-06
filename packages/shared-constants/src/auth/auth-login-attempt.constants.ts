/**
 * Auth Login Attempt Constants (EXTENDS common/status)
 * @module shared-constants/auth/auth-login-attempt.constants
 */

import { STATUS } from '../common/status.constants';

export const AUTH_LOGIN_ATTEMPT = {
  // Base status from common
  ...STATUS,

  // Login attempt status
  ATTEMPT_STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    BLOCKED: 'blocked',
    LOCKED: 'locked',
    EXPIRED: 'expired',
    SUSPENDED: 'suspended',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
  } as const,

  // Login attempt limits
  LIMITS: {
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 900, // 15 minutes
    RESET_AFTER_SECONDS: 3600, // 1 hour
    MAX_ATTEMPTS_PER_IP: 50,
    MAX_ATTEMPTS_PER_USER: 10,
    MAX_ATTEMPTS_PER_DEVICE: 20,
  },

  // Login attempt tracking
  TRACKING: {
    TRACK_IP: true,
    TRACK_DEVICE: true,
    TRACK_LOCATION: true,
    TRACK_USER_AGENT: true,
    TRACK_REFERRER: true,
    MAX_HISTORY: 100,
  },

  // Login attempt security
  SECURITY: {
    BLOCK_SUSPICIOUS_IPS: true,
    BLOCK_SUSPICIOUS_DEVICES: true,
    BLOCK_SUSPICIOUS_LOCATIONS: true,
    NOTIFY_ON_SUSPICIOUS: true,
    CAPTCHA_AFTER_ATTEMPTS: 3,
  },

  // Login attempt cooldown
  COOLDOWN: {
    INITIAL_SECONDS: 5,
    MAX_SECONDS: 300,
    MULTIPLIER: 2,
  },
} as const;

export type LoginAttemptStatus =
  (typeof AUTH_LOGIN_ATTEMPT.ATTEMPT_STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT.ATTEMPT_STATUS];
