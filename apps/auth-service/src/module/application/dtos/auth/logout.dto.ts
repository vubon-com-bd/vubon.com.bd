/**
 * Logout DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/logout.dto
 * 
 * @description
 * Data transfer objects for logout functionality.
 * NO business logic, NO database queries, NO infrastructure imports.
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
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Phase-1 Imports (shared-constants & shared-types)
// ============================================================

// ✅ Phase-1: shared-constants থেকে ইম্পোর্ট
import { 
  LOGOUT_SCOPE, 
  ERROR_CODES,
  TOKEN_EXPIRY,
  SESSION_TTL,
} from '@vubon/shared-constants';

// ✅ Phase-1: shared-types থেকে টাইপ ইম্পোর্ট
import type { 
  LogoutScope as SharedLogoutScope, 
  ApiErrorCode,
  BaseResponse,
} from '@vubon/shared-types';

// ============================================================
// Types & Enums (Constants থেকে তৈরি)
// ============================================================

/**
 * Logout scope (based on shared-constants)
 */
export const LogoutScope = LOGOUT_SCOPE;
export type LogoutScope = typeof LOGOUT_SCOPE[keyof typeof LOGOUT_SCOPE];

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
  },
  // Bengali messages (Bangladesh specific)
  bn: {
    sessionIdRequired: 'সেশন আইডি প্রয়োজন',
    deviceIdRequired: 'ডিভাইস আইডি প্রয়োজন',
    confirmRequired: 'নিশ্চিতকরণ প্রয়োজন',
    invalidScope: `স্কোপ অবশ্যই এর মধ্যে একটি হতে হবে: ${Object.values(LogoutScope).join(', ')}`,
  },
};

// ============================================================
// Request DTOs
// ============================================================

/**
 * Logout Request DTO
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
 *   "reason": "User initiated logout"
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
    description: 'Specific session ID to revoke (used with scope="current")',
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

  constructor(
    refreshToken?: string, 
    scope?: LogoutScope, 
    sessionId?: string,
    deviceId?: string,
    reason?: string,
    keepCurrent?: boolean
  ) {
    this.refreshToken = refreshToken;
    this.scope = scope ?? LogoutScope.CURRENT;
    this.sessionId = sessionId;
    this.deviceId = deviceId;
    this.reason = reason;
    this.keepCurrent = keepCurrent ?? false;
  }
}

/**
 * Logout All Devices Request DTO (Simplified)
 * 
 * @example
 * {
 *   "confirm": true,
 *   "keepCurrent": false,
 *   "reason": "Security concern"
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
    description: 'Reason for logging out from all devices',
    example: 'Security concern - suspicious activity detected',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;
  
  constructor(confirm: boolean, keepCurrent?: boolean, reason?: string) {
    this.confirm = confirm;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
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
  
  constructor(sessionId: string, reason?: string) {
    this.sessionId = sessionId;
    this.reason = reason;
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

  constructor(deviceId: string, keepCurrent?: boolean, reason?: string) {
    this.deviceId = deviceId;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
  }
}

// ============================================================
// Response DTOs
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

  constructor(message: string, messageBn?: string) {
    this.message = message;
    this.messageBn = messageBn;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Logout Response DTO
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

  constructor(
    message: string, 
    sessionsRevoked: number, 
    revokedSessionIds?: string[],
    scope?: LogoutScope,
    messageBn?: string,
    revokedDeviceIds?: string[]
  ) {
    super(message, messageBn);
    this.sessionsRevoked = sessionsRevoked;
    this.scope = scope;
    this.revokedSessionIds = revokedSessionIds;
    this.revokedDeviceIds = revokedDeviceIds;
  }
}

/**
 * Session Revoke Response DTO
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

  constructor(sessionId: string, userId?: string, message?: string, messageBn?: string) {
    super(message || 'Session successfully revoked', messageBn);
    this.sessionId = sessionId;
    this.userId = userId;
  }
}

/**
 * Logout All Devices Response DTO
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

  constructor(
    sessionsRevoked: number, 
    devicesAffected?: number, 
    currentSessionKept?: boolean, 
    message?: string, 
    messageBn?: string
  ) {
    super(message || 'Successfully logged out from all devices', messageBn);
    this.sessionsRevoked = sessionsRevoked;
    this.devicesAffected = devicesAffected;
    this.currentSessionKept = currentSessionKept;
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

  constructor(
    deviceId: string, 
    sessionsRevoked: number, 
    currentSessionKept?: boolean, 
    message?: string, 
    messageBn?: string
  ) {
    super(message || 'All sessions for device successfully revoked', messageBn);
    this.deviceId = deviceId;
    this.sessionsRevoked = sessionsRevoked;
    this.currentSessionKept = currentSessionKept;
  }
}

/**
 * Logout Error Response DTO
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

  constructor(message: string, error: ApiErrorCode, messageBn?: string, statusCode?: number) {
    this.statusCode = statusCode || 400;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Create a success response for logout
 */
export function createLogoutSuccessResponse(
  sessionsRevoked: number,
  scope?: LogoutScope,
  revokedSessionIds?: string[],
  locale: 'en' | 'bn' = 'en'
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
    locale === 'bn' ? message : undefined
  );
}

/**
 * Create an error response for logout
 */
export function createLogoutErrorResponse(
  message: string,
  error: ApiErrorCode,
  statusCode?: number,
  locale: 'en' | 'bn' = 'en'
): LogoutErrorResponseDto {
  const bnMessages: Record<string, string> = {
    'Invalid refresh token provided': 'অবৈধ রিফ্রেশ টোকেন প্রদান করা হয়েছে',
    'Session not found': 'সেশন পাওয়া যায়নি',
    'Device not found': 'ডিভাইস পাওয়া যায়নি',
    'Unauthorized': 'অননুমোদিত অ্যাক্সেস',
    'Token expired': 'টোকেনের মেয়াদ শেষ হয়েছে',
  };

  const messageBn = locale === 'bn' ? bnMessages[message] : undefined;

  return new LogoutErrorResponseDto(message, error, messageBn, statusCode);
}

// ============================================================
// Type Exports
// ============================================================

export type { SharedLogoutScope, ApiErrorCode, BaseResponse };
