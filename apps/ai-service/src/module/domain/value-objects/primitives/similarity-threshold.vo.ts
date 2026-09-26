import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class SimilarityThresholdVO extends BaseQuantityVO {
  static create(raw: number): SimilarityThresholdVO {
    BaseQuantityVO.validateNonNegative(raw, 'SimilarityThreshold');
    if (raw > 1) {
      throw new Error(`SimilarityThreshold must be <= 1`);
    }
    return new SimilarityThresholdVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  isStrict(): boolean {
    return this.value >= 0.9;
  }
}
