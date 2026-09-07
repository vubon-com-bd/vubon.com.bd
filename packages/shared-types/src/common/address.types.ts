import { BaseValueObject } from './base.types';

export interface AddressData {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  division?: string;
  district?: string;
  upazila?: string;
}

export class Address implements BaseValueObject<AddressData> {
  constructor(public value: AddressData) {}

  isValid(): boolean {
    return (
      this.value.street.trim() !== '' &&
      this.value.city.trim() !== '' &&
      this.value.postalCode.trim() !== '' &&
      this.value.country.trim() !== ''
    );
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
