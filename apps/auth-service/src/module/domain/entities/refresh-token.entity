/**
 * Refresh Token Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/refresh-token.entity
 * 
 * @description
 * Represents a refresh token for JWT authentication with rotation support.
 * Implements token family pattern for detecting token theft.
 * 
 * Enterprise Rules:
 * ✅ Token rotation on each refresh (prevents replay attacks)
 * ✅ Family-based revocation (detect token theft)
 * ✅ Configurable expiry (7 days default)
 * ✅ Domain events for security audit
 * ✅ Framework-free (no crypto dependency)
 * ✅ Absolute maximum lifetime (30 days max)
 * 
 * Security Features:
 * - If a rotated token is used, entire family is revoked (theft detection)
 * - Maximum absolute lifetime (30 days max)
 * - One-time use tokens (marked as used)
 * - Family tracking for audit
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Token, TokenType } from '../value-objects/token.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ==================== Enums ====================

/**
 * Refresh token status enumeration
 */
export enum RefreshTokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  COMPROMISED = 'COMPROMISED', // Token theft detected
}

/**
 * Refresh token event types
 */
export enum RefreshTokenEventType {
  REFRESH_TOKEN_CREATED = 'refresh_token.created',
  REFRESH_TOKEN_ROTATED = 'refresh_token.rotated',
  REFRESH_TOKEN_REVOKED = 'refresh_token.revoked',
  REFRESH_TOKEN_USED = 'refresh_token.used',
  REFRESH_TOKEN_EXPIRED = 'refresh_token.expired',
  REFRESH_TOKEN_COMPROMISED = 'refresh_token.compromised',
  REFRESH_TOKEN_FAMILY_REVOKED = 'refresh_token.family_revoked',
}

// ==================== Types ====================

/**
 * Refresh token configuration constants
 */
const REFRESH_CONFIG = {
  EXPIRY_DAYS: 7,
  EXPIRY_MS: 7 * 24 * 60 * 60 * 1000,
  MAX_ABSOLUTE_LIFETIME_DAYS: 30,
  MAX_ABSOLUTE_LIFETIME_MS: 30 * 24 * 60 * 60 * 1000,
  MAX_ROTATION_COUNT: 50, // Prevent infinite rotation chains
} as const;

// ==================== Refresh Token Entity ====================

/**
 * Refresh Token Entity
 * 
 * Manages refresh tokens with rotation and family pattern
 */
export class RefreshToken extends BaseEntity {
  private _userId: string;
  private _token: Token;
  private _status: RefreshTokenStatus;
  private _expiresAt: Date;
  private _revokedAt: Date | undefined;
  private _usedAt: Date | undefined;
  private _family: string;
  private _previousTokenId: string | undefined;
  private _rotationCount: number;
  private _compromisedAt: Date | undefined;
  private _compromisedReason: string | undefined;
  private _deviceId?: DeviceId;
  private _ipAddress?: IpAddress;
  private _userAgent?: string;

