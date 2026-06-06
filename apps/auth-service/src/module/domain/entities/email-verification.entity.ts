/**
 * Email Verification Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/email-verification.entity
 * 
 * @description
 * Represents email verification process with OTP code and magic link support.
 * Used for user registration, email change, and password recovery.
 * 
 * Enterprise Features:
 * ✅ Shared configuration from @vubon/shared-constants
 * ✅ 24-hour expiry (configurable)
 * ✅ Max resend limits with cooldown
 * ✅ Max verification attempts (3 attempts)
 * ✅ Magic link support for passwordless verification
 * ✅ WhatsApp notification support (Bangladesh specific)
 * ✅ Domain events for all state changes
 * ✅ Framework-free (no crypto dependency)
 * ✅ Complete audit trail
 * ✅ Rate limiting for resend requests
 * ✅ Device tracking for security
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';
import { OtpCode, OtpType, OtpPurpose } from '../value-objects/otp-code.vo';
import { Token, TokenType } from '../value-objects/token.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants
import { EMAIL_VERIFICATION_CONFIG } from '@vubon/shared-constants';

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
 * Verification method types
 */
export enum VerificationMethod {
  OTP = 'OTP',
  MAGIC_LINK = 'MAGIC_LINK',
}

/**
 * Notification channel types
 */
export enum NotificationChannel {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',  // ✅ Bangladesh specific
  SMS = 'SMS',
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
  // ✅ ENTERPRISE ENHANCEMENT: New events
  EMAIL_VERIFICATION_MAGIC_LINK_SENT = 'email_verification.magic_link_sent',
  EMAIL_VERIFICATION_WHATSAPP_SENT = 'email_verification.whatsapp_sent',
  EMAIL_VERIFICATION_RATE_LIMITED = 'email_verification.rate_limited',
  EMAIL_VERIFICATION_DEVICE_CHANGED = 'email_verification.device_changed',
  EMAIL_VERIFICATION_IP_CHANGED = 'email_verification.ip_changed',
}

// ==================== Types ====================

/**
 * Email verification configuration (from shared-constants)
 */
export type EmailVerificationConfig = typeof EMAIL_VERIFICATION_CONFIG;

/**
 * Verification metadata (for audit and tracking)
 */
export interface VerificationMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  location?: string;
  channel?: NotificationChannel;
}

// ==================== Constants from Shared Config ====================

// ✅ ENTERPRISE ENHANCEMENT: Use from shared-constants
const {
  EXPIRY_HOURS,
  EXPIRY_MS,
  MAX_RESEND_COUNT,
  RESEND_COOLDOWN_MINUTES,
  RESEND_COOLDOWN_MS,
  MAX_VERIFICATION_ATTEMPTS,
  ENABLE_MAGIC_LINK,
  MAGIC_LINK_EXPIRY_MINUTES,
  ENABLE_WHATSAPP_NOTIFICATION,
  RATE_LIMIT_PER_HOUR,
} = EMAIL_VERIFICATION_CONFIG;

// ==================== Email Verification Entity ====================

/**
 * Email Verification Entity
 * 
 * Manages email verification lifecycle with OTP and magic link support
 */
export class EmailVerification extends BaseEntity {
  private _userId: string;
  private _email: Email;
  private _phone?: Phone;  // ✅ For WhatsApp notifications
  private _code: OtpCode;
  private _magicLinkToken?: Token;  // ✅ Enterprise: Magic link support
  private _status: EmailVerificationStatus;
  private _expiresAt: Date;
  private _verifiedAt: Date | undefined;
  private _resendCount: number;
  private _lastResentAt: Date | undefined;
  private _verificationAttempts: number;
  private _lastVerificationAttemptAt: Date | undefined;
  
  // ✅ ENTERPRISE ENHANCEMENT: Rate limiting and tracking
  private _rateLimitCount: number;
  private _rateLimitResetAt: Date | undefined;
  
  // ✅ ENTERPRISE ENHANCEMENT: Device and IP tracking
  private _deviceId?: DeviceId;
  private _ipAddress?: IpAddress;
  private _userAgent?: string;
  
  // ✅ ENTERPRISE ENHANCEMENT: Verification method tracking
  private _verificationMethod?: VerificationMethod;
  
  // ✅ ENTERPRISE ENHANCEMENT: Audit trail
  private _lastNotificationChannel?: NotificationChannel;
  private _lastNotificationSentAt?: Date;

