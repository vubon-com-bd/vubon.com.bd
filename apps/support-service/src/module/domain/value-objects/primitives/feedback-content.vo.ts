import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class FeedbackContentVO extends BaseCodeVO {
  static create(value: string): FeedbackContentVO {
    BaseCodeVO.validateNonEmpty(value, 'FeedbackContent');
    if (value.length > 5000) {
      throw new Error('Feedback content exceeds 5000 characters');
    }
    return new FeedbackContentVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
