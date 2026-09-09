import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { CART_COUPON } from '@vubon/shared-constants/src/business/cart/cart-coupon.constants';
import { Cart } from './cart.types';

export interface CartCoupon extends BaseEntity {
  couponId: string;
  cartId: string;
  cart: Cart;
  code: string;
  type: keyof typeof CART_COUPON.DISCOUNT | string;
  value: number;
  discountAmount: Money;
  status: keyof typeof CART_COUPON.STATUS | string;
  appliedAt: Date;
  expiresAt?: Date;
  minOrderAmount?: Money;
  maxDiscountAmount?: Money;
  isStackable: boolean;
  metadata: Record<string, unknown>;
}
