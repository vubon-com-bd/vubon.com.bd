/**
 * Flash Sale Schedule Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-schedule.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_SCHEDULE = {
  // Base status from common
  STATUS: STATUS,

  // Schedule specific
  DEFAULT_DURATION_MINUTES: 60,
  MAX_DURATION_MINUTES: 240,
  MIN_DURATION_MINUTES: 15,
  PREPARE_TIME_MINUTES: 30,
  COOLDOWN_MINUTES: 15,
  SCHEDULE_CACHE_TTL: 3600,

  // Schedule status
  FLASH_SALE_SCHEDULE_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    POSTPONED: 'postponed',
    RESCHEDULED: 'rescheduled',
    EXPIRED: 'expired',
  } as const,

  // Schedule type
  FLASH_SALE_SCHEDULE_TYPE: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    CUSTOM: 'custom',
  } as const,

  // Schedule priority
  FLASH_SALE_SCHEDULE_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,
} as const;

export type FlashSaleScheduleStatus =
  (typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_STATUS)[keyof typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_STATUS];
export type FlashSaleScheduleType =
  (typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_TYPE)[keyof typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_TYPE];
export type FlashSaleSchedulePriority =
  (typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_PRIORITY)[keyof typeof FLASH_SALE_SCHEDULE.FLASH_SALE_SCHEDULE_PRIORITY];

export const FLASH_SALE_SCHEDULE_STATUS_LABELS: Record<FlashSaleScheduleStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  postponed: 'Postponed',
  rescheduled: 'Rescheduled',
  expired: 'Expired',
};

export const FLASH_SALE_SCHEDULE_STATUS_COLORS: Record<FlashSaleScheduleStatus, string> = {
  pending: '#eab308',
  confirmed: '#60a5fa',
  in_progress: '#22c55e',
  completed: '#22c55e',
  cancelled: '#dc2626',
  postponed: '#f59e0b',
  rescheduled: '#8b5cf6',
  expired: '#9ca3af',
};
