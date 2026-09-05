/**
 * Vendor Subscription Schema
 * ভেন্ডর সাবস্ক্রিপশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';

export const VendorSubscriptionSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  planId: z.string().uuid(),
  status: z.enum(Object.values(VENDOR_SUBSCRIPTION.STATUS) as [string, ...string[]]),
  startDate: z.date(),
  endDate: z.date().optional(),
  trialStartDate: z.date().optional(),
  trialEndDate: z.date().optional(),
  nextBillingDate: z.date().optional(),
  lastBillingDate: z.date().optional(),
  cancelledAt: z.date().optional(),
  pausedAt: z.date().optional(),
  resumeAt: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorSubscriptionCreateSchema = VendorSubscriptionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorSubscriptionUpdateSchema = VendorSubscriptionCreateSchema.partial();

export type VendorSubscription = z.infer<typeof VendorSubscriptionSchema>;
export type VendorSubscriptionCreate = z.infer<typeof VendorSubscriptionCreateSchema>;
export type VendorSubscriptionUpdate = z.infer<typeof VendorSubscriptionUpdateSchema>;
