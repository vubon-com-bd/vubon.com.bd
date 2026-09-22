import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidReviewIdError } from '../../errors/vendor.errors';

export class ReviewIdVO extends BaseIdVO {
  static create(value: string): ReviewIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidReviewIdError(value);
    }
    return new ReviewIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
