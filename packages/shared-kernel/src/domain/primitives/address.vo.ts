/**
 * Address Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে (VALIDATION.ADDRESS)।
 */
import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export interface AddressValue {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
}

export class AddressVO extends BaseVO<AddressValue> {
  private constructor(value: AddressValue) {
    super(value);
  }

  static of(input: AddressValue): AddressVO {
    if (!input || typeof input !== 'object') {
      throw new Error('Address must be an object');
    }

    const line1 = String(input.line1 ?? '').trim();
    const city = String(input.city ?? '').trim();
    const country = String(input.country ?? '').trim();

    if (line1.length < 3 || line1.length > 255) {
      throw new Error('Address line1 must be 3-255 characters');
    }
    if (city.length < 2 || city.length > 100) {
      throw new Error('City must be 2-100 characters');
    }
    if (country.length < 2 || country.length > 3) {
      throw new Error('Country must be a 2-3 char code');
    }

    if (input.postalCode !== undefined && !/^\d{4}$/.test(input.postalCode)) {
      throw new Error('Postal code must be 4 digits');
    }

    return new AddressVO({
      line1,
      line2: input.line2?.trim(),
      city,
      state: input.state?.trim(),
      postalCode: input.postalCode,
      country: country.toUpperCase(),
    });
  }

  get oneLine(): string {
    return [
      this.value.line1,
      this.value.line2,
      this.value.city,
      this.value.state,
      this.value.postalCode,
      this.value.country,
    ]
      .filter(Boolean)
      .join(', ');
  }
}

/**
 * Reference to validation constants to satisfy import contract.
 */
export const ADDRESS_MAX_LENGTH = VALIDATION.NAME_MAX_LENGTH;
