import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { TRANSACTION } from '@vubon/shared-constants/src/business/payment/transaction.constants';

const transactionStatusKeys = Object.keys(TRANSACTION.STATUS) as [string, ...string[]];

export const TransactionStatusSchema = StatusSchema.extend({
  status: z.enum(transactionStatusKeys),
  category: z.literal('transaction'),
});

export const TransactionStatusEnumSchema = z.enum(transactionStatusKeys);
