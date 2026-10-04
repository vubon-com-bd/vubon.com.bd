/**
 * Transaction domain errors
 * @module payment-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class TransactionNotFoundError extends NotFoundError {
  constructor(transactionId: string) {
    super('Transaction', transactionId);
    this.name = 'TransactionNotFoundError';
  }
}

export class InvalidTransactionTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid transaction type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidTransactionTypeError';
  }
}

export class InvalidTransactionStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid transaction status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTransactionStatusError';
  }
}

export class TransactionCannotBeReversedError extends BusinessRuleError {
  constructor(transactionId: string, status: string) {
    super(
      `Transaction "${transactionId}" cannot be reversed in status "${status}"`,
      'TRANSACTION_CANNOT_BE_REVERSED',
      { transactionId, status },
    );
    this.name = 'TransactionCannotBeReversedError';
  }
}

export class DuplicateIdempotencyKeyError extends BusinessRuleError {
  constructor(idempotencyKey: string, transactionId: string) {
    super(
      `Transaction with idempotency key "${idempotencyKey}" already exists: "${transactionId}"`,
      'DUPLICATE_IDEMPOTENCY_KEY',
      { idempotencyKey, transactionId },
    );
    this.name = 'DuplicateIdempotencyKeyError';
  }
}
