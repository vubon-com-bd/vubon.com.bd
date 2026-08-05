import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';
import { Token } from '../value-objects';

/**
 * Password reset status types
 */
export type PasswordResetStatus = 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'FAILED';

/**
 * Password Reset Entity
 * Represents a password reset request for a user
 * Manages reset tokens, status tracking, and expiry
 */
export class PasswordReset extends BaseEntity {
  private _userId: string;
  private _email: string;
  private _token: Token;
  private _status: PasswordResetStatus;
  private _expiresAt: Date;
  private _resetAt?: Date;
  private _attempts: number;
  private _lastAttemptAt?: Date;
  private _requestIpAddress: string;
  private _resetIpAddress?: string;
  private _requestUserAgent: string;
  private _resetUserAgent?: string;
  private _errorMessage?: string;

  private constructor(
    id: string,
    userId: string,
    email: string,
    token: Token,
    status: PasswordResetStatus,
    expiresAt: Date,
    attempts: number,
    requestIpAddress: string,
    requestUserAgent: string,
    resetAt?: Date,
    resetIpAddress?: string,
    resetUserAgent?: string,
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
    this._resetAt = resetAt;
    this._attempts = attempts;
    this._lastAttemptAt = lastAttemptAt;
    this._requestIpAddress = requestIpAddress;
    this._resetIpAddress = resetIpAddress;
    this._requestUserAgent = requestUserAgent;
    this._resetUserAgent = resetUserAgent;
    this._errorMessage = errorMessage;
  }

  /**
   * Static factory method to create a new password reset request
   */
  static create(
    userId: string,
    email: string,
    token: Token,
    requestIpAddress: string,
    requestUserAgent: string,
    expiresInMinutes: number = 30
  ): PasswordReset {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    if (!token || !(token instanceof Token)) {
      throw new Error('Valid token is required');
    }

    if (!requestIpAddress || typeof requestIpAddress !== 'string') {
      throw new Error('Request IP address is required');
    }

    if (!requestUserAgent || typeof requestUserAgent !== 'string') {
      throw new Error('Request user agent is required');
    }

    if (expiresInMinutes <= 0) {
      throw new Error('Expiry time must be greater than 0');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInMinutes * 60 * 1000);

    return new PasswordReset(
      randomUUID(),
      userId,
      email.trim().toLowerCase(),
      token,
      'PENDING',
      expiresAt,
      0,
      requestIpAddress,
      requestUserAgent
    );
  }

