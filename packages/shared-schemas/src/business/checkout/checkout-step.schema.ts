import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CHECKOUT_STEP } from '@vubon/shared-constants/src/business/checkout/checkout-step.constants';

const checkoutStepKeys = Object.keys(CHECKOUT_STEP) as [string, ...string[]];

export const CheckoutStepSchema = BaseSchema.extend({
  stepId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  type: z.enum(checkoutStepKeys),
  order: z.number().int().min(0),
  isCompleted: z.boolean().default(false),
  isActive: z.boolean().default(false),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
