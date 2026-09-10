import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PAYMENT_REFUND } from '@vubon/shared-constants/src/business/payment/payment-refund.constants';
import { PaymentSchema } from './payment.schema';

const refundStatusKeys = Object.keys(PAYMENT_REFUND.STATUS) as [string, ...string[]];
const refundTypeKeys = Object.keys(PAYMENT_REFUND.TYPES) as [string, ...string[]];

export const RefundSchema = BaseSchema.extend({
  refundId: z.string().uuid(),
  paymentId: z.string().uuid(),
  payment: PaymentSchema,
  amount: MoneySchema,
  reason: z.string(),
  status: z.enum(refundStatusKeys),
  type: z.enum(refundTypeKeys),
  transactionId: z.string().uuid().optional(),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  requestedAt: z.date(),
  approvedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
