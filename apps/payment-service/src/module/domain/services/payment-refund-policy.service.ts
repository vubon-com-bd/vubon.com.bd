/**
 * PaymentRefundPolicyService — refund eligibility + amounts
 * @module payment-service/domain/services
 *
 * Business rules:
 *  - Refund window: 90 days from captured date
 *  - Partial refund allowed if PARTIAL_REFUND_ALLOWED flag is on
 *  - Restock fee optional (per policy)
 *  - Shipping refund optional
 *  - Auto-approve if amount <= autoApproveThreshold
 */
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { REFUND_CONFIG } from '@vubon/shared-config/business';
import type { PaymentEntity } from '../entities/payment.entity.js';

export interface RefundEligibilityInput {
  readonly payment: PaymentEntity;
  readonly requestedAmount?: number;
  readonly referenceDate?: Date;
}

export interface RefundEligibilityResult {
  readonly eligible: boolean;
  readonly reason?: string;
  readonly maxRefundable: number;
  readonly requiresApproval: boolean;
}

export interface RefundAmountInput {
  readonly paidAmount: number;
  readonly requestedAmount?: number;
  readonly restockFee?: number;
  readonly shippingRefund?: number;
}

export class PaymentRefundPolicyService {
  static checkEligibility(input: RefundEligibilityInput): RefundEligibilityResult {
    const { payment, requestedAmount } = input;
    const now = input.referenceDate ?? new Date();
    const available = payment.refundableRemaining;

    if (!payment.status.isSettled()) {
      return {
        eligible: false,
        reason: `Payment status "${payment.status.value}" is not refundable`,
        maxRefundable: 0,
        requiresApproval: false,
      };
    }
    if (available <= 0) {
      return {
        eligible: false,
        reason: 'No refundable balance remaining',
        maxRefundable: 0,
        requiresApproval: false,
      };
    }
    // Refund window check
    const paidAt = payment.capturedAt ? new Date(payment.capturedAt) : null;
    if (paidAt) {
      const elapsedDays = Math.floor(
        (now.getTime() - paidAt.getTime()) / (1000 * 60 * 60 * 24),
      );
      const windowDays = REFUND_CONFIG.windowDays ?? PAYMENT_LIMIT.REFUND_WINDOW_DAYS;
      if (elapsedDays > windowDays) {
        return {
          eligible: false,
          reason: `Refund window (${windowDays} days) expired`,
          maxRefundable: 0,
          requiresApproval: false,
        };
      }
    }
    if (requestedAmount !== undefined) {
      if (requestedAmount <= 0) {
        return {
          eligible: false,
          reason: 'Requested amount must be positive',
          maxRefundable: available,
          requiresApproval: false,
        };
      }
      if (requestedAmount > available) {
        return {
          eligible: false,
          reason: `Requested ${requestedAmount} exceeds available ${available}`,
          maxRefundable: available,
          requiresApproval: false,
        };
      }
      if (requestedAmount < payment.amount && !REFUND_CONFIG.partialRefundAllowed) {
        return {
          eligible: false,
          reason: 'Partial refunds not allowed',
          maxRefundable: available,
          requiresApproval: false,
        };
      }
    }
    // Auto-approve logic
    const isAutoApprove =
      REFUND_CONFIG.autoApprove ||
      (requestedAmount ?? available) <= REFUND_CONFIG.autoApproveThreshold;

    return {
      eligible: true,
      maxRefundable: available,
      requiresApproval: !isAutoApprove,
    };
  }

  static calculateRefundAmount(input: RefundAmountInput): number {
    const { paidAmount, requestedAmount, restockFee = 0, shippingRefund = 0 } = input;
    if (!Number.isFinite(paidAmount) || paidAmount <= 0) return 0;
    const base = requestedAmount ?? paidAmount;
    if (base <= 0 || base > paidAmount) return 0;
    const total = base + shippingRefund - restockFee;
    return this.round(Math.max(0, Math.min(total, paidAmount + shippingRefund)));
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
