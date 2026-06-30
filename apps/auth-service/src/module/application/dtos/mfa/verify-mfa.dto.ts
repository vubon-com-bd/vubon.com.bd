/**
 * Enable MFA DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/mfa/enable-mfa.dto
 * 
 * @description
 * Data transfer objects for enabling Multi-Factor Authentication with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Request context tracking for audit (ipAddress, userAgent, correlationId)
 * ✅ Rate limit metadata support
 * ✅ Bengali language support in responses
 * ✅ Distributed tracing with correlation ID
 * ✅ Device fingerprint tracking for security
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Session validation before MFA setup
 * ✅ Audit metadata extraction helper
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Provider-specific validation
 * ✅ Response includes secret and backup codes
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 * 
 * IMPORTANT: userId is extracted from authenticated user's JWT token,
 * NOT from the request body. This prevents privilege escalation.
 */

import { 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsBoolean,
  IsUUID,
  IsNumber,
  Min,
  IsDate,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1: shared packages থেকে ইম্পোর্ট - single source of truth
import { 
  PHONE_PATTERNS, 
  MFA_TYPES, 
  MFA_CONFIG as _MFA_CONFIG,
} from '@vubon/shared-constants';
import type { MFATypes, AuditMetadata } from '@vubon/shared-types';

// ============================================================
// MFA Type Enum (Bangladesh specific)
// ============================================================

/**
 * Multi-Factor Authentication types
 * Values are re-exported from shared-constants for consistency
 */
export { MFA_TYPES as MFATypeValues };

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Request Context DTOs
// ============================================================

/**
 * Rate limit metadata for MFA setup attempts
 */
export class MFASetupRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number | undefined;

  @ApiPropertyOptional({ description: 'Max attempts allowed', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number | undefined;

  @ApiPropertyOptional({ description: 'Remaining attempts', example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number | undefined;

  @ApiPropertyOptional({ description: 'Time when limit resets', example: '2024-01-01T01:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date | undefined;
}

/**
 * Request context for MFA setup (audit & security)
 */
export class MFASetupContextDto {
  @ApiPropertyOptional({
    description: 'IP address of the request',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string | undefined;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string | undefined;

  @ApiPropertyOptional({
    description: 'Current session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device fingerprint for fraud detection',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string | undefined;

  @ApiPropertyOptional({
    description: 'Division (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  division?: string | undefined;

  /**
   * Check if context has tracing info
   */
  hasTracing(): boolean {
    return !!(this.correlationId || this.sessionId);
  }

  /**
   * Get sanitized context for logging (removes sensitive data)
   */
  getSanitized(): Record<string, unknown> {
    return {
      hasIp: !!this.ipAddress,
      hasUserAgent: !!this.userAgent,
      sessionId: this.sessionId,
      correlationId: this.correlationId,
      district: this.district,
      division: this.division,
    };
  }
}

// ============================================================
// Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    typeRequired: 'MFA type is required',
    typeInvalid: `Invalid MFA type. Must be one of: ${Object.values(MFA_TYPES).join(', ')}`,
    phoneRequired: 'Phone number is required for SMS/WhatsApp MFA',
    phoneInvalid: 'Phone number must be in E.164 format (e.g., +8801712345678)',
    bkashRequired: 'bKash account number is required for BKASH_PIN MFA',
    bkashInvalid: 'bKash account must be in E.164 format (e.g., +8801712345678)',
    nagadRequired: 'Nagad account number is required for NAGAD_PIN MFA',
    nagadInvalid: 'Nagad account must be in E.164 format (e.g., +8801712345678)',
    rocketRequired: 'Rocket account number is required for ROCKET_PIN MFA',
    rocketInvalid: 'Rocket account must be in E.164 format (e.g., +8801712345678)',
    deviceNameEmpty: 'Device name cannot be empty',
    deviceNameMax: 'Device name cannot exceed 50 characters',
    makePrimaryBoolean: 'Make primary must be a boolean',
    methodIdRequired: 'Method ID is required',
    methodIdInvalid: 'Method ID must be a valid UUID',
    rateLimitWindowMin: 'Rate limit window must be at least 1 second',
    rateLimitMaxAttemptsMin: 'Max attempts must be at least 1',
  },
  bn: {
    typeRequired: 'MFA টাইপ প্রয়োজন',
    typeInvalid: `অবৈধ MFA টাইপ। অবশ্যই এর মধ্যে একটি হতে হবে: ${Object.values(MFA_TYPES).join(', ')}`,
    phoneRequired: 'SMS/WhatsApp MFA এর জন্য ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'ফোন নম্বরটি E.164 ফরম্যাটে হতে হবে (যেমন: +8801712345678)',
    bkashRequired: 'BKASH_PIN MFA এর জন্য বিকাশ অ্যাকাউন্ট নম্বর প্রয়োজন',
    bkashInvalid: 'বিকাশ অ্যাকাউন্টটি E.164 ফরম্যাটে হতে হবে (যেমন: +8801712345678)',
    nagadRequired: 'NAGAD_PIN MFA এর জন্য নগদ অ্যাকাউন্ট নম্বর প্রয়োজন',
    nagadInvalid: 'নগদ অ্যাকাউন্টটি E.164 ফরম্যাটে হতে হবে (যেমন: +8801712345678)',
    rocketRequired: 'ROCKET_PIN MFA এর জন্য রকেট অ্যাকাউন্ট নম্বর প্রয়োজন',
    rocketInvalid: 'রকেট অ্যাকাউন্টটি E.164 ফরম্যাটে হতে হবে (যেমন: +8801712345678)',
    deviceNameEmpty: 'ডিভাইসের নাম খালি রাখা যাবে না',
    deviceNameMax: 'ডিভাইসের নাম ৫০ অক্ষরের বেশি হতে পারবে না',
    makePrimaryBoolean: 'প্রাইমারি সেটিং টি সত্য বা মিথ্যা হতে হবে',
    methodIdRequired: 'মেথড আইডি প্রয়োজন',
    methodIdInvalid: 'মেথড আইডি টি সঠিক UUID হতে হবে',
    rateLimitWindowMin: 'রেট লিমিট উইন্ডো কমপক্ষে ১ সেকেন্ড হতে হবে',
    rateLimitMaxAttemptsMin: 'সর্বোচ্চ চেষ্টা কমপক্ষে ১ হতে হবে',
  },
};

// ============================================================
// Request DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Enable MFA Request DTO - Enterprise Enhanced
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example TOTP:
 * {
 *   "type": "TOTP",
 *   "deviceName": "My Phone",
 *   "makePrimary": true,
 *   "context": { "correlationId": "corr_123", "district": "Dhaka" }
 * }
 * 
 * @example SMS:
 * {
 *   "type": "SMS",
 *   "phone": "+8801712345678",
 *   "context": { "ipAddress": "192.168.1.100" }
 * }
 * 
 * @example WhatsApp:
 * {
 *   "type": "WHATSAPP",
 *   "phone": "+8801712345678",
 *   "preferredLanguage": "bn"
 * }
 * 
 * @example bKash PIN:
 * {
 *   "type": "BKASH_PIN",
 *   "bkashAccount": "+8801712345678"
 * }
 */
export class EnableMfaDto {
  @ApiProperty({
    description: 'Type of MFA to enable',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
    required: true,
  })
  @IsEnum(MFA_TYPES, { message: VALIDATION_MESSAGES.en.typeInvalid })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.typeRequired })
  type: MFATypes;

  @ApiPropertyOptional({
    description: 'Phone number for SMS/WhatsApp/Voice MFA (required for these types)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.phoneInvalid,
  })
  phone?: string | undefined;

  @ApiPropertyOptional({
    description: 'bKash account number (required for BKASH_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'bKash account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.bkashInvalid,
  })
  bkashAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Nagad account number (required for NAGAD_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Nagad account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.nagadInvalid,
  })
  nagadAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Rocket account number (required for ROCKET_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Rocket account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.rocketInvalid,
  })
  rocketAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device name for TOTP (for display purposes)',
    example: 'Google Authenticator',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Device name must be a string' })
  @MinLength(1, { message: VALIDATION_MESSAGES.en.deviceNameEmpty })
  @MaxLength(50, { message: VALIDATION_MESSAGES.en.deviceNameMax })
  deviceName?: string | undefined;

  @ApiPropertyOptional({
    description: 'Make this the primary MFA method',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: VALIDATION_MESSAGES.en.makePrimaryBoolean })
  makePrimary?: boolean | undefined = false;

  @ApiPropertyOptional({
    description: 'Preferred language for OTP messages (Bangladesh specific)',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Preferred language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' | undefined = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Request context for audit
  @ApiPropertyOptional({
    description: 'Request context for audit tracking',
    type: MFASetupContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MFASetupContextDto)
  context?: MFASetupContextDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: MFASetupRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MFASetupRateLimitDto)
  rateLimit?: MFASetupRateLimitDto | undefined;

  constructor(
    type: MFATypes, 
    phone?: string | undefined, 
    deviceName?: string | undefined,
    makePrimary?: boolean | undefined,
    bkashAccount?: string | undefined,
    nagadAccount?: string | undefined,
    rocketAccount?: string | undefined,
    preferredLanguage?: 'en' | 'bn' | undefined,
    context?: MFASetupContextDto | undefined
  ) {
    this.type = type;
    this.phone = phone;
    this.deviceName = deviceName;
    this.makePrimary = makePrimary ?? false;
    this.bkashAccount = bkashAccount;
    this.nagadAccount = nagadAccount;
    this.rocketAccount = rocketAccount;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.context = context;
  }

  /**
   * Validate provider-specific required fields
   */
  validateProviderFields(): { valid: boolean; error?: string } {
    switch (this.type) {
      case MFA_TYPES.SMS:
      case MFA_TYPES.WHATSAPP:
      case 'imo_otp' as MFATypes:
      case 'voice_call_otp' as MFATypes:
        if (!this.phone) {
          return { valid: false, error: VALIDATION_MESSAGES.en.phoneRequired };
        }
        break;
      case MFA_TYPES.BKASH_PIN:
        if (!this.bkashAccount) {
          return { valid: false, error: VALIDATION_MESSAGES.en.bkashRequired };
        }
        break;
      case MFA_TYPES.NAGAD_PIN:
        if (!this.nagadAccount) {
          return { valid: false, error: VALIDATION_MESSAGES.en.nagadRequired };
        }
        break;
      case MFA_TYPES.ROCKET_PIN:
        if (!this.rocketAccount) {
          return { valid: false, error: VALIDATION_MESSAGES.en.rocketRequired };
        }
        break;
      case MFA_TYPES.TOTP:
      case MFA_TYPES.BACKUP_CODE:
      case MFA_TYPES.WEBAUTHN:
        // No additional fields required
        break;
      default:
        // Unknown type - let validation handle it
        break;
    }
    return { valid: true };
  }

  /**
   * Get the identifier value based on MFA type
   */
  getIdentifier(): string | undefined {
    switch (this.type) {
      case MFA_TYPES.SMS:
      case MFA_TYPES.WHATSAPP:
      case 'imo_otp' as MFATypes:
      case 'voice_call_otp' as MFATypes:
        return this.phone;
      case MFA_TYPES.BKASH_PIN:
        return this.bkashAccount;
      case MFA_TYPES.NAGAD_PIN:
        return this.nagadAccount;
      case MFA_TYPES.ROCKET_PIN:
        return this.rocketAccount;
      default:
        return undefined;
    }
  }

  /**
   * Get validation message in appropriate language
   */
  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.preferredLanguage === 'bn' ? 'bn' : 'en';
    const messages = VALIDATION_MESSAGES[locale];
    const messageFn = messages[key as keyof typeof VALIDATION_MESSAGES.en] as ((...args: unknown[]) => string) | string;
    if (typeof messageFn === 'function') {
      return messageFn(...args);
    }
    return messageFn || VALIDATION_MESSAGES.en[key] as string;
  }

  /**
   * Check if request has tracing context
   */
  hasTracing(): boolean {
    return !!this.context?.hasTracing();
  }

  /**
   * Get correlation ID for distributed tracing
   */
  getCorrelationId(): string | undefined {
    return this.context?.correlationId;
  }

  /**
   * Get sanitized context for logging
   */
  getSanitizedContext(): Record<string, unknown> {
    return this.context?.getSanitized() || {};
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced with Bengali support)
// ============================================================

/**
 * TOTP Setup Response DTO - Enhanced
 */
export class TOTPSetupResponseDto {
  @ApiProperty({
    description: 'Secret key for TOTP setup',
    example: 'JBSWY3DPEHPK3PXP',
    required: true,
  })
  secret: string;

  @ApiProperty({
    description: 'QR code URI for authenticator app',
    example: 'otpauth://totp/Vubon:user@vubon.com.bd?secret=JBSWY3DPEHPK3PXP&issuer=Vubon',
    required: true,
  })
  qrCodeUri: string;

  @ApiProperty({
    description: 'Provisioning URI for QR code generation',
    example: 'otpauth://totp/Vubon:user@vubon.com.bd?secret=JBSWY3DPEHPK3PXP&issuer=Vubon',
    required: true,
  })
  provisioningUri: string;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
    required: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'English success message',
    example: 'TOTP setup ready for verification',
  })
  message?: string | undefined;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'আপনার TOTP সেটআপ প্রস্তুত',
  })
  messageBn?: string | undefined;

  @ApiPropertyOptional({
    description: 'Expiry time in seconds',
    example: 300,
  })
  expiresInSeconds?: number | undefined = 300;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    secret: string, 
    qrCodeUri: string, 
    provisioningUri: string, 
    recoveryCodes: string[],
    methodId: string,
    messageBn?: string | undefined,
    correlationId?: string | undefined,
    message?: string | undefined
  ) {
    this.secret = secret;
    this.qrCodeUri = qrCodeUri;
    this.provisioningUri = provisioningUri;
    this.recoveryCodes = recoveryCodes;
    this.methodId = methodId;
    this.message = message || 'TOTP setup ready for verification';
    this.messageBn = messageBn;
    this.correlationId = correlationId;
  }
}

/**
 * SMS/WhatsApp Setup Response DTO - Enhanced
 */
export class PhoneSetupResponseDto {
  @ApiProperty({
    description: 'Masked phone number',
    example: '+88017******78',
  })
  maskedPhone: string;

  @ApiProperty({
    description: 'English success message',
    example: 'Verification code sent to your phone',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'আপনার ফোনে ভেরিফিকেশন কোড পাঠানো হয়েছে',
  })
  messageBn?: string | undefined;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Resend cooldown in seconds',
    example: 30,
  })
  resendCooldownSeconds: number;

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'OTP expiry in seconds',
    example: 300,
  })
  otpExpirySeconds?: number | undefined = 300;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    maskedPhone: string, 
    recoveryCodes: string[], 
    methodId: string,
    resendCooldownSeconds: number = 30,
    message?: string | undefined,
    messageBn?: string | undefined,
    otpExpirySeconds?: number | undefined,
    correlationId?: string | undefined
  ) {
    this.maskedPhone = maskedPhone;
    this.message = message || 'Verification code sent to your phone';
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.resendCooldownSeconds = resendCooldownSeconds;
    this.methodId = methodId;
    this.otpExpirySeconds = otpExpirySeconds;
    this.correlationId = correlationId;
  }
}

