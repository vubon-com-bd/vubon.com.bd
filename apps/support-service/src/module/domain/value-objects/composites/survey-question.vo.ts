import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SurveyQuestionVO as SurveyQuestionPrimitiveVO } from '../primitives/survey-question.vo';

export interface SurveyQuestionDetailProps {
  readonly question: SurveyQuestionPrimitiveVO;
  readonly type: 'text' | 'rating' | 'single_choice' | 'multiple_choice';
  readonly options: ReadonlyArray<string>;
  readonly required: boolean;
}

export class SurveyQuestionDetailVO extends BaseVO<SurveyQuestionDetailProps> {
  private constructor(props: SurveyQuestionDetailProps) {
    super(Object.freeze({
      ...props,
      options: Object.freeze([...props.options]),
    }));
  }

  static create(props: SurveyQuestionDetailProps): SurveyQuestionDetailVO {
    return new SurveyQuestionDetailVO(props);
  }

  get question(): SurveyQuestionPrimitiveVO { return this.value.question; }
  get type(): SurveyQuestionDetailProps['type'] { return this.value.type; }
  get options(): ReadonlyArray<string> { return this.value.options; }
  get required(): boolean { return this.value.required; }
}
