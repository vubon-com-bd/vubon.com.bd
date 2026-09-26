import { MetricValueVO } from '../value-objects/primitives/metric-value.vo';

export class MetricCalculatorService {
  rate(numerator: number, denominator: number): MetricValueVO {
    if (denominator === 0) return MetricValueVO.create(0);
    return MetricValueVO.create((numerator / denominator) * 100);
  }

  percentageChange(current: number, previous: number): MetricValueVO {
    if (previous === 0) {
      return MetricValueVO.create(current === 0 ? 0 : 100);
    }
    return MetricValueVO.create(((current - previous) / previous) * 100);
  }

  average(values: readonly number[]): MetricValueVO {
    if (values.length === 0) return MetricValueVO.create(0);
    return MetricValueVO.create(values.reduce((a, b) => a + b, 0) / values.length);
  }

  growthRate(values: readonly number[]): MetricValueVO {
    if (values.length < 2) return MetricValueVO.create(0);
    const first = values[0]!;
    const last = values[values.length - 1]!;
    if (first === 0) return MetricValueVO.create(0);
    return MetricValueVO.create(((last - first) / first) * 100);
  }
}