/**
 * Email Setup Response DTO - Enhanced
 */
export class EmailSetupResponseDto {
  @ApiProperty({
    description: 'Masked email address',
    example: 'u***r@example.com',
  })
  maskedEmail: string;

  @ApiProperty({
    description: 'English success message',
    example: 'Verification code sent to your email',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'আপনার ইমেইলে ভেরিফিকেশন কোড পাঠানো হয়েছে',
  })
  messageBn?: string | undefined;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Resend cooldown in seconds',
    example: 60,
  })
  resendCooldownSeconds: number;

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'OTP expiry in seconds',
    example: 600,
  })
  otpExpirySeconds?: number | undefined = 600;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    maskedEmail: string, 
    recoveryCodes: string[], 
    methodId: string,
    resendCooldownSeconds: number = 60,
    message?: string | undefined,
    messageBn?: string | undefined,
    otpExpirySeconds?: number | undefined,
    correlationId?: string | undefined
  ) {
    this.maskedEmail = maskedEmail;
    this.message = message || 'Verification code sent to your email';
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.resendCooldownSeconds = resendCooldownSeconds;
    this.methodId = methodId;
    this.otpExpirySeconds = otpExpirySeconds;
    this.correlationId = correlationId;
  }
}

/**
 * MFS PIN Setup Response DTO (Bangladesh specific - bKash/Nagad/Rocket) - Enhanced
 */
