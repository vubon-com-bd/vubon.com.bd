/**
 * Payment Schema
 * পেমেন্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants';

export const PaymentSchema = BaseSchema.extend({
  orderId: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  status: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]),
  method: z.string().min(1, 'Payment method is required'),
  gateway: z.string().min(1, 'Payment gateway is required'),
  gatewayTransactionId: z.string().optional(),
  paymentIntent: z.string().optional(),
  clientSecret: z.string().optional(),
  receiptUrl: z.string().url().optional(),
  note: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  paidAt: z.date().optional(),
  failedAt: z.date().optional(),
  refundedAt: z.date().optional(),
});

export const PaymentCreateSchema = PaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentUpdateSchema = PaymentCreateSchema.partial();

export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentCreate = z.infer<typeof PaymentCreateSchema>;
export type PaymentUpdate = z.infer<typeof PaymentUpdateSchema>;
