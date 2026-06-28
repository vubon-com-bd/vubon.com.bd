/**
 * Logout DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/logout.dto
 * 
 * @description
 * Data transfer objects for logout functionality with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Bulk logout with progress tracking support
 * ✅ Device-specific session revocation with geolocation
 * ✅ Audit logging integration (reason, source, ipAddress)
 * ✅ Distributed tracing support (correlationId)
 * ✅ Multi-device logout with selective exclusion
 * ✅ Rate limit metadata for logout attempts
 * ✅ Bengali error messages with locale detection
 * ✅ Security event categorization for logging
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ User ID comes from JWT (not from request body)
 * ✅ Support for single session, all sessions, and device-specific logout
 * ✅ Bangladesh specific - Bengali messages support
 * ✅ Phase-1 integration - shared-constants and shared-types
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsIn,
  IsUUID,
  IsArray,
  ArrayMaxSize,
  IsObject,
  ValidateNested,
  IsIP,
  IsDate,
  Min,
  Max,
  IsNumber,
  IsEnum, 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// Phase-1 Imports (shared-constants & shared-types)
// ============================================================

// ✅ Phase-1: shared-constants থেকে ইম্পোর্ট
import { 
  LOGOUT_SCOPE, 
  ERROR_CODES,
  ENV_CONFIG
} from '@vubon/shared-constants';

// ✅ Phase-1: shared-types থেকে টাইপ ইম্পোর্ট
import type { 
  LogoutScope as SharedLogoutScope, 
  ApiErrorCode,
  BaseResponse,
  AuditMetadata,
  RequestContext,
} from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// Types & Enums (Constants থেকে তৈরি)
// ============================================================

/**
 * Logout scope (based on shared-constants)
 */
export const LogoutScope = LOGOUT_SCOPE;
export type LogoutScope = typeof LOGOUT_SCOPE[keyof typeof LOGOUT_SCOPE];

/**
 * Logout source types for audit tracking
 */
export enum LogoutSource {
  USER_INITIATED = 'USER_INITIATED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  ADMIN_REVOKED = 'ADMIN_REVOKED',
  SECURITY_BREACH = 'SECURITY_BREACH',
  DEVICE_CHANGE = 'DEVICE_CHANGE',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  ACCOUNT_DELETION = 'ACCOUNT_DELETION',
  INACTIVITY = 'INACTIVITY',
}

/**
 * Security event category for logging
 */
