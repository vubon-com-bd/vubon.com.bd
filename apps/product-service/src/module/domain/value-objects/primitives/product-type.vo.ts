/**
 * ProductType Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business';

export type ProductTypeValue = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

const VALID_TYPES: readonly string[] = Object.values(PRODUCT_TYPE);

export class ProductTypeVO extends BaseTypeVO<ProductTypeValue> {
  private constructor(value: ProductTypeValue) { super(value); }

  protected static override allowedValues(): ReadonlySet<string> {
    return new Set(VALID_TYPES);
  }

  static create(raw: string): ProductTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ProductType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ProductType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ProductTypeVO(normalized as ProductTypeValue);
  }

  static reconstitute(raw: string): ProductTypeVO {
    return new ProductTypeVO(raw as ProductTypeValue);
  }

  isPhysical(): boolean { return this.value === PRODUCT_TYPE.PHYSICAL; }
  isDigital(): boolean { return this.value === PRODUCT_TYPE.DIGITAL; }
  isService(): boolean { return this.value === PRODUCT_TYPE.SERVICE; }
  isSubscription(): boolean { return this.value === PRODUCT_TYPE.SUBSCRIPTION; }
  isBundle(): boolean { return this.value === PRODUCT_TYPE.BUNDLE; }
  isVariable(): boolean { return this.value === PRODUCT_TYPE.VARIABLE; }
  isSimple(): boolean { return this.value === PRODUCT_TYPE.SIMPLE; }
  isGiftCard(): boolean { return this.value === PRODUCT_TYPE.GIFT_CARD; }

  requiresShipping(): boolean {
    return this.isPhysical() || this.isBundle();
  }

  isDigitalOnly(): boolean {
    return this.isDigital() || this.isService() || this.isSubscription() || this.isGiftCard();
  }
}
