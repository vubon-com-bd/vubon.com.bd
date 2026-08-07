import { SessionStatus } from '@vubon/shared-types';
import { SESSION_CONFIG } from '@vubon/shared-constants';
import { BaseEntity } from './base.entity';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { Token } from '../value-objects/token.vo';

/**
 * Session entity represents a user session
 */
export class Session extends BaseEntity {
  private _userId: string;
  private _token: Token;
  private _refreshToken: Token;
  private _deviceId: DeviceId;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _expiresAt: Date;
  private _lastActivityAt: Date;
  private _status: SessionStatus;
  private _revokedAt: Date | null;
  private _revocationReason: string | null;

  private constructor(
    id: string,
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceId: DeviceId,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresAt: Date,
    status: SessionStatus,
    lastActivityAt: Date,
    revokedAt: Date | null = null,
    revocationReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._token = token;
    this._refreshToken = refreshToken;
    this._deviceId = deviceId;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._expiresAt = expiresAt;
    this._lastActivityAt = lastActivityAt;
    this._status = status;
    this._revokedAt = revokedAt;
    this._revocationReason = revocationReason;
  }

  /**
   * Create a new session
   */
  static create(
    id: string,
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceId: DeviceId,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresAt: Date
  ): Session {
    const now = new Date();
    return new Session(
      id,
      userId,
      token,
      refreshToken,
      deviceId,
      ipAddress,
      userAgent,
      expiresAt,
      'ACTIVE',
      now
    );
  }

  /**
   * Reconstruct a session from persistence
   */
  static reconstruct(
    id: string,
    userId: string,
    token: Token,
    refreshToken: Token,
    deviceId: DeviceId,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    expiresAt: Date,
    status: SessionStatus,
    lastActivityAt: Date,
    revokedAt: Date | null = null,
    revocationReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ): Session {
    return new Session(
      id,
      userId,
      token,
      refreshToken,
      deviceId,
      ipAddress,
      userAgent,
      expiresAt,
      status,
      lastActivityAt,
      revokedAt,
      revocationReason,
      createdAt,
      updatedAt
    );
  }

  // Getters
  get userId(): string {
    return this._userId;
  }

  get token(): Token {
    return this._token;
  }

  get refreshToken(): Token {
    return this._refreshToken;
  }

  get deviceId(): DeviceId {
    return this._deviceId;
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

  get revokedAt(): Date | null {
    return this._revokedAt ? new Date(this._revokedAt) : null;
  }

  get revocationReason(): string | null {
    return this._revocationReason;
  }

  get isActive(): boolean {
    return this._status === 'ACTIVE' && !this.isExpired;
  }

  get isExpired(): boolean {
    return this._expiresAt < new Date();
  }

  get isRevoked(): boolean {
    return this._status === 'REVOKED';
  }

  get isSuspended(): boolean {
    return this._status === 'SUSPENDED';
  }

  /**
   * Extend the session expiry time
   */
  extend(additionalSeconds: number = SESSION_CONFIG.IDLE_TIMEOUT_SECONDS): void {
    if (this.isRevoked) {
      throw new Error('Cannot extend a revoked session');
    }

    if (this.isSuspended) {
      throw new Error('Cannot extend a suspended session');
    }

    if (this.isExpired) {
      throw new Error('Cannot extend an expired session');
    }

    const newExpiry = new Date(this._expiresAt.getTime() + additionalSeconds * 1000);
    this._expiresAt = newExpiry;
    this.touch();
  }

  /**
   * Update the last activity time
   */
  updateActivity(): void {
    if (this.isRevoked) {
      throw new Error('Cannot update activity for a revoked session');
    }

    if (this.isSuspended) {
      throw new Error('Cannot update activity for a suspended session');
    }

    if (this.isExpired) {
      throw new Error('Cannot update activity for an expired session');
    }

    this._lastActivityAt = new Date();
    this.touch();
  }

  /**
   * Revoke the session
   */
  revoke(reason: string = 'USER_INITIATED'): void {
    if (this.isRevoked) {
      throw new Error('Session is already revoked');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Revocation reason is required');
    }

    if (reason.length > 500) {
      throw new Error('Revocation reason cannot exceed 500 characters');
    }

    this._status = 'REVOKED';
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
   * Get the idle time in seconds
   */
  getIdleTimeSeconds(): number {
    const now = Date.now();
    const lastActivity = this._lastActivityAt.getTime();
    return Math.floor((now - lastActivity) / 1000);
  }

  /**
   * Get session summary
   */
  getSummary(): {
    id: string;
    userId: string;
    status: SessionStatus;
    deviceInfo: {
      deviceId: string;
      deviceType: string;
      os: string;
      browser: string;
    };
    ipAddress: string;
    userAgent: string;
    expiresAt: Date;
    lastActivityAt: Date;
    remainingSeconds: number;
    idleSeconds: number;
    isActive: boolean;
    isExpired: boolean;
    isRevoked: boolean;
    revokedAt: Date | null;
    revocationReason: string | null;
  } {
    return {
      id: this.id,
      userId: this._userId,
      status: this._status,
      deviceInfo: {
        deviceId: this._deviceId.getValue(),
        deviceType: this._userAgent.getDeviceType(),
        os: this._userAgent.getOS(),
        browser: this._userAgent.getBrowser(),
      },
      ipAddress: this._ipAddress.getValue(),
      userAgent: this._userAgent.getValue(),
      expiresAt: this._expiresAt,
      lastActivityAt: this._lastActivityAt,
      remainingSeconds: this.getTimeRemainingSeconds(),
      idleSeconds: this.getIdleTimeSeconds(),
      isActive: this.isActive,
      isExpired: this.isExpired,
      isRevoked: this.isRevoked,
      revokedAt: this._revokedAt,
      revocationReason: this._revocationReason,
    };
  }

  /**
   * Compare two Session entities
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
}
