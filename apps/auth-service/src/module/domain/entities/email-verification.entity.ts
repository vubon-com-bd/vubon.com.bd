/**
 * Email Verification Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/email-verification.entity
 * 
 * @description
 * Represents email verification process with OTP code.
 * Used for user registration, email change, and password recovery.
 * 
 * Enterprise Rules:
 * ✅ 24-hour expiry (configurable)
 * ✅ Max resend limits with cooldown
 * ✅ Domain events for all state changes
 * ✅ Framework-free (no crypto dependency)
 * ✅ Complete audit trail
 * ✅ Bangladesh-specific SMS/WhatsApp cooldown support
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { OtpCode, OtpType, OtpPurpose } from '../value-objects/otp-code.vo';

// ==================== Enums ====================

/**
 * Email verification status
 */
export enum EmailVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

/**
 * Email verification event types
 */
export enum EmailVerificationEventType {
  EMAIL_VERIFICATION_CREATED = 'email_verification.created',
  EMAIL_VERIFICATION_COMPLETED = 'email_verification.completed',
  EMAIL_VERIFICATION_EXPIRED = 'email_verification.expired',
  EMAIL_VERIFICATION_RESENT = 'email_verification.resent',
  EMAIL_VERIFICATION_REVOKED = 'email_verification.revoked',
  EMAIL_VERIFICATION_FAILED = 'email_verification.failed',
}

// ==================== Types ====================

/**
 * Email verification configuration
 */
export interface EmailVerificationConfig {
  expiryHours: number;
  maxResendCount: number;
  resendCooldownMinutes: number;
  maxVerificationAttempts: number;
}

// ==================== Constants ====================

/**
 * Email verification configuration constants
 */
const VERIFICATION_CONFIG = {
  EXPIRY_HOURS: 24,
  EXPIRY_MS: 24 * 60 * 60 * 1000,
  MAX_RESEND_COUNT: 5,
  RESEND_COOLDOWN_MINUTES: 1,
  RESEND_COOLDOWN_MS: 60 * 1000,
  MAX_VERIFICATION_ATTEMPTS: 3,
} as const;

// ==================== Email Verification Entity ====================

/**
 * Email Verification Entity
 * 
 * Manages email verification lifecycle
 */
export class EmailVerification extends BaseEntity {
  private _userId: string;
  private _email: Email;
  private _code: OtpCode;
  private _status: EmailVerificationStatus;
  private _expiresAt: Date;
  private _verifiedAt: Date | undefined;
  private _resendCount: number;
  private _lastResentAt: Date | undefined;
  private _verificationAttempts: number;
  private _lastVerificationAttemptAt: Date | undefined;

