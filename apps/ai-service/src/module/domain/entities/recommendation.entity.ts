import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';
import { RecommendationTypeVO } from '../value-objects/primitives/recommendation-type.vo';
import { RecommendationStrategyVO } from '../value-objects/primitives/recommendation-strategy.vo';
import { RecommendationStatusVO } from '../value-objects/primitives/recommendation-status.vo';
import { RecommendationContextVO } from '../value-objects/composites/recommendation-context.vo';
import { RecommendationResultVO } from '../value-objects/composites/recommendation-result.vo';

export interface RecommendationEntityProps {
  readonly type: RecommendationTypeVO;
  readonly strategy: RecommendationStrategyVO;
  readonly status: RecommendationStatusVO;
  readonly context: RecommendationContextVO;
  readonly result: RecommendationResultVO;
}

export class RecommendationEntity extends AggregateRoot<RecommendationIdVO> {
  private readonly _type: RecommendationTypeVO;
  private readonly _strategy: RecommendationStrategyVO;
  private readonly _status: RecommendationStatusVO;
  private readonly _context: RecommendationContextVO;
  private readonly _result: RecommendationResultVO;

  private constructor(
    id: RecommendationIdVO,
    props: RecommendationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._strategy = props.strategy;
    this._status = props.status;
    this._context = props.context;
    this._result = props.result;
  }

  static create(props: RecommendationEntityProps): RecommendationEntity {
    const now = new Date().toISOString();
    const id = RecommendationIdVO.create(crypto.randomUUID());
    return new RecommendationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: RecommendationIdVO,
    props: RecommendationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RecommendationEntity {
    return new RecommendationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeStatus(status: RecommendationStatusVO): RecommendationEntity {
    return new RecommendationEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markClicked(): RecommendationEntity {
    return this.changeStatus(RecommendationStatusVO.create('clicked'));
  }

  markConverted(): RecommendationEntity {
    return this.changeStatus(RecommendationStatusVO.create('converted'));
  }

  isPersonalized(): boolean {
    return this._type.isPersonalized();
  }

  hasResults(): boolean {
    return this._result.size() > 0;
  }

  get type(): RecommendationTypeVO { return this._type; }
  get strategy(): RecommendationStrategyVO { return this._strategy; }
  get status(): RecommendationStatusVO { return this._status; }
  get context(): RecommendationContextVO { return this._context; }
  get result(): RecommendationResultVO { return this._result; }

  private _toProps(): RecommendationEntityProps {
    return {
      type: this._type,
      strategy: this._strategy,
      status: this._status,
      context: this._context,
      result: this._result,
    };
  }
}
