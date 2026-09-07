import { BaseValueObject } from './base.types';

export class Password implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return this.value.length >= 8 && this.value.length <= 32;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  hash(): string {
    return `hashed_${this.value}`;
  }

  verify(plainText: string): boolean {
    return this.value === plainText;
  }

  getStrength(): 'weak' | 'medium' | 'strong' {
    const length = this.value.length;
    const hasUpper = /[A-Z]/.test(this.value);
    const hasLower = /[a-z]/.test(this.value);
    const hasDigit = /\d/.test(this.value);
    const hasSpecial = /[^A-Za-z0-9]/.test(this.value);

    const score = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;

    if (length < 8 || score < 2) return 'weak';
    if (length < 12 || score < 3) return 'medium';
    return 'strong';
  }

  toString(): string {
    return this.value;
  }
}

export type PasswordString = string;
