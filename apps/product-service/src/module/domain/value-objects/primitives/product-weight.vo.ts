/**
 * ProductWeight Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_WEIGHT_KG = 10000;

export class ProductWeightVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ProductWeightVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new Error('ProductWeight must be a finite number');
    }
    if (raw <= 0) {
      throw new Error('ProductWeight must be positive');
    }
    if (raw > MAX_WEIGHT_KG) {
      throw new Error(`ProductWeight cannot exceed ${MAX_WEIGHT_KG}kg`);
    }
    return new ProductWeightVO(raw);
  }

  static reconstitute(raw: number): ProductWeightVO {
    return new ProductWeightVO(raw);
  }

  toGrams(): number {
    return this.value * 1000;
  }
}
