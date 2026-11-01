/**
 * CanSplitSpecification
 * @module payment-service/domain/specifications
 *
 * Preconditions for creating a split payment:
 *   - payment successful
 *   - at least 2 receivers
 *   - total amount > 0
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PaymentEntity } from '@domain/entities/payment.entity';

export interface CanSplitContext {
  readonly payment: PaymentEntity;
  readonly receiverCount: number;
  readonly totalAmount: number;
}

export class CanSplitSpecification extends Specification<CanSplitContext> {
  isSatisfiedBy(ctx: CanSplitContext): boolean {
    return this.explain(ctx) === null;
  }

  explain(ctx: CanSplitContext): string | null {
    const { payment, receiverCount, totalAmount } = ctx;

    if (!payment.isSuccessful()) {
      return `Payment status "${payment.status.value}" is not successful`;
    }
    if (receiverCount < 2) {
      return 'At least 2 receivers required';
    }
    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return 'Total split amount must be positive';
    }
    if (totalAmount > payment.amount.amount) {
      return `Split total ${totalAmount} exceeds payment amount ${payment.amount.amount}`;
    }
    return null;
  }

  static strict(): CanSplitSpecification {
    return new CanSplitSpecification();
  }
}
