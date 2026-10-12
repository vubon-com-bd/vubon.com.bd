/**
 * Metric Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { MetricIdVO } from '../primitives/metric-id.vo.js';
import { MetricNameVO } from '../primitives/metric-name.vo.js';
import { MetricValueVO } from '../primitives/metric-value.vo.js';
import { MetricUnitVO } from '../primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../primitives/metric-type.vo.js';
import { TimeRangeVO } from './time-range.vo.js';

export interface MetricVOProps {
  readonly id: MetricIdVO;
  readonly name: MetricNameVO;
  readonly value: MetricValueVO;
  readonly unit: MetricUnitVO;
  readonly type: MetricTypeVO;
  readonly timeRange?: TimeRangeVO;
}

export class MetricVO extends BaseVO<MetricVOProps> {
  private constructor(props: MetricVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: MetricVOProps): MetricVO {
    if (!props.id || !props.name || !props.value || !props.unit || !props.type) {
      throw new Error('MetricVO requires id, name, value, unit, type');
    }
    if (!props.unit.isValueInRange(props.value.numeric)) {
      throw new Error(
        `Metric value ${props.value.numeric} out of range for unit ${props.unit.value}`
      );
    }
    return new MetricVO(props);
  }

  get id(): MetricIdVO { return this.value.id; }
  get name(): MetricNameVO { return this.value.name; }
  get metricValue(): MetricValueVO { return this.value.value; }
  get unit(): MetricUnitVO { return this.value.unit; }
  get type(): MetricTypeVO { return this.value.type; }
  get timeRange(): TimeRangeVO | undefined { return this.value.timeRange; }

  isRate(): boolean {
    return this.name.isRate() || this.unit.isPercentage() || this.unit.isRatio();
  }

  isRevenue(): boolean {
    return this.name.isRevenue() || this.unit.isCurrency();
  }

  isHigherBetter(): boolean {
    return this.name.isHigherBetter();
  }

  isZero(): boolean {
    return this.metricValue.isZero();
  }

  isHigherThan(other: MetricVO): boolean {
    if (!this.sameType(other)) {
      throw new Error('Cannot compare metrics of different types');
    }
    return this.metricValue.numeric > other.metricValue.numeric;
  }

  sameType(other: MetricVO): boolean {
    return this.name.equals(other.name) && this.unit.equals(other.unit);
  }

  percentChangeFrom(other: MetricVO): number {
    if (!this.sameType(other)) {
      throw new Error('Cannot compare metrics of different types');
    }
    if (other.metricValue.isZero()) return 0;
    return Math.round(((this.metricValue.numeric - other.metricValue.numeric) / other.metricValue.numeric) * 10000) / 100;
  }

  absoluteChangeFrom(other: MetricVO): number {
    return this.metricValue.numeric - other.metricValue.numeric;
  }
}
