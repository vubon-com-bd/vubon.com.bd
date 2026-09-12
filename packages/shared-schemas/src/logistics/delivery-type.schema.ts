import { z } from 'zod';
import { DELIVERY_TYPE } from '@vubon/shared-constants/src/logistics/delivery-type.constants';

const deliveryTypeKeys = Object.keys(DELIVERY_TYPE) as [string, ...string[]];

export const DeliveryTypeSchema = z.object({
  type: z.enum(deliveryTypeKeys),
  category: z.literal('delivery'),
  isStandard: z.boolean().default(false),
  isExpress: z.boolean().default(false),
  isSameDay: z.boolean().default(false),
  isNextDay: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isInstant: z.boolean().default(false),
  isEconomy: z.boolean().default(false),
  isPriority: z.boolean().default(false),
});

export const DeliveryTypeEnumSchema = z.enum(deliveryTypeKeys);
