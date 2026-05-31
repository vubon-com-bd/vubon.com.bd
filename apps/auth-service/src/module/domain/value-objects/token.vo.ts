/**
 * Token Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/token.vo
 * 
 * @description
 * Represents a generic token with type, expiry, and lifecycle tracking.
 * Used for authentication, authorization, password reset, email verification, etc.
 * 
 * IMPORTANT: This domain object represents the token AS A CONCEPT.
 * Actual JWT signing/verification happens in Infrastructure layer.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Token value never changes after creation
 * ✅ Self-validating - Validates format based on type
 * ✅ Time-aware - Tracks issuance and expiry
 * ✅ Lifecycle-aware - Tracks usage and revocation
 * ✅ Framework-free - No JWT library dependencies
 * ✅ Security-first - Token value never logged or serialized
 * 
 * Token Types:
 * - ACCESS: Short-lived JWT for API access
 * - REFRESH: Long-lived token for obtaining new access tokens
 * - RESET: Password reset token (one-time use)
 * - VERIFICATION: Email/phone verification token
 * - API_KEY: Long-lived API key for service accounts
 * - MFA: Multi-factor authentication token
 * - SESSION: Session identifier token
 * - CSRF: Cross-site request forgery token
 * 
 * @example
 * const token = new Token('eyJhbGciOiJIUzI1NiIs...', TokenType.ACCESS);
 * console.log(token.isExpired()); // false
 * console.log(token.getRemainingTime()); // 840 seconds
 * console.log(token.canRefresh()); // true (for refresh tokens)
 */

import { ValueObject } from './base.vo';

// ==================== Enums ====================

/**
 * Token types
 */
export enum TokenType {
  ACCESS = 'access',           // JWT access token (short-lived)
  REFRESH = 'refresh',         // Refresh token (long-lived)
  RESET = 'reset',             // Password reset token (one-time)
  VERIFICATION = 'verification', // Email/phone verification
  API_KEY = 'api_key',         // API key for service accounts
  MFA = 'mfa',                 // MFA verification token
  SESSION = 'session',         // Session identifier
  CSRF = 'csrf',               // CSRF protection token
  MAGIC_LINK = 'magic_link',   // Magic link for passwordless login
  DEVICE = 'device',           // Device verification token
  BACKUP = 'backup',           // Backup code token
}

/**
 * Token status
 */
export enum TokenStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  USED = 'used',               // One-time token that has been used
  SUSPENDED = 'suspended',
}

// ==================== Types ====================

/**
 * Token validation result
 */
export interface TokenValidation {
  isValid: boolean;
  normalized?: string;
  type?: TokenType;
  error?: string;
}

/**
 * Token metadata (for persistence)
 */
export interface TokenMetadata {
  userAgent?: string;
  ipAddress?: string;
  deviceId?: string;
  location?: string;
  purpose?: string;
}

// ==================== Constants ====================

/**
 * Token configuration by type
 */
export const TOKEN_CONFIG = {
  // Default expiry times (seconds)
  DEFAULT_EXPIRY: {
    [TokenType.ACCESS]: 900,        // 15 minutes
    [TokenType.REFRESH]: 604800,    // 7 days
    [TokenType.RESET]: 1800,        // 30 minutes
    [TokenType.VERIFICATION]: 86400, // 24 hours
    [TokenType.API_KEY]: 31536000,  // 365 days
    [TokenType.MFA]: 300,           // 5 minutes
    [TokenType.SESSION]: 7200,      // 2 hours
    [TokenType.CSRF]: 3600,         // 1 hour
    [TokenType.MAGIC_LINK]: 300,    // 5 minutes
    [TokenType.DEVICE]: 2592000,    // 30 days
    [TokenType.BACKUP]: 0,          // No expiry (one-time use)
  },
  
  // One-time tokens (can only be used once)
  ONE_TIME_TOKENS: new Set<TokenType>([
    TokenType.RESET,
    TokenType.VERIFICATION,
    TokenType.MAGIC_LINK,
    TokenType.MFA,
    TokenType.BACKUP,
  ]),
  
  // Token prefixes for identification
  PREFIXES: {
    [TokenType.API_KEY]: 'vub_',
    [TokenType.SESSION]: 'sess_',
    [TokenType.CSRF]: 'csrf_',
    [TokenType.RESET]: 'rst_',
    [TokenType.VERIFICATION]: 'ver_',
    [TokenType.MAGIC_LINK]: 'mag_',
    [TokenType.DEVICE]: 'dev_',
  },
  
  // Minimum lengths by type
  MIN_LENGTH: {
    [TokenType.ACCESS]: 20,
    [TokenType.REFRESH]: 32,
    [TokenType.RESET]: 32,
    [TokenType.VERIFICATION]: 32,
    [TokenType.API_KEY]: 32,
    [TokenType.MFA]: 6,
    [TokenType.SESSION]: 32,
    [TokenType.CSRF]: 32,
    [TokenType.MAGIC_LINK]: 64,
    [TokenType.DEVICE]: 32,
    [TokenType.BACKUP]: 8,
  },
  
  // Maximum lengths by type
  MAX_LENGTH: {
    [TokenType.ACCESS]: 2048,       // JWTs can be long
    [TokenType.REFRESH]: 500,
    [TokenType.RESET]: 500,
    [TokenType.VERIFICATION]: 500,
    [TokenType.API_KEY]: 64,
    [TokenType.MFA]: 8,
    [TokenType.SESSION]: 500,
    [TokenType.CSRF]: 500,
    [TokenType.MAGIC_LINK]: 500,
    [TokenType.DEVICE]: 500,
    [TokenType.BACKUP]: 10,
  },
  
  // JWT pattern (optional, for validation)
  JWT_PATTERN: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
  
  // Alphanumeric pattern for non-JWT tokens
  ALPHANUMERIC_PATTERN: /^[A-Za-z0-9\-_.]+$/,
  
  // Refresh threshold (percentage of lifetime before refresh recommended)
  REFRESH_THRESHOLD: 0.2, // Refresh when 20% of time remaining
} as const;

