/**
 * Checkout Step Schema
 * চেকআউট স্টেপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CHECKOUT_STEPS } from '@vubon/shared-constants';

export const CheckoutStepSchema = BaseSchema.extend({
  checkoutId: z.string().uuid(),
  step: z.enum(Object.values(CHECKOUT_STEPS) as [string, ...string[]]),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed', 'skipped']),
  data: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])).optional(),
  error: z.string().optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
});

export const CheckoutStepCreateSchema = CheckoutStepSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CheckoutStepUpdateSchema = CheckoutStepCreateSchema.partial();

export type CheckoutStep = z.infer<typeof CheckoutStepSchema>;
export type CheckoutStepCreate = z.infer<typeof CheckoutStepCreateSchema>;
export type CheckoutStepUpdate = z.infer<typeof CheckoutStepUpdateSchema>;
