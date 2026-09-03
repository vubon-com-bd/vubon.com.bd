/**
 * Log Validator
 * ইউজার লগ ভ্যালিডেটর
 */

import { UserLog, UserLogCreateInput } from '@vubon/shared-types';
import { USER_LOG } from '@vubon/shared-constants';

type LogLevel = (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
type LogCategory = (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];

export const LogValidator = {
  /**
   * Validate log data
   * লগ ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserLog>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.level && !Object.values(USER_LOG.LEVELS).includes(data.level as LogLevel)) {
      errors.push('Invalid log level');
    }

    if (
      data.category &&
      !Object.values(USER_LOG.CATEGORIES).includes(data.category as LogCategory)
    ) {
      errors.push('Invalid log category');
    }

    if (data.message && data.message.length < 1) {
      errors.push('Log message is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate log creation
   * লগ তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserLogCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (!data.level || !Object.values(USER_LOG.LEVELS).includes(data.level as LogLevel)) {
      errors.push('Valid log level is required');
    }

    if (
      !data.category ||
      !Object.values(USER_LOG.CATEGORIES).includes(data.category as LogCategory)
    ) {
      errors.push('Valid log category is required');
    }

    if (!data.message || data.message.length < 1) {
      errors.push('Log message is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Create log entry
   * লগ এন্ট্রি তৈরি করা
   */
  create: (data: UserLogCreateInput): UserLogCreateInput => {
    return {
      ...data,
      level: data.level || USER_LOG.DEFAULTS.LEVEL,
    };
  },

  /**
   * Create error log
   * এরর লগ তৈরি করা
   */
  createError: (userId: string, error: Error, category?: string): UserLogCreateInput => {
    return LogValidator.create({
      userId,
      level: USER_LOG.LEVELS.ERROR as LogLevel,
      category: (category || USER_LOG.CATEGORIES.SYSTEM) as LogCategory,
      message: error.message,
      stack: error.stack,
    });
  },

  /**
   * Create info log
   * ইনফো লগ তৈরি করা
   */
  createInfo: (
    userId: string,
    message: string,
    category?: string,
    metadata?: Record<string, unknown>
  ): UserLogCreateInput => {
    return LogValidator.create({
      userId,
      level: USER_LOG.LEVELS.INFO as LogLevel,
      category: (category || USER_LOG.CATEGORIES.SYSTEM) as LogCategory,
      message,
      metadata,
    });
  },

  /**
   * Create debug log
   * ডিবাগ লগ তৈরি করা
   */
  createDebug: (
    userId: string,
    message: string,
    category?: string,
    metadata?: Record<string, unknown>
  ): UserLogCreateInput => {
    return LogValidator.create({
      userId,
      level: USER_LOG.LEVELS.DEBUG as LogLevel,
      category: (category || USER_LOG.CATEGORIES.SYSTEM) as LogCategory,
      message,
      metadata,
    });
  },

  /**
   * Create warning log
   * ওয়ার্নিং লগ তৈরি করা
   */
  createWarning: (
    userId: string,
    message: string,
    category?: string,
    metadata?: Record<string, unknown>
  ): UserLogCreateInput => {
    return LogValidator.create({
      userId,
      level: USER_LOG.LEVELS.WARN as LogLevel,
      category: (category || USER_LOG.CATEGORIES.SYSTEM) as LogCategory,
      message,
      metadata,
    });
  },

  /**
   * Filter logs by level
   * লেভেল অনুযায়ী লগ ফিল্টার করা
   */
  filterByLevel: (logs: UserLog[], level: string): UserLog[] => {
    return logs.filter((log) => log.level === level);
  },

  /**
   * Filter logs by category
   * ক্যাটাগরি অনুযায়ী লগ ফিল্টার করা
   */
  filterByCategory: (logs: UserLog[], category: string): UserLog[] => {
    return logs.filter((log) => log.category === category);
  },
};