  private constructor(
    id: string,
    userId: string,
    email: Email,
    phone: Phone | undefined,
    code: OtpCode,
    magicLinkToken: Token | undefined,
    status: EmailVerificationStatus,
    expiresAt: Date,
    verifiedAt: Date | undefined,
    resendCount: number,
    lastResentAt: Date | undefined,
    verificationAttempts: number,
    lastVerificationAttemptAt: Date | undefined,
    rateLimitCount: number,
    rateLimitResetAt: Date | undefined,
    deviceId: DeviceId | undefined,
    ipAddress: IpAddress | undefined,
    userAgent: string | undefined,
    verificationMethod: VerificationMethod | undefined,
    lastNotificationChannel: NotificationChannel | undefined,
    lastNotificationSentAt: Date | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._email = email;
    this._phone = phone;
    this._code = code;
    this._magicLinkToken = magicLinkToken;
    this._status = status;
    this._expiresAt = expiresAt;
    this._verifiedAt = verifiedAt;
    this._resendCount = resendCount;
    this._lastResentAt = lastResentAt;
    this._verificationAttempts = verificationAttempts;
    this._lastVerificationAttemptAt = lastVerificationAttemptAt;
    this._rateLimitCount = rateLimitCount;
    this._rateLimitResetAt = rateLimitResetAt;
    this._deviceId = deviceId;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._verificationMethod = verificationMethod;
    this._lastNotificationChannel = lastNotificationChannel;
    this._lastNotificationSentAt = lastNotificationSentAt;
    
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
    if (this._resendCount > MAX_RESEND_COUNT) {
      throw new EntityValidationError(`Resend count exceeds maximum of ${MAX_RESEND_COUNT}`);
    }
    if (this._verificationAttempts > MAX_VERIFICATION_ATTEMPTS) {
      throw new EntityValidationError(`Verification attempts exceed maximum of ${MAX_VERIFICATION_ATTEMPTS}`);
    }
    if (this._expiresAt < this.createdAt) {
      throw new EntityValidationError('ExpiresAt cannot be before CreatedAt');
    }
    if (this._rateLimitCount < 0) {
      throw new EntityValidationError('Rate limit count cannot be negative');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new email verification (factory method)
   * ✅ ENTERPRISE ENHANCEMENT: Supports OTP and Magic Link
   */
  public static create(
    userId: string,
    email: Email,
    idGenerator: IdGenerator,
    options?: {
      customExpiryHours?: number;
      phone?: Phone;
      deviceId?: DeviceId;
      ipAddress?: IpAddress;
      userAgent?: string;
      useMagicLink?: boolean;
    }
  ): EmailVerification {
    const now = new Date();
    const expiryHours = options?.customExpiryHours || EXPIRY_HOURS;
    const expiryMs = expiryHours * 60 * 60 * 1000;
    const expiresAt = new Date(now.getTime() + expiryMs);
    
    // Generate OTP code
    const codeValue = OtpCode.generate(OtpType.EMAIL);
    const otpCode = new OtpCode(codeValue, OtpType.EMAIL, OtpPurpose.EMAIL_VERIFICATION);
    
    // ✅ Enterprise: Generate magic link token if enabled
    let magicLinkToken: Token | undefined;
    let verificationMethod: VerificationMethod = VerificationMethod.OTP;
    
    if (ENABLE_MAGIC_LINK && options?.useMagicLink) {
      const tokenValue = Token.generate(TokenType.MAGIC_LINK, 64);
      const magicLinkExpiryMs = MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000;
      magicLinkToken = new Token(
        tokenValue,
        TokenType.MAGIC_LINK,
        now,
        new Date(now.getTime() + magicLinkExpiryMs)
      );
      verificationMethod = VerificationMethod.MAGIC_LINK;
    }
    
    const verification = new EmailVerification(
      idGenerator.generate(),
      userId,
      email,
      options?.phone,
      otpCode,
      magicLinkToken,
      EmailVerificationStatus.PENDING,
      expiresAt,
      undefined,
      0,
      undefined,
      0,
      undefined,
      0,
      undefined,
      options?.deviceId,
      options?.ipAddress,
      options?.userAgent,
      verificationMethod,
      undefined,
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
        verificationMethod,
        deviceId: options?.deviceId?.getValue(),
        ipAddress: options?.ipAddress?.getValue(),
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
    phone?: Phone;
    code: OtpCode;
    magicLinkToken?: Token;
    status: EmailVerificationStatus;
    expiresAt: Date;
    verifiedAt?: Date;
    resendCount: number;
    lastResentAt?: Date;
    verificationAttempts: number;
    lastVerificationAttemptAt?: Date;
    rateLimitCount: number;
    rateLimitResetAt?: Date;
    deviceId?: DeviceId;
    ipAddress?: IpAddress;
    userAgent?: string;
    verificationMethod?: VerificationMethod;
    lastNotificationChannel?: NotificationChannel;
    lastNotificationSentAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): EmailVerification {
    return new EmailVerification(
      data.id,
      data.userId,
      data.email,
      data.phone,
      data.code,
      data.magicLinkToken,
      data.status,
      data.expiresAt,
      data.verifiedAt,
      data.resendCount,
      data.lastResentAt,
      data.verificationAttempts,
      data.lastVerificationAttemptAt,
      data.rateLimitCount,
      data.rateLimitResetAt,
      data.deviceId,
      data.ipAddress,
      data.userAgent,
      data.verificationMethod,
      data.lastNotificationChannel,
      data.lastNotificationSentAt,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * ✅ Enterprise: Check rate limit for resend requests
   */
  private checkRateLimit(): boolean {
    const now = new Date();
    
    // Reset rate limit counter if time window expired
    if (this._rateLimitResetAt && now > this._rateLimitResetAt) {
      this._rateLimitCount = 0;
      this._rateLimitResetAt = undefined;
    }
    
    // Initialize rate limit window if not set
    if (!this._rateLimitResetAt) {
      this._rateLimitResetAt = new Date(now.getTime() + 60 * 60 * 1000);
    }
    
    return this._rateLimitCount < RATE_LIMIT_PER_HOUR;
  }

  /**
   * ✅ Enterprise: Increment rate limit counter
   */
  private incrementRateLimit(): void {
    this._rateLimitCount++;
    this.touch();
  }

  /**
   * ✅ Enterprise: Send notification via specific channel
   */
  private sendNotification(channel: NotificationChannel): void {
    this._lastNotificationChannel = channel;
    this._lastNotificationSentAt = new Date();
    this.touch();
    
    const eventType = channel === NotificationChannel.WHATSAPP
      ? EmailVerificationEventType.EMAIL_VERIFICATION_WHATSAPP_SENT
      : EmailVerificationEventType.EMAIL_VERIFICATION_RESENT;
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        email: this._email.getValue(),
        phone: this._phone?.getValue(),
        channel,
        resendCount: this._resendCount,
        remainingAttempts: this.getRemainingResendAttempts(),
      },
    });
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Verify email with OTP code
   * ✅ Enterprise: Enhanced with device tracking
   */
  public verify(
    inputCode: string,
    options?: {
      deviceId?: DeviceId;
      ipAddress?: IpAddress;
    }
  ): boolean {
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
    
    // ✅ Enterprise: Track device/IP changes
    if (options?.deviceId && this._deviceId && !this._deviceId.equals(options.deviceId)) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_DEVICE_CHANGED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          oldDeviceId: this._deviceId.getValue(),
          newDeviceId: options.deviceId.getValue(),
        },
      });
    }
    
