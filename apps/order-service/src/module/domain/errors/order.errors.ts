import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class OrderNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(orderId: string) {
    super(`Order not found: ${orderId}`, { orderId });
  }
}

export class OrderAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 409;

  constructor(orderNumber: string) {
    super(`Order already exists: ${orderNumber}`, { orderNumber });
  }
}

export class InvalidOrderStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(status: string) {
    super(`Invalid order status: ${status}`, { status });
  }
}

export class InvalidStatusTransitionError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(from: string, to: string) {
    super(`Cannot transition order from '${from}' to '${to}'`, { from, to });
  }
}

export class OrderTotalMismatchError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(expected: string, actual: string) {
    super(`Order total mismatch: expected ${expected}, got ${actual}`, {
      expected,
      actual,
    });
  }
}
