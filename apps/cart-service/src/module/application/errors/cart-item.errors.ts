/**
 * CartItem Application Errors
 * @module cart-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ──────────────────────
export class CartItemNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(itemId: string) {
    super('CartItem', itemId);
    this.name = 'CartItemNotFoundApplicationError';
  }
}

// ─── Conflict (409) ───────────────────────
export class CartItemAlreadyExistsApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(cartId: string, productId: string, variantId?: string) {
    super(
      `Item "${productId}${variantId ? `:${variantId}` : ''}" already in cart "${cartId}"`,
      { cartId, productId, variantId },
    );
    this.name = 'CartItemAlreadyExistsApplicationError';
  }
}

// ─── Command errors (400) ─────────────────
export class AddItemError extends CommandError {
  constructor(productId: string, reason: string) {
    super(`Failed to add item "${productId}": ${reason}`, 'AddItem', undefined);
    void productId;
    this.name = 'AddItemError';
  }
}

export class UpdateItemError extends CommandError {
  constructor(itemId: string, reason: string) {
    super(`Failed to update item "${itemId}": ${reason}`, 'UpdateItem', undefined);
    void itemId;
    this.name = 'UpdateItemError';
  }
}

export class RemoveItemError extends CommandError {
  constructor(itemId: string, reason: string) {
    super(`Failed to remove item "${itemId}": ${reason}`, 'RemoveItem', undefined);
    void itemId;
    this.name = 'RemoveItemError';
  }
}

// ─── Business rules (400) ─────────────────
export class CartItemUnavailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 400;

  constructor(productId: string) {
    super(`Product "${productId}" is unavailable`, { productId });
    this.name = 'CartItemUnavailableApplicationError';
  }
}

export class CartItemOutOfStockApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 400;

  constructor(productId: string, available: number, requested: number) {
    super(
      `Product "${productId}" out of stock: available ${available}, requested ${requested}`,
      { productId, available, requested },
    );
    this.name = 'CartItemOutOfStockApplicationError';
  }
}

export class CartItemLimitExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(cartId: string, max: number, current: number) {
    super(`Cart "${cartId}" item limit exceeded: max ${max}, current ${current}`, {
      cartId,
      max,
      current,
    });
    this.name = 'CartItemLimitExceededApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class CartItemValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CartItemValidationApplicationError';
  }
}
