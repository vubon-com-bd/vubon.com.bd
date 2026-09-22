import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ReviewRatingVO extends BaseVO<number> {
  static readonly MIN = 1;
  static readonly MAX = 5;

  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ReviewRatingVO {
    if (!Number.isInteger(raw)) {
      throw new InvalidValueError('review_rating', `Rating must be integer: ${raw}`);
    }
    if (raw < ReviewRatingVO.MIN || raw > ReviewRatingVO.MAX) {
      throw new InvalidValueError('review_rating', `Rating must be ${ReviewRatingVO.MIN}-${ReviewRatingVO.MAX}`);
    }
    return new ReviewRatingVO(raw);
  }

  isPositive(): boolean { return this.value >= 4; }
  isNegative(): boolean { return this.value <= 2; }
}
