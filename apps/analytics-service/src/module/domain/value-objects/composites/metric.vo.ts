import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MetricIdVO } from '../primitives/metric-id.vo';
import { MetricNameVO } from '../primitives/metric-name.vo';
import { MetricValueVO } from '../primitives/metric-value.vo';
import { MetricUnitVO } from '../primitives/metric-unit.vo';
import { MetricTypeVO } from '../primitives/metric-type.vo';

export interface MetricProps {
  readonly metricId: MetricIdVO;
  readonly name: MetricNameVO;
  readonly metricValue: MetricValueVO;
  readonly unit: MetricUnitVO;
  readonly type: MetricTypeVO;
}

export class MetricVO extends BaseVO<MetricProps> {
  static create(props: MetricProps): MetricVO {
    return new MetricVO(Object.freeze({ ...props }));
  }

  private constructor(value: MetricProps) {
    super(value);
  }

  get metricId(): MetricIdVO { return this.value.metricId; }
  get name(): MetricNameVO { return this.value.name; }
  get metricValue(): MetricValueVO { return this.value.metricValue; }
  get unit(): MetricUnitVO { return this.value.unit; }
  get type(): MetricTypeVO { return this.value.type; }

  combine(other: MetricVO): MetricVO {
    if (this.value.unit.value !== other.value.unit.value) {
      throw new Error(
        `Cannot combine metrics with different units: ${this.value.unit.value} vs ${other.value.unit.value}`,
      );
    }
    return new MetricVO(
      Object.freeze({
        ...this.value,
        metricValue: this.value.metricValue.add(other.value.metricValue),
      }),
    );
  }

  isGreaterThan(other: MetricVO): boolean {
    return this.value.metricValue.numeric > other.value.metricValue.numeric;
  }

  isZero(): boolean {
    return this.value.metricValue.isZero;
  }
}
