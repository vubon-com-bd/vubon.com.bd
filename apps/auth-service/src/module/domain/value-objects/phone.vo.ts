/**
 * Phone number value object
 * Validates and encapsulates phone number logic for user registration and authentication
 */
import { ValidatedValueObject, ValueObject } from './base.vo';
import type { ValueObjectProps } from './base.vo';

export interface PhoneProps extends ValueObjectProps {
  value: string;
  [key: string]: unknown;
}

export class Phone extends ValidatedValueObject<PhoneProps> {
  private constructor(value: string) {
    super({ value });
  }

  public static create(phone: string): Phone {
    if (!phone || typeof phone !== 'string') {
      throw new Error('Phone number is required');
    }

    const cleanedPhone = phone.trim();

    if (!Phone.isValidFormat(cleanedPhone)) {
      throw new Error('Invalid phone number format');
    }

    return new Phone(cleanedPhone);
  }

  public static reconstitute(value: string): Phone {
    return new Phone(value);
  }

  public static isValidFormat(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  }

  public override get value(): PhoneProps {
    return this.props;
  }

  public get phoneString(): string {
    return this.props.value;
  }

  protected validate(): void {
    const { value } = this.props;

    if (!value || typeof value !== 'string') {
      throw new Error('Phone number is required');
    }

    if (!Phone.isValidFormat(value)) {
      throw new Error('Invalid phone number format');
    }
  }

  public getCountryCode(): string {
    if (this.phoneString.startsWith('+')) {
      return this.phoneString.slice(1, 4);
    }
    return '';
  }

  public mask(): string {
    const len = this.phoneString.length;
    if (len <= 4) {
      return '****';
    }
    const visiblePart = this.phoneString.slice(-4);
    const maskedPart = '*'.repeat(len - 4);
    return `${maskedPart}${visiblePart}`;
  }

  public override equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof Phone)) {
      return false;
    }

    return this.phoneString === other.phoneString;
  }

  public override toString(): string {
    return this.phoneString;
  }

  public override toJSON(): ValueObjectProps {
    return { value: this.phoneString };
  }
}

export class PhoneCollection {
  private readonly phones: Phone[];

  private constructor(phones: Phone[]) {
    this.phones = [...phones];
  }

  public static create(phones: string[]): PhoneCollection {
    if (!phones || !Array.isArray(phones)) {
      return new PhoneCollection([]);
    }

    const phoneObjects = phones
      .filter((phone) => phone && typeof phone === 'string')
      .map((phone) => Phone.create(phone));

    return new PhoneCollection(phoneObjects);
  }

  public static fromPhones(phones: Phone[]): PhoneCollection {
    return new PhoneCollection(phones);
  }

  public get length(): number {
    return this.phones.length;
  }

  public isEmpty(): boolean {
    return this.phones.length === 0;
  }

  public contains(phone: Phone): boolean {
    return this.phones.some((p) => p.equals(phone));
  }

  public containsString(phone: string): boolean {
    try {
      const phoneObj = Phone.create(phone);
      return this.contains(phoneObj);
    } catch {
      return false;
    }
  }

  public add(phone: Phone): PhoneCollection {
    if (this.contains(phone)) {
      return this;
    }

    return new PhoneCollection([...this.phones, phone]);
  }

  public remove(phone: Phone): PhoneCollection {
    return new PhoneCollection(this.phones.filter((p) => !p.equals(phone)));
  }

  public getPhones(): Phone[] {
    return [...this.phones];
  }

  public getStrings(): string[] {
    return this.phones.map((phone) => phone.toString());
  }

  public toJSON(): string[] {
    return this.getStrings();
  }

  public toString(): string {
    return this.getStrings().join(', ');
  }

  public equals(other: PhoneCollection): boolean {
    if (!other) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof PhoneCollection)) {
      return false;
    }

    if (this.length !== other.length) {
      return false;
    }

    for (let i = 0; i < this.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
      const currentPhone = this.phones[i];
      // eslint-disable-next-line security/detect-object-injection
      const otherPhone = other.phones[i];
      if (!currentPhone || !otherPhone || !currentPhone.equals(otherPhone)) {
        return false;
      }
    }

    return true;
  }
}
