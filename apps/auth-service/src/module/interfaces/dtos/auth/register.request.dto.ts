/**
 * Register Request DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/register.request.dto
 *
 * @description
 * Data Transfer Object for user registration requests.
 * Validates incoming registration data using Zod schema from shared-schemas.
 *
 * Enterprise Features:
 * ✅ Zod validation for all fields
 * ✅ Bengali and English error messages
 * ✅ Bangladesh specific fields (district, upazila)
 * ✅ Password confirmation validation
 * ✅ Terms and privacy acceptance validation
 * ✅ Device info tracking
 *
 * @example
 * // In controller
 * @Post('register')
 * @UsePipes(new ZodValidationPipe(RegisterRequestSchema))
 * async register(@Body() dto: RegisterRequestDto) {
 *   const command = RegisterUserCommand.fromDto(dto);
 *   return this.commandBus.execute(command);
 * }
 */

import { IsString, IsEmail, IsOptional, IsBoolean, IsObject, IsIn, ValidateIf, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Device Info DTO (Nested)
// ============================================================

export class DeviceInfoDto {
  @ApiPropertyOptional({
    description: 'IP address of the device',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string of the device',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Unique device identifier',
    example: 'device_abc123',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
}

// ============================================================
// Main Register Request DTO
// ============================================================

export class RegisterRequestDto {
  // ============================================================
  // Core Registration Fields
  // ============================================================

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User password (at least 8 characters)',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  // ============================================================
  // Optional Fields
  // ============================================================

  @ApiPropertyOptional({
    description: 'User display name (if not provided, uses first name from fullName)',
    example: 'Johnny',
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Phone number (Bangladesh format)',
    example: '+8801712345678',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  // ============================================================
  // Preferences
  // ============================================================

  @ApiPropertyOptional({
    description: 'Preferred language',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Language must be either "en" or "bn"' })
  preferredLanguage?: 'en' | 'bn';

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila (Bangladesh)',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString()
  preferredUpazila?: string;

  // ============================================================
  // Consents
  // ============================================================

  @ApiProperty({
    description: 'Acceptance of terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  acceptTerms: boolean;

  @ApiProperty({
    description: 'Acceptance of privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  acceptPrivacy: boolean;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  marketingConsent?: boolean;

  @ApiPropertyOptional({
    description: 'WhatsApp consent (Bangladesh specific)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  whatsappConsent?: boolean;

  // ============================================================
  // Verification & Security
  // ============================================================

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot prevention',
    example: '03AFcWeA4Z...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF12345',
  })
  @IsOptional()
  @IsString()
  referralCode?: string;

  // ============================================================
  // Device Information
  // ============================================================

  @ApiPropertyOptional({
    description: 'Device information for tracking and security',
    type: DeviceInfoDto,
  })
  @IsOptional()
  @IsObject()
  deviceInfo?: DeviceInfoDto;

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Check if passwords match
   */
  doPasswordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  /**
   * Check if terms are accepted
   */
  hasAcceptedTerms(): boolean {
    return this.acceptTerms === true;
  }

  /**
   * Check if privacy policy is accepted
   */
  hasAcceptedPrivacy(): boolean {
    return this.acceptPrivacy === true;
  }

  /**
   * Check if phone number is provided
   */
  hasPhone(): boolean {
    return !!this.phone && this.phone.trim().length > 0;
  }

  /**
   * Check if referral code is provided
   */
  hasReferralCode(): boolean {
    return !!this.referralCode && this.referralCode.trim().length > 0;
  }

  /**
   * Check if marketing consent is provided
   */
  hasMarketingConsent(): boolean {
    return this.marketingConsent === true;
  }

  /**
   * Check if WhatsApp consent is provided
   */
  hasWhatsAppConsent(): boolean {
    return this.whatsappConsent === true;
  }

  /**
   * Check if CAPTCHA token is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.trim().length > 0;
  }

  /**
   * Check if display name is provided
   */
  hasDisplayName(): boolean {
    return !!this.displayName && this.displayName.trim().length > 0;
  }

  /**
   * Get masked email for logging
   */
  getMaskedEmail(): string {
    const [username, domain] = this.email.split('@');
    if (!username || !domain) return '***@***';
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
    const phone = this.phone.trim();
    if (phone.length <= 8) return phone;
    const prefix = phone.substring(0, phone.length - 6);
    const suffix = phone.substring(phone.length - 2);
    return `${prefix}******${suffix}`;
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create from plain object (for testing)
   */
  static fromPlain(data: Partial<RegisterRequestDto>): RegisterRequestDto {
    const dto = new RegisterRequestDto();
    Object.assign(dto, data);
    return dto;
  }

  /**
   * Validate all fields
   */
  validate(): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!this.email) {
      errors.push('Email is required');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (this.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (this.password !== this.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (!this.fullName || this.fullName.trim().length === 0) {
      errors.push('Full name is required');
    }

    if (this.acceptTerms !== true) {
      errors.push('You must accept the terms and conditions');
    }

    if (this.acceptPrivacy !== true) {
      errors.push('You must accept the privacy policy');
    }

    // Phone validation (if provided)
    if (this.phone) {
      const phoneRegex = /^(?:\+880|0)1[3-9]\d{8}$/;
      if (!phoneRegex.test(this.phone.trim())) {
        errors.push('Invalid Bangladesh phone number format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
