/**
 * Cart Core Types
 * @module shared-types/business/cart
 *
 * Cart entity + aggregator।
 */

import type { CartId, UserId, Money, CouponId, VoucherId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { CartStatusValue } from './cart-status.types';
import type { CartItem } from './cart-item.types';
import type { CouponPublic } from './coupon.types';
import type { VoucherPublic } from './voucher.types';

export type CartTypeValue = 'guest' | 'user' | 'wishlist' | 'saved' | 'subscription';

export interface Cart extends BaseEntity<CartId> {
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly type: CartTypeValue;
  readonly status: CartStatusValue;
  readonly items: readonly CartItem[];
  readonly itemCount: number;
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
  readonly couponId?: CouponId;
  readonly coupon?: CouponPublic;
  readonly voucherId?: VoucherId;
  readonly voucher?: VoucherPublic;
  readonly notes?: string;
  readonly expiresAt: string;
  readonly lastActivityAt: string;
}

export interface CartPublic {
  readonly id: CartId;
  readonly type: CartTypeValue;
  readonly status: CartStatusValue;
  readonly items: readonly CartItem[];
  readonly itemCount: number;
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
  readonly coupon?: CouponPublic;
  readonly voucher?: VoucherPublic;
}

export interface CartSummary {
  readonly id: CartId;
  readonly itemCount: number;
  readonly total: Money;
  readonly currency: string;
}

export interface CartAddItemInput {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly attributes?: Readonly<Record<string, string>>;
}

export interface CartUpdateItemInput {
  readonly itemId: string;
  readonly quantity: number;
}

export interface CartApplyCouponInput {
  readonly code: string;
}

export interface CartApplyVoucherInput {
  readonly code: string;
}

export interface CartMergeInput {
  readonly guestCartId: CartId;
  readonly userId: UserId;
}

export interface CartTotals {
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
}
