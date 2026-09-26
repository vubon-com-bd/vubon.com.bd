/**
 * SurveyTypeVO — Survey category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SURVEY_TYPE } from '@vubon/shared-constants/support';

export type SurveyTypeValue = (typeof SURVEY_TYPE)[keyof typeof SURVEY_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(Object.values(SURVEY_TYPE));

const SATISFACTION_TYPES: ReadonlySet<string> = new Set<string>([
  'csat',
  'nps',
]);

export class SurveyTypeVO extends BaseTypeVO<SurveyTypeValue> {
  private constructor(value: SurveyTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): SurveyTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid survey type: ${raw}`,
        'surveyType',
      );
    }
    return new SurveyTypeVO(normalized as SurveyTypeValue);
  }

  isSatisfactionSurvey(): boolean {
    return SATISFACTION_TYPES.has(this.value);
  }
}
