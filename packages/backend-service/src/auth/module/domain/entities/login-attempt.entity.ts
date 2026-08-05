import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { IpAddress, UserAgent } from '../value-objects';

/**
 * Login attempt status types
 */
export type LoginAttemptStatus = 'SUCCESS' | 'FAILED' | 'LOCKED' | 'RATE_LIMITED';

/**
 * Login failure reason types
 */
export type LoginFailureReason =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'RATE_LIMITED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_DEACTIVATED'
  | 'EMAIL_NOT_VERIFIED'
  | 'MFA_REQUIRED'
  | 'MFA_FAILED'
  | 'IP_BLOCKED'
  | 'DEVICE_UNTRUSTED'
  | 'PASSWORD_EXPIRED'
  | 'TOO_MANY_ATTEMPTS'
  | 'SESSION_LIMIT_EXCEEDED'
  | 'MAINTENANCE_MODE'
  | 'UNKNOWN_ERROR';

/**
 * Login Attempt Entity
 * Represents a single login attempt (successful or failed)
 * Used for security auditing and account lock calculations
 */
export class LoginAttempt extends BaseEntity {
  private _userId: string | null;
  private _email: string;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _status: LoginAttemptStatus;
  private _failureReason?: LoginFailureReason;
  private _attemptedAt: Date;
  private _sessionId?: string;
  private _isSuccessful: boolean;
  private _isMfaRequired: boolean;
  private _isMfaVerified: boolean;

  private constructor(
    id: string,
    userId: string | null,
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    status: LoginAttemptStatus,
    attemptedAt: Date,
    isSuccessful: boolean,
    failureReason?: LoginFailureReason,
    sessionId?: string,
    isMfaRequired?: boolean,
    isMfaVerified?: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._email = email;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._status = status;
    this._failureReason = failureReason;
    this._attemptedAt = attemptedAt;
    this._sessionId = sessionId;
    this._isSuccessful = isSuccessful;
    this._isMfaRequired = isMfaRequired || false;
    this._isMfaVerified = isMfaVerified || false;
  }

  /**
   * Static factory method to create a new login attempt
   */
  static create(
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    userId: string | null = null
  ): LoginAttempt {
    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    if (!ipAddress || !(ipAddress instanceof IpAddress)) {
      throw new Error('Valid IP address is required');
    }

    if (!userAgent || !(userAgent instanceof UserAgent)) {
      throw new Error('Valid user agent is required');
    }

    const now = new Date();

    return new LoginAttempt(
      randomUUID(),
      userId,
      email.trim().toLowerCase(),
      ipAddress,
      userAgent,
      'FAILED',
      now,
      false
    );
  }

