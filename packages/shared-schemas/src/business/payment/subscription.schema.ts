/**
 * Subscription Schema
 * সাবস্ক্রিপশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';

export const SubscriptionSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  planId: z.string().uuid().optional(),
  name: z.string().min(1, 'Subscription name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  interval: z.enum(['monthly', 'quarterly', 'bi_annual', 'annual']),
  intervalCount: z.number().int().min(1).default(1),
  trialPeriodDays: z.number().int().min(0).optional(),
  trialStartDate: z.date().optional(),
  trialEndDate: z.date().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  nextBillingDate: z.date(),
  lastBillingDate: z.date().optional(),
  status: z.enum(Object.values(VENDOR_SUBSCRIPTION.STATUS) as [string, ...string[]]),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  gateway: z.string().min(1, 'Gateway is required'),
  gatewaySubscriptionId: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  features: z.array(z.string()).default([]),
  cancelAtPeriodEnd: z.boolean().default(false),
  cancelledAt: z.date().optional(),
  pausedAt: z.date().optional(),
  completedAt: z.date().optional(),
});

export const SubscriptionCreateSchema = SubscriptionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const SubscriptionUpdateSchema = SubscriptionCreateSchema.partial();

export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionCreate = z.infer<typeof SubscriptionCreateSchema>;
export type SubscriptionUpdate = z.infer<typeof SubscriptionUpdateSchema>;
