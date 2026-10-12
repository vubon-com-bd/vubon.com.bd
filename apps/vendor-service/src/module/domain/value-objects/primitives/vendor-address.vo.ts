/**
 * VendorAddress Value Object — structured BD address
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface VendorAddressValue {
  readonly line1: string;
  readonly line2?: string;
  readonly area?: string;
  readonly upazila: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode?: string;
  readonly country: string;
}

const MAX_LINE = 255;
const MAX_AREA = 100;

export class VendorAddressVO extends BaseVO<VendorAddressValue> {
  private constructor(value: VendorAddressValue) {
    super(value);
  }

  static create(input: VendorAddressValue): VendorAddressVO {
    if (!input || typeof input !== 'object') {
      throw new ValidationError('Vendor address must be an object', 'address');
    }

    const line1 = String(input.line1 ?? '').trim();
    const upazila = String(input.upazila ?? '').trim();
    const district = String(input.district ?? '').trim();
    const division = String(input.division ?? '').trim();
    const country = String(input.country ?? '').trim().toUpperCase();

    if (line1.length < 3 || line1.length > MAX_LINE) {
      throw new ValidationError(`Address line1 must be 3-${MAX_LINE} chars`, 'address.line1');
    }
    if (upazila.length < 2 || upazila.length > MAX_AREA) {
      throw new ValidationError(`Upazila must be 2-${MAX_AREA} chars`, 'address.upazila');
    }
    if (district.length < 2 || district.length > MAX_AREA) {
      throw new ValidationError(`District must be 2-${MAX_AREA} chars`, 'address.district');
    }
    if (division.length < 2 || division.length > MAX_AREA) {
      throw new ValidationError(`Division must be 2-${MAX_AREA} chars`, 'address.division');
    }
    if (country.length !== 2 && country.length !== 3) {
      throw new ValidationError('Country must be a 2-3 char ISO code', 'address.country');
    }
    if (input.postalCode !== undefined && input.postalCode !== '' && !/^\d{4}$/.test(input.postalCode)) {
      throw new ValidationError('Postal code must be 4 digits (BD)', 'address.postalCode');
    }

    return new VendorAddressVO({
      line1,
      line2: input.line2?.trim() || undefined,
      area: input.area?.trim() || undefined,
      upazila,
      district,
      division,
      postalCode: input.postalCode || undefined,
      country,
    });
  }

  static reconstitute(input: VendorAddressValue): VendorAddressVO {
    return new VendorAddressVO(input);
  }

  get oneLine(): string {
    const v = this.value;
    return [v.line1, v.line2, v.area, v.upazila, v.district, v.division, v.postalCode, v.country]
      .filter(Boolean)
      .join(', ');
  }

  isBangladeshi(): boolean {
    return this.value.country === 'BD' || this.value.country === 'BGD';
  }

  withPostalCode(code: string): VendorAddressVO {
    return VendorAddressVO.create({ ...this.value, postalCode: code });
  }
}
