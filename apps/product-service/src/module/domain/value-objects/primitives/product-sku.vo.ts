/**
 * ProductSku Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSkuVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 2;
const MAX_LENGTH = 64;

export class ProductSkuVO extends BaseSkuVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductSkuVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductSku must be a string');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new Error(`ProductSku must be ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    }
    return new ProductSkuVO(normalized);
  }

  static reconstitute(raw: string): ProductSkuVO {
    return new ProductSkuVO(raw);
  }
}
