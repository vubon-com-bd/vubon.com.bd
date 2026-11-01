/**
 * ProductBarcode Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PATTERN = /^[0-9A-Za-z\-_]{6,64}$/;

export class ProductBarcodeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ProductBarcodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ProductBarcode must be a string', 'barcode');
    }
    const normalized = raw.trim();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError('ProductBarcode format is invalid', 'barcode');
    }
    return new ProductBarcodeVO(normalized);
  }

  static reconstitute(raw: string): ProductBarcodeVO { return new ProductBarcodeVO(raw); }
}
