import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidRatingError } from '../../errors/vendor.errors';

const MIN_RATING = 0;
const MAX_RATING = 5;

export class RatingValueVO extends BaseVO<number> {
  static create(value: number): RatingValueVO {
    if (!Number.isFinite(value) || value < MIN_RATING || value > MAX_RATING) {
      throw new InvalidRatingError(String(value));
    }
    return new RatingValueVO(value);
  }

  private constructor(value: number) {
    super(value);
  }

  get rating(): number {
    return this.value;
  }

  isExcellent(): boolean {
    return this.value >= 4.5;
  }

  isGood(): boolean {
    return this.value >= 3.5;
  }
}
