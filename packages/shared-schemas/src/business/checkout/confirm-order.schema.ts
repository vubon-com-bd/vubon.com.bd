/**
 * Confirm Order Request Schema
 * @module shared-schemas/business/checkout/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const ConfirmOrderRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    paymentMethod: z.string().min(1).max(50),
    paymentGateway: z.string().min(1).max(50).optional(),
    customerNotes: z.string().max(1000).optional(),
    idempotencyKey: z.string().min(8).max(128).optional(),
    acceptTerms: z.literal(true),
  })
  .strict();

export type ConfirmOrderRequestSchemaType = z.infer<typeof ConfirmOrderRequestSchema>;
