/**
 * CanChangeSubscriptionSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — subscription plan change (upgrade/downgrade)।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity.js';
import type { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo.js';

export interface ChangeSubscriptionContext {
  readonly targetPlan: SubscriptionPlanVO;
  readonly isUpgrade: boolean;
  readonly daysSinceLastChange: number;
  readonly hasPendingPayment: boolean;
}

export interface ChangeSubscriptionCandidate {
  readonly vendor: VendorEntity;
  readonly subscription: VendorSubscriptionEntity;
  readonly ctx: ChangeSubscriptionContext;
}

const MIN_DAYS_BETWEEN_CHANGES = 3;

export class CanChangeSubscriptionSpecification extends Specification<ChangeSubscriptionCandidate> {
  isSatisfiedBy(c: ChangeSubscriptionCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: ChangeSubscriptionCandidate): string | null {
    const { vendor, subscription, ctx } = c;

    if (vendor.isDeleted()) return 'vendor is deleted';
    if (vendor.isBlocked()) return 'vendor is blocked';

    if (!subscription.isActive() && !subscription.isTrial()) {
      return `subscription status "${subscription.status}" cannot change plan`;
    }

    if (subscription.plan.value === ctx.targetPlan.value) {
      return `already on plan "${ctx.targetPlan.value}"`;
    }

    if (ctx.hasPendingPayment) {
      return 'cannot change plan while a payment is pending';
    }

    if (ctx.daysSinceLastChange < MIN_DAYS_BETWEEN_CHANGES) {
      return `plan changed too recently (${ctx.daysSinceLastChange} days, min ${MIN_DAYS_BETWEEN_CHANGES})`;
    }

    if (ctx.isUpgrade) {
      if (!subscription.canUpgradeTo(ctx.targetPlan)) {
        return `cannot upgrade from "${subscription.plan.value}" to "${ctx.targetPlan.value}"`;
      }
    } else {
      if (!subscription.canDowngradeTo(ctx.targetPlan)) {
        return `cannot downgrade from "${subscription.plan.value}" to "${ctx.targetPlan.value}"`;
      }
    }

    return null;
  }

  static strict(): CanChangeSubscriptionSpecification {
    return new CanChangeSubscriptionSpecification();
  }

  static relaxed(): CanChangeSubscriptionSpecification {
    return new CanChangeSubscriptionSpecification();
  }
}
