/**
 * CartLimitsService — Enforces cart-level limits
 * @module cart-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CartLimitsConfig {
  readonly maxItems: number;
  readonly maxQuantityPerItem: number;
  readonly minQuantityPerItem: number;
  readonly maxCoupons: number;
  readonly maxVouchers: number;
  readonly maxTotal?: number;
}

export const DEFAULT_CART_LIMITS: CartLimitsConfig = {
  maxItems: 100,
  maxQuantityPerItem: 999,
  minQuantityPerItem: 1,
  maxCoupons: 1,
  maxVouchers: 1,
};

export class CartLimitsService {
  static assertCanAddItem(
    cart: CartEntity,
    items: readonly CartItemEntity[],
    config: CartLimitsConfig = DEFAULT_CART_LIMITS,
  ): void {
    if (items.length >= config.maxItems) {
      throw new BusinessRuleError(
        `Cart item limit exceeded: max ${config.maxItems}`,
        'CART_ITEM_LIMIT_EXCEEDED',
        { cartId: cart.id, max: config.maxItems, current: items.length },
      );
    }
  }

  static assertQuantityWithinLimits(
    quantity: number,
    config: CartLimitsConfig = DEFAULT_CART_LIMITS,
  ): void {
    if (
      !Number.isInteger(quantity) ||
      quantity < config.minQuantityPerItem ||
      quantity > config.maxQuantityPerItem
    ) {
      throw new BusinessRuleError(
        `Quantity must be between ${config.minQuantityPerItem} and ${config.maxQuantityPerItem}`,
        'QUANTITY_OUT_OF_RANGE',
        {
          quantity,
          min: config.minQuantityPerItem,
          max: config.maxQuantityPerItem,
        },
      );
    }
  }

  static assertCouponLimit(
    appliedCouponCount: number,
    config: CartLimitsConfig = DEFAULT_CART_LIMITS,
  ): void {
    if (appliedCouponCount >= config.maxCoupons) {
      throw new BusinessRuleError(
        `Cart coupon limit exceeded: max ${config.maxCoupons}`,
        'CART_COUPON_LIMIT_EXCEEDED',
        { max: config.maxCoupons, current: appliedCouponCount },
      );
    }
  }

  static assertVoucherLimit(
    appliedVoucherCount: number,
    config: CartLimitsConfig = DEFAULT_CART_LIMITS,
  ): void {
    if (appliedVoucherCount >= config.maxVouchers) {
      throw new BusinessRuleError(
        `Cart voucher limit exceeded: max ${config.maxVouchers}`,
        'CART_VOUCHER_LIMIT_EXCEEDED',
        { max: config.maxVouchers, current: appliedVoucherCount },
      );
    }
  }

  static assertTotalLimit(
    total: number,
    config: CartLimitsConfig = DEFAULT_CART_LIMITS,
  ): void {
    if (config.maxTotal !== undefined && total > config.maxTotal) {
      throw new BusinessRuleError(
        `Cart total exceeds max ${config.maxTotal}`,
        'CART_TOTAL_LIMIT_EXCEEDED',
        { max: config.maxTotal, current: total },
      );
    }
  }
}
