import { BaseValueObject } from './base.types';

export class Email implements BaseValueObject<string> {
  constructor(public value: string) {}

  isValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.value);
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

export type EmailString = string;
