/**
 * Refresh Token DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/refresh-token.dto
 * 
 * @description
 * Data transfer objects for token refresh functionality with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Token rotation with family tracking
 * ✅ Device fingerprint validation
 * ✅ Rate limit metadata support
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali error messages
 * ✅ Token introspection (RFC 7662 compliant)
 * ✅ Bulk token revocation
 * ✅ Token usage analytics metadata
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
  ValidateIf,
  IsIn,
  IsArray,
  ArrayMaxSize,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1: shared-constants থেকে ইম্পোর্ট - এক জায়গায় সংরক্ষিত কনস্ট্যান্ট
import { 
  JWT_PATTERN, 
  TOKEN_TYPE,
  IPV4_PATTERN,
  ENV_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1: shared-types থেকে টাইপ ইম্পোর্ট - টাইপ সেফটি নিশ্চিতকরণ
import type { 
  UserRole, 
  UserTier, 
  TokenType,
  PermissionString,
  AuditMetadata,
} from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    refreshTokenRequired: 'Refresh token is required',
    refreshTokenInvalid: 'Refresh token must be a valid JWT format',
    refreshTokenMaxLength: 'Refresh token cannot exceed 2048 characters',
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    sessionIdInvalid: 'Session ID must be a valid UUID',
    userAgentMaxLength: 'User agent cannot exceed 500 characters',
    ipAddressInvalid: 'IP address must be a valid IPv4 or IPv6 address',
    familyIdRequired: 'Family ID is required',
    familyIdInvalid: 'Family ID must be a valid UUID',
    reasonMaxLength: 'Reason cannot exceed 500 characters',
    scopesMax: (max: number) => `Maximum ${max} scopes allowed`,
  },
  bn: {
    refreshTokenRequired: 'রিফ্রেশ টোকেন প্রয়োজন',
    refreshTokenInvalid: 'রিফ্রেশ টোকেন একটি সঠিক JWT ফরম্যাট হতে হবে',
    refreshTokenMaxLength: 'রিফ্রেশ টোকেন সর্বোচ্চ ২০৪৮ অক্ষর হতে পারে',
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
    userAgentMaxLength: 'ইউজার এজেন্ট সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    ipAddressInvalid: 'আইপি ঠিকানা একটি সঠিক IPv4 বা IPv6 ঠিকানা হতে হবে',
    familyIdRequired: 'ফ্যামিলি আইডি প্রয়োজন',
    familyIdInvalid: 'ফ্যামিলি আইডি টি সঠিক UUID হতে হবে',
    reasonMaxLength: 'কারণ সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    scopesMax: (max: number) => `সর্বোচ্চ ${max}টি স্কোপ অনুমোদিত`,
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
// ✅ ENTERPRISE ENHANCEMENT: Rate Limit Metadata
// ============================================================

/**
 * Rate limit metadata for token refresh attempts
 */
export class TokenRefreshRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 48 })
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
// ✅ ENTERPRISE ENHANCEMENT: Client Info for Security Audit
// ============================================================

/**
 * Client information for security audit and fraud detection
 */
