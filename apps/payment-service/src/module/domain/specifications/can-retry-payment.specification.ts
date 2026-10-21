/**
 * CanRetryPaymentSpecification
 * @module payment-service/domain/specifications
 *
 * Preconditions for retrying a failed payment:
 *   - status retryable (failed/declined)
 *   - within attempt limit
 *   - not expired
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '@domain/entities/payment.entity';

export interface CanRetryPaymentContext {
  readonly payment: PaymentEntity;
  readonly attemptCount: number;
  readonly referenceDate?: Date;
}

export class CanRetryPaymentSpecification extends Specification<CanRetryPaymentContext> {
  isSatisfiedBy(ctx: CanRetryPaymentContext): boolean {
    return this.explain(ctx) === null;
  }

  explain(ctx: CanRetryPaymentContext): string | null {
    const { payment, attemptCount } = ctx;

    if (!payment.isRetryable()) {
      return `Payment status "${payment.status.value}" is not retryable`;
    }
    if (attemptCount >= PAYMENT_LIMIT.MAX_ATTEMPTS) {
      return `Max attempts (${PAYMENT_LIMIT.MAX_ATTEMPTS}) reached`;
    }
    if (payment.status.isExpired()) {
      return 'Payment expired — cannot retry';
    }
    return null;
  }

  static strict(): CanRetryPaymentSpecification {
    return new CanRetryPaymentSpecification();
  }
}
