import { BaseValueObject } from './base.types';

/**
 * Password Value Object class
 */
export class Password implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return this.value.length >= 8 && this.value.length <= 32;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  hash(): string {
    // Placeholder for hash implementation
    return `hashed_${this.value}`;
  }

  verify(plainText: string): boolean {
    // Placeholder for verification implementation
    return this.value === plainText;
  }

  getStrength(): 'weak' | 'medium' | 'strong' {
    const length = this.value.length;
    if (length >= 12) return 'strong';
    if (length >= 8) return 'medium';
    return 'weak';
  }

  toString(): string {
    return this.value;
  }
}

/**
 * Password string type
 */
export type PasswordString = string;
