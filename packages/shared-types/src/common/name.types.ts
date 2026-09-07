import { BaseValueObject } from './base.types';

export interface NameData {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export class Name implements BaseValueObject<NameData> {
  constructor(public value: NameData) {}

  isValid(): boolean {
    return this.value.firstName.trim() !== '' && this.value.lastName.trim() !== '';
  }

  equals(other: Name): boolean {
    return (
      this.value.firstName === other.value.firstName &&
      this.value.lastName === other.value.lastName &&
      this.value.middleName === other.value.middleName
    );
  }

  getFullName(): string {
    const parts = [this.value.firstName, this.value.middleName, this.value.lastName].filter(
      Boolean
    );
    return parts.join(' ');
  }

  getInitials(): string {
    const first = this.value.firstName.charAt(0).toUpperCase();
    const last = this.value.lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  }

  toString(): string {
    return this.getFullName();
  }
}
