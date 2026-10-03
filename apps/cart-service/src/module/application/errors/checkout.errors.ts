/**
 * Checkout application errors
 * @module cart-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CheckoutNotAllowedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 409;
  constructor(cartId: string, reason: string) {
    super(`Checkout not allowed for cart "${cartId}": ${reason}`, { cartId, reason });
    this.name = 'CheckoutNotAllowedError';
  }
}
