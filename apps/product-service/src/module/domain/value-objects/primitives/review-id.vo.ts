/**
 * ReviewId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ReviewIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('ReviewId cannot be empty');
    }
    return new ReviewIdVO(raw.trim());
  }

  static reconstitute(raw: string): ReviewIdVO {
    return new ReviewIdVO(raw);
  }
}
