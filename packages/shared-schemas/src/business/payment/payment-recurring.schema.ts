import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PAYMENT_RECURRING } from '@vubon/shared-constants/src/business/payment/payment-recurring.constants';

const paymentRecurringStatusKeys = Object.keys(PAYMENT_RECURRING.STATUS) as [string, ...string[]];
const paymentRecurringTypeKeys = Object.keys(PAYMENT_RECURRING.TYPES) as [string, ...string[]];

export const PaymentRecurringSchema = BaseSchema.extend({
  recurringId: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.enum(paymentRecurringStatusKeys),
  type: z.enum(paymentRecurringTypeKeys),
  frequency: z.string(),
  interval: z.number().int().min(1),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  startDate: z.date(),
  endDate: z.date().optional(),
  nextBillingDate: z.date(),
  lastBillingDate: z.date().optional(),
  retryCount: z.number().int().min(0).default(0),
  maxRetries: z.number().int().min(1).default(3),
  isActive: z.boolean().default(true),
  isPaused: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
