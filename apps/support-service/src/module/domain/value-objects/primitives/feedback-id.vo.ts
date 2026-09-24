import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class FeedbackIdVO extends BaseIdVO {
  static create(value: string): FeedbackIdVO {
    return new FeedbackIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
