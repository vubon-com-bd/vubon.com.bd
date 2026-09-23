import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

export class WeightVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): WeightVO {
    BaseQuantityVO.validateNonNegative(raw, 'Weight');
    return new WeightVO(raw);
  }

  static fromKg(kg: number): WeightVO {
    return WeightVO.create(kg);
  }

  toKg(): number {
    return this.value;
  }
}
