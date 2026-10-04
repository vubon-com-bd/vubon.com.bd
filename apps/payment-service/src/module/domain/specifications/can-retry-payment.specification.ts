/**
 * CanRetryPaymentSpecification
 * @module payment-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '../entities/payment.entity.js';

export interface RetryContext {
  readonly maxAttempts?: number;
}

export class CanRetryPaymentSpecification extends Specification<{
  payment: PaymentEntity;
  ctx?: RetryContext;
}> {
  isSatisfiedBy(c: { payment: PaymentEntity; ctx?: RetryContext }): boolean {
    const { payment } = c;
    const max = c.ctx?.maxAttempts ?? PAYMENT_LIMIT.MAX_ATTEMPTS;
    if (!payment.status.isRecoverable()) return false;
    if (payment.retryAttempts >= max) return false;
    return true;
  }

  explain(c: { payment: PaymentEntity; ctx?: RetryContext }): string | null {
    const { payment } = c;
    const max = c.ctx?.maxAttempts ?? PAYMENT_LIMIT.MAX_ATTEMPTS;
    if (!payment.status.isRecoverable()) {
      return `status "${payment.status.value}" is not recoverable`;
    }
    if (payment.retryAttempts >= max) {
      return `retry limit reached (${payment.retryAttempts}/${max})`;
    }
    return null;
  }
}
