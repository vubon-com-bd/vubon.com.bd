// packages/backend-service/src/auth/module/domain/entities/password-reset.entity.ts

// ✅ Shared packages
import type { PasswordResetStatus } from '@vubon/shared-types';
import { PASSWORD_RESET_CONFIG } from '@vubon/shared-constants';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { Email } from '../value-objects/email.vo';
import type { Token } from '../value-objects/token.vo';

/**
 * Password Reset Entity
 * Represents a password reset request for a user
 * Tracks the reset token, status, and expiration
 */
export class PasswordReset extends BaseEntity {
  private _userId: UserId;
  private _email: Email;
  private _token: Token;
  private _status: PasswordResetStatus;
  private _expiresAt: Date;
  private _resetAt: Date | null;
  private _attempts: number;
  private _requestIpAddress: string;
  private _resetIpAddress: string | null;
  private _requestUserAgent: string;
  private _resetUserAgent: string | null;

  private constructor(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    status: PasswordResetStatus,
    expiresAt: Date,
    requestIpAddress: string,
    requestUserAgent: string,
    resetAt: Date | null = null,
    resetIpAddress: string | null = null,
    resetUserAgent: string | null = null,
    attempts: number = 0,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._email = email;
    this._token = token;
    this._status = status;
    this._expiresAt = expiresAt;
    this._resetAt = resetAt;
    this._attempts = attempts;
    this._requestIpAddress = requestIpAddress;
    this._resetIpAddress = resetIpAddress;
    this._requestUserAgent = requestUserAgent;
    this._resetUserAgent = resetUserAgent;
  }

  /**
   * Create a new password reset request
   */
  static create(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    expiresAt: Date,
    requestIpAddress: string,
    requestUserAgent: string
  ): PasswordReset {
    const now = new Date();
    return new PasswordReset(
      id,
      userId,
      email,
      token,
      'PENDING',
      expiresAt,
      requestIpAddress,
      requestUserAgent,
      null,
      null,
      null,
      0,
      now,
      now
    );
  }

  /**
   * Reconstruct a password reset from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    status: PasswordResetStatus,
    expiresAt: Date,
    requestIpAddress: string,
    requestUserAgent: string,
    resetAt: Date | null = null,
    resetIpAddress: string | null = null,
    resetUserAgent: string | null = null,
    attempts: number = 0,
    createdAt?: Date,
    updatedAt?: Date
  ): PasswordReset {
    return new PasswordReset(
      id,
      userId,
      email,
      token,
      status,
      expiresAt,
      requestIpAddress,
      requestUserAgent,
      resetAt,
      resetIpAddress,
      resetUserAgent,
      attempts,
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

  get email(): Email {
    return this._email;
  }

  get token(): Token {
    return this._token;
  }

  get status(): PasswordResetStatus {
    return this._status;
  }

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get resetAt(): Date | null {
    return this._resetAt ? new Date(this._resetAt) : null;
  }

  get attempts(): number {
    return this._attempts;
  }

  get requestIpAddress(): string {
    return this._requestIpAddress;
  }

  get resetIpAddress(): string | null {
    return this._resetIpAddress;
  }

  get requestUserAgent(): string {
    return this._requestUserAgent;
  }

  get resetUserAgent(): string | null {
    return this._resetUserAgent;
  }

  get isExpired(): boolean {
    return this._expiresAt < new Date();
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  get isCompleted(): boolean {
    return this._status === 'COMPLETED';
  }

  get isFailed(): boolean {
    return this._status === 'FAILED';
  }

  get isCompletable(): boolean {
    return this.isPending && !this.isExpired && !this.isFailed;
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
   * Get the age of the reset request in seconds
   */
  getAgeSeconds(): number {
    return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
  }

  /**
   * Complete the password reset
   */
  complete(resetIpAddress: string, resetUserAgent: string): void {
    if (this.isCompleted) {
      throw new Error('Password reset is already completed');
    }

    if (this.isExpired) {
      throw new Error('Password reset token has expired');
    }

    if (this.isFailed) {
      throw new Error('Password reset has failed. Please request a new reset');
    }

    if (!this.isPending) {
      throw new Error(`Invalid reset status: ${this._status}`);
    }

    if (!resetIpAddress || typeof resetIpAddress !== 'string') {
      throw new Error('Reset IP address is required');
    }

    if (!resetUserAgent || typeof resetUserAgent !== 'string') {
      throw new Error('Reset user agent is required');
    }

    this._status = 'COMPLETED';
    this._resetAt = new Date();
    this._resetIpAddress = resetIpAddress;
    this._resetUserAgent = resetUserAgent;
    this.touch();
  }

