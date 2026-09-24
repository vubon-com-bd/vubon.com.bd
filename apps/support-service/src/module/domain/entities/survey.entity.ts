import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../value-objects/primitives/survey-type.vo';
import { SurveyStatusVO } from '../value-objects/primitives/survey-status.vo';

export interface SurveyEntityProps {
  readonly title: string;
  readonly type: SurveyTypeVO;
  readonly status: SurveyStatusVO;
  readonly questions: ReadonlyArray<unknown>;
}

export class SurveyEntity extends AggregateRoot<SurveyIdVO> {
  private readonly _title: string;
  private readonly _type: SurveyTypeVO;
  private readonly _status: SurveyStatusVO;
  private readonly _questions: ReadonlyArray<unknown>;

  private constructor(
    id: SurveyIdVO,
    props: SurveyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._title = props.title;
    this._type = props.type;
    this._status = props.status;
    this._questions = Object.freeze([...props.questions]);
  }

  static create(props: SurveyEntityProps): SurveyEntity {
    const now = new Date().toISOString();
    const id = SurveyIdVO.create(crypto.randomUUID());
    return new SurveyEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SurveyIdVO,
    props: SurveyEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SurveyEntity {
    return new SurveyEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get title(): string { return this._title; }
  get type(): SurveyTypeVO { return this._type; }
  get status(): SurveyStatusVO { return this._status; }
  get questions(): ReadonlyArray<unknown> { return this._questions; }
}
