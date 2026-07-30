/**
 * Register DTO (Data Transfer Object)
 * Used for user registration in the application layer
 * Uses class-validator decorators for validation
 */

import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_PATTERN,
} from '@vubon/auth-shared-constants';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsString({ message: 'Email must be a string' })
  @MaxLength(255, { message: 'Email must not exceed 255 characters' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`,
  })
  @Matches(PASSWORD_PATTERN, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  password!: string;

  @IsString({ message: 'First name must be a string' })
  @MinLength(1, { message: 'First name is required' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName!: string;

  @IsString({ message: 'Last name must be a string' })
  @MinLength(1, { message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName!: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @IsPhoneNumber('BD', {
    message: 'Please provide a valid Bangladeshi phone number (format: 01XXXXXXXXX)',
  })
  @Matches(/^01[3-9]\d{8}$/, {
    message: 'Phone number must be a valid Bangladeshi number (format: 01XXXXXXXXX)',
  })
  phone?: string | null;

  /**
   * Sanitize and trim all string fields
   */
  sanitize(): void {
    this.email = this.email?.trim().toLowerCase() || '';
    this.firstName = this.firstName?.trim() || '';
    this.lastName = this.lastName?.trim() || '';
    if (this.phone) {
      this.phone = this.phone.trim();
    }
  }

  /**
   * Validate and sanitize the DTO
   * @returns boolean indicating if validation passes
   */
  validate(): boolean {
    this.sanitize();
    // Basic validation - class-validator will handle the rest
    return !!(this.email && this.password && this.firstName && this.lastName);
  }
}
