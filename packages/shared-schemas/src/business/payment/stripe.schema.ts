import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { STRIPE } from '@vubon/shared-constants/src/business/payment/stripe.constants';

const stripeTypeKeys = Object.keys(STRIPE.TYPES) as [string, ...string[]];

export const StripeSchema = BaseSchema.extend({
  stripeId: z.string().uuid(),
  paymentId: z.string().uuid(),
  paymentIntentId: z.string(),
  type: z.enum(stripeTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  clientSecret: z.string(),
  customerId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  chargeId: z.string().optional(),
  webhookEvents: z.array(z.string()),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
