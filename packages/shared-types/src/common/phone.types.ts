import { BaseValueObject } from './base.types';

export class PhoneNumber implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(this.value.replace(/\s/g, ''));
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  getCountryCode(): string {
    const match = this.value.match(/^\+(\d{1,3})/);
    return match ? match[1] : '';
  }

  getNationalNumber(): string {
    return this.value.replace(/^\+?\d{1,3}\s?/, '');
  }

  toString(): string {
    return this.value;
  }
}

export type PhoneString = string;
