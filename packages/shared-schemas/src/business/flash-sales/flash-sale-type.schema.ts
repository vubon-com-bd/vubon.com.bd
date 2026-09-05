/**
 * Flash Sale Type Schema
 * ফ্ল্যাশ সেল টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_TYPES } from '@vubon/shared-constants';

export const FlashSaleTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(FLASH_SALE_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const FlashSaleTypeCreateSchema = FlashSaleTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const FlashSaleTypeUpdateSchema = FlashSaleTypeCreateSchema.partial();

export type FlashSaleType = z.infer<typeof FlashSaleTypeSchema>;
export type FlashSaleTypeCreate = z.infer<typeof FlashSaleTypeCreateSchema>;
export type FlashSaleTypeUpdate = z.infer<typeof FlashSaleTypeUpdateSchema>;
