/**
 * Refresh Token DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/refresh-token.dto
 * 
 * @description
 * Data transfer objects for token refresh functionality.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ No JWT signature verification (infrastructure concern)
 * ✅ Device tracking for security audit
 * ✅ Token rotation support
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
  MaxLength,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Request DTOs
// ============================================================

/**
 * Refresh Token Request DTO
 * 
 * @example
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE1MTYyMzkwMjJ9",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "sessionId": "sess_abc123"
 * }
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE1MTYyMzkwMjJ9',
    required: true,
    minLength: 20,
    maxLength: 2048,
  })
  @IsString({ message: 'Refresh token must be a string' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  @MaxLength(2048, { message: 'Refresh token cannot exceed 2048 characters' })
  @Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, {
    message: 'Refresh token must be a valid JWT format',
  })
  refreshToken: string;
  
  @ApiPropertyOptional({
    description: 'Device identifier for security tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;
  
  @ApiPropertyOptional({
    description: 'Session ID for tracking',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'User agent for security logging',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'User agent must be a string' })
  @MaxLength(500, { message: 'User agent cannot exceed 500 characters' })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'IP address for security logging',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString({ message: 'IP address must be a string' })
  @Matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
    message: 'IP address must be a valid IPv4 address',
  })
  ipAddress?: string;
  
  constructor(refreshToken: string, deviceId?: string, sessionId?: string, userAgent?: string, ipAddress?: string) {
    this.refreshToken = refreshToken;
    this.deviceId = deviceId;
    this.sessionId = sessionId;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Token Refresh Response DTO
 */
export class TokenRefreshResponseDto {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ',
  })
  accessToken: string;
  
  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: 900,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  expiresIn: number;
  
  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string = 'Bearer';
  
  @ApiPropertyOptional({
    description: 'New refresh token (if rotation is enabled)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE1MTYyMzkwMjJ9',
  })
  refreshToken?: string;
  
  @ApiPropertyOptional({
    description: 'Refresh token expiry time in seconds',
    example: 604800,
  })
  @IsNumber()
  @Min(1)
  refreshExpiresIn?: number;
  
  @ApiPropertyOptional({
    description: 'Whether token rotation occurred',
    example: true,
  })
  @IsBoolean()
  rotated?: boolean;

  @ApiPropertyOptional({
    description: 'New session ID (if session was rotated)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  constructor(
    accessToken: string,
    expiresIn: number,
    refreshToken?: string,
    refreshExpiresIn?: number,
    rotated?: boolean,
    sessionId?: string
  ) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
    if (refreshExpiresIn) {
      this.refreshExpiresIn = refreshExpiresIn;
    }
    this.rotated = rotated;
    this.sessionId = sessionId;
  }
}

/**
 * Token Revoke Response DTO
 */
export class TokenRevokeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Token successfully revoked',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'টোকেন সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Revocation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;
  
  @ApiPropertyOptional({
    description: 'Number of tokens revoked',
    example: 1,
  })
  @IsNumber()
  @Min(0)
  revokedCount?: number;

  @ApiPropertyOptional({
    description: 'Family ID if whole family was revoked',
    example: 'fam_550e8400-e29b-41d4-a716-446655440000',
  })
  familyId?: string;

  constructor(message?: string, messageBn?: string, revokedCount?: number, familyId?: string) {
    this.message = message || 'Token successfully revoked';
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.revokedCount = revokedCount;
    this.familyId = familyId;
  }
}

/**
 * Token Validation Response DTO (for introspection)
 */
export class TokenValidationResponseDto {
  @ApiProperty({
    description: 'Whether the token is valid',
    example: true,
  })
  valid: boolean;
  
  @ApiPropertyOptional({
    description: 'User ID (if token is valid)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string;
  
  @ApiPropertyOptional({
    description: 'User email (if token is valid)',
    example: 'user@vubon.com.bd',
  })
  email?: string;
  
  @ApiPropertyOptional({
    description: 'User role (if token is valid)',
    example: 'ADMIN',
  })
  role?: string;
  
  @ApiPropertyOptional({
    description: 'Token expiry timestamp',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  expiresAt?: string;
  
  @ApiPropertyOptional({
    description: 'Token issued at timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  issuedAt?: string;
  
  @ApiPropertyOptional({
    description: 'Token scopes/permissions',
    example: ['read', 'write'],
    isArray: true,
  })
  scopes?: string[];

  @ApiPropertyOptional({
    description: 'Session ID associated with token',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device ID associated with token',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Token type (access or refresh)',
    example: 'access',
    enum: ['access', 'refresh'],
  })
  tokenType?: 'access' | 'refresh';

  constructor(
    valid: boolean, 
    userId?: string, 
    expiresAt?: string, 
    scopes?: string[],
    email?: string,
    role?: string,
    issuedAt?: string,
    sessionId?: string,
    deviceId?: string,
    tokenType?: 'access' | 'refresh'
  ) {
    this.valid = valid;
    if (userId) this.userId = userId;
    if (email) this.email = email;
    if (role) this.role = role;
    if (expiresAt) this.expiresAt = expiresAt;
    if (issuedAt) this.issuedAt = issuedAt;
    if (scopes) this.scopes = scopes;
    if (sessionId) this.sessionId = sessionId;
    if (deviceId) this.deviceId = deviceId;
    if (tokenType) this.tokenType = tokenType;
  }
}

/**
 * Token Family Revoke Request DTO
 */
export class TokenFamilyRevokeDto {
  @ApiProperty({
    description: 'Family ID of tokens to revoke',
    example: 'fam_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsUUID(4, { message: 'Family ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Family ID is required' })
  familyId: string;

  @ApiPropertyOptional({
    description: 'Reason for revocation',
    example: 'Security incident - potential token theft',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(familyId: string, reason?: string) {
    this.familyId = familyId;
    this.reason = reason;
  }
}

/**
 * Token Family Revoke Response DTO
 */
export class TokenFamilyRevokeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Token family successfully revoked',
  })
  message: string;

  @ApiProperty({
    description: 'Number of tokens revoked',
    example: 5,
  })
  revokedCount: number;

  @ApiProperty({
    description: 'Revocation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt: string;

  constructor(revokedCount: number, message?: string) {
    this.message = message || 'Token family successfully revoked';
    this.revokedCount = revokedCount;
    this.revokedAt = new Date().toISOString();
  }
}

/**
 * Token Refresh Error Response DTO
 */
export class TokenRefreshErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 401,
  })
  statusCode: number;
  
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid or expired refresh token',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'অবৈধ বা মেয়াদোত্তীর্ণ রিফ্রেশ টোকেন',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Error type',
    example: 'UNAUTHORIZED',
    enum: ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'TOKEN_REVOKED', 'TOKEN_MALFORMED', 'DEVICE_MISMATCH', 'SESSION_NOT_FOUND'],
  })
  error: string;

  @ApiPropertyOptional({
    description: 'Error code for programmatic handling',
    example: 'TOKEN_EXPIRED',
  })
  errorCode?: string;
  
  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;
  
  constructor(message: string, error: string, messageBn?: string, errorCode?: string) {
    this.statusCode = 401;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { TokenRefreshErrorResponseDto as TokenRefreshErrorResponse };
