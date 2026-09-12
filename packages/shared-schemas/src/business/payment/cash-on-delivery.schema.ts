import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { CASH_ON_DELIVERY } from '@vubon/shared-constants/src/business/payment/cash-on-delivery.constants';

const cashOnDeliveryTypeKeys = Object.keys(CASH_ON_DELIVERY.TYPES) as [string, ...string[]];

export const CashOnDeliverySchema = BaseSchema.extend({
  codId: z.string().uuid(),
  paymentId: z.string().uuid(),
  type: z.enum(cashOnDeliveryTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  collectedBy: z.string().optional(),
  collectedAt: z.date().optional(),
  isCollected: z.boolean().default(false),
  collectionCharge: MoneySchema,
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
