import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MetricValueVO } from '../primitives/metric-value.vo';
import { MetricUnitVO } from '../primitives/metric-unit.vo';
import { ANALYTICS_AGGREGATION } from '@vubon/shared-constants/platform/analytics';

export interface MetricAggregationProps {
  readonly aggregation: string;
  readonly aggregateValue: MetricValueVO;
  readonly unit: MetricUnitVO;
  readonly sampleSize: number;
}

const VALID_AGGREGATIONS = new Set<string>(Object.values(ANALYTICS_AGGREGATION));

export class MetricAggregationVO extends BaseVO<MetricAggregationProps> {
  static create(props: MetricAggregationProps): MetricAggregationVO {
    if (!VALID_AGGREGATIONS.has(props.aggregation)) {
      throw new Error(`Invalid aggregation: ${props.aggregation}`);
    }
    if (props.sampleSize < 0) {
      throw new Error('Sample size cannot be negative');
    }
    return new MetricAggregationVO(Object.freeze({ ...props }));
  }

  private constructor(value: MetricAggregationProps) {
    super(value);
  }

  get aggregation(): string { return this.value.aggregation; }
  get aggregateValue(): MetricValueVO { return this.value.aggregateValue; }
  get unit(): MetricUnitVO { return this.value.unit; }
  get sampleSize(): number { return this.value.sampleSize; }

  isReliable(minSample = 30): boolean {
    return this.value.sampleSize >= minSample;
  }

  get confidenceLevel(): 'low' | 'medium' | 'high' {
    const n = this.value.sampleSize;
    if (n >= 1000) return 'high';
    if (n >= 100) return 'medium';
    return 'low';
  }
}
