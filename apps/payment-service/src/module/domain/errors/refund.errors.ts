/**
 * Refund Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class RefundNotFoundError extends NotFoundError {
  constructor(refundId: string) {
    super('Refund', refundId);
    this.name = 'RefundNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidRefundStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid refund status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidRefundStatusError';
  }
}

export class RefundAmountExceedsError extends ValidationError {
  constructor(refundAmount: number, paidAmount: number, currency: string) {
    super(
      `Refund amount ${refundAmount} exceeds paid amount ${paidAmount} ${currency}`,
      'refundAmount',
    );
    this.name = 'RefundAmountExceedsError';
  }
}

// ─── Business Rule (400) ───────────────────
export class RefundWindowExpiredError extends BusinessRuleError {
  constructor(refundId: string, windowDays: number) {
    super(
      `Refund "${refundId}" window (${windowDays} days) expired`,
      'REFUND_WINDOW_EXPIRED',
      { refundId, windowDays },
    );
    this.name = 'RefundWindowExpiredError';
  }
}

export class RefundNotEligibleError extends BusinessRuleError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Refund not eligible: ${reason}`, 'REFUND_NOT_ELIGIBLE', context);
    this.name = 'RefundNotEligibleError';
  }
}

export class InvalidRefundStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, refundId?: string) {
    super(
      `Cannot transition refund status from "${from}" to "${to}"`,
      'INVALID_REFUND_STATUS_TRANSITION',
      { from, to, refundId },
    );
    this.name = 'InvalidRefundStatusTransitionError';
  }
}
