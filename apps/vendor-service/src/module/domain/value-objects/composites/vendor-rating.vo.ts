/**
 * VendorRatingVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর aggregate rating snapshot।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { RatingValueVO } from '../primitives/rating-value.vo.js';

export interface VendorRatingVOProps {
  readonly vendorId: VendorIdVO;
  readonly overall: RatingValueVO;
  readonly productQuality: RatingValueVO;
  readonly shippingSpeed: RatingValueVO;
  readonly customerService: RatingValueVO;
  readonly communication: RatingValueVO;
  readonly valueForMoney: RatingValueVO;
  readonly packaging: RatingValueVO;
  readonly totalReviews: number;
  readonly recentReviews: number;
  readonly distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
  readonly lastUpdatedAt: string;
}

export class VendorRatingVO extends BaseVO<VendorRatingVOProps> {
  private constructor(props: VendorRatingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorRatingVOProps): VendorRatingVO {
    const vo = new VendorRatingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorRatingVOProps): VendorRatingVO {
    return new VendorRatingVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!Number.isInteger(v.totalReviews) || v.totalReviews < 0) {
      throw new ValidationError('totalReviews must be a non-negative integer', 'totalReviews');
    }
    if (!Number.isInteger(v.recentReviews) || v.recentReviews < 0) {
      throw new ValidationError('recentReviews must be a non-negative integer', 'recentReviews');
    }
    if (v.recentReviews > v.totalReviews) {
      throw new ValidationError('recentReviews cannot exceed totalReviews', 'recentReviews');
    }

    let sum = 0;
    for (const key of ['1', '2', '3', '4', '5'] as const) {
      const count = v.distribution[key as unknown as 1 | 2 | 3 | 4 | 5] ?? 0;
      if (!Number.isInteger(count) || count < 0) {
        throw new ValidationError(`distribution["${key}"] must be a non-negative integer`, 'distribution');
      }
      sum += count;
    }
    if (sum !== v.totalReviews) {
      throw new ValidationError(
        `distribution sum (${sum}) must equal totalReviews (${v.totalReviews})`,
        'distribution',
      );
    }
  }

  // ─── Getters ───
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get overall(): RatingValueVO { return this.value.overall; }
  get productQuality(): RatingValueVO { return this.value.productQuality; }
  get shippingSpeed(): RatingValueVO { return this.value.shippingSpeed; }
  get customerService(): RatingValueVO { return this.value.customerService; }
  get communication(): RatingValueVO { return this.value.communication; }
  get valueForMoney(): RatingValueVO { return this.value.valueForMoney; }
  get packaging(): RatingValueVO { return this.value.packaging; }
  get totalReviews(): number { return this.value.totalReviews; }
  get recentReviews(): number { return this.value.recentReviews; }
  get distribution(): Readonly<Record<1 | 2 | 3 | 4 | 5, number>> { return this.value.distribution; }
  get lastUpdatedAt(): string { return this.value.lastUpdatedAt; }

  // ─── Predicates ───
  hasReviews(): boolean { return this.totalReviews > 0; }
  hasEnoughForDisplay(): boolean {
    return this.totalReviews >= VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY;
  }

  /** Overall is positive (>=4) */
  isPositive(): boolean { return this.overall.isPositive(); }
  isNeutral(): boolean { return this.overall.isNeutral(); }
  isNegative(): boolean { return this.overall.isNegative(); }

  /** Should be auto-hidden based on low rating */
  triggersAutoHide(): boolean {
    return this.overall.triggersAutoHide();
  }

  /** Should be flagged for review */
  triggersAutoFlag(): boolean {
    return this.overall.triggersAutoFlag();
  }

  /** Count for a specific star */
  countFor(star: 1 | 2 | 3 | 4 | 5): number {
    return this.distribution[star] ?? 0;
  }

  /** Percentage for a specific star */
  percentFor(star: 1 | 2 | 3 | 4 | 5): number {
    if (this.totalReviews === 0) return 0;
    return Math.round((this.countFor(star) / this.totalReviews) * 10000) / 100;
  }

  /** Weighted score using recent reviews weight */
  get weightedScore(): number {
    const recentRatio = this.totalReviews === 0 ? 0 : this.recentReviews / this.totalReviews;
    const boost = recentRatio * VENDOR_RATING.RECENT_WEIGHT_FACTOR;
    return Math.round(Math.min(5, this.overall.rating + boost * 0.5) * 10) / 10;
  }

  /** Percentage of positive reviews (4-5 stars) */
  get positivePercent(): number {
    if (this.totalReviews === 0) return 0;
    const positive = this.countFor(4) + this.countFor(5);
    return Math.round((positive / this.totalReviews) * 10000) / 100;
  }

  /** Percentage of negative reviews (1-2 stars) */
  get negativePercent(): number {
    if (this.totalReviews === 0) return 0;
    const negative = this.countFor(1) + this.countFor(2);
    return Math.round((negative / this.totalReviews) * 10000) / 100;
  }
}
