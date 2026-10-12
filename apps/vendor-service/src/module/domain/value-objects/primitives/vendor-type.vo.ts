/**
 * VendorType Value Object — legal entity type
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_TYPE } from '@vubon/shared-constants/business';
import { InvalidVendorTypeError } from '../../errors/vendor.errors.js';

const ALLOWED = Object.values(VENDOR_TYPE) as readonly string[];

export class VendorTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): VendorTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVendorTypeError(String(raw), ALLOWED);
    }
    return new VendorTypeVO(raw);
  }

  static reconstitute(raw: string): VendorTypeVO {
    return new VendorTypeVO(raw);
  }

  // ─── Business helpers ───
  requiresBusinessLicense(): boolean {
    return [
      VENDOR_TYPE.SOLE_PROPRIETOR,
      VENDOR_TYPE.PARTNERSHIP,
      VENDOR_TYPE.LIMITED_COMPANY,
      VENDOR_TYPE.CORPORATION,
      VENDOR_TYPE.COOPERATIVE,
    ].includes(this.value as never);
  }

  requiresTaxId(): boolean {
    return [
      VENDOR_TYPE.PARTNERSHIP,
      VENDOR_TYPE.LIMITED_COMPANY,
      VENDOR_TYPE.CORPORATION,
      VENDOR_TYPE.COOPERATIVE,
    ].includes(this.value as never);
  }

  isIndividual(): boolean {
    return this.value === VENDOR_TYPE.INDIVIDUAL;
  }

  isCorporate(): boolean {
    return [
      VENDOR_TYPE.LIMITED_COMPANY,
      VENDOR_TYPE.CORPORATION,
      VENDOR_TYPE.COOPERATIVE,
      VENDOR_TYPE.GOVERNMENT,
    ].includes(this.value as never);
  }
}
