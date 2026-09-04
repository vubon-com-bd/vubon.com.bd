/**
 * Checkout Status Schema
 * চেকআউট স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CHECKOUT_STATUS } from '@vubon/shared-constants';

export const CheckoutStatusSchema = BaseSchema.extend({
  checkoutId: z.string().uuid(),
  status: z.enum(Object.values(CHECKOUT_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(CHECKOUT_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const CheckoutStatusUpdateSchema = CheckoutStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CheckoutStatus = z.infer<typeof CheckoutStatusSchema>;
export type CheckoutStatusUpdate = z.infer<typeof CheckoutStatusUpdateSchema>;
