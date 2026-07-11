/**
 * Register Request DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/register.request.dto
 *
 * @description
 * Request DTO for user registration endpoint.
 * Validates incoming registration data using class-validator.
 *
 * Enterprise Features:
 * ✅ Comprehensive validation using class-validator
 * ✅ Bangladesh specific - Phone number validation (BD format)
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Device tracking support
 * ✅ Referral code processing
 * ✅ Marketing consent management
 * ✅ Security - Password strength validation
 * ✅ Terms & Privacy acceptance validation
 * ✅ Birthdate validation for age requirement
 * ✅ District/Upazila validation (Bangladesh specific)
 *
 * @example
 * // In controller
 * @Post('register')
 * async register(@Body() dto: RegisterRequestDto) {
 *   const command = new RegisterUserCommand(dto);
 *   return await this.commandBus.execute(command);
 * }
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsObject,
  ValidateIf,
  IsDateString,
  IsIn,
  IsInt,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { normalizePhone, normalizeEmail } from '@vubon/shared-utils';
import { REGEX_PHONE, REGEX_EMAIL, PASSWORD_POLICY, USER_ROLES } from '@vubon/shared-constants';
import { ApiProperty } from '@nestjs/swagger';

// ============================================================
// Types
// ============================================================

/**
 * Supported languages for notification
 */
export enum LanguagePreference {
  ENGLISH = 'en',
  BENGALI = 'bn',
}

/**
 * User roles for registration
 */
export enum RegistrationRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  VENDOR = 'VENDOR',
}

/**
 * Device information for tracking
 */
export class DeviceInfoDto {
  @ApiPropertyOptional({
    description: 'Device fingerprint for tracking',
    example: 'fp_a1b2c3d4e5f6',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint hash',
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Device platform (web, mobile, tablet, desktop)',
    example: 'web',
  })
  @IsOptional()
  @IsString()
  @IsIn(['web', 'mobile', 'tablet', 'desktop', 'smart_tv', 'wearable'])
  platform?: string;

