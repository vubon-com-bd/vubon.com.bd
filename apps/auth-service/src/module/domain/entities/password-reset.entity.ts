/**
 * Password Reset Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/password-reset.entity
 * 
 * @description
 * Represents a password reset request with token validation and expiry.
 * Used for secure password recovery workflow.
 * 
 * Enterprise Rules:
 * ✅ Shared configuration from @vubon/shared-constants
 * ✅ 1-hour token expiry (configurable)
 * ✅ Rate limiting on reset requests (3 per day, 15 min cooldown)
 * ✅ Concurrent pending request prevention
 * ✅ Domain events for all state changes
 * ✅ Track request source for security
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - Phone-based password reset support (SMS/WhatsApp/Voice)
 * ✅ Configurable notification templates
 */

import { BaseEntity, ValidationResult, EntityValidationError, type IdGenerator } from './base.entity';
import { Token } from '../value-objects/token.vo';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceId } from '../value-objects/device-id.vo';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
import { PASSWORD_RESET_CONFIG } from '@vubon/shared-constants';

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
 * Password reset method enumeration (Bangladesh specific)
 */
export enum PasswordResetMethod {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',      // Bangladesh specific
  VOICE = 'VOICE',            // Voice call OTP for feature phones
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
  PASSWORD_RESET_CONCURRENT_BLOCKED = 'password_reset.concurrent_blocked', // ✅ Enterprise: Concurrent request prevention
}

// ==================== Types ====================

/**
 * Password reset configuration from shared-constants
 */
export type PasswordResetConfig = typeof PASSWORD_RESET_CONFIG;

/**
 * Password reset identifier (email or phone)
 */
export type ResetIdentifier = 
  | { type: 'email'; value: Email } 
  | { type: 'phone'; value: Phone };

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  limited: boolean;
  remainingMinutes: number;
  remainingRequests: number;
  message?: string;
}

/**
 * Notification template for different reset methods
 */
export interface NotificationTemplate {
  sms: string;
  whatsapp: string;
  voice: string;
  email: string;
}

// ==================== Constants from Shared Config ====================

// ✅ ENTERPRISE ENHANCEMENT: Use from shared-constants
const {
  EXPIRY_HOURS,
  EXPIRY_MS,
  MAX_REQUESTS_PER_DAY,
  COOLDOWN_MS,
  MAX_VERIFICATION_ATTEMPTS,
  ALLOW_CONCURRENT_REQUESTS,
} = PASSWORD_RESET_CONFIG;

// ==================== Password Reset Entity ====================

