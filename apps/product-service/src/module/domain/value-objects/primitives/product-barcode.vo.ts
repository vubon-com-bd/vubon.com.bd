import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductBarcodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductBarcodeVO {
    const normalized = raw.trim();
    if (!/^\d{8,14}$/.test(normalized)) {
      throw new InvalidValueError('product_barcode', `Invalid barcode: ${raw}`);
    }
    return new ProductBarcodeVO(normalized);
  }
}
