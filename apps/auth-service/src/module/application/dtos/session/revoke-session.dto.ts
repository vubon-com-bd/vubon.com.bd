/**
 * Revoke Session DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/session/revoke-session.dto
 * 
 * @description
 * Data transfer objects for revoking a specific user session.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Session ownership validation in application layer
 * ✅ Optional reason for audit trail
 * ✅ Bangladesh specific - Device ID support for revoking by device
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
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Request DTOs
// ============================================================

/**
 * Revoke Session Request DTO
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example
 * {
 *   "sessionId": "sess_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "Suspicious activity detected on this device"
 * }
 */
export class RevokeSessionDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Session ID is required' })
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Reason for revoking session (for audit trail)',
    example: 'Security precaution - unusual activity detected',
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
 * Revoke Sessions by Device Request DTO (Bangladesh specific)
 * 
 * @example
 * {
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "excludeCurrentSession": true,
 *   "reason": "Device reported as lost"
 * }
 */
export class RevokeSessionsByDeviceDto {
  @ApiProperty({
    description: 'Device ID to revoke all sessions from',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsString({ message: 'Device ID must be a string' })
  @IsNotEmpty({ message: 'Device ID is required' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId: string;

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
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(deviceId: string, excludeCurrentSession?: boolean, reason?: string) {
    this.deviceId = deviceId;
    this.excludeCurrentSession = excludeCurrentSession ?? true;
    this.reason = reason;
  }
}

/**
 * Admin Revoke Session Request DTO
 * For administrators to revoke sessions of other users
 */
export class AdminRevokeSessionDto {
  @ApiProperty({
    description: 'User ID whose session to revoke',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  targetUserId: string;

  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Session ID is required' })
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Reason for admin revocation',
    example: 'Policy violation',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Admin ID who performed the action',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Admin ID must be a valid UUID' })
  adminId?: string;

  constructor(targetUserId: string, sessionId: string, reason?: string, adminId?: string) {
    this.targetUserId = targetUserId;
    this.sessionId = sessionId;
    this.reason = reason;
    this.adminId = adminId;
  }
}

/**
 * Bulk Revoke Sessions Request DTO
 */
export class BulkRevokeSessionsDto {
  @ApiProperty({
    description: 'Session IDs to revoke',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
    required: true,
  })
  @IsArray({ message: 'Session IDs must be an array' })
  @ArrayMinSize(1, { message: 'At least one session ID is required' })
  @ArrayMaxSize(100, { message: 'Cannot revoke more than 100 sessions at once' })
  @IsUUID(4, { each: true, message: 'Each session ID must be a valid UUID' })
  sessionIds: string[];

  @ApiPropertyOptional({
    description: 'Reason for bulk revocation',
    example: 'Security incident - mass logout required',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'User ID (if revoking sessions for a specific user)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  userId?: string;

  constructor(sessionIds: string[], reason?: string, userId?: string) {
    this.sessionIds = sessionIds;
    this.reason = reason;
    this.userId = userId;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Revoke Session Response DTO
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

  constructor(
    success: boolean, 
    sessionId: string, 
    message?: string,
    messageBn?: string,
    userId?: string,
    wasCurrentSession?: boolean,
    deviceId?: string
  ) {
    this.success = success;
    this.sessionId = sessionId;
    this.message = message || (success ? 'Session revoked successfully' : 'Failed to revoke session');
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.userId = userId;
    this.wasCurrentSession = wasCurrentSession;
    this.deviceId = deviceId;
  }

  /**
   * Create success response
   */
  static success(
    sessionId: string, 
    userId?: string, 
    wasCurrentSession?: boolean,
    deviceId?: string,
    messageBn?: string
  ): RevokeSessionResponseDto {
    return new RevokeSessionResponseDto(true, sessionId, undefined, messageBn, userId, wasCurrentSession, deviceId);
  }

  /**
   * Create failure response
   */
  static error(sessionId: string, message: string, messageBn?: string): RevokeSessionResponseDto {
    return new RevokeSessionResponseDto(false, sessionId, message, messageBn);
  }
}

/**
 * Revoke Sessions by Device Response DTO
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

  constructor(
    success: boolean,
    deviceId: string,
    sessionsRevokedCount: number,
    message?: string,
    messageBn?: string,
    currentSessionExcluded?: boolean
  ) {
    this.success = success;
    this.deviceId = deviceId;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.message = message || `${sessionsRevokedCount} session(s) revoked for device ${deviceId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.currentSessionExcluded = currentSessionExcluded;
  }
}

/**
 * Admin Revoke Session Response DTO
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

  constructor(
    success: boolean,
    targetUserId: string,
    sessionId: string,
    adminId: string,
    message?: string,
    messageBn?: string
  ) {
    this.success = success;
    this.targetUserId = targetUserId;
    this.sessionId = sessionId;
    this.adminId = adminId;
    this.message = message || `Session ${sessionId} revoked successfully for user ${targetUserId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
  }
}

/**
 * Bulk Revoke Sessions Response DTO
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

  constructor(
    successfulCount: number, 
    failedCount: number, 
    failures?: Record<string, string>,
    revokedSessionIds?: string[]
  ) {
    this.successfulCount = successfulCount;
    this.failedCount = failedCount;
    this.failures = failures;
    this.completedAt = new Date().toISOString();
    this.revokedSessionIds = revokedSessionIds;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RevokeSessionDto as RevokeSessionRequestDto };
