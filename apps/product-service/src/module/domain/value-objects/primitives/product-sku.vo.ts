import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductSkuVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 64;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductSkuVO {
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < 2 || normalized.length > ProductSkuVO.MAX_LENGTH) {
      throw new InvalidValueError('product_sku', 'SKU must be 2-64 characters');
    }
    if (!/^[A-Z0-9\-_]+$/.test(normalized)) {
      throw new InvalidValueError('product_sku', 'SKU may contain only A-Z, 0-9, dash, underscore');
    }
    return new ProductSkuVO(normalized);
  }
}
