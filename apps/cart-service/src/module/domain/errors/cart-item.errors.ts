/**
 * Cart Item Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartItemNotFoundError extends NotFoundError {
  constructor(cartItemId: string) {
    super('CartItem', cartItemId);
    this.name = 'CartItemNotFoundError';
  }
}

export class CartItemAlreadyExistsError extends ConflictError {
  constructor(cartId: string, productId: string, variantId?: string) {
    super(
      `Item "${productId}${variantId ? `:${variantId}` : ''}" already in cart "${cartId}"`,
      'productId',
    );
    this.name = 'CartItemAlreadyExistsError';
  }
}

export class InvalidCartItemStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cart item status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCartItemStatusError';
  }
}

export class InvalidQuantityError extends ValidationError {
  constructor(value: number, min: number, max: number) {
    super(`Quantity must be between ${min} and ${max}, got ${value}`, 'quantity');
    this.name = 'InvalidQuantityError';
  }
}

export class CartItemUnavailableError extends BusinessRuleError {
  constructor(productId: string) {
    super(
      `Product "${productId}" is not available`,
      'CART_ITEM_UNAVAILABLE',
      { productId },
    );
    this.name = 'CartItemUnavailableError';
  }
}

export class CartItemOutOfStockError extends BusinessRuleError {
  constructor(productId: string, available: number, requested: number) {
    super(
      `Product "${productId}" out of stock: available ${available}, requested ${requested}`,
      'CART_ITEM_OUT_OF_STOCK',
      { productId, available, requested },
    );
    this.name = 'CartItemOutOfStockError';
  }
}
