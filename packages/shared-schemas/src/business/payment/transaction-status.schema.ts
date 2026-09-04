/**
 * Transaction Status Schema
 * ট্রানজেকশন স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TRANSACTION_STATUS } from '@vubon/shared-constants';

export const TransactionStatusSchema = BaseSchema.extend({
  transactionId: z.string().uuid(),
  status: z.enum(Object.values(TRANSACTION_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(TRANSACTION_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const TransactionStatusUpdateSchema = TransactionStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;
export type TransactionStatusUpdate = z.infer<typeof TransactionStatusUpdateSchema>;
