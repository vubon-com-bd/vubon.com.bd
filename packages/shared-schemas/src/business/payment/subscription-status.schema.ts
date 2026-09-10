import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { PAYMENT_SUBSCRIPTION } from '@vubon/shared-constants/src/business/payment/payment-subscription.constants';

const subscriptionStatusKeys = Object.keys(PAYMENT_SUBSCRIPTION.STATUS) as [string, ...string[]];

export const SubscriptionStatusSchema = StatusSchema.extend({
  status: z.enum(subscriptionStatusKeys),
  category: z.literal('subscription'),
});

export const SubscriptionStatusEnumSchema = z.enum(subscriptionStatusKeys);
