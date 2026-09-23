import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class PromotionUsageVO extends BaseQuantityVO {
  static create(raw: number): PromotionUsageVO {
    if (!Number.isInteger(raw) || raw < 0) {
      throw new Error('PromotionUsage must be a non-negative integer');
    }
    return new PromotionUsageVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }
}
