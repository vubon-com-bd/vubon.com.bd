/**
 * VendorTierEvaluationService
 * @module vendor-service/domain/services
 *
 * Pure domain logic for tier promotion / demotion decisions.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/business';

export type TierChangeDirection = 'upgrade' | 'downgrade' | 'none';

export interface TierEvaluationResult {
  readonly currentTier: VendorTierVO;
  readonly targetTier: VendorTierVO;
  readonly direction: TierChangeDirection;
  readonly reason: string;
  readonly shouldChange: boolean;
}

export interface TierProgress {
  readonly currentTier: VendorTierVO;
  readonly nextTier: VendorTierVO | null;
  readonly currentSales: number;
  readonly amountToNext: number;
  readonly progressPercent: number;
}

export class VendorTierEvaluationService {
  /** Evaluate a vendor's tier vs. their total sales. */
  static evaluate(currentTier: VendorTierVO, totalSales: number): TierEvaluationResult {
    if (!Number.isFinite(totalSales) || totalSales < 0) {
      throw new ValidationError('Total sales must be non-negative', 'totalSales');
    }
    const targetTier = VendorTierVO.forSalesAmount(totalSales);
    if (targetTier.isHigherThan(currentTier)) {
      return {
        currentTier,
        targetTier,
        direction: 'upgrade',
        reason: `sales ${totalSales} crossed ${currentTier.value} threshold`,
        shouldChange: true,
      };
    }
    if (targetTier.isLowerThan(currentTier)) {
      return {
        currentTier,
        targetTier,
        direction: 'downgrade',
        reason: `sales ${totalSales} fell below ${currentTier.value} threshold`,
        shouldChange: true,
      };
    }
    return {
      currentTier,
      targetTier: currentTier,
      direction: 'none',
      reason: 'sales still within current tier range',
      shouldChange: false,
    };
  }

  /** Progress toward next tier as a 0-1 ratio + amount to go. */
  static getProgress(currentTier: VendorTierVO, currentSales: number): TierProgress {
    if (!Number.isFinite(currentSales) || currentSales < 0) {
      throw new ValidationError('Current sales must be non-negative', 'currentSales');
    }
    const nextTier = currentTier.nextTier();
    if (!nextTier) {
      return {
        currentTier,
        nextTier: null,
        currentSales,
        amountToNext: 0,
        progressPercent: 1,
      };
    }
    const currentMin = currentTier.getThreshold().minSales;
    const nextMin = nextTier.getThreshold().minSales;
    const span = nextMin - currentMin;
    const amountToNext = Math.max(0, nextMin - currentSales);
    const progress = span <= 0 ? 1 : (currentSales - currentMin) / span;
    return {
      currentTier,
      nextTier,
      currentSales,
      amountToNext,
      progressPercent: Math.max(0, Math.min(1, Math.round(progress * 100) / 100)),
    };
  }

  /** Should the vendor be promoted given their sales? */
  static shouldPromote(currentTier: VendorTierVO, totalSales: number): boolean {
    return VendorTierVO.forSalesAmount(totalSales).isHigherThan(currentTier);
  }

  /** Should the vendor be demoted given their sales? */
  static shouldDemote(currentTier: VendorTierVO, totalSales: number): boolean {
    return currentTier.isHigherThan(VendorTierVO.forSalesAmount(totalSales));
  }

  /**
   * Check whether a vendor qualifies for a "grace period" before demotion.
   * Uses performance score as a secondary signal.
   */
  static shouldGrantGrace(
    currentTier: VendorTierVO,
    targetTier: VendorTierVO,
    performanceScore: number,
  ): boolean {
    if (!targetTier.isLowerThan(currentTier)) return false;
    // If performance score is above warning, give one evaluation cycle to recover
    return performanceScore >= VENDOR_PERFORMANCE.WARNING_BELOW;
  }

  /**
   * Determine the effective tier after grace + performance adjustment.
   */
  static effectiveTier(
    currentTier: VendorTierVO,
    targetTier: VendorTierVO,
    performanceScore: number,
  ): VendorTierVO {
    if (VendorTierEvaluationService.shouldGrantGrace(currentTier, targetTier, performanceScore)) {
      return currentTier;
    }
    return targetTier;
  }

  /** Suggest tier based on both sales AND performance score. */
  static suggestTier(totalSales: number, performanceScore: number): VendorTierVO {
    const bySales = VendorTierVO.forSalesAmount(totalSales);
    // If performance is failing, cap at C-tier by one level down
    if (performanceScore < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW) {
      return bySales.previousTier() ?? bySales;
    }
    return bySales;
  }

  /** Batch evaluation (useful for scheduled jobs). */
  static evaluateBatch(
    vendors: ReadonlyArray<{ tier: VendorTierVO; totalSales: number }>,
  ): { upgrades: number; downgrades: number; unchanged: number } {
    let upgrades = 0;
    let downgrades = 0;
    let unchanged = 0;
    for (const v of vendors) {
      const r = VendorTierEvaluationService.evaluate(v.tier, v.totalSales);
      if (r.direction === 'upgrade') upgrades++;
      else if (r.direction === 'downgrade') downgrades++;
      else unchanged++;
    }
    return { upgrades, downgrades, unchanged };
  }
}
