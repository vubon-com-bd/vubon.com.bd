import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ReviewIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('review_id', 'ReviewId cannot be empty');
    }
    return new ReviewIdVO(raw);
  }
}