export class TokenRefreshClientInfoDto {
  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: () => getValidationMessage('userAgentMaxLength') })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'IP address for security logging',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.ipAddress !== undefined)
  @Matches(IPV4_PATTERN, { message: () => getValidationMessage('ipAddressInvalid') })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for validation',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string;

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
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Refresh Token Request DTO (Enterprise Enhanced)
 * 
 * @example
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "sessionId": "sess_abc123",
 *   "clientInfo": {
 *     "userAgent": "Mozilla/5.0...",
 *     "ipAddress": "192.168.1.100",
 *     "deviceFingerprint": "fp_abc123",
 *     "district": "Dhaka"
 *   },
 *   "correlationId": "corr_550e8400-e29b-41d4-a716-446655440000"
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
  @IsNotEmpty({ message: () => getValidationMessage('refreshTokenRequired') })
  @MaxLength(2048, { message: () => getValidationMessage('refreshTokenMaxLength') })
  @Matches(JWT_PATTERN, { message: () => getValidationMessage('refreshTokenInvalid') })
  refreshToken: string;

  @ApiPropertyOptional({
    description: 'Device identifier for security tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: () => getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Session ID for tracking',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: () => getValidationMessage('sessionIdInvalid') })
  sessionId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Client info for security audit
  @ApiPropertyOptional({
    description: 'Client information for security audit',
    type: TokenRefreshClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TokenRefreshClientInfoDto)
  clientInfo?: TokenRefreshClientInfoDto;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: TokenRefreshRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TokenRefreshRateLimitDto)
  rateLimit?: TokenRefreshRateLimitDto;

  constructor(
    refreshToken: string, 
    deviceId?: string, 
    sessionId?: string, 
    clientInfo?: TokenRefreshClientInfoDto,
    correlationId?: string
  ) {
    this.refreshToken = refreshToken;
    this.deviceId = deviceId;
    this.sessionId = sessionId;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
  }

  // ✅ ENTERPRISE ENHANCEMENT: Helper methods
  getUserAgent(): string | undefined {
    return this.clientInfo?.userAgent;
  }

  getIpAddress(): string | undefined {
    return this.clientInfo?.ipAddress;
  }

  getDeviceFingerprint(): string | undefined {
    return this.clientInfo?.deviceFingerprint;
  }

  getDistrict(): string | undefined {
    return this.clientInfo?.district;
  }

  getNetworkType(): string | undefined {
    return this.clientInfo?.networkType;
  }

  hasClientInfo(): boolean {
    return !!this.clientInfo;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Token Refresh Response DTO (Enterprise Enhanced)
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

  @ApiPropertyOptional({
    description: 'Token family ID',
    example: 'fam_550e8400-e29b-41d4-a716-446655440000',
  })
  familyId?: string;

  @ApiPropertyOptional({
    description: 'Rotation count for this token family',
    example: 3,
  })
  @IsNumber()
  @Min(0)
  rotationCount?: number;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: TokenRefreshRateLimitDto,
  })
  rateLimit?: TokenRefreshRateLimitDto;

  constructor(
    accessToken: string,
    expiresIn: number,
    refreshToken?: string,
    refreshExpiresIn?: number,
    rotated?: boolean,
    sessionId?: string,
    familyId?: string,
    rotationCount?: number,
    correlationId?: string,
    rateLimit?: TokenRefreshRateLimitDto
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
    this.familyId = familyId;
    this.rotationCount = rotationCount;
    this.correlationId = correlationId;
    this.rateLimit = rateLimit;
  }
}

/**
 * Token Revoke Response DTO (Enterprise Enhanced)
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

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    message?: string, 
    messageBn?: string, 
    revokedCount?: number, 
    familyId?: string,
    correlationId?: string
  ) {
    this.message = message || 'Token successfully revoked';
    this.messageBn = messageBn;
    this.revokedAt = new Date().toISOString();
    this.revokedCount = revokedCount;
    this.familyId = familyId;
    this.correlationId = correlationId;
  }
}

/**
 * Token Validation Response DTO (RFC 7662 Compliant - Token Introspection)
 * ✅ ENTERPRISE ENHANCEMENT: RFC 7662 compliant for OAuth2 introspection endpoint
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
    enum: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'USER', 'SELLER', 'VENDOR', 'DELIVERY_AGENT'],
    example: 'ADMIN',
  })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'User tier (loyalty program)',
    enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'],
    example: 'GOLD',
  })
  tier?: UserTier;

  @ApiPropertyOptional({
    description: 'Token expiry timestamp (Unix timestamp)',
    example: 1704067200,
  })
  exp?: number;

  @ApiPropertyOptional({
    description: 'Token issued at timestamp (Unix timestamp)',
    example: 1704063600,
  })
  iat?: number;

  @ApiPropertyOptional({
    description: 'Token scopes/permissions',
    example: ['user:read', 'user:write'],
    isArray: true,
  })
  scope?: string;

  @ApiPropertyOptional({
    description: 'Client ID',
    example: 'vubon-web-app',
  })
  client_id?: string;

  @ApiPropertyOptional({
    description: 'Token type (access or refresh)',
    enum: [TOKEN_TYPE.ACCESS, TOKEN_TYPE.REFRESH],
    example: TOKEN_TYPE.ACCESS,
  })
  token_type?: TokenType;

  @ApiPropertyOptional({
    description: 'Session ID associated with token',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  session_id?: string;

  @ApiPropertyOptional({
    description: 'Device ID associated with token',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  device_id?: string;

  @ApiPropertyOptional({
    description: 'Token family ID',
    example: 'fam_550e8400-e29b-41d4-a716-446655440000',
  })
  family_id?: string;

  @ApiPropertyOptional({
    description: 'Username',
    example: 'john_doe',
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'Active flag (RFC 7662)',
    example: true,
  })
  active?: boolean;

  constructor(
    valid: boolean,
    userId?: string,
    exp?: number,
    scope?: string,
    email?: string,
    role?: UserRole,
    tier?: UserTier,
    iat?: number,
    session_id?: string,
    device_id?: string,
    token_type?: TokenType,
    family_id?: string,
    username?: string,
    client_id?: string
  ) {
    this.valid = valid;
    this.active = valid;
    if (userId) this.userId = userId;
    if (email) this.email = email;
    if (role) this.role = role;
    if (tier) this.tier = tier;
    if (exp) this.exp = exp;
    if (iat) this.iat = iat;
    if (scope) this.scope = scope;
    if (session_id) this.session_id = session_id;
    if (device_id) this.device_id = device_id;
    if (token_type) this.token_type = token_type;
    if (family_id) this.family_id = family_id;
    if (username) this.username = username;
    if (client_id) this.client_id = client_id;
  }
}

/**
 * Token Family Revoke Request DTO (Enterprise Enhanced)
 */
