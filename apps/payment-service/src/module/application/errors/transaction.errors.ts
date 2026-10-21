/**
 * Transaction Application Errors
 * @module payment-service/application/errors
 *
 * ⚠️ Note: Application layer-এ class names-এ `Application` suffix ব্যবহার করা হয়,
 * কারণ domain/errors/transaction.errors-এও একই নামের কিছু class আছে।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

export class TransactionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(transactionId: string) {
    super('Transaction', transactionId);
    this.name = 'TransactionNotFoundApplicationError';
  }
}

export class TransactionCreationError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(
      `Failed to create transaction for payment "${paymentId}": ${reason}`,
      'CreateTransaction',
    );
    this.name = 'TransactionCreationError';
  }
}

export class TransactionReversalError extends CommandError {
  constructor(transactionId: string, reason: string) {
    super(`Failed to reverse transaction "${transactionId}": ${reason}`, 'ReverseTransaction');
    this.name = 'TransactionReversalError';
  }
}

/**
 * Renamed from `TransactionConflictError` → `TransactionApplicationConflictError`
 * to avoid collision with domain `TransactionConflictError`.
 */
export class TransactionApplicationConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(reference: string) {
    super(`Transaction with reference "${reference}" already exists`, { reference });
    this.name = 'TransactionApplicationConflictError';
  }
}

export class TransactionQueryError extends QueryError {
  constructor(reason: string) {
    super(`Transaction query failed: ${reason}`, 'TransactionQuery');
    this.name = 'TransactionQueryError';
  }
}
