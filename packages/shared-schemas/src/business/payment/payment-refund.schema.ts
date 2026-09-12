import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PAYMENT_REFUND } from '@vubon/shared-constants/src/business/payment/payment-refund.constants';

const paymentRefundStatusKeys = Object.keys(PAYMENT_REFUND.STATUS) as [string, ...string[]];
const paymentRefundTypeKeys = Object.keys(PAYMENT_REFUND.TYPES) as [string, ...string[]];

export const PaymentRefundSchema = BaseSchema.extend({
  refundId: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.enum(paymentRefundStatusKeys),
  type: z.enum(paymentRefundTypeKeys),
  amount: MoneySchema,
  reason: z.string(),
  description: z.string().optional(),
  transactionId: z.string().uuid().optional(),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  requestedAt: z.date(),
  approvedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
