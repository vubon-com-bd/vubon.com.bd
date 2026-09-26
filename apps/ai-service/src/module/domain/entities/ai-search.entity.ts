import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AiSearchIdVO } from '../value-objects/primitives/ai-search-id.vo';
import { SearchTypeVO } from '../value-objects/primitives/search-type.vo';
import { SearchModelVO } from '../value-objects/primitives/search-model.vo';
import { SearchStatusVO } from '../value-objects/primitives/search-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SearchResultVO } from '../value-objects/composites/search-result.vo';

export interface AiSearchEntityProps {
  readonly userId: UserIdVO | null;
  readonly type: SearchTypeVO;
  readonly model: SearchModelVO;
  readonly status: SearchStatusVO;
  readonly result: SearchResultVO;
}

export class AiSearchEntity extends AggregateRoot<AiSearchIdVO> {
  private readonly _userId: UserIdVO | null;
  private readonly _type: SearchTypeVO;
  private readonly _model: SearchModelVO;
  private readonly _status: SearchStatusVO;
  private readonly _result: SearchResultVO;

  private constructor(
    id: AiSearchIdVO,
    props: AiSearchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._model = props.model;
    this._status = props.status;
    this._result = props.result;
  }

  static create(props: AiSearchEntityProps): AiSearchEntity {
    const now = new Date().toISOString();
    const id = AiSearchIdVO.create(crypto.randomUUID());
    return new AiSearchEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AiSearchIdVO,
    props: AiSearchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AiSearchEntity {
    return new AiSearchEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markCompleted(): AiSearchEntity {
    return new AiSearchEntity(
      this.id,
      { ...this._toProps(), status: SearchStatusVO.create('completed') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isSemantic(): boolean {
    return this._type.isSemantic();
  }

  isCompleted(): boolean {
    return this._status.isCompleted();
  }

  get userId(): UserIdVO | null { return this._userId; }
  get type(): SearchTypeVO { return this._type; }
  get model(): SearchModelVO { return this._model; }
  get status(): SearchStatusVO { return this._status; }
  get result(): SearchResultVO { return this._result; }

  private _toProps(): AiSearchEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      model: this._model,
      status: this._status,
      result: this._result,
    };
  }
}
