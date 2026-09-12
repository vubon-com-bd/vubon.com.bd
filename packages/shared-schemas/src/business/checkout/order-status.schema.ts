import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { ORDER_STATUS } from '@vubon/shared-constants/src/business/checkout/order-status.constants';

const orderStatusKeys = Object.keys(ORDER_STATUS) as [string, ...string[]];

export const OrderStatusSchema = StatusSchema.extend({
  status: z.enum(orderStatusKeys),
  category: z.literal('order'),
  isPending: z.boolean().default(false),
  isProcessing: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isReturned: z.boolean().default(false),
});

export const OrderStatusEnumSchema = z.enum(orderStatusKeys);
