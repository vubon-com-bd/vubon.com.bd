/**
 * Update Profile DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/user/update-profile.dto
 * 
 * @description
 * Data transfer objects for updating user profile information.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ Sensitive fields (email, phone) require current password verification
 * ✅ Email update triggers re-verification
 * ✅ All fields have proper validation
 * ✅ Bangladesh phone number validation
 * ✅ Display name, preferred district/upazila support
 * 
 * Flow:
 * 1. User submits profile updates
 * 2. For non-sensitive fields: update immediately
 * 3. For email/phone changes: require password verification + re-verification
 */

import { 
  IsString, 
  IsOptional, 
  IsEmail,
  IsUrl,
  IsTimeZone,
  IsIn,
  IsBoolean,
  IsObject,
  MinLength, 
  MaxLength,
  Matches,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  PHONE_PATTERNS, 
  PASSWORD_PATTERNS,
  SUPPORTED_LANGUAGES,
  NAME_PATTERNS,
} from '@vubon/shared-constants';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  UserPreferences, 
  SupportedLanguage,
  District,
  Upazila,
} from '@vubon/shared-types';

// ============================================================
// Re-export for convenience (maintains backward compatibility)
// ============================================================

export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage, UserPreferences };

// ============================================================
// User Preferences DTO (using shared type)
// ============================================================

