import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class AnalyticsMetricVO extends BaseCodeVO {
  static create(raw: string): AnalyticsMetricVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('AnalyticsMetric cannot be empty');
    }
    return new AnalyticsMetricVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
