import { BaseValueObject } from './base.types';
import { COUNTRY, DIVISIONS, DISTRICTS, UPAZILAS } from '@vubon/shared-constants';

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
  private _data: AddressData;

  constructor(data: AddressData) {
    this._data = {
      street: data.street,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      division: data.division,
      district: data.district,
      upazila: data.upazila,
    };
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): AddressData {
    return { ...this._data };
  }

  // প্রয়োজনীয় অন্যান্য গেটার
  get street(): string {
    return this._data.street;
  }
  get city(): string {
    return this._data.city;
  }
  get state(): string | undefined {
    return this._data.state;
  }
  get postalCode(): string {
    return this._data.postalCode;
  }
  get country(): keyof typeof COUNTRY {
    return this._data.country as keyof typeof COUNTRY;
  }
  get division(): keyof typeof DIVISIONS | undefined {
    return this._data.division as keyof typeof DIVISIONS;
  }
  get district(): keyof typeof DISTRICTS | undefined {
    return this._data.district as keyof typeof DISTRICTS;
  }
  get upazila(): keyof typeof UPAZILAS | undefined {
    return this._data.upazila as keyof typeof UPAZILAS;
  }

  isValid(): boolean {
    return (
      !!this._data.street && !!this._data.city && !!this._data.postalCode && !!this._data.country
    );
  }

  equals(other: Address): boolean {
    return JSON.stringify(this._data) === JSON.stringify(other._data);
  }

  getFullAddress(): string {
    const parts: string[] = [this._data.street, this._data.city, this._data.postalCode];

    if (this._data.state) {
      parts.push(this._data.state);
    }

    parts.push(this._data.country);

    return parts.join(', ');
  }

  toString(): string {
    return this.getFullAddress();
  }
}
