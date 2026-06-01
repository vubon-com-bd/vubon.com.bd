/**
 * Social Login DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/social-login.dto
 * 
 * @description
 * Data transfer objects for social authentication (OAuth).
 * NO business logic, NO OAuth implementation, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ Bangladesh-specific providers included
 * ✅ User ID from JWT (not from client)
 * ✅ Phone-based social login support (WhatsApp, Imo)
 * ✅ Integrated with shared-constants and shared-types
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsEnum,
  IsUUID,
  MaxLength,
  IsEmail,
  Matches,
  ValidateIf,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1: Import from shared-constants (single source of truth)
import { 
  SOCIAL_PROVIDERS, 
  REGEX_PHONE, 
  TOKEN_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1: Import types from shared-types
import type { SocialProvider, TokenType } from '@vubon/shared-types';

// ============================================================
// Constants (Re-export for convenience)
// ============================================================

/**
 * Social providers including Bangladesh-specific options
 * Re-exported from shared-constants for backward compatibility
 */
export const SocialProvider = SOCIAL_PROVIDERS;

// ============================================================
// Helper: Match decorator (reusable utility)
// ============================================================

/**
 * Custom validation decorator to check if two fields match
 * Can be moved to shared-utils for reuse across multiple DTOs
 * 
 * @param property - Name of the property to compare with
 * @param validationOptions - Class-validator options
 * @returns Decorator function
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Social Login Request DTO
 * 
 * @example
 * {
 *   "provider": "google",
 *   "accessToken": "ya29.a0AfH6S...",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "rememberMe": true
 * }
 */
