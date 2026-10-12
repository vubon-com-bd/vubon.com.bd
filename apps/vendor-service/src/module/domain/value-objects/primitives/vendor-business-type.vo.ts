/**
 * VendorBusinessType Value Object — how the vendor operates
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_BUSINESS_TYPE } from '@vubon/shared-constants/business';
import { InvalidVendorBusinessTypeError } from '../../errors/vendor.errors.js';

const ALLOWED = Object.values(VENDOR_BUSINESS_TYPE) as readonly string[];

export class VendorBusinessTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): VendorBusinessTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVendorBusinessTypeError(String(raw), ALLOWED);
    }
    return new VendorBusinessTypeVO(raw);
  }

  static reconstitute(raw: string): VendorBusinessTypeVO {
    return new VendorBusinessTypeVO(raw);
  }

  // ─── Business helpers ───
  requiresInventory(): boolean {
    return [
      VENDOR_BUSINESS_TYPE.MANUFACTURER,
      VENDOR_BUSINESS_TYPE.WHOLESALER,
      VENDOR_BUSINESS_TYPE.RETAILER,
      VENDOR_BUSINESS_TYPE.DISTRIBUTOR,
      VENDOR_BUSINESS_TYPE.RESELLER,
    ].includes(this.value as never);
  }

  requiresShipping(): boolean {
    return this.value !== VENDOR_BUSINESS_TYPE.SERVICE_PROVIDER;
  }

  isManufacturer(): boolean {
    return this.value === VENDOR_BUSINESS_TYPE.MANUFACTURER;
  }

  isDropshipper(): boolean {
    return this.value === VENDOR_BUSINESS_TYPE.DROPSHIPPER;
  }

  isServiceProvider(): boolean {
    return this.value === VENDOR_BUSINESS_TYPE.SERVICE_PROVIDER;
  }
}
