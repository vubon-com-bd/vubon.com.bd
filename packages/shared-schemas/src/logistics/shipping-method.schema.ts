import { z } from 'zod';
import { SHIPPING_METHOD } from '@vubon/shared-constants/src/logistics/shipping-method.constants';

const shippingMethodTypeKeys = Object.keys(SHIPPING_METHOD.TYPES) as [string, ...string[]];
const shippingCarrierKeys = Object.keys(SHIPPING_METHOD.SHIPPING_CARRIERS) as [string, ...string[]];

export const ShippingMethodSchema = z.object({
  type: z.enum(shippingMethodTypeKeys),
  category: z.literal('shipping'),
  carrier: z.enum(shippingCarrierKeys),
  estimatedDays: z.number().int().min(1),
  cost: z.number().min(0),
  isEconomy: z.boolean().default(false),
  isStandard: z.boolean().default(false),
  isExpress: z.boolean().default(false),
  isPriority: z.boolean().default(false),
  isOvernight: z.boolean().default(false),
  isSameDay: z.boolean().default(false),
  isInternational: z.boolean().default(false),
});

export const ShippingMethodEnumSchema = z.enum(shippingMethodTypeKeys);