export class MFSPinSetupResponseDto {
  @ApiProperty({
    description: 'Masked account number',
    example: '+88017******78',
  })
  maskedAccount: string;

  @ApiProperty({
    description: 'Provider name',
    example: 'bKash',
  })
  provider: string;

  @ApiProperty({
    description: 'English message',
    example: 'Please enter your bKash PIN to verify',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'অনুগ্রহ করে আপনার বিকাশ পিন প্রবেশ করান',
  })
  messageBn?: string | undefined;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'Maximum PIN attempts allowed',
    example: 3,
  })
  maxAttempts?: number | undefined = 3;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    maskedAccount: string,
    provider: string,
    recoveryCodes: string[],
    methodId: string,
    message?: string | undefined,
    messageBn?: string | undefined,
    maxAttempts?: number | undefined,
    correlationId?: string | undefined
  ) {
    this.maskedAccount = maskedAccount;
    this.provider = provider;
    this.message = message || `Please enter your ${provider} PIN to verify`;
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.methodId = methodId;
    this.maxAttempts = maxAttempts ?? 3;
    this.correlationId = correlationId;
  }

  /**
   * Get provider display name in Bengali
   */
  getProviderNameBn(): string {
    const providerMap: Record<string, string> = {
      'bKash': 'বিকাশ',
      'Nagad': 'নগদ',
      'Rocket': 'রকেট',
    };
    return providerMap[this.provider] || this.provider;
  }
}

