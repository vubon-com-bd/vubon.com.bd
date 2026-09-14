/**
 * Verify Payment Request Schema
 * @module shared-schemas/business/payment/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VerifyPaymentRequestSchema = z
  .object({
    paymentId: UuidSchema,
    gatewaySignature: z.string().max(500).optional(),
    gatewayData: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type VerifyPaymentRequestSchemaType = z.infer<typeof VerifyPaymentRequestSchema>;
