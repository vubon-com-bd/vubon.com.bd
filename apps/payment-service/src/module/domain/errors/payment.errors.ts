/**
 * Payment Domain Errors
 * @module payment-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class PaymentNotFoundError extends NotFoundError {
  constructor(paymentId: string) {
    super('Payment', paymentId);
    this.name = 'PaymentNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class PaymentAlreadyCompletedError extends ConflictError {
  constructor(paymentId: string) {
    super(`Payment "${paymentId}" is already completed`, 'paymentId');
    this.name = 'PaymentAlreadyCompletedError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidPaymentStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidPaymentStatusError';
  }
}

export class InvalidPaymentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidPaymentTypeError';
  }
}

export class PaymentAmountMismatchError extends ValidationError {
  constructor(expected: number, actual: number, currency: string) {
    super(
      `Payment amount mismatch: expected ${expected}, actual ${actual} ${currency}`,
      'amount',
    );
    this.name = 'PaymentAmountMismatchError';
  }
}

export class PaymentAmountExceededError extends ValidationError {
  constructor(amount: number, max: number, currency: string) {
    super(`Payment amount ${amount} exceeds maximum ${max} ${currency}`, 'amount');
    this.name = 'PaymentAmountExceededError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidPaymentStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, paymentId?: string) {
    super(
      `Cannot transition payment status from "${from}" to "${to}"`,
      'INVALID_PAYMENT_STATUS_TRANSITION',
      { from, to, paymentId },
    );
    this.name = 'InvalidPaymentStatusTransitionError';
  }
}

export class PaymentCannotBeCancelledError extends BusinessRuleError {
  constructor(paymentId: string, status: string) {
    super(
      `Payment "${paymentId}" cannot be cancelled in status "${status}"`,
      'PAYMENT_CANNOT_BE_CANCELLED',
      { paymentId, status },
    );
    this.name = 'PaymentCannotBeCancelledError';
  }
}

export class PaymentExpiredError extends BusinessRuleError {
  constructor(paymentId: string, expiredAt: string) {
    super(`Payment "${paymentId}" expired at ${expiredAt}`, 'PAYMENT_EXPIRED', {
      paymentId,
      expiredAt,
    });
    this.name = 'PaymentExpiredError';
  }
}

export class PaymentAlreadyRefundedError extends BusinessRuleError {
  constructor(paymentId: string, refundedAmount: number, currency: string) {
    super(
      `Payment "${paymentId}" already fully refunded (${refundedAmount} ${currency})`,
      'PAYMENT_ALREADY_REFUNDED',
      { paymentId, refundedAmount },
    );
    this.name = 'PaymentAlreadyRefundedError';
  }
}

export class PaymentCaptureWindowExpiredError extends BusinessRuleError {
  constructor(paymentId: string, capturedWindowHours: number) {
    super(
      `Payment "${paymentId}" capture window (${capturedWindowHours}h) expired`,
      'PAYMENT_CAPTURE_WINDOW_EXPIRED',
      { paymentId, capturedWindowHours },
    );
    this.name = 'PaymentCaptureWindowExpiredError';
  }
}