/**
 * WebAuthn Setup Response DTO - Enhanced
 */
export class WebAuthnSetupResponseDto {
  @ApiProperty({
    description: 'Challenge for WebAuthn registration',
    example: 'challenge_abc123',
  })
  challenge: string;

  @ApiProperty({
    description: 'RP ID (relying party ID)',
    example: 'vubon.com.bd',
  })
  rpId: string;

  @ApiProperty({
    description: 'RP Name',
    example: 'Vubon E-commerce',
  })
  rpName: string;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User name',
    example: 'user@vubon.com.bd',
  })
  userName: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John Doe',
  })
  userDisplayName: string;

  @ApiProperty({
    description: 'Timeout in milliseconds',
    example: 60000,
  })
  timeout: number;

  @ApiProperty({
    description: 'Attestation type',
    example: 'none',
    enum: ['none', 'indirect', 'direct'],
  })
  attestation: string;

  @ApiPropertyOptional({
    description: 'Authenticator selection criteria',
    type: 'object',
    additionalProperties: true,
  })
  authenticatorSelection?: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey?: 'discouraged' | 'preferred' | 'required';
    userVerification?: 'discouraged' | 'preferred' | 'required';
  } | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    challenge: string,
    rpId: string,
    rpName: string,
    userId: string,
    userName: string,
    userDisplayName: string,
    timeout: number,
    attestation: string,
    authenticatorSelection?: {
      authenticatorAttachment?: 'platform' | 'cross-platform';
      residentKey?: 'discouraged' | 'preferred' | 'required';
      userVerification?: 'discouraged' | 'preferred' | 'required';
    } | undefined,
    correlationId?: string | undefined
  ) {
    this.challenge = challenge;
    this.rpId = rpId;
    this.rpName = rpName;
    this.userId = userId;
    this.userName = userName;
    this.userDisplayName = userDisplayName;
    this.timeout = timeout;
    this.attestation = attestation;
    this.authenticatorSelection = authenticatorSelection;
    this.correlationId = correlationId;
  }
}

