import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class FaqAnswerVO extends BaseCodeVO {
  static create(value: string): FaqAnswerVO {
    BaseCodeVO.validateNonEmpty(value, 'FaqAnswer');
    return new FaqAnswerVO(value.trim());
  }

  private constructor(value: string) {
    super(value);
  }
}
