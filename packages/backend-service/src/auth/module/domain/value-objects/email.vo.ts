import { BaseValueObject } from './base.vo';
import { EMAIL_REGEX } from '@vubon/shared-constants';

/**
 * Email Value Object
 * Represents a validated and normalized email address
 */
export class Email extends BaseValueObject<string> {
  private constructor(value: string) {
    const normalized = Email.normalize(value);
    Email.validate(normalized);
    super(normalized);
  }

  /**
   * Create a new Email instance
   * @throws {Error} If the email is invalid
   */
  static create(value: string): Email {
    return new Email(value);
  }

  /**
   * Validate email format
   * @throws {Error} If the email is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Email must be a non-empty string');
    }

    if (!EMAIL_REGEX.STANDARD.test(value)) {
      throw new Error(`Invalid email format: ${value}`);
    }

    if (value.length > 255) {
      throw new Error('Email cannot exceed 255 characters');
    }
  }

  /**
   * Normalize email: trim whitespace and convert to lowercase
   */
  private static normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  /**
   * Get the domain part of the email
   */
  getDomain(): string {
    const parts = this._value.split('@');
    return parts[1] || '';
  }

  /**
   * Get the local part of the email (before @)
   */
  getLocalPart(): string {
    const parts = this._value.split('@');
    return parts[0] || '';
  }

  /**
   * Check if the email is from a specific domain
   */
  isFromDomain(domain: string): boolean {
    return this.getDomain() === domain.toLowerCase();
  }

  /**
   * Mask the email for privacy
   * Example: john.doe@example.com -> j***e@example.com
   */
  mask(): string {
    const localPart = this.getLocalPart();
    const domain = this.getDomain();

    if (localPart.length <= 2) {
      return `${localPart}***@${domain}`;
    }

    const first = localPart.charAt(0);
    const last = localPart.charAt(localPart.length - 1);
    return `${first}***${last}@${domain}`;
  }

  /**
   * Compare two Email objects
   */
  equals(other: Email | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Email)) {
      return false;
    }
    return this._value === other._value;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return this._value;
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
  }
}
