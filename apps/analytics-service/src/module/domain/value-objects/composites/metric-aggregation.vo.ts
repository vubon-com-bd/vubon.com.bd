/**
 * Metric Aggregation Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Aggregated metric result (sum, avg, min, max, count, etc.)।
 * Business Rule:
 * - Aggregation type determines value semantics
 * - COUNT/COUNT_DISTINCT → integer
 * - AVG → decimal
 * - SUM → decimal
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_AGGREGATION } from '@vubon/shared-constants/platform/analytics';
import { MetricNameVO } from '../primitives/metric-name.vo.js';
import { TimeRangeVO } from './time-range.vo.js';
import { GranularityVO } from './granularity.vo.js';

type AggregationType = (typeof ANALYTICS_AGGREGATION)[keyof typeof ANALYTICS_AGGREGATION];

export interface MetricAggregationVOProps {
  readonly metric: MetricNameVO;
  readonly aggregation: AggregationType;
  readonly value: number;
  readonly range: TimeRangeVO;
  readonly granularity?: GranularityVO;
  readonly sampleCount?: number;
}

export class MetricAggregationVO extends BaseVO<MetricAggregationVOProps> {
  private constructor(props: MetricAggregationVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: MetricAggregationVOProps): MetricAggregationVO {
    if (!props.metric || !props.aggregation || !props.range) {
      throw new Error('MetricAggregationVO requires metric, aggregation, range');
    }
    if (!Number.isFinite(props.value)) {
      throw new Error('MetricAggregationVO value must be finite');
    }
    if (props.sampleCount !== undefined && props.sampleCount < 0) {
      throw new Error('sampleCount cannot be negative');
    }
    return new MetricAggregationVO(props);
  }

  get metric(): MetricNameVO {
    return this.value.metric;
  }

  get aggregation(): AggregationType {
    return this.value.aggregation;
  }

  get aggregationValue(): number {
    return this.value.value;
  }

  get range(): TimeRangeVO {
    return this.value.range;
  }

  get granularity(): GranularityVO | undefined {
    return this.value.granularity;
  }

  get sampleCount(): number | undefined {
    return this.value.sampleCount;
  }

  isSum(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.SUM;
  }

  isAvg(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.AVG;
  }

  isMin(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.MIN;
  }

  isMax(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.MAX;
  }

  isCount(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.COUNT;
  }

  isCountDistinct(): boolean {
    return this.aggregation === ANALYTICS_AGGREGATION.COUNT_DISTINCT;
  }

  /** Percentage/share compute against total */
  shareOf(total: number): number {
    if (total === 0) return 0;
    return Math.round((this.aggregationValue / total) * 10000) / 10000;
  }

  /** Average per sample */
  averagePerSample(): number {
    if (!this.sampleCount || this.sampleCount === 0) return this.aggregationValue;
    return Math.round((this.aggregationValue / this.sampleCount) * 10000) / 10000;
  }
}
