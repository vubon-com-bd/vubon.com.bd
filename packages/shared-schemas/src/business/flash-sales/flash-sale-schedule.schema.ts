import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_SCHEDULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-schedule.constants';

const flashSaleScheduleStatusKeys = Object.keys(FLASH_SALE_SCHEDULE.STATUS) as [
  string,
  ...string[],
];
const flashSaleScheduleTypeKeys = Object.keys(FLASH_SALE_SCHEDULE.SCHEDULE_TYPES) as [
  string,
  ...string[],
];

export const FlashSaleScheduleSchema = BaseSchema.extend({
  scheduleId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  status: z.enum(flashSaleScheduleStatusKeys),
  type: z.enum(flashSaleScheduleTypeKeys),
  startDate: z.date(),
  endDate: z.date(),
  timezone: z.string(),
  recurrenceRule: z.string().optional(),
  isRecurring: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isExpired: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
