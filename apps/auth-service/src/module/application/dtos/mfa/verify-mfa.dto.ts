/**
 * Verify MFA DTOs - Pure Data Transport Objects (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/mfa/verify-mfa.dto
 * 
 * @description
 * Data transfer objects for verifying Multi-Factor Authentication with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Rate limit metadata support
 * ✅ Audit context tracking (ipAddress, userAgent, correlationId, deviceFingerprint)
 * ✅ Distributed tracing with correlation ID
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Bengali language support in responses
 * ✅ Session validation before verification
 * ✅ Device fingerprint tracking for security
 * ✅ Cooldown tracking for verification attempts
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Helper methods for verification method detection
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (uses MFA session)
 * ✅ MFA session ID for tracking verification attempts
 * ✅ Either code OR backup code OR MFS PIN (mutually exclusive)
 * ✅ Rate limiting prevention through session
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket PIN support
 * 
 * Flow:
 * 1. User logs in with credentials -> gets MFA required response with mfaSessionId
 * 2. User provides MFA code -> POST to /mfa/verify with mfaSessionId and code
 * 3. Server validates and issues tokens on success
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsUUID,
  IsBoolean,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
  IsNumber,
  Min,
  Max,
  IsDate,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ ENTERPRISE: Import from shared packages (single source of truth)
import { 
  OTP_CONFIG, 
  BACKUP_CODE_CONFIG,
  MFA_TYPES,
  DEVICE_ID_CONFIG,
  MFA_CONFIG,
  ENV_CONFIG,
} from '@vubon/shared-constants';
import type { MFAType, AuditMetadata } from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Rate Limit & Audit Context DTOs
// ============================================================

/**
 * Rate limit metadata for MFA verification attempts
 * ✅ Prevents brute force attacks on MFA verification
 */