  /**
   * Mark the password reset as failed
   */
  fail(): void {
    if (this.isCompleted) {
      throw new Error('Cannot fail a completed password reset');
    }

    if (this.isFailed) {
      throw new Error('Password reset is already failed');
    }

    this._status = 'FAILED';
    this.touch();
  }

  /**
   * Increment the attempt count
   */
  incrementAttempts(): number {
    if (this.isCompleted) {
      throw new Error('Cannot increment attempts for a completed reset');
    }

    if (this.isFailed) {
      throw new Error('Cannot increment attempts for a failed reset');
    }

    this._attempts += 1;

    // Check if max attempts exceeded
    // Using MAX_REQUESTS_PER_DAY as the maximum attempts limit
    const maxAttempts = PASSWORD_RESET_CONFIG.MAX_REQUESTS_PER_DAY || 3;
    if (this._attempts >= maxAttempts) {
      this._status = 'FAILED';
    }

    this.touch();
    return this._attempts;
  }

  /**
   * Reset the password reset with a new token
   */
  reset(newToken: Token, newExpiresAt: Date): PasswordReset {
    if (this.isCompleted) {
      throw new Error('Cannot reset a completed password reset');
    }

    // Create a new reset record
    const now = new Date();
    return new PasswordReset(
      this.id,
      this._userId,
      this._email,
      newToken,
      'PENDING',
      newExpiresAt,
      this._requestIpAddress,
      this._requestUserAgent,
      null,
      null,
      null,
      0,
      now,
      now
    );
  }

  /**
   * Check if the reset can be resent
   */
  canResend(): boolean {
    if (this.isCompleted) {
      return false;
    }

    if (this.isFailed) {
      return false;
    }

    if (this.isExpired) {
      return true;
    }

    // Check cooldown period
    const cooldownMinutes = PASSWORD_RESET_CONFIG.COOLDOWN_MINUTES || 15;
    const cooldownMs = cooldownMinutes * 60 * 1000;
    const timeSinceCreation = Date.now() - this.createdAt.getTime();

    if (timeSinceCreation < cooldownMs) {
      return false;
    }

    return true;
  }

  /**
   * Get time remaining before next resend in seconds
   */
  getResendCooldownSeconds(): number {
    const cooldownMinutes = PASSWORD_RESET_CONFIG.COOLDOWN_MINUTES || 15;
    const cooldownSeconds = cooldownMinutes * 60;
    const timeSinceCreation = (Date.now() - this.createdAt.getTime()) / 1000;
    const remaining = cooldownSeconds - timeSinceCreation;
    return Math.max(0, Math.ceil(remaining));
  }

  /**
   * Get password reset summary
   */
  getSummary(): {
    id: string;
    userId: string;
    email: string;
    status: PasswordResetStatus;
    expiresAt: Date;
    isExpired: boolean;
    isPending: boolean;
    isCompleted: boolean;
    isFailed: boolean;
    resetAt: Date | null;
    attempts: number;
    requestIpAddress: string;
    resetIpAddress: string | null;
    requestUserAgent: string;
    resetUserAgent: string | null;
    remainingSeconds: number;
    ageSeconds: number;
    canResend: boolean;
    resendCooldownSeconds: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      email: this._email.toString(),
      status: this._status,
      expiresAt: this._expiresAt,
      isExpired: this.isExpired,
      isPending: this.isPending,
      isCompleted: this.isCompleted,
      isFailed: this.isFailed,
      resetAt: this._resetAt,
      attempts: this._attempts,
      requestIpAddress: this._requestIpAddress,
      resetIpAddress: this._resetIpAddress,
      requestUserAgent: this._requestUserAgent,
      resetUserAgent: this._resetUserAgent,
      remainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      canResend: this.canResend(),
      resendCooldownSeconds: this.getResendCooldownSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two PasswordReset entities
   */
  equals(other: PasswordReset | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof PasswordReset)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `PasswordReset(id=${this.id}, userId=${this._userId.value}, email=${this._email.toString()}, status=${this._status})`;
  }
}
