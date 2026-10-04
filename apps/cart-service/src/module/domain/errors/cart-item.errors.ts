/**
 * Cart item domain errors
 * @module cart-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CartItemNotFoundError extends NotFoundError {
  constructor(itemId: string) {
    super('CartItem', itemId);
    this.name = 'CartItemNotFoundError';
  }
}

export class InsufficientStockError extends BusinessRuleError {
  constructor(productId: string, requested: number, available: number) {
    super(
      `Insufficient stock for product "${productId}": requested ${requested}, available ${available}`,
      'INSUFFICIENT_STOCK',
      { productId, requested, available },
    );
    this.name = 'InsufficientStockError';
  }
}

export class MaxQuantityExceededError extends BusinessRuleError {
  constructor(max: number, requested: number) {
    super(
      `Quantity ${requested} exceeds maximum ${max} per item`,
      'MAX_QUANTITY_EXCEEDED',
      { max, requested },
    );
    this.name = 'MaxQuantityExceededError';
  }
}

export class InvalidCartItemStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cart item status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCartItemStatusError';
  }
}

export class InvalidQuantityError extends ValidationError {
  constructor(message: string) {
    super(message, 'quantity');
    this.name = 'InvalidQuantityError';
  }
}