/**
 * Password Reset Entity
 * 
 * Manages password reset requests with full audit trail
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
  private _otpCode: string | undefined;
  private _cancelReason: string | undefined;

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
    cancelReason: string | undefined,
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
    this._cancelReason = cancelReason;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): ValidationResult {
  const errors: string[] = [];
  
  if (!this._userId) {
    errors.push('Password reset requires a user ID');
  }
  if (!this._token && this._method !== PasswordResetMethod.SMS && 
      this._method !== PasswordResetMethod.WHATSAPP && this._method !== PasswordResetMethod.VOICE) {
    errors.push('Password reset requires a token');
  }
  if (!this._ipAddress) {
    errors.push('Password reset requires IP address');
  }
  if (!this._userAgent) {
    errors.push('Password reset requires user agent');
  }
  if (!this._deviceId) {
    errors.push('Password reset requires device ID');
  }
  if (this._requestCount < 0) {
    errors.push('Request count cannot be negative');
  }
  if (this._requestCount > MAX_REQUESTS_PER_DAY) {
    errors.push(`Request count exceeds maximum of ${MAX_REQUESTS_PER_DAY}`);
  }
  if (this._verificationAttempts > MAX_VERIFICATION_ATTEMPTS) {
    errors.push(`Verification attempts exceed maximum of ${MAX_VERIFICATION_ATTEMPTS}`);
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
    lastRequestAt?: Date,
    existingPendingRequests: PasswordReset[] = []
  ): PasswordReset {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + EXPIRY_MS);
    
    // ✅ Enterprise: Check rate limit
    const rateLimit = PasswordReset.checkRateLimit(requestCount, lastRequestAt);
    if (rateLimit.limited) {
      throw new EntityValidationError(rateLimit.message || 'Rate limit exceeded');
    }
    
    // ✅ Enterprise: Check for concurrent pending requests
    if (!ALLOW_CONCURRENT_REQUESTS) {
      const hasPending = PasswordReset.hasPendingRequest(userId, existingPendingRequests);
      if (hasPending) {
        throw new EntityValidationError(
          'You already have a pending password reset request. Please wait for it to expire or be used.'
        );
      }
    }
    
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
        requestCount: requestCount + 1,
        ipAddress: ipAddress.getValue(),
        deviceId: deviceId.getValue(),
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
    lastRequestAt?: Date,
    existingPendingRequests: PasswordReset[] = []
  ): PasswordReset {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + EXPIRY_MS);
    
    // ✅ Enterprise: Check rate limit
    const rateLimit = PasswordReset.checkRateLimit(requestCount, lastRequestAt);
    if (rateLimit.limited) {
      throw new EntityValidationError(rateLimit.message || 'Rate limit exceeded');
    }
    
    // ✅ Enterprise: Check for concurrent pending requests
    if (!ALLOW_CONCURRENT_REQUESTS) {
      const hasPending = PasswordReset.hasPendingRequest(userId, existingPendingRequests);
      if (hasPending) {
        throw new EntityValidationError(
          'You already have a pending password reset request. Please wait for it to expire or be used.'
        );
      }
    }
    
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
        method,
        identifier: phone.getE164(),
        expiresAt: expiresAt.toISOString(),
        requestCount: requestCount + 1,
        ipAddress: ipAddress.getValue(),
        deviceId: deviceId.getValue(),
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
    cancelReason?: string;
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
      data.cancelReason,
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
   * ✅ Enterprise: Enhanced with detailed result
   */
  private static checkRateLimit(
    requestCount: number, 
    lastRequestAt?: Date
  ): RateLimitResult {
    if (requestCount >= MAX_REQUESTS_PER_DAY) {
      return {
        limited: true,
        remainingMinutes: 0,
        remainingRequests: 0,
        message: `Maximum reset requests (${MAX_REQUESTS_PER_DAY}) exceeded for today. Please try again tomorrow.`,
      };
    }
    
    if (lastRequestAt) {
      const timeSinceLastRequest = new Date().getTime() - lastRequestAt.getTime();
      if (timeSinceLastRequest < COOLDOWN_MS) {
        const remainingMinutes = Math.ceil(
          (COOLDOWN_MS - timeSinceLastRequest) / (60 * 1000)
        );
        return {
          limited: true,
          remainingMinutes,
          remainingRequests: MAX_REQUESTS_PER_DAY - requestCount,
          message: `Please wait ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} before requesting another reset.`,
        };
      }
    }
    
    return {
      limited: false,
      remainingMinutes: 0,
      remainingRequests: MAX_REQUESTS_PER_DAY - requestCount,
    };
  }

  /**
   * ✅ Enterprise: Check if user has a pending reset request
   */
  private static hasPendingRequest(
    userId: string, 
    existingRequests: PasswordReset[]
  ): boolean {
    return existingRequests.some(request => 
      request.getUserId() === userId && 
      request.getStatus() === PasswordResetStatus.PENDING &&
      !request.isExpired()
    );
  }

  /**
   * ✅ Enterprise: Get notification template for this reset method
   */
  private getNotificationTemplate(): string {
    const templates: Record<PasswordResetMethod, string> = {
      [PasswordResetMethod.SMS]: `Your password reset OTP is: {code}. Valid for {expiry} minutes.`,
      [PasswordResetMethod.WHATSAPP]: `🔐 *Vubon Password Reset*\n\nYour OTP is: *{code}*\nValid for {expiry} minutes.\nNever share this code with anyone.`,
      [PasswordResetMethod.VOICE]: `Your password reset OTP is {code}. This code is valid for {expiry} minutes.`,
      [PasswordResetMethod.EMAIL]: `Click the link below to reset your password: {link}`,
    };
    
    return templates[this._method] || templates[PasswordResetMethod.SMS];
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
          method: this._method,
        },
      });
      
      if (this._verificationAttempts >= MAX_VERIFICATION_ATTEMPTS) {
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
          method: this._method,
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
        identifier: this._identifier.type === 'email' 
          ? this._identifier.value.getValue() 
          : this._identifier.value.getE164(),
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
        reason: 'Token expired',
        expiresAt: this._expiresAt.toISOString(),
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
    this._cancelReason = reason;
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
        method: this._method,
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
    return Math.max(0, MAX_VERIFICATION_ATTEMPTS - this._verificationAttempts);
  }

  /**
   * Get remaining time formatted
   */
  public getRemainingTimeFormatted(): string {
    const minutes = this.getRemainingTimeMinutes();
    if (minutes <= 0) return 'Expired';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }

  /**
   * ✅ Enterprise: Static method to check rate limit
   */
  public static getRateLimitStatus(
    requestCount: number,
    lastRequestAt?: Date
  ): RateLimitResult {
    return PasswordReset.checkRateLimit(requestCount, lastRequestAt);
  }

  /**
   * ✅ Enterprise: Get formatted notification message
   */
  public getNotificationMessage(codeOrLink: string, expiryMinutes?: number): string {
    const template = this.getNotificationTemplate();
    const expiry = expiryMinutes || EXPIRY_HOURS * 60;
    
    return template
      .replace('{code}', codeOrLink)
      .replace('{expiry}', expiry.toString())
      .replace('{link}', codeOrLink);
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
  public getCancelReason(): string | undefined { return this._cancelReason; }
  public getIpAddress(): IpAddress { return this._ipAddress; }
  public getUserAgent(): UserAgent { return this._userAgent; }
  public getDeviceId(): DeviceId { return this._deviceId; }
  public getRequestCount(): number { return this._requestCount; }
  public getLastRequestAt(): Date | undefined { return this._lastRequestAt ? new Date(this._lastRequestAt) : undefined; }
  public getVerificationAttempts(): number { return this._verificationAttempts; }
  public getOtpCode(): string | undefined { return this._otpCode; }

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
      cancelReason: this._cancelReason,
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      remainingTime: this.getRemainingTimeFormatted(),
      remainingTimeMinutes: this.getRemainingTimeMinutes(),
      requestCount: this._requestCount,
      remainingRequests: Math.max(0, MAX_REQUESTS_PER_DAY - this._requestCount),
      remainingAttempts: this.getRemainingAttempts(),
      verificationAttempts: this._verificationAttempts,
      ipAddress: this._ipAddress.getValue(),
      deviceId: this._deviceId.getValue(),
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
