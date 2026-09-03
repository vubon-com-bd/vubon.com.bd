/**
 * User Analytics Validator
 * ইউজার অ্যানালিটিক্স ভ্যালিডেটর
 */

import {
  UserAnalytics,
  UserAnalyticsCreateInput,
  UserAnalyticsUpdateInput,
} from '@vubon/shared-types';

export const UserAnalyticsValidator = {
  /**
   * Validate analytics data
   * অ্যানালিটিক্স ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserAnalytics>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.totalVisits !== undefined && data.totalVisits < 0) {
      errors.push('Total visits must be non-negative');
    }

    if (data.uniqueVisits !== undefined && data.uniqueVisits < 0) {
      errors.push('Unique visits must be non-negative');
    }

    if (data.pageViews !== undefined && data.pageViews < 0) {
      errors.push('Page views must be non-negative');
    }

    if (data.sessionDuration !== undefined && data.sessionDuration < 0) {
      errors.push('Session duration must be non-negative');
    }

    if (data.bounceRate !== undefined && (data.bounceRate < 0 || data.bounceRate > 100)) {
      errors.push('Bounce rate must be between 0 and 100');
    }

    if (data.devices) {
      for (const device of data.devices) {
        if (device.visits < 0) {
          errors.push('Device visits must be non-negative');
        }
        if (device.percentage < 0 || device.percentage > 100) {
          errors.push('Device percentage must be between 0 and 100');
        }
      }
    }

    if (data.locations) {
      for (const location of data.locations) {
        if (location.visits < 0) {
          errors.push('Location visits must be non-negative');
        }
        if (location.percentage < 0 || location.percentage > 100) {
          errors.push('Location percentage must be between 0 and 100');
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate analytics creation
   * অ্যানালিটিক্স তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserAnalyticsCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (data.totalVisits !== undefined && data.totalVisits < 0) {
      errors.push('Total visits must be non-negative');
    }

    if (data.bounceRate !== undefined && (data.bounceRate < 0 || data.bounceRate > 100)) {
      errors.push('Bounce rate must be between 0 and 100');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate analytics update
   * অ্যানালিটিক্স আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserAnalyticsUpdateInput): { valid: boolean; errors: string[] } => {
    return UserAnalyticsValidator.validate(data);
  },

  /**
   * Get default analytics
   * ডিফল্ট অ্যানালিটিক্স পাওয়া
   */
  getDefaults: (userId: string): UserAnalyticsCreateInput => {
    return {
      userId,
      totalVisits: 0,
      uniqueVisits: 0,
      pageViews: 0,
      sessionDuration: 0,
      bounceRate: 0,
      devices: [],
      locations: [],
      referrers: [],
    };
  },

  /**
   * Calculate bounce rate
   * বাউন্স রেট ক্যালকুলেট করা
   */
  calculateBounceRate: (singlePageVisits: number, totalVisits: number): number => {
    if (totalVisits === 0) return 0;
    return (singlePageVisits / totalVisits) * 100;
  },

  /**
   * Calculate average session duration
   * গড় সেশন ডিউরেশন ক্যালকুলেট করা
   */
  calculateAverageSessionDuration: (totalDuration: number, totalVisits: number): number => {
    if (totalVisits === 0) return 0;
    return totalDuration / totalVisits;
  },
};
