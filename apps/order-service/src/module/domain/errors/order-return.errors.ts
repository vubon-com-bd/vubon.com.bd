import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ReturnNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(returnId: string) {
    super(`Return record not found: ${returnId}`, { returnId });
  }
}

export class ReturnWindowExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 410;

  constructor(orderId: string) {
    super(`Return window expired for order: ${orderId}`, { orderId });
  }
}

export class CannotReturnError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(orderId: string, reason: string) {
    super(`Cannot return order ${orderId}: ${reason}`, { orderId, reason });
  }
}

export class ReturnAlreadyProcessedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 409;

  constructor(returnId: string) {
    super(`Return already processed: ${returnId}`, { returnId });
  }
}
