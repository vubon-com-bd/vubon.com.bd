import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants/src/business/payment/payment-status.constants';

const paymentStatusKeys = Object.keys(PAYMENT_STATUS) as [string, ...string[]];

export const PaymentStatusSchema = StatusSchema.extend({
  status: z.enum(paymentStatusKeys),
  category: z.literal('payment'),
  isPending: z.boolean().default(false),
  isProcessing: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isRefunded: z.boolean().default(false),
  isAuthorized: z.boolean().default(false),
  isCaptured: z.boolean().default(false),
});

export const PaymentStatusEnumSchema = z.enum(paymentStatusKeys);
