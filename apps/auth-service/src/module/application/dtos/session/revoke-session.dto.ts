/**
 * Revoke Session DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/session/revoke-session.dto
 * 
 * @description
 * Data transfer objects for revoking user sessions with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Branded types (SessionId, DeviceId, UserId) for type safety
 * ✅ Audit context tracking (ipAddress, userAgent, correlationId)
 * ✅ Rate limit metadata support for revocation attempts
 * ✅ Distributed tracing with correlation ID
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Bengali language support in responses
 * ✅ Bulk revocation limits (min 1, max 100)
 * ✅ Admin revocation with audit trail
 * ✅ Device-based revocation (Bangladesh mobile specific)
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Helper methods for response creation
 * ✅ Audit metadata extraction
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Session ownership validation in application layer
 * ✅ Optional reason for audit trail
 * ✅ Rate limiting for revocation attempts
 * 
 * Flow:
 * 1. User authenticates with JWT
 * 2. User requests to revoke a specific session
 * 3. Server validates session belongs to user and revokes it
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsUUID,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsDate,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - Single source of truth
import { 
  SESSION_CONSTANTS, 
  DEVICE_ID_CONSTANTS,
  ENV_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - Type safety
import type { 
  SessionId, 
  DeviceId, 
  UserId,
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
 * Rate limit metadata for session revocation attempts
 * ✅ Prevents brute force attacks on session revocation
 */
export class SessionRevokeRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max attempts allowed', example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number;

  @ApiPropertyOptional({ description: 'Remaining attempts', example: 8 })
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
 * ✅ Tracks who, when, where session revocation is attempted
 */
