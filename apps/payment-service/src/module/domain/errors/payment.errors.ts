/**
 * Payment domain errors
 * @module payment-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class PaymentNotFoundError extends NotFoundError {
  constructor(paymentId: string) {
    super('Payment', paymentId);
    this.name = 'PaymentNotFoundError';
  }
}

export class PaymentAlreadyExistsError extends ConflictError {
  constructor(reference: string) {
    super(`Payment "${reference}" already exists`, 'reference');
    this.name = 'PaymentAlreadyExistsError';
  }
}

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

export class InvalidPaymentMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidPaymentMethodError';
  }
}

export class InvalidPaymentGatewayError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment gateway "${value}". Allowed: ${allowed.join(', ')}`, 'gateway');
    this.name = 'InvalidPaymentGatewayError';
  }
}

export class InvalidStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, paymentId?: string) {
    super(
      `Cannot transition payment status from "${from}" to "${to}"`,
      'INVALID_PAYMENT_STATUS_TRANSITION',
      { from, to, paymentId },
    );
    this.name = 'InvalidStatusTransitionError';
  }
}

export class PaymentAmountMismatchError extends BusinessRuleError {
  constructor(expected: number, actual: number, currency: string) {
    super(
      `Payment amount mismatch: expected ${expected} ${currency}, actual ${actual} ${currency}`,
      'PAYMENT_AMOUNT_MISMATCH',
      { expected, actual, currency },
    );
    this.name = 'PaymentAmountMismatchError';
  }
}

export class PaymentCannotBeRefundedError extends BusinessRuleError {
  constructor(paymentId: string, status: string, reason?: string) {
    super(
      `Payment "${paymentId}" cannot be refunded in status "${status}"${reason ? ` — ${reason}` : ''}`,
      'PAYMENT_CANNOT_BE_REFUNDED',
      { paymentId, status, reason },
    );
    this.name = 'PaymentCannotBeRefundedError';
  }
}

export class PaymentCannotBeCapturedError extends BusinessRuleError {
  constructor(paymentId: string, status: string) {
    super(
      `Payment "${paymentId}" cannot be captured in status "${status}"`,
      'PAYMENT_CANNOT_BE_CAPTURED',
      { paymentId, status },
    );
    this.name = 'PaymentCannotBeCapturedError';
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
    super(
      `Payment "${paymentId}" expired at ${expiredAt}`,
      'PAYMENT_EXPIRED',
      { paymentId, expiredAt },
    );
    this.name = 'PaymentExpiredError';
  }
}

export class PaymentAuthorizationWindowClosedError extends BusinessRuleError {
  constructor(paymentId: string, authorizedAt: string, windowHours: number) {
    super(
      `Payment "${paymentId}" capture window (${windowHours}h) closed. Authorized at ${authorizedAt}`,
      'PAYMENT_CAPTURE_WINDOW_CLOSED',
      { paymentId, authorizedAt, windowHours },
    );
    this.name = 'PaymentAuthorizationWindowClosedError';
  }
}

export class PaymentRetryLimitExceededError extends BusinessRuleError {
  constructor(paymentId: string, attempts: number, max: number) {
    super(
      `Payment "${paymentId}" retry limit exceeded (${attempts}/${max})`,
      'PAYMENT_RETRY_LIMIT_EXCEEDED',
      { paymentId, attempts, max },
    );
    this.name = 'PaymentRetryLimitExceededError';
  }
}

export class IdempotencyConflictError extends ConflictError {
  constructor(idempotencyKey: string, existingPaymentId: string) {
    super(
      `Idempotency key "${idempotencyKey}" already used for payment "${existingPaymentId}"`,
      'idempotencyKey',
    );
    this.name = 'IdempotencyConflictError';
  }
}

export class PaymentGatewayError extends BusinessRuleError {
  constructor(gateway: string, message: string, code?: string) {
    super(
      `Gateway "${gateway}" error${code ? ` [${code}]` : ''}: ${message}`,
      'PAYMENT_GATEWAY_ERROR',
      { gateway, code },
    );
    this.name = 'PaymentGatewayError';
  }
}

export class PaymentCurrencyMismatchError extends ValidationError {
  constructor(expected: string, actual: string) {
    super(
      `Currency mismatch: expected "${expected}", got "${actual}"`,
      'currency',
    );
    this.name = 'PaymentCurrencyMismatchError';
  }
}