export class UserPreferencesDto implements UserPreferences {
  @ApiPropertyOptional({
    description: 'Email notifications enabled',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Email notifications must be a boolean' })
  emailNotifications?: boolean;

  @ApiPropertyOptional({
    description: 'SMS notifications enabled',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'SMS notifications must be a boolean' })
  smsNotifications?: boolean;

  @ApiPropertyOptional({
    description: 'Push notifications enabled',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Push notifications must be a boolean' })
  pushNotifications?: boolean;

  @ApiPropertyOptional({
    description: 'Marketing emails consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing emails must be a boolean' })
  marketingEmails?: boolean;

  @ApiPropertyOptional({
    description: 'Order updates notifications',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Order updates must be a boolean' })
  orderUpdates?: boolean;

  @ApiPropertyOptional({
    description: 'Price drop alerts',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Price drop alerts must be a boolean' })
  priceDropAlerts?: boolean;

  @ApiPropertyOptional({
    description: 'Back in stock alerts',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Back in stock alerts must be a boolean' })
  backInStockAlerts?: boolean;

  @ApiPropertyOptional({
    description: 'Newsletter subscription',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Newsletter subscription must be a boolean' })
  newsletterSubscription?: boolean;

  @ApiPropertyOptional({
    description: 'Preferred delivery time',
    example: 'evening',
    enum: ['morning', 'afternoon', 'evening', 'any'],
    default: 'any',
  })
  @IsOptional()
  @IsIn(['morning', 'afternoon', 'evening', 'any'], { 
    message: 'Preferred delivery time must be morning, afternoon, evening, or any' 
  })
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';

  @ApiPropertyOptional({
    description: 'Save address history',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Save address history must be a boolean' })
  saveAddressHistory?: boolean;

  @ApiPropertyOptional({
    description: 'Auto apply coupons',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Auto apply coupons must be a boolean' })
  autoApplyCoupons?: boolean;
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Update Profile Request DTO
 * For non-sensitive profile updates
 * 
 * @example
 * {
 *   "fullName": "Jane Doe",
 *   "displayName": "Jane",
 *   "profilePicture": "https://example.com/avatar.jpg",
 *   "timezone": "Asia/Dhaka",
 *   "language": "bn",
 *   "preferredDistrict": "Dhaka",
 *   "preferredUpazila": "Gulshan",
 *   "preferences": {
 *     "emailNotifications": true,
 *     "preferredDeliveryTime": "evening"
 *   }
 * }
 */
export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'Jane Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Matches(NAME_PATTERNS.FULL_NAME, {
    message: 'Full name can only contain letters, spaces, dots, hyphens, and apostrophes',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Display name (for UI)',
    example: 'Jane',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MinLength(2, { message: 'Display name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  @Matches(NAME_PATTERNS.DISPLAY_NAME, {
    message: 'Display name can contain letters, numbers, spaces, and underscores',
  })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Profile picture URL',
    example: 'https://vubon.com.bd/uploads/avatars/user123.jpg',
    format: 'uri',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL' })
  @MaxLength(500, { message: 'Profile picture URL cannot exceed 500 characters' })
  profilePicture?: string;

  @ApiPropertyOptional({
    description: 'User timezone',
    example: 'Asia/Dhaka',
    default: 'Asia/Dhaka',
  })
  @IsOptional()
  @IsTimeZone({ message: 'Invalid timezone' })
  timezone?: string;

  @ApiPropertyOptional({
    description: 'User language preference',
    enum: SUPPORTED_LANGUAGES,
    example: 'bn',
    default: 'en',
  })
  @IsOptional()
  @IsIn(SUPPORTED_LANGUAGES, { message: `Language must be one of: ${SUPPORTED_LANGUAGES.join(', ')}` })
  language?: SupportedLanguage;

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Preferred district must be a string' })
  @MaxLength(50, { message: 'Preferred district cannot exceed 50 characters' })
  preferredDistrict?: District;

  @ApiPropertyOptional({
    description: 'Preferred upazila (Bangladesh)',
    example: 'Gulshan',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Preferred upazila must be a string' })
  @MaxLength(50, { message: 'Preferred upazila cannot exceed 50 characters' })
  preferredUpazila?: Upazila;

  @ApiPropertyOptional({
    description: 'User preferences',
    type: UserPreferencesDto,
  })
  @IsOptional()
  @IsObject({ message: 'Preferences must be an object' })
  preferences?: UserPreferencesDto;

  constructor(
    fullName?: string,
    profilePicture?: string,
    timezone?: string,
    language?: SupportedLanguage,
    displayName?: string,
    preferredDistrict?: District,
    preferredUpazila?: Upazila,
    preferences?: UserPreferencesDto
  ) {
    this.fullName = fullName;
    this.displayName = displayName;
    this.profilePicture = profilePicture;
    this.timezone = timezone;
    this.language = language;
    this.preferredDistrict = preferredDistrict;
    this.preferredUpazila = preferredUpazila;
    this.preferences = preferences;
  }
}

/**
 * Update Email Request DTO (requires password verification)
 * 
 * @example
 * {
 *   "newEmail": "newemail@vubon.com.bd",
 *   "currentPassword": "MyP@ssw0rd",
 *   "reason": "Switching to primary email"
 * }
 */
export class UpdateEmailDto {
  @ApiProperty({
    description: 'New email address',
    example: 'newemail@vubon.com.bd',
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'New email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  newEmail: string;

  @ApiProperty({
    description: 'Current password for verification',
    example: 'MyP@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(8, { message: 'Current password must be at least 8 characters' })
  currentPassword: string;

  @ApiPropertyOptional({
    description: 'Reason for email change (for audit)',
    example: 'Switching to primary email',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(newEmail: string, currentPassword: string, reason?: string) {
    this.newEmail = newEmail;
    this.currentPassword = currentPassword;
    this.reason = reason;
  }
}

/**
 * Update Phone Request DTO (requires password verification)
 * 
 * @example
 * {
 *   "newPhone": "+8801987654321",
 *   "currentPassword": "MyP@ssw0rd",
 *   "method": "sms",
 *   "reason": "Switched to new number"
 * }
 */
export class UpdatePhoneDto {
  @ApiProperty({
    description: 'New phone number (E.164 format)',
    example: '+8801987654321',
    required: true,
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'New phone number is required' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: 'Phone number must be in E.164 format (e.g., +8801712345678)',
  })
  newPhone: string;

  @ApiProperty({
    description: 'Current password for verification',
    example: 'MyP@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(8, { message: 'Current password must be at least 8 characters' })
  currentPassword: string;

  @ApiPropertyOptional({
    description: 'Verification method',
    example: 'sms',
    enum: ['sms', 'whatsapp'],
    default: 'sms',
  })
  @IsOptional()
  @IsIn(['sms', 'whatsapp'], { message: 'Method must be sms or whatsapp' })
  method?: 'sms' | 'whatsapp' = 'sms';

  @ApiPropertyOptional({
    description: 'Reason for phone change (for audit)',
    example: 'Switched to new number',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  constructor(newPhone: string, currentPassword: string, method?: 'sms' | 'whatsapp', reason?: string) {
    this.newPhone = newPhone;
    this.currentPassword = currentPassword;
    this.method = method ?? 'sms';
    this.reason = reason;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Update Profile Response DTO
 */
export class UpdateProfileResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Jane Doe',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Display name',
    example: 'Jane',
  })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+8801712345678',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Profile picture URL',
    example: 'https://vubon.com.bd/uploads/avatars/user123.jpg',
  })
  profilePicture?: string;

  @ApiPropertyOptional({
    description: 'User timezone',
    example: 'Asia/Dhaka',
  })
  timezone?: string;

  @ApiPropertyOptional({
    description: 'User language preference',
    example: 'bn',
  })
  language?: string;

  @ApiPropertyOptional({
    description: 'Preferred district',
    example: 'Dhaka',
  })
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila',
    example: 'Gulshan',
  })
  preferredUpazila?: string;

  @ApiProperty({
    description: 'Timestamp when profile was updated',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    updatedAt: Date,
    phone?: string,
    profilePicture?: string,
    timezone?: string,
    language?: string,
    displayName?: string,
    preferredDistrict?: string,
    preferredUpazila?: string
  ) {
    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
    this.displayName = displayName;
    this.phone = phone;
    this.profilePicture = profilePicture;
    this.timezone = timezone;
    this.language = language;
    this.preferredDistrict = preferredDistrict;
    this.preferredUpazila = preferredUpazila;
    this.updatedAt = updatedAt.toISOString();
  }
}

/**
 * Update Email Response DTO
 */
export class UpdateEmailResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Email update initiated. Please verify your new email address.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ইমেইল আপডেট শুরু হয়েছে। অনুগ্রহ করে আপনার নতুন ইমেইল ঠিকানা ভেরিফাই করুন।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Whether verification is required',
    example: true,
  })
  requiresVerification: boolean;

  @ApiPropertyOptional({
    description: 'Masked email for display',
    example: 'n***l@vubon.com.bd',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'Session ID for verification tracking',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  constructor(
    requiresVerification: boolean = true, 
    maskedEmail?: string,
    sessionId?: string,
    message?: string,
    messageBn?: string
  ) {
    this.message = message || (requiresVerification 
      ? 'Email update initiated. Please verify your new email address.'
      : 'Email updated successfully.');
    this.messageBn = messageBn;
    this.requiresVerification = requiresVerification;
    this.maskedEmail = maskedEmail;
    this.sessionId = sessionId;
  }
}

/**
 * Update Phone Response DTO
 */
export class UpdatePhoneResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Phone number update initiated. Please verify your new phone number.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ফোন নম্বর আপডেট শুরু হয়েছে। অনুগ্রহ করে আপনার নতুন ফোন নম্বর ভেরিফাই করুন।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Whether verification is required',
    example: true,
  })
  requiresVerification: boolean;

  @ApiPropertyOptional({
    description: 'Masked phone number for display',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Session ID for verification tracking',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Verification method',
    example: 'sms',
    enum: ['sms', 'whatsapp'],
  })
  method?: 'sms' | 'whatsapp';

  constructor(
    requiresVerification: boolean = true, 
    maskedPhone?: string,
    sessionId?: string,
    method?: 'sms' | 'whatsapp',
    message?: string,
    messageBn?: string
  ) {
    this.message = message || (requiresVerification 
      ? 'Phone number update initiated. Please verify your new phone number.'
      : 'Phone number updated successfully.');
    this.messageBn = messageBn;
    this.requiresVerification = requiresVerification;
    this.maskedPhone = maskedPhone;
    this.sessionId = sessionId;
    this.method = method;
  }
}

/**
 * Verify Email Change Request DTO
 */
export class VerifyEmailChangeDto {
  @ApiProperty({
    description: 'Verification token from email',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Verification token is required' })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

/**
 * Verify Email Change Response DTO
 */
export class VerifyEmailChangeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Email updated successfully.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ইমেইল সফলভাবে আপডেট করা হয়েছে।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'New email address',
    example: 'newemail@vubon.com.bd',
  })
  newEmail: string;

  @ApiProperty({
    description: 'Timestamp when email was updated',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;

  constructor(newEmail: string, updatedAt: Date, message?: string, messageBn?: string) {
    this.message = message || 'Email updated successfully.';
    this.messageBn = messageBn;
    this.newEmail = newEmail;
    this.updatedAt = updatedAt.toISOString();
  }
}

/**
 * Verify Phone Change Request DTO
 */
export class VerifyPhoneChangeDto {
  @ApiProperty({
    description: 'OTP code sent to new phone number',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'OTP must be a string' })
  @IsNotEmpty({ message: 'OTP is required' })
  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @ApiPropertyOptional({
    description: 'Session ID from update phone response',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Session ID must be a valid UUID' })
  sessionId?: string;

  constructor(otp: string, sessionId?: string) {
    this.otp = otp;
    this.sessionId = sessionId;
  }
}

/**
 * Verify Phone Change Response DTO
 */
export class VerifyPhoneChangeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Phone number updated successfully.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ফোন নম্বর সফলভাবে আপডেট করা হয়েছে।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'New phone number',
    example: '+8801987654321',
  })
  newPhone: string;

  @ApiProperty({
    description: 'Timestamp when phone was updated',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;

  constructor(newPhone: string, updatedAt: Date, message?: string, messageBn?: string) {
    this.message = message || 'Phone number updated successfully.';
    this.messageBn = messageBn;
    this.newPhone = newPhone;
    this.updatedAt = updatedAt.toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { UserPreferences as UserPreferencesDtoType };
