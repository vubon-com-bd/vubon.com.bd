/**
 * Payment Core Schema
 * @module shared-schemas/business/payment
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { PaymentStatusSchema } from './payment-status.schema';
import { PaymentMethodSchema } from './payment-method.schema';
import { PaymentGatewaySchema } from './payment-gateway.schema';
import { TransactionPublicSchema } from './transaction.schema';

export const PaymentTypeSchema = z.enum([
  'one_time',
  'recurring',
  'installment',
  'subscription',
  'prepaid',
  'postpaid',
]);

export const PaymentSchema = BaseEntitySchema.extend({
  orderId: UuidSchema,
  userId: UuidSchema,
  type: PaymentTypeSchema,
  status: PaymentStatusSchema,
  method: PaymentMethodSchema,
  gateway: PaymentGatewaySchema.optional(),
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  gatewayPaymentId: z.string().max(255).optional(),
  gatewayOrderId: z.string().max(255).optional(),
  gatewaySignature: z.string().max(500).optional(),
  authorizedAt: z.string().datetime().optional(),
  capturedAt: z.string().datetime().optional(),
  refundedAmount: PositiveMoneySchema.optional(),
  transactions: z.array(TransactionPublicSchema).max(50),
  metadata: z.record(z.string(), z.unknown()).optional(),
  failureReason: z.string().max(500).optional(),
  failureCode: z.string().max(50).optional(),
});

export const PaymentPublicSchema = PaymentSchema.pick({
  id: true,
  orderId: true,
  status: true,
  method: true,
  gateway: true,
  amount: true,
  currency: true,
  refundedAmount: true,
  createdAt: true,
  capturedAt: true,
});

export const PaymentSummarySchema = PaymentSchema.pick({
  id: true,
  orderId: true,
  status: true,
  amount: true,
  currency: true,
});

export const PaymentListFilterSchema = z.object({
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  status: PaymentStatusSchema.optional(),
  method: PaymentMethodSchema.optional(),
  gateway: PaymentGatewaySchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type PaymentTypeSchemaType = z.infer<typeof PaymentTypeSchema>;
export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
export type PaymentPublicSchemaType = z.infer<typeof PaymentPublicSchema>;
export type PaymentSummarySchemaType = z.infer<typeof PaymentSummarySchema>;
export type PaymentListFilterSchemaType = z.infer<typeof PaymentListFilterSchema>;
