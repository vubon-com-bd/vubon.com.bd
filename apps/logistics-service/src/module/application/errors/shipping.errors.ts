import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ShippingRateFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Shipping rate failed: ${reason}`, { reason });
  }
}

export class ShippingMethodNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 404;

  constructor(method: string) {
    super(`Shipping method not found: ${method}`, { method });
  }
}
