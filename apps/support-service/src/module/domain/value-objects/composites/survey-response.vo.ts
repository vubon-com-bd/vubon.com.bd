/**
 * SurveyResponseVO — A submitted survey response
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SurveyIdVO } from '../primitives/survey-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface SurveyAnswer {
  readonly questionId: string;
  readonly value: string | number | readonly string[];
}

export interface SurveyResponseVOProps {
  readonly surveyId: SurveyIdVO;
  readonly userId: UserIdVO;
  readonly answers: readonly SurveyAnswer[];
  readonly submittedAt: string;
}

export class SurveyResponseVO extends BaseVO<Readonly<SurveyResponseVOProps>> {
  private constructor(props: SurveyResponseVOProps) {
    super(
      Object.freeze({
        ...props,
        answers: Object.freeze([...props.answers]),
      }),
    );
  }

  static create(props: SurveyResponseVOProps): SurveyResponseVO {
    if (!props.surveyId || !props.userId) {
      throw new ValidationError(
        'SurveyResponseVO requires surveyId and userId',
        'surveyResponse',
      );
    }
    if (!Array.isArray(props.answers) || props.answers.length === 0) {
      throw new ValidationError(
        'SurveyResponseVO requires answers',
        'surveyResponse',
      );
    }
    if (typeof props.submittedAt !== 'string' || props.submittedAt.length === 0) {
      throw new ValidationError(
        'SurveyResponseVO submittedAt required',
        'surveyResponse',
      );
    }
    return new SurveyResponseVO(props);
  }

  get surveyId(): SurveyIdVO {
    return this.value.surveyId;
  }

  get userId(): UserIdVO {
    return this.value.userId;
  }

  get answerCount(): number {
    return this.value.answers.length;
  }

  get submittedAt(): string {
    return this.value.submittedAt;
  }

  hasAnswer(questionId: string): boolean {
    return this.value.answers.some((a) => a.questionId === questionId);
  }
}