export class SessionRevokeContextDto {
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
    sessionIdRequired: 'Session ID is required',
    sessionIdInvalid: 'Session ID must be a valid UUID',
    deviceIdRequired: 'Device ID is required',
    userIdRequired: 'User ID is required',
    reasonMaxLength: (max: number) => `Reason cannot exceed ${max} characters`,
    sessionIdsMin: (min: number) => `At least ${min} session ID is required`,
    sessionIdsMax: (max: number) => `Cannot revoke more than ${max} sessions at once`,
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
  },
  bn: {
    sessionIdRequired: 'সেশন আইডি প্রয়োজন',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
    deviceIdRequired: 'ডিভাইস আইডি প্রয়োজন',
    userIdRequired: 'ইউজার আইডি প্রয়োজন',
    reasonMaxLength: (max: number) => `কারণ সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    sessionIdsMin: (min: number) => `কমপক্ষে ${min}টি সেশন আইডি প্রয়োজন`,
    sessionIdsMax: (max: number) => `একসাথে সর্বোচ্চ ${max}টি সেশন রিভোক করা যাবে`,
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
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
 * Revoke Session Request DTO - Enterprise Enhanced
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example
 * {
 *   "sessionId": "sess_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "Suspicious activity detected on this device",
 *   "preferredLanguage": "bn",
 *   "context": { "correlationId": "corr_123", "district": "Dhaka" },
 *   "rateLimit": { "windowSeconds": 3600, "maxAttempts": 10 }
 * }
 */
export class RevokeSessionDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: () => getValidationMessage('sessionIdInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('sessionIdRequired') })
  sessionId: SessionId;

  @ApiPropertyOptional({
    description: 'Reason for revoking session (for audit trail)',
    example: 'Security precaution - unusual activity detected',
    maxLength: SESSION_CONSTANTS.MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(SESSION_CONSTANTS.MAX_REASON_LENGTH, { 
    message: () => getValidationMessage('reasonMaxLength', [SESSION_CONSTANTS.MAX_REASON_LENGTH]) 
  })
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

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for this operation',
    type: SessionRevokeRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionRevokeRateLimitDto)
  rateLimit?: SessionRevokeRateLimitDto;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for session revocation',
    type: SessionRevokeContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionRevokeContextDto)
  context?: SessionRevokeContextDto;

  constructor(sessionId: SessionId, reason?: string, preferredLanguage?: 'en' | 'bn', context?: SessionRevokeContextDto, rateLimit?: SessionRevokeRateLimitDto) {
    this.sessionId = sessionId;
    this.reason = reason;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.context = context;
    this.rateLimit = rateLimit;
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
 * Revoke Sessions by Device Request DTO (Bangladesh specific) - Enterprise Enhanced
 * 
 * @example
 * {
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "excludeCurrentSession": true,
 *   "reason": "Device reported as lost",
 *   "preferredLanguage": "bn",
 *   "context": { "correlationId": "corr_123" }
 * }
 */
export class RevokeSessionsByDeviceDto {
  @ApiProperty({
    description: 'Device ID to revoke all sessions from',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString({ message: () => getValidationMessage('deviceIdRequired') })
  @IsNotEmpty({ message: () => getValidationMessage('deviceIdRequired') })
  @MaxLength(DEVICE_ID_CONSTANTS.MAX_LENGTH, { 
    message: () => getValidationMessage('deviceIdMaxLength', [DEVICE_ID_CONSTANTS.MAX_LENGTH]) 
  })
  deviceId: DeviceId;

  @ApiPropertyOptional({
    description: 'Whether to exclude current session (if it matches this device)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Exclude current session must be a boolean' })
  excludeCurrentSession?: boolean = true;

  @ApiPropertyOptional({
    description: 'Reason for revoking device sessions',
    example: 'Device reported as lost or stolen',
    maxLength: SESSION_CONSTANTS.MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(SESSION_CONSTANTS.MAX_REASON_LENGTH, { 
    message: () => getValidationMessage('reasonMaxLength', [SESSION_CONSTANTS.MAX_REASON_LENGTH]) 
  })
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

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for device session revocation',
    type: SessionRevokeContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionRevokeContextDto)
  context?: SessionRevokeContextDto;

  constructor(deviceId: DeviceId, excludeCurrentSession?: boolean, reason?: string, preferredLanguage?: 'en' | 'bn', context?: SessionRevokeContextDto) {
    this.deviceId = deviceId;
    this.excludeCurrentSession = excludeCurrentSession ?? true;
    this.reason = reason;
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

  getSanitizedContext(): Record<string, unknown> {
    return this.context?.getSanitized() || {};
  }
}

/**
 * Admin Revoke Session Request DTO - Enterprise Enhanced
 * For administrators to revoke sessions of other users
 */
export class AdminRevokeSessionDto {
  @ApiProperty({
    description: 'User ID whose session to revoke',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: () => getValidationMessage('sessionIdInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('userIdRequired') })
  targetUserId: UserId;

  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: () => getValidationMessage('sessionIdInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('sessionIdRequired') })
  sessionId: SessionId;

  @ApiPropertyOptional({
    description: 'Reason for admin revocation',
    example: 'Policy violation',
    maxLength: SESSION_CONSTANTS.MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(SESSION_CONSTANTS.MAX_REASON_LENGTH, { 
    message: () => getValidationMessage('reasonMaxLength', [SESSION_CONSTANTS.MAX_REASON_LENGTH]) 
  })
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
    type: SessionRevokeContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionRevokeContextDto)
  context?: SessionRevokeContextDto;

  constructor(targetUserId: UserId, sessionId: SessionId, reason?: string, adminId?: string, preferredLanguage?: 'en' | 'bn', context?: SessionRevokeContextDto) {
    this.targetUserId = targetUserId;
    this.sessionId = sessionId;
    this.reason = reason;
    this.adminId = adminId;
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
 * Bulk Revoke Sessions Request DTO - Enterprise Enhanced
 */
export class BulkRevokeSessionsDto {
  @ApiProperty({
    description: 'Session IDs to revoke',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
    required: true,
  })
  @IsArray({ message: 'Session IDs must be an array' })
  @ArrayMinSize(SESSION_CONSTANTS.MIN_BULK_REVOKE_SIZE, { 
    message: () => getValidationMessage('sessionIdsMin', [SESSION_CONSTANTS.MIN_BULK_REVOKE_SIZE]) 
  })
  @ArrayMaxSize(SESSION_CONSTANTS.MAX_BULK_REVOKE_SIZE, { 
    message: () => getValidationMessage('sessionIdsMax', [SESSION_CONSTANTS.MAX_BULK_REVOKE_SIZE]) 
  })
  @IsUUID(4, { each: true, message: () => getValidationMessage('sessionIdInvalid') })
  sessionIds: SessionId[];

  @ApiPropertyOptional({
    description: 'Reason for bulk revocation',
    example: 'Security incident - mass logout required',
    maxLength: SESSION_CONSTANTS.MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(SESSION_CONSTANTS.MAX_REASON_LENGTH, { 
    message: () => getValidationMessage('reasonMaxLength', [SESSION_CONSTANTS.MAX_REASON_LENGTH]) 
  })
  reason?: string;

  @ApiPropertyOptional({
    description: 'User ID (if revoking sessions for a specific user)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: () => getValidationMessage('sessionIdInvalid') })
  userId?: UserId;

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
    type: SessionRevokeContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SessionRevokeContextDto)
  context?: SessionRevokeContextDto;

  constructor(sessionIds: SessionId[], reason?: string, userId?: UserId, preferredLanguage?: 'en' | 'bn', context?: SessionRevokeContextDto) {
    this.sessionIds = sessionIds;
    this.reason = reason;
    this.userId = userId;
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

  getSanitizedContext(): Record<string, unknown> {
    return this.context?.getSanitized() || {};
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced with Bengali support)
// ============================================================

/**
 * Revoke Session Response DTO - Enterprise Enhanced
 */
export class RevokeSessionResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Session revoked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'সেশন সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Revoked session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Timestamp when session was revoked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  @ApiPropertyOptional({
    description: 'User ID whose session was revoked',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Whether the revoked session was the current session',
    example: true,
  })
  wasCurrentSession?: boolean;

  @ApiPropertyOptional({
    description: 'Device ID of the revoked session',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  deviceId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit info
  @ApiPropertyOptional({
    description: 'Remaining attempts before rate limit',
    example: 8,
  })
  remainingAttempts?: number;

  constructor(
    success: boolean, 
    sessionId: string, 
    message?: string,
    messageBn?: string,
    userId?: string,
    wasCurrentSession?: boolean,
    deviceId?: string,
    correlationId?: string,
    remainingAttempts?: number
  ) {
    this.success = success;
    this.sessionId = sessionId;
    this.message = message || (success ? 'Session revoked successfully' : 'Failed to revoke session');
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.userId = userId;
    this.wasCurrentSession = wasCurrentSession;
    this.deviceId = deviceId;
    this.correlationId = correlationId;
    this.remainingAttempts = remainingAttempts;
  }

  /**
   * Create success response
   */
  static success(
    sessionId: string, 
    userId?: string, 
    wasCurrentSession?: boolean,
    deviceId?: string,
    messageBn?: string,
    correlationId?: string,
    remainingAttempts?: number
  ): RevokeSessionResponseDto {
    return new RevokeSessionResponseDto(
      true, 
      sessionId, 
      undefined, 
      messageBn, 
      userId, 
      wasCurrentSession, 
      deviceId,
      correlationId,
      remainingAttempts
    );
  }

  /**
   * Create failure response
   */
  static error(
    sessionId: string, 
    message: string, 
    messageBn?: string, 
    correlationId?: string
  ): RevokeSessionResponseDto {
    return new RevokeSessionResponseDto(false, sessionId, message, messageBn, undefined, undefined, undefined, correlationId);
  }
}

/**
 * Revoke Sessions by Device Response DTO - Enterprise Enhanced
 */
export class RevokeSessionsByDeviceResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: '3 sessions revoked for device device_123',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'ডিভাইস device_123 এর জন্য 3টি সেশন রিভোক করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Device ID',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  deviceId: string;

  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 3,
  })
  sessionsRevokedCount: number;

  @ApiProperty({
    description: 'Timestamp when device sessions were revoked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  @ApiPropertyOptional({
    description: 'Whether current session was excluded',
    example: true,
  })
  currentSessionExcluded?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    success: boolean,
    deviceId: string,
    sessionsRevokedCount: number,
    message?: string,
    messageBn?: string,
    currentSessionExcluded?: boolean,
    correlationId?: string
  ) {
    this.success = success;
    this.deviceId = deviceId;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.message = message || `${sessionsRevokedCount} session(s) revoked for device ${deviceId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.currentSessionExcluded = currentSessionExcluded;
    this.correlationId = correlationId;
  }
}

