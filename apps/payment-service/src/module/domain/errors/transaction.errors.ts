import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TransactionNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(transactionId: string) {
    super(`Transaction not found: ${transactionId}`, { transactionId });
  }
}

export class TransactionConflictError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(reason: string) {
    super(`Transaction conflict: ${reason}`, { reason });
  }
}