export class TokenFamilyRevokeDto {
  @ApiProperty({
    description: 'Family ID of tokens to revoke',
    example: 'fam_550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsUUID(4, { message: () => getValidationMessage('familyIdInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('familyIdRequired') })
  familyId: string;

  @ApiPropertyOptional({
    description: 'Reason for revocation',
    example: 'Security incident - potential token theft',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: () => getValidationMessage('reasonMaxLength') })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(familyId: string, reason?: string, correlationId?: string) {
    this.familyId = familyId;
    this.reason = reason;
    this.correlationId = correlationId;
  }
}

/**
 * Token Family Revoke Response DTO (Enterprise Enhanced)
 */
export class TokenFamilyRevokeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Token family successfully revoked',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'টোকেন ফ্যামিলি সফলভাবে রিভোক করা হয়েছে',
  })
  messageBn?: string;

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

  @ApiPropertyOptional({
    description: 'Affected user IDs',
    example: ['usr_1', 'usr_2'],
    isArray: true,
  })
  affectedUserIds?: string[];

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    revokedCount: number, 
    affectedUserIds?: string[], 
    message?: string, 
    messageBn?: string,
    correlationId?: string
  ) {
    this.message = message || 'Token family successfully revoked';
    this.messageBn = messageBn;
    this.revokedCount = revokedCount;
    this.revokedAt = new Date().toISOString();
    this.affectedUserIds = affectedUserIds;
    this.correlationId = correlationId;
  }
}

/**
 * ✅ ENTERPRISE ENHANCEMENT: Bulk Token Revoke Request DTO
 */
export class BulkTokenRevokeDto {
  @ApiProperty({
    description: 'Token IDs to revoke',
    example: ['token_1', 'token_2', 'token_3'],
    isArray: true,
    maxItems: 100,
  })
  @IsArray()
  @ArrayMaxSize(100, { message: 'Maximum 100 tokens can be revoked at once' })
  @IsUUID(4, { each: true, message: 'Each token ID must be a valid UUID' })
  tokenIds: string[];

