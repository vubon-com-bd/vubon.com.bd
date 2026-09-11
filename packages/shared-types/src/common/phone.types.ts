import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';
import { BaseValueObject } from './base.types';

/**
 * Phone Number Value Object class
 */
export class PhoneNumber implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return REGEX.PHONE.test(this.value);
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  /**
   * Returns the country calling code (1-3 digits after '+')
   */
  getCountryCode(): string {
    const match = this.value.match(/^\+(\d{1,3})/);
    return match ? `+${match[1]}` : '';
  }

  /**
   * Returns the national number without the '+' and country code
   */
  getNationalNumber(): string {
    return this.value.replace(/^\+\d{1,3}/, '');
  }

  toString(): string {
    return this.value;
  }
}

/**
 * Phone string type
 */
export type PhoneString = string;
