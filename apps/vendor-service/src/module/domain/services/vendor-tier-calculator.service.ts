/**
 * VendorTierCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute eligible tier from sales metrics
 *  - Decide whether tier upgrade/downgrade is warranted
 *  - Calculate tier benefit deltas
 *  - Handle grace periods (downgrade protection)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  VENDOR_TIER_THRESHOLD,
  VENDOR_TIER_BENEFIT,
} from '@vubon/shared-constants/business';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

// ─── Evaluation Input ─────────────────────
export interface TierEvaluationInput {
  readonly currentTier: VendorTierVO;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly averageRating: number;
  readonly fulfillmentRate: number;
  readonly accountAgeDays: number;
}

// ─── Evaluation Result ────────────────────
export interface TierEvaluationResult {
  readonly currentTier: VendorTierVO;
  readonly eligibleTier: VendorTierVO;
  readonly shouldUpgrade: boolean;
  readonly shouldDowngrade: boolean;
  readonly reason: string;
  readonly totalSales: number;
  readonly salesToNextTier: number | null;
  readonly progressPercent: number;
  readonly warnings: readonly string[];
}

// ─── Benefit Delta ────────────────────────
export interface TierBenefitDelta {
  readonly fromTier: VendorTierVO;
  readonly toTier: VendorTierVO;
  readonly commissionPercentDelta: number;
  readonly payoutDaysDelta: number;
  readonly isUpgrade: boolean;
}

// ─── Downgrade Protection ─────────────────
const DOWNGRADE_GRACE_DAYS = 30;
const MIN_ORDERS_FOR_DOWNGRADE = 20;
const MIN_FULFILLMENT_FOR_DOWNGRADE = 0.6;

export class VendorTierCalculatorService {
  /**
   * Vendor এর metrics থেকে eligible tier calculate করো।
   */
  static computeEligibleTier(totalSales: number): VendorTierVO {
    if (!Number.isFinite(totalSales) || totalSales < 0) {
      throw new BusinessRuleError(
        'totalSales must be a non-negative finite number',
        'INVALID_TOTAL_SALES',
        { totalSales },
      );
    }
    return VendorTierVO.fromSales(totalSales);
  }

  /**
   * Full evaluation — upgrade / downgrade recommendation সহ।
   */
  static evaluate(input: TierEvaluationInput): TierEvaluationResult {
    this.validateInput(input);

    const eligibleTier = this.computeEligibleTier(input.totalSales);
    const warnings: string[] = [];

    const shouldUpgrade = eligibleTier.isHigherThan(input.currentTier);
    const shouldDowngrade =
      eligibleTier.isLowerThan(input.currentTier) &&
      this.canDowngrade(input, warnings);

    const nextTier = input.currentTier.nextTier();
    const salesToNextTier = nextTier
      ? Math.max(0, nextTier.threshold.minSales - input.totalSales)
      : null;

    const progressPercent = nextTier
      ? this.computeProgress(
          input.totalSales,
          input.currentTier.threshold.minSales,
          nextTier.threshold.minSales,
        )
      : 100;

    const reason = shouldUpgrade
      ? `Sales ${input.totalSales} qualifies for ${eligibleTier.value}`
      : shouldDowngrade
        ? `Sales dropped below ${input.currentTier.value} threshold`
        : 'Tier unchanged';

    return {
      currentTier: input.currentTier,
      eligibleTier,
      shouldUpgrade,
      shouldDowngrade,
      reason,
      totalSales: input.totalSales,
      salesToNextTier,
      progressPercent,
      warnings,
    };
  }

  /**
   * Tier upgrade হলে benefit delta calculate করো।
   */
  static computeBenefitDelta(
    fromTier: VendorTierVO,
    toTier: VendorTierVO,
  ): TierBenefitDelta {
    const fromBenefit = VENDOR_TIER_BENEFIT[fromTier.value];
    const toBenefit = VENDOR_TIER_BENEFIT[toTier.value];

    return {
      fromTier,
      toTier,
      commissionPercentDelta:
        toBenefit.commissionPercent - fromBenefit.commissionPercent,
      payoutDaysDelta: toBenefit.payoutDays - fromBenefit.payoutDays,
      isUpgrade: toTier.isHigherThan(fromTier),
    };
  }

  /**
   * Determines if the vendor qualifies for auto-upgrade।
   */
  static shouldAutoUpgrade(input: TierEvaluationInput): boolean {
    if (!Number.isFinite(input.totalSales) || input.totalSales < 0) return false;
    const eligible = this.computeEligibleTier(input.totalSales);
    return eligible.isHigherThan(input.currentTier);
  }

  /**
   * Next tier benefit preview।
   */
  static previewNextTierBenefit(
    currentTier: VendorTierVO,
  ): TierBenefitDelta | null {
    const next = currentTier.nextTier();
    if (!next) return null;
    return this.computeBenefitDelta(currentTier, next);
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static canDowngrade(
    input: TierEvaluationInput,
    warnings: string[],
  ): boolean {
    // Grace period for new accounts
    if (input.accountAgeDays < DOWNGRADE_GRACE_DAYS) {
      warnings.push(
        `Account within ${DOWNGRADE_GRACE_DAYS}-day downgrade grace period`,
      );
      return false;
    }

    // Not enough orders to judge
    if (input.totalOrders < MIN_ORDERS_FOR_DOWNGRADE) {
      warnings.push('Insufficient orders for tier downgrade evaluation');
      return false;
    }

    // Fulfillment health check
    if (input.fulfillmentRate < MIN_FULFILLMENT_FOR_DOWNGRADE) {
      warnings.push('Low fulfillment rate — downgrade accelerated');
      return true;
    }

    return true;
  }

  private static computeProgress(
    value: number,
    min: number,
    max: number,
  ): number {
    if (max <= min) return 100;
    const pct = ((value - min) / (max - min)) * 100;
    return Math.min(100, Math.max(0, Math.round(pct * 100) / 100));
  }

  private static validateInput(input: TierEvaluationInput): void {
    if (!Number.isFinite(input.totalSales) || input.totalSales < 0) {
      throw new BusinessRuleError(
        'totalSales must be a non-negative finite number',
        'INVALID_TOTAL_SALES',
        { totalSales: input.totalSales },
      );
    }
    if (!Number.isInteger(input.totalOrders) || input.totalOrders < 0) {
      throw new BusinessRuleError(
        'totalOrders must be a non-negative integer',
        'INVALID_TOTAL_ORDERS',
        { totalOrders: input.totalOrders },
      );
    }
    if (input.averageRating < 0 || input.averageRating > 5) {
      throw new BusinessRuleError(
        'averageRating must be between 0 and 5',
        'INVALID_AVERAGE_RATING',
        { averageRating: input.averageRating },
      );
    }
    if (input.fulfillmentRate < 0 || input.fulfillmentRate > 1) {
      throw new BusinessRuleError(
        'fulfillmentRate must be between 0 and 1',
        'INVALID_FULFILLMENT_RATE',
        { fulfillmentRate: input.fulfillmentRate },
      );
    }
  }

  /**
   * Utility: sales needed to reach next tier from scratch।
   */
  static salesNeededForNextTier(currentTier: VendorTierVO): number | null {
    const next = currentTier.nextTier();
    return next ? next.threshold.minSales : null;
  }

  /**
   * All tier thresholds snapshot for display।
   */
  static allTierThresholds(): readonly {
    readonly tier: string;
    readonly minSales: number;
    readonly maxSales: number | null;
    readonly commissionPercent: number;
    readonly payoutDays: number;
  }[] {
    const tiers = ['bronze', 'silver', 'gold', 'platinum', 'diamond'] as const;
    return tiers.map((t) => {
      const threshold = VENDOR_TIER_THRESHOLD[t];
      const benefit = VENDOR_TIER_BENEFIT[t];
      return {
        tier: t,
        minSales: threshold.minSales,
        maxSales: threshold.maxSales,
        commissionPercent: benefit.commissionPercent,
        payoutDays: benefit.payoutDays,
      };
    });
  }
}
