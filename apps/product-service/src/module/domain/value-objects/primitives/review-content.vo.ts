import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ReviewContentVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 2000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewContentVO {
    if (raw.length > ReviewContentVO.MAX_LENGTH) {
      throw new InvalidValueError('review_content', `Review content must not exceed ${ReviewContentVO.MAX_LENGTH} characters`);
    }
    return new ReviewContentVO(raw);
  }
}
