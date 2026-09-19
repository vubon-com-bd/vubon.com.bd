/**
 * Payment Response Schema
 * @module shared-schemas/business/payment/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { PaymentPublicSchema, PaymentSummarySchema } from './payment.schema';
import { PaymentStatusSchema } from './payment-status.schema';

export const PaymentResponseSchema = z.object({
  success: z.literal(true),
  payment: PaymentPublicSchema,
});

export const PaymentInitiateResponseSchema = z.object({
  success: z.literal(true),
  paymentId: UuidSchema,
  redirectUrl: z.string().url().optional(),
  gatewayPaymentId: z.string().max(255).optional(),
  status: PaymentStatusSchema,
});

export const PaymentSummaryResponseSchema = z.object({
  success: z.literal(true),
  payment: PaymentSummarySchema,
});

export const PaymentRefundResponseSchema = z.object({
  success: z.literal(true),
  refundId: UuidSchema,
  refundedAmount: PositiveMoneySchema,
  status: z.enum(['pending', 'processing', 'succeeded']),
});

export const PaymentVerifyResponseSchema = z.object({
  success: z.literal(true),
  verified: z.boolean(),
  paymentId: UuidSchema,
  status: PaymentStatusSchema,
});

export type PaymentResponseSchemaType = z.infer<typeof PaymentResponseSchema>;
export type PaymentInitiateResponseSchemaType = z.infer<typeof PaymentInitiateResponseSchema>;
export type PaymentSummaryResponseSchemaType = z.infer<typeof PaymentSummaryResponseSchema>;
export type PaymentRefundResponseSchemaType = z.infer<typeof PaymentRefundResponseSchema>;
export type PaymentVerifyResponseSchemaType = z.infer<typeof PaymentVerifyResponseSchema>;
