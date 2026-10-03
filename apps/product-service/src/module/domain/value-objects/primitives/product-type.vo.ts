/**
 * ProductType Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { InvalidProductTypeError } from '../../errors/product.errors.js';

export class ProductTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductType must be a string');
    }
    const allowed = Object.values(PRODUCT_TYPE);
    if (!(allowed as readonly string[]).includes(raw)) {
      throw new InvalidProductTypeError(raw, allowed);
    }
    return new ProductTypeVO(raw);
  }

  static reconstitute(raw: string): ProductTypeVO {
    return new ProductTypeVO(raw);
  }

  isPhysical(): boolean {
    return this.value === PRODUCT_TYPE.PHYSICAL;
  }

  isDigital(): boolean {
    return this.value === PRODUCT_TYPE.DIGITAL;
  }

  requiresShipping(): boolean {
    return this.isPhysical();
  }
}
