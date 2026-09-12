import { ValueObject } from '../base/base.vo';
import { DIVISIONS } from '@vubon/shared-constants';

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division?: keyof typeof DIVISIONS;
  district?: string;
  upazila?: string;
  union?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export class Address extends ValueObject<AddressProps> {
  protected validate(): void {
    if (!this._value.street || this._value.street.length === 0) {
      throw new Error('Street address is required');
    }
    if (!this._value.city || this._value.city.length === 0) {
      throw new Error('City is required');
    }
    if (!this._value.country || this._value.country.length === 0) {
      throw new Error('Country is required');
    }
    if (!this._value.zipCode || this._value.zipCode.length === 0) {
      throw new Error('ZIP code is required');
    }
  }

  get street(): string {
    return this._value.street;
  }

  get city(): string {
    return this._value.city;
  }

  get state(): string {
    return this._value.state;
  }

  get country(): string {
    return this._value.country;
  }

  get zipCode(): string {
    return this._value.zipCode;
  }

  get division(): keyof typeof DIVISIONS | undefined {
    return this._value.division;
  }

  get district(): string | undefined {
    return this._value.district;
  }

  get upazila(): string | undefined {
    return this._value.upazila;
  }

  get union(): string | undefined {
    return this._value.union;
  }

  get landmark(): string | undefined {
    return this._value.landmark;
  }

  get latitude(): number | undefined {
    return this._value.latitude;
  }

  get longitude(): number | undefined {
    return this._value.longitude;
  }

  get fullAddress(): string {
    let address = `${this.street}, ${this.city}`;
    if (this.district) address += `, ${this.district}`;
    if (this.division) address += `, ${this.division}`;
    address += `, ${this.country} - ${this.zipCode}`;
    if (this.landmark) address += ` (${this.landmark})`;
    return address;
  }

  get shortAddress(): string {
    let address = `${this.street}`;
    if (this.landmark) address += ` (${this.landmark})`;
    address += `, ${this.city}`;
    if (this.district) address += `, ${this.district}`;
    return address;
  }

  isBangladesh(): boolean {
    return this.country.toLowerCase() === 'bangladesh';
  }

  hasCoordinates(): boolean {
    return this.latitude !== undefined && this.longitude !== undefined;
  }

  static fromBangladesh(
    street: string,
    city: string,
    zipCode: string,
    division: keyof typeof DIVISIONS,
    district: string,
    options?: {
      upazila?: string;
      union?: string;
      landmark?: string;
      latitude?: number;
      longitude?: number;
    }
  ): Address {
    return new Address({
      street,
      city,
      state: division,
      country: 'Bangladesh',
      zipCode,
      division,
      district,
      upazila: options?.upazila,
      union: options?.union,
      landmark: options?.landmark,
      latitude: options?.latitude,
      longitude: options?.longitude,
    });
  }
}
