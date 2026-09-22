import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class RefundNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(refundId: string) {
    super(`Refund not found: ${refundId}`, { refundId });
  }
}

export class RefundWindowExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(paymentId: string) {
    super(`Refund window expired for payment: ${paymentId}`, { paymentId });
  }
}
