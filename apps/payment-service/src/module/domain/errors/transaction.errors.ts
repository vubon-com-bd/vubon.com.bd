/**
 * Transaction Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class TransactionNotFoundError extends NotFoundError {
  constructor(transactionId: string) {
    super('Transaction', transactionId);
    this.name = 'TransactionNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class TransactionConflictError extends ConflictError {
  constructor(reference: string) {
    super(`Transaction with reference "${reference}" already exists`, 'reference');
    this.name = 'TransactionConflictError';
  }
}

// ─── Validation (422) ──────────────────────
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

// ─── Business Rule (400) ───────────────────
export class InvalidTransactionStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, transactionId?: string) {
    super(
      `Cannot transition transaction status from "${from}" to "${to}"`,
      'INVALID_TRANSACTION_STATUS_TRANSITION',
      { from, to, transactionId },
    );
    this.name = 'InvalidTransactionStatusTransitionError';
  }
}

export class TransactionRetryLimitExceededError extends BusinessRuleError {
  constructor(transactionId: string, maxRetries: number) {
    super(
      `Transaction "${transactionId}" exceeded max retries (${maxRetries})`,
      'TRANSACTION_RETRY_LIMIT_EXCEEDED',
      { transactionId, maxRetries },
    );
    this.name = 'TransactionRetryLimitExceededError';
  }
}