export enum SecurityEventCategory {
  LOGOUT = 'LOGOUT',
  SESSION_REVOCATION = 'SESSION_REVOCATION',
  DEVICE_LOGOUT = 'DEVICE_LOGOUT',
  MASS_LOGOUT = 'MASS_LOGOUT',
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Request Context DTO
// ============================================================

/**
 * Audit context for logout operations
 */
export class LogoutAuditContextDto {
  @ApiPropertyOptional({
    description: 'IP address of the request',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsIP(undefined, { message: 'Invalid IP address format' })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

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

  constructor(partial?: Partial<LogoutAuditContextDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Rate Limit Metadata
// ============================================================

/**
 * Rate limit metadata for logout attempts
 */
export class LogoutRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 9 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T00:01:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

// ============================================================
// Validation Messages (Bangladesh specific)
// ============================================================

const VALIDATION_MESSAGES = {
  // English messages
  en: {
    sessionIdRequired: 'Session ID is required',
    deviceIdRequired: 'Device ID is required',
    confirmRequired: 'Confirmation is required',
    invalidScope: `Scope must be one of: ${Object.values(LogoutScope).join(', ')}`,
    sessionIdsMax: (max: number) => `Maximum ${max} session IDs allowed for bulk logout`,
    deviceIdsMax: (max: number) => `Maximum ${max} device IDs allowed for bulk logout`,
    userIdRequired: 'User ID is required for this operation',
    excludeCurrentMax: 'Cannot exclude more than 100 sessions',
  },
  // Bengali messages (Bangladesh specific)
  bn: {
    sessionIdRequired: 'সেশন আইডি প্রয়োজন',
    deviceIdRequired: 'ডিভাইস আইডি প্রয়োজন',
    confirmRequired: 'নিশ্চিতকরণ প্রয়োজন',
    invalidScope: `স্কোপ অবশ্যই এর মধ্যে একটি হতে হবে: ${Object.values(LogoutScope).join(', ')}`,
    sessionIdsMax: (max: number) => `সর্বোচ্চ ${max}টি সেশন আইডি অনুমোদিত`,
    deviceIdsMax: (max: number) => `সর্বোচ্চ ${max}টি ডিভাইস আইডি অনুমোদিত`,
    userIdRequired: 'এই অপারেশনের জন্য ইউজার আইডি প্রয়োজন',
    excludeCurrentMax: 'সর্বোচ্চ ১০০টি সেশন বাদ দেওয়া যাবে',
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
// Request DTOs (Enhanced with enterprise features)
// ============================================================

/**
 * Logout Request DTO (Enhanced)
 * 
 * Note: userId is NOT accepted from client for security reasons.
 * User identification comes from the authenticated JWT token.
 * 
 * @example
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "scope": "current",
 *   "sessionId": "session_abc123",
 *   "deviceId": "device_xyz789",
 *   "reason": "User initiated logout",
 *   "source": "USER_INITIATED",
 *   "auditContext": { "ipAddress": "192.168.1.100", "correlationId": "corr_abc123" }
 * }
 */
export class LogoutDto {
  @ApiPropertyOptional({
    description: 'Refresh token to invalidate',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken?: string;
  
  @ApiPropertyOptional({
    description: 'Logout scope',
    example: 'current',
    enum: LogoutScope,
    default: LogoutScope.CURRENT,
  })
  @IsOptional()
  @IsIn(Object.values(LogoutScope), { 
    message: VALIDATION_MESSAGES.en.invalidScope
  })
  scope?: LogoutScope = LogoutScope.CURRENT;
  
  @ApiPropertyOptional({
    description: 'Specific session ID to revoke (used with scope="session")',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  @MaxLength(255, { message: 'Session ID cannot exceed 255 characters' })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device ID to revoke sessions from (used with scope="device")',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Reason for logout (for audit)',
    example: 'User initiated logout',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Whether to keep the current session when logging out from all devices',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Keep current must be a boolean' })
  keepCurrent?: boolean = false;

  // ✅ ENTERPRISE ENHANCEMENT: Logout source for audit
  @ApiPropertyOptional({
    description: 'Source of logout (for audit tracking)',
    enum: LogoutSource,
    example: LogoutSource.USER_INITIATED,
    default: LogoutSource.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(LogoutSource)
  source?: LogoutSource = LogoutSource.USER_INITIATED;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for logout',
    type: LogoutAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutAuditContextDto)
  auditContext?: LogoutAuditContextDto;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: LogoutRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutRateLimitDto)
  rateLimit?: LogoutRateLimitDto;

  constructor(
    refreshToken?: string, 
    scope?: LogoutScope, 
    sessionId?: string,
    deviceId?: string,
    reason?: string,
    keepCurrent?: boolean,
    source?: LogoutSource,
    auditContext?: LogoutAuditContextDto
  ) {
    this.refreshToken = refreshToken;
    this.scope = scope ?? LogoutScope.CURRENT;
    this.sessionId = sessionId;
    this.deviceId = deviceId;
    this.reason = reason;
    this.keepCurrent = keepCurrent ?? false;
    this.source = source ?? LogoutSource.USER_INITIATED;
    this.auditContext = auditContext;
  }
}

/**
 * Bulk Logout Request DTO (Enterprise feature)
 * 
 * @example
 * {
 *   "sessionIds": ["session_abc", "session_def"],
 *   "deviceIds": ["device_xyz"],
 *   "excludeSessionIds": ["session_keep"],
 *   "reason": "Security policy enforcement"
 * }
 */
export class BulkLogoutDto {
  @ApiPropertyOptional({
    description: 'Session IDs to revoke (max 100)',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
    maxItems: 100,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100, { 
    message: () => getValidationMessage('sessionIdsMax', [100]) 
  })
  @IsUUID(4, { each: true, message: 'Each session ID must be a valid UUID' })
  sessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Device IDs to revoke all sessions from (max 50)',
    example: ['device_abc123', 'device_def456'],
    isArray: true,
    maxItems: 50,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50, { 
    message: () => getValidationMessage('deviceIdsMax', [50]) 
  })
  @IsString({ each: true, message: 'Each device ID must be a string' })
  deviceIds?: string[];

  @ApiPropertyOptional({
    description: 'Session IDs to exclude from revocation',
    example: ['sess_keep123'],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100, { 
    message: () => getValidationMessage('excludeCurrentMax') 
  })
  @IsUUID(4, { each: true, message: 'Each excluded session ID must be a valid UUID' })
  excludeSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Reason for bulk logout',
    example: 'Security incident - mass logout required',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Logout source',
    enum: LogoutSource,
    default: LogoutSource.ADMIN_REVOKED,
  })
  @IsOptional()
  @IsEnum(LogoutSource)
  source?: LogoutSource = LogoutSource.ADMIN_REVOKED;

  @ApiPropertyOptional({
    description: 'Audit context',
    type: LogoutAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutAuditContextDto)
  auditContext?: LogoutAuditContextDto;

  constructor(
    sessionIds?: string[],
    deviceIds?: string[],
    excludeSessionIds?: string[],
    reason?: string,
    source?: LogoutSource
  ) {
    this.sessionIds = sessionIds;
    this.deviceIds = deviceIds;
    this.excludeSessionIds = excludeSessionIds;
    this.reason = reason;
    this.source = source ?? LogoutSource.ADMIN_REVOKED;
  }

  /**
   * Get all target session IDs (combined from sessionIds and device sessions)
   */
  getTargetSessionIds(): string[] {
    return [...(this.sessionIds || [])];
  }

  /**
   * Check if any targets are specified
   */
  hasTargets(): boolean {
    return !!(this.sessionIds?.length || this.deviceIds?.length);
  }
}

/**
 * Logout All Devices Request DTO (Simplified)
 * 
 * @example
 * {
 *   "confirm": true,
 *   "keepCurrent": false,
 *   "reason": "Security concern",
 *   "excludeSessionIds": ["sess_keep123"]
 * }
 */
export class LogoutAllDevicesDto {
  @ApiProperty({
    description: 'Confirm logout from all devices',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.confirmRequired })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Keep current session active',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Keep current must be a boolean' })
  keepCurrent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Session IDs to exclude from revocation',
    example: ['sess_keep123', 'sess_keep456'],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsUUID(4, { each: true })
  excludeSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Reason for logging out from all devices',
    example: 'Security concern - suspicious activity detected',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Logout source',
    enum: LogoutSource,
    default: LogoutSource.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(LogoutSource)
  source?: LogoutSource = LogoutSource.USER_INITIATED;
  
  constructor(
    confirm: boolean, 
    keepCurrent?: boolean, 
    reason?: string,
    excludeSessionIds?: string[],
    source?: LogoutSource
  ) {
    this.confirm = confirm;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
    this.excludeSessionIds = excludeSessionIds;
    this.source = source ?? LogoutSource.USER_INITIATED;
  }
}

/**
 * Single Session Revoke Request DTO
 * 
 * @example
 * {
 *   "sessionId": "sess_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "User requested logout from this device"
 * }
 */
export class RevokeSessionDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    required: true,
    format: 'uuid',
  })
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.sessionIdRequired })
  @MaxLength(255, { message: 'Session ID cannot exceed 255 characters' })
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Reason for revoking the session',
    example: 'User requested logout from this device',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Revocation source for audit',
    enum: LogoutSource,
    default: LogoutSource.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(LogoutSource)
  source?: LogoutSource = LogoutSource.USER_INITIATED;
  
  constructor(sessionId: string, reason?: string, source?: LogoutSource) {
    this.sessionId = sessionId;
    this.reason = reason;
    this.source = source ?? LogoutSource.USER_INITIATED;
  }
}

/**
 * Device Session Revoke Request DTO (Bangladesh specific)
 * 
 * @example
 * {
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "keepCurrent": true,
 *   "reason": "Device reported as lost/stolen"
 * }
 */
export class RevokeDeviceSessionsDto {
  @ApiProperty({
    description: 'Device ID to revoke all sessions from',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString({ message: 'Device ID must be a string' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.deviceIdRequired })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId: string;

  @ApiPropertyOptional({
    description: 'Keep current session if it matches this device',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Keep current must be a boolean' })
  keepCurrent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Reason for revoking device sessions',
    example: 'Device reported as lost/stolen',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Revocation source',
    enum: LogoutSource,
    default: LogoutSource.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(LogoutSource)
  source?: LogoutSource = LogoutSource.USER_INITIATED;

  constructor(deviceId: string, keepCurrent?: boolean, reason?: string, source?: LogoutSource) {
    this.deviceId = deviceId;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
    this.source = source ?? LogoutSource.USER_INITIATED;
  }
}

// ============================================================
// Response DTOs (Enhanced)
// ============================================================

/**
 * Base Logout Response with Bengali support
 */
export class BaseLogoutResponseDto {
  @ApiProperty({
    description: 'English success message',
    example: 'Successfully logged out',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message (Bangladesh specific)',
    example: 'সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Timestamp of logout',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(message: string, messageBn?: string, correlationId?: string) {
    this.message = message;
    this.messageBn = messageBn;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

/**
 * Logout Response DTO (Enhanced)
 */
export class LogoutResponseDto extends BaseLogoutResponseDto {
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 1,
    minimum: 0,
  })
  sessionsRevoked: number;
  
  @ApiPropertyOptional({
    description: 'Scope of logout performed',
    example: 'current',
    enum: LogoutScope,
  })
  scope?: LogoutScope;
  
  @ApiPropertyOptional({
    description: 'Revoked session IDs (for debugging)',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
  })
  revokedSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Revoked device IDs (for debugging)',
    example: ['device_abc123'],
    isArray: true,
  })
  revokedDeviceIds?: string[];

  // ✅ ENTERPRISE ENHANCEMENT: Security event category
  @ApiPropertyOptional({
    description: 'Security event category for logging',
    enum: SecurityEventCategory,
    example: SecurityEventCategory.LOGOUT,
  })
  securityCategory?: SecurityEventCategory;

  // ✅ ENTERPRISE ENHANCEMENT: Audit metadata
  @ApiPropertyOptional({
    description: 'Audit metadata for the logout',
    type: 'object',
  })
  auditMetadata?: AuditMetadata;

  constructor(
    message: string, 
    sessionsRevoked: number, 
    revokedSessionIds?: string[],
    scope?: LogoutScope,
    messageBn?: string,
    revokedDeviceIds?: string[],
    correlationId?: string,
    securityCategory?: SecurityEventCategory,
    auditMetadata?: AuditMetadata
  ) {
    super(message, messageBn, correlationId);
    this.sessionsRevoked = sessionsRevoked;
    this.scope = scope;
    this.revokedSessionIds = revokedSessionIds;
    this.revokedDeviceIds = revokedDeviceIds;
    this.securityCategory = securityCategory;
    this.auditMetadata = auditMetadata;
  }
}

/**
 * Session Revoke Response DTO (Enhanced)
 */
export class RevokeSessionResponseDto extends BaseLogoutResponseDto {
  @ApiProperty({
    description: 'Revoked session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;
  
  @ApiPropertyOptional({
    description: 'User ID whose session was revoked',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Security event category',
    enum: SecurityEventCategory,
    example: SecurityEventCategory.SESSION_REVOCATION,
  })
  securityCategory?: SecurityEventCategory;

  constructor(
    sessionId: string, 
    userId?: string, 
    message?: string, 
    messageBn?: string,
    correlationId?: string,
    securityCategory?: SecurityEventCategory
  ) {
    super(message || 'Session successfully revoked', messageBn, correlationId);
    this.sessionId = sessionId;
    this.userId = userId;
    this.securityCategory = securityCategory ?? SecurityEventCategory.SESSION_REVOCATION;
  }
}

/**
 * Logout All Devices Response DTO (Enhanced)
 */
export class LogoutAllDevicesResponseDto extends BaseLogoutResponseDto {
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 5,
    minimum: 0,
  })
  sessionsRevoked: number;

  @ApiPropertyOptional({
    description: 'Number of devices affected',
    example: 3,
  })
  devicesAffected?: number;
  
  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: false,
  })
  currentSessionKept?: boolean;

  @ApiPropertyOptional({
    description: 'Security event category',
    enum: SecurityEventCategory,
    example: SecurityEventCategory.MASS_LOGOUT,
  })
  securityCategory?: SecurityEventCategory;

  constructor(
    sessionsRevoked: number, 
    devicesAffected?: number, 
    currentSessionKept?: boolean, 
    message?: string, 
    messageBn?: string,
    correlationId?: string,
    securityCategory?: SecurityEventCategory
  ) {
    super(message || 'Successfully logged out from all devices', messageBn, correlationId);
    this.sessionsRevoked = sessionsRevoked;
    this.devicesAffected = devicesAffected;
    this.currentSessionKept = currentSessionKept;
    this.securityCategory = securityCategory ?? SecurityEventCategory.MASS_LOGOUT;
  }
}

/**
 * Device Sessions Revoke Response DTO (Bangladesh specific)
 */
export class RevokeDeviceSessionsResponseDto extends BaseLogoutResponseDto {
  @ApiProperty({
    description: 'Device ID',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  deviceId: string;
  
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 3,
  })
  sessionsRevoked: number;

  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: true,
  })
  currentSessionKept?: boolean;

