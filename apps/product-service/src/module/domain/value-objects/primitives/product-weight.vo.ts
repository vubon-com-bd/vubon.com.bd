import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductWeightVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ProductWeightVO {
    if (raw < 0) {
      throw new InvalidValueError('product_weight', `Weight cannot be negative: ${raw}`);
    }
    if (raw > 100000) {
      throw new InvalidValueError('product_weight', `Weight exceeds max: ${raw}`);
    }
    return new ProductWeightVO(raw);
  }

  get kg(): number {
    return this.value / 1000;
  }
}
