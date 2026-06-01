/**
 * Verify MFA DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/mfa/verify-mfa.dto
 * 
 * @description
 * Data transfer objects for verifying Multi-Factor Authentication.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (uses MFA session)
 * ✅ MFA session ID for tracking verification attempts
 * ✅ Either code OR backup code (mutually exclusive)
 * ✅ Rate limiting prevention through session
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket PIN support
 * 
 * Flow:
 * 1. User logs in with credentials -> gets MFA required response with mfaSessionId
 * 2. User provides MFA code -> POST to /mfa/verify with mfaSessionId and code
 * 3. Server validates and issues tokens on success
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsUUID,
  IsBoolean,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Enums
// ============================================================

/**
 * MFA Type enum for verification
 */
export enum MFAType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  BACKUP = 'BACKUP',
  WEBAUTHN = 'WEBAUTHN',
  WHATSAPP = 'WHATSAPP',
  IMO = 'IMO',
  BKASH_PIN = 'BKASH_PIN',
  NAGAD_PIN = 'NAGAD_PIN',
  ROCKET_PIN = 'ROCKET_PIN',
  VOICE_CALL = 'VOICE_CALL',
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Verify MFA Request DTO
 * 
 * Note: userId is NOT included - comes from MFA session
 * Note: Either code OR backupCode should be provided (not both)
 * 
 * @example (TOTP/SMS/Email code):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "code": "123456"
 * }
 * 
 * @example (Backup code):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "backupCode": "AB3F-9K2M"
 * }
 * 
 * @example (bKash PIN):
 * {
 *   "mfaSessionId": "mfa_sess_550e8400-e29b-41d4-a716-446655440000",
 *   "bkashPin": "1234"
 * }
 */
export class VerifyMfaDto {
  @ApiProperty({
    description: 'MFA session ID from login response',
    example: 'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsString({ message: 'MFA session ID must be a string' })
  @IsNotEmpty({ message: 'MFA session ID is required' })
  @IsUUID(4, { message: 'MFA session ID must be a valid UUID' })
  mfaSessionId: string;

  @ApiPropertyOptional({
    description: '6-digit MFA code from authenticator app/SMS/email/WhatsApp/Imo',
    example: '123456',
    minLength: 6,
    maxLength: 8,
    pattern: '^[0-9]{6,8}$',
  })
  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  @MinLength(6, { message: 'Code must be at least 6 digits' })
  @MaxLength(8, { message: 'Code cannot exceed 8 digits' })
  @Matches(/^[0-9]+$/, { message: 'Code must contain only digits' })
  @ValidateIf(o => !o.backupCode && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  code?: string;

  @ApiPropertyOptional({
    description: 'Backup code (one of the recovery codes)',
    example: 'AB3F-9K2M',
    pattern: '^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$',
  })
  @IsOptional()
  @IsString({ message: 'Backup code must be a string' })
  @Matches(/^[A-Z0-9]{4,5}-[A-Z0-9]{4,5}$/, {
    message: 'Backup code must be in format XXXX-XXXX or XXXXX-XXXXX (e.g., AB3F-9K2M)',
  })
  @ValidateIf(o => !o.code && !o.bkashPin && !o.nagadPin && !o.rocketPin)
  backupCode?: string;

  @ApiPropertyOptional({
    description: 'bKash PIN (for bKash MFA verification)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'bKash PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'bKash PIN must be exactly 4 digits' })
  @ValidateIf(o => !o.code && !o.backupCode && !o.nagadPin && !o.rocketPin)
  bkashPin?: string;

  @ApiPropertyOptional({
    description: 'Nagad PIN (for Nagad MFA verification)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'Nagad PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'Nagad PIN must be exactly 4 digits' })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.rocketPin)
  nagadPin?: string;

  @ApiPropertyOptional({
    description: 'Rocket PIN (for Rocket MFA verification)',
    example: '1234',
    minLength: 4,
    maxLength: 4,
    pattern: '^[0-9]{4}$',
  })
  @IsOptional()
  @IsString({ message: 'Rocket PIN must be a string' })
  @Matches(/^\d{4}$/, { message: 'Rocket PIN must be exactly 4 digits' })
  @ValidateIf(o => !o.code && !o.backupCode && !o.bkashPin && !o.nagadPin)
  rocketPin?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for remembering this device',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Trust this device for future logins (skip MFA)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Trust device must be a boolean' })
  trustDevice?: boolean = false;

  @ApiPropertyOptional({
    description: 'Specific MFA method to use (if user has multiple)',
    enum: MFAType,
    example: MFAType.TOTP,
  })
  @IsOptional()
  @IsEnum(MFAType, { message: 'Invalid MFA method' })
  method?: MFAType;

  /**
   * Get the verification method being used
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
    mfaSessionId: string,
    code?: string,
    backupCode?: string,
    deviceId?: string,
    trustDevice?: boolean,
    method?: MFAType,
    bkashPin?: string,
    nagadPin?: string,
    rocketPin?: string
  ) {
    this.mfaSessionId = mfaSessionId;
    this.code = code;
    this.backupCode = backupCode;
    this.deviceId = deviceId;
    this.trustDevice = trustDevice ?? false;
    this.method = method;
    this.bkashPin = bkashPin;
    this.nagadPin = nagadPin;
    this.rocketPin = rocketPin;
  }
}

/**
 * Verify MFA Setup Request DTO (for initial setup verification)
 * 
 * Used when enabling MFA for the first time
 */
export class VerifyMfaSetupDto {
  @ApiProperty({
    description: 'MFA type being verified',
    enum: MFAType,
    example: MFAType.TOTP,
    required: true,
  })
  @IsEnum(MFAType, { message: 'Invalid MFA type' })
  @IsNotEmpty({ message: 'MFA type is required' })
  type: MFAType;

