/**
 * ProductId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ProductIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('ProductId cannot be empty');
    }
    if (raw.length < 8 || raw.length > 64) {
      throw new Error('ProductId must be 8-64 characters');
    }
    return new ProductIdVO(raw.trim());
  }

  static reconstitute(raw: string): ProductIdVO {
    return new ProductIdVO(raw);
  }
}
