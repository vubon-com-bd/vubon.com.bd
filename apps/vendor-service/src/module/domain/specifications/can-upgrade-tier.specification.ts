/**
 * CanUpgradeTierSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — tier upgrade eligibility.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

export interface TierUpgradeContext {
  readonly targetTier: VendorTierVO;
  readonly totalSales: number;
  readonly accountAgeDays: number;
  readonly fulfillmentRate: number; // 0-1
  readonly averageRating: number;
  readonly hasActiveSuspension: boolean;
}

export interface TierUpgradeCandidate {
  readonly vendor: VendorEntity;
  readonly ctx: TierUpgradeContext;
}

const MIN_ACCOUNT_AGE_DAYS = 30;
const MIN_FULFILLMENT_RATE = 0.7;
const MIN_RATING = 3.5;

export class CanUpgradeTierSpecification extends Specification<TierUpgradeCandidate> {
  isSatisfiedBy(c: TierUpgradeCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: TierUpgradeCandidate): string | null {
    const { vendor, ctx } = c;

    if (vendor.isDeleted()) return 'vendor is deleted';
    if (vendor.isBlocked()) return 'vendor is blocked';
    if (ctx.hasActiveSuspension || vendor.isSuspended()) {
      return 'vendor has active suspension';
    }
    if (!vendor.isActive()) {
      return `vendor status "${vendor.status.value}" is not active`;
    }
    if (!vendor.isVerified()) {
      return 'vendor is not verified';
    }

    // Tier progression check
    if (!ctx.targetTier.isHigherThan(vendor.tier)) {
      return `target tier "${ctx.targetTier.value}" is not higher than current "${vendor.tier.value}"`;
    }

    // Sales threshold
    const threshold = ctx.targetTier.threshold.minSales;
    if (ctx.totalSales < threshold) {
      return `totalSales ${ctx.totalSales} below ${ctx.targetTier.value} threshold ${threshold}`;
    }

    // Account age
    if (ctx.accountAgeDays < MIN_ACCOUNT_AGE_DAYS) {
      return `account age ${ctx.accountAgeDays} days below minimum ${MIN_ACCOUNT_AGE_DAYS}`;
    }

    // Fulfillment
    if (ctx.fulfillmentRate < MIN_FULFILLMENT_RATE) {
      return `fulfillment rate ${ctx.fulfillmentRate} below minimum ${MIN_FULFILLMENT_RATE}`;
    }

    // Rating
    if (ctx.averageRating > 0 && ctx.averageRating < MIN_RATING) {
      return `average rating ${ctx.averageRating} below minimum ${MIN_RATING}`;
    }

    return null;
  }

  static strict(): CanUpgradeTierSpecification {
    return new CanUpgradeTierSpecification();
  }

  static relaxed(): CanUpgradeTierSpecification {
    return new CanUpgradeTierSpecification();
  }
}
