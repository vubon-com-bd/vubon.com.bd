import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';
import { BaseValueObject } from './base.types';

/**
 * Password Value Object class
 * Validation rules are derived from SECURITY.PASSWORD (single source of truth)
 */
export class Password implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = SECURITY.PASSWORD;
    return this.value.length >= MIN_LENGTH && this.value.length <= MAX_LENGTH;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  hash(): string {
    // TODO: replace with real bcrypt hash using SECURITY.PASSWORD.HASH_ROUNDS
    return `hashed_${this.value}`;
  }

  verify(plainText: string): boolean {
    // TODO: replace with real bcrypt compare
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
