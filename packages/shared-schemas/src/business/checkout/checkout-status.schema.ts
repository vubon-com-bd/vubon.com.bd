import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/src/business/checkout/checkout-status.constants';

const checkoutStatusKeys = Object.keys(CHECKOUT_STATUS) as [string, ...string[]];

export const CheckoutStatusSchema = StatusSchema.extend({
  status: z.enum(checkoutStatusKeys),
  category: z.literal('checkout'),
  isActive: z.boolean().default(true),
  isComplete: z.boolean().default(false),
  isAbandoned: z.boolean().default(false),
  isExpired: z.boolean().default(false),
});

export const CheckoutStatusEnumSchema = z.enum(checkoutStatusKeys);
