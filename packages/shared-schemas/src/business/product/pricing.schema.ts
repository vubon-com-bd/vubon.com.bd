/**
 * Pricing Schema
 * প্রাইসিং সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PRICING_TYPES } from '@vubon/shared-constants';

export const PricingSchema = BaseSchema.extend({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  type: z.enum(Object.values(PRICING_TYPES) as [string, ...string[]]).default('fixed'),
  amount: z.number().min(0, 'Price must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  compareAmount: z.number().min(0).optional(),
  costAmount: z.number().min(0).optional(),
  taxRate: z.number().min(0).max(100).default(15),
  isActive: z.boolean().default(true),
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
});

export const PricingHistorySchema = BaseSchema.extend({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  oldPrice: z.number().min(0),
  newPrice: z.number().min(0),
  reason: z.string().min(1, 'Reason is required'),
  changedBy: z.string().uuid(),
});

export const PricingCreateSchema = PricingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PricingUpdateSchema = PricingCreateSchema.partial();

export type Pricing = z.infer<typeof PricingSchema>;
export type PricingHistory = z.infer<typeof PricingHistorySchema>;
export type PricingCreate = z.infer<typeof PricingCreateSchema>;
export type PricingUpdate = z.infer<typeof PricingUpdateSchema>;
