/**
 * Auth Login Attempt Tracker
 * প্রমীকরণ লগইন Attempt ট্র্যাকার
 */

import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

// In-memory storage for tracking (will be replaced with Redis in production)
const memoryStore: Record<string, { attempts: number; blockedAt?: number }> = {};

export const AuthLoginAttemptTracker = {
  /**
   * Track a login attempt
   * লগইন Attempt ট্র্যাক করা
   */
  track: (attempt: {
    userId?: string;
    email?: string;
    phone?: string;
    ipAddress: string;
    userAgent?: string;
    success: boolean;
  }): {
    status: string;
    blockReason?: string;
    remainingAttempts: number;
  } => {
    // In real implementation, this would store in database
    // This is a simplified version with in-memory storage
    const attempts = AuthLoginAttemptTracker.getAttempts(attempt.ipAddress);
    const maxAttempts = AUTH_LOGIN_ATTEMPT.DEFAULTS.MAX_ATTEMPTS;
    const remaining = maxAttempts - attempts;

    if (attempt.success) {
      AuthLoginAttemptTracker.resetAttempts(attempt.ipAddress);
      return {
        status: AUTH_LOGIN_ATTEMPT.STATUS.SUCCESS,
        remainingAttempts: maxAttempts,
      };
    }

    if (remaining <= 0) {
      AuthLoginAttemptTracker.blockIP(attempt.ipAddress);
      return {
        status: AUTH_LOGIN_ATTEMPT.STATUS.BLOCKED,
        blockReason: AUTH_LOGIN_ATTEMPT.BLOCK_REASONS.TOO_MANY_ATTEMPTS,
        remainingAttempts: 0,
      };
    }

    AuthLoginAttemptTracker.incrementAttempts(attempt.ipAddress);
    return {
      status: AUTH_LOGIN_ATTEMPT.STATUS.FAILED,
      remainingAttempts: remaining - 1,
    };
  },

  /**
   * Get attempts for an IP
   * IP এর জন্য Attempts পাওয়া
   */
  getAttempts: (ipAddress: string): number => {
    const key = `login_attempts_${ipAddress}`;
    return memoryStore[key]?.attempts || 0;
  },

  /**
   * Increment attempts for an IP
   * IP এর জন্য Attempts বৃদ্ধি করা
   */
  incrementAttempts: (ipAddress: string): void => {
    const key = `login_attempts_${ipAddress}`;
    if (!memoryStore[key]) {
      memoryStore[key] = { attempts: 0 };
    }
    memoryStore[key].attempts += 1;
  },

  /**
   * Reset attempts for an IP
   * IP এর জন্য Attempts রিসেট করা
   */
  resetAttempts: (ipAddress: string): void => {
    const key = `login_attempts_${ipAddress}`;
    delete memoryStore[key];
  },

  /**
   * Block an IP
   * IP ব্লক করা
   */
  blockIP: (ipAddress: string): void => {
    const key = `blocked_ip_${ipAddress}`;
    if (!memoryStore[key]) {
      memoryStore[key] = { attempts: 0 };
    }
    memoryStore[key].blockedAt = Date.now();
  },

  /**
   * Check if IP is blocked
   * IP ব্লকড কিনা চেক করা
   */
  isBlocked: (ipAddress: string): { blocked: boolean; remainingTime?: number } => {
    const key = `blocked_ip_${ipAddress}`;
    const data = memoryStore[key];

    if (!data || !data.blockedAt) {
      return { blocked: false };
    }

    const now = Date.now();
    const elapsed = (now - data.blockedAt) / 1000;
    const blockDuration = AUTH_LOGIN_ATTEMPT.DEFAULTS.BLOCK_DURATION;

    if (elapsed >= blockDuration) {
      delete memoryStore[key];
      return { blocked: false };
    }

    return {
      blocked: true,
      remainingTime: Math.ceil(blockDuration - elapsed),
    };
  },

  /**
   * Get attempt status
   * Attempt স্ট্যাটাস পাওয়া
   */
  getStatus: (attempt: { success: boolean; status?: string }): string => {
    if (attempt.success) return AUTH_LOGIN_ATTEMPT.STATUS.SUCCESS;
    return attempt.status || AUTH_LOGIN_ATTEMPT.STATUS.FAILED;
  },

  /**
   * Cleanup expired entries (should be called periodically)
   * মেয়াদোত্তীর্ণ এন্ট্রি পরিষ্কার করা (পর্যায়ক্রমে কল করা উচিত)
   */
  cleanup: (): void => {
    const now = Date.now();
    const blockDuration = AUTH_LOGIN_ATTEMPT.DEFAULTS.BLOCK_DURATION * 1000;

    for (const key of Object.keys(memoryStore)) {
      const data = memoryStore[key];
      if (data.blockedAt && now - data.blockedAt > blockDuration) {
        delete memoryStore[key];
      }
      // Clean up old attempt entries (no blockedAt and attempts = 0)
      if (!data.blockedAt && data.attempts === 0) {
        delete memoryStore[key];
      }
    }
  },
};
