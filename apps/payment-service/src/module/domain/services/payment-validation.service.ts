/**
 * PaymentValidationService
 * @module payment-service/domain/services
 *
 * Cross-checks VO consistency before persisting / executing a payment.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

import type { PaymentEntity } from '@domain/entities/payment.entity';

export interface PaymentValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export class PaymentValidationService {
  static validate(payment: PaymentEntity): PaymentValidationResult {
    const errors: string[] = [];

    if (!payment.amount.isPositive()) {
      errors.push('Amount must be positive');
    }
    if (payment.amount.amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      errors.push(`Amount exceeds maximum ${PAYMENT_LIMIT.MAX_AMOUNT}`);
    }
    if (payment.amount.currency !== payment.currency.value) {
      errors.push(
        `Currency mismatch: amount=${payment.amount.currency}, currency=${payment.currency.value}`,
      );
    }
    if (payment.method.requiresGateway() && !payment.provider) {
      errors.push('Provider required for online methods');
    }
    if (payment.isCaptured() && !payment.capturedAt) {
      errors.push('Captured payment missing capturedAt');
    }
    if (payment.isPaid() && !payment.paidAt) {
      errors.push('Paid payment missing paidAt');
    }
    if (payment.refundedAmount > payment.amount.amount) {
      errors.push('Refunded amount exceeds payment amount');
    }

    return { valid: errors.length === 0, errors };
  }

  static assertValid(payment: PaymentEntity): void {
    const result = this.validate(payment);
    if (!result.valid) {
      throw new ValidationError(
        `Payment validation failed: ${result.errors.join('; ')}`,
        'payment',
      );
    }
  }

  static assertCapturable(payment: PaymentEntity): void {
    if (!payment.canBeCaptured()) {
      throw new BusinessRuleError(
        `Payment not capturable in status "${payment.status.value}"`,
        'PAYMENT_NOT_CAPTURABLE',
        { paymentId: payment.id, status: payment.status.value },
      );
    }
  }

  static assertRefundable(payment: PaymentEntity, refundAmount: number): void {
    if (!payment.canBeRefunded()) {
      throw new BusinessRuleError(
        `Payment not refundable in status "${payment.status.value}"`,
        'PAYMENT_NOT_REFUNDABLE',
        { paymentId: payment.id, status: payment.status.value },
      );
    }
    const remaining = payment.remainingRefundableAmount();
    if (refundAmount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'refundAmount');
    }
    if (refundAmount > remaining) {
      throw new BusinessRuleError(
        `Refund ${refundAmount} exceeds remaining ${remaining}`,
        'REFUND_EXCEEDS_REMAINING',
        { paymentId: payment.id, refundAmount, remaining },
      );
    }
  }
}
