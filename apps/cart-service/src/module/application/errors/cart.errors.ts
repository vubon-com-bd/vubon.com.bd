/**
 * Cart application errors
 * @module cart-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CartNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(cartId: string) {
    super(`Cart "${cartId}" not found`, { cartId });
    this.name = 'CartNotFoundApplicationError';
  }
}

export class CartOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(cartId: string, reason: string) {
    super(`Cart operation failed for "${cartId}": ${reason}`, { cartId, reason });
    this.name = 'CartOperationFailedError';
  }
}
