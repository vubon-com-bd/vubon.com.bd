/**
 * ProductWeight Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Unit: grams (integer, > 0)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_GRAMS = 1;
const MAX_GRAMS = 1_000_000;

export class ProductWeightVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(grams: number): ProductWeightVO {
    if (!Number.isFinite(grams)) {
      throw new ValidationError('ProductWeight must be a finite number', 'weight');
    }
    if (!Number.isInteger(grams)) {
      throw new ValidationError('ProductWeight must be an integer (grams)', 'weight');
    }
    if (grams < MIN_GRAMS) {
      throw new ValidationError(`ProductWeight must be >= ${MIN_GRAMS}g`, 'weight');
    }
    if (grams > MAX_GRAMS) {
      throw new ValidationError(`ProductWeight exceeds max ${MAX_GRAMS}g`, 'weight');
    }
    return new ProductWeightVO(grams);
  }

  static reconstitute(grams: number): ProductWeightVO { return new ProductWeightVO(grams); }

  get grams(): number { return this.value; }
  toKilograms(): number { return Math.round((this.value / 1000) * 1000) / 1000; }
  isHeavy(): boolean { return this.value >= 5000; }
}
