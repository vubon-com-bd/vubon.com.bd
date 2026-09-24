import { MetricEntity } from '../entities/metric.entity';
import { MetricNameVO } from '../value-objects/primitives/metric-name.vo';
import { MetricValueVO } from '../value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../value-objects/primitives/metric-unit.vo';
import { MetricTypeVO } from '../value-objects/primitives/metric-type.vo';

export class MetricRecorderService {
  record(input: {
    name: string;
    value: number;
    unit: string;
    type: string;
    window?: { readonly startMs: number; readonly endMs: number };
  }): MetricEntity {
    const name = MetricNameVO.create(input.name);
    const value = MetricValueVO.create(input.value);
    const unit = MetricUnitVO.create(input.unit);
    const type = MetricTypeVO.create(input.type);

    return MetricEntity.create({
      name,
      value,
      unit,
      type,
      window: input.window ?? null,
    });
  }
}
