import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';
import { BaseValueObject } from './base.types';

/**
 * Email Value Object class
 * Uses REGEX.EMAIL from shared-constants (single source of truth)
 */
export class Email implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return REGEX.EMAIL.test(this.value);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  getDomain(): string {
    return this.value.split('@')[1] || '';
  }

  getUsername(): string {
    return this.value.split('@')[0] || '';
  }

  toString(): string {
    return this.value;
  }
}

/**
 * Email string type
 */
export type EmailString = string;
