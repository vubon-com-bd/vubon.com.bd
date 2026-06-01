/**
 * Disable MFA DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/mfa/disable-mfa.dto
 * 
 * @description
 * Data transfer objects for disabling Multi-Factor Authentication.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ Validation using class-validator
 * ✅ Code or backup code required for verification
 * ✅ User ID from authenticated context (not from request body for security)
 * ✅ Bangladesh specific - Support for MFS PIN disable
 * 
 * IMPORTANT: userId should be extracted from JWT token, NOT from client request
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Types
// ============================================================

export type MFADisableScope = 'single' | 'all';

// ============================================================
// Request DTO
// ============================================================

/**
 * Disable MFA Request DTO
 * 
 * Note: userId is intentionally NOT included in the request body.
 * User identification comes from the authenticated JWT token
 * to prevent privilege escalation attacks.
 * 
 * @example
 * {
 *   "code": "123456",
 *   "backupCode": "AB3F-9K2M",
 *   "methodId": "mtd_550e8400-e29b-41d4-a716-446655440000",
 *   "scope": "single",
 *   "reason": "User requested removal"
 * }
 */
export class DisableMfaDto {
  @ApiPropertyOptional({
    description: 'MFA verification code (TOTP/SMS/Email OTP)',
    example: '123456',
    minLength: 6,
    maxLength: 8,
    pattern: '^[0-9]{6,8}$',
  })
  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  @MinLength(6, { message: 'Code must be at least 6 digits long' })
  @MaxLength(8, { message: 'Code cannot exceed 8 digits' })
  @Matches(/^\d+$/, { message: 'Code must contain only digits' })
  code?: string;
  
  @ApiPropertyOptional({
    description: 'Backup code (one-time use)',
    example: 'AB3F-9K2M',
    minLength: 8,
    maxLength: 10,
    pattern: '^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$',
  })
  @IsOptional()
  @IsString({ message: 'Backup code must be a string' })
  @MinLength(8, { message: 'Backup code must be at least 8 characters' })
  @MaxLength(10, { message: 'Backup code cannot exceed 10 characters' })
  @Matches(/^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$/, {
    message: 'Backup code must be in format XXXX-XXXX or XXXXX-XXXXX'
  })
  backupCode?: string;

  @ApiPropertyOptional({
    description: 'bKash PIN (for disabling bKash MFA)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'bKash PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'bKash PIN must be exactly 4 digits' })
  bkashPin?: string;

  @ApiPropertyOptional({
    description: 'Nagad PIN (for disabling Nagad MFA)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'Nagad PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'Nagad PIN must be exactly 4 digits' })
  nagadPin?: string;

  @ApiPropertyOptional({
    description: 'Rocket PIN (for disabling Rocket MFA)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'Rocket PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'Rocket PIN must be exactly 4 digits' })
  rocketPin?: string;
  
