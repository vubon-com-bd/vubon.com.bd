import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class FaqQuestionVO extends BaseCodeVO {
  static create(value: string): FaqQuestionVO {
    BaseCodeVO.validateNonEmpty(value, 'FaqQuestion');
    const trimmed = value.trim();
    if (trimmed.length > 500) {
      throw new Error('FAQ question exceeds 500 characters');
    }
    return new FaqQuestionVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
