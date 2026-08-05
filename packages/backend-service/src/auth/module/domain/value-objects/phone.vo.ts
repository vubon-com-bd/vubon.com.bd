import { BaseValueObject } from './base.vo';
import { PHONE_REGEX } from '@vubon/shared-constants';

/**
 * Phone Number Value Object
 * Represents a validated and normalized phone number
 * Supports Bangladeshi phone numbers with operator detection
 */
export class Phone extends BaseValueObject<string> {
  private constructor(value: string) {
    const normalized = Phone.normalize(value);
    Phone.validate(normalized);
    super(normalized);
  }

  /**
   * Create a new Phone instance
   * @throws {Error} If the phone number is invalid
   */
  static create(value: string): Phone {
    return new Phone(value);
  }

  /**
   * Validate phone number format
   * @throws {Error} If the phone number is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Phone number must be a non-empty string');
    }

    // Check against Bangladeshi mobile format (01XXXXXXXXX)
    const bangladeshMobileRegex = /^01[3-9]\d{8}$/;
    if (bangladeshMobileRegex.test(value)) {
      return;
    }

    // Check against international format with country code
    if (PHONE_REGEX.INTERNATIONAL.test(value)) {
      return;
    }

    // Check against format with country code
    if (PHONE_REGEX.WITH_COUNTRY_CODE.test(value)) {
      return;
    }

    // Check against simple digit format (7-15 digits)
    if (PHONE_REGEX.SIMPLE.test(value)) {
      return;
    }

    throw new Error(
      `Invalid phone number format: ${value}. Supported formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX`
    );
  }

  /**
   * Normalize phone number: remove spaces, hyphens, and special characters
   */
  private static normalize(value: string): string {
    return value.trim().replace(/[\s\-()]/g, '');
  }

  /**
   * Check if the phone number is a Bangladeshi mobile number
   */
  isBangladeshiMobile(): boolean {
    const value = this._value;
    return /^01[3-9]\d{8}$/.test(value);
  }

  /**
   * Get the phone number in E.164 international format
   * Example: +8801712345678
   */
  toE164(): string {
    const value = this._value;

    // If already in international format with +
    if (value.startsWith('+')) {
      return value;
    }

    // If starts with 880 (country code without +)
    if (value.startsWith('880')) {
      return `+${value}`;
    }

    // If Bangladeshi mobile format (01XXXXXXXXX)
    if (this.isBangladeshiMobile()) {
      // Remove leading 0 and add +880
      const withoutZero = value.substring(1);
      return `+880${withoutZero}`;
    }

    // Default: return as is
    return value;
  }

  /**
   * Get the phone number in national format (for display)
   * Example: 01712345678
   */
  toNational(): string {
    const value = this._value;

    // If international format, convert to national
    if (value.startsWith('+880')) {
      const withoutCountry = value.substring(4);
      return `0${withoutCountry}`;
    }

    // If starts with 880 without +
    if (value.startsWith('880')) {
      const withoutCountry = value.substring(3);
      return `0${withoutCountry}`;
    }

    return value;
  }

  /**
   * Detect Bangladeshi mobile network operator
   * Returns the operator name or 'Unknown'
   */
  getOperator(): 'Grameenphone' | 'Robi' | 'Banglalink' | 'Teletalk' | 'Unknown' {
    const national = this.toNational();

    // Check if it's a Bangladeshi mobile number
    if (!this.isBangladeshiMobile()) {
      return 'Unknown';
    }

    // Extract operator code (first 3 digits after '0')
    const code = national.substring(0, 3);

    switch (code) {
      case '017':
        return 'Grameenphone';
      case '018':
        return 'Robi';
      case '019':
        return 'Banglalink';
      case '015':
        return 'Teletalk';
      case '013':
        return 'Grameenphone';
      case '014':
        return 'Grameenphone';
      case '016':
        return 'Grameenphone';
      default:
        return 'Unknown';
    }
  }

  /**
   * Check if the phone number is a valid Bangladeshi number
   */
  isValidBangladeshi(): boolean {
    return this.isBangladeshiMobile();
  }

  /**
   * Get the phone number as a masked string for privacy
   * Example: 017*****678
   */
  mask(): string {
    const national = this.toNational();
    if (national.length < 11) {
      return national;
    }

    const prefix = national.substring(0, 3);
    const suffix = national.substring(national.length - 3);
    return `${prefix}*****${suffix}`;
  }

  /**
   * Check if the phone number is a valid mobile number
   */
  isMobile(): boolean {
    return this.isBangladeshiMobile();
  }

  /**
   * Get the country code (assuming Bangladeshi numbers)
   */
  getCountryCode(): string {
    if (this._value.startsWith('+')) {
      const parts = this._value.match(/^\+\d{1,3}/);
      return parts ? parts[0] : '+880';
    }

    if (this._value.startsWith('880')) {
      return '+880';
    }

    return '+880';
  }

  /**
   * Get the raw national number (without country code)
   */
  getNationalNumber(): string {
    const e164 = this.toE164();
    if (e164.startsWith('+880')) {
      return e164.substring(4);
    }
    return this._value;
  }

  /**
   * Compare two Phone objects
   */
  equals(other: Phone | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Phone)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation (national format)
   */
  toString(): string {
    return this.toNational();
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
  }
}
