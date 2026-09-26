import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ForecastIdVO } from '../value-objects/primitives/forecast-id.vo';
import { ForecastResultVO } from '../value-objects/composites/forecast-result.vo';

export interface ForecastResultEntityProps {
  readonly forecastId: ForecastIdVO;
  readonly result: ForecastResultVO;
}

export class ForecastResultEntity extends BaseEntity<ForecastIdVO> {
  private readonly _forecastId: ForecastIdVO;
  private readonly _result: ForecastResultVO;

  private constructor(
    id: ForecastIdVO,
    props: ForecastResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._forecastId = props.forecastId;
    this._result = props.result;
  }

  static create(props: ForecastResultEntityProps): ForecastResultEntity {
    const now = new Date().toISOString();
    return new ForecastResultEntity(props.forecastId, props, now, now, null);
  }

  static reconstitute(
    id: ForecastIdVO,
    props: ForecastResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ForecastResultEntity {
    return new ForecastResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  size(): number {
    return this._result.size();
  }

  get forecastId(): ForecastIdVO { return this._forecastId; }
  get result(): ForecastResultVO { return this._result; }
}
