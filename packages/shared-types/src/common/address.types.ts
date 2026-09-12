import { Country, DEFAULT_COUNTRY } from '@vubon/shared-constants/src/common/country.constants';
import { Division } from '@vubon/shared-constants/src/common/divisions.constants';
import { District } from '@vubon/shared-constants/src/common/districts.constants';
import { BaseValueObject } from './base.types';

/**
 * Address data interface
 */
export interface AddressData {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: Country;
  division?: Division;
  district?: District;
  upazila?: string;
}

/**
 * Address Value Object class
 */
export class Address implements BaseValueObject<AddressData> {
  constructor(public value: AddressData) {}

  isValid(): boolean {
    return !!(this.value.street && this.value.city && this.value.postalCode && this.value.country);
  }

  equals(other: Address): boolean {
    return (
      this.value.street === other.value.street &&
      this.value.city === other.value.city &&
      this.value.postalCode === other.value.postalCode &&
      this.value.country === other.value.country
    );
  }

  getFullAddress(): string {
    const parts = [
      this.value.street,
      this.value.city,
      this.value.state,
      this.value.postalCode,
      this.value.country,
    ].filter(Boolean);
    return parts.join(', ');
  }

  toString(): string {
    return this.getFullAddress();
  }
}

/**
 * Default address factory (uses DEFAULT_COUNTRY from shared-constants)
 */
export function createDefaultAddress(): AddressData {
  return {
    street: '',
    city: '',
    postalCode: '',
    country: DEFAULT_COUNTRY,
  };
}
