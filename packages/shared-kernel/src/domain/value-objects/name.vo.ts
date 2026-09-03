import { ValueObject } from '../base/base.vo';

export interface NameComponents {
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
}

export class Name extends ValueObject<NameComponents> {
  protected validate(): void {
    if (!this._value.firstName || this._value.firstName.length === 0) {
      throw new Error('First name is required');
    }
    if (!this._value.lastName || this._value.lastName.length === 0) {
      throw new Error('Last name is required');
    }
    if (this._value.fullName.length < 2) {
      throw new Error('Full name must be at least 2 characters');
    }
  }

  get firstName(): string {
    return this._value.firstName;
  }

  get lastName(): string {
    return this._value.lastName;
  }

  get middleName(): string | undefined {
    return this._value.middleName;
  }

  get fullName(): string {
    return this._value.fullName;
  }

  get initials(): string {
    const first = this.firstName.charAt(0).toUpperCase();
    const last = this.lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  }

  get displayName(): string {
    if (this.middleName) {
      return `${this.firstName} ${this.middleName.charAt(0)}. ${this.lastName}`;
    }
    return `${this.firstName} ${this.lastName}`;
  }

  static fromFullName(fullName: string): Name {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return new Name({
        firstName: parts[0],
        lastName: parts[0],
        fullName,
      });
    }
    if (parts.length === 2) {
      return new Name({
        firstName: parts[0],
        lastName: parts[1],
        fullName,
      });
    }
    return new Name({
      firstName: parts[0],
      lastName: parts[parts.length - 1],
      middleName: parts.slice(1, -1).join(' '),
      fullName,
    });
  }

  static fromComponents(firstName: string, lastName: string, middleName?: string): Name {
    const fullName = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    return new Name({ firstName, lastName, middleName, fullName });
  }
}
