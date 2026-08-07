// packages/backend-service/src/auth/module/domain/entities/email-verification.entity.ts

// ✅ Shared packages
import type { EmailVerificationStatus } from '@vubon/shared-types';
import { EMAIL_VERIFICATION_CONFIG } from '@vubon/shared-constants';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { Token } from '../value-objects/token.vo';
import type { Email } from '../value-objects/email.vo';

/**
 * Email Verification Entity
 * Represents an email verification record for a user
 * Tracks the verification status, token, and expiration
 */
export class EmailVerification extends BaseEntity {
  private _userId: UserId;
  private _email: Email;
  private _token: Token;
  private _status: EmailVerificationStatus;
  private _expiresAt: Date;
  private _verifiedAt: Date | null;
  private _attempts: number;
  private _lastAttemptAt: Date | null;

  private constructor(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    status: EmailVerificationStatus,
    expiresAt: Date,
    verifiedAt: Date | null = null,
    attempts: number = 0,
    lastAttemptAt: Date | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._email = email;
    this._token = token;
    this._status = status;
    this._expiresAt = expiresAt;
    this._verifiedAt = verifiedAt;
    this._attempts = attempts;
    this._lastAttemptAt = lastAttemptAt;
  }

  /**
   * Create a new email verification
   */
  static create(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    expiresAt: Date
  ): EmailVerification {
    const now = new Date();
    return new EmailVerification(
      id,
      userId,
      email,
      token,
      'PENDING',
      expiresAt,
      null,
      0,
      null,
      now,
      now
    );
  }

  /**
   * Reconstruct an email verification from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    email: Email,
    token: Token,
    status: EmailVerificationStatus,
    expiresAt: Date,
    verifiedAt: Date | null = null,
    attempts: number = 0,
    lastAttemptAt: Date | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ): EmailVerification {
    return new EmailVerification(
      id,
      userId,
      email,
      token,
      status,
      expiresAt,
      verifiedAt,
      attempts,
      lastAttemptAt,
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

  get status(): EmailVerificationStatus {
    return this._status;
  }

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get verifiedAt(): Date | null {
    return this._verifiedAt ? new Date(this._verifiedAt) : null;
  }

  get attempts(): number {
    return this._attempts;
  }

  get lastAttemptAt(): Date | null {
    return this._lastAttemptAt ? new Date(this._lastAttemptAt) : null;
  }

  get isExpired(): boolean {
    return this._expiresAt < new Date();
  }

  get isVerified(): boolean {
    return this._status === 'VERIFIED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  get isFailed(): boolean {
    return this._status === 'FAILED';
  }

  get isVerifiable(): boolean {
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
   * Get the age of the verification in seconds
   */
  getAgeSeconds(): number {
    return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
  }

  /**
   * Verify the email with the provided token
   */
  verify(): void {
    if (this.isVerified) {
      throw new Error('Email is already verified');
    }

    if (this.isExpired) {
      throw new Error('Verification token has expired');
    }

    if (this.isFailed) {
      throw new Error('Verification has failed. Please request a new verification');
    }

    if (!this.isPending) {
      throw new Error(`Invalid verification status: ${this._status}`);
    }

    this._status = 'VERIFIED';
    this._verifiedAt = new Date();
    this.touch();
  }

  /**
   * Mark the verification as failed
   */
  fail(): void {
    if (this.isVerified) {
      throw new Error('Cannot fail an already verified email');
    }

    if (this.isFailed) {
      throw new Error('Verification is already failed');
    }

    this._status = 'FAILED';
    this.touch();
  }

  /**
   * Increment the attempt count
   */
  incrementAttempts(): number {
    if (this.isVerified) {
      throw new Error('Cannot increment attempts for a verified email');
    }

    if (this.isFailed) {
      throw new Error('Cannot increment attempts for a failed verification');
    }

    this._attempts += 1;
    this._lastAttemptAt = new Date();

    // Check if max attempts exceeded
    // Using MAX_RESEND_ATTEMPTS as the maximum verification attempts
    const maxAttempts = EMAIL_VERIFICATION_CONFIG.MAX_RESEND_ATTEMPTS || 3;
    if (this._attempts >= maxAttempts) {
      this._status = 'FAILED';
    }

    this.touch();
    return this._attempts;
  }

  /**
   * Reset the verification with a new token
   */
  reset(newToken: Token, newExpiresAt: Date): EmailVerification {
    if (this.isVerified) {
      throw new Error('Cannot reset a verified email');
    }

    // Create a new verification record
    const now = new Date();
    return new EmailVerification(
      this.id,
      this._userId,
      this._email,
      newToken,
      'PENDING',
      newExpiresAt,
      null,
      0,
      null,
      now,
      now
    );
  }

  /**
   * Check if the verification can be resent
   */
  canResend(): boolean {
    if (this.isVerified) {
      return false;
    }

    if (this.isFailed) {
      return false;
    }

    if (this.isExpired) {
      return true;
    }

    // Check cooldown period
    const cooldownSeconds = EMAIL_VERIFICATION_CONFIG.RESEND_COOLDOWN_SECONDS || 120;
    if (this._lastAttemptAt) {
      const timeSinceLastAttempt = (Date.now() - this._lastAttemptAt.getTime()) / 1000;
      if (timeSinceLastAttempt < cooldownSeconds) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get time remaining before next resend in seconds
   */
  getResendCooldownSeconds(): number {
    if (!this._lastAttemptAt) {
      return 0;
    }

    const cooldownSeconds = EMAIL_VERIFICATION_CONFIG.RESEND_COOLDOWN_SECONDS || 120;
    const timeSinceLastAttempt = (Date.now() - this._lastAttemptAt.getTime()) / 1000;
    const remaining = cooldownSeconds - timeSinceLastAttempt;
    return Math.max(0, Math.ceil(remaining));
  }

  /**
   * Get verification summary
   */
  getSummary(): {
    id: string;
    userId: string;
    email: string;
    status: EmailVerificationStatus;
    expiresAt: Date;
    isExpired: boolean;
    isVerified: boolean;
    isPending: boolean;
    isFailed: boolean;
    verifiedAt: Date | null;
    attempts: number;
    lastAttemptAt: Date | null;
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
      isVerified: this.isVerified,
      isPending: this.isPending,
      isFailed: this.isFailed,
      verifiedAt: this._verifiedAt,
      attempts: this._attempts,
      lastAttemptAt: this._lastAttemptAt,
      remainingSeconds: this.getTimeRemainingSeconds(),
      ageSeconds: this.getAgeSeconds(),
      canResend: this.canResend(),
      resendCooldownSeconds: this.getResendCooldownSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two EmailVerification entities
   */
  equals(other: EmailVerification | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof EmailVerification)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `EmailVerification(id=${this.id}, userId=${this._userId.value}, email=${this._email.toString()}, status=${this._status})`;
  }
}