export class SocialLoginDto {
  @ApiProperty({
    description: 'Social provider name',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { message: 'Invalid social provider' })
  @IsNotEmpty({ message: 'Provider is required' })
  provider: SocialProvider;

  @ApiProperty({
    description: 'OAuth access token from social provider',
    example: 'ya29.a0AfH6S...',
    required: true,
    minLength: TOKEN_CONFIG.MIN_LENGTH.ACCESS,
    maxLength: TOKEN_CONFIG.MAX_LENGTH.ACCESS,
  })
  @IsString({ message: 'Access token must be a string' })
  @IsNotEmpty({ message: 'Access token is required' })
  @MinLength(TOKEN_CONFIG.MIN_LENGTH.ACCESS, { 
    message: `Access token must be at least ${TOKEN_CONFIG.MIN_LENGTH.ACCESS} characters` 
  })
  @MaxLength(TOKEN_CONFIG.MAX_LENGTH.ACCESS, { 
    message: `Access token cannot exceed ${TOKEN_CONFIG.MAX_LENGTH.ACCESS} characters` 
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Remember me must be a boolean' })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'State parameter for CSRF protection',
    example: 'random-state-string-123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MaxLength(255, { message: 'State cannot exceed 255 characters' })
  state?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
    maxLength: 128,
  })
  @IsOptional()
  @IsString({ message: 'Code verifier must be a string' })
  @MaxLength(128, { message: 'Code verifier cannot exceed 128 characters' })
  codeVerifier?: string;

  constructor(
    provider: SocialProvider,
    accessToken: string,
    deviceId?: string,
    rememberMe?: boolean,
    state?: string,
    codeVerifier?: string
  ) {
    this.provider = provider;
    this.accessToken = accessToken;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
    this.state = state;
    this.codeVerifier = codeVerifier;
  }
}

/**
 * Social Login with Phone Request DTO (Bangladesh specific - WhatsApp/Imo)
 * 
 * @example
 * {
 *   "provider": "whatsapp",
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "confirmOtpCode": "123456",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "rememberMe": true
 * }
 */
export class SocialPhoneLoginDto {
  @ApiProperty({
    description: 'Social provider name (WhatsApp, Imo, Telegram)',
    enum: [SocialProvider.WHATSAPP, SocialProvider.IMO, SocialProvider.TELEGRAM],
    example: SocialProvider.WHATSAPP,
    required: true,
  })
  @IsEnum([SocialProvider.WHATSAPP, SocialProvider.IMO, SocialProvider.TELEGRAM], { 
    message: 'Provider must be whatsapp, imo, or telegram' 
  })
  @IsNotEmpty({ message: 'Provider is required' })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(REGEX_PHONE.BANGLADESH, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code for verification',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'OTP code must be a string' })
  @IsNotEmpty({ message: 'OTP code is required' })
  @Matches(/^\d{6}$/, { message: 'OTP code must be exactly 6 digits' })
  otpCode: string;

  @ApiPropertyOptional({
    description: 'Confirm OTP code (must match otpCode)',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Confirm OTP code must be a string' })
  @Match('otpCode', { message: 'OTP code and confirm OTP code do not match' })
  confirmOtpCode?: string;

  @ApiPropertyOptional({
    description: 'Email address (optional, for account recovery)',
    example: 'user@vubon.com.bd',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Remember me must be a boolean' })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'Preferred language for OTP message',
    example: 'en',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { message: 'Language must be en or bn' })
  locale?: 'en' | 'bn' = 'en';

  constructor(
    provider: SocialProvider,
    phoneNumber: string,
    otpCode: string,
    deviceId?: string,
    rememberMe?: boolean,
    confirmOtpCode?: string,
    email?: string,
    locale?: 'en' | 'bn'
  ) {
    this.provider = provider;
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
    this.confirmOtpCode = confirmOtpCode;
    this.email = email;
    this.locale = locale ?? 'en';
  }
}

/**
 * Social Link Request DTO
 * Note: userId is NOT accepted from client - comes from authenticated JWT
 */
export class SocialLinkDto {
  @ApiProperty({
    description: 'Social provider name',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { message: 'Invalid social provider' })
  @IsNotEmpty({ message: 'Provider is required' })
  provider: SocialProvider;

  @ApiProperty({
    description: 'OAuth access token from social provider',
    example: 'ya29.a0AfH6S...',
    required: true,
    minLength: TOKEN_CONFIG.MIN_LENGTH.ACCESS,
    maxLength: TOKEN_CONFIG.MAX_LENGTH.ACCESS,
  })
  @IsString({ message: 'Access token must be a string' })
  @IsNotEmpty({ message: 'Access token is required' })
  @MinLength(TOKEN_CONFIG.MIN_LENGTH.ACCESS, { 
    message: `Access token must be at least ${TOKEN_CONFIG.MIN_LENGTH.ACCESS} characters` 
  })
  @MaxLength(TOKEN_CONFIG.MAX_LENGTH.ACCESS, { 
    message: `Access token cannot exceed ${TOKEN_CONFIG.MAX_LENGTH.ACCESS} characters` 
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Make this the primary social account',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Make primary must be a boolean' })
  makePrimary?: boolean = false;

  @ApiPropertyOptional({
    description: 'State parameter for CSRF protection',
    example: 'random-state-string-123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MaxLength(255, { message: 'State cannot exceed 255 characters' })
  state?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
    maxLength: 128,
  })
  @IsOptional()
  @IsString({ message: 'Code verifier must be a string' })
  @MaxLength(128, { message: 'Code verifier cannot exceed 128 characters' })
  codeVerifier?: string;

  constructor(
    provider: SocialProvider, 
    accessToken: string, 
    makePrimary?: boolean,
    state?: string,
    codeVerifier?: string
  ) {
    this.provider = provider;
    this.accessToken = accessToken;
    this.makePrimary = makePrimary ?? false;
    this.state = state;
    this.codeVerifier = codeVerifier;
  }
}

/**
 * Social Unlink Request DTO
 * Note: userId is NOT accepted from client - comes from authenticated JWT
 */
export class SocialUnlinkDto {
  @ApiProperty({
    description: 'Social provider name to unlink',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { message: 'Invalid social provider' })
  @IsNotEmpty({ message: 'Provider is required' })
  provider: SocialProvider;

  @ApiPropertyOptional({
    description: 'Whether to keep user data after unlinking',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Keep data must be a boolean' })
  keepData?: boolean = true;

  @ApiPropertyOptional({
    description: 'Reason for unlinking (for audit)',
    example: 'User requested removal',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(provider: SocialProvider, keepData?: boolean, reason?: string) {
    this.provider = provider;
    this.keepData = keepData ?? true;
    this.reason = reason;
  }
}

/**
 * Social Auth Callback Query DTO (for OAuth redirect)
 */
export class SocialCallbackQueryDto {
  @ApiProperty({
    description: 'Authorization code from social provider',
    example: '4/0AY0e-g7...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'State parameter for CSRF validation',
    example: 'random-state-string-123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({
    description: 'Error from social provider',
    example: 'access_denied',
  })
  @IsOptional()
  @IsString()
  error?: string;

  @ApiPropertyOptional({
    description: 'Error description from social provider',
    example: 'User denied access',
  })
  @IsOptional()
  @IsString()
  error_description?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
  })
  @IsOptional()
  @IsString()
  code_verifier?: string;

  constructor(
    code: string, 
    state: string, 
    error?: string, 
    error_description?: string,
    code_verifier?: string
  ) {
    this.code = code;
    this.state = state;
    this.error = error;
    this.error_description = error_description;
    this.code_verifier = code_verifier;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Social User Info (from provider)
 */
export class SocialUserInfoDto {
  @ApiProperty({ description: 'User ID from provider' })
  id: string;

  @ApiProperty({ description: 'User email from provider' })
  email: string;

  @ApiProperty({ description: 'User full name from provider' })
  name: string;

  @ApiPropertyOptional({ description: 'First name from provider' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name from provider' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  picture?: string;

  @ApiPropertyOptional({ description: 'Is email verified by provider' })
  emailVerified?: boolean;

  @ApiPropertyOptional({ description: 'Phone number (for WhatsApp/Imo)' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Is phone verified by provider' })
  phoneVerified?: boolean;

  @ApiPropertyOptional({ description: 'Provider display name' })
  providerDisplayName?: string;

  constructor(
    id: string,
    email: string,
    name: string,
    picture?: string,
    emailVerified?: boolean,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    phoneVerified?: boolean,
    providerDisplayName?: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.picture = picture;
    this.emailVerified = emailVerified;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.phoneVerified = phoneVerified;
    this.providerDisplayName = providerDisplayName;
  }
}

/**
 * Social Login Response DTO
 */
export class SocialLoginResponseDto {
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
    description: 'Whether this is a new user (just registered)',
    example: false,
  })
  isNewUser: boolean;

  @ApiPropertyOptional({
    description: 'Whether this is a new connection (existing user linking new provider)',
    example: false,
  })
  isNewConnection?: boolean;

  @ApiProperty({
    description: 'Authenticated user information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'usr_550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', example: 'user@vubon.com.bd' },
      fullName: { type: 'string', example: 'John Doe' },
      role: { type: 'string', enum: ['USER', 'ADMIN', 'MODERATOR', 'SUPER_ADMIN'], example: 'USER' },
      isEmailVerified: { type: 'boolean', example: true },
      hasSocialLogin: { type: 'boolean', example: true },
    },
  })
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isEmailVerified?: boolean;
    hasSocialLogin?: boolean;
  };

  @ApiPropertyOptional({
    description: 'Session ID for management',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Whether MFA is required',
    example: false,
  })
  mfaRequired?: boolean;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    isNewUser: boolean,
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isEmailVerified?: boolean;
      hasSocialLogin?: boolean;
    },
    isNewConnection?: boolean,
    sessionId?: string,
    mfaRequired?: boolean
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.isNewUser = isNewUser;
    this.isNewConnection = isNewConnection;
    this.user = user;
    this.sessionId = sessionId;
    this.mfaRequired = mfaRequired;
  }
}

/**
 * Social Link Response DTO
 */
export class SocialLinkResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Social account linked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সামাজিক অ্যাকাউন্ট সফলভাবে সংযুক্ত হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Linked provider',
    enum: SocialProvider,
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Linked provider user email',
    example: 'user@gmail.com',
  })
  providerEmail: string;

  @ApiPropertyOptional({
    description: 'Linked provider phone number',
    example: '+8801712345678',
  })
  providerPhone?: string;

  @ApiProperty({
    description: 'Timestamp when linked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  linkedAt: string;

  @ApiPropertyOptional({
    description: 'Whether this is the primary social account',
    example: true,
  })
  isPrimary?: boolean;

  constructor(
    provider: SocialProvider, 
    providerEmail: string, 
    linkedAt: Date, 
    message?: string,
    messageBn?: string,
    providerPhone?: string,
    isPrimary?: boolean
  ) {
    this.message = message || 'Social account linked successfully';
    this.messageBn = messageBn;
    this.provider = provider;
    this.providerEmail = providerEmail;
    this.providerPhone = providerPhone;
    this.linkedAt = linkedAt.toISOString();
    this.isPrimary = isPrimary;
  }
}

/**
 * Social Unlink Response DTO
 */
export class SocialUnlinkResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Social account unlinked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সামাজিক অ্যাকাউন্ট সফলভাবে বিচ্ছিন্ন করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Unlinked provider',
    enum: SocialProvider,
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Timestamp when unlinked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  unlinkedAt: string;

  @ApiPropertyOptional({
    description: 'Whether user data was kept',
    example: true,
  })
  dataKept?: boolean;

  constructor(
    provider: SocialProvider, 
    unlinkedAt: Date, 
    message?: string, 
    messageBn?: string,
    dataKept?: boolean
  ) {
    this.message = message || 'Social account unlinked successfully';
    this.messageBn = messageBn;
    this.provider = provider;
    this.unlinkedAt = unlinkedAt.toISOString();
    this.dataKept = dataKept;
  }
}

/**
 * List Linked Social Accounts Response DTO
 */
export class LinkedSocialAccountDto {
  @ApiProperty({ description: 'Account ID', example: 'soc_550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ description: 'Provider name', enum: SocialProvider })
  provider: SocialProvider;

  @ApiProperty({ description: 'Provider display name', example: 'Google' })
  providerDisplayName: string;

  @ApiPropertyOptional({ description: 'Provider user email' })
  email?: string;

  @ApiPropertyOptional({ description: 'Provider phone number' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Provider user name' })
  name?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  picture?: string;

  @ApiProperty({ description: 'Whether this is the primary account' })
  isPrimary: boolean;

  @ApiProperty({ description: 'Timestamp when linked' })
  linkedAt: string;

  @ApiPropertyOptional({ description: 'Last used timestamp' })
  lastUsedAt?: string;

  constructor(
    id: string,
    provider: SocialProvider,
    providerDisplayName: string,
    isPrimary: boolean,
    linkedAt: Date,
    email?: string,
    phoneNumber?: string,
    name?: string,
    picture?: string,
    lastUsedAt?: Date
  ) {
    this.id = id;
    this.provider = provider;
    this.providerDisplayName = providerDisplayName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.name = name;
    this.picture = picture;
    this.isPrimary = isPrimary;
    this.linkedAt = linkedAt.toISOString();
    this.lastUsedAt = lastUsedAt?.toISOString();
  }
}

export class ListLinkedAccountsResponseDto {
  @ApiProperty({ description: 'List of linked social accounts', type: [LinkedSocialAccountDto] })
  accounts: LinkedSocialAccountDto[];

  @ApiProperty({ description: 'Total number of linked accounts' })
  total: number;

  @ApiProperty({ description: 'Maximum number of accounts that can be linked' })
  maxAccounts: number = 10;

  @ApiProperty({ description: 'Whether user can add more accounts' })
  canAddMore: boolean;

  @ApiPropertyOptional({ description: 'Primary account provider' })
  primaryProvider?: SocialProvider;

  constructor(accounts: LinkedSocialAccountDto[], maxAccounts: number = 10, primaryProvider?: SocialProvider) {
    this.accounts = accounts;
    this.total = accounts.length;
    this.maxAccounts = maxAccounts;
    this.canAddMore = accounts.length < maxAccounts;
    this.primaryProvider = primaryProvider;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { SocialProvider as SocialProviderType };
