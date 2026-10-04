/**
 * CanRefundPaymentSpecification
 * @module payment-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '../entities/payment.entity.js';

export interface RefundContext {
  readonly requestedAmount?: number;
  readonly referenceDate?: Date;
  readonly windowDays?: number;
}

export class CanRefundPaymentSpecification extends Specification<{
  payment: PaymentEntity;
  ctx?: RefundContext;
}> {
  isSatisfiedBy(c: { payment: PaymentEntity; ctx?: RefundContext }): boolean {
    const { payment, ctx } = c;
    if (!payment.canBeRefunded()) return false;
    const amount = ctx?.requestedAmount ?? payment.refundableRemaining;
    if (amount <= 0 || amount > payment.refundableRemaining) return false;
    if (!this.withinWindow(payment, ctx)) return false;
    return true;
  }

  explain(c: { payment: PaymentEntity; ctx?: RefundContext }): string | null {
    const { payment, ctx } = c;
    if (!payment.canBeRefunded()) {
      return `payment status "${payment.status.value}" not refundable`;
    }
    const amount = ctx?.requestedAmount ?? payment.refundableRemaining;
    if (amount > payment.refundableRemaining) {
      return `requested ${amount} exceeds remaining ${payment.refundableRemaining}`;
    }
    if (!this.withinWindow(payment, ctx)) {
      return 'refund window expired';
    }
    return null;
  }

  private withinWindow(p: PaymentEntity, ctx?: RefundContext): boolean {
    if (!p.capturedAt) return true;
    const now = ctx?.referenceDate ?? new Date();
    const windowDays = ctx?.windowDays ?? PAYMENT_LIMIT.REFUND_WINDOW_DAYS;
    const elapsed = (now.getTime() - new Date(p.capturedAt).getTime()) / (1000 * 60 * 60 * 24);
    return elapsed <= windowDays;
  }
}