    if (options?.ipAddress && this._ipAddress && !this._ipAddress.equals(options.ipAddress)) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_IP_CHANGED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          oldIp: this._ipAddress.getValue(),
          newIp: options.ipAddress.getValue(),
        },
      });
    }
    
    // Track attempt
    this._verificationAttempts++;
    this._lastVerificationAttemptAt = new Date();
    this._verificationMethod = VerificationMethod.OTP;
    
    // Check max attempts
    if (this._verificationAttempts > MAX_VERIFICATION_ATTEMPTS) {
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
          verificationMethod: this._verificationMethod,
          deviceId: options?.deviceId?.getValue(),
          ipAddress: options?.ipAddress?.getValue(),
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
   * ✅ Enterprise: Verify using magic link token
   */
  public verifyMagicLink(token: string): boolean {
    if (!this._magicLinkToken) {
      throw new EntityValidationError('Magic link not available for this verification');
    }
    
    if (this._status !== EmailVerificationStatus.PENDING) {
      throw new EntityValidationError(`Cannot verify: status is ${this._status}`);
    }
    
    if (this.isExpired()) {
      this.expire();
      throw new EntityValidationError('Magic link has expired');
    }
    
    const isValid = this._magicLinkToken.getValue() === token && !this._magicLinkToken.isExpired();
    
    if (isValid) {
      this._status = EmailVerificationStatus.VERIFIED;
      this._verifiedAt = new Date();
      this._verificationMethod = VerificationMethod.MAGIC_LINK;
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
          verificationMethod: VerificationMethod.MAGIC_LINK,
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
      return;
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
   * ✅ Enterprise: Enhanced with rate limiting and WhatsApp support
   * 
   * @param idGenerator - ID generator
   * @param channel - Notification channel (EMAIL or WHATSAPP)
   * @returns New EmailVerification entity
   */
  public resend(
    idGenerator: IdGenerator,
    channel: NotificationChannel = NotificationChannel.EMAIL
  ): EmailVerification {
    // Check if already verified
    if (this._status === EmailVerificationStatus.VERIFIED) {
      throw new EntityValidationError('Email already verified, cannot resend');
    }
    
    // ✅ Enterprise: Check rate limit
    if (!this.checkRateLimit()) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: EmailVerificationEventType.EMAIL_VERIFICATION_RATE_LIMITED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          email: this._email.getValue(),
          rateLimitCount: this._rateLimitCount,
          maxLimit: RATE_LIMIT_PER_HOUR,
        },
      });
      throw new EntityValidationError(
        `Rate limit exceeded. Maximum ${RATE_LIMIT_PER_HOUR} resend requests per hour.`
      );
    }
    
    // Check resend limit
    if (this._resendCount >= MAX_RESEND_COUNT) {
      throw new EntityValidationError(
        `Maximum resend limit (${MAX_RESEND_COUNT}) exceeded`
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
    
    // ✅ Enterprise: Check WhatsApp eligibility
    if (channel === NotificationChannel.WHATSAPP) {
      if (!ENABLE_WHATSAPP_NOTIFICATION) {
        throw new EntityValidationError('WhatsApp notifications are not enabled');
      }
      if (!this._phone) {
        throw new EntityValidationError('Phone number required for WhatsApp notification');
      }
    }
    
    // Generate new OTP code
    const newCodeValue = OtpCode.generate(OtpType.EMAIL);
    const newCode = new OtpCode(newCodeValue, OtpType.EMAIL, OtpPurpose.EMAIL_VERIFICATION);
    
    // Generate new magic link if enabled
    let newMagicLinkToken: Token | undefined;
    if (ENABLE_MAGIC_LINK && this._verificationMethod === VerificationMethod.MAGIC_LINK) {
      const tokenValue = Token.generate(TokenType.MAGIC_LINK, 64);
      const magicLinkExpiryMs = MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000;
      newMagicLinkToken = new Token(
        tokenValue,
        TokenType.MAGIC_LINK,
        new Date(),
        new Date(Date.now() + magicLinkExpiryMs)
      );
    }
    
    // Create new verification
    const newVerification = new EmailVerification(
      idGenerator.generate(),
      this._userId,
      this._email,
      this._phone,
      newCode,
      newMagicLinkToken,
      EmailVerificationStatus.PENDING,
      new Date(Date.now() + EXPIRY_MS),
      undefined,
      0,
      undefined,
      0,
      undefined,
      0,
      undefined,
      this._deviceId,
      this._ipAddress,
      this._userAgent,
      this._verificationMethod,
      undefined,
      undefined,
      new Date(),
      new Date(),
      1
    );
    
    // Update resend tracking on old verification (for audit)
    this._resendCount++;
    this._lastResentAt = new Date();
    this.incrementRateLimit();
    this.sendNotification(channel);
    
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
        channel,
        remainingRateLimit: RATE_LIMIT_PER_HOUR - this._rateLimitCount,
      },
    });
    
    return newVerification;
  }

  /**
   * ✅ Enterprise: Resend via WhatsApp (Bangladesh specific)
   */
  public resendViaWhatsApp(idGenerator: IdGenerator): EmailVerification {
    return this.resend(idGenerator, NotificationChannel.WHATSAPP);
  }

  /**
   * ✅ Enterprise: Get magic link URL
   */
  public getMagicLinkUrl(baseUrl: string): string | null {
    if (!this._magicLinkToken) return null;
    return `${baseUrl}/verify-email?token=${this._magicLinkToken.getValue()}&verificationId=${this.id}`;
  }

  // ============================================================
  // Status Check Methods
  // ============================================================

  /**
   * Check if verification is expired
   */
  public isExpired(): boolean {
    if (this._status === EmailVerificationStatus.EXPIRED) return true;
    if (this._status === EmailVerificationStatus.VERIFIED) return false;
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
  public canResend(channel: NotificationChannel = NotificationChannel.EMAIL): boolean {
    if (this._status === EmailVerificationStatus.VERIFIED) return false;
    if (this._resendCount >= MAX_RESEND_COUNT) return false;
    if (this.getResendCooldownRemaining() > 0) return false;
    if (!this.checkRateLimit()) return false;
    if (channel === NotificationChannel.WHATSAPP && (!this._phone || !ENABLE_WHATSAPP_NOTIFICATION)) return false;
    return true;
  }

  /**
   * ✅ Enterprise: Check if magic link is available
   */
  public hasMagicLink(): boolean {
    return !!(this._magicLinkToken && !this._magicLinkToken.isExpired());
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
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  /**
   * Get resend cooldown remaining (milliseconds)
   */
  public getResendCooldownRemaining(): number {
    if (!this._lastResentAt) return 0;
    const timeSinceLastResend = new Date().getTime() - this._lastResentAt.getTime();
    const remaining = RESEND_COOLDOWN_MS - timeSinceLastResend;
    return remaining > 0 ? remaining : 0;
  }

  // ============================================================
  // Counter Methods
  // ============================================================

  /**
   * Get remaining resend attempts
   */
  public getRemainingResendAttempts(): number {
    return Math.max(0, MAX_RESEND_COUNT - this._resendCount);
  }

  /**
   * Get remaining verification attempts
   */
  public getRemainingVerificationAttempts(): number {
    return Math.max(0, MAX_VERIFICATION_ATTEMPTS - this._verificationAttempts);
  }

  /**
   * Get verification attempts used
   */
  public getVerificationAttemptsUsed(): number {
    return this._verificationAttempts;
  }

  /**
   * ✅ Enterprise: Get remaining rate limit for current hour
   */
  public getRemainingRateLimit(): number {
    return Math.max(0, RATE_LIMIT_PER_HOUR - this._rateLimitCount);
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getEmail(): Email { return this._email; }
  public getPhone(): Phone | undefined { return this._phone; }
  public getCode(): OtpCode { return this._code; }
  public getMagicLinkToken(): Token | undefined { return this._magicLinkToken; }
  public getStatus(): EmailVerificationStatus { return this._status; }
  public getExpiresAt(): Date { return new Date(this._expiresAt); }
  public getVerifiedAt(): Date | undefined { return this._verifiedAt ? new Date(this._verifiedAt) : undefined; }
  public getResendCount(): number { return this._resendCount; }
  public getLastResentAt(): Date | undefined { return this._lastResentAt ? new Date(this._lastResentAt) : undefined; }
  public getLastVerificationAttemptAt(): Date | undefined { 
    return this._lastVerificationAttemptAt ? new Date(this._lastVerificationAttemptAt) : undefined; 
  }
  public getDeviceId(): DeviceId | undefined { return this._deviceId; }
  public getIpAddress(): IpAddress | undefined { return this._ipAddress; }
  public getUserAgent(): string | undefined { return this._userAgent; }
  public getVerificationMethod(): VerificationMethod | undefined { return this._verificationMethod; }
  public getLastNotificationChannel(): NotificationChannel | undefined { return this._lastNotificationChannel; }
  public getLastNotificationSentAt(): Date | undefined { return this._lastNotificationSentAt; }

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
      phone: this._phone?.getValue(),
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
      // ✅ Enterprise: Additional fields
      verificationMethod: this._verificationMethod,
      hasMagicLink: this.hasMagicLink(),
      magicLinkExpiry: this._magicLinkToken?.getExpiresAt()?.toISOString(),
      remainingRateLimit: this.getRemainingRateLimit(),
      deviceId: this._deviceId?.getValue(),
      ipAddress: this._ipAddress?.getValue(),
      lastNotificationChannel: this._lastNotificationChannel,
      lastNotificationSentAt: this._lastNotificationSentAt?.toISOString(),
      canResendViaWhatsApp: this.canResend(NotificationChannel.WHATSAPP),
      // ⚠️ OTP code and magic link token are intentionally excluded for security
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

export type { EmailVerificationConfig, VerificationMetadata };
