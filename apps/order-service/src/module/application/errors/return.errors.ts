import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ReturnOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Return operation failed: ${reason}`, { reason });
  }
}

export class ReturnNotAllowedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(orderId: string, reason: string) {
    super(`Return not allowed for order ${orderId}: ${reason}`, { orderId, reason });
  }
}
