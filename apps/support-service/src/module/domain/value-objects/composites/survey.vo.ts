import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SurveyIdVO } from '../primitives/survey-id.vo';
import { SurveyTypeVO } from '../primitives/survey-type.vo';
import { SurveyStatusVO } from '../primitives/survey-status.vo';

export interface SurveyProps {
  readonly id: SurveyIdVO;
  readonly title: string;
  readonly type: SurveyTypeVO;
  readonly status: SurveyStatusVO;
  readonly questions: ReadonlyArray<unknown>;
  readonly createdAt: Date;
}

export class SurveyVO extends BaseVO<SurveyProps> {
  private constructor(props: SurveyProps) {
    super(Object.freeze({
      ...props,
      questions: Object.freeze([...props.questions]),
    }));
  }

  static create(props: SurveyProps): SurveyVO {
    return new SurveyVO(props);
  }

  get id(): SurveyIdVO { return this.value.id; }
  get title(): string { return this.value.title; }
  get type(): SurveyTypeVO { return this.value.type; }
  get status(): SurveyStatusVO { return this.value.status; }
  get questions(): ReadonlyArray<unknown> { return this.value.questions; }
  get createdAt(): Date { return this.value.createdAt; }
}
