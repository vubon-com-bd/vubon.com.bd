/**
 * ProductDescription Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 5000;

export class ProductDescriptionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductDescriptionVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductDescription must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`ProductDescription cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ProductDescriptionVO(trimmed);
  }

  static empty(): ProductDescriptionVO {
    return new ProductDescriptionVO('');
  }

  static reconstitute(raw: string): ProductDescriptionVO {
    return new ProductDescriptionVO(raw);
  }

  get isEmpty(): boolean {
    return this.value.length === 0;
  }
}
