import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { PAYMENT_SUBSCRIPTION } from '@vubon/shared-constants/src/business/payment/payment-subscription.constants';
import { SubscriptionPlanSchema } from './subscription-plan.schema';

const subscriptionStatusKeys = Object.keys(PAYMENT_SUBSCRIPTION.STATUS) as [string, ...string[]];
const subscriptionTypeKeys = Object.keys(PAYMENT_SUBSCRIPTION.TYPES) as [string, ...string[]];

export const SubscriptionSchema = BaseSchema.extend({
  subscriptionId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(subscriptionStatusKeys),
  type: z.enum(subscriptionTypeKeys),
  plan: SubscriptionPlanSchema,
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  startDate: z.date(),
  endDate: z.date().optional(),
  trialEndDate: z.date().optional(),
  isActive: z.boolean().default(true),
  isAutoRenew: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
