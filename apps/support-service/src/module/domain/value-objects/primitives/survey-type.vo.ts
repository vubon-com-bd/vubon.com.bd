import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SURVEY_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SURVEY_TYPE));

export class SurveyTypeVO extends BaseTypeVO<string> {
  static create(value: string): SurveyTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid survey type: ${value}`);
    }
    return new SurveyTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
