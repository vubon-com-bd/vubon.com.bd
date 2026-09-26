/**
 * Checkout Step Schema
 * @module shared-schemas/business/checkout
 *
 * Values আসে shared-constants/business/checkout-step.constants থেকে।
 */

import { z } from 'zod';
import { CHECKOUT_STEP, CHECKOUT_STEP_STATUS } from '@vubon/shared-constants/business';

export const CheckoutStepSchema = z.enum(Object.values(CHECKOUT_STEP) as [string, ...string[]]);

export const CheckoutStepStatusSchema = z.enum(
  Object.values(CHECKOUT_STEP_STATUS) as [string, ...string[]]
);

export const CheckoutStepStateSchema = z.object({
  step: CheckoutStepSchema,
  status: CheckoutStepStatusSchema,
  completedAt: z.string().datetime().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export type CheckoutStepSchemaType = z.infer<typeof CheckoutStepSchema>;
export type CheckoutStepStatusSchemaType = z.infer<typeof CheckoutStepStatusSchema>;
export type CheckoutStepStateSchemaType = z.infer<typeof CheckoutStepStateSchema>;
