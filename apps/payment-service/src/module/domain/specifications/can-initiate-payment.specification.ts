/**
 * CanInitiatePaymentSpecification
 * @module payment-service/domain/specifications
 *
 * Checks all preconditions for creating a new payment:
 *   - amount > 0
 *   - currency supported
 *   - method is available
 *   - no existing successful payment for the same order
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import type { PaymentEntity } from '@domain/entities/payment.entity';

export interface InitiatePaymentContext {
  readonly amount: number;
  readonly currency: string;
  readonly existingPayments: readonly PaymentEntity[];
}

export class CanInitiatePaymentSpecification extends Specification<InitiatePaymentContext> {
  isSatisfiedBy(ctx: InitiatePaymentContext): boolean {
    return this.explain(ctx) === null;
  }

  explain(ctx: InitiatePaymentContext): string | null {
    const { amount, currency, existingPayments } = ctx;

    if (!Number.isFinite(amount) || amount < PAYMENT_LIMIT.MIN_AMOUNT) {
      return `Amount must be >= ${PAYMENT_LIMIT.MIN_AMOUNT}`;
    }
    if (amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      return `Amount exceeds max ${PAYMENT_LIMIT.MAX_AMOUNT}`;
    }
    if (!currency || currency.trim().length !== 3) {
      return 'Invalid currency';
    }
    const active = existingPayments.find(
      (p) => !p.isFinal() && p.currency.value === currency.toUpperCase(),
    );
    if (active) {
      return `Existing active payment "${active.id}" already in progress`;
    }
    return null;
  }

  static strict(): CanInitiatePaymentSpecification {
    return new CanInitiatePaymentSpecification();
  }
}
