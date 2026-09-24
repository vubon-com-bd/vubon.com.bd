import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ANALYTICS_METRIC } from '@vubon/shared-constants/platform/analytics';

const VALID_TYPES = new Set<string>(Object.values(ANALYTICS_METRIC));

export class MetricTypeVO extends BaseTypeVO<string> {
  static create(raw: string): MetricTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new Error(`Invalid metric type: ${raw}`);
    }
    return new MetricTypeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isRevenue(): boolean {
    return this.value === ANALYTICS_METRIC.REVENUE;
  }

  get isCount(): boolean {
    return this.value === ANALYTICS_METRIC.USERS ||
           this.value === ANALYTICS_METRIC.SESSIONS ||
           this.value === ANALYTICS_METRIC.PAGE_VIEWS;
  }

  get isRate(): boolean {
    return this.value === ANALYTICS_METRIC.CONVERSION_RATE ||
           this.value === ANALYTICS_METRIC.BOUNCE_RATE;
  }
}
