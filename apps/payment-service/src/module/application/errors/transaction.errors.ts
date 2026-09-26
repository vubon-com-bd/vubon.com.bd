import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TransactionOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.TRANSACTION_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Transaction operation failed: ${reason}`, { reason });
  }
}

export class TransactionNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.TRANSACTION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(transactionId: string) {
    super(`Transaction not found: ${transactionId}`, { transactionId });
  }
}