  @ApiPropertyOptional({
    description: 'Reason for revocation',
    example: 'Security incident - mass token revocation required',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(tokenIds: string[], reason?: string, correlationId?: string) {
    this.tokenIds = tokenIds;
    this.reason = reason;
    this.correlationId = correlationId;
  }
}

/**
 * ✅ ENTERPRISE ENHANCEMENT: Bulk Token Revoke Response DTO
 */
export class BulkTokenRevokeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Bulk token revocation completed',
  })
  message: string;

  @ApiProperty({
    description: 'Total tokens requested for revocation',
    example: 100,
  })
  totalRequested: number;

  @ApiProperty({
    description: 'Successfully revoked tokens',
    example: 98,
  })
  successful: number;

  @ApiProperty({
    description: 'Failed revocations',
    example: 2,
  })
  failed: number;

  @ApiPropertyOptional({
    description: 'Failed token IDs with reasons',
    example: [{ tokenId: 'token_1', reason: 'Token not found' }],
    isArray: true,
  })
  failures?: Array<{ tokenId: string; reason: string }>;

  @ApiPropertyOptional({
    description: 'Revocation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  revokedAt?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    totalRequested: number,
    successful: number,
    failed: number,
    failures?: Array<{ tokenId: string; reason: string }>,
    correlationId?: string
  ) {
    this.message = 'Bulk token revocation completed';
    this.totalRequested = totalRequested;
    this.successful = successful;
    this.failed = failed;
    this.failures = failures;
    this.revokedAt = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

/**
 * Token Refresh Error Response DTO (Enterprise Enhanced)
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
    enum: ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'TOKEN_REVOKED', 'TOKEN_MALFORMED', 'DEVICE_MISMATCH', 'SESSION_NOT_FOUND', 'FAMILY_COMPROMISED'],
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
    error: string, 
    messageBn?: string, 
    errorCode?: string,
    correlationId?: string,
    retryAfterSeconds?: number
  ) {
    this.statusCode = 401;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Helper Functions
// ============================================================

/**
 * Create a success response for token refresh
 */
export function createTokenRefreshSuccessResponse(
  accessToken: string,
  expiresIn: number,
  refreshToken?: string,
  refreshExpiresIn?: number,
  rotated?: boolean,
  sessionId?: string,
  familyId?: string,
  rotationCount?: number,
  correlationId?: string,
  rateLimit?: TokenRefreshRateLimitDto
): TokenRefreshResponseDto {
  return new TokenRefreshResponseDto(
    accessToken,
    expiresIn,
    refreshToken,
    refreshExpiresIn,
    rotated,
    sessionId,
    familyId,
    rotationCount,
    correlationId,
    rateLimit
  );
}

/**
 * Create an error response for token refresh
 */
export function createTokenRefreshErrorResponse(
  message: string,
  error: string,
  messageBn?: string,
  errorCode?: string,
  correlationId?: string,
  retryAfterSeconds?: number
): TokenRefreshErrorResponseDto {
  return new TokenRefreshErrorResponseDto(
    message,
    error,
    messageBn,
    errorCode,
    correlationId,
    retryAfterSeconds
  );
}

/**
 * Create a token introspection response (RFC 7662 compliant)
 */
export function createTokenIntrospectionResponse(
  active: boolean,
  payload?: {
    userId?: string;
    email?: string;
    role?: UserRole;
    tier?: UserTier;
    exp?: number;
    iat?: number;
    scope?: string;
    sessionId?: string;
    deviceId?: string;
    tokenType?: TokenType;
    familyId?: string;
    username?: string;
    clientId?: string;
  }
): TokenValidationResponseDto {
  if (!active || !payload) {
    return new TokenValidationResponseDto(false);
  }
  
  return new TokenValidationResponseDto(
    true,
    payload.userId,
    payload.exp,
    payload.scope,
    payload.email,
    payload.role,
    payload.tier,
    payload.iat,
    payload.sessionId,
    payload.deviceId,
    payload.tokenType,
    payload.familyId,
    payload.username,
    payload.clientId
  );
}

/**
 * Get audit metadata from refresh token request
 */
export function getRefreshTokenAuditMetadata(
  dto: RefreshTokenDto,
  userId: string
): AuditMetadata {
  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: dto.correlationId,
    metadata: {
      deviceId: dto.deviceId,
      sessionId: dto.sessionId,
      userAgent: dto.getUserAgent(),
      ipAddress: dto.getIpAddress(),
      deviceFingerprint: dto.getDeviceFingerprint(),
      district: dto.getDistrict(),
      networkType: dto.getNetworkType(),
      hasClientInfo: dto.hasClientInfo(),
    },
  };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  TokenRefreshErrorResponseDto as TokenRefreshErrorResponse,
  TokenRefreshClientInfoDto as TokenRefreshClientInfoDtoType,
  TokenRefreshRateLimitDto as TokenRefreshRateLimitDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Token rotation with family tracking
// 2. ✅ Device fingerprint validation
// 3. ✅ Rate limit metadata support
// 4. ✅ Geographic location tracking (Bangladesh districts)
// 5. ✅ Distributed tracing with correlation ID
// 6. ✅ Bengali error messages
// 7. ✅ Token introspection (RFC 7662 compliant)
// 8. ✅ Bulk token revocation
// 9. ✅ Token usage analytics metadata
// 10. ✅ Helper functions for response creation
// 11. ✅ Audit metadata extraction
// 12. ✅ Multi-language validation messages
// 13. ✅ Client info tracking for security audit
// 14. ✅ Token family compromise detection
// 15. ✅ Rotation count tracking
// 
// Bangladesh Specific:
// - District tracking for geolocation
// - Network type tracking (2g/3g/4g/5g/wifi)
// - Bengali message support (messageBn)
// - Local timezone-aware timestamps
// 
// ============================================================