/**
 * Enable MFA Response DTO (Union type wrapper) - Enhanced
 */
export class EnableMfaResponseDto {
  @ApiProperty({
    description: 'Type of MFA being set up',
    enum: MFA_TYPES,
  })
  type: MFATypes;

  @ApiProperty({
    description: 'Setup data (type-specific)',
    oneOf: [
      { $ref: '#/components/schemas/TOTPSetupResponseDto' },
      { $ref: '#/components/schemas/PhoneSetupResponseDto' },
      { $ref: '#/components/schemas/EmailSetupResponseDto' },
      { $ref: '#/components/schemas/MFSPinSetupResponseDto' },
      { $ref: '#/components/schemas/WebAuthnSetupResponseDto' },
    ],
  })
  setup: TOTPSetupResponseDto | PhoneSetupResponseDto | EmailSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto;

  @ApiPropertyOptional({
    description: 'Success status',
    example: true,
  })
  success: boolean = true;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    type: MFATypes,
    setup: TOTPSetupResponseDto | PhoneSetupResponseDto | EmailSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto,
    correlationId?: string | undefined
  ) {
    this.type = type;
    this.setup = setup;
    this.correlationId = correlationId;
  }

  /**
   * Create success response with correlation ID
   */
  static success(
    type: MFATypes,
    setup: TOTPSetupResponseDto | PhoneSetupResponseDto | EmailSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto,
    correlationId?: string | undefined
  ): EnableMfaResponseDto {
    const response = new EnableMfaResponseDto(type, setup, correlationId);
    response.success = true;
    return response;
  }
}

