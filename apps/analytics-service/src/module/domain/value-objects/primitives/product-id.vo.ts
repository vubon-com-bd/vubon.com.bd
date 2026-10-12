/**
 * Product ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cross-service Product reference।
 * Business Rule:
 * - UUID format
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import type { ProductId } from '@vubon/shared-types/common';

export class ProductIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductId must be a string');
    }

    const trimmed = raw.trim();

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`ProductId must be a valid UUID: "${trimmed}"`);
    }

    return new ProductIdVO(trimmed);
  }

  static fromBranded(id: ProductId): ProductIdVO {
    return ProductIdVO.create(id as unknown as string);
  }

  toBranded(): ProductId {
    return this.value as unknown as ProductId;
  }
}