// ==================== Token Value Object ====================

/**
 * Token Value Object
 * 
 * Represents a token with type, expiry, and lifecycle
 */
export class Token extends ValueObject {
  private readonly _value: string;
  private readonly _type: TokenType;
  private readonly _issuedAt: Date;
  private readonly _expiresAt: Date;
  private _lastUsedAt?: Date;
  private _status: TokenStatus;
  private _usedCount: number = 0;
  private _metadata?: TokenMetadata;

  /**
   * Creates a new Token value object
   * 
   * @param token - Raw token string
   * @param type - Type of token
   * @param issuedAt - Optional issuance time (defaults to now)
   * @param expiresAt - Optional expiry time (defaults based on type)
   * @param metadata - Optional token metadata
   * @throws {Error} If token format is invalid for the type
   */
  constructor(
    token: string,
    type: TokenType,
    issuedAt?: Date,
    expiresAt?: Date,
    metadata?: TokenMetadata
  ) {
    super();
    
    const validation = Token.validate(token, type);
    if (!validation.isValid) {
      throw new Error(`Invalid token: ${validation.error}`);
    }
    
    this._value = validation.normalized!;
    this._type = type;
    this._issuedAt = issuedAt ? new Date(issuedAt) : new Date();
    
    if (expiresAt) {
      this._expiresAt = new Date(expiresAt);
    } else {
      const expirySeconds = TOKEN_CONFIG.DEFAULT_EXPIRY[type];
      this._expiresAt = expirySeconds > 0
        ? new Date(this._issuedAt.getTime() + expirySeconds * 1000)
        : new Date(8640000000000000); // Far future for non-expiring tokens
    }
    
    this._status = TokenStatus.ACTIVE;
    this._metadata = metadata;
    
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Token cannot be empty');
    }
    
    if (this._issuedAt > this._expiresAt) {
      throw new Error('IssuedAt cannot be after ExpiresAt');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating Token from known valid value
   */
  public static fromValid(
    token: string,
    type: TokenType,
    issuedAt?: Date,
    expiresAt?: Date,
    metadata?: TokenMetadata
  ): Token {
    return new Token(token, type, issuedAt, expiresAt, metadata);
  }

  /**
   * Reconstitute token from persistence (with full state)
   */
  public static reconstitute(data: {
    value: string;
    type: TokenType;
    issuedAt: Date;
    expiresAt: Date;
    lastUsedAt?: Date;
    status: TokenStatus;
    usedCount: number;
    metadata?: TokenMetadata;
  }): Token {
    const token = new Token(
      data.value,
      data.type,
      data.issuedAt,
      data.expiresAt,
      data.metadata
    );
    token._lastUsedAt = data.lastUsedAt;
    token._status = data.status;
    token._usedCount = data.usedCount;
    return token;
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates a token for a specific type
   */
  public static validate(token: string, type: TokenType): TokenValidation {
    // Check type and emptiness
    if (!token || typeof token !== 'string') {
      return {
        isValid: false,
        error: 'Token cannot be null or undefined',
      };
    }

    const trimmed = token.trim();
    
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'Token cannot be empty',
      };
    }

    // Check minimum length
    const minLength = TOKEN_CONFIG.MIN_LENGTH[type];
    if (trimmed.length < minLength) {
      return {
        isValid: false,
        error: `Token too short (minimum ${minLength} characters for type ${type})`,
      };
    }

    // Check maximum length
    const maxLength = TOKEN_CONFIG.MAX_LENGTH[type];
    if (trimmed.length > maxLength) {
      return {
        isValid: false,
        error: `Token too long (maximum ${maxLength} characters)`,
      };
    }

    // Check for correct prefix
    const expectedPrefix = TOKEN_CONFIG.PREFIXES[type as keyof typeof TOKEN_CONFIG.PREFIXES];
    if (expectedPrefix && !trimmed.startsWith(expectedPrefix)) {
      return {
        isValid: false,
        error: `Token must start with '${expectedPrefix}'`,
      };
    }

    // Validate format based on token type
    if (type === TokenType.ACCESS && TOKEN_CONFIG.JWT_PATTERN.test(trimmed)) {
      // JWT format is valid
      return {
        isValid: true,
        normalized: trimmed,
        type,
        error: undefined,
      };
    } else if (!TOKEN_CONFIG.ALPHANUMERIC_PATTERN.test(trimmed)) {
      return {
        isValid: false,
        error: 'Token contains invalid characters (only alphanumeric, hyphen, underscore, dot allowed)',
      };
    }

    return {
      isValid: true,
      normalized: trimmed,
      type,
      error: undefined,
    };
  }