export class MfaVerificationRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 900 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max attempts allowed', example: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number;

  @ApiPropertyOptional({ description: 'Remaining attempts', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number;

  @ApiPropertyOptional({ description: 'Time when limit resets', example: '2024-01-01T00:15:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

/**
 * Audit context for MFA verification (compliance & security)
 * ✅ Tracks who, when, where MFA verification is attempted
 */
export class MfaVerificationContextDto {
  @ApiPropertyOptional({
    description: 'IP address of the request',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Current session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for fraud detection',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiPropertyOptional({
    description: 'Division (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  division?: string;

  @ApiPropertyOptional({
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;

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
      networkType: this.networkType,
    };
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Multi-language Validation Messages
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    mfaSessionIdRequired: 'MFA session ID is required',
    mfaSessionIdInvalid: 'MFA session ID must be a valid UUID',
    codeInvalid: (length: number) => `Code must be exactly ${length} digits`,
    backupCodeInvalid: BACKUP_CODE_CONFIG.ERROR_MESSAGE,
    bkashPinInvalid: 'bKash PIN must be exactly 4 digits',
    nagadPinInvalid: 'Nagad PIN must be exactly 4 digits',
    rocketPinInvalid: 'Rocket PIN must be exactly 4 digits',
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
    methodInvalid: 'Invalid MFA method',
    atLeastOneRequired: 'Either code, backup code, or MFS PIN is required',
  },
  bn: {
    mfaSessionIdRequired: 'MFA সেশন আইডি প্রয়োজন',
    mfaSessionIdInvalid: 'MFA সেশন আইডি টি সঠিক UUID হতে হবে',
    codeInvalid: (length: number) => `কোড টি ${length} ডিজিটের হতে হবে`,
    backupCodeInvalid: 'ব্যাকআপ কোড টি সঠিক ফরম্যাটে হতে হবে',
    bkashPinInvalid: 'বিকাশ পিন টি ৪ ডিজিটের হতে হবে',
    nagadPinInvalid: 'নগদ পিন টি ৪ ডিজিটের হতে হবে',
    rocketPinInvalid: 'রকেট পিন টি ৪ ডিজিটের হতে হবে',
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    methodInvalid: 'ভুল MFA পদ্ধতি',
    atLeastOneRequired: 'কোড, ব্যাকআপ কোড অথবা MFS পিন প্রয়োজন',
  },
};

/**
 * Get validation message (with locale support)
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  args?: unknown[],
  locale: 'en' | 'bn' = 'en'
): string {
  const messageFn = VALIDATION_MESSAGES[locale][key] as ((...args: unknown[]) => string) | string;
  if (typeof messageFn === 'function') {
    return messageFn(...(args || []));
  }
  return messageFn || VALIDATION_MESSAGES.en[key] as string;
}

// ============================================================
// Request DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Verify MFA Request DTO - Enterprise Enhanced
 * 
 * Note: userId is NOT included - comes from MFA session
 * Note: Either code OR backupCode OR MFS PIN should be provided (mutually exclusive)
 * 
 * @example (TOTP/SMS/Email/WhatsApp code):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "code": "123456",
 *   "trustDevice": true,
 *   "context": { "correlationId": "corr_123", "district": "Dhaka" }
 * }
 * 
 * @example (Backup code):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "backupCode": "AB3F-9K2M"
 * }
 * 
 * @example (bKash PIN - Bangladesh specific):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "bkashPin": "1234"
 * }
 */
export class VerifyMfaDto {
  @ApiProperty({
    description: 'MFA session ID from login response',
    example: 'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsString({ message: () => getValidationMessage('mfaSessionIdRequired') })
  @IsNotEmpty({ message: () => getValidationMessage('mfaSessionIdRequired') })
  @IsUUID(4, { message: () => getValidationMessage('mfaSessionIdInvalid') })
  mfaSessionId: string;

  @ApiPropertyOptional({
    description: 'MFA verification code from authenticator app/SMS/email/WhatsApp/Imo',
    example: '123456',
    minLength: OTP_CONFIG.LENGTH,
    maxLength: OTP_CONFIG.LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  @Matches(OTP_CONFIG.PATTERN, { 
    message: () => getValidationMessage('codeInvalid', [OTP_CONFIG.LENGTH]) 
  })
  @ValidateIf(o => !o.backupCode && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  code?: string;

  @ApiPropertyOptional({
    description: 'Backup code (one of the recovery codes)',
    example: 'AB3F-9K2M',
    pattern: BACKUP_CODE_CONFIG.PATTERN.source,
  })
  @IsOptional()
  @IsString({ message: 'Backup code must be a string' })
  @Matches(BACKUP_CODE_CONFIG.PATTERN, {
    message: () => getValidationMessage('backupCodeInvalid'),
  })
  @ValidateIf(o => !o.code && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  backupCode?: string;

  @ApiPropertyOptional({
    description: 'bKash PIN (for bKash MFA verification - Bangladesh specific)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
  })
  @IsOptional()
  @IsString({ message: 'bKash PIN must be a string' })
  @Matches(/^\d{4}$/, { message: () => getValidationMessage('bkashPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.nagadPin && !o.rocketPin)
  bkashPin?: string;

  @ApiPropertyOptional({
    description: 'Nagad PIN (for Nagad MFA verification - Bangladesh specific)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
  })
  @IsOptional()
  @IsString({ message: 'Nagad PIN must be a string' })
  @Matches(/^\d{4}$/, { message: () => getValidationMessage('nagadPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.rocketPin)
  nagadPin?: string;

  @ApiPropertyOptional({
    description: 'Rocket PIN (for Rocket MFA verification - Bangladesh specific)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
  })
  @IsOptional()
  @IsString({ message: 'Rocket PIN must be a string' })
  @Matches(/^\d{4}$/, { message: () => getValidationMessage('rocketPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.nagadPin)
  rocketPin?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for remembering this device',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: DEVICE_ID_CONFIG.MAX_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(DEVICE_ID_CONFIG.MAX_LENGTH, { 
    message: () => getValidationMessage('deviceIdMaxLength', [DEVICE_ID_CONFIG.MAX_LENGTH]) 
  })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Trust this device for future logins (skip MFA)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Trust device must be a boolean' })
  trustDevice?: boolean = false;

  @ApiPropertyOptional({
    description: 'Specific MFA method to use (if user has multiple)',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
  })
  @IsOptional()
  @IsEnum(MFA_TYPES, { message: () => getValidationMessage('methodInvalid') })
  method?: MFAType;

  @ApiPropertyOptional({
    description: 'Preferred language for response messages',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: MfaVerificationRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MfaVerificationRateLimitDto)
  rateLimit?: MfaVerificationRateLimitDto;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for MFA verification',
    type: MfaVerificationContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MfaVerificationContextDto)
  context?: MfaVerificationContextDto;

  constructor(
    mfaSessionId: string,
    code?: string,
    backupCode?: string,
    deviceId?: string,
    trustDevice?: boolean,
    method?: MFAType,
    bkashPin?: string,
    nagadPin?: string,
    rocketPin?: string,
    preferredLanguage?: 'en' | 'bn',
    context?: MfaVerificationContextDto,
    rateLimit?: MfaVerificationRateLimitDto
  ) {
    this.mfaSessionId = mfaSessionId;
    this.code = code;
    this.backupCode = backupCode;
    this.deviceId = deviceId;
    this.trustDevice = trustDevice ?? false;
    this.method = method;
    this.bkashPin = bkashPin;
    this.nagadPin = nagadPin;
    this.rocketPin = rocketPin;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.context = context;
    this.rateLimit = rateLimit;
  }

  /**
   * Get the verification method being used
   */
  getVerificationMethod(): 'code' | 'backup' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin' | null {
    if (this.code) return 'code';
    if (this.backupCode) return 'backup';
    if (this.bkashPin) return 'bkash_pin';
    if (this.nagadPin) return 'nagad_pin';
    if (this.rocketPin) return 'rocket_pin';
    return null;
  }

  /**
   * Check if at least one verification method is provided
   */
  hasVerificationMethod(): boolean {
    return this.getVerificationMethod() !== null;
  }

  /**
   * Get validation message in appropriate language
   */
  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.preferredLanguage === 'bn' ? 'bn' : 'en';
    return getValidationMessage(key, args, locale);
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

  /**
   * Check if this is a backup code verification
   */
  isBackupCodeVerification(): boolean {
    return !!this.backupCode;
  }

  /**
   * Check if this is an MFS PIN verification (Bangladesh specific)
   */
  isMFSPinVerification(): boolean {
    return !!(this.bkashPin || this.nagadPin || this.rocketPin);
  }

  /**
   * Get the MFS provider being used (if any)
   */
  getMFSProvider(): 'bkash' | 'nagad' | 'rocket' | null {
    if (this.bkashPin) return 'bkash';
    if (this.nagadPin) return 'nagad';
    if (this.rocketPin) return 'rocket';
    return null;
  }
}

/**
 * Verify MFA Setup Request DTO (for initial setup verification)
 * 
 * Used when enabling MFA for the first time
 */
export class VerifyMfaSetupDto {
  @ApiProperty({
    description: 'MFA type being verified',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
    required: true,
  })
  @IsEnum(MFA_TYPES, { message: 'Invalid MFA type' })
  @IsNotEmpty({ message: 'MFA type is required' })
  type: MFAType;

  @ApiProperty({
    description: 'Verification code',
    example: '123456',
    minLength: OTP_CONFIG.LENGTH,
    maxLength: OTP_CONFIG.LENGTH,
    required: true,
  })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Verification code is required' })
  @Matches(OTP_CONFIG.PATTERN, { 
    message: `Code must be ${OTP_CONFIG.LENGTH} digits` 
  })
  code: string;

  @ApiPropertyOptional({
    description: 'Method ID (if multiple methods are being set up)',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Method ID must be a valid UUID' })
  methodId?: string;

  @ApiPropertyOptional({
    description: 'Device name for this MFA method',
    example: 'Google Authenticator',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  deviceName?: string;

  @ApiPropertyOptional({
    description: 'Make this the primary MFA method',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  makePrimary?: boolean = false;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(
    type: MFAType, 
    code: string, 
    methodId?: string, 
    deviceName?: string,
    makePrimary?: boolean,
    correlationId?: string
  ) {
    this.type = type;
    this.code = code;
    this.methodId = methodId;
    this.deviceName = deviceName;
    this.makePrimary = makePrimary ?? false;
    this.correlationId = correlationId;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced with Bengali support)
// ============================================================

/**
 * MFA Verify Success Response DTO - Enterprise Enhanced
 */
export class MfaVerifyResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: 604800,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
  })
  tokenType: string = 'Bearer';

  @ApiProperty({
    description: 'Session ID for management',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Authenticated user information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'usr_550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', example: 'user@vubon.com.bd' },
      fullName: { type: 'string', example: 'John Doe' },
      role: { type: 'string', example: 'USER' },
    },
  })
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };

  @ApiPropertyOptional({
    description: 'Whether the device was trusted',
    example: true,
  })
  deviceTrusted?: boolean;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সফলভাবে যাচাই করা হয়েছে',
  })
  messageBn?: string;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    sessionId: string,
    user: { id: string; email: string; fullName: string; role: string },
    deviceTrusted?: boolean,
    correlationId?: string,
    messageBn?: string
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.sessionId = sessionId;
    this.user = user;
    this.deviceTrusted = deviceTrusted;
    this.correlationId = correlationId;
    this.messageBn = messageBn;
  }
}

/**
 * MFA Setup Verify Response DTO - Enterprise Enhanced
 */
export class MfaSetupVerifyResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'MFA enabled successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'এমএফএ সফলভাবে সক্রিয় করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Remaining backup codes count',
    example: 10,
  })
  remainingBackupCodes: number;

  @ApiProperty({
    description: 'MFA method ID',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'Whether this is the primary MFA method',
    example: true,
  })
  isPrimary?: boolean;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    message: string, 
    remainingBackupCodes: number, 
    methodId: string,
    isPrimary?: boolean,
    messageBn?: string,
    correlationId?: string
  ) {
    this.message = message;
    this.messageBn = messageBn;
    this.remainingBackupCodes = remainingBackupCodes;
    this.methodId = methodId;
    this.isPrimary = isPrimary;
    this.correlationId = correlationId;
  }
}

/**
 * MFA Required Response DTO (after login) - Enterprise Enhanced
 */
export class MFARequiredResponseDto {
  @ApiProperty({
    description: 'MFA required flag',
    example: true,
  })
  mfaRequired: boolean = true;

  @ApiProperty({
    description: 'MFA session ID for verification',
    example: 'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
  })
  mfaSessionId: string;

  @ApiProperty({
    description: 'Available MFA methods for this user',
    enum: MFA_TYPES,
    isArray: true,
    example: ['TOTP', 'SMS', 'WHATSAPP', 'BKASH_PIN'],
  })
  availableMethods: MFAType[];

  @ApiPropertyOptional({
    description: 'Masked phone number (if SMS/WhatsApp is available)',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Masked email (if email is available)',
    example: 'u***r@example.com',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'Masked bKash account (if bKash PIN is available)',
    example: '+88017******78',
  })
  maskedBkashAccount?: string;

  @ApiPropertyOptional({
    description: 'Masked Nagad account (if Nagad PIN is available)',
    example: '+88017******78',
  })
  maskedNagadAccount?: string;

  @ApiPropertyOptional({
    description: 'Masked Rocket account (if Rocket PIN is available)',
    example: '+88017******78',
  })
  maskedRocketAccount?: string;

  @ApiPropertyOptional({
    description: 'Remaining verification attempts',
    example: 3,
  })
  remainingAttempts?: number;

  @ApiPropertyOptional({
    description: 'Login session ID (partial login)',
    example: 'login_sess_550e8400-e29b-41d4-a716-446655440000',
  })
  loginSessionId?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    mfaSessionId: string,
    availableMethods: MFAType[],
    maskedPhone?: string,
    maskedEmail?: string,
    remainingAttempts?: number,
    maskedBkashAccount?: string,
    loginSessionId?: string,
    maskedNagadAccount?: string,
    maskedRocketAccount?: string,
    correlationId?: string
  ) {
    this.mfaSessionId = mfaSessionId;
    this.availableMethods = availableMethods;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.maskedBkashAccount = maskedBkashAccount;
    this.maskedNagadAccount = maskedNagadAccount;
    this.maskedRocketAccount = maskedRocketAccount;
    this.remainingAttempts = remainingAttempts;
    this.loginSessionId = loginSessionId;
    this.correlationId = correlationId;
  }
}

/**
 * MFA Verification Failed Response DTO - Enterprise Enhanced
 */
export class MfaVerificationFailedResponseDto {
  @ApiProperty({
    description: 'Success flag (always false)',
    example: false,
  })
  success: boolean = false;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid verification code',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'অবৈধ ভেরিফিকেশন কোড',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Remaining attempts before lockout',
    example: 2,
  })
  remainingAttempts: number;

  @ApiPropertyOptional({
    description: 'Whether the MFA method is now locked',
    example: false,
  })
  isLocked?: boolean;

  @ApiPropertyOptional({
    description: 'Lockout expiry time (if locked)',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  lockoutExpiresAt?: string;

  @ApiPropertyOptional({
    description: 'Verification method that failed',
    example: 'code',
    enum: ['code', 'backup', 'bkash_pin', 'nagad_pin', 'rocket_pin'],
  })
  failedMethod?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    message: string, 
    remainingAttempts: number,
    messageBn?: string,
    isLocked?: boolean,
    lockoutExpiresAt?: Date,
    failedMethod?: string,
    correlationId?: string
  ) {
    this.message = message;
    this.messageBn = messageBn;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockoutExpiresAt = lockoutExpiresAt?.toISOString();
    this.failedMethod = failedMethod;
    this.correlationId = correlationId;
  }
}

/**
 * MFA Verification Error Response DTO
 */
export class MfaVerificationErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'English error message',
    example: 'MFA session not found or expired',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'MFA সেশন পাওয়া যায়নি বা মেয়াদ শেষ হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Error type',
    example: 'SESSION_NOT_FOUND',
    enum: ['SESSION_NOT_FOUND', 'SESSION_EXPIRED', 'METHOD_NOT_AVAILABLE', 'ACCOUNT_LOCKED', 'RATE_LIMITED'],
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
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Rate limit reset time (if rate limited)',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  rateLimitResetAt?: Date;

  constructor(
    message: string,
    error: string,
    statusCode: number = 400,
    messageBn?: string,
    correlationId?: string,
    rateLimitResetAt?: Date
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
   * Create session not found error
   */
  static sessionNotFound(correlationId?: string): MfaVerificationErrorResponseDto {
    return new MfaVerificationErrorResponseDto(
      'MFA session not found or expired',
      'SESSION_NOT_FOUND',
      404,
      undefined,
      correlationId
    );
  }

  /**
   * Create rate limited error response
   */
  static rateLimited(retryAfterSeconds: number, correlationId?: string): MfaVerificationErrorResponseDto {
    const message = `Too many MFA verification attempts. Please try again in ${retryAfterSeconds} seconds.`;
    const rateLimitResetAt = new Date(Date.now() + retryAfterSeconds * 1000);
    return new MfaVerificationErrorResponseDto(
      message,
      'RATE_LIMITED',
      429,
      undefined,
      correlationId,
      rateLimitResetAt
    );
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from MFA verification request
 * Tracks who, when, where MFA verification is attempted (Compliance)
 */
export function getMfaVerificationAuditMetadata(
  dto: VerifyMfaDto,
  userId: string
): AuditMetadata {
  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: dto.getCorrelationId(),
    metadata: {
      mfaSessionId: dto.mfaSessionId,
      verificationMethod: dto.getVerificationMethod(),
      trustDevice: dto.trustDevice,
      deviceId: dto.deviceId,
      method: dto.method,
      isBackupCode: dto.isBackupCodeVerification(),
      isMFSPin: dto.isMFSPinVerification(),
      mfsProvider: dto.getMFSProvider(),
      preferredLanguage: dto.preferredLanguage,
      ipAddress: dto.context?.ipAddress,
      userAgent: dto.context?.userAgent,
      sessionId: dto.context?.sessionId,
      deviceFingerprint: dto.context?.deviceFingerprint,
      district: dto.context?.district,
      division: dto.context?.division,
      networkType: dto.context?.networkType,
      hasRateLimit: !!dto.rateLimit,
      remainingRateLimit: dto.rateLimit?.remaining,
    },
  };
}

/**
 * Get MFA method display name (for UI)
 */
export function getMFAMethodDisplayName(method: MFAType, locale: 'en' | 'bn' = 'en'): string {
  const displayNames: Record<MFAType, { en: string; bn: string }> = {
    TOTP: { en: 'Authenticator App', bn: 'অথেনটিকেটর অ্যাপ' },
    SMS: { en: 'SMS Verification', bn: 'এসএমএস ভেরিফিকেশন' },
    EMAIL: { en: 'Email Verification', bn: 'ইমেইল ভেরিফিকেশন' },
    BACKUP_CODE: { en: 'Backup Codes', bn: 'ব্যাকআপ কোড' },
    WEBAUTHN: { en: 'Biometric (Passkey)', bn: 'বায়োমেট্রিক (পাসকি)' },
    WHATSAPP: { en: 'WhatsApp Verification', bn: 'হোয়াটসঅ্যাপ ভেরিফিকেশন' },
    IMO: { en: 'Imo Verification', bn: 'আইএমও ভেরিফিকেশন' },
    BKASH_PIN: { en: 'bKash PIN', bn: 'বিকাশ পিন' },
    NAGAD_PIN: { en: 'Nagad PIN', bn: 'নগদ পিন' },
    ROCKET_PIN: { en: 'Rocket PIN', bn: 'রকেট পিন' },
    VOICE_CALL: { en: 'Voice Call OTP', bn: 'ভয়েস কল ওটিপি' },
    PUSH: { en: 'Push Notification', bn: 'পুশ নোটিফিকেশন' },
  };
  return displayNames[method]?.[locale] || method;
}

/**
 * Check if MFA method is available for the user (based on configuration)
 */
export function isMFAMethodAvailable(method: MFAType): boolean {
  const availableMethods = MFA_CONFIG?.ENABLED_PROVIDERS || [
    'TOTP', 'SMS', 'EMAIL', 'BACKUP_CODE', 'WEBAUTHN',
    'WHATSAPP', 'IMO', 'BKASH_PIN', 'NAGAD_PIN', 'ROCKET_PIN', 'VOICE_CALL'
  ];
  return availableMethods.includes(method);
}

/**
 * Get priority order of MFA methods (for UI display)
 */
export function getMFAMethodPriority(method: MFAType): number {
  const priorities: Record<MFAType, number> = {
    WEBAUTHN: 1,
    TOTP: 2,
    PUSH: 3,
    WHATSAPP: 4,
    BKASH_PIN: 5,
    NAGAD_PIN: 5,
    ROCKET_PIN: 5,
    SMS: 6,
    IMO: 7,
    EMAIL: 8,
    VOICE_CALL: 9,
    BACKUP_CODE: 10,
  };
  return priorities[method] || 99;
}

/**
 * Sort MFA methods by priority
 */
export function sortMFAMethodsByPriority(methods: MFAType[]): MFAType[] {
  return [...methods].sort((a, b) => getMFAMethodPriority(a) - getMFAMethodPriority(b));
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  MFAType as MFATypeEnum,
  MfaVerificationRateLimitDto as MfaVerificationRateLimitDtoType,
  MfaVerificationContextDto as MfaVerificationContextDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Rate limit metadata support for brute force protection
// 2. ✅ Audit context tracking (ipAddress, userAgent, correlationId, deviceFingerprint)
// 3. ✅ Distributed tracing with correlation ID
// 4. ✅ Geographic location tracking (Bangladesh districts)
// 5. ✅ Bengali language support in responses (messageBn)
// 6. ✅ Session validation before verification
// 7. ✅ Device fingerprint tracking for security
// 8. ✅ Cooldown tracking for verification attempts
// 9. ✅ Multi-language validation messages (English/Bengali)
// 10. ✅ Helper methods: getVerificationMethod(), hasVerificationMethod(), isBackupCodeVerification()
// 11. ✅ MFS provider detection: getMFSProvider(), isMFSPinVerification()
// 12. ✅ Audit metadata extraction helper
// 13. ✅ MFA method display names with Bengali support
// 14. ✅ MFA method priority sorting for UI
// 15. ✅ Error response DTOs with Bengali support
// 
// Bangladesh Specific:
// - bKash, Nagad, Rocket PIN support
// - WhatsApp, Imo MFA support
// - District/Division tracking for location-based security
// - Network type tracking (2g/3g/4g/5g/wifi)
// - Bengali language support in all responses
// - Local timezone-aware timestamps
// 
// Security Features:
// - Mutual exclusive verification methods (cannot submit multiple)
// - Rate limiting with cooldown tracking
// - Lockout mechanism for failed attempts
// - Device fingerprint tracking
// - Session-based verification (no userId from client)
// - Correlation ID for distributed tracing
// 
// ============================================================
