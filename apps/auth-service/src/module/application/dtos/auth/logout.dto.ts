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
 * ✅ Connected with shared-constants and shared-types (Phase 1)
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
  MaxLength,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Phase 1 Imports (shared-constants & shared-types)
// ============================================================

// ✅ Import from shared-constants for consistency
import { 
  LOGOUT_SCOPE,
  LOGOUT_REASONS,
  MAX_SESSION_ID_LENGTH,
  MAX_DEVICE_ID_LENGTH,
  MAX_REASON_LENGTH,
} from '@vubon/shared-constants';

// ✅ Import from shared-types for standardized error codes
import type { ApiErrorCode, SessionId, DeviceId } from '@vubon/shared-types';

// ============================================================
// Types (using constants for values)
// ============================================================

// ✅ Logout scope type using constants values
export type LogoutScope = typeof LOGOUT_SCOPE[keyof typeof LOGOUT_SCOPE];
export type LogoutReason = typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];

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
 *   "reason": "USER_INITIATED"
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
    example: LOGOUT_SCOPE.CURRENT,
    enum: Object.values(LOGOUT_SCOPE),
    default: LOGOUT_SCOPE.CURRENT,
  })
  @IsOptional()
  // ✅ Using constant values for validation
  @IsIn(Object.values(LOGOUT_SCOPE), { 
    message: `Scope must be one of: ${Object.values(LOGOUT_SCOPE).join(', ')}` 
  })
  scope?: LogoutScope = LOGOUT_SCOPE.CURRENT;
  
  @ApiPropertyOptional({
    description: 'Specific session ID to revoke (used with scope="current")',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    maxLength: MAX_SESSION_ID_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Session ID must be a string' })
  @MaxLength(MAX_SESSION_ID_LENGTH, { 
    message: `Session ID cannot exceed ${MAX_SESSION_ID_LENGTH} characters` 
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device ID to revoke sessions from (used with scope="device")',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: MAX_DEVICE_ID_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(MAX_DEVICE_ID_LENGTH, { 
    message: `Device ID cannot exceed ${MAX_DEVICE_ID_LENGTH} characters` 
  })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Reason for logout (for audit)',
    example: LOGOUT_REASONS.USER_INITIATED,
    enum: Object.values(LOGOUT_REASONS),
    maxLength: MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsIn(Object.values(LOGOUT_REASONS), { 
    message: `Reason must be one of: ${Object.values(LOGOUT_REASONS).join(', ')}` 
  })
  reason?: LogoutReason;

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
    reason?: LogoutReason,
    keepCurrent?: boolean
  ) {
    this.refreshToken = refreshToken;
    this.scope = scope ?? LOGOUT_SCOPE.CURRENT;
    this.sessionId = sessionId;
    this.deviceId = deviceId;
    this.reason = reason;
    this.keepCurrent = keepCurrent ?? false;
  }
}

/**
 * Logout All Devices Request DTO (Simplified)
 */
export class LogoutAllDevicesDto {
  @ApiProperty({
    description: 'Confirm logout from all devices',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @IsNotEmpty({ message: 'Confirmation is required' })
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
    example: LOGOUT_REASONS.SECURITY_CONCERN,
    enum: Object.values(LOGOUT_REASONS),
    maxLength: MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsIn(Object.values(LOGOUT_REASONS), { 
    message: `Reason must be one of: ${Object.values(LOGOUT_REASONS).join(', ')}` 
  })
  reason?: LogoutReason;
  
  constructor(confirm: boolean, keepCurrent?: boolean, reason?: LogoutReason) {
    this.confirm = confirm;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
  }
}

/**
 * Single Session Revoke Request DTO
 */
export class RevokeSessionDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    required: true,
    maxLength: MAX_SESSION_ID_LENGTH,
  })
  @IsString({ message: 'Session ID must be a string' })
  @IsNotEmpty({ message: 'Session ID is required' })
  @MaxLength(MAX_SESSION_ID_LENGTH, { 
    message: `Session ID cannot exceed ${MAX_SESSION_ID_LENGTH} characters` 
  })
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Reason for revoking the session',
    example: LOGOUT_REASONS.USER_INITIATED,
    enum: Object.values(LOGOUT_REASONS),
    maxLength: MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsIn(Object.values(LOGOUT_REASONS), { 
    message: `Reason must be one of: ${Object.values(LOGOUT_REASONS).join(', ')}` 
  })
  reason?: LogoutReason;
  
  constructor(sessionId: string, reason?: LogoutReason) {
    this.sessionId = sessionId;
    this.reason = reason;
  }
}

/**
 * Device Session Revoke Request DTO (Bangladesh specific)
 */
