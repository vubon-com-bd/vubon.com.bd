import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SurveyIdVO } from '../primitives/survey-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface SurveyResponseProps {
  readonly surveyId: SurveyIdVO;
  readonly userId: UserIdVO;
  readonly answers: Readonly<Record<string, unknown>>;
  readonly submittedAt: Date;
}

export class SurveyResponseVO extends BaseVO<SurveyResponseProps> {
  private constructor(props: SurveyResponseProps) {
    super(Object.freeze({
      ...props,
      answers: Object.freeze({ ...props.answers }),
    }));
  }

  static create(props: SurveyResponseProps): SurveyResponseVO {
    return new SurveyResponseVO(props);
  }

  get surveyId(): SurveyIdVO { return this.value.surveyId; }
  get userId(): UserIdVO { return this.value.userId; }
  get answers(): Readonly<Record<string, unknown>> { return this.value.answers; }
  get submittedAt(): Date { return this.value.submittedAt; }
}
