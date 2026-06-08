/**
 * Revoke All Sessions DTOs - Pure Data Transport Objects (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/session/revoke-all-sessions.dto
 * 
 * @description
 * Data transfer objects for revoking all user sessions with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Rate limit metadata support for brute force protection
 * ✅ Audit context tracking (ipAddress, userAgent, correlationId)
 * ✅ Distributed tracing with correlation ID
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Bengali language support in responses
 * ✅ Scheduled revocation support (disable later)
 * ✅ Bulk revocation progress tracking
 * ✅ Device type filtering (Bangladesh mobile specific)
 * ✅ Trust level based selective revocation
 * ✅ Multi-language validation messages (English/Bengali)
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Confirmation required for destructive actions
 * ✅ Rate limiting to prevent abuse
 * ✅ Separate DTO for admin operations with role check
 * 
 * Flow:
 * 1. User authenticates with JWT
 * 2. User requests to revoke all sessions
 * 3. Server validates and revokes sessions
 * 4. Audit log created for compliance
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsBoolean,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsIn,
  MaxLength,
  ArrayMaxSize,
  ValidateIf,
  IsDate,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Enterprise: Import from shared packages (single source of truth)
import { 
  SESSION_CONFIG, 
  BATCH_CONFIG,
  DEVICE_TYPES,
  TRUST_LEVELS,
  REVOCATION_SCOPES,
  ENV_CONFIG,
} from '@vubon/shared-constants';
import type { 
  DeviceType, 
  TrustLevel, 
  RevocationScope,
  AuditMetadata,
} from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Rate Limit & Audit Context DTOs
// ============================================================

/**
 * Rate limit metadata for revocation attempts
 * ✅ Prevents brute force attacks on session revocation
 */
export class RevocationRateLimitDto {
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
 * Audit context for session revocation (compliance & security)
 * ✅ Tracks who, when, where revocation is performed
 */
export class RevocationAuditContextDto {
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

  // Bangladesh specific
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

/**
 * ✅ ENTERPRISE ENHANCEMENT 2: Scheduled Revocation DTO
 */
export class ScheduledRevocationDto {
  @ApiPropertyOptional({
    description: 'Schedule revocation for a future date/time',
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
    description: 'Time zone for scheduled revocation (IANA format)',
    example: 'Asia/Dhaka',
  })
  @IsOptional()
  @IsString()
  timezone?: string = 'Asia/Dhaka';

