/**
 * Revoke All Sessions DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/session/revoke-all-sessions.dto
 * 
 * @description
 * Data transfer objects for revoking all user sessions.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Confirmation required for destructive actions
 * ✅ Separate DTO for admin operations with role check
 * ✅ Bangladesh specific - Device type filtering support
 * 
 * Flow:
 * 1. User authenticates with JWT
 * 2. User requests to revoke all sessions
 * 3. Server revokes all sessions except current (if specified)
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsBoolean,
  IsUUID,
  IsNumber,
  Min,
  IsArray,
  IsIn,
  MaxLength,
  ArrayMaxSize,
  ValidateIf
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-constants & shared-types) থেকে ইম্পোর্ট
import { 
  SESSION_CONFIG, 
  BATCH_CONFIG,
  DEVICE_TYPES,
  TRUST_LEVELS,
  REVOCATION_SCOPES
} from '@vubon/shared-constants';
import type { 
  DeviceType, 
  TrustLevel, 
  RevocationScope 
} from '@vubon/shared-types';

// ============================================================
// Request DTOs
// ============================================================

/**
 * Revoke All Sessions Request DTO (For regular users)
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example
 * {
 *   "confirm": true,
 *   "excludeCurrentSession": true,
 *   "currentSessionId": "sess_550e8400-e29b-41d4-a716-446655440000"
 * }
 * 
 * @example (Revoke only mobile device sessions)
 * {
 *   "confirm": true,
 *   "scope": "by_device_type",
 *   "deviceTypes": ["mobile", "tablet"],
 *   "excludeCurrentSession": true
 * }
 */
export class RevokeAllSessionsDto {
  @ApiProperty({
    description: 'Confirmation to revoke sessions (destructive action)',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @IsNotEmpty({ message: 'Confirmation is required for revoking sessions' })
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
  @IsString({ message: 'Current session ID must be a string' })
  @IsUUID(4, { message: 'Current session ID must be a valid UUID' })
  currentSessionId?: string;

  @ApiPropertyOptional({
    description: 'Device types to revoke (when scope is by_device_type)',
    example: [DEVICE_TYPES.MOBILE, DEVICE_TYPES.TABLET],
    enum: DEVICE_TYPES,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Device types must be an array' })
  @ArrayMaxSize(10, { message: 'Maximum 10 device types allowed' })
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
  @ArrayMaxSize(4, { message: 'Maximum 4 trust levels allowed' })
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
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(
    confirm: boolean,
    excludeCurrentSession?: boolean,
    currentSessionId?: string,
    reason?: string,
    scope?: RevocationScope,
    deviceTypes?: DeviceType[],
    trustLevels?: TrustLevel[]
  ) {
    this.confirm = confirm;
    this.excludeCurrentSession = excludeCurrentSession ?? true;
    this.currentSessionId = currentSessionId;
    this.reason = reason;
    this.scope = scope ?? REVOCATION_SCOPES.EXCEPT_CURRENT;
    this.deviceTypes = deviceTypes;
    this.trustLevels = trustLevels;
  }
}

/**
 * Admin Revoke User Sessions Request DTO
 * For administrators to revoke sessions of other users
 */
export class AdminRevokeSessionsDto {
  @ApiProperty({
    description: 'User ID whose sessions to revoke',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  targetUserId: string;

  @ApiProperty({
    description: 'Confirmation to revoke sessions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @IsNotEmpty({ message: 'Confirmation is required' })
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

  constructor(
    targetUserId: string, 
    confirm: boolean, 
    reason?: string, 
    adminId?: string,
    scope?: RevocationScope,
    deviceTypes?: DeviceType[],
    trustLevels?: TrustLevel[]
  ) {
    this.targetUserId = targetUserId;
    this.confirm = confirm;
    this.reason = reason;
    this.adminId = adminId;
    this.scope = scope ?? REVOCATION_SCOPES.ALL;
    this.deviceTypes = deviceTypes;
    this.trustLevels = trustLevels;
  }
}

/**
 * Bulk Revoke Sessions Request DTO (for multiple users)
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
    message: `Maximum ${BATCH_CONFIG.MAX_USERS_PER_BATCH} users per batch` 
  })
  @IsUUID(4, { each: true, message: 'Each user ID must be a valid UUID' })
  userIds: string[];

  @ApiProperty({
    description: 'Confirmation to revoke sessions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Confirm must be a boolean' })
  @IsNotEmpty({ message: 'Confirmation is required' })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Reason for bulk revocation',
    example: 'Security incident - mass token compromise',
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

  constructor(userIds: string[], confirm: boolean, reason?: string, adminId?: string) {
    this.userIds = userIds;
    this.confirm = confirm;
    this.reason = reason;
    this.adminId = adminId;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Revoke All Sessions Response DTO
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

  constructor(
    success: boolean,
    sessionsRevokedCount: number,
    message?: string,
    messageBn?: string,
    currentSessionId?: string,
    currentSessionExcluded?: boolean,
    revokedSessionIds?: string[]
  ) {
    this.success = success;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.message = message || `${sessionsRevokedCount} session(s) revoked successfully`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.currentSessionId = currentSessionId;
    this.currentSessionExcluded = currentSessionExcluded;
    this.revokedSessionIds = revokedSessionIds;
  }

  /**
   * Create success response
   */
  static success(
    sessionsRevokedCount: number,
    currentSessionId?: string,
    currentSessionExcluded?: boolean,
    revokedSessionIds?: string[],
    messageBn?: string
  ): RevokeAllSessionsResponseDto {
    return new RevokeAllSessionsResponseDto(
      true,
      sessionsRevokedCount,
      undefined,
      messageBn,
      currentSessionId,
      currentSessionExcluded,
      revokedSessionIds
    );
  }

  /**
   * Create failure response
   */
  static error(message: string, messageBn?: string): RevokeAllSessionsResponseDto {
    return new RevokeAllSessionsResponseDto(false, 0, message, messageBn);
  }
}

/**
 * Admin Revoke Sessions Response DTO
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

  constructor(
    success: boolean,
    targetUserId: string,
    sessionsRevokedCount: number,
    adminId: string,
    message?: string,
    messageBn?: string
  ) {
    this.success = success;
    this.targetUserId = targetUserId;
    this.sessionsRevokedCount = sessionsRevokedCount;
    this.adminId = adminId;
    this.message = message || `${sessionsRevokedCount} session(s) revoked for user ${targetUserId}`;
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
  }
}

/**
 * Bulk Revoke Sessions Response DTO (for multiple users)
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

  constructor(
    totalUsers: number,
    successfulCount: number,
    failedCount: number,
    totalSessionsRevoked: number,
    failures?: Record<string, string>
  ) {
    this.totalUsers = totalUsers;
    this.successfulCount = successfulCount;
    this.failedCount = failedCount;
    this.totalSessionsRevoked = totalSessionsRevoked;
    this.failures = failures;
    this.completedAt = new Date().toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RevocationScope, DeviceType, TrustLevel };
