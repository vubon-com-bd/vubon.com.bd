import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { FEEDBACK_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(FEEDBACK_TYPE));

export class FeedbackTypeVO extends BaseTypeVO<string> {
  static create(value: string): FeedbackTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid feedback type: ${value}`);
    }
    return new FeedbackTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
