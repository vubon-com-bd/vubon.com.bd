// packages/backend-service/src/auth/module/domain/entities/session.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { DeviceId, IpAddress, UserAgent, Token } from '../value-objects';

/**
 * Session status types
 */
export type SessionStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'SUSPENDED';

/**
 * Session device information
 */
export interface SessionDeviceInfo {
  /** Device ID */
  deviceId: DeviceId;
  /** Device type (mobile, tablet, desktop, etc.) */
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown';
  /** Device name (user-provided) */
  deviceName?: string;
  /** Operating system name */
  osName: string;
  /** Operating system version */
  osVersion: string;
  /** Browser name */
  browserName: string;
  /** Browser version */
  browserVersion: string;
}

/**
 * Session Entity
 * Represents a user session with all business rules and behaviors
 */
export class Session extends BaseEntity {
  private _userId: string;
  private _token: Token;
  private _refreshToken: Token;
  private _deviceInfo: SessionDeviceInfo;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _expiresAt: Date;
  private _lastActivityAt: Date;
  private _status: SessionStatus;
  private _revokedAt?: Date;
  private _revokedReason?: string;
  private _extensionCount: number;

  private constructor(
    id: string,
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceInfo: SessionDeviceInfo,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresAt: Date,
    lastActivityAt: Date,
    status: SessionStatus,
    extensionCount: number,
    revokedAt?: Date,
    revokedReason?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token;
    this._refreshToken = refreshToken;
    this._deviceInfo = deviceInfo;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._expiresAt = expiresAt;
    this._lastActivityAt = lastActivityAt;
    this._status = status;
    this._extensionCount = extensionCount;
    this._revokedAt = revokedAt;
    this._revokedReason = revokedReason;
  }

  /**
   * Static factory method to create a new session
   * @param userId - ID of the user
   * @param token - Validated access token
   * @param refreshToken - Validated refresh token
   * @param deviceInfo - Device information
   * @param ipAddress - Validated IP address
   * @param userAgent - Validated user agent
   * @param expiresInSeconds - Session expiry in seconds (default: 86400 = 24 hours)
   * @returns A new Session entity
   */
  static create(
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceInfo: SessionDeviceInfo,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresInSeconds: number = 86400
  ): Session {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!token || !(token instanceof Token)) {
      throw new Error('Valid token is required');
    }

    if (!refreshToken || !(refreshToken instanceof Token)) {
      throw new Error('Valid refresh token is required');
    }

    if (!deviceInfo || typeof deviceInfo !== 'object') {
      throw new Error('Device information is required');
    }

    if (!ipAddress || !(ipAddress instanceof IpAddress)) {
      throw new Error('Valid IP address is required');
    }

    if (!userAgent || !(userAgent instanceof UserAgent)) {
      throw new Error('Valid user agent is required');
    }

    if (expiresInSeconds <= 0) {
      throw new Error('Expiry time must be greater than 0');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

    return new Session(
      randomUUID(),
      userId,
      token,
      refreshToken,
      deviceInfo,
      ipAddress,
      userAgent,
      expiresAt,
      now,
      'ACTIVE',
      0
    );
  }

