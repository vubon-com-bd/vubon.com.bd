/**
 * Flash Sale Schedule Constants
 * ফ্ল্যাশ সেল সময়সূচী সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const SCHEDULE = {
  // Schedule status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Schedule types
  TYPES: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    RECURRING: 'recurring',
  },

  // Schedule priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Default values
  DEFAULTS: {
    MIN_DURATION: 60, // 1 hour
    MAX_DURATION: 86400, // 24 hours
    DEFAULT_DURATION: 3600, // 1 hour
    BUFFER_TIME: 300, // 5 minutes
  },
} as const;

export type ScheduleStatus = (typeof SCHEDULE.STATUS)[keyof typeof SCHEDULE.STATUS];
export type ScheduleType = (typeof SCHEDULE.TYPES)[keyof typeof SCHEDULE.TYPES];
export type SchedulePriority = (typeof SCHEDULE.PRIORITY)[keyof typeof SCHEDULE.PRIORITY];
