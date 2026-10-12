/**
 * Metric Aggregation Entity
 * @module analytics-service/domain/entities
 *
 * Persisted aggregation result for a metric × period × dimension combination.
 * Business Rule:
 * - Immutable after creation
 * - Composite key: (metric, period, dimensions)
 * - Cached for reporting
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { MetricAggregationVO } from '../value-objects/composites/metric-aggregation.vo.js';
import { DimensionValueCompositeVO } from '../value-objects/composites/dimension-value.vo.js';

export interface MetricAggregationEntityProps {
  readonly aggregation: MetricAggregationVO;
  readonly dimensions: readonly DimensionValueCompositeVO[];
}

export class MetricAggregationEntity extends BaseEntity<string> {
  private props: MetricAggregationEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: MetricAggregationEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    aggregation: MetricAggregationVO;
    dimensions: readonly DimensionValueCompositeVO[];
    now: string;
  }): MetricAggregationEntity {
    if (!params.aggregation) {
      throw new Error('MetricAggregationEntity requires aggregation');
    }

    // Unique dimensions
    const keys = params.dimensions.map((d) => d.key());
    if (new Set(keys).size !== keys.length) {
      throw new Error('Dimensions must be unique');
    }

    return new MetricAggregationEntity(
      params.id,
      params.now,
      params.now,
      {
        aggregation: params.aggregation,
        dimensions: Object.freeze([...params.dimensions]),
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: MetricAggregationEntityProps;
  }): MetricAggregationEntity {
    return new MetricAggregationEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get aggregation(): MetricAggregationVO { return this.props.aggregation; }
  get dimensions(): readonly DimensionValueCompositeVO[] { return this.props.dimensions; }

  /** Composite key */
  aggregationKey(): string {
    const dims = this.props.dimensions.map((d) => d.key()).sort().join('|');
    return `${this.props.aggregation.metric.value}::${dims}`;
  }

  dimensionCount(): number {
    return this.props.dimensions.length;
  }

  hasDimension(dimKey: string): boolean {
    return this.props.dimensions.some((d) => d.key() === dimKey);
  }
}
