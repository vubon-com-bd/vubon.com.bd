import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { CART_STATUS } from '@vubon/shared-constants/src/business/cart/cart-status.constants';

const cartStatusKeys = Object.keys(CART_STATUS) as [string, ...string[]];

export const CartStatusSchema = StatusSchema.extend({
  status: z.enum(cartStatusKeys),
  category: z.literal('cart'),
  isActive: z.boolean().default(true),
  isExpired: z.boolean().default(false),
  isAbandoned: z.boolean().default(false),
  isCheckedOut: z.boolean().default(false),
});

export const CartStatusEnumSchema = z.enum(cartStatusKeys);
