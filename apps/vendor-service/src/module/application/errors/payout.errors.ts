/**
 * Application-level payout errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PayoutNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_PAYOUT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(payoutId: string) {
    super(`Payout "${payoutId}" not found`, { payoutId });
    this.name = 'PayoutNotFoundError';
  }
}

export class PayoutNotProcessableError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_PAYOUT_NOT_ALLOWED;
  readonly httpStatus = 400;
  constructor(payoutId: string, status: string) {
    super(
      `Payout "${payoutId}" cannot be processed in status "${status}"`,
      { payoutId, status },
    );
    this.name = 'PayoutNotProcessableError';
  }
}

export class InsufficientBalanceError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_PAYOUT_NOT_ALLOWED;
  readonly httpStatus = 422;
  constructor(requested: number, available: number, currency: string) {
    super(
      `Insufficient balance: requested ${requested} ${currency}, available ${available} ${currency}`,
      { requested, available, currency },
    );
    this.name = 'InsufficientBalanceError';
  }
}

export class PayoutLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_PAYOUT_LIMIT_EXCEEDED;
  readonly httpStatus = 422;
  constructor(kind: 'min' | 'max' | 'daily-count', value: number, limit: number) {
    super(
      `Payout ${kind} limit exceeded (${value} vs ${limit})`,
      { kind, value, limit },
    );
    this.name = 'PayoutLimitExceededError';
  }
}

export class BankAccountNotVerifiedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_PAYOUT_NOT_ALLOWED;
  readonly httpStatus = 403;
  constructor(vendorId: string) {
    super(
      `Bank account not verified for vendor "${vendorId}"`,
      { vendorId },
    );
    this.name = 'BankAccountNotVerifiedError';
  }
}

export class SettlementNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SETTLEMENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(settlementId: string) {
    super(`Settlement "${settlementId}" not found`, { settlementId });
    this.name = 'SettlementNotFoundError';
  }
}

export class SettlementNotDueError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SETTLEMENT_NOT_DUE;
  readonly httpStatus = 400;
  constructor(settlementId: string) {
    super(`Settlement "${settlementId}" is not yet due`, { settlementId });
    this.name = 'SettlementNotDueError';
  }
}
