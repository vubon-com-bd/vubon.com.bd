/**
 * ProductId Value Object (cross-service reference → product-service)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ProductIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ProductId cannot be empty', 'productId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ProductId must be a valid UUID', 'productId');
    }
    return new ProductIdVO(trimmed);
  }

  static reconstitute(raw: string): ProductIdVO {
    return new ProductIdVO(raw);
  }
}
