import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SatisfactionCommentVO extends BaseCodeVO {
  static create(value: string): SatisfactionCommentVO {
    const trimmed = value.trim();
    if (trimmed.length > 1000) {
      throw new Error('Satisfaction comment exceeds 1000 characters');
    }
    return new SatisfactionCommentVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
