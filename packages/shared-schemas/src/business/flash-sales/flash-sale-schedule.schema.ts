/**
 * Flash Sale Schedule Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-schedule.constants থেকে।
 */

import { z } from 'zod';
import { FLASH_SALE_RECURRENCE } from '@vubon/shared-constants/business';

export const FlashSaleRecurrenceSchema = z.enum(
  Object.values(FLASH_SALE_RECURRENCE) as [string, ...string[]]
);

export const RecurrenceConfigSchema = z.object({
  interval: z.number().int().positive().max(365),
  byDay: z.array(z.number().int().min(0).max(6)).max(7).optional(),
  byMonth: z.array(z.number().int().min(1).max(12)).max(12).optional(),
  byMonthDay: z.array(z.number().int().min(1).max(31)).max(31).optional(),
  until: z.string().datetime().optional(),
  count: z.number().int().positive().max(1000).optional(),
});

export const FlashSaleScheduleSchema = z.object({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  durationMinutes: z.number().int().positive().max(10080),
  timezone: z.string().min(1).max(64),
  recurrence: FlashSaleRecurrenceSchema,
  recurrenceConfig: RecurrenceConfigSchema.optional(),
  reminderBeforeMinutes: z.number().int().nonnegative().max(1440).optional(),
  allowExtension: z.boolean(),
  extensionsUsed: z.number().int().nonnegative(),
});

export const ScheduleConflictSchema = z.object({
  conflictingSaleId: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  overlapMinutes: z.number().int().positive(),
});

export type FlashSaleRecurrenceSchemaType = z.infer<typeof FlashSaleRecurrenceSchema>;
export type RecurrenceConfigSchemaType = z.infer<typeof RecurrenceConfigSchema>;
export type FlashSaleScheduleSchemaType = z.infer<typeof FlashSaleScheduleSchema>;
export type ScheduleConflictSchemaType = z.infer<typeof ScheduleConflictSchema>;
