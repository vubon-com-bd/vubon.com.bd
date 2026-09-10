import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-status.constants';

const flashSaleStatusKeys = Object.keys(FLASH_SALE_STATUS) as [string, ...string[]];

export const FlashSaleStatusSchema = StatusSchema.extend({
  status: z.enum(flashSaleStatusKeys),
  category: z.literal('flash_sale'),
  isDraft: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isEnded: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
});

export const FlashSaleStatusEnumSchema = z.enum(flashSaleStatusKeys);