  /**
   * Reconstruct a LoginAttempt entity from persistence
   */
  static reconstitute(
    id: string,
    userId: string | null,
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    status: LoginAttemptStatus,
    attemptedAt: Date,
    isSuccessful: boolean,
    failureReason?: LoginFailureReason,
    sessionId?: string,
    isMfaRequired?: boolean,
    isMfaVerified?: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ): LoginAttempt {
    return new LoginAttempt(
      id,
      userId,
      email,
      ipAddress,
      userAgent,
      status,
      attemptedAt,
      isSuccessful,
      failureReason,
      sessionId,
      isMfaRequired,
      isMfaVerified,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get userId(): string | null {
    return this._userId;
  }

  get email(): string {
    return this._email;
  }

  get ipAddress(): IpAddress {
    return this._ipAddress;
  }

  get userAgent(): UserAgent {
    return this._userAgent;
  }

  get status(): LoginAttemptStatus {
    return this._status;
  }

  get failureReason(): LoginFailureReason | undefined {
    return this._failureReason;
  }

  get attemptedAt(): Date {
    return new Date(this._attemptedAt);
  }

  get sessionId(): string | undefined {
    return this._sessionId;
  }

  get isSuccessful(): boolean {
    return this._isSuccessful;
  }

  get isFailed(): boolean {
    return !this._isSuccessful && this._status === 'FAILED';
  }

  get isLocked(): boolean {
    return this._status === 'LOCKED';
  }

  get isRateLimited(): boolean {
    return this._status === 'RATE_LIMITED';
  }

  get isMfaRequired(): boolean {
    return this._isMfaRequired;
  }

  get isMfaVerified(): boolean {
    return this._isMfaVerified;
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Mark the login attempt as successful
   */
  markSuccess(sessionId: string, mfaRequired: boolean = false, mfaVerified: boolean = false): void {
    if (this._isSuccessful) {
      return;
    }

    this._status = 'SUCCESS';
    this._isSuccessful = true;
    this._sessionId = sessionId;
    this._isMfaRequired = mfaRequired;
    this._isMfaVerified = mfaVerified;
    this._failureReason = undefined;

    this.touch();
  }

  /**
   * Mark the login attempt as failed
   */
  markFailed(reason: LoginFailureReason): void {
    if (this._isSuccessful) {
      throw new Error('Cannot mark a successful login as failed');
    }

    this._status = 'FAILED';
    this._failureReason = reason;

    this.touch();
  }

  /**
   * Mark the login attempt as locked
   */
  markLocked(reason?: LoginFailureReason): void {
    if (this._isSuccessful) {
      throw new Error('Cannot mark a successful login as locked');
    }

    this._status = 'LOCKED';
    this._failureReason = reason || 'ACCOUNT_LOCKED';

    this.touch();
  }

  /**
   * Mark the login attempt as rate limited
   */
  markRateLimited(reason?: LoginFailureReason): void {
    if (this._isSuccessful) {
      throw new Error('Cannot mark a successful login as rate limited');
    }

    this._status = 'RATE_LIMITED';
    this._failureReason = reason || 'RATE_LIMITED';

    this.touch();
  }

  /**
   * Set MFA verification status
   */
  setMfaVerification(mfaVerified: boolean): void {
    this._isMfaVerified = mfaVerified;
    this.touch();
  }

  /**
   * Set MFA requirement
   */
  setMfaRequired(mfaRequired: boolean): void {
    this._isMfaRequired = mfaRequired;
    this.touch();
  }

  /**
   * Get a summary of the login attempt
   */
  getSummary(): {
    id: string;
    userId: string | null;
    email: string;
    ipAddress: string;
    userAgent: {
      browser: string;
      os: string;
      deviceType: string;
      isBot: boolean;
    };
    status: LoginAttemptStatus;
    failureReason?: LoginFailureReason;
    attemptedAt: Date;
    sessionId?: string;
    isSuccessful: boolean;
    isFailed: boolean;
    isLocked: boolean;
    isRateLimited: boolean;
    isMfaRequired: boolean;
    isMfaVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      email: this._email,
      ipAddress: this._ipAddress.getValue(),
      userAgent: {
        browser: this._userAgent.getBrowser(),
        os: this._userAgent.getOS(),
        deviceType: this._userAgent.getDeviceType(),
        isBot: this._userAgent.isBot(),
      },
      status: this._status,
      failureReason: this._failureReason,
      attemptedAt: this._attemptedAt,
      sessionId: this._sessionId,
      isSuccessful: this._isSuccessful,
      isFailed: this.isFailed,
      isLocked: this.isLocked,
      isRateLimited: this.isRateLimited,
      isMfaRequired: this._isMfaRequired,
      isMfaVerified: this._isMfaVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two LoginAttempt entities are equal (compare by id)
   */
  equals(other: LoginAttempt | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof LoginAttempt)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Create a deep clone of the LoginAttempt entity
   */
  clone(): LoginAttempt {
    return new LoginAttempt(
      this.id,
      this._userId,
      this._email,
      this._ipAddress,
      this._userAgent,
      this._status,
      new Date(this._attemptedAt),
      this._isSuccessful,
      this._failureReason,
      this._sessionId,
      this._isMfaRequired,
      this._isMfaVerified,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
