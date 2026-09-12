import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PAYPAL } from '@vubon/shared-constants/src/business/payment/paypal.constants';

const paypalTypeKeys = Object.keys(PAYPAL.TYPES) as [string, ...string[]];

export const PaypalSchema = BaseSchema.extend({
  paypalId: z.string().uuid(),
  paymentId: z.string().uuid(),
  orderId: z.string(),
  type: z.enum(paypalTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  payerId: z.string().optional(),
  paymentToken: z.string().optional(),
  transactionId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
