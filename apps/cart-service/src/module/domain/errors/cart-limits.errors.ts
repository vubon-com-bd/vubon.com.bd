/**
 * Cart limits domain errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CartLimitExceededError extends BusinessRuleError {
  constructor(max: number, current: number) {
    super(
      `Cart item limit exceeded: max ${max}, current ${current}`,
      'CART_LIMIT_EXCEEDED',
      { max, current },
    );
    this.name = 'CartLimitExceededError';
  }
}

export class ItemLimitExceededError extends BusinessRuleError {
  constructor(max: number, requested: number) {
    super(
      `Item quantity limit exceeded: max ${max}, requested ${requested}`,
      'ITEM_LIMIT_EXCEEDED',
      { max, requested },
    );
    this.name = 'ItemLimitExceededError';
  }
}
