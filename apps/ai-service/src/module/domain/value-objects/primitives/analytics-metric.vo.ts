import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_ANALYTICS_METRIC } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_ANALYTICS_METRIC));

export class AnalyticsMetricVO extends BaseTypeVO<string> {
  static create(raw: string): AnalyticsMetricVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid analytics metric: ${raw}`);
    }
    return new AnalyticsMetricVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
