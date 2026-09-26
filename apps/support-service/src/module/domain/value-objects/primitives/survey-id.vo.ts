/**
 * SurveyIdVO — Survey identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'srv_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class SurveyIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SurveyIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SurveyId must be a string', 'surveyId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `SurveyId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'surveyId',
      );
    }
    return new SurveyIdVO(trimmed);
  }

  static generate(): SurveyIdVO {
    const suffix = Date.now().toString(36);
    return SurveyIdVO.create(`${PREFIX}${suffix}`);
  }
}
