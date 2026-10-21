/**
 * CanCancelSubscriptionSpecification
 * @module payment-service/domain/specifications
 *
 * Preconditions for cancelling a subscription:
 *   - status cancellable (not cancelled/expired)
 *   - no pending refund blocking cancellation
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';

export interface CanCancelSubscriptionContext {
  readonly subscription: SubscriptionEntity;
  readonly pendingRefundExists?: boolean;
}

export class CanCancelSubscriptionSpecification extends Specification<CanCancelSubscriptionContext> {
  isSatisfiedBy(ctx: CanCancelSubscriptionContext): boolean {
    return this.explain(ctx) === null;
  }

  explain(ctx: CanCancelSubscriptionContext): string | null {
    const { subscription, pendingRefundExists } = ctx;

    if (subscription.status.isCancelled()) {
      return 'Subscription is already cancelled';
    }
    if (subscription.status.isExpired()) {
      return 'Subscription already expired';
    }
    if (!subscription.status.isCancellable()) {
      return `Subscription status "${subscription.status.value}" not cancellable`;
    }
    if (pendingRefundExists) {
      return 'Cannot cancel while a refund is pending';
    }
    return null;
  }

  static strict(): CanCancelSubscriptionSpecification {
    return new CanCancelSubscriptionSpecification();
  }
}
