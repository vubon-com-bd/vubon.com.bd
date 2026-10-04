/**
 * Transaction Application Errors
 * @module payment-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class TransactionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(transactionId: string) {
    super('Transaction', transactionId);
    this.name = 'TransactionNotFoundApplicationError';
  }
}

export class TransactionRecordingError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Transaction recording failed: ${reason}`, 'TransactionRecord', undefined);
    void paymentId;
    this.name = 'TransactionRecordingError';
  }
}

export class TransactionValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'TransactionValidationError';
  }
}