  private constructor(
    id: string,
    userId: string,
    email: Email,
    code: OtpCode,
    status: EmailVerificationStatus,
    expiresAt: Date,
    verifiedAt: Date | undefined,
    resendCount: number,
    lastResentAt: Date | undefined,
    verificationAttempts: number,
    lastVerificationAttemptAt: Date | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._email = email;
    this._code = code;
    this._status = status;
    this._expiresAt = expiresAt;
    this._verifiedAt = verifiedAt;
    this._resendCount = resendCount;
    this._lastResentAt = lastResentAt;
    this._verificationAttempts = verificationAttempts;
    this._lastVerificationAttemptAt = lastVerificationAttemptAt;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Email verification requires a user ID');
    }
    if (!this._email) {
      throw new EntityValidationError('Email verification requires an email');
    }
    if (!this._code) {
      throw new EntityValidationError('Email verification requires a verification code');
    }
    if (this._resendCount < 0) {
      throw new EntityValidationError('Resend count cannot be negative');
    }
    if (this._resendCount > VERIFICATION_CONFIG.MAX_RESEND_COUNT) {
      throw new EntityValidationError(`Resend count exceeds maximum of ${VERIFICATION_CONFIG.MAX_RESEND_COUNT}`);
    }
    if (this._verificationAttempts > VERIFICATION_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
      throw new EntityValidationError(`Verification attempts exceed maximum of ${VERIFICATION_CONFIG.MAX_VERIFICATION_ATTEMPTS}`);
    }
    if (this._expiresAt < this.createdAt) {
      throw new EntityValidationError('ExpiresAt cannot be before CreatedAt');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new email verification (factory method)
   */
  public static create(
    userId: string,
    email: Email,
    idGenerator: IdGenerator,
    customExpiryHours?: number
  ): EmailVerification {
    const now = new Date();
    const expiryHours = customExpiryHours || VERIFICATION_CONFIG.EXPIRY_HOURS;
    const expiryMs = expiryHours * 60 * 60 * 1000;
    const expiresAt = new Date(now.getTime() + expiryMs);
    
    // Generate OTP code
    const code = OtpCode.generate(OtpType.EMAIL);
    const otpCode = new OtpCode(code, OtpType.EMAIL, OtpPurpose.EMAIL_VERIFICATION);
    
    const verification = new EmailVerification(
      idGenerator.generate(),
      userId,
      email,
      otpCode,
      EmailVerificationStatus.PENDING,
      expiresAt,
      undefined,
      0,
      undefined,
      0,
      undefined,
      now,
      now,
      1
    );
    
    verification.addDomainEvent({
      eventId: generateEventId(),
      eventType: EmailVerificationEventType.EMAIL_VERIFICATION_CREATED,
      aggregateId: verification.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        email: email.getValue(),
        expiresAt: expiresAt.toISOString(),
      },
    });
    
    return verification;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    email: Email;
    code: OtpCode;
    status: EmailVerificationStatus;
    expiresAt: Date;
    verifiedAt?: Date;
    resendCount: number;
    lastResentAt?: Date;
    verificationAttempts: number;
    lastVerificationAttemptAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): EmailVerification {
    return new EmailVerification(
      data.id,
      data.userId,
      data.email,
      data.code,
      data.status,
      data.expiresAt,
      data.verifiedAt,
      data.resendCount,
      data.lastResentAt,
      data.verificationAttempts,
      data.lastVerificationAttemptAt,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Verify email with OTP code
   */
  public verify(inputCode: string): boolean {
    // Check status
    if (this._status !== EmailVerificationStatus.PENDING) {
      throw new EntityValidationError(
        `Cannot verify: status is ${this._status}, expected PENDING`
      );
    }
    
    // Check expiry
    if (this.isExpired()) {
      this.expire();
      throw new EntityValidationError('Verification code has expired');
    }
    
    // Track attempt
    this._verificationAttempts++;
    this._lastVerificationAttemptAt = new Date();
    
    // Check max attempts
    if (this._verificationAttempts > VERIFICATION_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
      this.expire();
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_FAILED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          email: this._email.getValue(),
          reason: 'max_attempts_exceeded',
          attempts: this._verificationAttempts,
        },
      });
      throw new EntityValidationError('Maximum verification attempts exceeded');
    }
    
    // Verify code
    const isValid = this._code.verify(inputCode);
    