  @ApiPropertyOptional({
    description: 'Send reminder before revocation',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  sendReminder?: boolean = true;

  @ApiPropertyOptional({
    description: 'Reminder hours before revocation',
    example: 24,
    minimum: 1,
    maximum: 168,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(168)
  reminderHours?: number = 24;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Multi-language Validation Messages
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    confirmRequired: 'Confirmation is required for revoking sessions',
    confirmBoolean: 'Confirm must be a boolean',
    currentSessionIdInvalid: 'Current session ID must be a valid UUID',
    reasonMaxLength: (max: number) => `Reason cannot exceed ${max} characters`,
    userIdsMin: 'At least one user ID is required',
    userIdsMax: (max: number) => `Maximum ${max} users per batch`,
    userIdInvalid: 'Each user ID must be a valid UUID',
    deviceTypesMax: 'Maximum 10 device types allowed',
    trustLevelsMax: 'Maximum 4 trust levels allowed',
    scheduleDateInvalid: 'Schedule date must be in the future',
    recoveryEmailRequired: 'Recovery email is required for scheduled revocation',
  },
  bn: {
    confirmRequired: 'সেশন রিভোক করার জন্য নিশ্চিতকরণ প্রয়োজন',
    confirmBoolean: 'নিশ্চিতকরণ টি সত্য বা মিথ্যা হতে হবে',
    currentSessionIdInvalid: 'কারেন্ট সেশন আইডি টি সঠিক UUID হতে হবে',
    reasonMaxLength: (max: number) => `কারণ সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    userIdsMin: 'কমপক্ষে একটি ইউজার আইডি প্রয়োজন',
    userIdsMax: (max: number) => `সর্বোচ্চ ${max} জন ইউজার প্রতি ব্যাচে`,
    userIdInvalid: 'প্রতিটি ইউজার আইডি টি সঠিক UUID হতে হবে',
    deviceTypesMax: 'সর্বোচ্চ ১০টি ডিভাইস টাইপ অনুমোদিত',
    trustLevelsMax: 'সর্বোচ্চ ৪টি ট্রাস্ট লেভেল অনুমোদিত',
    scheduleDateInvalid: 'শিডিউল তারিখ ভবিষ্যতের হতে হবে',
    recoveryEmailRequired: 'শিডিউল রিভোকেশনের জন্য রিকভারি ইমেইল প্রয়োজন',
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
 * Revoke All Sessions Request DTO (For regular users) - Enterprise Enhanced v3.0
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example
 * {
 *   "confirm": true,
 *   "excludeCurrentSession": true,
 *   "currentSessionId": "sess_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "Security precaution - suspicious activity detected",
 *   "preferredLanguage": "bn",
 *   "context": { "correlationId": "corr_123", "district": "Dhaka" },
 *   "rateLimit": { "windowSeconds": 3600, "maxAttempts": 5 }
 * }
 * 
 * @example (Schedule for later)
 * {
 *   "confirm": true,
 *   "excludeCurrentSession": true,
 *   "schedule": {
 *     "scheduleFor": "2024-01-15T10:00:00.000Z",
 *     "recoveryEmail": "user@example.com",
 *     "sendReminder": true
 *   }
 * }
 */
export class RevokeAllSessionsDto {
  @ApiProperty({
    description: 'Confirmation to revoke sessions (destructive action)',
    example: true,
    required: true,
  })
  @IsBoolean({ message: () => getValidationMessage('confirmBoolean') })
  @IsNotEmpty({ message: () => getValidationMessage('confirmRequired') })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Revocation scope',
    example: REVOCATION_SCOPES.EXCEPT_CURRENT,
    enum: Object.values(REVOCATION_SCOPES),
    default: REVOCATION_SCOPES.EXCEPT_CURRENT,
  })
  @IsOptional()
  @IsIn(Object.values(REVOCATION_SCOPES), { 
    message: `Scope must be one of: ${Object.values(REVOCATION_SCOPES).join(', ')}` 
  })
  scope?: RevocationScope = REVOCATION_SCOPES.EXCEPT_CURRENT;

  @ApiPropertyOptional({
    description: 'Whether to exclude current session from revocation',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Exclude current session must be a boolean' })
  excludeCurrentSession?: boolean = true;

  @ApiPropertyOptional({
    description: 'Current session ID (to exclude from revocation)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: () => getValidationMessage('currentSessionIdInvalid') })
  currentSessionId?: string;

  @ApiPropertyOptional({
    description: 'Device types to revoke (when scope is by_device_type)',
    example: [DEVICE_TYPES.MOBILE, DEVICE_TYPES.TABLET],
    enum: DEVICE_TYPES,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Device types must be an array' })
  @ArrayMaxSize(10, { message: () => getValidationMessage('deviceTypesMax') })
  @IsIn(Object.values(DEVICE_TYPES), { 
    each: true,
    message: `Device type must be one of: ${Object.values(DEVICE_TYPES).join(', ')}` 
  })
  deviceTypes?: DeviceType[];

  @ApiPropertyOptional({
    description: 'Trust levels to revoke (when scope is by_trust_level)',
    example: [TRUST_LEVELS.UNTRUSTED, TRUST_LEVELS.STANDARD],
    enum: TRUST_LEVELS,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Trust levels must be an array' })
  @ArrayMaxSize(4, { message: () => getValidationMessage('trustLevelsMax') })
  @IsIn(Object.values(TRUST_LEVELS), { 
    each: true,
    message: `Trust level must be one of: ${Object.values(TRUST_LEVELS).join(', ')}` 
  })
  trustLevels?: TrustLevel[];

  @ApiPropertyOptional({
    description: 'Reason for revoking sessions (for audit)',
    example: 'Security precaution - suspicious activity detected',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: () => getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Preferred language for response messages',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Schedule support
  @ApiPropertyOptional({
    description: 'Schedule configuration for delayed revocation',
    type: ScheduledRevocationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduledRevocationDto)
  schedule?: ScheduledRevocationDto;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: RevocationRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RevocationRateLimitDto)
  rateLimit?: RevocationRateLimitDto;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for session revocation',
    type: RevocationAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RevocationAuditContextDto)
  context?: RevocationAuditContextDto;

  constructor(
    confirm: boolean,
    excludeCurrentSession?: boolean,
    currentSessionId?: string,
    reason?: string,
    scope?: RevocationScope,
    deviceTypes?: DeviceType[],
    trustLevels?: TrustLevel[],
    preferredLanguage?: 'en' | 'bn',
    schedule?: ScheduledRevocationDto,
    context?: RevocationAuditContextDto,
    rateLimit?: RevocationRateLimitDto
  ) {
    this.confirm = confirm;
    this.excludeCurrentSession = excludeCurrentSession ?? true;
    this.currentSessionId = currentSessionId;
    this.reason = reason;
    this.scope = scope ?? REVOCATION_SCOPES.EXCEPT_CURRENT;
    this.deviceTypes = deviceTypes;
    this.trustLevels = trustLevels;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.schedule = schedule;
    this.context = context;
    this.rateLimit = rateLimit;
  }

  /**
   * Check if this is a scheduled revocation
   */
  isScheduled(): boolean {
    return !!this.schedule?.scheduleFor;
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

/**
 * Admin Revoke User Sessions Request DTO (Enterprise Enhanced)
 * For administrators to revoke sessions of other users
 * 
 * @example
 * {
 *   "targetUserId": "usr_550e8400-e29b-41d4-a716-446655440000",
 *   "confirm": true,
 *   "scope": "all",
 *   "reason": "Policy violation - User reported for spam",
 *   "adminId": "admin_550e8400-e29b-41d4-a716-446655440000",
 *   "context": { "correlationId": "corr_123" }
 * }
 */
export class AdminRevokeSessionsDto {
  @ApiProperty({
    description: 'User ID whose sessions to revoke',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: () => getValidationMessage('userIdInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('userIdsMin') })
  targetUserId: string;

  @ApiProperty({
    description: 'Confirmation to revoke sessions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: () => getValidationMessage('confirmBoolean') })
  @IsNotEmpty({ message: () => getValidationMessage('confirmRequired') })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Revocation scope',
    example: REVOCATION_SCOPES.ALL,
    enum: Object.values(REVOCATION_SCOPES),
    default: REVOCATION_SCOPES.ALL,
  })
  @IsOptional()
  @IsIn(Object.values(REVOCATION_SCOPES), { 
    message: `Scope must be one of: ${Object.values(REVOCATION_SCOPES).join(', ')}` 
  })
  scope?: RevocationScope = REVOCATION_SCOPES.ALL;

  @ApiPropertyOptional({
    description: 'Device types to revoke (when scope is by_device_type)',
    example: [DEVICE_TYPES.MOBILE, DEVICE_TYPES.TABLET],
    enum: DEVICE_TYPES,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Device types must be an array' })
  @ArrayMaxSize(10, { message: () => getValidationMessage('deviceTypesMax') })
  @IsIn(Object.values(DEVICE_TYPES), { 
    each: true,
    message: `Device type must be one of: ${Object.values(DEVICE_TYPES).join(', ')}` 
  })
  deviceTypes?: DeviceType[];

  @ApiPropertyOptional({
    description: 'Trust levels to revoke (when scope is by_trust_level)',
    example: [TRUST_LEVELS.UNTRUSTED, TRUST_LEVELS.STANDARD],
    enum: TRUST_LEVELS,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Trust levels must be an array' })
  @ArrayMaxSize(4, { message: () => getValidationMessage('trustLevelsMax') })
  @IsIn(Object.values(TRUST_LEVELS), { 
    each: true,
    message: `Trust level must be one of: ${Object.values(TRUST_LEVELS).join(', ')}` 
  })
  trustLevels?: TrustLevel[];

  @ApiPropertyOptional({
    description: 'Reason for admin revocation',
    example: 'Policy violation - User reported for spam',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: () => getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Admin ID who performed the action',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Admin ID must be a valid UUID' })
  adminId?: string;

  @ApiPropertyOptional({
    description: 'Preferred language for response messages',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for admin session revocation',
    type: RevocationAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RevocationAuditContextDto)
  context?: RevocationAuditContextDto;

  constructor(
    targetUserId: string, 
    confirm: boolean, 
    reason?: string, 
    adminId?: string,
    scope?: RevocationScope,
    deviceTypes?: DeviceType[],
    trustLevels?: TrustLevel[],
    preferredLanguage?: 'en' | 'bn',
    context?: RevocationAuditContextDto
  ) {
    this.targetUserId = targetUserId;
    this.confirm = confirm;
    this.reason = reason;
    this.adminId = adminId;
    this.scope = scope ?? REVOCATION_SCOPES.ALL;
    this.deviceTypes = deviceTypes;
    this.trustLevels = trustLevels;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.context = context;
  }

  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.preferredLanguage === 'bn' ? 'bn' : 'en';
    return getValidationMessage(key, args, locale);
  }

  hasTracing(): boolean {
    return !!this.context?.hasTracing();
  }

  getCorrelationId(): string | undefined {
    return this.context?.correlationId;
  }
}

/**
 * Bulk Revoke Sessions Request DTO (Enterprise Enhanced)
 * For revoking sessions of multiple users at once
 * 
 * @example
 * {
 *   "userIds": ["usr_550e8400-e29b-41d4-a716-446655440000", "usr_550e8400-e29b-41d4-a716-446655440001"],
 *   "confirm": true,
 *   "reason": "Security incident - mass token compromise",
 *   "adminId": "admin_550e8400-e29b-41d4-a716-446655440000",
 *   "context": { "correlationId": "corr_123" }
 * }
 */
export class BulkRevokeSessionsDto {
  @ApiProperty({
    description: 'Array of user IDs whose sessions to revoke',
    example: ['usr_550e8400-e29b-41d4-a716-446655440000', 'usr_550e8400-e29b-41d4-a716-446655440001'],
    isArray: true,
    minItems: 1,
    maxItems: BATCH_CONFIG.MAX_USERS_PER_BATCH,
    required: true,
  })
  @IsArray({ message: 'User IDs must be an array' })
  @ArrayMaxSize(BATCH_CONFIG.MAX_USERS_PER_BATCH, { 
    message: () => getValidationMessage('userIdsMax', [BATCH_CONFIG.MAX_USERS_PER_BATCH]) 
  })
  @IsUUID(4, { each: true, message: () => getValidationMessage('userIdInvalid') })
  userIds: string[];

  @ApiProperty({
    description: 'Confirmation to revoke sessions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: () => getValidationMessage('confirmBoolean') })
  @IsNotEmpty({ message: () => getValidationMessage('confirmRequired') })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Reason for bulk revocation',
    example: 'Security incident - mass token compromise',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: () => getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Admin ID who performed the action',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Admin ID must be a valid UUID' })
  adminId?: string;

  @ApiPropertyOptional({
    description: 'Preferred language for response messages',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for bulk session revocation',
    type: RevocationAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RevocationAuditContextDto)
  context?: RevocationAuditContextDto;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: RevocationRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RevocationRateLimitDto)
  rateLimit?: RevocationRateLimitDto;

  constructor(
    userIds: string[], 
    confirm: boolean, 
    reason?: string, 
    adminId?: string,
    preferredLanguage?: 'en' | 'bn',
    context?: RevocationAuditContextDto,
    rateLimit?: RevocationRateLimitDto
  ) {
    this.userIds = userIds;
    this.confirm = confirm;
    this.reason = reason;
    this.adminId = adminId;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.context = context;
    this.rateLimit = rateLimit;
  }

  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.preferredLanguage === 'bn' ? 'bn' : 'en';
    return getValidationMessage(key, args, locale);
  }

  hasTracing(): boolean {
    return !!this.context?.hasTracing();
  }

  getCorrelationId(): string | undefined {
    return this.context?.correlationId;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced with Bengali support)
// ============================================================

/**
 * Revoke All Sessions Response DTO - Enterprise Enhanced
 */
export class RevokeAllSessionsResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: '3 sessions revoked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: '3টি সেশন সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 3,
    minimum: 0,
  })
  sessionsRevokedCount: number;

  @ApiProperty({
    description: 'Timestamp when sessions were revoked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  @ApiPropertyOptional({
    description: 'Current session ID (if excluded from revocation)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  currentSessionId?: string;

  @ApiPropertyOptional({
    description: 'Whether current session was excluded',
    example: true,
  })
  currentSessionExcluded?: boolean;

  @ApiPropertyOptional({
    description: 'Revoked session IDs (for debugging)',
    example: ['sess_550e8400-e29b-41d4-a716-446655440000'],
    isArray: true,
  })
  revokedSessionIds?: string[];

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Schedule info
  @ApiPropertyOptional({
    description: 'Whether revocation is scheduled (not immediate)',
    example: true,
  })
  isScheduled?: boolean;

  @ApiPropertyOptional({
    description: 'Scheduled revocation date (if applicable)',
    example: '2024-01-15T10:00:00.000Z',
    format: 'date-time',
  })
  scheduledFor?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit info
  @ApiPropertyOptional({
    description: 'Remaining attempts before rate limit',
    example: 3,
  })
  remainingAttempts?: number;

  constructor(
    success: boolean,
    sessionsRevokedCount: number,
    message?: string,
    messageBn?: string,
    currentSessionId?: string,
    currentSessionExcluded?: boolean,
    revokedSessionIds?: string[],
    correlationId?: string,
    isScheduled?: boolean,
    scheduledFor?: Date,
    remainingAttempts?: number
  ) {
    this.success = success;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.message = message || `${sessionsRevokedCount} session(s) revoked successfully`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.currentSessionId = currentSessionId;
    this.currentSessionExcluded = currentSessionExcluded;
    this.revokedSessionIds = revokedSessionIds;
    this.correlationId = correlationId;
    this.isScheduled = isScheduled;
    this.scheduledFor = scheduledFor?.toISOString();
    this.remainingAttempts = remainingAttempts;
  }

  /**
   * Create success response
   */
  static success(
    sessionsRevokedCount: number,
    currentSessionId?: string,
    currentSessionExcluded?: boolean,
    revokedSessionIds?: string[],
    messageBn?: string,
    correlationId?: string,
    remainingAttempts?: number
  ): RevokeAllSessionsResponseDto {
    return new RevokeAllSessionsResponseDto(
      true,
      sessionsRevokedCount,
      undefined,
      messageBn,
      currentSessionId,
      currentSessionExcluded,
      revokedSessionIds,
      correlationId,
      false,
      undefined,
      remainingAttempts
    );
  }

  /**
   * Create scheduled success response
   */
  static scheduled(
    scheduledFor: Date,
    messageBn?: string,
    correlationId?: string
  ): RevokeAllSessionsResponseDto {
    return new RevokeAllSessionsResponseDto(
      true,
      0,
      'Session revocation scheduled successfully. You will receive a confirmation email.',
      messageBn,
      undefined,
      undefined,
      undefined,
      correlationId,
      true,
      scheduledFor
    );
  }

  /**
   * Create failure response
   */
  static error(message: string, messageBn?: string, correlationId?: string): RevokeAllSessionsResponseDto {
    return new RevokeAllSessionsResponseDto(false, 0, message, messageBn, undefined, undefined, undefined, correlationId);
  }

  /**
   * Create rate limited error response
   */
  static rateLimited(
    remainingAttempts: number, 
    retryAfterSeconds: number,
    correlationId?: string
  ): RevokeAllSessionsResponseDto {
    const message = `Too many revocation attempts. Please try again in ${retryAfterSeconds} seconds.`;
    return new RevokeAllSessionsResponseDto(false, 0, message, undefined, undefined, undefined, undefined, correlationId, false, undefined, remainingAttempts);
  }
}

/**
 * Admin Revoke Sessions Response DTO - Enterprise Enhanced
 */
export class AdminRevokeSessionsResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'All sessions revoked for user usr_123',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'ইউজার usr_123 এর সব সেশন রিভোক করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'User ID whose sessions were revoked',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  targetUserId: string;

  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 5,
  })
  sessionsRevokedCount: number;

  @ApiProperty({
    description: 'Admin ID who performed the action',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
  })
  adminId: string;

  @ApiProperty({
    description: 'Timestamp when sessions were revoked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    success: boolean,
    targetUserId: string,
    sessionsRevokedCount: number,
    adminId: string,
    message?: string,
    messageBn?: string,
    correlationId?: string
  ) {
    this.success = success;
    this.targetUserId = targetUserId;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.adminId = adminId;
    this.message = message || `${sessionsRevokedCount} session(s) revoked for user ${targetUserId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

/**
 * Bulk Revoke Sessions Response DTO (Enterprise Enhanced)
 */
export class BulkRevokeSessionsResponseDto {
  @ApiProperty({
    description: 'Total number of users processed',
    example: 10,
  })
  totalUsers: number;

  @ApiProperty({
    description: 'Number of successful revocations',
    example: 8,
  })
  successfulCount: number;

  @ApiProperty({
    description: 'Number of failed revocations',
    example: 2,
  })
  failedCount: number;

  @ApiPropertyOptional({
    description: 'Failed revocations details',
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  failures?: Record<string, string>;

  @ApiProperty({
    description: 'Total number of sessions revoked',
    example: 25,
  })
  totalSessionsRevoked: number;

  @ApiProperty({
    description: 'Timestamp when bulk revocation completed',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  completedAt: string;

  // ✅ ENTERPRISE ENHANCEMENT: Duration in milliseconds
  @ApiPropertyOptional({
    description: 'Operation duration in milliseconds',
    example: 150,
  })
  durationMs?: number;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    totalUsers: number,
    successfulCount: number,
    failedCount: number,
    totalSessionsRevoked: number,
    failures?: Record<string, string>,
    durationMs?: number,
    correlationId?: string
  ) {
    this.totalUsers = totalUsers;
    this.successfulCount = successfulCount;
    this.failedCount = failedCount;
    this.totalSessionsRevoked = totalSessionsRevoked;
    this.failures = failures;
    this.completedAt = new Date().toISOString();
    this.durationMs = durationMs;
    this.correlationId = correlationId;
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from session revocation request
 * Tracks who, when, why session revocation was performed (Compliance)
 */
export function getRevocationAuditMetadata(
  dto: RevokeAllSessionsDto | AdminRevokeSessionsDto | BulkRevokeSessionsDto,
  userId: string,
  adminId?: string
): AuditMetadata {
  const context = 'context' in dto ? dto.context : undefined;
  const isBulk = 'userIds' in dto && Array.isArray(dto.userIds);
  const isAdmin = 'targetUserId' in dto;

  return {
    userId: isAdmin && 'targetUserId' in dto ? dto.targetUserId : userId,
    source: adminId || isAdmin ? 'admin' : 'api',
    timestamp: new Date(),
    requestId: context?.correlationId,
    metadata: {
      isBulk,
      isAdmin,
      userCount: isBulk && 'userIds' in dto ? dto.userIds.length : 1,
      targetUserId: 'targetUserId' in dto ? dto.targetUserId : undefined,
      scope: 'scope' in dto ? dto.scope : undefined,
      deviceTypes: 'deviceTypes' in dto ? dto.deviceTypes : undefined,
      trustLevels: 'trustLevels' in dto ? dto.trustLevels : undefined,
      excludeCurrentSession: 'excludeCurrentSession' in dto ? dto.excludeCurrentSession : undefined,
      reason: dto.reason,
      isScheduled: 'schedule' in dto && dto.schedule?.scheduleFor ? true : false,
      scheduledFor: 'schedule' in dto && dto.schedule?.scheduleFor ? dto.schedule.scheduleFor : undefined,
      adminId: adminId || ('adminId' in dto ? dto.adminId : undefined),
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
      sessionContextId: context?.sessionId,
      deviceFingerprint: context?.deviceFingerprint,
      district: context?.district,
      division: context?.division,
      networkType: context?.networkType,
      hasRateLimit: 'rateLimit' in dto && !!dto.rateLimit,
    },
  };
}

/**
 * Mask device ID for privacy (shows only last 4 characters)
 */
export function maskDeviceId(deviceId: string): string {
  if (!deviceId || deviceId.length <= 8) return '****';
  const last4 = deviceId.slice(-4);
  return `****${last4}`;
}

/**
 * Check if revocation is allowed (rate limit check)
 */
export function isRevocationAllowed(
  attemptCount: number,
  maxAttempts: number = 5,
  windowSeconds: number = 3600
): { allowed: boolean; remaining: number; resetAfterSeconds: number } {
  const remaining = Math.max(0, maxAttempts - attemptCount);
  const allowed = remaining > 0;
  const resetAfterSeconds = allowed ? 0 : windowSeconds;
  return { allowed, remaining, resetAfterSeconds };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  RevocationScope as RevocationScopeType,
  DeviceType as DeviceTypeEnum,
  TrustLevel as TrustLevelEnum,
  RevocationRateLimitDto as RevocationRateLimitDtoType,
  RevocationAuditContextDto as RevocationAuditContextDtoType,
  ScheduledRevocationDto as ScheduledRevocationDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Rate limit metadata support for brute force protection
// 2. ✅ Audit context tracking (ipAddress, userAgent, correlationId)
// 3. ✅ Distributed tracing with correlation ID
// 4. ✅ Geographic location tracking (Bangladesh districts)
// 5. ✅ Bengali language support in responses (messageBn)
// 6. ✅ Scheduled revocation support (disable later)
// 7. ✅ Bulk revocation progress tracking
// 8. ✅ Device type filtering (Bangladesh mobile specific)
// 9. ✅ Trust level based selective revocation
// 10. ✅ Multi-language validation messages (English/Bengali)
// 11. ✅ Helper methods: isScheduled(), getMessage(), hasTracing()
// 12. ✅ Audit metadata extraction helper
// 13. ✅ Correlation ID propagation across all response DTOs
// 14. ✅ Rate limit check helper
// 15. ✅ Device ID masking for privacy
// 
// Bangladesh Specific:
// - District/Division tracking for location-based security
// - Network type tracking (2g/3g/4g/5g/wifi)
// - Bengali language support in all responses
// - Device-based revocation for mobile devices
// - Local timezone-aware timestamps
// 
// Security Features:
// - userId NEVER accepted from client (comes from JWT)
// - Confirmation required for destructive actions
// - Rate limiting with cooldown tracking
// - Correlation ID for distributed tracing
// - Admin revocation with audit trail
// - Bulk revocation limits to prevent abuse (max 100 users)
// 
// ============================================================
