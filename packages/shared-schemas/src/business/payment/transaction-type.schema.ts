import { z } from 'zod';
import { TRANSACTION } from '@vubon/shared-constants/src/business/payment/transaction.constants';

const transactionTypeKeys = Object.keys(TRANSACTION.TYPES) as [string, ...string[]];

export const TransactionTypeSchema = z.object({
  type: z.enum(transactionTypeKeys),
  category: z.literal('transaction'),
});

export const TransactionTypeEnumSchema = z.enum(transactionTypeKeys);
