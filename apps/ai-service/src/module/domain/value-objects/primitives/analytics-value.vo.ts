import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class AnalyticsValueVO extends BaseQuantityVO {
  static create(raw: number): AnalyticsValueVO {
    if (!Number.isFinite(raw)) {
      throw new Error('AnalyticsValue must be finite');
    }
    return new AnalyticsValueVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }
}
