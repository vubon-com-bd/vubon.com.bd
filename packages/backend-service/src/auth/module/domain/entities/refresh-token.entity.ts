// packages/backend-service/src/auth/module/domain/entities/refresh-token.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { Token } from '../value-objects';

/**
 * Refresh Token Entity
 * Represents a refresh token with rotation and revocation support
 * Manages token families, versions, and security lifecycle
 */
export class RefreshToken extends BaseEntity {
  private _userId: string;
  private _token: Token;
  private _familyId: string;
  private _version: number;
  private _rotatedAt?: Date;
  private _revokedAt?: Date;
  private _revokedReason?: string;
  private _expiresAt: Date;
  private _lastUsedAt: Date;

  private constructor(
    id: string,
    userId: string,
    token: Token,
    familyId: string,
    version: number,
    expiresAt: Date,
    rotatedAt?: Date,
    revokedAt?: Date,
    revokedReason?: string,
    lastUsedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token;
    this._familyId = familyId;
    this._version = version;
    this._rotatedAt = rotatedAt;
    this._revokedAt = revokedAt;
    this._revokedReason = revokedReason;
    this._expiresAt = expiresAt;
    this._lastUsedAt = lastUsedAt || new Date();
  }

  /**
   * Static factory method to create a new refresh token
   * @param userId - ID of the user
   * @param token - Validated token value object
   * @param familyId - Token family ID for tracking rotations
   * @param expiresInSeconds - Token expiry in seconds (default: 604800 = 7 days)
   * @returns A new RefreshToken entity
   */
  static create(
    userId: string,
    token: Token,
    familyId: string,
    expiresInSeconds: number = 604800
  ): RefreshToken {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!token || !(token instanceof Token)) {
      throw new Error('Valid token is required');
    }

    if (!familyId || typeof familyId !== 'string') {
      throw new Error('Family ID is required');
    }

    if (expiresInSeconds <= 0) {
      throw new Error('Expiry time must be greater than 0');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

    return new RefreshToken(
      randomUUID(),
      userId,
      token,
      familyId,
      1,
      expiresAt,
      undefined,
      undefined,
      undefined,
      now
    );
  }

  /**
   * Reconstruct a RefreshToken entity from persistence
   * Used by repositories to hydrate entities
   */
  static reconstitute(
    id: string,
    userId: string,
    token: Token,
    familyId: string,
    version: number,
    expiresAt: Date,
    rotatedAt?: Date,
    revokedAt?: Date,
    revokedReason?: string,
    lastUsedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ): RefreshToken {
    return new RefreshToken(
      id,
      userId,
      token,
      familyId,
      version,
      expiresAt,
      rotatedAt,
      revokedAt,
      revokedReason,
      lastUsedAt,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get userId(): string {
    return this._userId;
  }

  get token(): Token {
    return this._token;
  }

  get familyId(): string {
    return this._familyId;
  }

  get version(): number {
    return this._version;
  }

  get rotatedAt(): Date | undefined {
    return this._rotatedAt ? new Date(this._rotatedAt) : undefined;
  }

  get revokedAt(): Date | undefined {
    return this._revokedAt ? new Date(this._revokedAt) : undefined;
  }

  get revokedReason(): string | undefined {
    return this._revokedReason;
  }

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get lastUsedAt(): Date {
    return new Date(this._lastUsedAt);
  }

  get isRevoked(): boolean {
    return !!this._revokedAt;
  }

  get isRotated(): boolean {
    return !!this._rotatedAt;
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Check if the token is expired
   * @returns True if the token has expired
   */
  isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  /**
   * Check if the token is valid (not revoked and not expired)
   * @returns True if the token is valid
   */
  isValid(): boolean {
    return !this.isRevoked && !this.isExpired();
  }

  /**
   * Rotate the refresh token (create a new token in the same family)
   * @param newToken - The new token value object
   * @param expiresInSeconds - New token expiry in seconds (default: 604800 = 7 days)
   * @returns A new RefreshToken entity
   * @throws {Error} If the current token is revoked or expired
   */
  rotate(newToken: Token, expiresInSeconds: number = 604800): RefreshToken {
    if (this.isRevoked) {
      throw new Error('Cannot rotate a revoked token');
    }

    if (this.isExpired()) {
      throw new Error('Cannot rotate an expired token');
    }

    if (!newToken || !(newToken instanceof Token)) {
      throw new Error('Valid new token is required');
    }

    if (expiresInSeconds <= 0) {
      throw new Error('Expiry time must be greater than 0');
    }

    // Mark this token as rotated
    this._rotatedAt = new Date();
    this.touch();

    // Create a new token in the same family with incremented version
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

    return new RefreshToken(
      randomUUID(),
      this._userId,
      newToken,
      this._familyId,
      this._version + 1,
      expiresAt,
      undefined,
      undefined,
      undefined,
      now
    );
  }

  /**
   * Revoke the refresh token
   * @param reason - Reason for revocation (optional)
   * @throws {Error} If the token is already revoked
   */
  revoke(reason?: string): void {
    if (this.isRevoked) {
      throw new Error('Token is already revoked');
    }

    this._revokedAt = new Date();
    this._revokedReason = reason || 'User initiated';

    this.touch();
  }

  /**
   * Record usage of the refresh token
   * Updates the last used timestamp
   */
  recordUsage(): void {
    if (this.isRevoked) {
      return; // Don't record usage for revoked tokens
    }

    this._lastUsedAt = new Date();
    this.touch();
  }

  /**
   * Get the time remaining until expiry in seconds
   * @returns Seconds remaining or 0 if expired
   */
  getTimeRemainingSeconds(): number {
    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();
    const remaining = Math.floor((expiryTime - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get the token age in seconds
   * @returns Seconds since token creation
   */
  getAgeSeconds(): number {
    const now = Date.now();
    const created = this.createdAt.getTime();
    return Math.floor((now - created) / 1000);
  }

  /**
   * Get a summary of the refresh token
   */
  getSummary(): {
    id: string;
    userId: string;
    familyId: string;
    version: number;
    isRevoked: boolean;
    isRotated: boolean;
    isExpired: boolean;
    isValid: boolean;
    expiresAt: Date;
    lastUsedAt: Date;
    timeRemainingSeconds: number;
    ageSeconds: number;
    rotatedAt?: Date;
    revokedAt?: Date;
    revokedReason?: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      familyId: this._familyId,
      version: this._version,
      isRevoked: this.isRevoked,
      isRotated: this.isRotated,
      isExpired: this.isExpired(),
      isValid: this.isValid(),
      expiresAt: this._expiresAt,
      lastUsedAt: this._lastUsedAt,
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      rotatedAt: this._rotatedAt,
      revokedAt: this._revokedAt,
      revokedReason: this._revokedReason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two RefreshToken entities are equal (compare by id)
   */
  equals(other: RefreshToken | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof RefreshToken)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Create a deep clone of the RefreshToken entity
   */
  clone(): RefreshToken {
    return new RefreshToken(
      this.id,
      this._userId,
      this._token,
      this._familyId,
      this._version,
      new Date(this._expiresAt),
      this._rotatedAt ? new Date(this._rotatedAt) : undefined,
      this._revokedAt ? new Date(this._revokedAt) : undefined,
      this._revokedReason,
      new Date(this._lastUsedAt),
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