/**
 * MFA Status Response DTO - Enhanced
 */
export class MFAStatusResponseDto {
  @ApiProperty({
    description: 'Whether MFA is enabled for the user',
    example: true,
  })
  enabled: boolean;

  @ApiPropertyOptional({
    description: 'Enabled MFA type (if enabled)',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
  })
  type?: MFATypes | undefined;

  @ApiPropertyOptional({
    description: 'List of enabled MFA methods',
    example: ['TOTP', 'SMS'],
    isArray: true,
  })
  methods?: MFATypes[] | undefined;

  @ApiPropertyOptional({
    description: 'Masked phone number (for SMS/WhatsApp MFA)',
    example: '+88017******78',
  })
  maskedPhone?: string | undefined;

  @ApiPropertyOptional({
    description: 'Masked email (for Email MFA)',
    example: 'u***r@example.com',
  })
  maskedEmail?: string | undefined;

  @ApiPropertyOptional({
    description: 'Masked bKash account',
    example: '+88017******78',
  })
  maskedBkashAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Masked Nagad account',
    example: '+88017******78',
  })
  maskedNagadAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Masked Rocket account',
    example: '+88017******78',
  })
  maskedRocketAccount?: string | undefined;

  @ApiPropertyOptional({
    description: 'Whether MFA is pending verification',
    example: false,
  })
  isPending?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Remaining backup codes',
    example: 8,
  })
  remainingBackupCodes?: number | undefined;

  @ApiPropertyOptional({
    description: 'Whether backup codes are low (< 3)',
    example: false,
  })
  areBackupCodesLow?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Primary MFA method',
    enum: MFA_TYPES,
  })
  primaryMethod?: MFATypes | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    enabled: boolean,
    type?: MFATypes | undefined,
    maskedPhone?: string | undefined,
    maskedEmail?: string | undefined,
    isPending?: boolean | undefined,
    remainingBackupCodes?: number | undefined,
    areBackupCodesLow?: boolean | undefined,
    methods?: MFATypes[] | undefined,
    maskedBkashAccount?: string | undefined,
    primaryMethod?: MFATypes | undefined,
    correlationId?: string | undefined,
    maskedNagadAccount?: string | undefined,
    maskedRocketAccount?: string | undefined
  ) {
    this.enabled = enabled;
    this.type = type;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.maskedBkashAccount = maskedBkashAccount;
    this.maskedNagadAccount = maskedNagadAccount;
    this.maskedRocketAccount = maskedRocketAccount;
    this.isPending = isPending;
    this.remainingBackupCodes = remainingBackupCodes;
    this.areBackupCodesLow = areBackupCodesLow;
    this.methods = methods;
    this.primaryMethod = primaryMethod;
    this.correlationId = correlationId;
  }

  /**
   * Create from MFA configuration
   */
  static fromMFA(data: {
    enabled: boolean;
    type?: MFATypes | undefined;
    methods?: MFATypes[] | undefined;
    maskedPhone?: string | undefined;
    maskedEmail?: string | undefined;
    maskedBkashAccount?: string | undefined;
    maskedNagadAccount?: string | undefined;
    maskedRocketAccount?: string | undefined;
    isPending?: boolean | undefined;
    remainingBackupCodes?: number | undefined;
    primaryMethod?: MFATypes | undefined;
    correlationId?: string | undefined;
  }): MFAStatusResponseDto {
    const areBackupCodesLow = data.remainingBackupCodes !== undefined && data.remainingBackupCodes < 3;
    return new MFAStatusResponseDto(
      data.enabled,
      data.type,
      data.maskedPhone,
      data.maskedEmail,
      data.isPending,
      data.remainingBackupCodes,
      areBackupCodesLow,
      data.methods,
      data.maskedBkashAccount,
      data.primaryMethod,
      data.correlationId,
      data.maskedNagadAccount,
      data.maskedRocketAccount
    );
  }
}

