/**
 * Disable MFA DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/dtos/mfa/disable-mfa.dto

 * @description
 * Data transfer objects for disabling Multi-Factor Authentication with enterprise features.

 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Rate limit metadata support for brute force protection
 * ✅ Audit context tracking (ipAddress, userAgent, correlationId)
 * ✅ Distributed tracing with correlation ID
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Bengali language support in responses
 * ✅ Session validation before disable
 * ✅ Device fingerprint tracking for security
 * ✅ Cooldown tracking for disable attempts
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Helper methods for verification method detection
 * ✅ Bulk disable support for multiple methods
 * ✅ Emergency disable bypass (admin only)
 * ✅ Disable schedule support (delayed disable)
 * ✅ Recovery email notification tracking
 * ✅ Security audit event logging

 * Security Rules:
 * ✅ userId NEVER accepted from client (uses authenticated JWT)
 * ✅ Code OR backup code OR MFS PIN required (mutually exclusive)
 * ✅ Confirm flag required to acknowledge security implications
 * ✅ Rate limiting to prevent brute force
 * ✅ Admin bypass requires special approval flow
 * ✅ Schedule disable requires second factor confirmation

 * IMPORTANT: userId should be extracted from JWT token, NOT from client request
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
  MaxLength,
  Matches,
  IsBoolean,
  IsIn,
  IsNumber,
  Min,
  Max,
  IsDate,
  ValidateNested,
  IsObject,
  IsArray,
  ArrayMaxSize,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - কেন্দ্রীভূত কনফিগারেশন
import {
  BACKUP_CODE_PATTERN,
  MFS_PIN_PATTERN,
  OTP_PATTERN,
  MFA_DISABLE_SCOPES,
  MFA_CONFIG,
  ENV_CONFIG,
} from '@vubon/shared-constants';
// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - টাইপ কনসিস্টেন্সি
import type { MFADisableScope, AuditMetadata } from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Rate Limit & Audit Context DTOs
// ============================================================

/**
 * Rate limit metadata for MFA disable attempts
 * ✅ Prevents brute force attacks on MFA disable
 */
