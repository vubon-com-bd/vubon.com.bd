import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class AbandonedCartNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(id: string) {
    super(`Abandoned cart not found: ${id}`, { id });
  }
}

export class CartNotAbandonedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(cartId: string) {
    super(`Cart is not abandoned: ${cartId}`, { cartId });
  }
}
