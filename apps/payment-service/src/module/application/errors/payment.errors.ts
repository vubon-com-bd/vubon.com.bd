/**
 * Payment Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ───────────────────────
export class PaymentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(paymentId: string) {
    super('Payment', paymentId);
    this.name = 'PaymentNotFoundApplicationError';
  }
}

// ─── Command errors (400) ──────────────────
export class PaymentInitiationError extends CommandError {
  constructor(reason: string, commandId?: string) {
    super(`Payment initiation failed: ${reason}`, 'InitiatePayment', commandId);
    this.name = 'PaymentInitiationError';
  }
}

export class PaymentCaptureError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Payment capture failed for "${paymentId}": ${reason}`, 'CapturePayment', paymentId);
    this.name = 'PaymentCaptureError';
  }
}

export class PaymentConfirmationError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(
      `Payment confirmation failed for "${paymentId}": ${reason}`,
      'ConfirmPayment',
      paymentId,
    );
    this.name = 'PaymentConfirmationError';
  }
}

export class PaymentCancellationError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(
      `Payment cancellation failed for "${paymentId}": ${reason}`,
      'CancelPayment',
      paymentId,
    );
    this.name = 'PaymentCancellationError';
  }
}

export class PaymentRetryError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Payment retry failed for "${paymentId}": ${reason}`, 'RetryPayment', paymentId);
    this.name = 'PaymentRetryError';
  }
}

export class PaymentVerificationError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(
      `Payment verification failed for "${paymentId}": ${reason}`,
      'VerifyPayment',
      paymentId,
    );
    this.name = 'PaymentVerificationError';
  }
}

// ─── Conflict (409) ────────────────────────
export class PaymentIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'PaymentIdempotencyConflictError';
  }
}

// ─── Service unavailable (503) ─────────────
export class PaymentServiceUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(service: string, reason?: string) {
    super(`Payment service "${service}" unavailable${reason ? `: ${reason}` : ''}`, {
      service,
      reason,
    });
    this.name = 'PaymentServiceUnavailableError';
  }
}

// ─── Validation (422) ──────────────────────
export class PaymentValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PaymentValidationApplicationError';
  }
}
