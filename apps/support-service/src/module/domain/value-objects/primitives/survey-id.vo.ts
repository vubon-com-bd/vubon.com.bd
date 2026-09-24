import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SurveyIdVO extends BaseIdVO {
  static create(value: string): SurveyIdVO {
    return new SurveyIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
