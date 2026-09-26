/**
 * SurveyVO — Survey composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SurveyIdVO } from '../primitives/survey-id.vo';
import { SurveyTypeVO } from '../primitives/survey-type.vo';
import { SurveyStatusVO } from '../primitives/survey-status.vo';
import { SurveyQuestionVO } from '../primitives/survey-question.vo';

export interface SurveyVOProps {
  readonly id: SurveyIdVO;
  readonly type: SurveyTypeVO;
  readonly status: SurveyStatusVO;
  readonly title: string;
  readonly questions: readonly SurveyQuestionVO[];
}

export class SurveyVO extends BaseVO<Readonly<SurveyVOProps>> {
  private constructor(props: SurveyVOProps) {
    super(
      Object.freeze({
        ...props,
        questions: Object.freeze([...props.questions]),
      }),
    );
  }

  static create(props: SurveyVOProps): SurveyVO {
    if (!props.id || !props.type) {
      throw new ValidationError(
        'SurveyVO requires id and type',
        'survey',
      );
    }
    if (!Array.isArray(props.questions) || props.questions.length === 0) {
      throw new ValidationError(
        'SurveyVO requires at least one question',
        'survey',
      );
    }
    return new SurveyVO(props);
  }

  get id(): SurveyIdVO {
    return this.value.id;
  }

  get title(): string {
    return this.value.title;
  }

  get questionCount(): number {
    return this.value.questions.length;
  }

  get isAcceptingResponses(): boolean {
    return this.value.status.isAcceptingResponses();
  }

  get isClosed(): boolean {
    return this.value.status.isClosed();
  }

  get isSatisfaction(): boolean {
    return this.value.type.isSatisfactionSurvey();
  }

  hasQuestions(): boolean {
    return this.value.questions.length > 0;
  }
}
