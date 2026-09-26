import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ForecastIdVO } from '../value-objects/primitives/forecast-id.vo';
import { ForecastHorizonVO } from '../value-objects/primitives/forecast-horizon.vo';
import { ForecastResultVO } from '../value-objects/composites/forecast-result.vo';

export interface ForecastEntityProps {
  readonly target: string;
  readonly horizon: ForecastHorizonVO;
  readonly model: string;
  readonly result: ForecastResultVO;
}

export class ForecastEntity extends AggregateRoot<ForecastIdVO> {
  private readonly _target: string;
  private readonly _horizon: ForecastHorizonVO;
  private readonly _model: string;
  private readonly _result: ForecastResultVO;

  private constructor(
    id: ForecastIdVO,
    props: ForecastEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._target = props.target;
    this._horizon = props.horizon;
    this._model = props.model;
    this._result = props.result;
  }

  static create(props: ForecastEntityProps): ForecastEntity {
    const now = new Date().toISOString();
    const id = ForecastIdVO.create(crypto.randomUUID());
    return new ForecastEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ForecastIdVO,
    props: ForecastEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ForecastEntity {
    return new ForecastEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  hasData(): boolean {
    return this._result.size() > 0;
  }

  get target(): string { return this._target; }
  get horizon(): ForecastHorizonVO { return this._horizon; }
  get model(): string { return this._model; }
  get result(): ForecastResultVO { return this._result; }
}
