/**
 * Confirm Checkout Schema
 * @module shared-schemas/business/checkout/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const ConfirmCheckoutRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    idempotencyKey: z.string().min(8).max(128).optional(),
  })
  .strict();

export type ConfirmCheckoutRequestSchemaType = z.infer<typeof ConfirmCheckoutRequestSchema>;
