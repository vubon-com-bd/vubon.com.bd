// packages/backend-service/src/auth/module/domain/entities/refresh-token.entity.ts

// ✅ External libraries
import { randomUUID } from 'crypto';

// ✅ Shared packages
import type { Token } from '../value-objects/token.vo';
import type { UserId } from '../value-objects/user-id.vo';

// ✅ Relative paths
import { BaseEntity } from './base.entity';

/**
 * Refresh Token Entity
 * Represents a refresh token for token rotation and session management
 * Tracks token family, version, and rotation history
 */
export class RefreshToken extends BaseEntity {
  private _userId: UserId;
  private _token: Token;
  private _familyId: string;
  private _version: number;
  private _rotatedAt: Date | null;
  private _revokedAt: Date | null;
  private _revocationReason: string | null;
  private _expiresAt: Date;

  private constructor(
    id: string,
    userId: UserId,
    token: Token,
    familyId: string,
    version: number,
    expiresAt: Date,
    rotatedAt: Date | null = null,
    revokedAt: Date | null = null,
    revocationReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token;
    this._familyId = familyId;
    this._version = version;
    this._expiresAt = expiresAt;
    this._rotatedAt = rotatedAt;
    this._revokedAt = revokedAt;
    this._revocationReason = revocationReason;
  }

  /**
   * Create a new refresh token
   */
  static create(
    id: string,
    userId: UserId,
    token: Token,
    expiresAt: Date,
    familyId?: string
  ): RefreshToken {
    const now = new Date();
    const tokenFamilyId = familyId || randomUUID();
    return new RefreshToken(
      id,
      userId,
      token,
      tokenFamilyId,
      1,
      expiresAt,
      null,
      null,
      null,
      now,
      now
    );
  }

  /**
   * Reconstruct a refresh token from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    token: Token,
    familyId: string,
    version: number,
    expiresAt: Date,
    rotatedAt: Date | null = null,
    revokedAt: Date | null = null,
    revocationReason: string | null = null,
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
      revocationReason,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get userId(): UserId {
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

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get rotatedAt(): Date | null {
    return this._rotatedAt ? new Date(this._rotatedAt) : null;
  }

  get revokedAt(): Date | null {
    return this._revokedAt ? new Date(this._revokedAt) : null;
  }

  get revocationReason(): string | null {
    return this._revocationReason;
  }

  get isExpired(): boolean {
    return this._expiresAt < new Date();
  }

  get isRevoked(): boolean {
    return this._revokedAt !== null;
  }

  get isRotated(): boolean {
    return this._rotatedAt !== null;
  }

  get isValid(): boolean {
    return !this.isExpired && !this.isRevoked;
  }

  /**
   * Rotate the refresh token to a new version
   * Creates a new token with incremented version
   */
  rotate(newToken: Token, newExpiresAt: Date): RefreshToken {
    if (this.isExpired) {
      throw new Error('Cannot rotate an expired refresh token');
    }

    if (this.isRevoked) {
      throw new Error('Cannot rotate a revoked refresh token');
    }

    // Mark current token as rotated
    this._rotatedAt = new Date();
    this.touch();

    // Create new token with incremented version
    const newId = randomUUID();
    const newVersion = this._version + 1;

    return new RefreshToken(
      newId,
      this._userId,
      newToken,
      this._familyId,
      newVersion,
      newExpiresAt,
      null,
      null,
      null,
      new Date(),
      new Date()
    );
  }

  /**
   * Revoke the refresh token
   */
  revoke(reason: string = 'USER_INITIATED'): void {
    if (this.isRevoked) {
      throw new Error('Refresh token is already revoked');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Revocation reason is required');
    }

    if (reason.length > 500) {
      throw new Error('Revocation reason cannot exceed 500 characters');
    }

    this._revokedAt = new Date();
    this._revocationReason = reason;
    this.touch();
  }

  /**
   * Get the time remaining until expiry in seconds
   */
  getTimeRemainingSeconds(): number {
    const now = Date.now();
    const expiry = this._expiresAt.getTime();
    const remaining = Math.floor((expiry - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get the age of the token in seconds
   */
  getAgeSeconds(): number {
    return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
  }

  /**
   * Get token summary
   */
  getSummary(): {
    id: string;
    userId: string;
    familyId: string;
    version: number;
    expiresAt: Date;
    isExpired: boolean;
    isRevoked: boolean;
    isRotated: boolean;
    isValid: boolean;
    remainingSeconds: number;
    ageSeconds: number;
    rotatedAt: Date | null;
    revokedAt: Date | null;
    revocationReason: string | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      familyId: this._familyId,
      version: this._version,
      expiresAt: this._expiresAt,
      isExpired: this.isExpired,
      isRevoked: this.isRevoked,
      isRotated: this.isRotated,
      isValid: this.isValid,
      remainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      rotatedAt: this._rotatedAt,
      revokedAt: this._revokedAt,
      revocationReason: this._revocationReason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two RefreshToken entities
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
   * Get string representation
   */
  toString(): string {
    return `RefreshToken(id=${this.id}, userId=${this._userId.value}, familyId=${this._familyId}, version=${this._version})`;
  }
}