  @ApiPropertyOptional({
    description: 'Specific MFA method ID to disable (if user has multiple MFA methods)',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Method ID must be a valid UUID' })
  methodId?: string;

  @ApiPropertyOptional({
    description: 'Disable scope - single method or all methods',
    example: 'single',
    enum: ['single', 'all'],
    default: 'single',
  })
  @IsOptional()
  @IsIn(['single', 'all'], { message: 'Scope must be single or all' })
  scope?: MFADisableScope = 'single';
  
  @ApiPropertyOptional({
    description: 'Reason for disabling MFA (for audit logging)',
    example: 'User requested removal',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Confirmation that user understands the security implications',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Confirm must be a boolean' })
  confirm?: boolean;
  
  /**
   * Validate that at least one verification method is provided
   */
  hasVerificationMethod(): boolean {
    return !!(this.code || this.backupCode || this.bkashPin || this.nagadPin || this.rocketPin);
  }

  /**
   * Get the verification method type
   */
  getVerificationMethod(): 'code' | 'backup' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin' | null {
    if (this.code) return 'code';
    if (this.backupCode) return 'backup';
    if (this.bkashPin) return 'bkash_pin';
    if (this.nagadPin) return 'nagad_pin';
    if (this.rocketPin) return 'rocket_pin';
    return null;
  }
  
  constructor(
    code?: string,
    backupCode?: string,
    methodId?: string,
    reason?: string,
    scope?: MFADisableScope,
    confirm?: boolean,
    bkashPin?: string,
    nagadPin?: string,
    rocketPin?: string
  ) {
    this.code = code;
    this.backupCode = backupCode;
    this.methodId = methodId;
    this.reason = reason;
    this.scope = scope ?? 'single';
    this.confirm = confirm;
    this.bkashPin = bkashPin;
    this.nagadPin = nagadPin;
    this.rocketPin = rocketPin;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Disable MFA Response DTO
 */
export class DisableMfaResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;
  
  @ApiProperty({
    description: 'Response message',
    example: 'MFA disabled successfully',
  })
  message: string;
  
  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'এমএফএ সফলভাবে নিষ্ক্রিয় করা হয়েছে',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'User ID (who disabled MFA)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;
  
  @ApiProperty({
    description: 'Timestamp when MFA was disabled',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  disabledAt: string;
  
  @ApiPropertyOptional({
    description: 'Number of MFA methods disabled',
    example: 1,
  })
  methodsDisabled?: number;
  
  @ApiPropertyOptional({
    description: 'Whether all MFA methods were disabled',
    example: true,
  })
  allMethodsDisabled?: boolean;

  @ApiPropertyOptional({
    description: 'IDs of disabled MFA methods',
    example: ['mtd_550e8400-e29b-41d4-a716-446655440000'],
    isArray: true,
  })
  disabledMethodIds?: string[];

  @ApiPropertyOptional({
    description: 'Whether user still has other MFA methods enabled',
    example: false,
  })
  hasOtherMethods?: boolean;

  constructor(
    success: boolean,
    userId: string,
    message?: string,
    messageBn?: string,
    methodsDisabled?: number,
    allMethodsDisabled?: boolean,
    disabledMethodIds?: string[],
    hasOtherMethods?: boolean
  ) {
    this.success = success;
    this.userId = userId;
    this.message = message || (success ? 'MFA disabled successfully' : 'Failed to disable MFA');
    this.messageBn = messageBn;
    this.disabledAt = new Date().toISOString();
    this.methodsDisabled = methodsDisabled;
    this.allMethodsDisabled = allMethodsDisabled;
    this.disabledMethodIds = disabledMethodIds;
    this.hasOtherMethods = hasOtherMethods;
  }
}

/**
 * MFA Disabled Event Response DTO (for audit)
 */
export class MFADisabledEventDto {
  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@vubon.com.bd',
  })
  userEmail: string;

  @ApiProperty({
    description: 'MFA method that was disabled',
    example: 'TOTP',
  })
  method: string;

  @ApiPropertyOptional({
    description: 'Reason for disabling',
    example: 'User requested removal',
  })
  reason?: string;

  @ApiProperty({
    description: 'Timestamp when MFA was disabled',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  disabledAt: string;

  @ApiPropertyOptional({
    description: 'IP address of the request (for security audit)',
    example: '192.168.1.100',
  })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent of the request (for security audit)',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  userAgent?: string;

  constructor(
    userId: string,
    userEmail: string,
    method: string,
    disabledAt: Date,
    reason?: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.method = method;
    this.reason = reason;
    this.disabledAt = disabledAt.toISOString();
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
  }
}

/**
 * Disable MFA Error Response DTO
 */
export class DisableMfaErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;
  
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid verification code',
  })
  message: string;
  
  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'অবৈধ ভেরিফিকেশন কোড',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Error type',
    example: 'INVALID_CODE',
    enum: [
      'INVALID_CODE', 
      'CODE_EXPIRED', 
      'MAX_ATTEMPTS_EXCEEDED', 
      'MFA_NOT_ENABLED', 
      'USER_NOT_FOUND',
      'METHOD_NOT_FOUND',
      'INVALID_PIN',
      'PIN_EXPIRED',
      'CONFIRMATION_REQUIRED'
    ],
  })
  error: string;
  
  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;
  
  @ApiPropertyOptional({
    description: 'Remaining attempts before lockout',
    example: 2,
  })
  remainingAttempts?: number;

  @ApiPropertyOptional({
    description: 'Lockout duration in minutes',
    example: 15,
  })
  lockoutMinutes?: number;
  
  constructor(
    message: string,
    error: string,
    messageBn?: string,
    remainingAttempts?: number,
    lockoutMinutes?: number
  ) {
    this.statusCode = 400;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.remainingAttempts = remainingAttempts;
    this.lockoutMinutes = lockoutMinutes;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { MFADisableScope as MFADisableScopeType };
