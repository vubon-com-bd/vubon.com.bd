import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class OrderOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Order operation failed: ${reason}`, { reason });
  }
}

export class OrderNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(orderId: string) {
    super(`Order not found: ${orderId}`, { orderId });
  }
}

export class OrderValidationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(field: string, reason: string) {
    super(`Validation failed for ${field}: ${reason}`, { field, reason });
  }
}
