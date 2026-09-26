import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidReviewContentError } from '../../errors/vendor.errors';

export class ReviewContentVO extends BaseCodeVO {
  static create(value: string): ReviewContentVO {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > 5000) {
      throw new InvalidReviewContentError(value);
    }
    return new ReviewContentVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
