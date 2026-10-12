/**
 * VendorReviewCategory Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_REVIEW_CATEGORY } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_REVIEW_CATEGORY) as readonly string[];

export class VendorReviewCategoryVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): VendorReviewCategoryVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid review category "${raw}"`, 'category');
    }
    return new VendorReviewCategoryVO(raw);
  }

  static reconstitute(raw: string): VendorReviewCategoryVO { return new VendorReviewCategoryVO(raw); }

  isOverall(): boolean { return this.value === VENDOR_REVIEW_CATEGORY.OVERALL; }
  isQuality(): boolean { return this.value === VENDOR_REVIEW_CATEGORY.PRODUCT_QUALITY; }
  isService(): boolean { return this.value === VENDOR_REVIEW_CATEGORY.CUSTOMER_SERVICE; }
  isShipping(): boolean { return this.value === VENDOR_REVIEW_CATEGORY.SHIPPING_SPEED; }
  isPricing(): boolean { return this.value === VENDOR_REVIEW_CATEGORY.PRICING; }
}
