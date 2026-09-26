import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class InsightConfidenceVO extends BaseQuantityVO {
  static create(raw: number): InsightConfidenceVO {
    BaseQuantityVO.validateNonNegative(raw, 'InsightConfidence');
    if (raw > 1) {
      throw new Error(`InsightConfidence must be <= 1`);
    }
    return new InsightConfidenceVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  isHigh(): boolean {
    return this.value >= 0.8;
  }
}
