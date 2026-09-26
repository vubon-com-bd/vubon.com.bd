import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class PaymentOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Payment operation failed: ${reason}`, { reason });
  }
}

export class PaymentNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(paymentId: string) {
    super(`Payment not found: ${paymentId}`, { paymentId });
  }
}

export class PaymentAlreadyCompletedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_ALREADY_COMPLETED;
  readonly httpStatus = 409;
  constructor(paymentId: string) {
    super(`Payment already completed: ${paymentId}`, { paymentId });
  }
}
