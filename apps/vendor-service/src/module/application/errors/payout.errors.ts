/**
 * Vendor Payout Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class PayoutNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(payoutId: string) {
    super('VendorPayout', payoutId);
    this.name = 'PayoutNotFoundApplicationError';
  }
}

export class SettlementNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(settlementId: string) {
    super('VendorSettlement', settlementId);
    this.name = 'SettlementNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class PayoutValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PayoutValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class PayoutRequestError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Payout request for vendor "${vendorId}" failed: ${reason}`, 'RequestPayout');
    this.name = 'PayoutRequestError';
  }
}

export class PayoutProcessingError extends CommandError {
  constructor(payoutId: string, reason: string) {
    super(`Payout "${payoutId}" processing failed: ${reason}`, 'ProcessPayout');
    this.name = 'PayoutProcessingError';
  }
}

export class PayoutApprovalError extends CommandError {
  constructor(payoutId: string, reason: string) {
    super(`Payout "${payoutId}" approval failed: ${reason}`, 'ApprovePayout');
    this.name = 'PayoutApprovalError';
  }
}

export class PayoutRejectionError extends CommandError {
  constructor(payoutId: string, reason: string) {
    super(`Payout "${payoutId}" rejection failed: ${reason}`, 'RejectPayout');
    this.name = 'PayoutRejectionError';
  }
}

// ─── Query errors (400) ───────────────────
export class PayoutQueryError extends QueryError {
  constructor(reason: string) {
    super(`Payout query failed: ${reason}`, 'PayoutQuery');
    this.name = 'PayoutQueryError';
  }
}

// ─── Conflict (409) ───────────────────────
export class PayoutIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'PayoutIdempotencyConflictError';
  }
}

export class PayoutAlreadyProcessedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(payoutId: string, status: string) {
    super(`Payout "${payoutId}" already processed (status: ${status})`, {
      payoutId,
      status,
    });
    this.name = 'PayoutAlreadyProcessedApplicationError';
  }
}

// ─── Service unavailable (503) ────────────
export class PaymentGatewayUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(gateway: string, reason?: string) {
    super(`Payment gateway "${gateway}" unavailable${reason ? `: ${reason}` : ''}`, {
      gateway,
      reason,
    });
    this.name = 'PaymentGatewayUnavailableError';
  }
}
