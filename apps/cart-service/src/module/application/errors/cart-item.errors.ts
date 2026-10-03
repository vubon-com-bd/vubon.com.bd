/**
 * Cart item application errors
 * @module cart-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CartItemNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(itemId: string) {
    super(`Cart item "${itemId}" not found`, { itemId });
    this.name = 'CartItemNotFoundApplicationError';
  }
}

export class CartItemOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(itemId: string, reason: string) {
    super(`Cart item operation failed for "${itemId}": ${reason}`, { itemId, reason });
    this.name = 'CartItemOperationFailedError';
  }
}
