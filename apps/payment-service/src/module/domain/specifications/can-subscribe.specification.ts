/**
 * CanSubscribeSpecification
 * @module payment-service/domain/specifications
 *
 * Preconditions for creating a new subscription:
 *   - price > 0
 *   - user has no active subscription on same plan
 *   - trial duration ≤ 30 days
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';

const MAX_TRIAL_DAYS = 30;

export interface CanSubscribeContext {
  readonly price: number;
  readonly plan: string;
  readonly trialDays?: number;
  readonly existingSubscriptions: readonly SubscriptionEntity[];
}

export class CanSubscribeSpecification extends Specification<CanSubscribeContext> {
  isSatisfiedBy(ctx: CanSubscribeContext): boolean {
    return this.explain(ctx) === null;
  }

  explain(ctx: CanSubscribeContext): string | null {
    const { price, plan, trialDays, existingSubscriptions } = ctx;

    if (!Number.isFinite(price) || price <= 0) {
      return 'Subscription price must be positive';
    }
    if (trialDays !== undefined && (trialDays < 0 || trialDays > MAX_TRIAL_DAYS)) {
      return `Trial days must be 0-${MAX_TRIAL_DAYS}`;
    }
    const active = existingSubscriptions.find(
      (s) => s.isEntitled() && s.plan.value === plan.toLowerCase(),
    );
    if (active) {
      return `User already has active subscription "${active.id}" on plan "${plan}"`;
    }
    return null;
  }

  static strict(): CanSubscribeSpecification {
    return new CanSubscribeSpecification();
  }
}
