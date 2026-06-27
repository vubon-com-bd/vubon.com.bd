/**
 * Refresh Token Entity - Pure Domain Core (Enterprise Enhanced)
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
 * ✅ Session linking for complete audit trail
 * ✅ QR code support for feature phones (Bangladesh)
 * 
 * Security Features:
 * - If a rotated token is used, entire family is revoked (theft detection)
 * - Maximum absolute lifetime (30 days max)
 * - One-time use tokens (marked as used)
 * - Family tracking for audit
 * - Session linkage for complete session management
 */

import { BaseEntity, EntityValidationResult, EntityValidationError, type IdGenerator } from './base.entity';
import { Token, TokenType } from '../value-objects/token.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ FIXED: Import from shared-constants instead of local constants
import { REFRESH_TOKEN_CONFIG } from '@vubon/shared-constants';


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
  REFRESH_TOKEN_SESSION_LINKED = 'refresh_token.session_linked',
  REFRESH_TOKEN_QR_GENERATED = 'refresh_token.qr_generated',
}

// ==================== Types ====================

/**
 * Refresh token configuration (from shared-constants)
 */
const REFRESH_CONFIG = {
  EXPIRY_DAYS: REFRESH_TOKEN_CONFIG.EXPIRY_DAYS,
  EXPIRY_MS: REFRESH_TOKEN_CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  MAX_ABSOLUTE_LIFETIME_DAYS: REFRESH_TOKEN_CONFIG.MAX_ABSOLUTE_LIFETIME_DAYS,
  MAX_ABSOLUTE_LIFETIME_MS: REFRESH_TOKEN_CONFIG.MAX_ABSOLUTE_LIFETIME_DAYS * 24 * 60 * 60 * 1000,
  MAX_ROTATION_COUNT: REFRESH_TOKEN_CONFIG.MAX_ROTATION_COUNT,
} as const;

/**
 * QR Code generation result (Bangladesh specific - for feature phones)
 */
export interface QrCodeResult {
  token: string;
  expiresAt: Date;
  qrDataUrl?: string;
}

/**
 * Session link information
 */
