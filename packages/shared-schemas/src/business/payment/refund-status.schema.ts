import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { PAYMENT_REFUND } from '@vubon/shared-constants/src/business/payment/payment-refund.constants';

const refundStatusKeys = Object.keys(PAYMENT_REFUND.STATUS) as [string, ...string[]];

export const RefundStatusSchema = StatusSchema.extend({
  status: z.enum(refundStatusKeys),
  category: z.literal('refund'),
});

export const RefundStatusEnumSchema = z.enum(refundStatusKeys);