    if (isValid) {
      this._status = EmailVerificationStatus.VERIFIED;
      this._verifiedAt = new Date();
      this.touch();
      
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_COMPLETED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          email: this._email.getValue(),
          verifiedAt: this._verifiedAt,
          attemptsUsed: this._verificationAttempts,
        },
      });
    } else {
      this.touch();
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_FAILED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          email: this._email.getValue(),
          reason: 'invalid_code',
          remainingAttempts: this.getRemainingVerificationAttempts(),
        },
      });
    }
    
    return isValid;
  }

  /**
   * Expire this verification
   */
  public expire(): void {
    if (this._status !== EmailVerificationStatus.PENDING) {
      return; // Already expired or verified
    }
    
    this._status = EmailVerificationStatus.EXPIRED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: EmailVerificationEventType.EMAIL_VERIFICATION_EXPIRED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        email: this._email.getValue(),
        expiredAt: new Date(),
      },
    });
  }

  /**
   * Revoke verification (admin action)
   */
  public revoke(reason: string): void {
    if (this._status === EmailVerificationStatus.VERIFIED) {
      throw new EntityValidationError('Cannot revoke a verified email');
    }
    
    this._status = EmailVerificationStatus.REVOKED;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: EmailVerificationEventType.EMAIL_VERIFICATION_REVOKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        email: this._email.getValue(),
        reason,
      },
    });
  }

  /**
   * Create a new verification for resend
   * 
   * @param idGenerator - ID generator
   * @returns New EmailVerification entity
   */
  public resend(idGenerator: IdGenerator): EmailVerification {
    // Check if already verified
    if (this._status === EmailVerificationStatus.VERIFIED) {
      throw new EntityValidationError('Email already verified, cannot resend');
    }
    
    // Check resend limit
    if (this._resendCount >= VERIFICATION_CONFIG.MAX_RESEND_COUNT) {
      throw new EntityValidationError(
        `Maximum resend limit (${VERIFICATION_CONFIG.MAX_RESEND_COUNT}) exceeded`
      );
    }
    
    // Check cooldown
    if (this._lastResentAt) {
      const cooldownRemaining = this.getResendCooldownRemaining();
      if (cooldownRemaining > 0) {
        throw new EntityValidationError(
          `Please wait ${Math.ceil(cooldownRemaining / 1000)} seconds before resending`
        );
      }
    }
    
    // Generate new OTP code
    const newCodeValue = OtpCode.generate(OtpType.EMAIL);
    const newCode = new OtpCode(newCodeValue, OtpType.EMAIL, OtpPurpose.EMAIL_VERIFICATION);
    
    // Create new verification
    const newVerification = EmailVerification.create(
      this._userId,
      this._email,
      idGenerator
    );
    
    // Update resend tracking on old verification (for audit)
    this._resendCount++;
    this._lastResentAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: EmailVerificationEventType.EMAIL_VERIFICATION_RESENT,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        email: this._email.getValue(),
        resendCount: this._resendCount,
        newVerificationId: newVerification.id,
      },
    });
    
    return newVerification;
  }

  // ============================================================
  // Status Check Methods
  // ============================================================

  /**
   * Check if verification is expired
   */
  public isExpired(): boolean {
    if (this._status === EmailVerificationStatus.EXPIRED) {
      return true;
    }
    if (this._status === EmailVerificationStatus.VERIFIED) {
      return false;
    }
    return new Date() > this._expiresAt;
  }

  /**
   * Check if email is verified
   */
  public isVerified(): boolean {
    return this._status === EmailVerificationStatus.VERIFIED;
  }

  /**
   * Check if verification is pending
   */
  public isPending(): boolean {
    return this._status === EmailVerificationStatus.PENDING && !this.isExpired();
  }

  /**
   * Check if resend is allowed
   */
  public canResend(): boolean {
    if (this._status === EmailVerificationStatus.VERIFIED) return false;
    if (this._resendCount >= VERIFICATION_CONFIG.MAX_RESEND_COUNT) return false;
    if (this.getResendCooldownRemaining() > 0) return false;
    return true;
  }

  // ============================================================
  // Time Methods
  // ============================================================

  /**
   * Get remaining time until expiry (milliseconds)
   */
  public getRemainingTimeMs(): number {
    if (this.isExpired()) return 0;
    if (this.isVerified()) return 0;
    
    const remaining = this._expiresAt.getTime() - new Date().getTime();
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Get remaining time formatted (for UI)
   */
  public getRemainingTimeFormatted(): string {
    const ms = this.getRemainingTimeMs();
    if (ms <= 0) return 'Expired';
    
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  /**
   * Get resend cooldown remaining (milliseconds)
   */
  public getResendCooldownRemaining(): number {
    if (!this._lastResentAt) return 0;
    
    const timeSinceLastResend = new Date().getTime() - this._lastResentAt.getTime();
    const remaining = VERIFICATION_CONFIG.RESEND_COOLDOWN_MS - timeSinceLastResend;
    
    return remaining > 0 ? remaining : 0;
  }

  // ============================================================
  // Counter Methods
  // ============================================================

  /**
   * Get remaining resend attempts
   */
  public getRemainingResendAttempts(): number {
    return Math.max(0, VERIFICATION_CONFIG.MAX_RESEND_COUNT - this._resendCount);
  }

  /**
   * Get remaining verification attempts
   */
  public getRemainingVerificationAttempts(): number {
    return Math.max(0, VERIFICATION_CONFIG.MAX_VERIFICATION_ATTEMPTS - this._verificationAttempts);
  }

  /**
   * Get verification attempts used
   */
  public getVerificationAttemptsUsed(): number {
    return this._verificationAttempts;
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getEmail(): Email { return this._email; }
  public getCode(): OtpCode { return this._code; }
  public getStatus(): EmailVerificationStatus { return this._status; }
  public getExpiresAt(): Date { return new Date(this._expiresAt); }
  public getVerifiedAt(): Date | undefined { return this._verifiedAt ? new Date(this._verifiedAt) : undefined; }
  public getResendCount(): number { return this._resendCount; }
  public getLastResentAt(): Date | undefined { return this._lastResentAt ? new Date(this._lastResentAt) : undefined; }
  public getLastVerificationAttemptAt(): Date | undefined { 
    return this._lastVerificationAttemptAt ? new Date(this._lastVerificationAttemptAt) : undefined; 
  }

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
      email: this._email.getValue(),
      status: this._status,
      expiresAt: this._expiresAt.toISOString(),
      verifiedAt: this._verifiedAt?.toISOString(),
      remainingTime: this.getRemainingTimeFormatted(),
      isExpired: this.isExpired(),
      isVerified: this.isVerified(),
      isPending: this.isPending(),
      resendCount: this._resendCount,
      remainingResendAttempts: this.getRemainingResendAttempts(),
      canResend: this.canResend(),
      resendCooldownRemaining: this.getResendCooldownRemaining(),
      verificationAttempts: this._verificationAttempts,
      remainingVerificationAttempts: this.getRemainingVerificationAttempts(),
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

export type { EmailVerificationConfig };
