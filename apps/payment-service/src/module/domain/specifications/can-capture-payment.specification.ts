/**
 * CanCapturePaymentSpecification
 * @module payment-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '../entities/payment.entity.js';

export interface CaptureContext {
  readonly referenceDate?: Date;
  readonly requestedAmount?: number;
}

export class CanCapturePaymentSpecification extends Specification<{
  payment: PaymentEntity;
  ctx?: CaptureContext;
}> {
  isSatisfiedBy(c: { payment: PaymentEntity; ctx?: CaptureContext }): boolean {
    const { payment, ctx } = c;
    if (!payment.isAuthorized()) return false;
    if (!payment.isCaptureWindowOpen(ctx?.referenceDate)) return false;
    if (ctx?.requestedAmount !== undefined) {
      if (ctx.requestedAmount <= 0) return false;
      if (ctx.requestedAmount > payment.amount) return false;
    }
    return true;
  }

  explain(c: { payment: PaymentEntity; ctx?: CaptureContext }): string | null {
    const { payment, ctx } = c;
    if (!payment.isAuthorized()) {
      return `payment status "${payment.status.value}" is not authorized`;
    }
    if (!payment.isCaptureWindowOpen(ctx?.referenceDate)) {
      return 'capture window has closed';
    }
    if (ctx?.requestedAmount !== undefined && ctx.requestedAmount > payment.amount) {
      return `requested ${ctx.requestedAmount} exceeds ${payment.amount}`;
    }
    return null;
  }
}
