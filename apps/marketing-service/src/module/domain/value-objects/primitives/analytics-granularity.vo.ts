import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>(['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']);

export class AnalyticsGranularityVO extends BaseTypeVO<string> {
  static create(raw: string): AnalyticsGranularityVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid AnalyticsGranularity: ${raw}`);
    }
    return new AnalyticsGranularityVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
