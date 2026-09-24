import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { SURVEY_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SURVEY_STATUS));

export class SurveyStatusVO extends BaseStatusVO<string> {
  static create(value: string): SurveyStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid survey status: ${value}`);
    }
    return new SurveyStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
