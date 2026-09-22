import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PaymentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(paymentId: string) {
    super(`Payment not found: ${paymentId}`, { paymentId });
  }
}

export class PaymentFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PAYMENT_FAILED;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Payment failed: ${reason}`, { reason });
  }
}
