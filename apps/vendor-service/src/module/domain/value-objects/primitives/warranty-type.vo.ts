/**
 * WarrantyType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_WARRANTY_TYPE } from '@vubon/shared-constants/business';

export type WarrantyTypeValue =
  (typeof VENDOR_WARRANTY_TYPE)[keyof typeof VENDOR_WARRANTY_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_WARRANTY_TYPE));

export class WarrantyTypeVO extends BaseTypeVO<WarrantyTypeValue> {
  private constructor(value: WarrantyTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): WarrantyTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('WarrantyType must be a string', 'warrantyType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid WarrantyType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'warrantyType',
      );
    }
    return new WarrantyTypeVO(normalized as WarrantyTypeValue);
  }

  static reconstitute(raw: string): WarrantyTypeVO {
    return new WarrantyTypeVO(raw as WarrantyTypeValue);
  }

  // ─── Predicates ───
  isNone(): boolean { return this.value === 'none'; }
  isManufacturer(): boolean { return this.value === 'manufacturer'; }
  isSeller(): boolean { return this.value === 'seller'; }
  isExtended(): boolean { return this.value === 'extended'; }
  isInternational(): boolean { return this.value === 'international'; }
  isLimited(): boolean { return this.value === 'limited'; }

  /** Any warranty coverage */
  providesCoverage(): boolean {
    return !this.isNone();
  }

  /** Warranty provided by the vendor directly */
  isSellerBacked(): boolean {
    return this.isSeller() || this.isExtended();
  }

  /** Warranty is manufacturer-backed */
  isManufacturerBacked(): boolean {
    return this.isManufacturer() || this.isInternational();
  }

  /** Coverage has exclusions/limitations */
  hasLimitations(): boolean {
    return this.isLimited();
  }
}
