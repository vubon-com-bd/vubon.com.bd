import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class MethodOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_METHOD_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Payment method operation failed: ${reason}`, { reason });
  }
}

export class InvalidMethodError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_INVALID_METHOD;
  readonly httpStatus = 400;
  constructor(method: string) {
    super(`Invalid payment method: ${method}`, { method });
  }
}
