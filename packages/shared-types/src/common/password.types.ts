import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';
import { BaseValueObject } from './base.types';

/**
 * Password Value Object class
 * Validation rules are derived from SECURITY.PASSWORD (single source of truth)
 *
 * ⚠️ SECURITY NOTE:
 * - This class does NOT hash or verify passwords. Hashing belongs to a
 *   dedicated PasswordHasher service (bcrypt/argon2) on the server side.
 * - toString() intentionally returns a redacted value to prevent
 *   accidental password leakage in logs.
 */
export class Password implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    const {
      MIN_LENGTH,
      MAX_LENGTH,
      REQUIRE_UPPERCASE,
      REQUIRE_LOWERCASE,
      REQUIRE_NUMBER,
      REQUIRE_SPECIAL,
    } = SECURITY.PASSWORD;

    if (this.value.length < MIN_LENGTH || this.value.length > MAX_LENGTH) return false;
    if (REQUIRE_UPPERCASE && !/[A-Z]/.test(this.value)) return false;
    if (REQUIRE_LOWERCASE && !/[a-z]/.test(this.value)) return false;
    if (REQUIRE_NUMBER && !/\d/.test(this.value)) return false;
    if (REQUIRE_SPECIAL && !/[^A-Za-z0-9]/.test(this.value)) return false;

    return true;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  getStrength(): 'weak' | 'medium' | 'strong' {
    const length = this.value.length;
    if (length >= 12) return 'strong';
    if (length >= 8) return 'medium';
    return 'weak';
  }

  /**
   * Redacted output — NEVER expose the raw password.
   */
  toString(): string {
    return '********';
  }
}

/**
 * Password string type
 */
export type PasswordString = string;
