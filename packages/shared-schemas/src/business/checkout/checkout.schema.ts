/**
 * Checkout Core Schema
 * @module shared-schemas/business/checkout
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { EmailSchema } from '../../common/primitives/email.schema';
import { PhoneSchema } from '../../common/primitives/phone.schema';
import { AddressSchema } from '../../common/geo/address.schema';
import { CartItemPublicSchema } from '../cart/cart-item.schema';
import { CartTotalsSchema } from '../cart/cart.schema';
import { CheckoutStatusSchema } from './checkout-status.schema';
import { CheckoutStepSchema, CheckoutStepStateSchema } from './checkout-step.schema';

export const CheckoutTypeSchema = z.enum([
  'guest',
  'registered',
  'express',
  'one_click',
  'subscription',
]);

export const CheckoutSchema = BaseEntitySchema.extend({
  cartId: UuidSchema,
  userId: UuidSchema.optional(),
  type: CheckoutTypeSchema,
  status: CheckoutStatusSchema,
  currentStep: CheckoutStepSchema,
  steps: z.array(CheckoutStepStateSchema).max(20),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  shippingAddress: AddressSchema.optional(),
  billingAddress: AddressSchema.optional(),
  items: z.array(CartItemPublicSchema).max(100),
  totals: CartTotalsSchema,
  currency: z.string().length(3),
  paymentMethod: z.string().max(50).optional(),
  paymentIntentId: z.string().max(255).optional(),
  shippingMethodId: UuidSchema.optional(),
  notes: z.string().max(1000).optional(),
  reservedUntil: z.string().datetime().optional(),
  expiresAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export const CheckoutPublicSchema = CheckoutSchema.pick({
  id: true,
  status: true,
  currentStep: true,
  steps: true,
  items: true,
  totals: true,
  currency: true,
});

export const CheckoutSummarySchema = z.object({
  id: UuidSchema,
  status: CheckoutStatusSchema,
  itemCount: z.number().int().nonnegative(),
  total: z.number().nonnegative(),
  currency: z.string().length(3),
  expiresAt: z.string().datetime(),
});

export const CheckoutValidationErrorSchema = z.object({
  step: CheckoutStepSchema,
  field: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  code: z.string().max(50).optional(),
});

export const CheckoutValidationResultSchema = z.object({
  valid: z.boolean(),
  errors: z.array(CheckoutValidationErrorSchema).max(50),
});

export type CheckoutTypeSchemaType = z.infer<typeof CheckoutTypeSchema>;
export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
export type CheckoutPublicSchemaType = z.infer<typeof CheckoutPublicSchema>;
export type CheckoutSummarySchemaType = z.infer<typeof CheckoutSummarySchema>;
export type CheckoutValidationErrorSchemaType = z.infer<typeof CheckoutValidationErrorSchema>;
export type CheckoutValidationResultSchemaType = z.infer<typeof CheckoutValidationResultSchema>;
