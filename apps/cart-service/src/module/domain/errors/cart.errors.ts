import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CartNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(cartId: string) {
    super(`Cart not found: ${cartId}`, { cartId });
  }
}

export class CartAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(userId: string) {
    super(`Active cart already exists for user: ${userId}`, { userId });
  }
}

export class CartEmptyError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor() {
    super('Cart is empty');
  }
}
