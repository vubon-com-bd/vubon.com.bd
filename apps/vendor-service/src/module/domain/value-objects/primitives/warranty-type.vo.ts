/**
 * WarrantyType Value Object — warranty coverage type
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_WARRANTY_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_WARRANTY_TYPE) as readonly string[];

export class WarrantyTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): WarrantyTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid warranty type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'warrantyType',
      );
    }
    return new WarrantyTypeVO(raw);
  }

  static reconstitute(raw: string): WarrantyTypeVO {
    return new WarrantyTypeVO(raw);
  }

  static none(): WarrantyTypeVO {
    return new WarrantyTypeVO(VENDOR_WARRANTY_TYPE.NONE);
  }

  static default(): WarrantyTypeVO {
    return new WarrantyTypeVO(VENDOR_WARRANTY_TYPE.SELLER);
  }

  hasWarranty(): boolean {
    return this.value !== VENDOR_WARRANTY_TYPE.NONE;
  }

  /** Manufacturer warranty — usually strongest coverage. */
  isManufacturerBacked(): boolean {
    return this.value === VENDOR_WARRANTY_TYPE.MANUFACTURER;
  }

  /** Seller/vendor issued warranty. */
  isSellerBacked(): boolean {
    return this.value === VENDOR_WARRANTY_TYPE.SELLER;
  }

  /** Extended — purchaser paid extra. */
  isExtended(): boolean {
    return this.value === VENDOR_WARRANTY_TYPE.EXTENDED;
  }

  /** International — valid across borders. */
  isInternational(): boolean {
    return this.value === VENDOR_WARRANTY_TYPE.INTERNATIONAL;
  }

  /** Limited — has specific exclusions. */
  isLimited(): boolean {
    return this.value === VENDOR_WARRANTY_TYPE.LIMITED;
  }
}