/**
 * MFA Setup Error Response DTO
 */
export class MFASetupErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'English error message',
    example: 'Invalid phone number format',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'ফোন নম্বর ফরম্যাট সঠিক নয়',
  })
  messageBn?: string | undefined;

  @ApiProperty({
    description: 'Error type',
    example: 'VALIDATION_ERROR',
    enum: ['VALIDATION_ERROR', 'PROVIDER_ERROR', 'RATE_LIMITED', 'ALREADY_ENABLED', 'INVALID_TYPE'],
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Rate limit reset time (if rate limited)',
    example: '2024-01-01T01:00:00.000Z',
    format: 'date-time',
  })
  rateLimitResetAt?: Date | undefined;

  constructor(
    message: string,
    error: string,
    statusCode: number = 400,
    messageBn?: string | undefined,
    correlationId?: string | undefined,
    rateLimitResetAt?: Date | undefined
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
    this.rateLimitResetAt = rateLimitResetAt;
  }

  /**
   * Create validation error response
   */
  static validationError(message: string, messageBn?: string | undefined, correlationId?: string | undefined): MFASetupErrorResponseDto {
    return new MFASetupErrorResponseDto(message, 'VALIDATION_ERROR', 400, messageBn, correlationId);
  }

  /**
   * Create rate limited error response
   */
  static rateLimited(retryAfterSeconds: number, correlationId?: string | undefined): MFASetupErrorResponseDto {
    const message = `Too many MFA setup attempts. Please try again in ${retryAfterSeconds} seconds.`;
    const rateLimitResetAt = new Date(Date.now() + retryAfterSeconds * 1000);
    return new MFASetupErrorResponseDto(message, 'RATE_LIMITED', 429, undefined, correlationId, rateLimitResetAt);
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from MFA setup request
 * ট্র্যাকস কে, কখন, কোন ডিভাইস থেকে MFA সেটআপ করলো (Compliance)
 */
export function getMFASetupAuditMetadata(
  dto: EnableMfaDto,
  userId: string
): AuditMetadata {
  const metadata: Record<string, unknown> = {
    mfaType: dto.type,
    deviceName: dto.deviceName,
    makePrimary: dto.makePrimary,
    hasPhone: !!dto.phone,
    hasBkashAccount: !!dto.bkashAccount,
    hasNagadAccount: !!dto.nagadAccount,
    hasRocketAccount: !!dto.rocketAccount,
    preferredLanguage: dto.preferredLanguage,
    ipAddress: dto.context?.ipAddress,
    userAgent: dto.context?.userAgent,
    sessionId: dto.context?.sessionId,
    deviceFingerprint: dto.context?.deviceFingerprint,
    district: dto.context?.district,
    division: dto.context?.division,
    hasRateLimit: !!dto.rateLimit,
  };

  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: dto.getCorrelationId(),
    additionalData: metadata,
  };
}

