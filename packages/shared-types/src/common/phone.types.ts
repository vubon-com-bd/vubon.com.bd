import { BaseValueObject } from './base.types';

const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

/**
 * Phone Number Value Object class
 */
export class PhoneNumber implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return PHONE_REGEX.test(this.value);
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  getCountryCode(): string {
    const match = this.value.match(/^\+\d+/);
    return match ? match[0] : '';
  }

  getNationalNumber(): string {
    return this.value.replace(/^\+\d+/, '');
  }

  toString(): string {
    return this.value;
  }
}

/**
 * Phone string type
 */
export type PhoneString = string;
