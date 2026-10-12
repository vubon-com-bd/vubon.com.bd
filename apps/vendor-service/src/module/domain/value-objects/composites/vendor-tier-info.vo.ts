/**
 * VendorTierInfoVO — current tier + progress to next tier
 * @module vendor-service/src/module/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorTierVO } from '../primitives/vendor-tier.vo.js';

export interface VendorTierInfoVOProps {
  readonly currentTier: VendorTierVO;
  readonly currentSales: number;
  readonly lastEvaluatedAt: string;
  readonly tierChangedAt?: string;
  readonly tierChangeReason?: string;
}

export class VendorTierInfoVO extends BaseVO<VendorTierInfoVOProps> {
  private constructor(props: VendorTierInfoVOProps) {
    super(props);
  }

  static create(props: VendorTierInfoVOProps): VendorTierInfoVO {
    if (!(props.currentTier instanceof VendorTierVO)) {
      throw new ValidationError('Tier info requires VendorTierVO', 'currentTier');
    }
    if (!Number.isFinite(props.currentSales) || props.currentSales < 0) {
      throw new ValidationError('Current sales must be non-negative', 'currentSales');
    }
    if (Number.isNaN(Date.parse(props.lastEvaluatedAt))) {
      throw new ValidationError('lastEvaluatedAt must be a valid ISO timestamp', 'lastEvaluatedAt');
    }
    return new VendorTierInfoVO(props);
  }

  static reconstitute(props: VendorTierInfoVOProps): VendorTierInfoVO {
    return new VendorTierInfoVO(props);
  }

  get currentTier(): VendorTierVO { return this.value.currentTier; }
  get currentSales(): number { return this.value.currentSales; }

  /** Progress to next tier as a 0-1 ratio. */
  getProgressToNextTier(): number {
    const next = this.value.currentTier.nextTier();
    if (!next) return 1;
    const currentThreshold = this.value.currentTier.getThreshold();
    const nextThreshold = next.getThreshold();
    const span = nextThreshold.minSales - currentThreshold.minSales;
    if (span <= 0) return 1;
    const progress = (this.value.currentSales - currentThreshold.minSales) / span;
    return Math.max(0, Math.min(1, Math.round(progress * 100) / 100));
  }

  /** Sales amount needed to reach the next tier, or 0 if already top. */
  getAmountToNextTier(): number {
    const next = this.value.currentTier.nextTier();
    if (!next) return 0;
    const nextMin = next.getThreshold().minSales;
    return Math.max(0, nextMin - this.value.currentSales);
  }

  isAtTopTier(): boolean {
    return this.value.currentTier.nextTier() === null;
  }

  /** Recompute the correct tier based on current sales. */
  computeCorrectTier(): VendorTierVO {
    return VendorTierVO.forSalesAmount(this.value.currentSales);
  }

  /** Should tier be upgraded based on current sales? */
  shouldUpgrade(): boolean {
    return this.computeCorrectTier().isHigherThan(this.value.currentTier);
  }

  /** Should tier be downgraded based on current sales? */
  shouldDowngrade(): boolean {
    return this.value.currentTier.isHigherThan(this.computeCorrectTier());
  }
}