  /**
   * Reconstruct a PasswordReset entity from persistence
   */
  static reconstitute(
    id: string,
    userId: string,
    email: string,
    token: Token,
    status: PasswordResetStatus,
    expiresAt: Date,
    attempts: number,
    requestIpAddress: string,
    requestUserAgent: string,
    resetAt?: Date,
    resetIpAddress?: string,
    resetUserAgent?: string,
    lastAttemptAt?: Date,
    errorMessage?: string,
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
      attempts,
      requestIpAddress,
      requestUserAgent,
      resetAt,
      resetIpAddress,
      resetUserAgent,
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

  get status(): PasswordResetStatus {
    return this._status;
  }

  get expiresAt(): Date {
    return new Date(this._expiresAt);
  }

  get resetAt(): Date | undefined {
    return this._resetAt ? new Date(this._resetAt) : undefined;
  }

  get attempts(): number {
    return this._attempts;
  }

  get lastAttemptAt(): Date | undefined {
    return this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined;
  }

  get requestIpAddress(): string {
    return this._requestIpAddress;
  }

  get resetIpAddress(): string | undefined {
    return this._resetIpAddress;
  }

  get requestUserAgent(): string {
    return this._requestUserAgent;
  }

  get resetUserAgent(): string | undefined {
    return this._resetUserAgent;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  get isCompleted(): boolean {
    return this._status === 'COMPLETED';
  }

  get isPending(): boolean {
    return this._status === 'PENDING';
  }

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
   * Complete the password reset with the provided token
   */
  complete(tokenValue: string, resetIpAddress: string, resetUserAgent: string): boolean {
    if (this._status === 'COMPLETED') {
      throw new Error('Password reset has already been completed');
    }

    if (this.isExpired()) {
      this._status = 'EXPIRED';
      this.touch();
      throw new Error('Password reset token has expired');
    }

    if (this._token.getValue() !== tokenValue) {
      this._attempts += 1;
      this._lastAttemptAt = new Date();
      this.touch();

      if (this._attempts >= 5) {
        this._status = 'FAILED';
        this._errorMessage = 'Too many reset attempts';
        this.touch();
        throw new Error('Too many reset attempts');
      }

      throw new Error('Invalid password reset token');
    }

    this._status = 'COMPLETED';
    this._resetAt = new Date();
    this._resetIpAddress = resetIpAddress;
    this._resetUserAgent = resetUserAgent;
    this._lastAttemptAt = new Date();
    this.touch();

    return true;
  }

  /**
   * Mark the password reset as failed
   */
  markFailed(reason?: string): void {
    if (this._status === 'COMPLETED') {
      return;
    }

    this._status = 'FAILED';
    this._errorMessage = reason || 'Password reset failed';
    this.touch();
  }

  /**
   * Increment the attempt counter
   */
  incrementAttempts(): void {
    if (this._status === 'COMPLETED') {
      return;
    }

    this._attempts += 1;
    this._lastAttemptAt = new Date();

    if (this._attempts >= 5) {
      this._status = 'FAILED';
      this._errorMessage = 'Too many reset attempts';
    }

    this.touch();
  }

  /**
   * Reset the password reset request (for resending)
   */
  reset(newToken?: Token, expiresInMinutes: number = 30): void {
    if (this._status === 'COMPLETED') {
      throw new Error('Cannot reset a completed password reset');
    }

    this._status = 'PENDING';
    this._attempts = 0;
    this._lastAttemptAt = undefined;
    this._errorMessage = undefined;
    this._resetAt = undefined;
    this._resetIpAddress = undefined;
    this._resetUserAgent = undefined;

    if (newToken) {
      if (!(newToken instanceof Token)) {
        throw new Error('Valid token is required');
      }
      this._token = newToken;
    }

    const now = new Date();
    this._expiresAt = new Date(now.getTime() + expiresInMinutes * 60 * 1000);

    this.touch();
  }

  /**
   * Get the time remaining until expiry in seconds
   */
  getTimeRemainingSeconds(): number {
    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();
    const remaining = Math.floor((expiryTime - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get a summary of the password reset
   */
  getSummary(): {
    id: string;
    userId: string;
    email: string;
    status: PasswordResetStatus;
    isCompleted: boolean;
    isPending: boolean;
    isExpired: boolean;
    expiresAt: Date;
    resetAt?: Date;
    attempts: number;
    lastAttemptAt?: Date;
    requestIpAddress: string;
    resetIpAddress?: string;
    requestUserAgent: string;
    resetUserAgent?: string;
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
      isCompleted: this.isCompleted,
      isPending: this.isPending,
      isExpired: this.isExpired(),
      expiresAt: this._expiresAt,
      resetAt: this._resetAt,
      attempts: this._attempts,
      lastAttemptAt: this._lastAttemptAt,
      requestIpAddress: this._requestIpAddress,
      resetIpAddress: this._resetIpAddress,
      requestUserAgent: this._requestUserAgent,
      resetUserAgent: this._resetUserAgent,
      errorMessage: this._errorMessage,
      timeRemainingSeconds: this.getTimeRemainingSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Check if two PasswordReset entities are equal (compare by id)
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
   * Create a deep clone of the PasswordReset entity
   */
  clone(): PasswordReset {
    return new PasswordReset(
      this.id,
      this._userId,
      this._email,
      this._token,
      this._status,
      new Date(this._expiresAt),
      this._attempts,
      this._requestIpAddress,
      this._requestUserAgent,
      this._resetAt ? new Date(this._resetAt) : undefined,
      this._resetIpAddress,
      this._resetUserAgent,
      this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined,
      this._errorMessage,
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
