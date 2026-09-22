import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CheckoutNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(checkoutId: string) {
    super(`Checkout not found: ${checkoutId}`, { checkoutId });
  }
}

export class CheckoutExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 410;

  constructor(checkoutId: string) {
    super(`Checkout expired: ${checkoutId}`, { checkoutId });
  }
}

export class CheckoutIncompleteError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;

  constructor(step: string) {
    super(`Checkout incomplete at step: ${step}`, { step });
  }
}

export class InvalidCheckoutStepError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(step: string) {
    super(`Invalid checkout step: ${step}`, { step });
  }
}
