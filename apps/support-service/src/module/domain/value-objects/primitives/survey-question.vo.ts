import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SurveyQuestionVO extends BaseCodeVO {
  static create(value: string): SurveyQuestionVO {
    BaseCodeVO.validateNonEmpty(value, 'SurveyQuestion');
    if (value.length > 1000) {
      throw new Error('Survey question exceeds 1000 characters');
    }
    return new SurveyQuestionVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
