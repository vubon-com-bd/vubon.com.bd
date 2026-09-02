/**
 * Auth Account Lock Validator
 * প্রমীকরণ অ্যাকাউন্ট লক ভ্যালিডেটর
 */

export const AuthAccountLockValidator = {
  /**
   * Check if account is locked
   * অ্যাকাউন্ট লকড কিনা চেক করা
   */
  isLocked: (account: {
    locked: boolean;
    lockDuration: number;
    lockedAt?: Date;
  }): { locked: boolean; remainingTime?: number } => {
    if (!account.locked) {
      return { locked: false };
    }

    if (!account.lockedAt) {
      return { locked: true };
    }

    const now = new Date();
    const elapsed = (now.getTime() - account.lockedAt.getTime()) / 1000;
    const remaining = account.lockDuration - elapsed;

    if (remaining <= 0) {
      return { locked: false };
    }

    return {
      locked: true,
      remainingTime: Math.ceil(remaining),
    };
  },

  /**
   * Calculate lock duration
   * লক ডিউরেশন ক্যালকুলেট করা
   */
  calculateLockDuration: (
    attempts: number,
    baseDuration: number = 60,
    maxDuration: number = 3600
  ): number => {
    // Exponential backoff: 1min, 2min, 4min, 8min, 16min, 32min, 1hour max
    const duration = Math.min(baseDuration * Math.pow(2, attempts - 1), maxDuration);
    return duration;
  },

  /**
   * Calculate remaining attempts
   * বাকি Attempts ক্যালকুলেট করা
   */
  remainingAttempts: (attempts: number, maxAttempts: number): number => {
    return Math.max(0, maxAttempts - attempts);
  },

  /**
   * Check if account should be locked
   * অ্যাকাউন্ট লক করা উচিত কিনা চেক করা
   */
  shouldLock: (attempts: number, maxAttempts: number): boolean => {
    return attempts >= maxAttempts;
  },

  /**
   * Check if account can be unlocked
   * অ্যাকাউন্ট আনলক করা যাবে কিনা চেক করা
   */
  canUnlock: (account: {
    locked: boolean;
    lockedAt?: Date;
    lockDuration: number;
  }): { canUnlock: boolean; remainingTime?: number } => {
    if (!account.locked) {
      return { canUnlock: true };
    }

    if (!account.lockedAt) {
      return { canUnlock: false };
    }

    const now = new Date();
    const elapsed = (now.getTime() - account.lockedAt.getTime()) / 1000;
    const remaining = account.lockDuration - elapsed;

    if (remaining <= 0) {
      return { canUnlock: true };
    }

    return {
      canUnlock: false,
      remainingTime: Math.ceil(remaining),
    };
  },

  /**
   * Format lock duration
   * লক ডিউরেশন ফরম্যাট করা
   */
  formatLockDuration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  },
};
