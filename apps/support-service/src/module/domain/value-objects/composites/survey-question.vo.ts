/**
 * SurveyQuestionDetailVO — Composite with options + type metadata
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SurveyQuestionVO } from '../primitives/survey-question.vo';

export type SurveyQuestionKind = 'text' | 'rating' | 'single_choice' | 'multi_choice';

export interface SurveyQuestionDetailVOProps {
  readonly question: SurveyQuestionVO;
  readonly kind: SurveyQuestionKind;
  readonly options?: readonly string[];
  readonly required?: boolean;
}

export class SurveyQuestionDetailVO extends BaseVO<Readonly<SurveyQuestionDetailVOProps>> {
  private constructor(props: SurveyQuestionDetailVOProps) {
    super(
      Object.freeze({
        ...props,
        required: props.required ?? false,
        options: props.options ? Object.freeze([...props.options]) : Object.freeze([]),
      }),
    );
  }

  static create(props: SurveyQuestionDetailVOProps): SurveyQuestionDetailVO {
    if (!props.question || !props.kind) {
      throw new ValidationError(
        'SurveyQuestionDetailVO requires question and kind',
        'surveyQuestionDetail',
      );
    }
    if (
      (props.kind === 'single_choice' || props.kind === 'multi_choice') &&
      (!props.options || props.options.length === 0)
    ) {
      throw new ValidationError(
        'Choice questions require options',
        'surveyQuestionDetail',
      );
    }
    return new SurveyQuestionDetailVO(props);
  }

  get question(): SurveyQuestionVO {
    return this.value.question;
  }

  get kind(): SurveyQuestionKind {
    return this.value.kind;
  }

  get isChoice(): boolean {
    return this.value.kind === 'single_choice' || this.value.kind === 'multi_choice';
  }

  get isRequired(): boolean {
    return this.value.required === true;
  }

  get optionCount(): number {
    return this.value.options?.length ?? 0;
  }
}