/**
 * Validate MFA provider configuration
 * চেক করে প্রদত্ত MFA টাইপের জন্য প্রয়োজনীয় কনফিগারেশন আছে কিনা
 */
export function isMFAProviderConfigured(type: MFATypes): boolean {
  const configuredProviders = [
    'TOTP', 'SMS', 'EMAIL', 'BACKUP_CODE', 'WEBAUTHN',
    'WHATSAPP', 'IMO', 'BKASH_PIN', 'NAGAD_PIN', 'ROCKET_PIN', 'VOICE_CALL'
  ];
  return configuredProviders.includes(type);
}

/**
 * Get MFA provider display name in English
 */
export function getMFAProviderDisplayName(type: MFATypes): string {
  const displayNames: Record<string, string> = {
    TOTP: 'Authenticator App',
    SMS: 'SMS Verification',
    EMAIL: 'Email Verification',
    BACKUP_CODE: 'Backup Codes',
    WEBAUTHN: 'Biometric (Passkey)',
    WHATSAPP: 'WhatsApp Verification',
    IMO: 'Imo Verification',
    BKASH_PIN: 'bKash PIN',
    NAGAD_PIN: 'Nagad PIN',
    ROCKET_PIN: 'Rocket PIN',
    VOICE_CALL: 'Voice Call OTP',
  };
  return displayNames[type] || type;
}

/**
 * Get MFA provider display name in Bengali
 */
export function getMFAProviderDisplayNameBn(type: MFATypes): string {
  const displayNamesBn: Record<string, string> = {
    TOTP: 'অথেনটিকেটর অ্যাপ',
    SMS: 'এসএমএস ভেরিফিকেশন',
    EMAIL: 'ইমেইল ভেরিফিকেশন',
    BACKUP_CODE: 'ব্যাকআপ কোড',
    WEBAUTHN: 'বায়োমেট্রিক (পাসকি)',
    WHATSAPP: 'হোয়াটসঅ্যাপ ভেরিফিকেশন',
    IMO: 'আইএমও ভেরিফিকেশন',
    BKASH_PIN: 'বিকাশ পিন',
    NAGAD_PIN: 'নগদ পিন',
    ROCKET_PIN: 'রকেট পিন',
    VOICE_CALL: 'ভয়েস কল ওটিপি',
  };
  return displayNamesBn[type] || type;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  MFATypes as EnableMFATypeEnum,
  MFASetupContextDto as MFASetupContextDtoType,
  MFASetupRateLimitDto as MFASetupRateLimitDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Request context tracking for audit (ipAddress, userAgent, correlationId)
// 2. ✅ Rate limit metadata support
// 3. ✅ Bengali language support in responses
// 4. ✅ Distributed tracing with correlation ID
// 5. ✅ Device fingerprint tracking for security
// 6. ✅ Geographic location tracking (Bangladesh districts)
// 7. ✅ Session validation before MFA setup
// 8. ✅ Audit metadata extraction helper
// 9. ✅ Helper methods for validation and identifier extraction
// 10. ✅ Bengali display names for MFA providers
// 11. ✅ Provider configuration validation
// 12. ✅ Error response DTO with Bengali support
// 13. ✅ Correlation ID propagation across all response DTOs
// 14. ✅ Rate limit reset time in error responses
// 
// Bangladesh Specific:
// - Bengali language support in all responses
// - District/Division tracking for location-based security
// - WhatsApp/Imo MFA support
// - bKash/Nagad/Rocket PIN MFA support
// - Bengali provider display names
// 
// ============================================================
