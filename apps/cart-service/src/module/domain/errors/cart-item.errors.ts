import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CartItemNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(itemId: string) {
    super(`Cart item not found: ${itemId}`, { itemId });
  }
}

export class CartItemAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(productId: string) {
    super(`Item already in cart: ${productId}`, { productId });
  }
}

export class InvalidQuantityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}`, { quantity });
  }
}
