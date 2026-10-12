/**
 * VendorRatingCategory Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_RATING_CATEGORY } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_RATING_CATEGORY) as readonly string[];

export class VendorRatingCategoryVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): VendorRatingCategoryVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid rating category "${raw}"`, 'category');
    }
    return new VendorRatingCategoryVO(raw);
  }

  static reconstitute(raw: string): VendorRatingCategoryVO { return new VendorRatingCategoryVO(raw); }

  /** Categories that affect product quality score. */
  affectsProduct(): boolean {
    return [VENDOR_RATING_CATEGORY.PRODUCT_QUALITY, VENDOR_RATING_CATEGORY.VALUE_FOR_MONEY, VENDOR_RATING_CATEGORY.PACKAGING].includes(this.value as never);
  }

  /** Categories that affect service score. */
  affectsService(): boolean {
    return [VENDOR_RATING_CATEGORY.CUSTOMER_SERVICE, VENDOR_RATING_CATEGORY.COMMUNICATION, VENDOR_RATING_CATEGORY.SHIPPING_SPEED].includes(this.value as never);
  }
}
