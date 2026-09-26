import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class OrderItemNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(itemId: string) {
    super(`Order item not found: ${itemId}`, { itemId });
  }
}

export class InvalidQuantityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}`, { quantity });
  }
}

export class ItemAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(productId: string) {
    super(`Item already exists in order: ${productId}`, { productId });
  }
}
