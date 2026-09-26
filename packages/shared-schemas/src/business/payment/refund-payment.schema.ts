/**
 * Refund Payment Request Schema
 * @module shared-schemas/business/payment/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const RefundPaymentRequestSchema = z
  .object({
    paymentId: UuidSchema,
    amount: PositiveMoneySchema.optional(),
    reason: z.string().max(500).optional(),
    idempotencyKey: z.string().min(8).max(128).optional(),
  })
  .strict();

export type RefundPaymentRequestSchemaType = z.infer<typeof RefundPaymentRequestSchema>;
