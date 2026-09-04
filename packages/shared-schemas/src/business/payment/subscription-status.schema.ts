/**
 * Subscription Status Schema
 * সাবস্ক্রিপশন স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';

export const SubscriptionStatusSchema = BaseSchema.extend({
  subscriptionId: z.string().uuid(),
  status: z.enum(Object.values(VENDOR_SUBSCRIPTION.STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z
    .enum(Object.values(VENDOR_SUBSCRIPTION.STATUS) as [string, ...string[]])
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const SubscriptionStatusUpdateSchema = SubscriptionStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;
export type SubscriptionStatusUpdate = z.infer<typeof SubscriptionStatusUpdateSchema>;
