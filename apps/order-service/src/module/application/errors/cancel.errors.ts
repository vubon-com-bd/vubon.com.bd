import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class CancelOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Cancel operation failed: ${reason}`, { reason });
  }
}

export class CancelNotAllowedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(orderId: string, reason: string) {
    super(`Cancel not allowed for order ${orderId}: ${reason}`, { orderId, reason });
  }
}