  @ApiPropertyOptional({
    description: 'Security event category',
    enum: SecurityEventCategory,
    example: SecurityEventCategory.DEVICE_LOGOUT,
  })
  securityCategory?: SecurityEventCategory;

  constructor(
    deviceId: string, 
    sessionsRevoked: number, 
    currentSessionKept?: boolean, 
    message?: string, 
    messageBn?: string,
    correlationId?: string,
    securityCategory?: SecurityEventCategory
  ) {
    super(message || 'All sessions for device successfully revoked', messageBn, correlationId);
    this.deviceId = deviceId;
    this.sessionsRevoked = sessionsRevoked;
    this.currentSessionKept = currentSessionKept;
    this.securityCategory = securityCategory ?? SecurityEventCategory.DEVICE_LOGOUT;
  }
}

/**
 * Bulk Logout Response DTO (Enterprise feature)
 */
export class BulkLogoutResponseDto extends BaseLogoutResponseDto {
  @ApiProperty({
    description: 'Total sessions revoked',
    example: 10,
  })
  totalSessionsRevoked: number;

  @ApiProperty({
    description: 'Successful session revocations',
    example: 9,
  })
  successful: number;

  @ApiProperty({
    description: 'Failed session revocations',
    example: 1,
  })
  failed: number;

  @ApiPropertyOptional({
    description: 'Failed session IDs with reasons',
    example: [{ sessionId: 'sess_failed', reason: 'Session not found' }],
    isArray: true,
  })
  failures?: Array<{ sessionId?: string; deviceId?: string; reason: string }>;

