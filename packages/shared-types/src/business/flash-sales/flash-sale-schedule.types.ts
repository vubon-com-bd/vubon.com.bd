/**
 * Flash Sale Schedule Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-schedule.constants থেকে।
 */

import type { FLASH_SALE_RECURRENCE } from '@vubon/shared-constants/business';

export type FlashSaleRecurrenceValue =
  (typeof FLASH_SALE_RECURRENCE)[keyof typeof FLASH_SALE_RECURRENCE];

export interface FlashSaleSchedule {
  readonly startAt: string;
  readonly endAt: string;
  readonly durationMinutes: number;
  readonly timezone: string;
  readonly recurrence: FlashSaleRecurrenceValue;
  readonly recurrenceConfig?: RecurrenceConfig;
  readonly reminderBeforeMinutes?: number;
  readonly allowExtension: boolean;
  readonly extensionsUsed: number;
}

export interface RecurrenceConfig {
  readonly interval: number;
  readonly byDay?: readonly number[];
  readonly byMonth?: readonly number[];
  readonly byMonthDay?: readonly number[];
  readonly until?: string;
  readonly count?: number;
}

export interface ScheduleConflict {
  readonly conflictingSaleId: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly overlapMinutes: number;
}
