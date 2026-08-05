import { BaseValueObject } from './base.vo';

/**
 * OTP Code Value Object
 * Represents a One-Time Password code with validation
 * Used for MFA, password reset, email verification, etc.
 */
export class OtpCode extends BaseValueObject<string> {
  private readonly _expiresAt?: Date;

  private constructor(value: string, expiresAt?: Date) {
    const normalized = value.trim();
    OtpCode.validate(normalized);
    super(normalized);
    this._expiresAt = expiresAt ? new Date(expiresAt) : undefined;
  }

  /**
   * Create a new OTP Code instance
   * @throws {Error} If the OTP code is invalid
   */
  static create(value: string, expiresAt?: Date): OtpCode {
    return new OtpCode(value, expiresAt);
  }

  /**
   * Create a random OTP code with optional expiry
   */
  static generate(length: number = 6, expiresInSeconds?: number): OtpCode {
    if (length < 4 || length > 8) {
      throw new Error('OTP length must be between 4 and 8 digits');
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const code = String(Math.floor(Math.random() * (max - min + 1)) + min);

    let expiresAt: Date | undefined;
    if (expiresInSeconds) {
      expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    }

    return new OtpCode(code, expiresAt);
  }

  /**
   * Validate OTP code format
   * @throws {Error} If the OTP code is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('OTP code must be a non-empty string');
    }

    // Check if it's numeric
    if (!/^\d+$/.test(value)) {
      throw new Error('OTP code must contain only digits');
    }

    // Check length (4-8 digits)
    if (value.length < 4 || value.length > 8) {
      throw new Error('OTP code must be between 4 and 8 digits');
    }
  }

  /**
   * Check if the OTP code is expired
   */
  isExpired(): boolean {
    if (!this._expiresAt) {
      return false;
    }
    return new Date() > this._expiresAt;
  }

  /**
   * Get the expiry time
   */
  getExpiresAt(): Date | undefined {
    return this._expiresAt ? new Date(this._expiresAt) : undefined;
  }

  /**
   * Get the time remaining until expiry in seconds
   * Returns 0 if expired or no expiry set
   */
  getTimeRemainingSeconds(): number {
    if (!this._expiresAt) {
      return 0;
    }

    const now = Date.now();
    const expiry = this._expiresAt.getTime();
    const remaining = Math.floor((expiry - now) / 1000);

    return Math.max(0, remaining);
  }

  /**
   * Get the time remaining in human-readable format
   */
  getTimeRemainingHuman(): string {
    const seconds = this.getTimeRemainingSeconds();
    if (seconds <= 0) {
      return 'Expired';
    }

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Mask the OTP code for display (show only last 2 digits)
   */
  mask(): string {
    const visible = 2;
    if (this._value.length <= visible) {
      return this._value;
    }

    const masked = '*'.repeat(this._value.length - visible);
    const visiblePart = this._value.slice(-visible);
    return `${masked}${visiblePart}`;
  }

  /**
   * Check if the OTP code is valid (not expired and correct format)
   */
  isValid(): boolean {
    return !this.isExpired();
  }

  /**
   * Get the OTP code value
   */
  getValue(): string {
    return this._value;
  }

  /**
   * Compare two OtpCode objects
   */
  equals(other: OtpCode | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof OtpCode)) {
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
   * Get a formatted OTP for display (e.g., "123456")
   */
  toFormattedString(): string {
    const chunks = this._value.match(/.{1,3}/g);
    return chunks ? chunks.join(' ') : this._value;
  }
}
