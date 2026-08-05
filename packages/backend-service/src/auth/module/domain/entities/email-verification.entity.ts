// packages/backend-service/src/auth/module/domain/entities/email-verification.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { Token } from '../value-objects';

/**
 * Email verification status types
 */
export type EmailVerificationStatus = 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'FAILED';

/**
 * Email Verification Entity
 * Represents an email verification request for a user
 * Manages verification tokens, status tracking, and expiry
 */
export class EmailVerification extends BaseEntity {
  private _userId: string;
  private _email: string;
  private _token: Token;
  private _status: EmailVerificationStatus;
  private _expiresAt: Date;
  private _verifiedAt?: Date;
  private _attempts: number;
  private _lastAttemptAt?: Date;
  private _errorMessage?: string;

  private constructor(
    id: string,
    userId: string,
    email: string,
    token: Token,
    status: EmailVerificationStatus,
    expiresAt: Date,
    attempts: number,
    verifiedAt?: Date,
    lastAttemptAt?: Date,
    errorMessage?: string,
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
    this._errorMessage = errorMessage;
  }

  /**
   * Static factory method to create a new email verification
   * @param userId - ID of the user
   * @param email - Email address to verify
   * @param token - Validated verification token
   * @param expiresInHours - Token expiry in hours (default: 24)
   * @returns A new EmailVerification entity with PENDING status
   */
  static create(
    userId: string,
    email: string,
    token: Token,
    expiresInHours: number = 24
  ): EmailVerification {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    if (!token || !(token instanceof Token)) {
      throw new Error('Valid token is required');
    }

    if (expiresInHours <= 0) {
      throw new Error('Expiry time must be greater than 0');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000);

    return new EmailVerification(
      randomUUID(),
      userId,
      email.trim().toLowerCase(),
      token,
      'PENDING',
      expiresAt,
      0
    );
  }

  /**
   * Reconstruct an EmailVerification entity from persistence
   * Used by repositories to hydrate entities
   */
  static reconstitute(
    id: string,
    userId: string,
    email: string,
    token: Token,
    status: EmailVerificationStatus,
    expiresAt: Date,
    attempts: number,
    verifiedAt?: Date,
    lastAttemptAt?: Date,
    errorMessage?: string,
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
      attempts,
      verifiedAt,
      lastAttemptAt,
      errorMessage,
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

  get email(): string {
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

  get verifiedAt(): Date | undefined {
    return this._verifiedAt ? new Date(this._verifiedAt) : undefined;
  }

  get attempts(): number {
    return this._attempts;
  }

  get lastAttemptAt(): Date | undefined {
    return this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  get isVerified(): boolean {
    return this._status === 'VERIFIED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

  /**
   * Check if the verification is expired
   * Returns true if status is EXPIRED or current time is past expiry
   */
  isExpired(): boolean {
    if (this._status === 'EXPIRED') {
      return true;
    }

    return new Date() > this._expiresAt;
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Verify the email with the provided token
   * @param tokenValue - The token string to verify
   * @returns True if verification was successful
   * @throws {Error} If verification fails or is invalid
   */
  verify(tokenValue: string): boolean {
    // Check if already verified
    if (this._status === 'VERIFIED') {
      throw new Error('Email is already verified');
    }

    // Check if expired
    if (this.isExpired()) {
      this._status = 'EXPIRED';
      this.touch();
      throw new Error('Verification token has expired');
    }

    // Check if token matches
    if (this._token.getValue() !== tokenValue) {
      this._attempts += 1;
      this._lastAttemptAt = new Date();
      this.touch();

      if (this._attempts >= 5) {
        this._status = 'FAILED';
        this._errorMessage = 'Too many verification attempts';
        this.touch();
        throw new Error('Too many verification attempts');
      }

      throw new Error('Invalid verification token');
    }

    // Successful verification
    this._status = 'VERIFIED';
    this._verifiedAt = new Date();
    this._lastAttemptAt = new Date();
    this.touch();

    return true;
  }

  /**
   * Mark the verification as failed
   * @param reason - Reason for failure (optional)
   */
  markFailed(reason?: string): void {
    if (this._status === 'VERIFIED') {
      return; // Already verified, don't change status
    }

    this._status = 'FAILED';
    this._errorMessage = reason || 'Verification failed';
    this.touch();
  }

  /**
   * Increment the attempt counter
   * @throws {Error} If max attempts (5) is exceeded
   */
  incrementAttempts(): void {
    if (this._status === 'VERIFIED') {
      return;
    }

    this._attempts += 1;
    this._lastAttemptAt = new Date();

    if (this._attempts >= 5) {
      this._status = 'FAILED';
      this._errorMessage = 'Too many verification attempts';
    }

    this.touch();
  }

  /**
   * Reset the verification (for resending)
   * @param newToken - New verification token (optional)
   * @param expiresInHours - New expiry in hours (default: 24)
   * @throws {Error} If already verified
   */
  reset(newToken?: Token, expiresInHours: number = 24): void {
    if (this._status === 'VERIFIED') {
      throw new Error('Cannot reset a verified email');
    }

    // Reset to pending state
    this._status = 'PENDING';
    this._attempts = 0;
    this._lastAttemptAt = undefined;
    this._errorMessage = undefined;

    // Update token if provided
    if (newToken) {
      if (!(newToken instanceof Token)) {
        throw new Error('Valid token is required');
      }
      this._token = newToken;
    }

    // Update expiry
    const now = new Date();
    this._expiresAt = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000);

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
   * Get a summary of the email verification
   */
  getSummary(): {
    id: string;
    userId: string;
    email: string;
    status: EmailVerificationStatus;
    isVerified: boolean;
    isPending: boolean;
    isExpired: boolean;
    expiresAt: Date;
    verifiedAt?: Date;
    attempts: number;
    lastAttemptAt?: Date;
    errorMessage?: string;
    timeRemainingSeconds: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      email: this._email,
      status: this._status,
      isVerified: this.isVerified,
      isPending: this.isPending,
      isExpired: this.isExpired(),
      expiresAt: this._expiresAt,
      verifiedAt: this._verifiedAt,
      attempts: this._attempts,
      lastAttemptAt: this._lastAttemptAt,
      errorMessage: this._errorMessage,
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two EmailVerification entities are equal (compare by id)
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
   * Create a deep clone of the EmailVerification entity
   */
  clone(): EmailVerification {
    return new EmailVerification(
      this.id,
      this._userId,
      this._email,
      this._token,
      this._status,
      new Date(this._expiresAt),
      this._attempts,
      this._verifiedAt ? new Date(this._verifiedAt) : undefined,
      this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined,
      this._errorMessage,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