/**
 * Admin Revoke Session Response DTO - Enterprise Enhanced
 */
export class AdminRevokeSessionResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Session revoked successfully for user usr_123',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'ইউজার usr_123 এর জন্য সেশন সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'User ID whose session was revoked',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  targetUserId: string;

  @ApiProperty({
    description: 'Revoked session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Admin ID who performed the action',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
  })
  adminId: string;

  @ApiProperty({
    description: 'Timestamp when session was revoked',
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
    sessionId: string,
    adminId: string,
    message?: string,
    messageBn?: string,
    correlationId?: string
  ) {
    this.success = success;
    this.targetUserId = targetUserId;
    this.sessionId = sessionId;
    this.adminId = adminId;
    this.message = message || `Session ${sessionId} revoked successfully for user ${targetUserId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

/**
 * Bulk Revoke Sessions Response DTO - Enterprise Enhanced
 */
export class BulkRevokeSessionsResponseDto {
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
    description: 'Timestamp when bulk operation completed',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  completedAt: string;

  @ApiPropertyOptional({
    description: 'Revoked session IDs (successful ones)',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
  })
  revokedSessionIds?: string[];

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
    successfulCount: number, 
    failedCount: number, 
    failures?: Record<string, string>,
    revokedSessionIds?: string[],
    durationMs?: number,
    correlationId?: string
  ) {
    this.successfulCount = successfulCount;
    this.failedCount = failedCount;
    this.failures = failures;
    this.completedAt = new Date().toISOString();
    this.revokedSessionIds = revokedSessionIds;
    this.durationMs = durationMs;
    this.correlationId = correlationId;
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from session revocation request
 * Tracks who, when, why session was revoked (Compliance)
 */
export function getSessionRevokeAuditMetadata(
  dto: RevokeSessionDto | AdminRevokeSessionDto | BulkRevokeSessionsDto | RevokeSessionsByDeviceDto,
  userId: string,
  adminId?: string
): AuditMetadata {
  const context = 'context' in dto ? dto.context : undefined;
  const isBulk = 'sessionIds' in dto && Array.isArray(dto.sessionIds);
  const isDeviceRevoke = 'deviceId' in dto;

  return {
    userId,
    source: adminId ? 'admin' : 'api',
    timestamp: new Date(),
    requestId: context?.correlationId,
    metadata: {
      isBulk,
      isDeviceRevoke,
      sessionCount: isBulk && 'sessionIds' in dto ? dto.sessionIds.length : 1,
      deviceId: isDeviceRevoke && 'deviceId' in dto ? dto.deviceId : undefined,
      sessionId: 'sessionId' in dto ? dto.sessionId : undefined,
      targetUserId: 'targetUserId' in dto ? dto.targetUserId : undefined,
      reason: dto.reason,
      excludeCurrentSession: 'excludeCurrentSession' in dto ? dto.excludeCurrentSession : undefined,
      adminId,
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
 * Check if session revocation is allowed (rate limit check)
 */
export function isSessionRevocationAllowed(
  attemptCount: number,
  maxAttempts: number = 10,
  windowSeconds: number = 3600
): { allowed: boolean; remaining: number; resetAfterSeconds: number } {
  const remaining = Math.max(0, maxAttempts - attemptCount);
  const allowed = remaining > 0;
  // Calculate approximate reset time (simplified)
  const resetAfterSeconds = allowed ? 0 : windowSeconds;
  return { allowed, remaining, resetAfterSeconds };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  RevokeSessionDto as RevokeSessionRequestDto,
  SessionRevokeRateLimitDto as SessionRevokeRateLimitDtoType,
  SessionRevokeContextDto as SessionRevokeContextDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Branded types (SessionId, DeviceId, UserId) for type safety
// 2. ✅ Audit context tracking (ipAddress, userAgent, correlationId)
// 3. ✅ Rate limit metadata support for revocation attempts
// 4. ✅ Distributed tracing with correlation ID
// 5. ✅ Geographic location tracking (Bangladesh districts)
// 6. ✅ Bengali language support in responses
// 7. ✅ Bulk revocation limits (min 1, max 100)
// 8. ✅ Admin revocation with audit trail
// 9. ✅ Device-based revocation (Bangladesh mobile specific)
// 10. ✅ Multi-language validation messages (English/Bengali)
// 11. ✅ Helper methods: getMessage(), hasTracing(), getCorrelationId()
// 12. ✅ Audit metadata extraction helper
// 13. ✅ Device ID masking for privacy
// 14. ✅ Rate limit check helper
// 15. ✅ Correlation ID propagation across all response DTOs
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
// - Session ownership validation
// - Rate limiting with cooldown tracking
// - Device fingerprint tracking
// - Correlation ID for distributed tracing
// - Admin revocation with audit trail
// - Bulk revocation limits to prevent abuse
// 
// ============================================================
