/**
 * ProductName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 2;
const MAX_LENGTH = 200;

export class ProductNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductNameVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductName must be a string');
    }
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < MIN_LENGTH) {
      throw new Error(`ProductName must be at least ${MIN_LENGTH} characters`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`ProductName cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ProductNameVO(trimmed);
  }

  static reconstitute(raw: string): ProductNameVO {
    return new ProductNameVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