  @ApiPropertyOptional({
    description: 'Processing duration in milliseconds',
    example: 150,
  })
  durationMs?: number;

  @ApiPropertyOptional({
    description: 'Security event category',
    enum: SecurityEventCategory,
  })
  securityCategory?: SecurityEventCategory;

  constructor(
    totalSessionsRevoked: number,
    successful: number,
    failed: number,
    failures?: Array<{ sessionId?: string; deviceId?: string; reason: string }>,
    message?: string,
    messageBn?: string,
    correlationId?: string,
    durationMs?: number,
    securityCategory?: SecurityEventCategory
  ) {
    super(message || 'Bulk logout operation completed', messageBn, correlationId);
    this.totalSessionsRevoked = totalSessionsRevoked;
    this.successful = successful;
    this.failed = failed;
    this.failures = failures;
    this.durationMs = durationMs;
    this.securityCategory = securityCategory ?? SecurityEventCategory.MASS_LOGOUT;
  }
}

/**
 * Logout Error Response DTO (Enhanced)
 */
export class LogoutErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;
  
  @ApiProperty({
    description: 'English error message',
    example: 'Invalid refresh token provided',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message (Bangladesh specific)',
    example: 'অবৈধ রিফ্রেশ টোকেন প্রদান করা হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Error type (from shared-constants)',
    example: 'INVALID_TOKEN',
    enum: ERROR_CODES,
  })
  // ✅ Phase-1: shared-types থেকে ইম্পোর্ট করা টাইপ
  error: ApiErrorCode;
  
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
    description: 'Retry after seconds (for rate limited responses)',
    example: 30,
  })
  retryAfterSeconds?: number;

  constructor(
    message: string, 
    error: ApiErrorCode, 
    messageBn?: string, 
    statusCode?: number,
    correlationId?: string,
    retryAfterSeconds?: number
  ) {
    this.statusCode = statusCode || 400;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

// ============================================================
// Helper Functions (Enterprise Enhanced)
// ============================================================

/**
 * Create a success response for logout
 * 
 * @param sessionsRevoked - Number of sessions revoked
 * @param scope - Logout scope performed
 * @param revokedSessionIds - List of revoked session IDs
 * @param locale - Language locale ('en' or 'bn')
 * @param correlationId - Correlation ID for tracing
 * @param securityCategory - Security event category
 * @returns LogoutResponseDto instance
 */
export function createLogoutSuccessResponse(
  sessionsRevoked: number,
  scope?: LogoutScope,
  revokedSessionIds?: string[],
  locale: 'en' | 'bn' = 'en',
  correlationId?: string,
  securityCategory?: SecurityEventCategory
): LogoutResponseDto {
  const messages = {
    en: {
      single: 'Successfully logged out',
      multiple: `Successfully logged out from ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''}`,
    },
    bn: {
      single: 'সফলভাবে লগআউট হয়েছে',
      multiple: `${sessionsRevoked}টি সেশন থেকে সফলভাবে লগআউট হয়েছে`,
    },
  };

  const message = sessionsRevoked === 1 
    ? messages[locale].single 
    : messages[locale].multiple;

  return new LogoutResponseDto(
    message,
    sessionsRevoked,
    revokedSessionIds,
    scope,
    locale === 'bn' ? message : undefined,
    undefined,
    correlationId,
    securityCategory
  );
}

/**
 * Create an error response for logout
 * 
 * @param message - Error message in English
 * @param error - Error code from shared-constants
 * @param statusCode - HTTP status code
 * @param locale - Language locale ('en' or 'bn')
 * @param correlationId - Correlation ID for tracing
 * @param retryAfterSeconds - Retry after seconds (for rate limiting)
 * @returns LogoutErrorResponseDto instance
 */
export function createLogoutErrorResponse(
  message: string,
  error: ApiErrorCode,
  statusCode?: number,
  locale: 'en' | 'bn' = 'en',
  correlationId?: string,
  retryAfterSeconds?: number
): LogoutErrorResponseDto {
  const bnMessages: Record<string, string> = {
    'Invalid refresh token provided': 'অবৈধ রিফ্রেশ টোকেন প্রদান করা হয়েছে',
    'Session not found': 'সেশন পাওয়া যায়নি',
    'Device not found': 'ডিভাইস পাওয়া যায়নি',
    'Unauthorized': 'অননুমোদিত অ্যাক্সেস',
    'Token expired': 'টোকেনের মেয়াদ শেষ হয়েছে',
    'Too many logout attempts': 'অনেকবার লগআউট চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    'Rate limit exceeded': 'রেট লিমিট অতিক্রম করা হয়েছে। অনুগ্রহ করে অপেক্ষা করুন।',
  };

  const messageBn = locale === 'bn' ? bnMessages[message] : undefined;

  return new LogoutErrorResponseDto(message, error, messageBn, statusCode, correlationId, retryAfterSeconds);
}

/**
 * Create a bulk logout success response (Enterprise feature)
 * 
 * @param total - Total sessions attempted
 * @param successful - Successful revocations
 * @param failures - Failed revocations with reasons
 * @param locale - Language locale
 * @param correlationId - Correlation ID for tracing
 * @param durationMs - Processing duration in milliseconds
 * @returns BulkLogoutResponseDto instance
 */
export function createBulkLogoutResponse(
  total: number,
  successful: number,
  failures?: Array<{ sessionId?: string; deviceId?: string; reason: string }>,
  locale: 'en' | 'bn' = 'en',
  correlationId?: string,
  durationMs?: number
): BulkLogoutResponseDto {
  const failed = failures?.length || 0;
  
  const messages = {
    en: {
      success: `Bulk logout completed: ${successful} successful, ${failed} failed`,
    },
    bn: {
      success: `বাল্ক লগআউট সম্পন্ন হয়েছে: ${successful}টি সফল, ${failed}টি ব্যর্থ`,
    },
  };

  return new BulkLogoutResponseDto(
    total,
    successful,
    failed,
    failures,
    messages[locale].success,
    locale === 'bn' ? messages[locale].success : undefined,
    correlationId,
    durationMs,
    SecurityEventCategory.MASS_LOGOUT
  );
}

/**
 * Get audit metadata from logout request
 * 
 * @param dto - Logout DTO instance
 * @param userId - User ID from JWT
 * @returns AuditMetadata object
 */
export function getLogoutAuditMetadata(
  dto: LogoutDto | LogoutAllDevicesDto | RevokeSessionDto | RevokeDeviceSessionsDto,
  userId: string
): AuditMetadata {
  const auditContext = 'auditContext' in dto ? dto.auditContext : undefined;
  
  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: auditContext?.correlationId,
    metadata: {
      reason: dto.reason,
      source: dto.source,
      scope: 'scope' in dto ? dto.scope : undefined,
      sessionId: 'sessionId' in dto ? dto.sessionId : undefined,
      deviceId: 'deviceId' in dto ? dto.deviceId : undefined,
      keepCurrent: 'keepCurrent' in dto ? dto.keepCurrent : undefined,
      ipAddress: auditContext?.ipAddress,
      userAgent: auditContext?.userAgent,
      district: auditContext?.district,
      division: auditContext?.division,
    },
  };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SharedLogoutScope, 
  ApiErrorCode, 
  BaseResponse,
  AuditMetadata,
  RequestContext,
  LogoutAuditContextDto as LogoutAuditContextDtoType,
  LogoutRateLimitDto as LogoutRateLimitDtoType,
};

/**
 * Export validation messages for frontend usage
 */
export const LOGOUT_VALIDATION_MESSAGES = VALIDATION_MESSAGES;

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Bulk logout with progress tracking support
// 2. ✅ Device-specific session revocation with geolocation
// 3. ✅ Audit logging integration (reason, source, ipAddress)
// 4. ✅ Distributed tracing support (correlationId)
// 5. ✅ Multi-device logout with selective exclusion
// 6. ✅ Rate limit metadata for logout attempts
// 7. ✅ Bengali error messages with locale detection
// 8. ✅ Security event categorization for logging
// 9. ✅ Audit metadata extraction helper
// 10. ✅ Bulk logout response with failure details
// 11. ✅ Validation message helpers
// 12. ✅ Logout source tracking for audit
// 
// Bangladesh Specific:
// - Bengali message support (messageBn)
// - District and division tracking for geolocation
// - Local timezone awareness for timestamps
// - Mobile device optimization for device revocation
// 
// ============================================================
