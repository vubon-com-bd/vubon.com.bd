import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class RefundOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.REFUND_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Refund operation failed: ${reason}`, { reason });
  }
}

export class RefundNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.REFUND_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(refundId: string) {
    super(`Refund not found: ${refundId}`, { refundId });
  }
}
