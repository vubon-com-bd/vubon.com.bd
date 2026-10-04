/**
 * ProductDimension Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * ⚠️ BaseCodeVO extend করা হয়নি কারণ BaseCodeVO-তে `length` accessor আছে,
 * যেটা dimension-এর `length` (দৈর্ঘ্য) property-এর সাথে conflict করে।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export type DimensionUnit = 'cm' | 'in';

export class ProductDimensionVO extends BaseVO<string> {
  private constructor(
    value: string,
    public readonly lengthCm: number,
    public readonly widthCm: number,
    public readonly heightCm: number,
    public readonly unit: DimensionUnit,
  ) {
    super(value);
  }

  static create(
    length: number,
    width: number,
    height: number,
    unit: DimensionUnit = 'cm',
  ): ProductDimensionVO {
    if (!Number.isFinite(length) || length <= 0) {
      throw new Error('Dimension length must be a positive number');
    }
    if (!Number.isFinite(width) || width <= 0) {
      throw new Error('Dimension width must be a positive number');
    }
    if (!Number.isFinite(height) || height <= 0) {
      throw new Error('Dimension height must be a positive number');
    }
    if (!['cm', 'in'].includes(unit)) {
      throw new Error(`Invalid dimension unit: ${unit}`);
    }
    const value = `${length}x${width}x${height}${unit}`;
    return new ProductDimensionVO(value, length, width, height, unit);
  }

  static reconstitute(
    length: number,
    width: number,
    height: number,
    unit: DimensionUnit,
  ): ProductDimensionVO {
    const value = `${length}x${width}x${height}${unit}`;
    return new ProductDimensionVO(value, length, width, height, unit);
  }

  get length(): number {
    return this.lengthCm;
  }

  get width(): number {
    return this.widthCm;
  }

  get height(): number {
    return this.heightCm;
  }

  volume(): number {
    return this.lengthCm * this.widthCm * this.heightCm;
  }
}
