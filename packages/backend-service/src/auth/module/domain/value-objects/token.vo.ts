import { BaseValueObject } from './base.vo';

/**
 * Token Value Object
 * Represents a JWT or random token with validation
 * Used for access tokens, refresh tokens, verification tokens, etc.
 */
export class Token extends BaseValueObject<string> {
  private readonly _type: 'jwt' | 'hex' | 'base64' | 'uuid' | 'random' | 'unknown';
  private readonly _expiresAt?: Date;
  private readonly _issuedAt?: Date;

  private constructor(value: string, expiresAt?: Date, issuedAt?: Date) {
    const normalized = value.trim();
    Token.validate(normalized);
    super(normalized);

    this._type = Token.detectType(normalized);
    this._expiresAt = expiresAt ? new Date(expiresAt) : undefined;
    this._issuedAt = issuedAt ? new Date(issuedAt) : new Date();
  }

  /**
   * Create a new Token instance
   * @throws {Error} If the token is invalid
   */
  static create(value: string, expiresAt?: Date, issuedAt?: Date): Token {
    return new Token(value, expiresAt, issuedAt);
  }

  /**
   * Validate token format
   * @throws {Error} If the token is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Token must be a non-empty string');
    }

    // Check minimum length
    if (value.length < 8) {
      throw new Error('Token must be at least 8 characters long');
    }

    // Check maximum length
    if (value.length > 4096) {
      throw new Error('Token exceeds maximum length of 4096 characters');
    }

    // Detect and validate type-specific formats
    const type = Token.detectType(value);

    if (type === 'jwt') {
      // JWT format: header.payload.signature
      const parts = value.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format: must have 3 parts separated by dots');
      }

      // Check if parts are base64url encoded
      const base64urlRegex = /^[A-Za-z0-9_-]+$/;
      if (
        !base64urlRegex.test(parts[0]) ||
        !base64urlRegex.test(parts[1]) ||
        !base64urlRegex.test(parts[2])
      ) {
        throw new Error('Invalid JWT format: parts must be base64url encoded');
      }
    } else if (type === 'hex') {
      // Hex format: only hexadecimal characters
      if (!/^[0-9a-fA-F]+$/.test(value)) {
        throw new Error('Invalid hex token: must contain only hexadecimal characters');
      }
    } else if (type === 'base64') {
      // Base64 format: only base64 characters
      if (!/^[A-Za-z0-9+/=]+$/.test(value)) {
        throw new Error('Invalid base64 token: must contain only base64 characters');
      }
    } else if (type === 'uuid') {
      // UUID format: standard UUID pattern
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Invalid UUID format');
      }
    }
    // 'random' type accepts any string that meets length requirements
  }

  /**
   * Detect the token type based on format
   */
  private static detectType(
    value: string
  ): 'jwt' | 'hex' | 'base64' | 'uuid' | 'random' | 'unknown' {
    // Check for JWT
    if (value.includes('.') && value.split('.').length === 3) {
      const parts = value.split('.');
      const base64urlRegex = /^[A-Za-z0-9_-]+$/;
      if (
        base64urlRegex.test(parts[0]) &&
        base64urlRegex.test(parts[1]) &&
        base64urlRegex.test(parts[2])
      ) {
        return 'jwt';
      }
    }

    // Check for UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(value)) {
      return 'uuid';
    }

    // Check for hex
    if (/^[0-9a-fA-F]+$/.test(value)) {
      return 'hex';
    }

    // Check for base64
    if (/^[A-Za-z0-9+/=]+$/.test(value)) {
      return 'base64';
    }

    // Default to random for any other string
    return 'random';
  }

  /**
   * Get the token type
   */
  getType(): 'jwt' | 'hex' | 'base64' | 'uuid' | 'random' | 'unknown' {
    return this._type;
  }

  /**
   * Check if the token is a JWT
   */
  isJWT(): boolean {
    return this._type === 'jwt';
  }

  /**
   * Check if the token is a UUID
   */
  isUUID(): boolean {
    return this._type === 'uuid';
  }

  /**
   * Check if the token is a hex string
   */
  isHex(): boolean {
    return this._type === 'hex';
  }

  /**
   * Check if the token is base64 encoded
   */
  isBase64(): boolean {
    return this._type === 'base64';
  }

  /**
   * Check if the token has expired
   */
  isExpired(): boolean {
    if (!this._expiresAt) {
      return false;
    }
    return new Date() > this._expiresAt;
  }

  /**
   * Check if the token is valid (not expired)
   */
  isValid(): boolean {
    return !this.isExpired();
  }

  /**
   * Get the expiry time
   */
  getExpiresAt(): Date | undefined {
    return this._expiresAt ? new Date(this._expiresAt) : undefined;
  }

  /**
   * Get the issued at time
   */
  getIssuedAt(): Date {
    return new Date(this._issuedAt || new Date());
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
   * Get the age of the token in seconds
   */
  getAgeSeconds(): number {
    const issuedAt = this._issuedAt || new Date();
    return Math.floor((Date.now() - issuedAt.getTime()) / 1000);
  }

  /**
   * Mask the token for display (show only first and last few characters)
   */
  mask(visibleStart: number = 8, visibleEnd: number = 8): string {
    if (this._value.length <= visibleStart + visibleEnd) {
      return '****';
    }

    const start = this._value.slice(0, visibleStart);
    const end = this._value.slice(-visibleEnd);
    const middle = '*'.repeat(Math.min(20, this._value.length - visibleStart - visibleEnd));

    return `${start}${middle}${end}`;
  }

  /**
   * Get a short version of the token for display
   */
  toShort(prefixLength: number = 8): string {
    if (this._value.length <= prefixLength) {
      return this._value;
    }

    return `${this._value.slice(0, prefixLength)}...`;
  }

  /**
   * Decode JWT payload (if token is a JWT)
   * Returns null if not a JWT or invalid
   */
  decodeJWT(): Record<string, unknown> | null {
    if (!this.isJWT()) {
      return null;
    }

    try {
      const parts = this._value.split('.');
      if (parts.length !== 3) {
        return null;
      }

      // Decode the payload (second part)
      const payload = Buffer.from(parts[1], 'base64url').toString('utf-8');
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  /**
   * Get token information summary
   */
  getSummary(): {
    type: string;
    length: number;
    isExpired: boolean;
    expiresAt?: Date;
    issuedAt?: Date;
    remainingSeconds: number;
    ageSeconds: number;
    isJWT: boolean;
    isUUID: boolean;
  } {
    return {
      type: this._type,
      length: this._value.length,
      isExpired: this.isExpired(),
      expiresAt: this.getExpiresAt(),
      issuedAt: this.getIssuedAt(),
      remainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      isJWT: this.isJWT(),
      isUUID: this.isUUID(),
    };
  }

  /**
   * Compare two Token objects
   */
  equals(other: Token | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Token)) {
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
