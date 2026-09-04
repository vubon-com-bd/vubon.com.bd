/**
 * Coupon Discount Type Schema
 * কুপন ডিসকাউন্ট টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DISCOUNT_TYPES } from '@vubon/shared-constants';

export const DiscountTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(DISCOUNT_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Discount type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const DiscountTypeCreateSchema = DiscountTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const DiscountTypeUpdateSchema = DiscountTypeCreateSchema.partial();

export type DiscountType = z.infer<typeof DiscountTypeSchema>;
export type DiscountTypeCreate = z.infer<typeof DiscountTypeCreateSchema>;
export type DiscountTypeUpdate = z.infer<typeof DiscountTypeUpdateSchema>;
