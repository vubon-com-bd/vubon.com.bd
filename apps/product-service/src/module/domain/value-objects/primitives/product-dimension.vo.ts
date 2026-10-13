/**
 * ProductDimension Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Unit: cm (length, width, height > 0)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type DimensionUnit = 'cm' | 'in';

export interface ProductDimensionProps {
  readonly length: number;
  readonly width: number;
  readonly height: number;
  readonly unit: DimensionUnit;
}

export class ProductDimensionVO extends BaseVO<ProductDimensionProps> {
  private constructor(value: ProductDimensionProps) { super(value); }

  static create(props: ProductDimensionProps): ProductDimensionVO {
    const { length, width, height, unit } = props;
    for (const [name, v] of [['length', length], ['width', width], ['height', height]] as const) {
      if (!Number.isFinite(v)) {
        throw new ValidationError(`ProductDimension ${name} must be finite`, 'dimensions');
      }
      if (v <= 0) {
        throw new ValidationError(`ProductDimension ${name} must be > 0`, 'dimensions');
      }
    }
    if (unit !== 'cm' && unit !== 'in') {
      throw new ValidationError('ProductDimension unit must be cm|in', 'dimensions');
    }
    return new ProductDimensionVO({ length, width, height, unit });
  }

  static reconstitute(props: ProductDimensionProps): ProductDimensionVO {
    return new ProductDimensionVO(props);
  }

  get length(): number { return this.value.length; }
  get width(): number { return this.value.width; }
  get height(): number { return this.value.height; }
  get unit(): DimensionUnit { return this.value.unit; }

  volume(): number {
    return Math.round(this.value.length * this.value.width * this.value.height * 1000) / 1000;
  }

  isOversized(): boolean {
    const maxCm = 200;
    const factor = this.unit === 'in' ? 2.54 : 1;
    return (
      this.value.length * factor > maxCm ||
      this.value.width * factor > maxCm ||
      this.value.height * factor > maxCm
    );
  }
}
