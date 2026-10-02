/**
 * ProductStatus Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business/product';
import { InvalidProductStatusError } from '../../errors/product.errors.js';

export class ProductStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductStatusVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductStatus must be a string');
    }
    const allowed = Object.values(PRODUCT_STATUS);
    if (!(allowed as readonly string[]).includes(raw)) {
      throw new InvalidProductStatusError(raw, allowed);
    }
    return new ProductStatusVO(raw);
  }

  static reconstitute(raw: string): ProductStatusVO {
    return new ProductStatusVO(raw);
  }

  isDraft(): boolean {
    return this.value === PRODUCT_STATUS.DRAFT;
  }

  isPublished(): boolean {
    return this.value === PRODUCT_STATUS.PUBLISHED;
  }

  isArchived(): boolean {
    return this.value === PRODUCT_STATUS.ARCHIVED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [PRODUCT_STATUS.DRAFT]: [PRODUCT_STATUS.PENDING, PRODUCT_STATUS.PUBLISHED, PRODUCT_STATUS.ARCHIVED],
      [PRODUCT_STATUS.PENDING]: [PRODUCT_STATUS.APPROVED, PRODUCT_STATUS.REJECTED],
      [PRODUCT_STATUS.APPROVED]: [PRODUCT_STATUS.PUBLISHED],
      [PRODUCT_STATUS.PUBLISHED]: [PRODUCT_STATUS.OUT_OF_STOCK, PRODUCT_STATUS.ARCHIVED, PRODUCT_STATUS.DISCONTINUED],
      [PRODUCT_STATUS.OUT_OF_STOCK]: [PRODUCT_STATUS.PUBLISHED, PRODUCT_STATUS.DISCONTINUED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
