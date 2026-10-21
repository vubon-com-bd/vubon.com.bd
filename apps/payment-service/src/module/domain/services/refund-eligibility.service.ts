/**
 * RefundEligibilityService
 * @module payment-service/domain/services
 *
 * Business rules:
 *   - Payment must be captured/paid/partially_refunded
 *   - Refund must be within REFUND_WINDOW_DAYS
 *   - Cumulative refunds ≤ original amount
 *   - Reason 'fraud' bypasses window
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

import type { PaymentEntity } from '@domain/entities/payment.entity';
import type { RefundReasonVO } from '@domain/primitives/refund-reason.vo';

export interface RefundEligibilityInput {
  readonly payment: PaymentEntity;
  readonly refundAmount: number;
  readonly reason: RefundReasonVO;
  readonly referenceDate?: Date;
}

export interface RefundEligibilityResult {
  readonly eligible: boolean;
  readonly reason?: string;
  readonly remainingAmount: number;
  readonly withinWindow: boolean;
}

export class RefundEligibilityService {
  static check(input: RefundEligibilityInput): RefundEligibilityResult {
    const { payment, refundAmount, reason, referenceDate = new Date() } = input;

    const remaining = payment.remainingRefundableAmount();

    if (!payment.canBeRefunded()) {
      return {
        eligible: false,
        reason: `Payment status "${payment.status.value}" is not refundable`,
        remainingAmount: remaining,
        withinWindow: false,
      };
    }

    if (refundAmount <= 0) {
      return {
        eligible: false,
        reason: 'Refund amount must be positive',
        remainingAmount: remaining,
        withinWindow: false,
      };
    }

    if (refundAmount > remaining) {
      return {
        eligible: false,
        reason: `Refund ${refundAmount} exceeds remaining ${remaining}`,
        remainingAmount: remaining,
        withinWindow: true,
      };
    }

    const anchor = payment.capturedAt ?? payment.paidAt;
    const withinWindow = this.isWithinWindow(anchor, referenceDate);

    if (!withinWindow && !reason.isFraud()) {
      return {
        eligible: false,
        reason: `Refund window (${PAYMENT_LIMIT.REFUND_WINDOW_DAYS} days) exceeded`,
        remainingAmount: remaining,
        withinWindow: false,
      };
    }

    return {
      eligible: true,
      remainingAmount: remaining,
      withinWindow,
    };
  }

  static assert(input: RefundEligibilityInput): void {
    const result = this.check(input);
    if (!result.eligible) {
      throw new BusinessRuleError(
        `Refund not eligible: ${result.reason}`,
        'REFUND_NOT_ELIGIBLE',
        { paymentId: input.payment.id, reason: result.reason },
      );
    }
  }

  private static isWithinWindow(anchor: string | undefined, reference: Date): boolean {
    if (!anchor) return false;
    const anchorMs = new Date(anchor).getTime();
    const windowMs = PAYMENT_LIMIT.REFUND_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return reference.getTime() - anchorMs <= windowMs;
  }
}
