/**
 * Deal Schema
 * ডিল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_STATUS } from '@vubon/shared-constants';

export const DealSchema = BaseSchema.extend({
  name: z.string().min(1, 'Deal name is required').max(255),
  nameBangla: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  status: z.enum(Object.values(DEAL_STATUS) as [string, ...string[]]),
  type: z.enum(['single', 'bundle', 'buy_get', 'tiered', 'bogo']),
  discountType: z.enum(['percentage', 'fixed', 'bundle', 'buy_x_get_y']),
  value: z.number().min(0, 'Discount value must be greater than or equal to 0'),
  maxDiscount: z.number().min(0).optional(),
  minOrderAmount: z.number().min(0).optional(),
  minQuantity: z.number().int().min(1).default(1),
  maxQuantity: z.number().int().min(1).default(10),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  products: z.array(z.string().uuid()).default([]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const DealCreateSchema = DealSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const DealUpdateSchema = DealCreateSchema.partial();

export type Deal = z.infer<typeof DealSchema>;
export type DealCreate = z.infer<typeof DealCreateSchema>;
export type DealUpdate = z.infer<typeof DealUpdateSchema>;
