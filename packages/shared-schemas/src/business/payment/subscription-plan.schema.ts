/**
 * Subscription Plan Schema
 * সাবস্ক্রিপশন প্ল্যান সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const SubscriptionPlanSchema = BaseSchema.extend({
  name: z.string().min(1, 'Plan name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  interval: z.enum(['monthly', 'quarterly', 'bi_annual', 'annual']),
  intervalCount: z.number().int().min(1).default(1),
  features: z.array(z.string()).default([]),
  maxProducts: z.number().int().min(0).default(0),
  maxOrders: z.number().int().min(0).default(0),
  maxCustomers: z.number().int().min(0).default(0),
  commissionRate: z.number().min(0).max(100).default(10),
  isActive: z.boolean().default(true),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const SubscriptionPlanCreateSchema = SubscriptionPlanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const SubscriptionPlanUpdateSchema = SubscriptionPlanCreateSchema.partial();

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type SubscriptionPlanCreate = z.infer<typeof SubscriptionPlanCreateSchema>;
export type SubscriptionPlanUpdate = z.infer<typeof SubscriptionPlanUpdateSchema>;
