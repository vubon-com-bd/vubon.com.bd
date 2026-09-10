import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { BKASH } from '@vubon/shared-constants/src/business/payment/bkash.constants';

const bkashTypeKeys = Object.keys(BKASH.TYPES) as [string, ...string[]];

export const BkashSchema = BaseSchema.extend({
  bkashId: z.string().uuid(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  type: z.enum(bkashTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  merchantInvoiceNumber: z.string().optional(),
  trxId: z.string().optional(),
  bkashPaymentId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