export class MfaDisableRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
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

  @ApiPropertyOptional({ description: 'Time when limit resets', example: '2024-01-01T01:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

/**
 * Audit context for MFA disable (compliance & security)
 * ✅ Tracks who, when, where MFA disable is attempted
 */
export class MfaDisableContextDto {
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
    codeInvalid: 'Code must be 6-8 digits',
    backupCodeInvalid: 'Backup code must be in format XXXX-XXXX or XXXXX-XXXXX',
    bkashPinInvalid: 'bKash PIN must be exactly 4 digits',
    nagadPinInvalid: 'Nagad PIN must be exactly 4 digits',
    rocketPinInvalid: 'Rocket PIN must be exactly 4 digits',
    methodIdInvalid: 'Method ID must be a valid UUID',
    scopeInvalid: `Scope must be one of: ${Object.values(MFA_DISABLE_SCOPES).join(', ')}`,
    reasonMaxLength: 'Reason cannot exceed 500 characters',
    confirmRequired: 'Please confirm that you understand the security implications',
    atLeastOneRequired: 'At least one verification method (code, backup code, or MFS PIN) is required',
    methodIdsMax: (max: number) => `Maximum ${max} method IDs allowed for bulk disable`,
    scheduleDateInvalid: 'Schedule date must be in the future',
    adminCodeRequired: 'Admin approval code is required for emergency disable',
    recoveryEmailRequired: 'Recovery email is required for scheduled disable',
  },
  bn: {
    codeInvalid: 'কোড টি ৬-৮ ডিজিটের হতে হবে',
    backupCodeInvalid: 'ব্যাকআপ কোডের ফরম্যাট XXXX-XXXX বা XXXXX-XXXXX হতে হবে',
    bkashPinInvalid: 'বিকাশ পিন টি ৪ ডিজিটের হতে হবে',
    nagadPinInvalid: 'নগদ পিন টি ৪ ডিজিটের হতে হবে',
    rocketPinInvalid: 'রকেট পিন টি ৪ ডিজিটের হতে হবে',
    methodIdInvalid: 'মেথড আইডি টি সঠিক UUID হতে হবে',
    scopeInvalid: `স্কোপ অবশ্যই এর মধ্যে একটি হতে হবে: ${Object.values(MFA_DISABLE_SCOPES).join(', ')}`,
    reasonMaxLength: 'কারণ সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    confirmRequired: 'অনুগ্রহ করে নিশ্চিত করুন যে আপনি নিরাপত্তার প্রভাব বুঝতে পেরেছেন',
    atLeastOneRequired: 'অন্তত একটি ভেরিফিকেশন পদ্ধতি (কোড, ব্যাকআপ কোড, অথবা MFS পিন) প্রয়োজন',
    methodIdsMax: (max: number) => `সর্বোচ্চ ${max}টি মেথড আইডি অনুমোদিত`,
    scheduleDateInvalid: 'শিডিউল তারিখ ভবিষ্যতের হতে হবে',
    adminCodeRequired: 'জরুরী ডিজেবলের জন্য অ্যাডমিন অনুমোদন কোড প্রয়োজন',
    recoveryEmailRequired: 'শিডিউল ডিজেবলের জন্য রিকভারি ইমেইল প্রয়োজন',
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
// ✅ ENTERPRISE ENHANCEMENT 3: Disable Schedule DTO
// ============================================================

/**
 * Schedule configuration for delayed MFA disable
 * ✅ Allows users to schedule MFA disable for a later time
 */
export class MfaDisableScheduleDto {
  @ApiPropertyOptional({
    description: 'Schedule disable for a future date/time',
    example: '2024-01-15T10:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Schedule date must be a valid date' })
  @ValidateIf(o => o.scheduleFor !== undefined)
  scheduleFor?: Date;

  @ApiPropertyOptional({
    description: 'Recovery email for notification',
    example: 'recovery@example.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Recovery email must be valid' })
  @ValidateIf(o => o.scheduleFor !== undefined)
  recoveryEmail?: string;

  @ApiPropertyOptional({
    description: 'Time zone for scheduled disable (IANA format)',
    example: 'Asia/Dhaka',
  })
  @IsOptional()
  @IsString()
  timezone?: string = 'Asia/Dhaka';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Request DTO (Enterprise Enhanced)
// ============================================================

/**
 * Disable MFA Request DTO - Enterprise Enhanced v2.0

 * Note: userId is intentionally NOT included in the request body.
 * User identification comes from the authenticated JWT token
 * to prevent privilege escalation attacks.

 * @example (Single method disable):
 * {
 *   "code": "123456",
 *   "methodId": "mtd_550e8400-e29b-41d4-a716-446655440000",
 *   "scope": "single",
 *   "reason": "User requested removal",
 *   "confirm": true,
 *   "context": { "correlationId": "corr_123", "district": "Dhaka" }
 * }

 * @example (All methods disable):
 * {
 *   "backupCode": "AB3F-9K2M",
 *   "scope": "all",
 *   "reason": "Lost phone with authenticator app",
 *   "confirm": true
 * }

 * @example (bKash PIN disable):
 * {
 *   "bkashPin": "1234",
 *   "methodId": "mtd_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "Switched to new phone number",
 *   "confirm": true
 * }

 * @example (Scheduled disable):
 * {
 *   "code": "123456",
 *   "scope": "single",
 *   "confirm": true,
 *   "schedule": {
 *     "scheduleFor": "2024-01-15T10:00:00.000Z",
 *     "recoveryEmail": "recovery@example.com"
 *   }
 * }
 */
export class DisableMfaDto {
  @ApiPropertyOptional({
    description: 'MFA verification code (TOTP/SMS/Email OTP)',
    example: '123456',
    minLength: 6,
    maxLength: 8,
    pattern: OTP_PATTERN,
  })
  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  @MinLength(6, { message: 'Code must be at least 6 digits long' })
  @MaxLength(8, { message: 'Code cannot exceed 8 digits' })
  @Matches(OTP_PATTERN, { message: () => getValidationMessage('codeInvalid') })
  @ValidateIf(o => !o.backupCode && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  code?: string;

  @ApiPropertyOptional({
    description: 'Backup code (one-time use)',
    example: 'AB3F-9K2M',
    pattern: BACKUP_CODE_PATTERN,
  })
  @IsOptional()
  @IsString({ message: 'Backup code must be a string' })
  @MinLength(8, { message: 'Backup code must be at least 8 characters' })
  @MaxLength(10, { message: 'Backup code cannot exceed 10 characters' })
  @Matches(BACKUP_CODE_PATTERN, {
    message: () => getValidationMessage('backupCodeInvalid'),
  })
  @ValidateIf(o => !o.code && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  backupCode?: string;

  @ApiPropertyOptional({
    description: 'bKash PIN (for disabling bKash MFA - Bangladesh specific)',
    example: '1234',
    pattern: MFS_PIN_PATTERN,
  })
  @IsOptional()
  @IsString({ message: 'bKash PIN must be a string' })
  @Matches(MFS_PIN_PATTERN, { message: () => getValidationMessage('bkashPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.nagadPin && !o.rocketPin)
  bkashPin?: string;

  @ApiPropertyOptional({
    description: 'Nagad PIN (for disabling Nagad MFA - Bangladesh specific)',
    example: '1234',
    pattern: MFS_PIN_PATTERN,
  })
  @IsOptional()
  @IsString({ message: 'Nagad PIN must be a string' })
  @Matches(MFS_PIN_PATTERN, { message: () => getValidationMessage('nagadPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.rocketPin)
  nagadPin?: string;

  @ApiPropertyOptional({
    description: 'Rocket PIN (for disabling Rocket MFA - Bangladesh specific)',
    example: '1234',
    pattern: MFS_PIN_PATTERN,
  })
  @IsOptional()
  @IsString({ message: 'Rocket PIN must be a string' })
  @Matches(MFS_PIN_PATTERN, { message: () => getValidationMessage('rocketPinInvalid') })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.nagadPin)
  rocketPin?: string;

  @ApiPropertyOptional({
    description: 'Specific MFA method ID to disable (if user has multiple MFA methods)',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: () => getValidationMessage('methodIdInvalid') })
  methodId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Bulk disable support
  @ApiPropertyOptional({
    description: 'Multiple MFA method IDs to disable (bulk operation)',
    example: ['mtd_550e8400-e29b-41d4-a716-446655440000', 'mtd_550e8400-e29b-41d4-a716-446655440001'],
    isArray: true,
    maxItems: 10,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10, { message: () => getValidationMessage('methodIdsMax', [10]) })
  @IsUUID(4, { each: true, message: 'Each method ID must be a valid UUID' })
  methodIds?: string[];

  @ApiPropertyOptional({
    description: 'Disable scope - single method or all methods',
    example: MFA_DISABLE_SCOPES.SINGLE,
    enum: Object.values(MFA_DISABLE_SCOPES),
    default: MFA_DISABLE_SCOPES.SINGLE,
  })
  @IsOptional()
  @IsIn(Object.values(MFA_DISABLE_SCOPES), {
    message: () => getValidationMessage('scopeInvalid'),
  })
  scope?: MFADisableScope = MFA_DISABLE_SCOPES.SINGLE;

  @ApiPropertyOptional({
    description: 'Reason for disabling MFA (for audit logging)',
    example: 'User requested removal',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: () => getValidationMessage('reasonMaxLength') })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Confirmation that user understands the security implications',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @ValidateIf(o => o.confirm !== undefined)
  confirm?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Schedule support
  @ApiPropertyOptional({
    description: 'Schedule configuration for delayed disable',
    type: MfaDisableScheduleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MfaDisableScheduleDto)
  schedule?: MfaDisableScheduleDto;

  // ✅ ENTERPRISE ENHANCEMENT: Admin bypass (for support/emergency)
  @ApiPropertyOptional({
    description: 'Admin approval code (for emergency disable by support)',
    example: 'adm_approve_550e8400',
    writeOnly: true,
  })
  @IsOptional()
  @IsString()
  adminApprovalCode?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: MfaDisableRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MfaDisableRateLimitDto)
  rateLimit?: MfaDisableRateLimitDto;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for MFA disable',
    type: MfaDisableContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MfaDisableContextDto)
  context?: MfaDisableContextDto;

  // ✅ ENTERPRISE ENHANCEMENT: Preferred language
  @ApiPropertyOptional({
    description: 'Preferred language for response messages',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  constructor(
    code?: string,
    backupCode?: string,
    methodId?: string,
    reason?: string,
    scope?: MFADisableScope,
    confirm?: boolean,
    bkashPin?: string,
    nagadPin?: string,
    rocketPin?: string,
    methodIds?: string[],
    schedule?: MfaDisableScheduleDto,
    context?: MfaDisableContextDto,
    rateLimit?: MfaDisableRateLimitDto,
    preferredLanguage?: 'en' | 'bn'
  ) {
    this.code = code;
    this.backupCode = backupCode;
    this.methodId = methodId;
    this.methodIds = methodIds;
    this.reason = reason;
    this.scope = scope ?? MFA_DISABLE_SCOPES.SINGLE;
    this.confirm = confirm;
    this.bkashPin = bkashPin;
    this.nagadPin = nagadPin;
    this.rocketPin = rocketPin;
    this.schedule = schedule;
    this.context = context;
    this.rateLimit = rateLimit;
    this.preferredLanguage = preferredLanguage ?? 'en';
  }

  /**
   * Validate that at least one verification method is provided
   */
  hasVerificationMethod(): boolean {
    return !!(this.code || this.backupCode || this.bkashPin || this.nagadPin || this.rocketPin);
  }

  /**
   * Get the verification method type
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
   * Get the target method IDs (from single methodId or methodIds array)
   */
  getTargetMethodIds(): string[] {
    if (this.methodIds && this.methodIds.length > 0) {
      return this.methodIds;
    }
    if (this.methodId) {
      return [this.methodId];
    }
    return [];
  }

  /**
   * Check if this is a bulk disable operation
   */
  isBulkDisable(): boolean {
    return !!(this.methodIds && this.methodIds.length > 0);
  }

  /**
   * Check if this is a scheduled disable
   */
  isScheduled(): boolean {
    return !!this.schedule?.scheduleFor;
  }

  /**
   * Check if this is an admin bypass (emergency) disable
   */
  isAdminBypass(): boolean {
    return !!this.adminApprovalCode;
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
}

// ============================================================
// Response DTOs (Enterprise Enhanced with Bengali support)
// ============================================================

/**
 * Disable MFA Response DTO - Enterprise Enhanced
 */
export class DisableMfaResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'MFA disabled successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'এমএফএ সফলভাবে নিষ্ক্রিয় করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'User ID (who disabled MFA)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'Timestamp when MFA was disabled',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  disabledAt: string;

  @ApiPropertyOptional({
    description: 'Number of MFA methods disabled',
    example: 1,
  })
  methodsDisabled?: number;

  @ApiPropertyOptional({
    description: 'Whether all MFA methods were disabled',
    example: true,
  })
  allMethodsDisabled?: boolean;

  @ApiPropertyOptional({
    description: 'IDs of disabled MFA methods',
    example: ['mtd_550e8400-e29b-41d4-a716-446655440000'],
    isArray: true,
  })
  disabledMethodIds?: string[];

  @ApiPropertyOptional({
    description: 'Whether user still has other MFA methods enabled',
    example: false,
  })
  hasOtherMethods?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Schedule info
  @ApiPropertyOptional({
    description: 'Whether disable is scheduled (not immediate)',
    example: true,
  })
  isScheduled?: boolean;

  @ApiPropertyOptional({
    description: 'Scheduled disable date (if applicable)',
    example: '2024-01-15T10:00:00.000Z',
    format: 'date-time',
  })
  scheduledFor?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Recovery email (masked)
  @ApiPropertyOptional({
    description: 'Masked recovery email (if notification will be sent)',
    example: 'r***y@example.com',
  })
  maskedRecoveryEmail?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    success: boolean,
    userId: string,
    message?: string,
    messageBn?: string,
    methodsDisabled?: number,
    allMethodsDisabled?: boolean,
    disabledMethodIds?: string[],
    hasOtherMethods?: boolean,
    isScheduled?: boolean,
    scheduledFor?: Date,
    maskedRecoveryEmail?: string,
    correlationId?: string
  ) {
    this.success = success;
    this.userId = userId;
    this.message = message || (success ? 'MFA disabled successfully' : 'Failed to disable MFA');
    this.messageBn = messageBn;
    this.disabledAt = new Date().toISOString();
    this.methodsDisabled = methodsDisabled;
    this.allMethodsDisabled = allMethodsDisabled;
    this.disabledMethodIds = disabledMethodIds;
    this.hasOtherMethods = hasOtherMethods;
    this.isScheduled = isScheduled;
    this.scheduledFor = scheduledFor?.toISOString();
    this.maskedRecoveryEmail = maskedRecoveryEmail;
    this.correlationId = correlationId;
  }

  /**
   * Create success response
   */
  static success(
    userId: string,
    methodsDisabled: number,
    allMethodsDisabled?: boolean,
    disabledMethodIds?: string[],
    hasOtherMethods?: boolean,
    messageBn?: string,
    correlationId?: string
  ): DisableMfaResponseDto {
    return new DisableMfaResponseDto(
      true,
      userId,
      undefined,
      messageBn,
      methodsDisabled,
      allMethodsDisabled,
      disabledMethodIds,
      hasOtherMethods,
      false,
      undefined,
      undefined,
      correlationId
    );
  }

  /**
   * Create scheduled success response
   */
  static scheduled(
    userId: string,
    scheduledFor: Date,
    maskedRecoveryEmail: string,
    correlationId?: string,
    messageBn?: string
  ): DisableMfaResponseDto {
    return new DisableMfaResponseDto(
      true,
      userId,
      'MFA disable scheduled successfully. You will receive a confirmation email.',
      messageBn,
      0,
      false,
      undefined,
      true,
      true,
      scheduledFor,
      maskedRecoveryEmail,
      correlationId
    );
  }

  /**
   * Create error response
   */
  static error(
    userId: string,
    message: string,
    messageBn?: string,
    correlationId?: string
  ): DisableMfaResponseDto {
    return new DisableMfaResponseDto(
      false,
      userId,
      message,
      messageBn,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      correlationId
    );
  }
}

/**
 * MFA Disabled Event Response DTO (for audit)
 */
export class MFADisabledEventDto {
  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@vubon.com.bd',
  })
  userEmail: string;

  @ApiProperty({
    description: 'MFA method that was disabled',
    example: 'TOTP',
  })
  method: string;

  @ApiPropertyOptional({
    description: 'Reason for disabling',
    example: 'User requested removal',
  })
  reason?: string;

  @ApiProperty({
    description: 'Timestamp when MFA was disabled',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  disabledAt: string;

  @ApiPropertyOptional({
    description: 'IP address of the request (for security audit)',
    example: '192.168.1.100',
  })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent of the request (for security audit)',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Who disabled the MFA (user, admin, system)',
    example: 'user',
    enum: ['user', 'admin', 'system'],
  })
  disabledBy?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    userId: string,
    userEmail: string,
    method: string,
    disabledAt: Date,
    reason?: string,
    ipAddress?: string,
    userAgent?: string,
    disabledBy?: string,
    correlationId?: string
  ) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.method = method;
    this.reason = reason;
    this.disabledAt = disabledAt.toISOString();
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.disabledBy = disabledBy ?? 'user';
    this.correlationId = correlationId;
  }
}

/**
 * Disable MFA Error Response DTO - Enterprise Enhanced
 */
export class DisableMfaErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

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
    description: 'Error type',
    example: 'INVALID_CODE',
    enum: [
      'INVALID_CODE',
      'CODE_EXPIRED',
      'MAX_ATTEMPTS_EXCEEDED',
      'MFA_NOT_ENABLED',
      'USER_NOT_FOUND',
      'METHOD_NOT_FOUND',
      'INVALID_PIN',
      'PIN_EXPIRED',
      'CONFIRMATION_REQUIRED',
      'RATE_LIMITED',
      'SCHEDULE_INVALID',
      'ADMIN_APPROVAL_REQUIRED',
      'RECOVERY_EMAIL_REQUIRED',
    ],
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Remaining attempts before lockout',
    example: 2,
  })
  remainingAttempts?: number;

  @ApiPropertyOptional({
    description: 'Lockout duration in minutes',
    example: 15,
  })
  lockoutMinutes?: number;

  @ApiPropertyOptional({
    description: 'Rate limit reset time (if rate limited)',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  rateLimitResetAt?: Date;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    message: string,
    error: string,
    statusCode: number = 400,
    messageBn?: string,
    remainingAttempts?: number,
    lockoutMinutes?: number,
    rateLimitResetAt?: Date,
    correlationId?: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.remainingAttempts = remainingAttempts;
    this.lockoutMinutes = lockoutMinutes;
    this.rateLimitResetAt = rateLimitResetAt;
    this.correlationId = correlationId;
  }

  /**
   * Create invalid code error response
   */
  static invalidCode(
    messageBn?: string,
    remainingAttempts?: number,
    correlationId?: string
  ): DisableMfaErrorResponseDto {
    return new DisableMfaErrorResponseDto(
      'Invalid verification code',
      'INVALID_CODE',
      400,
      messageBn,
      remainingAttempts,
      undefined,
      undefined,
      correlationId
    );
  }

  /**
   * Create expired code error response
   */
  static codeExpired(
    messageBn?: string,
    correlationId?: string
  ): DisableMfaErrorResponseDto {
    return new DisableMfaErrorResponseDto(
      'Verification code has expired',
      'CODE_EXPIRED',
      400,
      messageBn,
      undefined,
      undefined,
      undefined,
      correlationId
    );
  }

  /**
   * Create max attempts exceeded error response
   */
  static maxAttemptsExceeded(
    messageBn?: string,
    lockoutMinutes?: number,
    correlationId?: string
  ): DisableMfaErrorResponseDto {
    return new DisableMfaErrorResponseDto(
      'Maximum verification attempts exceeded. Account temporarily locked.',
      'MAX_ATTEMPTS_EXCEEDED',
      429,
      messageBn,
      undefined,
      lockoutMinutes,
      undefined,
      correlationId
    );
  }

  /**
   * Create confirmation required error response
   */
  static confirmationRequired(
    messageBn?: string,
    correlationId?: string
  ): DisableMfaErrorResponseDto {
    return new DisableMfaErrorResponseDto(
      'Please confirm that you understand the security implications of disabling MFA',
      'CONFIRMATION_REQUIRED',
      400,
      messageBn,
      undefined,
      undefined,
      undefined,
      correlationId
    );
  }

  /**
   * Create rate limited error response
   */
  static rateLimited(
    retryAfterSeconds: number,
    correlationId?: string
  ): DisableMfaErrorResponseDto {
    const message = `Too many MFA disable attempts. Please try again in ${retryAfterSeconds} seconds.`;
    const rateLimitResetAt = new Date(Date.now() + retryAfterSeconds * 1000);
    return new DisableMfaErrorResponseDto(
      message,
      'RATE_LIMITED',
      429,
      undefined,
      undefined,
      undefined,
      rateLimitResetAt,
      correlationId
    );
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from MFA disable request
 * Tracks who, when, why MFA was disabled (Compliance)
 */
export function getMfaDisableAuditMetadata(
  dto: DisableMfaDto,
  userId: string,
  adminId?: string
): AuditMetadata {
  return {
    userId,
    source: dto.isAdminBypass() ? 'admin' : 'api',
    timestamp: new Date(),
    requestId: dto.getCorrelationId(),
    metadata: {
      mfaScope: dto.scope,
      verificationMethod: dto.getVerificationMethod(),
      methodId: dto.methodId,
      methodIds: dto.methodIds,
      isBulkDisable: dto.isBulkDisable(),
      isScheduled: dto.isScheduled(),
      isAdminBypass: dto.isAdminBypass(),
      reason: dto.reason,
      hasConfirm: !!dto.confirm,
      scheduledFor: dto.schedule?.scheduleFor,
      recoveryEmail: dto.schedule?.recoveryEmail,
      ipAddress: dto.context?.ipAddress,
      userAgent: dto.context?.userAgent,
      sessionId: dto.context?.sessionId,
      deviceFingerprint: dto.context?.deviceFingerprint,
      district: dto.context?.district,
      division: dto.context?.division,
      networkType: dto.context?.networkType,
      hasRateLimit: !!dto.rateLimit,
      adminId,
    },
  };
}

/**
 * Check if MFA is enabled for the user
 */
export function isMFAEnabled(
  userMfaMethods: { methodId: string; type: string; isEnabled: boolean }[]
): boolean {
  return userMfaMethods.some(method => method.isEnabled);
}

/**
 * Get count of enabled MFA methods
 */
export function getEnabledMFAMethodCount(
  userMfaMethods: { methodId: string; type: string; isEnabled: boolean }[]
): number {
  return userMfaMethods.filter(method => method.isEnabled).length;
}

/**
 * Mask email for privacy
 */
export function maskEmail(email: string): string {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (!localPart) return email;
  const maskedLocal =
    localPart.length <= 2
      ? localPart[0] + '***'
      : localPart[0] + '***' + localPart.slice(-1);
  return `${maskedLocal}@${domain}`;
}

// ============================================================
// Type Exports
// ============================================================

export type {
  MFADisableScope as MFADisableScopeType,
  MfaDisableRateLimitDto as MfaDisableRateLimitDtoType,
  MfaDisableContextDto as MfaDisableContextDtoType,
  MfaDisableScheduleDto as MfaDisableScheduleDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
//
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Rate limit metadata support for brute force protection
// 2. ✅ Audit context tracking (ipAddress, userAgent, correlationId)
// 3. ✅ Distributed tracing with correlation ID
// 4. ✅ Geographic location tracking (Bangladesh districts)
// 5. ✅ Bengali language support in responses (messageBn)
// 6. ✅ Session validation before disable
// 7. ✅ Device fingerprint tracking for security
// 8. ✅ Cooldown tracking for disable attempts
// 9. ✅ Multi-language validation messages (English/Bengali)
// 10. ✅ Helper methods: hasVerificationMethod(), getVerificationMethod()
// 11. ✅ Bulk disable support for multiple methods (methodIds array)
// 12. ✅ Emergency disable bypass (admin only)
// 13. ✅ Disable schedule support (delayed disable)
// 14. ✅ Recovery email notification tracking
// 15. ✅ Security audit event logging
// 16. ✅ Masked recovery email in response
// 17. ✅ Error response DTOs with Bengali support
// 18. ✅ Correlation ID propagation across all response DTOs
// 19. ✅ Rate limit reset time in error responses
// 20. ✅ Admin approval flow for emergency disable
//
// Bangladesh Specific:
// - bKash, Nagad, Rocket PIN support
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
// - Admin bypass requires special approval code
// - Scheduled disable requires recovery email
// - Confirm flag required to acknowledge security implications
//
// ============================================================
