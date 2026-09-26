/**
 * Transaction Schema
 * @module shared-schemas/business/payment
 */

import { z } from 'zod';
import {
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  TRANSACTION_LIMIT,
} from '@vubon/shared-constants/business';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const TransactionTypeSchema = z.enum(
  Object.values(TRANSACTION_TYPE) as [string, ...string[]]
);

export const TransactionStatusSchema = z.enum(
  Object.values(TRANSACTION_STATUS) as [string, ...string[]]
);

export const TransactionSchema = BaseEntitySchema.extend({
  paymentId: UuidSchema,
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  type: TransactionTypeSchema,
  status: TransactionStatusSchema,
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  gateway: z.string().max(50).optional(),
  gatewayTransactionId: z.string().max(255).optional(),
  reference: z.string().max(TRANSACTION_LIMIT.REFERENCE_MAX_LENGTH).optional(),
  idempotencyKey: z.string().max(128).optional(),
  errorCode: z.string().max(50).optional(),
  errorMessage: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  processedAt: z.string().datetime().optional(),
});

export const TransactionPublicSchema = TransactionSchema.pick({
  id: true,
  type: true,
  status: true,
  amount: true,
  currency: true,
  reference: true,
  createdAt: true,
});

export type TransactionTypeSchemaType = z.infer<typeof TransactionTypeSchema>;
export type TransactionStatusSchemaType = z.infer<typeof TransactionStatusSchema>;
export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
export type TransactionPublicSchemaType = z.infer<typeof TransactionPublicSchema>;
