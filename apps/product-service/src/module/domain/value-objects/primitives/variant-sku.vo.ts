/**
 * VariantSku Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSkuVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 2;
const MAX_LENGTH = 64;

export class VariantSkuVO extends BaseSkuVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantSkuVO {
    if (typeof raw !== 'string') {
      throw new Error('VariantSku must be a string');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new Error(`VariantSku must be ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    }
    return new VariantSkuVO(normalized);
  }

  static reconstitute(raw: string): VariantSkuVO {
    return new VariantSkuVO(raw);
  }
}
