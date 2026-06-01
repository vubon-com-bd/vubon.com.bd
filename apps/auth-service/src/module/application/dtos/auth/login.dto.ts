/**
 * Login DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/login.dto
 * 
 * @description
 * Data transfer objects for authentication (login/register/logout).
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ No domain logic
 * ✅ No repository calls
 * ✅ Bangladesh specific - Phone login support
 */

import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  MinLength, 
  MaxLength,
  Matches,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayMaxSize,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Enums
// ============================================================

/**
 * Login method types
 */
export enum LoginMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  USERNAME = 'USERNAME',
}

/**
 * User role types
 */
export enum UserRoleDto {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SELLER = 'SELLER',
  VENDOR = 'VENDOR',
  DELIVERY_AGENT = 'DELIVERY_AGENT',
}

/**
 * User tier types (Bangladesh loyalty program)
 */
export enum UserTierDto {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Login Request DTO (Email based)
 * 
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "rememberMe": true
 * }
 */
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
    maxLength: 255,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: 8,
    maxLength: 128,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password cannot exceed 128 characters' })
  password: string;

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
    description: 'Login method',
    enum: LoginMethod,
    example: LoginMethod.EMAIL,
    default: LoginMethod.EMAIL,
  })
  @IsOptional()
  @IsEnum(LoginMethod, { message: 'Login method must be EMAIL, PHONE, or USERNAME' })
  method?: LoginMethod = LoginMethod.EMAIL;

  constructor(email: string, password: string, deviceId?: string, rememberMe?: boolean) {
    this.email = email;
    this.password = password;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * Phone Login Request DTO (Bangladesh specific)
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "rememberMe": true
 * }
 */
export class PhoneLoginDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+8801[3-9]\d{8}$/, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: 8,
    maxLength: 128,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password cannot exceed 128 characters' })
  password: string;

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

  constructor(phoneNumber: string, password: string, deviceId?: string, rememberMe?: boolean) {
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * OTP Login Request DTO (Passwordless - Bangladesh specific)
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "deviceId": "device-123",
 *   "rememberMe": true
 * }
 */
export class OtpLoginDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+8801[3-9]\d{8}$/, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'One-Time Password (OTP) code',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: 'OTP code must be a string' })
  @IsNotEmpty({ message: 'OTP code is required' })
  @Matches(/^\d{6}$/, { message: 'OTP code must be exactly 6 digits' })
  otpCode: string;

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

  constructor(phoneNumber: string, otpCode: string, deviceId?: string, rememberMe?: boolean) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * Refresh Token Request DTO
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString({ message: 'Refresh token must be a string' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;

  @ApiPropertyOptional({
    description: 'Device identifier',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  deviceId?: string;

  constructor(refreshToken: string, deviceId?: string) {
    this.refreshToken = refreshToken;
    this.deviceId = deviceId;
  }
}

/**
 * Logout Request DTO
 */
export class LogoutDto {
  @ApiPropertyOptional({
    description: 'Session ID to logout (if not provided, current session)',
    example: 'session_abc123',
  })
  @IsOptional()
  @IsString({ message: 'Session ID must be a string' })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Logout from all devices',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'All devices must be a boolean' })
  allDevices?: boolean = false;

  @ApiPropertyOptional({
    description: 'Refresh token to revoke',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken?: string;

  constructor(sessionId?: string, allDevices?: boolean) {
    this.sessionId = sessionId;
    this.allDevices = allDevices ?? false;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * User Response DTO (minimal for login response)
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    format: 'email',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format)',
    example: '+8801712345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John',
  })
  displayName: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRoleDto,
    example: UserRoleDto.USER,
  })
  role: UserRoleDto;

  @ApiProperty({
    description: 'User tier (loyalty program)',
    enum: UserTierDto,
    example: UserTierDto.BRONZE,
  })
  tier: UserTierDto;

  @ApiPropertyOptional({
    description: 'Avatar URL',
    example: 'https://cdn.vubon.com.bd/avatars/user123.jpg',
  })
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Whether email is verified',
    example: true,
  })
  isEmailVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether phone is verified',
    example: true,
  })
  isPhoneVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether MFA is enabled',
    example: false,
  })
  mfaEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'User tier discount percentage',
    example: 5,
  })
  tierDiscount?: number;

  @ApiPropertyOptional({
    description: 'Whether user gets free shipping',
    example: false,
  })
  hasFreeShipping?: boolean;

  constructor(
    id: string,
    email: string,
    fullName: string,
    displayName: string,
    role: UserRoleDto,
    tier: UserTierDto,
    isEmailVerified?: boolean,
    isPhoneVerified?: boolean,
    mfaEnabled?: boolean,
    phoneNumber?: string,
    avatar?: string
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.displayName = displayName;
    this.role = role;
    this.tier = tier;
    this.isEmailVerified = isEmailVerified;
    this.isPhoneVerified = isPhoneVerified;
    this.mfaEnabled = mfaEnabled;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
  }
}

/**
 * Login Response DTO
 */
export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for API authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: 900,
    minimum: 1,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: 604800,
    minimum: 1,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string = 'Bearer';

  @ApiProperty({
    description: 'Authenticated user information',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiPropertyOptional({
    description: 'Whether MFA is required to complete login',
    example: false,
  })
  mfaRequired?: boolean;

  @ApiPropertyOptional({
    description: 'MFA session ID (if MFA required)',
    example: 'mfa_session_abc123',
  })
  mfaSessionId?: string;

  @ApiPropertyOptional({
    description: 'Session ID for management',
    example: 'session_abc123',
  })
  sessionId?: string;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    user: UserResponseDto,
    mfaRequired?: boolean,
    sessionId?: string,
    mfaSessionId?: string
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.user = user;
    this.mfaRequired = mfaRequired;
    this.sessionId = sessionId;
    this.mfaSessionId = mfaSessionId;
  }
}

/**
 * Token Refresh Response DTO
 */
export class TokenRefreshResponseDto {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'New refresh token (if rotated)',
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

  constructor(accessToken: string, refreshToken: string, expiresIn: number, refreshExpiresIn: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
  }
}

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
    description: 'Number of sessions affected',
    example: 1,
  })
  sessionsAffected: number;

  constructor(message: string, sessionsAffected: number, messageBn?: string) {
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsAffected = sessionsAffected;
  }
}

/**
 * MFA Required Response DTO (when MFA is needed after login)
 */
export class MFARequiredResponseDto {
  @ApiProperty({
    description: 'MFA required flag',
    example: true,
  })
  mfaRequired: boolean = true;

  @ApiProperty({
    description: 'MFA session ID for verification',
    example: 'mfa_session_abc123',
  })
  mfaSessionId: string;

  @ApiProperty({
    description: 'Available MFA methods',
    enum: ['TOTP', 'SMS', 'EMAIL', 'BACKUP_CODE', 'WHATSAPP', 'BKASH_PIN'],
    isArray: true,
    example: ['TOTP', 'SMS'],
  })
  availableMethods: string[];

  @ApiPropertyOptional({
    description: 'Masked phone number for SMS MFA',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Masked email for email MFA',
    example: 'u***r@example.com',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'Login session ID (partial login)',
    example: 'login_session_abc123',
  })
  loginSessionId?: string;

  constructor(
    mfaSessionId: string, 
    availableMethods: string[], 
    maskedPhone?: string, 
    maskedEmail?: string,
    loginSessionId?: string
  ) {
    this.mfaSessionId = mfaSessionId;
    this.availableMethods = availableMethods;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.loginSessionId = loginSessionId;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { UserRoleDto as UserRoleDtoType, UserTierDto as UserTierDtoType };
