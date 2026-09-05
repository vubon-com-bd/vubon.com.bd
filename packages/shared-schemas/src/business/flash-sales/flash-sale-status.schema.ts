/**
 * Flash Sale Status Schema
 * ফ্ল্যাশ সেল স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants';

export const FlashSaleStatusSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  status: z.enum(Object.values(FLASH_SALE_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(FLASH_SALE_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const FlashSaleStatusUpdateSchema = FlashSaleStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type FlashSaleStatus = z.infer<typeof FlashSaleStatusSchema>;
export type FlashSaleStatusUpdate = z.infer<typeof FlashSaleStatusUpdateSchema>;
