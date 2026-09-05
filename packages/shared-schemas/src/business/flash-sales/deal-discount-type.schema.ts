/**
 * Deal Discount Type Schema
 * ডিল ডিসকাউন্ট টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_DISCOUNT_TYPES } from '@vubon/shared-constants';

export const DealDiscountTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(DEAL_DISCOUNT_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Discount type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const DealDiscountTypeCreateSchema = DealDiscountTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const DealDiscountTypeUpdateSchema = DealDiscountTypeCreateSchema.partial();

export type DealDiscountType = z.infer<typeof DealDiscountTypeSchema>;
export type DealDiscountTypeCreate = z.infer<typeof DealDiscountTypeCreateSchema>;
export type DealDiscountTypeUpdate = z.infer<typeof DealDiscountTypeUpdateSchema>;
