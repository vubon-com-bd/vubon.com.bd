import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class RecommendationScoreVO extends BaseQuantityVO {
  static create(raw: number): RecommendationScoreVO {
    BaseQuantityVO.validateNonNegative(raw, 'RecommendationScore');
    if (raw > 1) {
      throw new Error(`RecommendationScore must be <= 1 (got ${raw})`);
    }
    return new RecommendationScoreVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  isHigh(): boolean {
    return this.value >= 0.7;
  }

  isLow(): boolean {
    return this.value < 0.3;
  }
}