  /**
   * Reconstruct a Session entity from persistence
   * Used by repositories to hydrate entities
   */
  static reconstitute(
    id: string,
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceInfo: SessionDeviceInfo,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresAt: Date,
    lastActivityAt: Date,
    status: SessionStatus,
    extensionCount: number,
    revokedAt?: Date,
    revokedReason?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Session {
    return new Session(
      id,
      userId,
      token,
      refreshToken,
      deviceInfo,
      ipAddress,
      userAgent,
      expiresAt,
      lastActivityAt,
      status,
      extensionCount,
      revokedAt,
      revokedReason,
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

  get refreshToken(): Token {
    return this._refreshToken;
  }

  get deviceInfo(): SessionDeviceInfo {
    return { ...this._deviceInfo };
  }

  get ipAddress(): IpAddress {
    return this._ipAddress;
  }

  get userAgent(): UserAgent {
    return this._userAgent;
  }

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get lastActivityAt(): Date {
    return new Date(this._lastActivityAt);
  }

  get status(): SessionStatus {
    return this._status;
  }

  get revokedAt(): Date | undefined {
    return this._revokedAt ? new Date(this._revokedAt) : undefined;
  }

  get revokedReason(): string | undefined {
    return this._revokedReason;
  }

  get extensionCount(): number {
    return this._extensionCount;
  }

  get isActive(): boolean {
    return this._status === 'ACTIVE' && !this.isExpired();
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Check if the session is expired
   * @returns True if the session has expired
   */
  isExpired(): boolean {
    if (this._status === 'EXPIRED') {
      return true;
    }

    if (this._status === 'REVOKED') {
      return false; // Revoked is separate from expired
    }

    return new Date() > this._expiresAt;
  }

  /**
   * Check if the session is revoked
   * @returns True if the session is revoked
   */
  isRevoked(): boolean {
    return this._status === 'REVOKED';
  }

  /**
   * Check if the session is valid (active and not expired)
   * @returns True if the session is valid
   */
  isValid(): boolean {
    return this.isActive && !this.isExpired();
  }

  /**
   * Extend the session expiry time
   * @param extensionSeconds - Number of seconds to extend (default: 1800 = 30 minutes)
   * @param maxExtensionCount - Maximum number of extensions allowed (default: 10)
   * @throws {Error} If session is not active, already expired, or extension limit reached
   */
  extend(extensionSeconds: number = 1800, maxExtensionCount: number = 10): void {
    if (this._status === 'REVOKED') {
      throw new Error('Cannot extend a revoked session');
    }

    if (this._status === 'EXPIRED') {
      throw new Error('Cannot extend an expired session');
    }

    if (this._status !== 'ACTIVE') {
      throw new Error(`Cannot extend a session with status: ${this._status}`);
    }

    if (this.isExpired()) {
      this._status = 'EXPIRED';
      throw new Error('Session has already expired');
    }

    if (this._extensionCount >= maxExtensionCount) {
      throw new Error(`Maximum session extension count (${maxExtensionCount}) reached`);
    }

    // Extend the expiry
    const newExpiry = new Date(this._expiresAt.getTime() + extensionSeconds * 1000);
    this._expiresAt = newExpiry;
    this._extensionCount += 1;

    this.touch();
  }

  /**
   * Revoke the session
   * @param reason - Reason for revocation (optional)
   * @throws {Error} If session is already revoked
   */
  revoke(reason?: string): void {
    if (this._status === 'REVOKED') {
      throw new Error('Session is already revoked');
    }

    this._status = 'REVOKED';
    this._revokedAt = new Date();
    this._revokedReason = reason || 'User initiated';

    this.touch();
  }

  /**
   * Update the last activity timestamp
   * Also updates the expiry if configured to extend on activity
   * @param autoExtend - Whether to auto-extend the session on activity (default: true)
   * @param autoExtendSeconds - Seconds to extend if auto-extend is enabled (default: 1800)
   * @throws {Error} If session is not active or already expired
   */
  updateActivity(autoExtend: boolean = true, autoExtendSeconds: number = 1800): void {
    if (this._status === 'REVOKED') {
      throw new Error('Cannot update activity for a revoked session');
    }

    if (this._status === 'EXPIRED') {
      throw new Error('Cannot update activity for an expired session');
    }

    if (this._status !== 'ACTIVE') {
      throw new Error(`Cannot update activity for a session with status: ${this._status}`);
    }

    if (this.isExpired()) {
      this._status = 'EXPIRED';
      throw new Error('Session has expired');
    }

    // Update last activity
    this._lastActivityAt = new Date();

    // Auto-extend if enabled
    if (autoExtend) {
      // Check if session is close to expiry (within 5 minutes)
      const timeToExpiry = this._expiresAt.getTime() - this._lastActivityAt.getTime();
      const thresholdMs = 5 * 60 * 1000; // 5 minutes

      if (timeToExpiry <= thresholdMs) {
        // Extend the session
        const newExpiry = new Date(this._expiresAt.getTime() + autoExtendSeconds * 1000);
        this._expiresAt = newExpiry;
        this._extensionCount += 1;
      }
    }

    this.touch();
  }

  /**
   * Refresh the session tokens
   * Updates the access token and optionally the refresh token
   * @param newToken - New access token
   * @param newRefreshToken - New refresh token (optional, for rotation)
   * @throws {Error} If session is not active or already expired
   */
  refreshTokens(newToken: Token, newRefreshToken?: Token): void {
    if (this._status === 'REVOKED') {
      throw new Error('Cannot refresh tokens for a revoked session');
    }

    if (this._status === 'EXPIRED') {
      throw new Error('Cannot refresh tokens for an expired session');
    }

    if (this._status !== 'ACTIVE') {
      throw new Error(`Cannot refresh tokens for a session with status: ${this._status}`);
    }

    if (this.isExpired()) {
      this._status = 'EXPIRED';
      throw new Error('Session has expired');
    }

    if (!newToken || !(newToken instanceof Token)) {
      throw new Error('Valid new token is required');
    }

    this._token = newToken;

    if (newRefreshToken) {
      if (!(newRefreshToken instanceof Token)) {
        throw new Error('Valid new refresh token is required');
      }
      this._refreshToken = newRefreshToken;
    }

    this.touch();
  }

  /**
   * Get the time remaining until expiry in seconds
   * @returns Number of seconds remaining
   */
  getTimeRemainingSeconds(): number {
    const now = Date.now();
    const expiry = this._expiresAt.getTime();
    const remaining = Math.floor((expiry - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get the session age in seconds
   * @returns Number of seconds since session creation
   */
  getAgeSeconds(): number {
    const now = Date.now();
    const created = this.createdAt.getTime();
    return Math.floor((now - created) / 1000);
  }

  /**
   * Get the session idle time in seconds
   * @returns Number of seconds since last activity
   */
  getIdleSeconds(): number {
    const now = Date.now();
    const lastActivity = this._lastActivityAt.getTime();
    return Math.floor((now - lastActivity) / 1000);
  }

  /**
   * Check if the session is from the same device as another session
   * @param other - Another session to compare
   * @returns True if device IDs match
   */
  isSameDevice(other: Session): boolean {
    if (!other || !(other instanceof Session)) {
      return false;
    }

    return this._deviceInfo.deviceId.equals(other._deviceInfo.deviceId);
  }

  /**
   * Check if the session is from the same IP as another session
   * @param other - Another session to compare
   * @returns True if IP addresses match
   */
  isSameIP(other: Session): boolean {
    if (!other || !(other instanceof Session)) {
      return false;
    }

    return this._ipAddress.equals(other._ipAddress);
  }

  /**
   * Get a summary of the session information
   */
  getSummary(): {
    id: string;
    userId: string;
    status: SessionStatus;
    device: {
      type: string;
      name?: string;
      os: string;
      browser: string;
    };
    ipAddress: string;
    lastActivityAt: Date;
    expiresAt: Date;
    timeRemainingSeconds: number;
    ageSeconds: number;
    idleSeconds: number;
    extensionCount: number;
    isExpired: boolean;
    isRevoked: boolean;
    isValid: boolean;
  } {
    return {
      id: this.id,
      userId: this._userId,
      status: this._status,
      device: {
        type: this._deviceInfo.deviceType,
        name: this._deviceInfo.deviceName,
        os: `${this._deviceInfo.osName} ${this._deviceInfo.osVersion}`.trim(),
        browser: `${this._deviceInfo.browserName} ${this._deviceInfo.browserVersion}`.trim(),
      },
      ipAddress: this._ipAddress.getValue(),
      lastActivityAt: this._lastActivityAt,
      expiresAt: this._expiresAt,
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      idleSeconds: this.getIdleSeconds(),
      extensionCount: this._extensionCount,
      isExpired: this.isExpired(),
      isRevoked: this.isRevoked(),
      isValid: this.isValid(),
    };
  }

  /**
   * Check if two Session entities are equal (compare by id)
   */
  equals(other: Session | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Session)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Create a deep clone of the Session entity
   */
  clone(): Session {
    return new Session(
      this.id,
      this._userId,
      this._token,
      this._refreshToken,
      {
        deviceId: this._deviceInfo.deviceId,
        deviceType: this._deviceInfo.deviceType,
        deviceName: this._deviceInfo.deviceName,
        osName: this._deviceInfo.osName,
        osVersion: this._deviceInfo.osVersion,
        browserName: this._deviceInfo.browserName,
        browserVersion: this._deviceInfo.browserVersion,
      },
      this._ipAddress,
      this._userAgent,
      new Date(this._expiresAt),
      new Date(this._lastActivityAt),
      this._status,
      this._extensionCount,
      this._revokedAt ? new Date(this._revokedAt) : undefined,
      this._revokedReason,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
