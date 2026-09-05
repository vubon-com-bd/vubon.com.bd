/**
 * Flash Sale Price Schema
 * ফ্ল্যাশ সেল মূল্য সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PRICING_TYPES } from '@vubon/shared-constants';

export const FlashSalePriceSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  type: z.enum(Object.values(PRICING_TYPES) as [string, ...string[]]),
  originalPrice: z.number().min(0, 'Original price must be greater than or equal to 0'),
  flashPrice: z.number().min(0, 'Flash price must be greater than or equal to 0'),
  discount: z.number().min(0, 'Discount must be greater than or equal to 0'),
  discountPercentage: z.number().min(0).max(100),
  currency: z.string().default('BDT'),
  isActive: z.boolean().default(true),
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSalePriceCreateSchema = FlashSalePriceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const FlashSalePriceUpdateSchema = FlashSalePriceCreateSchema.partial();

export type FlashSalePrice = z.infer<typeof FlashSalePriceSchema>;
export type FlashSalePriceCreate = z.infer<typeof FlashSalePriceCreateSchema>;
export type FlashSalePriceUpdate = z.infer<typeof FlashSalePriceUpdateSchema>;
