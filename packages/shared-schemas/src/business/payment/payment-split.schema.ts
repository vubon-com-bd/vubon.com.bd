import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PAYMENT_SPLIT } from '@vubon/shared-constants/src/business/payment/payment-split.constants';

const paymentSplitStatusKeys = Object.keys(PAYMENT_SPLIT.STATUS) as [string, ...string[]];
const paymentSplitTypeKeys = Object.keys(PAYMENT_SPLIT.TYPES) as [string, ...string[]];

export const PaymentSplitSchema = BaseSchema.extend({
  splitId: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.enum(paymentSplitStatusKeys),
  type: z.enum(paymentSplitTypeKeys),
  parties: z.array(
    z.object({
      partyId: z.string().uuid(),
      name: z.string(),
      amount: MoneySchema,
      percentage: z.number().min(0).max(100),
      status: z.enum(['pending', 'processed', 'completed', 'failed']),
      metadata: z.record(z.unknown()),
    })
  ),
  isCompleted: z.boolean().default(false),
  completedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
