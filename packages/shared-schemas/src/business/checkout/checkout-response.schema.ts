/**
 * Checkout Response Schema
 * @module shared-schemas/business/checkout/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { CheckoutPublicSchema, CheckoutValidationResultSchema } from './checkout.schema.js';

export const CheckoutResponseSchema = z.object({
  success: z.literal(true),
  checkout: CheckoutPublicSchema,
});

export const CheckoutValidationResponseSchema = z.object({
  success: z.literal(true),
  validation: CheckoutValidationResultSchema,
});

export const CheckoutCompleteResponseSchema = z.object({
  success: z.literal(true),
  orderId: UuidSchema.optional(),
  orderNumber: z.string().max(50).optional(),
  redirectUrl: z.string().url().optional(),
  requiresPayment: z.boolean(),
  completedAt: z.string().datetime(),
});

export type CheckoutResponseSchemaType = z.infer<typeof CheckoutResponseSchema>;
export type CheckoutValidationResponseSchemaType = z.infer<typeof CheckoutValidationResponseSchema>;
export type CheckoutCompleteResponseSchemaType = z.infer<typeof CheckoutCompleteResponseSchema>;
