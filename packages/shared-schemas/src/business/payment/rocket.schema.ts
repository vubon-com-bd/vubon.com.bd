import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ROCKET } from '@vubon/shared-constants/src/business/payment/rocket.constants';

const rocketTypeKeys = Object.keys(ROCKET.TYPES) as [string, ...string[]];

export const RocketSchema = BaseSchema.extend({
  rocketId: z.string().uuid(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  type: z.enum(rocketTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  pin: z.string().optional(),
  referenceId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
