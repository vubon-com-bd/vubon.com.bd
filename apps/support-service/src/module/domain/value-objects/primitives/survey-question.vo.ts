/**
 * SurveyQuestionVO — Survey question text
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 5;
const MAX_LENGTH = 500;

export class SurveyQuestionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SurveyQuestionVO {
    BaseCodeVO.validateNonEmpty(raw, 'SurveyQuestion');
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `SurveyQuestion too short (min ${MIN_LENGTH})`,
        'surveyQuestion',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `SurveyQuestion too long (max ${MAX_LENGTH})`,
        'surveyQuestion',
      );
    }
    return new SurveyQuestionVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get isQuestion(): boolean {
    return this.value.trim().endsWith('?');
  }
}
