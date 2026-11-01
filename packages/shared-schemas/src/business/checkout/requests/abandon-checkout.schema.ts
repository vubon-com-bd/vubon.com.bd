/**
 * Abandon Checkout Schema
 * @module shared-schemas/business/checkout/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const AbandonCheckoutRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    reason: z.string().max(500).optional(),
  })
  .strict();

export type AbandonCheckoutRequestSchemaType = z.infer<typeof AbandonCheckoutRequestSchema>;
