/**
 * Flash Sale Schedule Schema
 * ফ্ল্যাশ সেল সময়সূচী সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SCHEDULE } from '@vubon/shared-constants';

export const FlashSaleScheduleSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum([
    SCHEDULE.STATUS.ACTIVE,
    SCHEDULE.STATUS.INACTIVE,
    SCHEDULE.STATUS.COMPLETED,
    SCHEDULE.STATUS.CANCELLED,
    SCHEDULE.STATUS.PENDING,
    SCHEDULE.STATUS.DELETED,
  ]),
  type: z.enum([
    SCHEDULE.TYPES.ONCE,
    SCHEDULE.TYPES.DAILY,
    SCHEDULE.TYPES.WEEKLY,
    SCHEDULE.TYPES.MONTHLY,
    SCHEDULE.TYPES.RECURRING,
  ]),
  priority: z.enum([
    SCHEDULE.PRIORITY.LOW,
    SCHEDULE.PRIORITY.MEDIUM,
    SCHEDULE.PRIORITY.HIGH,
    SCHEDULE.PRIORITY.CRITICAL,
  ]),
  interval: z.number().int().min(1).optional(),
  dayOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  dayOfMonth: z.array(z.number().int().min(1).max(31)).optional(),
  monthOfYear: z.array(z.number().int().min(1).max(12)).optional(),
  timezone: z.string().default('Asia/Dhaka'),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleScheduleCreateSchema = FlashSaleScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const FlashSaleScheduleUpdateSchema = FlashSaleScheduleCreateSchema.partial();

export type FlashSaleSchedule = z.infer<typeof FlashSaleScheduleSchema>;
export type FlashSaleScheduleCreate = z.infer<typeof FlashSaleScheduleCreateSchema>;
export type FlashSaleScheduleUpdate = z.infer<typeof FlashSaleScheduleUpdateSchema>;
