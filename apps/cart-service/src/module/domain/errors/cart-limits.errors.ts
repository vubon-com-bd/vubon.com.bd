/**
 * Cart Limits Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CartItemLimitExceededError extends BusinessRuleError {
  constructor(cartId: string, max: number, current: number) {
    super(
      `Cart "${cartId}" item limit exceeded: max ${max}, current ${current}`,
      'CART_ITEM_LIMIT_EXCEEDED',
      { cartId, max, current },
    );
    this.name = 'CartItemLimitExceededError';
  }
}

export class CartQuantityLimitExceededError extends BusinessRuleError {
  constructor(productId: string, max: number, requested: number) {
    super(
      `Quantity limit exceeded for "${productId}": max ${max}, requested ${requested}`,
      'CART_QUANTITY_LIMIT_EXCEEDED',
      { productId, max, requested },
    );
    this.name = 'CartQuantityLimitExceededError';
  }
}

export class CartCouponLimitExceededError extends BusinessRuleError {
  constructor(cartId: string, max: number) {
    super(
      `Cart "${cartId}" coupon limit exceeded: max ${max}`,
      'CART_COUPON_LIMIT_EXCEEDED',
      { cartId, max },
    );
    this.name = 'CartCouponLimitExceededError';
  }
}

export class CartVoucherLimitExceededError extends BusinessRuleError {
  constructor(cartId: string, max: number) {
    super(
      `Cart "${cartId}" voucher limit exceeded: max ${max}`,
      'CART_VOUCHER_LIMIT_EXCEEDED',
      { cartId, max },
    );
    this.name = 'CartVoucherLimitExceededError';
  }
}

export class CartTotalLimitExceededError extends BusinessRuleError {
  constructor(cartId: string, max: number, current: number) {
    super(
      `Cart "${cartId}" total exceeds max ${max}, current ${current}`,
      'CART_TOTAL_LIMIT_EXCEEDED',
      { cartId, max, current },
    );
    this.name = 'CartTotalLimitExceededError';
  }
}
