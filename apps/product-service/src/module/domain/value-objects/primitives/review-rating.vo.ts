/**
 * ReviewRating Value Object (1-5)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REVIEW_RATING } from '@vubon/shared-constants/business/product';
import { InvalidRatingError } from '../../errors/review.errors.js';

export class ReviewRatingVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ReviewRatingVO {
    if (!Number.isInteger(raw) || raw < REVIEW_RATING.MIN || raw > REVIEW_RATING.MAX) {
      throw new InvalidRatingError(raw, REVIEW_RATING.MIN, REVIEW_RATING.MAX);
    }
    return new ReviewRatingVO(raw);
  }

  static reconstitute(raw: number): ReviewRatingVO {
    return new ReviewRatingVO(raw);
  }

  isPositive(): boolean {
    return this.value >= 4;
  }

  isNeutral(): boolean {
    return this.value === 3;
  }

  isNegative(): boolean {
    return this.value <= 2;
  }
}