  /**
   * Generate a cryptographically-inspired random token of specified type
   * Note: For true crypto, use infrastructure layer
   */
  public static generate(type: TokenType, length?: number): string {
    const tokenLength = length || TOKEN_CONFIG.MIN_LENGTH[type];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < tokenLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Add prefix if configured
    const prefix = TOKEN_CONFIG.PREFIXES[type as keyof typeof TOKEN_CONFIG.PREFIXES];
    if (prefix) {
      result = prefix + result;
    }
    
    return result;
  }

  // ============================================================
  // Getters
  // ============================================================

  /**
   * Get raw token value (use with extreme caution!)
   * Should only be used for storage or comparison
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get token type
   */
  public getType(): TokenType {
    return this._type;
  }

  /**
   * Get issued at timestamp
   */
  public getIssuedAt(): Date {
    return new Date(this._issuedAt);
  }

  /**
   * Get expires at timestamp
   */
  public getExpiresAt(): Date {
    return new Date(this._expiresAt);
  }

  /**
   * Get last used timestamp
   */
  public getLastUsedAt(): Date | undefined {
    return this._lastUsedAt ? new Date(this._lastUsedAt) : undefined;
  }

  /**
   * Get token status
   */
  public getStatus(): TokenStatus {
    return this._status;
  }

  /**
   * Get used count (for one-time tokens)
   */
  public getUsedCount(): number {
    return this._usedCount;
  }

  /**
   * Get token metadata
   */
  public getMetadata(): Readonly<TokenMetadata> | undefined {
    return this._metadata;
  }

  // ============================================================
  // Status Methods
  // ============================================================

  /**
   * Check if token is expired
   */
  public isExpired(): boolean {
    if (this._status === TokenStatus.EXPIRED) {
      return true;
    }
    if (TOKEN_CONFIG.DEFAULT_EXPIRY[this._type] === 0) {
      return false; // Non-expiring tokens (like backup codes)
    }
    return new Date() > this._expiresAt;
  }

  /**
   * Check if token is revoked
   */
  public isRevoked(): boolean {
    return this._status === TokenStatus.REVOKED;
  }

  /**
   * Check if token is active (not expired, not revoked, not used)
   */
  public isActive(): boolean {
    if (this._status !== TokenStatus.ACTIVE) {
      return false;
    }
    if (this.isExpired()) {
      return false;
    }
    if (this.isOneTime() && this._usedCount >= 1) {
      return false;
    }
    return true;
  }

  /**
   * Check if this is a one-time use token
   */
  public isOneTime(): boolean {
    return TOKEN_CONFIG.ONE_TIME_TOKENS.has(this._type);
  }

  /**
   * Check if this token can be refreshed (refresh tokens only)
   */
  public canRefresh(): boolean {
    return this._type === TokenType.REFRESH && this.isActive();
  }

  // ============================================================
  // Lifecycle Methods
  // ============================================================

  /**
   * Mark token as used (for one-time tokens)
   */
  public use(): void {
    if (!this.isActive()) {
      throw new Error('Cannot use inactive token');
    }
    
    this._lastUsedAt = new Date();
    this._usedCount++;
    
    if (this.isOneTime() && this._usedCount >= 1) {
      this._status = TokenStatus.USED;
    }
  }

  /**
   * Revoke token (prevent future use)
   */
  public revoke(): void {
    if (this._status === TokenStatus.REVOKED) {
      return;
    }
    this._status = TokenStatus.REVOKED;
  }

  /**
   * Suspend token temporarily
   */
  public suspend(): void {
    if (this._status === TokenStatus.ACTIVE) {
      this._status = TokenStatus.SUSPENDED;
    }
  }

