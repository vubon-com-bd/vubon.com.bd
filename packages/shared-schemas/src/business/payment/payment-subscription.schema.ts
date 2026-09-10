import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { PAYMENT_SUBSCRIPTION } from '@vubon/shared-constants/src/business/payment/payment-subscription.constants';
import { PaymentRecurringSchema } from './payment-recurring.schema';

const paymentSubscriptionStatusKeys = Object.keys(PAYMENT_SUBSCRIPTION.STATUS) as [
  string,
  ...string[],
];
const paymentSubscriptionTypeKeys = Object.keys(PAYMENT_SUBSCRIPTION.TYPES) as [
  string,
  ...string[],
];

export const PaymentSubscriptionSchema = BaseSchema.extend({
  subscriptionId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(paymentSubscriptionStatusKeys),
  type: z.enum(paymentSubscriptionTypeKeys),
  planId: z.string(),
  planName: z.string(),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  recurring: PaymentRecurringSchema,
  trialStartDate: z.date().optional(),
  trialEndDate: z.date().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  nextBillingDate: z.date(),
  isActive: z.boolean().default(true),
  isPaused: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
