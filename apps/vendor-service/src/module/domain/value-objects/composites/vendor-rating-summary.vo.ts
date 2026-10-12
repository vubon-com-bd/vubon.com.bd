/**
 * VendorRatingSummaryVO — aggregated rating with distribution
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RatingScoreVO } from '../primitives/rating-score.vo.js';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

export interface RatingDistribution {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface VendorRatingSummaryCategoryScore {
  readonly category: string;
  readonly score: number;
  readonly count: number;
}

export interface VendorRatingSummaryVOProps {
  readonly overall: RatingScoreVO;
  readonly totalReviews: number;
  readonly distribution: RatingDistribution;
  readonly categories: readonly VendorRatingSummaryCategoryScore[];
  readonly updatedAt: string;
}

export class VendorRatingSummaryVO extends BaseVO<VendorRatingSummaryVOProps> {
  private constructor(props: VendorRatingSummaryVOProps) {
    super(props);
  }

  static create(props: VendorRatingSummaryVOProps): VendorRatingSummaryVO {
    if (!(props.overall instanceof RatingScoreVO)) {
      throw new ValidationError('Rating summary requires RatingScoreVO', 'overall');
    }
    if (!Number.isInteger(props.totalReviews) || props.totalReviews < 0) {
      throw new ValidationError('Total reviews must be a non-negative integer', 'totalReviews');
    }
    const dist = props.distribution;
    const sum = dist[1] + dist[2] + dist[3] + dist[4] + dist[5];
    if (sum !== props.totalReviews) {
      throw new ValidationError(
        `Distribution sum (${sum}) does not match total reviews (${props.totalReviews})`,
        'distribution',
      );
    }
    if (!Array.isArray(props.categories) || props.categories.length > 20) {
      throw new ValidationError('Categories must be an array with max 20 items', 'categories');
    }
    if (Number.isNaN(Date.parse(props.updatedAt))) {
      throw new ValidationError('updatedAt must be a valid ISO timestamp', 'updatedAt');
    }
    return new VendorRatingSummaryVO(props);
  }

  static reconstitute(props: VendorRatingSummaryVOProps): VendorRatingSummaryVO {
    return new VendorRatingSummaryVO(props);
  }

  get overall(): RatingScoreVO { return this.value.overall; }
  get totalReviews(): number { return this.value.totalReviews; }
  get distribution(): RatingDistribution { return this.value.distribution; }

  /** Should the rating be displayed publicly? */
  isDisplayable(): boolean {
    return this.value.totalReviews >= VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY;
  }

  shouldAutoHide(): boolean {
    return this.value.overall.shouldAutoHide() && this.isDisplayable();
  }

  percentageFor(stars: 1 | 2 | 3 | 4 | 5): number {
    if (this.value.totalReviews === 0) return 0;
    return Math.round((this.value.distribution[stars] / this.value.totalReviews) * 100);
  }

  positiveRatio(): number {
    if (this.value.totalReviews === 0) return 0;
    const positive = this.value.distribution[4] + this.value.distribution[5];
    return Math.round((positive / this.value.totalReviews) * 100) / 100;
  }

  negativeRatio(): number {
    if (this.value.totalReviews === 0) return 0;
    const negative = this.value.distribution[1] + this.value.distribution[2];
    return Math.round((negative / this.value.totalReviews) * 100) / 100;
  }

  getCategoryScore(category: string): number | undefined {
    return this.value.categories.find((c) => c.category === category)?.score;
  }
}
