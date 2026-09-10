import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { DELIVERY_STATUS } from '@vubon/shared-constants/src/logistics/delivery-status.constants';

const deliveryStatusKeys = Object.keys(DELIVERY_STATUS) as [string, ...string[]];

export const DeliveryStatusSchema = StatusSchema.extend({
  status: z.enum(deliveryStatusKeys),
  category: z.literal('delivery'),
  isPending: z.boolean().default(false),
  isAssigned: z.boolean().default(false),
  isInTransit: z.boolean().default(false),
  isOutForDelivery: z.boolean().default(false),
  isDelivered: z.boolean().default(false),
  isReturned: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isFailed: z.boolean().default(false),
});

export const DeliveryStatusEnumSchema = z.enum(deliveryStatusKeys);