  @ApiProperty({
    description: '6-digit verification code',
    example: '123456',
    minLength: 6,
    maxLength: 8,
    required: true,
  })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Verification code is required' })
  @MinLength(6, { message: 'Code must be at least 6 digits' })
  @MaxLength(8, { message: 'Code cannot exceed 8 digits' })
  @Matches(/^[0-9]+$/, { message: 'Code must contain only digits' })
  code: string;

  @ApiPropertyOptional({
    description: 'Method ID (if multiple methods are being set up)',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Method ID must be a valid UUID' })
  methodId?: string;

  constructor(type: MFAType, code: string, methodId?: string) {
    this.type = type;
    this.code = code;
    this.methodId = methodId;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * MFA Verify Success Response DTO
 */
export class MfaVerifyResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: 604800,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
  })
  tokenType: string = 'Bearer';

  @ApiProperty({
    description: 'Session ID for management',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Authenticated user information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'usr_550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', example: 'user@vubon.com.bd' },
      fullName: { type: 'string', example: 'John Doe' },
      role: { type: 'string', enum: ['USER', 'ADMIN', 'MODERATOR', 'SUPER_ADMIN', 'SELLER'], example: 'USER' },
    },
  })
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };

  @ApiPropertyOptional({
    description: 'Whether the device was trusted',
    example: true,
  })
  deviceTrusted?: boolean;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    sessionId: string,
    user: { id: string; email: string; fullName: string; role: string },
    deviceTrusted?: boolean
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.sessionId = sessionId;
    this.user = user;
    this.deviceTrusted = deviceTrusted;
  }
}

/**
 * MFA Setup Verify Response DTO
 */
export class MfaSetupVerifyResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'MFA enabled successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'এমএফএ সফলভাবে সক্রিয় করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Remaining backup codes count',
    example: 10,
  })
  remainingBackupCodes: number;

  @ApiProperty({
    description: 'MFA method ID',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'Whether this is the primary MFA method',
    example: true,
  })
  isPrimary?: boolean;

  constructor(
    message: string, 
    remainingBackupCodes: number, 
    methodId: string,
    isPrimary?: boolean,
    messageBn?: string
  ) {
    this.message = message;
    this.messageBn = messageBn;
    this.remainingBackupCodes = remainingBackupCodes;
    this.methodId = methodId;
    this.isPrimary = isPrimary;
  }
}

/**
 * MFA Required Response DTO (after login)
 */
export class MFARequiredResponseDto {
  @ApiProperty({
    description: 'MFA required flag',
    example: true,
  })
  mfaRequired: boolean = true;

  @ApiProperty({
    description: 'MFA session ID for verification',
    example: 'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
  })
  mfaSessionId: string;

  @ApiProperty({
    description: 'Available MFA methods for this user',
    enum: MFAType,
    isArray: true,
    example: ['TOTP', 'SMS', 'WHATSAPP', 'BKASH_PIN'],
  })
  availableMethods: MFAType[];

  @ApiPropertyOptional({
    description: 'Masked phone number (if SMS/WhatsApp is available)',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Masked email (if email is available)',
    example: 'u***r@example.com',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'Masked bKash account (if bKash PIN is available)',
    example: '+88017******78',
  })
  maskedBkashAccount?: string;

  @ApiPropertyOptional({
    description: 'Remaining verification attempts',
    example: 3,
  })
  remainingAttempts?: number;

  @ApiPropertyOptional({
    description: 'Login session ID (partial login)',
    example: 'login_sess_550e8400-e29b-41d4-a716-446655440000',
  })
  loginSessionId?: string;

  constructor(
    mfaSessionId: string,
    availableMethods: MFAType[],
    maskedPhone?: string,
    maskedEmail?: string,
    remainingAttempts?: number,
    maskedBkashAccount?: string,
    loginSessionId?: string
  ) {
    this.mfaSessionId = mfaSessionId;
    this.availableMethods = availableMethods;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.maskedBkashAccount = maskedBkashAccount;
    this.remainingAttempts = remainingAttempts;
    this.loginSessionId = loginSessionId;
  }
}

/**
 * MFA Verification Failed Response DTO
 */
export class MfaVerificationFailedResponseDto {
  @ApiProperty({
    description: 'Success flag (always false)',
    example: false,
  })
  success: boolean = false;

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
    description: 'Remaining attempts before lockout',
    example: 2,
  })
  remainingAttempts: number;

  @ApiPropertyOptional({
    description: 'Whether the MFA method is now locked',
    example: false,
  })
  isLocked?: boolean;

  @ApiPropertyOptional({
    description: 'Lockout expiry time (if locked)',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  lockoutExpiresAt?: string;

  constructor(
    message: string, 
    remainingAttempts: number,
    messageBn?: string,
    isLocked?: boolean,
    lockoutExpiresAt?: Date
  ) {
    this.message = message;
    this.messageBn = messageBn;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockoutExpiresAt = lockoutExpiresAt?.toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { MFAType as MFATypeEnum };
