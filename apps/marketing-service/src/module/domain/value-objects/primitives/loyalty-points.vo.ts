import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class LoyaltyPointsVO extends BaseQuantityVO {
  static create(raw: number): LoyaltyPointsVO {
    if (!Number.isInteger(raw) || raw < 0) {
      throw new Error('LoyaltyPoints must be a non-negative integer');
    }
    return new LoyaltyPointsVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }
}
