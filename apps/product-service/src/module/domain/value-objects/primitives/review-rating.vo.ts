/**
 * ReviewRating Value Object (1-5 integer)
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REVIEW_RATING } from '@vubon/shared-constants/business';

const MIN = REVIEW_RATING.MIN;
const MAX = REVIEW_RATING.MAX;

export class ReviewRatingVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): ReviewRatingVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('ReviewRating must be a finite number', 'rating');
    }
    if (!Number.isInteger(raw)) {
      throw new ValidationError('ReviewRating must be an integer', 'rating');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(`ReviewRating must be ${MIN}-${MAX}`, 'rating');
    }
    return new ReviewRatingVO(raw);
  }

  static reconstitute(raw: number): ReviewRatingVO { return new ReviewRatingVO(raw); }

  isPositive(): boolean { return this.value >= 4; }
  isNeutral(): boolean { return this.value === 3; }
  isNegative(): boolean { return this.value <= 2; }

  toPercentage(): number { return (this.value / MAX) * 100; }
}