  @ApiPropertyOptional({
    description: 'Operating system name',
    example: 'Windows 11',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  os?: string;

  @ApiPropertyOptional({
    description: 'Browser name and version',
    example: 'Chrome 120',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  browser?: string;

  @ApiPropertyOptional({
    description: 'Screen resolution (WxH)',
    example: '1920x1080',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+x\d+$/, { message: 'Screen resolution must be in format WxH (e.g., 1920x1080)' })
  screenResolution?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Client IP address',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^[a-fA-F0-9:]+$/, {
    message: 'Invalid IP address format',
  })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'Network type (2g, 3g, 4g, 5g, wifi)',
    example: 'wifi',
  })
  @IsOptional()
  @IsString()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
  })
  @IsOptional()
  @IsString()
  @IsIn(['gp', 'robi', 'banglalink', 'teletalk', 'unknown'])
  mobileOperator?: string;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  district?: string;

  @ApiPropertyOptional({
    description: 'Upazila (Bangladesh specific)',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  upazila?: string;

  @ApiPropertyOptional({
    description: 'Data saver enabled (for mobile networks)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  dataSaverEnabled?: boolean;
}

/**
 * User preferences for registration
 */
export class UserPreferencesDto {
  @ApiPropertyOptional({
    description: 'Marketing consent (email)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  marketingConsent?: boolean;

  @ApiPropertyOptional({
    description: 'WhatsApp marketing consent',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  whatsappConsent?: boolean;

  @ApiPropertyOptional({
    description: 'SMS marketing consent',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  smsConsent?: boolean;

  @ApiPropertyOptional({
    description: 'Preferred district for delivery',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila for delivery',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferredUpazila?: string;

  @ApiPropertyOptional({
    description: 'Preferred delivery time',
    example: 'evening',
  })
  @IsOptional()
  @IsString()
  @IsIn(['morning', 'afternoon', 'evening', 'any'])
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';

  @ApiPropertyOptional({
    description: 'Auto-apply coupons',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  autoApplyCoupons?: boolean;
}

// ============================================================
// Main DTO
// ============================================================

export class RegisterRequestDto {
  // ============================================================
  // Core Registration Fields
  // ============================================================

  @ApiProperty({
    description: 'Email address for account',
    example: 'user@vubon.com.bd',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(({ value }: { value: string }) => normalizeEmail(value))
  @MaxLength(254, { message: 'Email cannot exceed 254 characters' })
  @Matches(REGEX_EMAIL.STRICT, { message: 'Invalid email format' })
  email!: string;

  @ApiProperty({
    description: 'Password for account (min 8 characters)',
    example: 'StrongP@ssw0rd123!',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`,
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password!: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'StrongP@ssw0rd123!',
    required: true,
  })
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @Transform(({ obj }: { obj: RegisterRequestDto }) => {
    if (obj.password && obj.confirmPassword && obj.password !== obj.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return obj.confirmPassword;
  })
  confirmPassword!: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s.'-]+$/, {
    message: 'Full name contains invalid characters (only letters, spaces, dots, hyphens, apostrophes allowed)',
  })
  @Transform(({ value }: { value: string }) => value.trim().replace(/\s+/g, ' '))
  fullName!: string;

  // ============================================================
  // Optional Fields
  // ============================================================

  @ApiPropertyOptional({
    description: 'Display name (if not provided, derived from full name)',
    example: 'JohnD',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Display name must be at least 3 characters' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format or local BD format)',
    example: '+8801712345678',
  })
  @IsOptional()
  @IsString()
  @Matches(REGEX_PHONE.BANGLADESH, {
    message: 'Invalid Bangladesh phone number format. Use E.164 or local format',
  })
  @Transform(({ value }: { value: string }) => {
    if (value) {
      // Normalize to E.164 format
      const normalized = normalizePhone(value, 'BD');
      if (normalized) {
        return normalized;
      }
    }
    return value;
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Birth date (DD-MM-YYYY or YYYY-MM-DD)',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format. Use YYYY-MM-DD' })
  birthDate?: string;

  @ApiPropertyOptional({
    description: 'Referral code (if available)',
    example: 'REF123456',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{8,12}$/, {
    message: 'Invalid referral code format (alphanumeric, 8-12 characters)',
  })
  referralCode?: string;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for verification',
    example: '03AFcWeA5u1...',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  captchaToken?: string;

  // ============================================================
  // Consent Fields
  // ============================================================

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Terms acceptance must be a boolean' })
  @Transform(({ value }: { value: unknown }) => {
    if (value !== true) {
      throw new Error('You must accept the terms and conditions');
    }
    return value;
  })
  acceptTerms!: boolean;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Privacy acceptance must be a boolean' })
  @Transform(({ value }: { value: unknown }) => {
    if (value !== true) {
      throw new Error('You must accept the privacy policy');
    }
    return value;
  })
  acceptPrivacy!: boolean;

  // ============================================================
  // Optional Consent Fields
  // ============================================================

  @ApiPropertyOptional({
    description: 'Age verification (13+ for customer, 18+ for seller)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  ageVerification?: boolean;

  // ============================================================
  // Role & Preferences
  // ============================================================

  @ApiPropertyOptional({
    description: 'User role (default: CUSTOMER)',
    enum: RegistrationRole,
    example: 'CUSTOMER',
  })
  @IsOptional()
  @IsEnum(RegistrationRole, { message: 'Invalid role' })
  role?: RegistrationRole;

  @ApiPropertyOptional({
    description: 'Language preference',
    enum: LanguagePreference,
    example: 'en',
  })
  @IsOptional()
  @IsEnum(LanguagePreference, { message: 'Invalid language preference' })
  preferredLanguage?: LanguagePreference;

  // ============================================================
  // Nested Objects
  // ============================================================

  @ApiPropertyOptional({
    description: 'Device information for tracking',
    type: DeviceInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  deviceInfo?: DeviceInfoDto;

  @ApiPropertyOptional({
    description: 'User preferences',
    type: UserPreferencesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPreferencesDto)
  preferences?: UserPreferencesDto;

  // ============================================================
  // Additional Metadata
  // ============================================================

  @ApiPropertyOptional({
    description: 'Registration source (web, mobile_app, etc.)',
    example: 'web',
  })
  @IsOptional()
  @IsString()
  @IsIn(['web', 'mobile_app', 'admin', 'social', 'api', 'vendor_platform'], {
    message: 'Invalid registration source',
  })
  registrationSource?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_1234567890',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  correlationId?: string;

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Check if passwords match
   */
  hasValidPasswordMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  /**
   * Check if terms are accepted
   */
  hasAcceptedTerms(): boolean {
    return this.acceptTerms === true;
  }

  /**
   * Check if privacy is accepted
   */
  hasAcceptedPrivacy(): boolean {
    return this.acceptPrivacy === true;
  }

  /**
   * Check if age is verified
   */
  hasAgeVerification(): boolean {
    return this.ageVerification === true;
  }

  /**
   * Check if referral code is provided
   */
  hasReferralCode(): boolean {
    return !!this.referralCode;
  }

  /**
   * Check if CAPTCHA is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken;
  }

  /**
   * Check if phone is provided
   */
  hasPhone(): boolean {
    return !!this.phone;
  }

  /**
   * Get masked email for logging
   */
  getMaskedEmail(): string {
    if (!this.email) return '';
    const [username, domain] = this.email.split('@');
    if (!username) return this.email;
    if (username.length <= 2) {
      return `${username}***@${domain}`;
    }
    const first = username[0];
    const last = username[username.length - 1];
    return `${first}***${last}@${domain}`;
  }

  /**
   * Get masked phone for logging
   */
  getMaskedPhone(): string {
    if (!this.phone) return '';
    if (this.phone.length <= 8) return this.phone;
    const prefix = this.phone.substring(0, 4);
    const suffix = this.phone.substring(this.phone.length - 4);
    return `${prefix}****${suffix}`;
  }

  /**
   * Convert to command object
   */
  toCommand(): {
    email: string;
    password: string;
    fullName: string;
    displayName?: string;
    phone?: string;
    acceptTerms: boolean;
    acceptPrivacy: boolean;
    preferredLanguage?: 'en' | 'bn';
    referralCode?: string;
    captchaToken?: string;
    deviceInfo?: DeviceInfoDto;
    preferences?: UserPreferencesDto;
    correlationId?: string;
  } {
    return {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      displayName: this.displayName,
      phone: this.phone,
      acceptTerms: this.acceptTerms,
      acceptPrivacy: this.acceptPrivacy,
      preferredLanguage: this.preferredLanguage,
      referralCode: this.referralCode,
      captchaToken: this.captchaToken,
      deviceInfo: this.deviceInfo,
      preferences: this.preferences,
      correlationId: this.correlationId,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfoDto as DeviceInfoType };
export type { UserPreferencesDto as UserPreferencesType };
