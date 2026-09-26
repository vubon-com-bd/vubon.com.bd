import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class VectorDimensionVO extends BaseQuantityVO {
  static create(raw: number): VectorDimensionVO {
    BaseQuantityVO.validatePositive(raw, 'VectorDimension');
    if (!Number.isInteger(raw)) {
      throw new Error('VectorDimension must be an integer');
    }
    if (raw > 16384) {
      throw new Error('VectorDimension too large');
    }
    return new VectorDimensionVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  matches(other: VectorDimensionVO): boolean {
    return this.value === other.value;
  }
}
