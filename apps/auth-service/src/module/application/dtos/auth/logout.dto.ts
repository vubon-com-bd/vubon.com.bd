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
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUUID,
  MaxLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Types
// ============================================================

export type LogoutScope = 'current' | 'all' | 'device' | 'except_current';

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
 *   "deviceId": "device_xyz789"
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
    enum: ['current', 'all', 'device', 'except_current'],
    default: 'current',
  })
  @IsOptional()
  @IsIn(['current', 'all', 'device', 'except_current'], { 
    message: 'Scope must be current, all, device, or except_current' 
  })
  scope?: LogoutScope = 'current';
  
  @ApiPropertyOptional({
    description: 'Specific session ID to revoke (used with scope="current")',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Session ID must be a string' })
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
    this.scope = scope ?? 'current';
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
 */
export class RevokeSessionDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString({ message: 'Session ID must be a string' })
  @IsNotEmpty({ message: 'Session ID is required' })
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
 */
export class RevokeDeviceSessionsDto {
  @ApiProperty({
    description: 'Device ID to revoke all sessions from',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsString({ message: 'Device ID must be a string' })
  @IsNotEmpty({ message: 'Device ID is required' })
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
    example: 'current',
    enum: ['current', 'all', 'device'],
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
    enum: ['INVALID_TOKEN', 'TOKEN_EXPIRED', 'SESSION_NOT_FOUND', 'DEVICE_NOT_FOUND', 'UNAUTHORIZED'],
  })
  error: string;
  
  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  constructor(message: string, error: string, messageBn?: string) {
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

export type { LogoutScope as LogoutScopeType };
