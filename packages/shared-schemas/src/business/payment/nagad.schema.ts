import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { NAGAD } from '@vubon/shared-constants/src/business/payment/nagad.constants';

const nagadTypeKeys = Object.keys(NAGAD.TYPES) as [string, ...string[]];

export const NagadSchema = BaseSchema.extend({
  nagadId: z.string().uuid(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  type: z.enum(nagadTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  merchantId: z.string().optional(),
  nagadOrderId: z.string().optional(),
  paymentRefId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