export class RevokeDeviceSessionsDto {
  @ApiProperty({
    description: 'Device ID to revoke all sessions from',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    required: true,
    maxLength: MAX_DEVICE_ID_LENGTH,
  })
  @IsString({ message: 'Device ID must be a string' })
  @IsNotEmpty({ message: 'Device ID is required' })
  @MaxLength(MAX_DEVICE_ID_LENGTH, { 
    message: `Device ID cannot exceed ${MAX_DEVICE_ID_LENGTH} characters` 
  })
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
    example: LOGOUT_REASONS.DEVICE_LOST,
    enum: Object.values(LOGOUT_REASONS),
    maxLength: MAX_REASON_LENGTH,
  })
  @IsOptional()
  @IsIn(Object.values(LOGOUT_REASONS), { 
    message: `Reason must be one of: ${Object.values(LOGOUT_REASONS).join(', ')}` 
  })
  reason?: LogoutReason;

  constructor(deviceId: string, keepCurrent?: boolean, reason?: LogoutReason) {
    this.deviceId = deviceId;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Logout Response DTO
 */
export class LogoutResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Successfully logged out',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Number of sessions revoked',
    example: 1,
    minimum: 0,
  })
  sessionsRevoked: number;
  
  @ApiProperty({
    description: 'Timestamp of logout',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Scope of logout performed',
    example: LOGOUT_SCOPE.CURRENT,
    enum: Object.values(LOGOUT_SCOPE),
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
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.timestamp = new Date().toISOString();
    this.scope = scope;
    this.revokedSessionIds = revokedSessionIds;
    this.revokedDeviceIds = revokedDeviceIds;
  }
}

/**
 * Session Revoke Response DTO
 */
export class RevokeSessionResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Session successfully revoked',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সেশন সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Revoked session ID',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;
  
  @ApiProperty({
    description: 'Revocation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  @ApiPropertyOptional({
    description: 'User ID whose session was revoked',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string;

  constructor(sessionId: string, userId?: string, message?: string, messageBn?: string) {
    this.message = message || 'Session successfully revoked';
    this.messageBn = messageBn;
    this.sessionId = sessionId;
    this.revokedAt = new Date().toISOString();
    this.userId = userId;
  }
}

/**
 * Logout All Devices Response DTO
 */
export class LogoutAllDevicesResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Successfully logged out from all devices',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সব ডিভাইস থেকে সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;
  
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
  
  @ApiProperty({
    description: 'Timestamp of logout',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: false,
  })
  currentSessionKept?: boolean;

  constructor(sessionsRevoked: number, devicesAffected?: number, currentSessionKept?: boolean, message?: string, messageBn?: string) {
    this.message = message || 'Successfully logged out from all devices';
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.devicesAffected = devicesAffected;
    this.timestamp = new Date().toISOString();
    this.currentSessionKept = currentSessionKept;
  }
}

/**
 * Device Sessions Revoke Response DTO (Bangladesh specific)
 */
export class RevokeDeviceSessionsResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'All sessions for device successfully revoked',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ডিভাইসের সব সেশন সফলভাবে রিভোক করা হয়েছে',
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
  sessionsRevoked: number;

  @ApiPropertyOptional({
    description: 'Whether current session was kept',
    example: true,
  })
  currentSessionKept?: boolean;
  
  @ApiProperty({
    description: 'Revocation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  constructor(deviceId: string, sessionsRevoked: number, currentSessionKept?: boolean, message?: string, messageBn?: string) {
    this.message = message || 'All sessions for device successfully revoked';
    this.messageBn = messageBn;
    this.deviceId = deviceId;
    this.sessionsRevoked = sessionsRevoked;
    this.currentSessionKept = currentSessionKept;
    this.revokedAt = new Date().toISOString();
  }
}

/**
 * Logout Error Response DTO
 * ✅ Using shared-types for standardized error codes
 */
export class LogoutErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;
  
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid refresh token provided',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'অবৈধ রিফ্রেশ টোকেন প্রদান করা হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Error type',
    example: 'INVALID_TOKEN',
    enum: [
      'INVALID_TOKEN', 
      'TOKEN_EXPIRED', 
      'SESSION_NOT_FOUND', 
      'DEVICE_NOT_FOUND', 
      'UNAUTHORIZED',
      'INVALID_SESSION',
      'SESSION_ALREADY_REVOKED'
    ],
  })
  // ✅ Using ApiErrorCode type from shared-types
  error: ApiErrorCode;
  
  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  constructor(message: string, error: ApiErrorCode, messageBn?: string) {
    this.statusCode = 400;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LogoutScope as LogoutScopeType, LogoutReason as LogoutReasonType };
