import { BaseValueObject } from './base.types';

/**
 * Name data interface
 */
export interface NameData {
  firstName: string;
  lastName: string;
  middleName?: string;
}

/**
 * Name Value Object class
 */
export class Name implements BaseValueObject<NameData> {
  constructor(public value: NameData) {}

  isValid(): boolean {
    return !!(
      this.value.firstName &&
      this.value.lastName &&
      this.value.firstName.length > 0 &&
      this.value.lastName.length > 0
    );
  }

  equals(other: Name): boolean {
    return (
      this.value.firstName === other.value.firstName &&
      this.value.lastName === other.value.lastName &&
      this.value.middleName === other.value.middleName
    );
  }

  getFullName(): string {
    return [this.value.firstName, this.value.middleName, this.value.lastName]
      .filter(Boolean)
      .join(' ');
  }

  getInitials(): string {
    return [this.value.firstName.charAt(0), this.value.lastName.charAt(0)].join('');
  }

  toString(): string {
    return this.getFullName();
  }
}
