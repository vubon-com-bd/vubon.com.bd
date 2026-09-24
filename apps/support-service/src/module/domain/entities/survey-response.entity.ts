import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SurveyResponseEntityProps {
  readonly surveyId: SurveyIdVO;
  readonly userId: UserIdVO;
  readonly answers: Readonly<Record<string, unknown>>;
}

export class SurveyResponseEntity extends BaseEntity<string> {
  private readonly _surveyId: SurveyIdVO;
  private readonly _userId: UserIdVO;
  private readonly _answers: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    props: SurveyResponseEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._surveyId = props.surveyId;
    this._userId = props.userId;
    this._answers = Object.freeze({ ...props.answers });
  }

  static create(props: SurveyResponseEntityProps): SurveyResponseEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new SurveyResponseEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: SurveyResponseEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SurveyResponseEntity {
    return new SurveyResponseEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get surveyId(): SurveyIdVO { return this._surveyId; }
  get userId(): UserIdVO { return this._userId; }
  get answers(): Readonly<Record<string, unknown>> { return this._answers; }
}
