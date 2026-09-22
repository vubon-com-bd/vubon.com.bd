import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class VariantSkuVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantSkuVO {
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < 2 || normalized.length > 64) {
      throw new InvalidValueError('variant_sku', 'Variant SKU must be 2-64 characters');
    }
    return new VariantSkuVO(normalized);
  }
}
