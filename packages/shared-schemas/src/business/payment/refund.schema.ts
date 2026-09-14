/**
 * Refund Schema
 * @module shared-schemas/business/payment
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const RefundStatusSchema = z.enum([
  'pending',
  'processing',
  'succeeded',
  'failed',
  'cancelled',
]);

export const RefundSchema = BaseEntitySchema.extend({
  paymentId: UuidSchema,
  transactionId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  status: RefundStatusSchema,
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  reason: z.string().max(500).optional(),
  gatewayRefundId: z.string().max(255).optional(),
  processedAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const RefundPublicSchema = RefundSchema.pick({
  id: true,
  status: true,
  amount: true,
  currency: true,
  reason: true,
  createdAt: true,
  processedAt: true,
});

export type RefundStatusSchemaType = z.infer<typeof RefundStatusSchema>;
export type RefundSchemaType = z.infer<typeof RefundSchema>;
export type RefundPublicSchemaType = z.infer<typeof RefundPublicSchema>;
