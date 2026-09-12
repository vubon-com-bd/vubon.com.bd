import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { CART_COUPON } from '@vubon/shared-constants/src/business/cart/cart-coupon.constants';

const cartCouponStatusKeys = Object.keys(CART_COUPON.STATUS) as [string, ...string[]];
const cartCouponDiscountKeys = Object.keys(CART_COUPON.DISCOUNT) as [string, ...string[]];

export const CartCouponSchema = BaseSchema.extend({
  couponId: z.string().uuid(),
  cartId: z.string().uuid(),
  code: z.string().min(3).max(50),
  type: z.enum(cartCouponDiscountKeys),
  value: z.number().min(0).max(100),
  discountAmount: MoneySchema,
  status: z.enum(cartCouponStatusKeys),
  appliedAt: z.date(),
  expiresAt: z.date().optional(),
  minOrderAmount: MoneySchema.optional(),
  maxDiscountAmount: MoneySchema.optional(),
  isStackable: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
