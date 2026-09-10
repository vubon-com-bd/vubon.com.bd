import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { TRANSACTION } from '@vubon/shared-constants/src/business/payment/transaction.constants';

const transactionTypeKeys = Object.keys(TRANSACTION.TYPES) as [string, ...string[]];
const transactionStatusKeys = Object.keys(TRANSACTION.STATUS) as [string, ...string[]];

export const TransactionSchema = BaseSchema.extend({
  transactionId: z.string().uuid(),
  paymentId: z.string().uuid(),
  type: z.enum(transactionTypeKeys),
  status: z.enum(transactionStatusKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  reference: z.string(),
  gateway: z.string(),
  gatewayTransactionId: z.string(),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isReversed: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.date(),
});
