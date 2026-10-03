/**
 * Select Payment Schema
 * @module shared-schemas/business/checkout/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const SelectPaymentRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    paymentMethod: z.string().min(1).max(50),
    paymentGateway: z.string().min(1).max(50).optional(),
  })
  .strict();

export type SelectPaymentRequestSchemaType = z.infer<typeof SelectPaymentRequestSchema>;
