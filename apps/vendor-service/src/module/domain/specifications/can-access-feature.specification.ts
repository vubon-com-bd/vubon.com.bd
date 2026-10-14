/**
 * CanAccessFeatureSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — feature access based on tier + subscription।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorFeatureEntity } from '../entities/vendor-feature.entity.js';
import type { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo.js';
import type { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

export interface FeatureAccessContext {
  readonly featureKey: string;
  readonly requiredTier?: VendorTierVO;
  readonly requiredPlan?: SubscriptionPlanVO;
  readonly feature: VendorFeatureEntity | null;
}

export interface FeatureAccessCandidate {
  readonly vendor: VendorEntity;
  readonly ctx: FeatureAccessContext;
}

export class CanAccessFeatureSpecification extends Specification<FeatureAccessCandidate> {
  isSatisfiedBy(c: FeatureAccessCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: FeatureAccessCandidate): string | null {
    const { vendor, ctx } = c;

    if (vendor.isDeleted()) return 'vendor is deleted';
    if (vendor.isBlocked()) return 'vendor is blocked';
    if (vendor.isSuspended()) return 'vendor is suspended';
    if (!vendor.isActive()) {
      return `vendor status "${vendor.status.value}" is not active`;
    }

    // Tier check
    if (ctx.requiredTier) {
      if (vendor.tier.isLowerThan(ctx.requiredTier)) {
        return `feature requires tier "${ctx.requiredTier.value}" (current "${vendor.tier.value}")`;
      }
    }

    // Subscription plan check — handled by subscription entity in caller
    // (specification receives a pre-loaded feature, or expects null)
    const { feature } = ctx;
    if (!feature) {
      if (ctx.requiredPlan) {
        return `feature "${ctx.featureKey}" requires plan "${ctx.requiredPlan.value}"`;
      }
      return `feature "${ctx.featureKey}" is not available`;
    }

    if (feature.vendorId.value !== vendor.id) {
      return `feature "${ctx.featureKey}" does not belong to this vendor`;
    }

    if (!feature.isActive()) {
      if (feature.isDisabled()) return `feature "${ctx.featureKey}" is disabled`;
      if (feature.isExpired()) return `feature "${ctx.featureKey}" is expired`;
      return `feature "${ctx.featureKey}" is not active`;
    }

    if (feature.isLimitExceeded()) {
      return `feature "${ctx.featureKey}" usage limit exceeded`;
    }

    return null;
  }

  static strict(): CanAccessFeatureSpecification {
    return new CanAccessFeatureSpecification();
  }

  static relaxed(): CanAccessFeatureSpecification {
    return new CanAccessFeatureSpecification();
  }
}
