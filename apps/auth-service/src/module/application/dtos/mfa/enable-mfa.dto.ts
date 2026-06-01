/**
 * Enable MFA DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/mfa/enable-mfa.dto
 * 
 * @description
 * Data transfer objects for enabling Multi-Factor Authentication.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Provider-specific validation
 * ✅ Response includes secret and backup codes
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 * 
 * IMPORTANT: userId is extracted from authenticated user's JWT token,
 * NOT from the request body. This prevents privilege escalation.
 */

import { 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - Phone number pattern
import { PHONE_PATTERNS, MFA_TYPES } from '@vubon/shared-constants';
// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - MFA type enum values
import type { MFAType } from '@vubon/shared-types';

// ============================================================
// MFA Type Enum (Bangladesh specific)
// ============================================================

/**
 * Multi-Factor Authentication types
 * Values are re-exported from shared-constants for consistency
 */
export { MFA_TYPES as MFATypeValues };

// ============================================================
// Request DTOs
// ============================================================

/**
 * Enable MFA Request DTO
 * 
 * Note: userId is NOT included - comes from authenticated JWT
 * 
 * @example TOTP:
 * {
 *   "type": "TOTP",
 *   "deviceName": "My Phone"
 * }
 * 
 * @example SMS:
 * {
 *   "type": "SMS",
 *   "phone": "+8801712345678"
 * }
 * 
 * @example WhatsApp:
 * {
 *   "type": "WHATSAPP",
 *   "phone": "+8801712345678"
 * }
 * 
 * @example bKash PIN:
 * {
 *   "type": "BKASH_PIN",
 *   "bkashAccount": "+8801712345678"
 * }
 */
export class EnableMfaDto {
  @ApiProperty({
    description: 'Type of MFA to enable',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
    required: true,
  })
  @IsEnum(MFA_TYPES, { message: `Invalid MFA type. Must be one of: ${Object.values(MFA_TYPES).join(', ')}` })
  @IsNotEmpty({ message: 'MFA type is required' })
  type: MFAType;

  @ApiPropertyOptional({
    description: 'Phone number for SMS/WhatsApp/Voice MFA (required for these types)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: 'Phone number must be in E.164 format (e.g., +8801712345678)',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'bKash account number (required for BKASH_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'bKash account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: 'bKash account must be in E.164 format (e.g., +8801712345678)',
  })
  bkashAccount?: string;

  @ApiPropertyOptional({
    description: 'Nagad account number (required for NAGAD_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Nagad account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: 'Nagad account must be in E.164 format (e.g., +8801712345678)',
  })
  nagadAccount?: string;

  @ApiPropertyOptional({
    description: 'Rocket account number (required for ROCKET_PIN)',
    example: '+8801712345678',
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsOptional()
  @IsString({ message: 'Rocket account must be a string' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: 'Rocket account must be in E.164 format (e.g., +8801712345678)',
  })
  rocketAccount?: string;

  @ApiPropertyOptional({
    description: 'Device name for TOTP (for display purposes)',
    example: 'Google Authenticator',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Device name must be a string' })
  @MinLength(1, { message: 'Device name cannot be empty' })
  @MaxLength(50, { message: 'Device name cannot exceed 50 characters' })
  deviceName?: string;

  @ApiPropertyOptional({
    description: 'Make this the primary MFA method',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Make primary must be a boolean' })
  makePrimary?: boolean = false;

  constructor(
    type: MFAType, 
    phone?: string, 
    deviceName?: string,
    makePrimary?: boolean,
    bkashAccount?: string,
    nagadAccount?: string,
    rocketAccount?: string
  ) {
    this.type = type;
    this.phone = phone;
    this.deviceName = deviceName;
    this.makePrimary = makePrimary ?? false;
    this.bkashAccount = bkashAccount;
    this.nagadAccount = nagadAccount;
    this.rocketAccount = rocketAccount;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * TOTP Setup Response DTO
 */
export class TOTPSetupResponseDto {
  @ApiProperty({
    description: 'Secret key for TOTP setup',
    example: 'JBSWY3DPEHPK3PXP',
    required: true,
  })
  secret: string;

  @ApiProperty({
    description: 'QR code URI for authenticator app',
    example: 'otpauth://totp/Vubon:user@vubon.com.bd?secret=JBSWY3DPEHPK3PXP&issuer=Vubon',
    required: true,
  })
  qrCodeUri: string;

  @ApiProperty({
    description: 'Provisioning URI for QR code generation',
    example: 'otpauth://totp/Vubon:user@vubon.com.bd?secret=JBSWY3DPEHPK3PXP&issuer=Vubon',
    required: true,
  })
  provisioningUri: string;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
    required: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'আপনার TOTP সেটআপ প্রস্তুত',
  })
  messageBn?: string;

  constructor(
    secret: string, 
    qrCodeUri: string, 
    provisioningUri: string, 
    recoveryCodes: string[],
    methodId: string,
    messageBn?: string
  ) {
    this.secret = secret;
    this.qrCodeUri = qrCodeUri;
    this.provisioningUri = provisioningUri;
    this.recoveryCodes = recoveryCodes;
    this.methodId = methodId;
    this.messageBn = messageBn;
  }
}

/**
 * SMS/WhatsApp Setup Response DTO
 */
export class PhoneSetupResponseDto {
  @ApiProperty({
    description: 'Masked phone number',
    example: '+88017******78',
  })
  maskedPhone: string;

  @ApiProperty({
    description: 'Message that OTP has been sent',
    example: 'Verification code sent to your phone',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'আপনার ফোনে ভেরিফিকেশন কোড পাঠানো হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Resend cooldown in seconds',
    example: 30,
  })
  resendCooldownSeconds: number;

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  constructor(
    maskedPhone: string, 
    recoveryCodes: string[], 
    methodId: string,
    resendCooldownSeconds: number = 30,
    message?: string,
    messageBn?: string
  ) {
    this.maskedPhone = maskedPhone;
    this.message = message || 'Verification code sent to your phone';
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.resendCooldownSeconds = resendCooldownSeconds;
    this.methodId = methodId;
  }
}

/**
 * Email Setup Response DTO
 */
export class EmailSetupResponseDto {
  @ApiProperty({
    description: 'Masked email address',
    example: 'u***r@example.com',
  })
  maskedEmail: string;

  @ApiProperty({
    description: 'Message that OTP has been sent',
    example: 'Verification code sent to your email',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'আপনার ইমেইলে ভেরিফিকেশন কোড পাঠানো হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Resend cooldown in seconds',
    example: 60,
  })
  resendCooldownSeconds: number;

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  constructor(
    maskedEmail: string, 
    recoveryCodes: string[], 
    methodId: string,
    resendCooldownSeconds: number = 60,
    message?: string,
    messageBn?: string
  ) {
    this.maskedEmail = maskedEmail;
    this.message = message || 'Verification code sent to your email';
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.resendCooldownSeconds = resendCooldownSeconds;
    this.methodId = methodId;
  }
}

/**
 * MFS PIN Setup Response DTO (Bangladesh specific - bKash/Nagad/Rocket)
 */
export class MFSPinSetupResponseDto {
  @ApiProperty({
    description: 'Masked account number',
    example: '+88017******78',
  })
  maskedAccount: string;

  @ApiProperty({
    description: 'Provider name',
    example: 'bKash',
  })
  provider: string;

  @ApiProperty({
    description: 'Message',
    example: 'Please enter your bKash PIN to verify',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'অনুগ্রহ করে আপনার বিকাশ পিন প্রবেশ করান',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Recovery codes (save these securely)',
    example: ['AB3F-9K2M', 'CD4G-0L3N', 'EF5H-1M4O'],
    isArray: true,
  })
  recoveryCodes: string[];

  @ApiProperty({
    description: 'Method ID for verification',
    example: 'mtd_550e8400-e29b-41d4-a716-446655440000',
  })
  methodId: string;

  constructor(
    maskedAccount: string,
    provider: string,
    recoveryCodes: string[],
    methodId: string,
    message?: string,
    messageBn?: string
  ) {
    this.maskedAccount = maskedAccount;
    this.provider = provider;
    this.message = message || `Please enter your ${provider} PIN to verify`;
    this.messageBn = messageBn;
    this.recoveryCodes = recoveryCodes;
    this.methodId = methodId;
  }
}

/**
 * WebAuthn Setup Response DTO
 */
export class WebAuthnSetupResponseDto {
  @ApiProperty({
    description: 'Challenge for WebAuthn registration',
    example: 'challenge_abc123',
  })
  challenge: string;

  @ApiProperty({
    description: 'RP ID (relying party ID)',
    example: 'vubon.com.bd',
  })
  rpId: string;

  @ApiProperty({
    description: 'RP Name',
    example: 'Vubon E-commerce',
  })
  rpName: string;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User name',
    example: 'user@vubon.com.bd',
  })
  userName: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John Doe',
  })
  userDisplayName: string;

  @ApiProperty({
    description: 'Timeout in milliseconds',
    example: 60000,
  })
  timeout: number;

  @ApiProperty({
    description: 'Attestation type',
    example: 'none',
    enum: ['none', 'indirect', 'direct'],
  })
  attestation: string;

  @ApiPropertyOptional({
    description: 'Authenticator selection criteria',
    type: 'object',
  })
  authenticatorSelection?: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey?: 'discouraged' | 'preferred' | 'required';
    userVerification?: 'discouraged' | 'preferred' | 'required';
  };

  constructor(
    challenge: string,
    rpId: string,
    rpName: string,
    userId: string,
    userName: string,
    userDisplayName: string,
    timeout: number,
    attestation: string,
    authenticatorSelection?: {
      authenticatorAttachment?: 'platform' | 'cross-platform';
      residentKey?: 'discouraged' | 'preferred' | 'required';
      userVerification?: 'discouraged' | 'preferred' | 'required';
    }
  ) {
    this.challenge = challenge;
    this.rpId = rpId;
    this.rpName = rpName;
    this.userId = userId;
    this.userName = userName;
    this.userDisplayName = userDisplayName;
    this.timeout = timeout;
    this.attestation = attestation;
    this.authenticatorSelection = authenticatorSelection;
  }
}

/**
 * Enable MFA Response DTO (Union type wrapper)
 */
export class EnableMfaResponseDto {
  @ApiProperty({
    description: 'Type of MFA being set up',
    enum: MFA_TYPES,
  })
  type: MFAType;

  @ApiProperty({
    description: 'Setup data (type-specific)',
    oneOf: [
      { $ref: '#/components/schemas/TOTPSetupResponseDto' },
      { $ref: '#/components/schemas/PhoneSetupResponseDto' },
      { $ref: '#/components/schemas/EmailSetupResponseDto' },
      { $ref: '#/components/schemas/MFSPinSetupResponseDto' },
      { $ref: '#/components/schemas/WebAuthnSetupResponseDto' },
    ],
  })
  setup: TOTPSetupResponseDto | PhoneSetupResponseDto | EmailSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto;

  constructor(
    type: MFAType,
    setup: TOTPSetupResponseDto | PhoneSetupResponseDto | EmailSetupResponseDto | MFSPinSetupResponseDto | WebAuthnSetupResponseDto
  ) {
    this.type = type;
    this.setup = setup;
  }
}

/**
 * MFA Status Response DTO
 */
export class MFAStatusResponseDto {
  @ApiProperty({
    description: 'Whether MFA is enabled for the user',
    example: true,
  })
  enabled: boolean;

  @ApiPropertyOptional({
    description: 'Enabled MFA type (if enabled)',
    enum: MFA_TYPES,
    example: MFA_TYPES.TOTP,
  })
  type?: MFAType;

  @ApiPropertyOptional({
    description: 'List of enabled MFA methods',
    example: ['TOTP', 'SMS'],
    isArray: true,
  })
  methods?: MFAType[];

  @ApiPropertyOptional({
    description: 'Masked phone number (for SMS/WhatsApp MFA)',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Masked email (for Email MFA)',
    example: 'u***r@example.com',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'Masked bKash account',
    example: '+88017******78',
  })
  maskedBkashAccount?: string;

  @ApiPropertyOptional({
    description: 'Whether MFA is pending verification',
    example: false,
  })
  isPending?: boolean;

  @ApiPropertyOptional({
    description: 'Remaining backup codes',
    example: 8,
  })
  remainingBackupCodes?: number;

  @ApiPropertyOptional({
    description: 'Whether backup codes are low (< 3)',
    example: false,
  })
  areBackupCodesLow?: boolean;

  @ApiPropertyOptional({
    description: 'Primary MFA method',
    enum: MFA_TYPES,
  })
  primaryMethod?: MFAType;

  constructor(
    enabled: boolean,
    type?: MFAType,
    maskedPhone?: string,
    maskedEmail?: string,
    isPending?: boolean,
    remainingBackupCodes?: number,
    areBackupCodesLow?: boolean,
    methods?: MFAType[],
    maskedBkashAccount?: string,
    primaryMethod?: MFAType
  ) {
    this.enabled = enabled;
    this.type = type;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.maskedBkashAccount = maskedBkashAccount;
    this.isPending = isPending;
    this.remainingBackupCodes = remainingBackupCodes;
    this.areBackupCodesLow = areBackupCodesLow;
    this.methods = methods;
    this.primaryMethod = primaryMethod;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { MFAType as MFATypeEnum };
