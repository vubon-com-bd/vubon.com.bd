import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export interface DimensionValue {
  readonly length: number;
  readonly width: number;
  readonly height: number;
  readonly unit: 'cm' | 'mm' | 'in';
}

export class ProductDimensionVO extends BaseVO<DimensionValue> {
  private constructor(value: DimensionValue) {
    super(Object.freeze({ ...value }));
  }

  static create(value: DimensionValue): ProductDimensionVO {
    if (value.length < 0 || value.width < 0 || value.height < 0) {
      throw new InvalidValueError('product_dimension', 'Dimensions cannot be negative');
    }
    return new ProductDimensionVO(value);
  }

  get volume(): number {
    return this.value.length * this.value.width * this.value.height;
  }
}