export interface SessionLinkInfo {
  sessionId: string;
  linkedAt: Date;
  linkedBy: string;
}

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
  private _deviceId: DeviceId | undefined;
  private _ipAddress: IpAddress | undefined;
  private _userAgent: string | undefined;
  
  // Session linking for complete audit trail
  private _sessionId: string | undefined;
  private _sessionLinkedAt: Date | undefined;
  private _sessionLinkedBy: string | undefined;
  
  // QR Code support for feature phones (Bangladesh specific)
  private _qrCodeToken: string | undefined;
  private _qrCodeExpiresAt: Date | undefined;
  private _qrCodeGeneratedAt: Date | undefined;

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
    sessionId: string | undefined,
    sessionLinkedAt: Date | undefined,
    sessionLinkedBy: string | undefined,
    qrCodeToken: string | undefined,
    qrCodeExpiresAt: Date | undefined,
    qrCodeGeneratedAt: Date | undefined,
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
    this._sessionId = sessionId;
    this._sessionLinkedAt = sessionLinkedAt;
    this._sessionLinkedBy = sessionLinkedBy;
    this._qrCodeToken = qrCodeToken;
    this._qrCodeExpiresAt = qrCodeExpiresAt;
    this._qrCodeGeneratedAt = qrCodeGeneratedAt;
    
    // ✅ Call validate after construction
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'RefreshToken validation failed',
        validationResult.errors,
        this.constructor.name
      );
    }
  }

  /**
   * ✅ FIXED: Validate entity invariants - returns EntityValidationResult
   */
  protected validate(): EntityValidationResult {
    const errors: string[] = [];
    
    // Required fields
    if (!this._userId) {
      errors.push('Refresh token requires a user ID');
    }
    if (!this._token) {
      errors.push('Refresh token requires a token value');
    }
    if (!this._family) {
      errors.push('Refresh token requires a family ID');
    }
    
    // Numeric validation
    if (this._rotationCount < 0) {
      errors.push('Rotation count cannot be negative');
    }
    if (this._rotationCount > REFRESH_CONFIG.MAX_ROTATION_COUNT) {
      errors.push(`Rotation count exceeds maximum of ${REFRESH_CONFIG.MAX_ROTATION_COUNT}`);
    }
    
    // Date validation
    if (this._expiresAt < this.createdAt) {
      errors.push('ExpiresAt cannot be before CreatedAt');
    }
    
    // ✅ QR code expiry validation
    if (this._qrCodeExpiresAt && this._qrCodeGeneratedAt && 
        this._qrCodeExpiresAt < this._qrCodeGeneratedAt) {
      errors.push('QR code expiry cannot be before generation time');
    }
    
    // Status-specific validation
    if (this._status === RefreshTokenStatus.COMPROMISED && !this._compromisedAt) {
      errors.push('Compromised token must have a compromised timestamp');
    }
    if (this._status === RefreshTokenStatus.COMPROMISED && !this._compromisedReason) {
      errors.push('Compromised token must have a compromised reason');
    }
    
    // Session link validation
    if (this._sessionId && !this._sessionLinkedAt) {
      errors.push('Session link must have a linked timestamp');
    }
    if (this._sessionId && !this._sessionLinkedBy) {
      errors.push('Session link must have a linked by reference');
    }
    
    // QR code validation
    if (this._qrCodeToken && !this._qrCodeGeneratedAt) {
      errors.push('QR code must have a generation timestamp');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
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
      undefined,  // sessionId
      undefined,  // sessionLinkedAt
      undefined,  // sessionLinkedBy
      undefined,  // qrCodeToken
      undefined,  // qrCodeExpiresAt
      undefined,  // qrCodeGeneratedAt
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
        hasDeviceInfo: !!(deviceId || ipAddress || userAgent),
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
    sessionId?: string;
    sessionLinkedAt?: Date;
    sessionLinkedBy?: string;
    qrCodeToken?: string;
    qrCodeExpiresAt?: Date;
    qrCodeGeneratedAt?: Date;
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
      data.sessionId,
      data.sessionLinkedAt,
      data.sessionLinkedBy,
      data.qrCodeToken,
      data.qrCodeExpiresAt,
      data.qrCodeGeneratedAt,
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
        rotationCount: this._rotationCount,
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
    
    // Create new token in same family, preserving session link
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
    
    // Preserve session link if exists
    if (this._sessionId) {
      rotatedToken.linkToSession(this._sessionId, 'rotation_preserved');
    }
    
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
        preservedSession: !!this._sessionId,
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
        sessionId: this._sessionId,
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
        rotationCount: this._rotationCount,
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
        reason,
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
        expiresAt: this._expiresAt.toISOString(),
      },
    });
  }

  // ============================================================
  // Session Linking Methods
  // ============================================================

  /**
   * Link refresh token to a session
   */
  public linkToSession(sessionId: string, linkedBy: string = 'system'): void {
    if (!this.isActive()) {
      throw new EntityValidationError(
        `Cannot link inactive token to session. Current status: ${this._status}`
      );
    }
    
    this._sessionId = sessionId;
    this._sessionLinkedAt = new Date();
    this._sessionLinkedBy = linkedBy;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_SESSION_LINKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        sessionId,
        linkedBy,
        tokenFamily: this._family,
      },
    });
  }

  /**
   * Unlink refresh token from session
   */
  public unlinkFromSession(): void {
    if (!this._sessionId) {
      return;
    }
    
    this._sessionId = undefined;
    this._sessionLinkedAt = undefined;
    this._sessionLinkedBy = undefined;
    this.touch();
  }

  /**
   * Get session link information
   */
  public getSessionLinkInfo(): SessionLinkInfo | undefined {
    if (!this._sessionId) {
      return undefined;
    }
    
    return {
      sessionId: this._sessionId,
      linkedAt: this._sessionLinkedAt!,
      linkedBy: this._sessionLinkedBy!,
    };
  }

  // ============================================================
  // QR Code Support for Feature Phones (Bangladesh)
  // ============================================================

  /**
   * Generate QR code token for feature phone authentication
   */
  public generateQrCodeToken(qrCodeValue?: string, expiresInMinutes: number = 5): QrCodeResult {
    if (!this.isActive()) {
      throw new EntityValidationError(
        `Cannot generate QR code for inactive token. Current status: ${this._status}`
      );
    }
    
    const qrToken = qrCodeValue || Token.generate(TokenType.DEVICE, 16);
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    
    this._qrCodeToken = qrToken;
    this._qrCodeExpiresAt = expiresAt;
    this._qrCodeGeneratedAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: RefreshTokenEventType.REFRESH_TOKEN_QR_GENERATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        expiresAt: expiresAt.toISOString(),
        expiresInMinutes,
      },
    });
    
    return {
      token: qrToken,
      expiresAt,
    };
  }

  /**
   * Verify QR code token
   */
  public verifyQrCodeToken(qrToken: string): boolean {
    if (!this._qrCodeToken) {
      return false;
    }
    
    if (this._qrCodeExpiresAt && new Date() > this._qrCodeExpiresAt) {
      return false;
    }
    
    return this._qrCodeToken === qrToken;
  }

  /**
   * Invalidate QR code token (after use)
   */
  public invalidateQrCode(): void {
    this._qrCodeToken = undefined;
    this._qrCodeExpiresAt = undefined;
    this._qrCodeGeneratedAt = undefined;
    this.touch();
  }

  /**
   * Check if QR code is still valid
   */
  public isQrCodeValid(): boolean {
    return !!this._qrCodeToken && 
           (!this._qrCodeExpiresAt || new Date() <= this._qrCodeExpiresAt);
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
   * ✅ FIXED: Check if token has exceeded absolute maximum lifetime
   * Uses `this.createdAt` from BaseEntity instead of `getCreatedAt()`
   */
  public hasExceededAbsoluteLifetime(): boolean {
    const createdAt = this.createdAt;  // ✅ BaseEntity থেকে createdAt ব্যবহার
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
   * Check if token is active
   */
  public isActive(): boolean {
    return this._status === RefreshTokenStatus.ACTIVE && 
           !this.isExpired() && 
           !this.hasExceededAbsoluteLifetime();
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

  /**
   * ✅ FIXED: Get token age in days
   * Uses `this.createdAt` from BaseEntity instead of `getCreatedAt()`
   */
  public getAgeInDays(): number {
    const ageMs = Date.now() - this.createdAt.getTime();  // ✅ BaseEntity থেকে createdAt ব্যবহার
    return Math.floor(ageMs / (24 * 60 * 60 * 1000));
  }

  /**
   * Check if token can be refreshed (for this token)
   */
  public canBeRefreshed(): boolean {
    return this.isActive() && !this.hasExceededAbsoluteLifetime();
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
  
  // Session getters
  public getSessionId(): string | undefined { return this._sessionId; }
  public getSessionLinkedAt(): Date | undefined { return this._sessionLinkedAt ? new Date(this._sessionLinkedAt) : undefined; }
  public getSessionLinkedBy(): string | undefined { return this._sessionLinkedBy; }
  
  // QR code getters
  public getQrCodeToken(): string | undefined { return this._qrCodeToken; }
  public getQrCodeExpiresAt(): Date | undefined { return this._qrCodeExpiresAt ? new Date(this._qrCodeExpiresAt) : undefined; }
  public getQrCodeGeneratedAt(): Date | undefined { return this._qrCodeGeneratedAt ? new Date(this._qrCodeGeneratedAt) : undefined; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    const remaining = this.getRemainingTime();
    const sessionLink = this.getSessionLinkInfo();
    
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
      ipAddress: this._ipAddress?.getValue(),
      sessionId: this._sessionId,
      sessionLink,
      isExpired: this.isExpired(),
      isRevoked: this.isRevoked(),
      isCompromised: this.isCompromised(),
      isActive: this.isActive(),
      isValidForRotation: this.isValidForRotation(),
      hasExceededAbsoluteLifetime: this.hasExceededAbsoluteLifetime(),
      remainingDays: remaining.days,
      remainingHours: remaining.hours,
      remainingMinutes: remaining.minutes,
      remainingTimeFormatted: this.getRemainingTimeFormatted(),
      ageInDays: this.getAgeInDays(),
      canBeRefreshed: this.canBeRefreshed(),
      hasQrCode: !!this._qrCodeToken,
      isQrCodeValid: this.isQrCodeValid(),
      qrCodeExpiresAt: this._qrCodeExpiresAt?.toISOString(),
      // ⚠️ Token value and QR code token are intentionally excluded for security
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
