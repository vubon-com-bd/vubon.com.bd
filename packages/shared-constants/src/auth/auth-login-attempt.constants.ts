/**
 * Auth Login Attempt Constants
 * প্রমাণীকরণ লগইন প্রচেষ্টা সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_LOGIN_ATTEMPT = {
  // Attempt status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    BLOCKED: 'blocked',
    LOCKED: 'locked',
    SUSPICIOUS: 'suspicious',
    RATE_LIMITED: 'rate_limited',
    INVALID_CREDENTIALS: 'invalid_credentials',
    INVALID_OTP: 'invalid_otp',
    INVALID_MFA: 'invalid_mfa',
    ACCOUNT_LOCKED: 'account_locked',
    ACCOUNT_SUSPENDED: 'account_suspended',
  },

  // Block reasons
  BLOCK_REASONS: {
    TOO_MANY_ATTEMPTS: 'too_many_attempts',
    SUSPICIOUS_ACTIVITY: 'suspicious_activity',
    UNUSUAL_LOCATION: 'unusual_location',
    UNUSUAL_DEVICE: 'unusual_device',
    UNUSUAL_TIME: 'unusual_time',
    BLACKLISTED_IP: 'blacklisted_ip',
    BLACKLISTED_DEVICE: 'blacklisted_device',
    BLACKLISTED_USER: 'blacklisted_user',
    ADMIN_BLOCKED: 'admin_blocked',
    SYSTEM_BLOCKED: 'system_blocked',
  },

  // Default values
  DEFAULTS: {
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 900, // 15 minutes
    WINDOW_SIZE: 3600, // 1 hour
    BLOCK_DURATION: 86400, // 24 hours
    CLEANUP_INTERVAL: 604800, // 7 days
  },
} as const;

export type AuthLoginAttemptStatus =
  (typeof AUTH_LOGIN_ATTEMPT.STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT.STATUS];
export type AuthBlockReason =
  (typeof AUTH_LOGIN_ATTEMPT.BLOCK_REASONS)[keyof typeof AUTH_LOGIN_ATTEMPT.BLOCK_REASONS];
