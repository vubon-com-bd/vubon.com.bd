/**
 * ProductBarcode Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 64;

export class ProductBarcodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductBarcodeVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductBarcode must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`ProductBarcode cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ProductBarcodeVO(trimmed);
  }

  static empty(): ProductBarcodeVO {
    return new ProductBarcodeVO('');
  }

  static reconstitute(raw: string): ProductBarcodeVO {
    return new ProductBarcodeVO(raw);
  }
}
