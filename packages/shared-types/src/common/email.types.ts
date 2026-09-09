import { BaseValueObject } from './base.types';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Email Value Object class
 */
export class Email implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    return EMAIL_REGEX.test(this.value);
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
