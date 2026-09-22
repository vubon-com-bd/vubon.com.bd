import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AddressOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Address operation failed: ${reason}`, { reason });
  }
}

export class AddressNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(addressId: string) {
    super(`Address not found: ${addressId}`, { addressId });
  }
}

export class AddressLimitExceededAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(limit: number) {
    super(`Address limit exceeded: max ${limit}`, { limit });
  }
}
