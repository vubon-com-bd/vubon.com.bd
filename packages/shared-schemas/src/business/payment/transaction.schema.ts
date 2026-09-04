/**
 * Transaction Schema
 * ট্রানজেকশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TRANSACTION_STATUS } from '@vubon/shared-constants';

export const TransactionSchema = BaseSchema.extend({
  paymentId: z.string().uuid(),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  gatewayTransactionId: z.string().optional(),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  status: z.enum(Object.values(TRANSACTION_STATUS) as [string, ...string[]]),
  type: z.enum(['payment', 'authorize', 'capture', 'refund', 'void']),
  responseCode: z.string().optional(),
  responseMessage: z.string().optional(),
  responseData: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])).optional(),
  gateway: z.string().min(1, 'Gateway is required'),
  method: z.string().min(1, 'Method is required'),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const TransactionCreateSchema = TransactionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const TransactionUpdateSchema = TransactionCreateSchema.partial();

export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionCreate = z.infer<typeof TransactionCreateSchema>;
export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>;
