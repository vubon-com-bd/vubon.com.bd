/**
 * ProductId Value Object (Cross-Service Reference)
 * @module notification-service/domain/value-objects/primitives
 *
 * ⚠️ External Aggregate Reference — Product service এর Product।
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import type { ProductId } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 128;

export class ProductIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ProductId cannot be empty', 'productId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`ProductId exceeds ${MAX_LENGTH} chars`, 'productId');
    }
    return new ProductIdVO(trimmed);
  }

  static reconstitute(raw: string): ProductIdVO {
    return new ProductIdVO(raw);
  }

  toBranded(): ProductId {
    return this.value as ProductId;
  }

  static fromBranded(branded: ProductId): ProductIdVO {
    return new ProductIdVO(branded as string);
  }
}
