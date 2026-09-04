/**
 * Transaction Type Schema
 * ট্রানজেকশন টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TRANSACTION_TYPES } from '@vubon/shared-constants';

export const TransactionTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(TRANSACTION_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const TransactionTypeCreateSchema = TransactionTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const TransactionTypeUpdateSchema = TransactionTypeCreateSchema.partial();

export type TransactionType = z.infer<typeof TransactionTypeSchema>;
export type TransactionTypeCreate = z.infer<typeof TransactionTypeCreateSchema>;
export type TransactionTypeUpdate = z.infer<typeof TransactionTypeUpdateSchema>;
