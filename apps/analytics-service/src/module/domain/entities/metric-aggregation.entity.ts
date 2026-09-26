import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MetricIdVO } from '../value-objects/primitives/metric-id.vo';
import { MetricAggregationVO } from '../value-objects/composites/metric-aggregation.vo';

export interface MetricAggregationEntityProps {
  readonly metricId: MetricIdVO;
  readonly aggregation: MetricAggregationVO;
}

export class MetricAggregationEntity extends BaseEntity<MetricIdVO> {
  private readonly _metricId: MetricIdVO;
  private readonly _aggregation: MetricAggregationVO;

  private constructor(
    id: MetricIdVO,
    props: MetricAggregationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._metricId = props.metricId;
    this._aggregation = props.aggregation;
  }

  static create(props: MetricAggregationEntityProps): MetricAggregationEntity {
    const now = new Date().toISOString();
    return new MetricAggregationEntity(props.metricId, props, now, now, null);
  }

  static reconstitute(
    id: MetricIdVO,
    props: MetricAggregationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MetricAggregationEntity {
    return new MetricAggregationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get metricId(): MetricIdVO { return this._metricId; }
  get aggregation(): MetricAggregationVO { return this._aggregation; }

  isReliable(): boolean {
    return this._aggregation.isReliable();
  }
}
