/**
 * Cart checkout application errors
 * @module cart-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CartCheckoutNotEligibleError extends ApplicationError {
  readonly code = ERROR_CODE.CART_EMPTY;
  readonly httpStatus = 422;
  constructor(public readonly cartId: string, public readonly reason: string) {
    super(`Cart "${cartId}" is not eligible for checkout: ${reason}`, { cartId, reason });
    this.name = 'CartCheckoutNotEligibleError';
  }
}

export class CartCheckoutGuestNotAllowedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;
  constructor(public readonly cartId: string) {
    super(`Guest cart "${cartId}" cannot be checked out — login required`, { cartId });
    this.name = 'CartCheckoutGuestNotAllowedError';
  }
}
