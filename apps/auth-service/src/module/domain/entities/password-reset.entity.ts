/**
 * Password Reset Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/password-reset.entity
 * 
 * @description
 * Represents a password reset request with token validation and expiry.
 * Used for secure password recovery workflow.
 * 
 * Enterprise Rules:
 * ✅ 1-hour token expiry (configurable)
 * ✅ Rate limiting on reset requests
 * ✅ Domain events for all state changes
 * ✅ Track request source for security
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - Phone-based password reset support
 * 
 * IMPORTANT: Token validation uses domain Token.equals() method.
 * Actual token signature verification happens in infrastructure.
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Token, TokenType } from '../value-objects/token.vo';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceId } from '../value-objects/device-id.vo';

// ==================== Enums ====================

/**
 * Password reset status enumeration
 */
export enum PasswordResetStatus {
  PENDING = 'PENDING',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

/**
 * Password reset method enumeration
 */
export enum PasswordResetMethod {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',      // Bangladesh specific
  VOICE = 'VOICE',            // Voice call OTP
}

/**
 * Password reset event types
 */
export enum PasswordResetEventType {
  PASSWORD_RESET_CREATED = 'password_reset.created',
  PASSWORD_RESET_COMPLETED = 'password_reset.completed',
  PASSWORD_RESET_EXPIRED = 'password_reset.expired',
  PASSWORD_RESET_CANCELLED = 'password_reset.cancelled',
  PASSWORD_RESET_FAILED = 'password_reset.failed',
  PASSWORD_RESET_REQUESTED = 'password_reset.requested',
}

// ==================== Types ====================

/**
 * Password reset configuration constants
 */
const RESET_CONFIG = {
  EXPIRY_HOURS: 1,
  EXPIRY_MS: 60 * 60 * 1000,      // 1 hour
  MAX_REQUESTS_PER_DAY: 3,
  COOLDOWN_MINUTES: 15,
  COOLDOWN_MS: 15 * 60 * 1000,
  MAX_VERIFICATION_ATTEMPTS: 5,
} as const;

/**
 * Password reset identifier (email or phone)
 */
export type ResetIdentifier = { type: 'email'; value: Email } | { type: 'phone'; value: Phone };

// ==================== Password Reset Entity ====================

/**
 * Password Reset Entity
 * 
 * Manages password reset requests
 */
export class PasswordReset extends BaseEntity {
  private _userId: string;
  private _identifier: ResetIdentifier;
  private _token: Token;
  private _method: PasswordResetMethod;
  private _status: PasswordResetStatus;
  private _expiresAt: Date;
  private _usedAt: Date | undefined;
  private _cancelledAt: Date | undefined;
  private _ipAddress: IpAddress;
  private _userAgent: UserAgent;
  private _deviceId: DeviceId;
  private _requestCount: number;
  private _lastRequestAt: Date | undefined;
  private _verificationAttempts: number;
  private _otpCode?: string;           // For phone-based reset (stored temporarily)

