import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CancelNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(cancelId: string) {
    super(`Cancel record not found: ${cancelId}`, { cancelId });
  }
}

export class CancelWindowExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 410;

  constructor(orderId: string) {
    super(`Cancel window expired for order: ${orderId}`, { orderId });
  }
}

export class CannotCancelError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(orderId: string, reason: string) {
    super(`Cannot cancel order ${orderId}: ${reason}`, { orderId, reason });
  }
}

export class CancelAlreadyProcessedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 409;

  constructor(cancelId: string) {
    super(`Cancel already processed: ${cancelId}`, { cancelId });
  }
}
