/**
 * Refund domain errors
 * @module payment-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class RefundNotFoundError extends NotFoundError {
  constructor(refundId: string) {
    super('Refund', refundId);
    this.name = 'RefundNotFoundError';
  }
}

export class InvalidRefundStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid refund status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidRefundStatusError';
  }
}

export class RefundAmountExceededError extends BusinessRuleError {
  constructor(paymentId: string, requested: number, available: number, currency: string) {
    super(
      `Refund amount ${requested} ${currency} exceeds available ${available} ${currency} for payment "${paymentId}"`,
      'REFUND_AMOUNT_EXCEEDED',
      { paymentId, requested, available, currency },
    );
    this.name = 'RefundAmountExceededError';
  }
}

export class RefundWindowExpiredError extends BusinessRuleError {
  constructor(paymentId: string, paidAt: string, windowDays: number) {
    super(
      `Refund window (${windowDays} days) has expired for payment "${paymentId}" (paid at ${paidAt})`,
      'REFUND_WINDOW_EXPIRED',
      { paymentId, paidAt, windowDays },
    );
    this.name = 'RefundWindowExpiredError';
  }
}

export class PartialRefundNotAllowedError extends BusinessRuleError {
  constructor(paymentId: string) {
    super(
      `Partial refunds are not allowed for payment "${paymentId}"`,
      'PARTIAL_REFUND_NOT_ALLOWED',
      { paymentId },
    );
    this.name = 'PartialRefundNotAllowedError';
  }
}

export class RefundReasonRequiredError extends ValidationError {
  constructor() {
    super('Refund reason is required', 'reason');
    this.name = 'RefundReasonRequiredError';
  }
}

export class RefundCannotBeProcessedError extends BusinessRuleError {
  constructor(refundId: string, status: string) {
    super(
      `Refund "${refundId}" cannot be processed in status "${status}"`,
      'REFUND_CANNOT_BE_PROCESSED',
      { refundId, status },
    );
    this.name = 'RefundCannotBeProcessedError';
  }
}