  private constructor(
    id: string,
    userId: string,
    identifier: ResetIdentifier,
    token: Token,
    method: PasswordResetMethod,
    status: PasswordResetStatus,
    expiresAt: Date,
    usedAt: Date | undefined,
    cancelledAt: Date | undefined,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    requestCount: number,
    lastRequestAt: Date | undefined,
    verificationAttempts: number,
    otpCode: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._identifier = identifier;
    this._token = token;
    this._method = method;
    this._status = status;
    this._expiresAt = expiresAt;
    this._usedAt = usedAt;
    this._cancelledAt = cancelledAt;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._deviceId = deviceId;
    this._requestCount = requestCount;
    this._lastRequestAt = lastRequestAt;
    this._verificationAttempts = verificationAttempts;
    this._otpCode = otpCode;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Password reset requires a user ID');
    }
    if (!this._token && this._method !== PasswordResetMethod.SMS && this._method !== PasswordResetMethod.WHATSAPP) {
      throw new EntityValidationError('Password reset requires a token');
    }
    if (!this._ipAddress) {
      throw new EntityValidationError('Password reset requires IP address');
    }
    if (!this._userAgent) {
      throw new EntityValidationError('Password reset requires user agent');
    }
    if (!this._deviceId) {
      throw new EntityValidationError('Password reset requires device ID');
    }
    if (this._requestCount < 0) {
      throw new EntityValidationError('Request count cannot be negative');
    }
    if (this._requestCount > RESET_CONFIG.MAX_REQUESTS_PER_DAY) {
      throw new EntityValidationError('Request count exceeds maximum allowed');
    }
    if (this._verificationAttempts > RESET_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
      throw new EntityValidationError('Verification attempts exceed maximum allowed');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new email-based password reset request (factory method)
   */
  public static createEmail(
    userId: string,
    email: Email,
    token: Token,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    idGenerator: IdGenerator,
    requestCount: number = 0,
    lastRequestAt?: Date
  ): PasswordReset {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + RESET_CONFIG.EXPIRY_MS);
    
    // Rate limiting check
    PasswordReset.checkRateLimit(requestCount, lastRequestAt);
    
    const reset = new PasswordReset(
      idGenerator.generate(),
      userId,
      { type: 'email', value: email },
      token,
      PasswordResetMethod.EMAIL,
      PasswordResetStatus.PENDING,
      expiresAt,
      undefined,
      undefined,
      ipAddress,
      userAgent,
      deviceId,
      requestCount + 1,
      now,
      0,
      undefined,
      now,
      now,
      1
    );
    
    reset.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordResetEventType.PASSWORD_RESET_CREATED,
      aggregateId: reset.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        method: PasswordResetMethod.EMAIL,
        identifier: email.getValue(),
        expiresAt: expiresAt.toISOString(),
      },
    });
    
    return reset;
  }

  /**
   * Create a new phone-based password reset request (Bangladesh specific)
   */
  public static createPhone(
    userId: string,
    phone: Phone,
    method: PasswordResetMethod,
    otpCode: string,
    ipAddress: IpAddress,
    userAgent: UserAgent,
    deviceId: DeviceId,
    idGenerator: IdGenerator,
    requestCount: number = 0,
    lastRequestAt?: Date
  ): PasswordReset {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + RESET_CONFIG.EXPIRY_MS);
    
    // Rate limiting check
    PasswordReset.checkRateLimit(requestCount, lastRequestAt);
    
    const reset = new PasswordReset(
      idGenerator.generate(),
      userId,
      { type: 'phone', value: phone },
      null as unknown as Token,  // No token for phone-based reset
      method,
      PasswordResetStatus.PENDING,
      expiresAt,
      undefined,
      undefined,
      ipAddress,
      userAgent,
      deviceId,
      requestCount + 1,
      now,
      0,
      otpCode,
      now,
      now,
      1
    );
    
    reset.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordResetEventType.PASSWORD_RESET_CREATED,
      aggregateId: reset.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        method,
        identifier: phone.getE164(),
        expiresAt: expiresAt.toISOString(),
      },
    });
    
    return reset;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    identifierType: 'email' | 'phone';
    identifierValue: string;
    token?: Token;
    method: PasswordResetMethod;
    status: PasswordResetStatus;
    expiresAt: Date;
    usedAt?: Date;
    cancelledAt?: Date;
    ipAddress: IpAddress;
    userAgent: UserAgent;
    deviceId: DeviceId;
    requestCount: number;
    lastRequestAt?: Date;
    verificationAttempts: number;
    otpCode?: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): PasswordReset {
    const identifier: ResetIdentifier = data.identifierType === 'email'
      ? { type: 'email', value: new Email(data.identifierValue) }
      : { type: 'phone', value: new Phone(data.identifierValue) };
    
    return new PasswordReset(
      data.id,
      data.userId,
      identifier,
      data.token!,
      data.method,
      data.status,
      data.expiresAt,
      data.usedAt,
      data.cancelledAt,
      data.ipAddress,
      data.userAgent,
      data.deviceId,
      data.requestCount,
      data.lastRequestAt,
      data.verificationAttempts,
      data.otpCode,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * Check rate limit for reset requests
   */
  private static checkRateLimit(requestCount: number, lastRequestAt?: Date): void {
    if (requestCount >= RESET_CONFIG.MAX_REQUESTS_PER_DAY) {
      throw new EntityValidationError(
        `Maximum reset requests (${RESET_CONFIG.MAX_REQUESTS_PER_DAY}) exceeded for today`
      );
    }
    
    if (lastRequestAt) {
      const timeSinceLastRequest = new Date().getTime() - lastRequestAt.getTime();
      if (timeSinceLastRequest < RESET_CONFIG.COOLDOWN_MS) {
        const remainingMinutes = Math.ceil(
          (RESET_CONFIG.COOLDOWN_MS - timeSinceLastRequest) / (60 * 1000)
        );
        throw new EntityValidationError(
          `Please wait ${remainingMinutes} minutes before requesting another reset`
        );
      }
    }
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Verify OTP for phone-based reset (Bangladesh specific)
   */
  public verifyOtp(inputOtp: string): boolean {
    if (this._method === PasswordResetMethod.EMAIL) {
      throw new EntityValidationError('OTP verification only available for phone-based reset');
    }
    
    if (this._status !== PasswordResetStatus.PENDING) {
      throw new EntityValidationError(`Cannot verify: status is ${this._status}`);
    }
    
    if (this.isExpired()) {
      this.expire();
      throw new EntityValidationError('Reset request has expired');
    }
    
    this._verificationAttempts++;
    this.touch();
    
    const isValid = this._otpCode === inputOtp;
    
    if (!isValid) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: PasswordResetEventType.PASSWORD_RESET_FAILED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          reason: 'Invalid OTP',
          remainingAttempts: this.getRemainingAttempts(),
        },
      });
      
      if (this._verificationAttempts >= RESET_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
        this.expire();
      }
    }
    
    return isValid;
  }

  /**
   * Validate a reset token (for email-based reset)
   */
  public async validateToken(
    inputToken: string,
    tokenVerifier: (token: string, expectedToken: Token) => Promise<boolean>
  ): Promise<boolean> {
    if (this._method !== PasswordResetMethod.EMAIL) {
      throw new EntityValidationError('Token validation only available for email-based reset');
    }
    
    if (this._status !== PasswordResetStatus.PENDING) {
      return false;
    }
    
    if (this.isExpired()) {
      await this.expire();
      return false;
    }
    
    const isValid = await tokenVerifier(inputToken, this._token);
    
    if (!isValid) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: PasswordResetEventType.PASSWORD_RESET_FAILED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          reason: 'Invalid token',
        },
      });
    }
    
    return isValid;
  }

  /**
   * Mark reset as used (after successful password change)
   */
  public markUsed(): void {
    if (this._status !== PasswordResetStatus.PENDING) {
      throw new EntityValidationError(
        `Cannot use reset token: current status is ${this._status}`
      );
    }
    
    if (this.isExpired()) {
      this.expire();
      throw new EntityValidationError('Reset request has expired');
    }
    
    this._status = PasswordResetStatus.USED;
    this._usedAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordResetEventType.PASSWORD_RESET_COMPLETED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        method: this._method,
      },
    });
  }

  /**
   * Expire the reset request
   */
  public async expire(): Promise<void> {
    if (this._status !== PasswordResetStatus.PENDING) {
      return;
    }
    
    this._status = PasswordResetStatus.EXPIRED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordResetEventType.PASSWORD_RESET_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
      },
    });
  }

  /**
   * Cancel the reset request (user or admin action)
   */
  public cancel(reason: string): void {
    if (this._status !== PasswordResetStatus.PENDING) {
      throw new EntityValidationError(
        `Cannot cancel reset token: current status is ${this._status}`
      );
    }
    
    this._status = PasswordResetStatus.CANCELLED;
    this._cancelledAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: PasswordResetEventType.PASSWORD_RESET_CANCELLED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        reason,
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
    if (this._status === PasswordResetStatus.EXPIRED) return true;
    if (this._status === PasswordResetStatus.USED) return false;
    if (this._status === PasswordResetStatus.CANCELLED) return true;
    
    return new Date() > this._expiresAt;
  }

  /**
   * Check if token is still valid (pending and not expired)
   */
  public isValid(): boolean {
    return this._status === PasswordResetStatus.PENDING && !this.isExpired();
  }

  /**
   * Get remaining time in minutes
   */
  public getRemainingTimeMinutes(): number {
    if (this.isExpired()) return 0;
    if (!this.isValid()) return 0;
    
    const remainingMs = this._expiresAt.getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(remainingMs / (60 * 1000)));
  }

  /**
   * Get remaining verification attempts
   */
  public getRemainingAttempts(): number {
    if (this._method === PasswordResetMethod.EMAIL) return 0;
    return Math.max(0, RESET_CONFIG.MAX_VERIFICATION_ATTEMPTS - this._verificationAttempts);
  }

  /**
   * Get remaining time formatted
   */
  public getRemainingTimeFormatted(): string {
    const minutes = this.getRemainingTimeMinutes();
    if (minutes <= 0) return 'Expired';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  /**
   * Static method to check rate limit
   */
  public static isRateLimited(
    requestCount: number,
    lastRequestAt?: Date
  ): { limited: boolean; remainingMinutes: number } {
    if (requestCount >= RESET_CONFIG.MAX_REQUESTS_PER_DAY) {
      return { limited: true, remainingMinutes: 0 };
    }
    
    if (lastRequestAt) {
      const timeSinceLastRequest = new Date().getTime() - lastRequestAt.getTime();
      if (timeSinceLastRequest < RESET_CONFIG.COOLDOWN_MS) {
        const remainingMinutes = Math.ceil(
          (RESET_CONFIG.COOLDOWN_MS - timeSinceLastRequest) / (60 * 1000)
        );
        return { limited: true, remainingMinutes };
      }
    }
    
    return { limited: false, remainingMinutes: 0 };
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getIdentifier(): ResetIdentifier { return this._identifier; }
  public getToken(): Token { return this._token; }
  public getMethod(): PasswordResetMethod { return this._method; }
  public getStatus(): PasswordResetStatus { return this._status; }
  public getExpiresAt(): Date { return new Date(this._expiresAt); }
  public getUsedAt(): Date | undefined { return this._usedAt ? new Date(this._usedAt) : undefined; }
  public getCancelledAt(): Date | undefined { return this._cancelledAt ? new Date(this._cancelledAt) : undefined; }
  public getIpAddress(): IpAddress { return this._ipAddress; }
  public getUserAgent(): UserAgent { return this._userAgent; }
  public getDeviceId(): DeviceId { return this._deviceId; }
  public getRequestCount(): number { return this._requestCount; }
  public getLastRequestAt(): Date | undefined { return this._lastRequestAt ? new Date(this._lastRequestAt) : undefined; }
  public getVerificationAttempts(): number { return this._verificationAttempts; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      userId: this._userId,
      identifier: this._identifier.type === 'email' 
        ? this._identifier.value.getValue() 
        : this._identifier.value.getE164(),
      identifierType: this._identifier.type,
      method: this._method,
      status: this._status,
      expiresAt: this._expiresAt.toISOString(),
      usedAt: this._usedAt?.toISOString(),
      cancelledAt: this._cancelledAt?.toISOString(),
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      remainingTime: this.getRemainingTimeFormatted(),
      requestCount: this._requestCount,
      remainingAttempts: this.getRemainingAttempts(),
      // ⚠️ Token and OTP code are intentionally excluded for security
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

export type { ResetIdentifier };
