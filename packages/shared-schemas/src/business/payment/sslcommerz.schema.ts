import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { SSLCOMMERZ } from '@vubon/shared-constants/src/business/payment/sslcommerz.constants';

const sslcommerzTypeKeys = Object.keys(SSLCOMMERZ.TYPES) as [string, ...string[]];

export const SSLCommerzSchema = BaseSchema.extend({
  sslId: z.string().uuid(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  sessionKey: z.string(),
  type: z.enum(sslcommerzTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  validationId: z.string().optional(),
  cardType: z.string().optional(),
  cardNumber: z.string().optional(),
  bankTransactionId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