  /**
   * Reactivate suspended token
   */
  public reactivate(): void {
    if (this._status === TokenStatus.SUSPENDED && !this.isExpired()) {
      this._status = TokenStatus.ACTIVE;
    }
  }

  // ============================================================
  // Time Methods
  // ============================================================

  /**
   * Get remaining time in seconds
   */
  public getRemainingTime(): number {
    if (this.isExpired()) {
      return 0;
    }
    if (TOKEN_CONFIG.DEFAULT_EXPIRY[this._type] === 0) {
      return -1; // No expiry
    }
    const remaining = Math.max(0, (this._expiresAt.getTime() - new Date().getTime()) / 1000);
    return Math.ceil(remaining);
  }

  /**
   * Get time until refresh needed (for refresh tokens)
   */
  public getTimeUntilRefresh(): number {
    if (this._type !== TokenType.REFRESH) {
      return 0;
    }
    const totalLifetime = this._expiresAt.getTime() - this._issuedAt.getTime();
    const thresholdTime = totalLifetime * TOKEN_CONFIG.REFRESH_THRESHOLD;
    const remaining = this.getRemainingTime() * 1000;
    
    return Math.max(0, remaining - thresholdTime);
  }

  /**
   * Check if token needs refresh (for refresh tokens)
   */
  public needsRefresh(): boolean {
    if (this._type !== TokenType.REFRESH) {
      return false;
    }
    return this.getTimeUntilRefresh() <= 0;
  }

  /**
   * Get token age in seconds
   */
  public getAge(): number {
    const age = (new Date().getTime() - this._issuedAt.getTime()) / 1000;
    return Math.floor(age);
  }

  // ============================================================
  // Formatting Methods (Security-focused)
  // ============================================================

  /**
   * Mask token for logging (show only last 4 characters)
   */
  public mask(): string {
    if (this._value.length <= 8) {
      return '****';
    }
    const suffix = this._value.slice(-4);
    return `****${suffix}`;
  }

  /**
   * Get short prefix (first 8 chars) for identification
   */
  public getShortPrefix(): string {
    const maxLen = Math.min(8, this._value.length);
    return this._value.substring(0, maxLen);
  }

  /**
   * Get token prefix (for identification)
   */
  public getPrefix(): string | null {
    const prefix = TOKEN_CONFIG.PREFIXES[this._type as keyof typeof TOKEN_CONFIG.PREFIXES];
    return prefix || null;
  }

  /**
   * Check if token is a JWT
   */
  public isJWT(): boolean {
    return TOKEN_CONFIG.JWT_PATTERN.test(this._value);
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Check if token is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || this._value === 'empty-token';
  }

  /**
   * Get equality components for parent class comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    // Use masked value for equality to avoid exposing token
    // But still maintain uniqueness
    return [this._value, this._type];
  }

  /**
   * Convert to JSON serializable object
   * ⚠️ Never include full token in logs or responses!
   */
  public override toJSON(): Record<string, unknown> {
    return {
      mask: this.mask(),
      shortPrefix: this.getShortPrefix(),
      type: this._type,
      issuedAt: this._issuedAt.toISOString(),
      expiresAt: this._expiresAt.toISOString(),
      status: this._status,
      isActive: this.isActive(),
      isExpired: this.isExpired(),
      isRevoked: this.isRevoked(),
      isOneTime: this.isOneTime(),
      remainingTime: this.getRemainingTime(),
      age: this.getAge(),
      usedCount: this._usedCount,
      // ⚠️ Intentionally NOT including the full token value
    };
  }

  /**
   * String representation for debugging
   * ⚠️ Never log full token!
   */
  public override toString(): string {
    return `Token(${this.mask()}, type=${this._type}, status=${this._status}, remaining=${this.getRemainingTime()}s)`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is a Token
 */
export function isToken(value: unknown): value is Token {
  return value instanceof Token;
}

/**
 * Create token for specific purpose (factory method)
 */
export function createTokenForPurpose(
  type: TokenType,
  customExpiry?: number,
  metadata?: TokenMetadata
): Token {
  const value = Token.generate(type);
  const issuedAt = new Date();
  const expiresIn = customExpiry !== undefined ? customExpiry : TOKEN_CONFIG.DEFAULT_EXPIRY[type];
  const expiresAt = expiresIn > 0
    ? new Date(issuedAt.getTime() + expiresIn * 1000)
    : undefined;
  
  return new Token(value, type, issuedAt, expiresAt, metadata);
}

/**
 * Validate token string without creating object (for quick checks)
 */
export function isValidTokenFormat(token: unknown, type: TokenType): boolean {
  if (typeof token !== 'string') return false;
  const validation = Token.validate(token, type);
  return validation.isValid;
}

// ============================================================
// Type Exports
// ============================================================

export type { TokenMetadata };