  private constructor(
    id: string,
    userId: string,
    token: Token,
    status: RefreshTokenStatus,
    expiresAt: Date,
    revokedAt: Date | undefined,
    usedAt: Date | undefined,
    family: string,
    previousTokenId: string | undefined,
    rotationCount: number,
    compromisedAt: Date | undefined,
    compromisedReason: string | undefined,
    deviceId: DeviceId | undefined,
    ipAddress: IpAddress | undefined,
    userAgent: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._token = token;
    this._status = status;
    this._expiresAt = expiresAt;
    this._revokedAt = revokedAt;
    this._usedAt = usedAt;
    this._family = family;
    this._previousTokenId = previousTokenId;
    this._rotationCount = rotationCount;
    this._compromisedAt = compromisedAt;
    this._compromisedReason = compromisedReason;
    this._deviceId = deviceId;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Refresh token requires a user ID');
    }
    if (!this._token) {
      throw new EntityValidationError('Refresh token requires a token value');
    }
    if (!this._family) {
      throw new EntityValidationError('Refresh token requires a family ID');
    }
    if (this._rotationCount < 0) {
      throw new EntityValidationError('Rotation count cannot be negative');
    }
    if (this._rotationCount > REFRESH_CONFIG.MAX_ROTATION_COUNT) {
      throw new EntityValidationError(
        `Rotation count exceeds maximum of ${REFRESH_CONFIG.MAX_ROTATION_COUNT}`
      );
    }
    if (this._expiresAt < this.createdAt) {
      throw new EntityValidationError('ExpiresAt cannot be before CreatedAt');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new refresh token (factory method)
   */
  public static create(
    userId: string,
    token: Token,
    idGenerator: IdGenerator,
    deviceId?: DeviceId,
    ipAddress?: IpAddress,
    userAgent?: string,
    family?: string,
    previousTokenId?: string,
    rotationCount: number = 0
  ): RefreshToken {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + REFRESH_CONFIG.EXPIRY_MS);
    const tokenFamily = family || idGenerator.generate();
    
    const refreshToken = new RefreshToken(
      idGenerator.generate(),
      userId,
      token,
      RefreshTokenStatus.ACTIVE,
      expiresAt,
      undefined,
      undefined,
      tokenFamily,
      previousTokenId,
      rotationCount,
      undefined,
      undefined,
      deviceId,
      ipAddress,
      userAgent,
      now,
      now,
      1
    );
    
    refreshToken.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_CREATED,
      aggregateId: refreshToken.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        family: tokenFamily,
        expiresAt: expiresAt.toISOString(),
        deviceId: deviceId?.getValue(),
      },
    });
    
    return refreshToken;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    token: Token;
    status: RefreshTokenStatus;
    expiresAt: Date;
    revokedAt?: Date;
    usedAt?: Date;
    family: string;
    previousTokenId?: string;
    rotationCount: number;
    compromisedAt?: Date;
    compromisedReason?: string;
    deviceId?: DeviceId;
    ipAddress?: IpAddress;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): RefreshToken {
    return new RefreshToken(
      data.id,
      data.userId,
      data.token,
      data.status,
      data.expiresAt,
      data.revokedAt,
      data.usedAt,
      data.family,
      data.previousTokenId,
      data.rotationCount,
      data.compromisedAt,
      data.compromisedReason,
      data.deviceId,
      data.ipAddress,
      data.userAgent,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Revoke this token
   */
  public revoke(reason?: string): void {
    if (this._status !== RefreshTokenStatus.ACTIVE) {
      throw new EntityValidationError(
        `Can only revoke active tokens. Current status: ${this._status}`
      );
    }
    
    this._status = RefreshTokenStatus.REVOKED;
    this._revokedAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        family: this._family,
        reason: reason || 'Manual revocation',
      },
    });
  }

  /**
   * Rotate token (create new token, revoke current)
   * Implements token rotation pattern for security
   */
  public rotate(
    newToken: Token,
    idGenerator: IdGenerator,
    newDeviceId?: DeviceId,
    newIpAddress?: IpAddress,
    newUserAgent?: string
  ): RefreshToken {
    if (!this.isValidForRotation()) {
      throw new EntityValidationError('Cannot rotate invalid or expired token');
    }
    
    // Check maximum absolute lifetime
    if (this.hasExceededAbsoluteLifetime()) {
      throw new EntityValidationError('Token has exceeded maximum absolute lifetime');
    }
    
    // Check rotation limit
    if (this._rotationCount >= REFRESH_CONFIG.MAX_ROTATION_COUNT) {
      throw new EntityValidationError(
        `Token has reached maximum rotation count of ${REFRESH_CONFIG.MAX_ROTATION_COUNT}`
      );
    }
    
    // Revoke current token
    this.revoke('Rotated');
    
    // Create new token in same family
    const rotatedToken = RefreshToken.create(
      this._userId,
      newToken,
      idGenerator,
      newDeviceId || this._deviceId,
      newIpAddress || this._ipAddress,
      newUserAgent || this._userAgent,
      this._family,
      this.id,
      this._rotationCount + 1
    );
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_ROTATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        oldTokenId: this.id,
        newTokenId: rotatedToken.id,
        family: this._family,
        rotationCount: this._rotationCount + 1,
      },
    });
    
    return rotatedToken;
  }

  /**
   * Mark token as used (one-time use)
   */
  public markUsed(): void {
    if (this._status !== RefreshTokenStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot use inactive token. Current status: ${this._status}`
      );
    }
    
    if (this.isExpired()) {
      this.markExpired();
      throw new EntityValidationError('Cannot use expired token');
    }
    
    this._status = RefreshTokenStatus.USED;
    this._usedAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_USED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
      },
    });
  }

  /**
   * Mark token as compromised (token theft detected)
   * This will revoke the entire token family
   */
  public markCompromised(reason: string, familyTokens: RefreshToken[]): void {
    this._status = RefreshTokenStatus.COMPROMISED;
    this._compromisedAt = new Date();
    this._compromisedReason = reason;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_COMPROMISED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        family: this._family,
        reason,
      },
    });
    
    // Revoke all tokens in the family
    for (const token of familyTokens) {
      if (token.id !== this.id && token._status === RefreshTokenStatus.ACTIVE) {
        token.revoke(`Compromised - family ${this._family}`);
      }
    }
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_FAMILY_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        family: this._family,
        tokenCount: familyTokens.length,
      },
    });
  }

  /**
   * Mark token as expired
   */
  private markExpired(): void {
    if (this._status !== RefreshTokenStatus.ACTIVE) {
      return;
    }
    
    this._status = RefreshTokenStatus.EXPIRED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
      },
    });
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if token is expired
   */
  public isExpired(): boolean {
    if (this._status === RefreshTokenStatus.EXPIRED) return true;
    if (this._status !== RefreshTokenStatus.ACTIVE) return false;
    return new Date() > this._expiresAt;
  }

  /**
   * Check if token has exceeded absolute maximum lifetime
   */
  public hasExceededAbsoluteLifetime(): boolean {
    const createdAt = this.getCreatedAt();
    const absoluteExpiry = new Date(createdAt.getTime() + REFRESH_CONFIG.MAX_ABSOLUTE_LIFETIME_MS);
    return new Date() > absoluteExpiry;
  }

  /**
   * Check if token is valid for rotation
   */
  public isValidForRotation(): boolean {
    return this._status === RefreshTokenStatus.ACTIVE && 
           !this.isExpired() && 
           !this.hasExceededAbsoluteLifetime();
  }

  /**
   * Check if token is revoked
   */
  public isRevoked(): boolean {
    return this._status === RefreshTokenStatus.REVOKED;
  }

  /**
   * Check if token is compromised
   */
  public isCompromised(): boolean {
    return this._status === RefreshTokenStatus.COMPROMISED;
  }

  /**
   * Get remaining time in days/hours/minutes
   */
  public getRemainingTime(): { days: number; hours: number; minutes: number } {
    if (this.isExpired()) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    
    const remainingMs = this._expiresAt.getTime() - new Date().getTime();
    const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    
    return { days, hours, minutes };
  }

  /**
   * Get remaining time formatted
   */
  public getRemainingTimeFormatted(): string {
    const { days, hours, minutes } = this.getRemainingTime();
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    return 'Expiring soon';
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getToken(): Token { return this._token; }
  public getStatus(): RefreshTokenStatus { return this._status; }
  public getExpiresAt(): Date { return new Date(this._expiresAt); }
  public getRevokedAt(): Date | undefined { return this._revokedAt ? new Date(this._revokedAt) : undefined; }
  public getUsedAt(): Date | undefined { return this._usedAt ? new Date(this._usedAt) : undefined; }
  public getFamily(): string { return this._family; }
  public getPreviousTokenId(): string | undefined { return this._previousTokenId; }
  public getRotationCount(): number { return this._rotationCount; }
  public getCompromisedAt(): Date | undefined { return this._compromisedAt ? new Date(this._compromisedAt) : undefined; }
  public getCompromisedReason(): string | undefined { return this._compromisedReason; }
  public getDeviceId(): DeviceId | undefined { return this._deviceId; }
  public getIpAddress(): IpAddress | undefined { return this._ipAddress; }
  public getUserAgent(): string | undefined { return this._userAgent; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    const remaining = this.getRemainingTime();
    
    return {
      ...super.toJSON(),
      userId: this._userId,
      status: this._status,
      expiresAt: this._expiresAt.toISOString(),
      revokedAt: this._revokedAt?.toISOString(),
      usedAt: this._usedAt?.toISOString(),
      family: this._family,
      rotationCount: this._rotationCount,
      deviceId: this._deviceId?.getValue(),
      isExpired: this.isExpired(),
      isRevoked: this.isRevoked(),
      isValidForRotation: this.isValidForRotation(),
      remainingDays: remaining.days,
      remainingHours: remaining.hours,
      remainingMinutes: remaining.minutes,
      remainingTimeFormatted: this.getRemainingTimeFormatted(),
      // ⚠️ Token value is intentionally excluded for security
    };
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate event ID (pure domain function)
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Type Exports
// ============================================================

export type { RefreshTokenConfig };
