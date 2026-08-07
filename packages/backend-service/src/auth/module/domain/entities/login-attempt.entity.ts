// packages/backend-service/src/auth/module/domain/entities/login-attempt.entity.ts

// ✅ Shared packages
import type { LoginAttemptStatus } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { IpAddress } from '../value-objects/ip-address.vo';
import type { UserAgent } from '../value-objects/user-agent.vo';

/**
 * Login Attempt Entity
 * Represents a single login attempt by a user
 * Tracks authentication attempts for security monitoring and lockout policies
 */
export class LoginAttempt extends BaseEntity {
  private _userId: UserId | null;
  private _email: string;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _status: LoginAttemptStatus;
  private _failureReason: string | null;
  private _attemptedAt: Date;
  private _mfaRequired: boolean;
  private _mfaVerified: boolean;

  private constructor(
    id: string,
    userId: UserId | null,
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    status: LoginAttemptStatus,
    attemptedAt: Date,
    failureReason: string | null = null,
    mfaRequired: boolean = false,
    mfaVerified: boolean = false,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._email = email;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._status = status;
    this._attemptedAt = attemptedAt;
    this._failureReason = failureReason;
    this._mfaRequired = mfaRequired;
    this._mfaVerified = mfaVerified;
  }

  /**
   * Create a new login attempt
   */
  static create(
    id: string,
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    status: LoginAttemptStatus = 'PENDING',
    userId: UserId | null = null,
    failureReason: string | null = null,
    mfaRequired: boolean = false
  ): LoginAttempt {
    const now = new Date();
    return new LoginAttempt(
      id,
      userId,
      email,
      ipAddress,
      userAgent,
      status,
      now,
      failureReason,
      mfaRequired,
      false,
      now,
      now
    );
  }

  /**
   * Reconstruct a login attempt from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId | null,
    email: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    status: LoginAttemptStatus,
    attemptedAt: Date,
    failureReason: string | null = null,
    mfaRequired: boolean = false,
    mfaVerified: boolean = false,
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
      failureReason,
      mfaRequired,
      mfaVerified,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get userId(): UserId | null {
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

  get attemptedAt(): Date {
    return new Date(this._attemptedAt);
  }

  get failureReason(): string | null {
    return this._failureReason;
  }

  get mfaRequired(): boolean {
    return this._mfaRequired;
  }

  get mfaVerified(): boolean {
    return this._mfaVerified;
  }

  get isSuccess(): boolean {
    return this._status === 'SUCCESS';
  }

  get isFailure(): boolean {
    return this._status === 'FAILURE';
  }

  get isLocked(): boolean {
    return this._status === 'LOCKED';
  }

  get isRateLimited(): boolean {
    return this._status === 'RATE_LIMITED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  /**
   * Mark the login attempt as successful
   */
  markSuccess(userId: UserId): void {
    if (this.isSuccess) {
      throw new Error('Login attempt is already marked as success');
    }

    if (this.isLocked) {
      throw new Error('Cannot mark a locked login attempt as success');
    }

    if (this.isRateLimited) {
      throw new Error('Cannot mark a rate-limited login attempt as success');
    }

    this._userId = userId;
    this._status = 'SUCCESS';
    this._failureReason = null;
    this.touch();
  }

  /**
   * Mark the login attempt as failed
   */
  markFailure(reason: string): void {
    if (this.isSuccess) {
      throw new Error('Cannot mark a successful login attempt as failure');
    }

    if (this.isLocked) {
      throw new Error('Cannot mark a locked login attempt as failure');
    }

    if (this.isRateLimited) {
      throw new Error('Cannot mark a rate-limited login attempt as failure');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Failure reason is required');
    }

    if (reason.length > 500) {
      throw new Error('Failure reason cannot exceed 500 characters');
    }

    this._status = 'FAILURE';
    this._failureReason = reason;
    this.touch();
  }

  /**
   * Mark the login attempt as locked
   */
  markLocked(reason: string = 'ACCOUNT_LOCKED'): void {
    if (this.isSuccess) {
      throw new Error('Cannot mark a successful login attempt as locked');
    }

    if (this.isLocked) {
      throw new Error('Login attempt is already locked');
    }

    if (this.isRateLimited) {
      throw new Error('Cannot mark a rate-limited login attempt as locked');
    }

    this._status = 'LOCKED';
    this._failureReason = reason;
    this.touch();
  }

  /**
   * Mark the login attempt as rate-limited
   */
  markRateLimited(reason: string = 'RATE_LIMITED'): void {
    if (this.isSuccess) {
      throw new Error('Cannot mark a successful login attempt as rate-limited');
    }

    if (this.isLocked) {
      throw new Error('Cannot mark a locked login attempt as rate-limited');
    }

    if (this.isRateLimited) {
      throw new Error('Login attempt is already rate-limited');
    }

    this._status = 'RATE_LIMITED';
    this._failureReason = reason;
    this.touch();
  }

  /**
   * Mark MFA as verified for this attempt
   */
  markMfaVerified(): void {
    if (!this.isSuccess) {
      throw new Error('Cannot mark MFA as verified for a non-successful attempt');
    }

    if (this._mfaVerified) {
      throw new Error('MFA is already verified for this attempt');
    }

    this._mfaVerified = true;
    this.touch();
  }

  /**
   * Get the status label
   */
  getStatusLabel(): string {
    const statusLabels: Record<LoginAttemptStatus, string> = {
      PENDING: 'Pending',
      SUCCESS: 'Successful',
      FAILURE: 'Failed',
      LOCKED: 'Locked',
      RATE_LIMITED: 'Rate Limited',
    };
    return statusLabels[this._status] || this._status;
  }

  /**
   * Check if the attempt was made within a specific time window
   */
  isWithinTimeWindow(seconds: number): boolean {
    if (seconds <= 0) {
      throw new Error('Time window must be greater than 0 seconds');
    }

    const now = Date.now();
    const attemptTime = this._attemptedAt.getTime();
    const timeDiff = (now - attemptTime) / 1000;
    return timeDiff <= seconds;
  }

  /**
   * Get the age of the attempt in seconds
   */
  getAgeSeconds(): number {
    return Math.floor((Date.now() - this._attemptedAt.getTime()) / 1000);
  }

  /**
   * Get login attempt summary
   */
  getSummary(): {
    id: string;
    userId: string | null;
    email: string;
    status: LoginAttemptStatus;
    statusLabel: string;
    ipAddress: string;
    userAgent: string;
    attemptedAt: Date;
    failureReason: string | null;
    mfaRequired: boolean;
    mfaVerified: boolean;
    isSuccess: boolean;
    isFailure: boolean;
    isLocked: boolean;
    isRateLimited: boolean;
    isPending: boolean;
    ageSeconds: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId ? this._userId.value : null,
      email: this._email,
      status: this._status,
      statusLabel: this.getStatusLabel(),
      ipAddress: this._ipAddress.getValue(),
      userAgent: this._userAgent.getValue(),
      attemptedAt: this._attemptedAt,
      failureReason: this._failureReason,
      mfaRequired: this._mfaRequired,
      mfaVerified: this._mfaVerified,
      isSuccess: this.isSuccess,
      isFailure: this.isFailure,
      isLocked: this.isLocked,
      isRateLimited: this.isRateLimited,
      isPending: this.isPending,
      ageSeconds: this.getAgeSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two LoginAttempt entities
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
   * Get string representation
   */
  toString(): string {
    return `LoginAttempt(id=${this.id}, email=${this._email}, status=${this._status}, attemptedAt=${this._attemptedAt.toISOString()})`;
  }
}
