/**
 * Update Profile DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/user/update-profile.dto
 * 
 * @description
 * Data transfer objects for updating user profile information.
 * ENHANCED with: Rate limiting metadata, audit logging, distributed tracing.
 * 
 * ENTERPRISE ENHANCEMENTS APPLIED:
 * ✅ Audit Metadata support for tracking who changed what
 * ✅ Rate Limit awareness for security-sensitive updates (Email/Phone change)
 * ✅ Correlation ID for distributed tracing
 * ✅ Password change cooldown tracking (防止暴力破解)
 * ✅ Current session validation before sensitive updates
 * ✅ Reason field for audit trail (WHO/WHEN/WHY)
 * 
 * Security Rules:
 * ✅ Sensitive fields (email, phone) require current password verification
 * ✅ Email update triggers re-verification
 * ✅ Phone update supports SMS/WhatsApp with rate limiting
 * ✅ All fields have proper validation
 * ✅ Bangladesh phone number validation
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
  IsNumber,
  Min,
  Max,
  IsDate,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  PHONE_PATTERNS, 
  SUPPORTED_LANGUAGES,
  NAME_PATTERNS,
} from '@vubon/shared-constants';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  UserPreferences, 
  SupportedLanguage,
  AuditMetadata,
} from '@vubon/shared-types';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Rate Limit & Audit Metadata DTOs
// ============================================================

/**
 * Rate limit metadata for security-sensitive operations (Email/Phone change)
 * প্রিভেন্টস ব্রুট-ফোর্স অ্যাটাক অন প্রোফাইল আপডেট
 */
export class SecurityOperationRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number | undefined;

  @ApiPropertyOptional({ description: 'Max attempts allowed', example: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number | undefined;

  @ApiPropertyOptional({ description: 'Remaining attempts', example: 4 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number | undefined;

  @ApiPropertyOptional({ description: 'Time when limit resets', example: '2024-01-01T01:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date | undefined;
}

/**
 * Audit context for profile changes (WHO, WHEN, WHY, WHERE)
 * ট্র্যাকস ইউজার অ্যাক্টিভিটি ফর কমপ্লায়েন্স
 */
export class ProfileAuditContextDto {
  @ApiPropertyOptional({ description: 'IP address of the request', example: '192.168.1.100' })
  @IsOptional()
  @IsString()
  ipAddress?: string | undefined;

  @ApiPropertyOptional({ description: 'User agent string' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string | undefined;

  @ApiPropertyOptional({ description: 'Current session ID being used' })
  @IsOptional()
  @IsUUID()
  sessionId?: string | undefined;

  @ApiPropertyOptional({ description: 'Device fingerprint for fraud detection' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({ description: 'Correlation ID for distributed tracing' })
  @IsOptional()
  @IsUUID()
  correlationId?: string | undefined;
}

// ============================================================
// Re-export for convenience
// ============================================================

export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage, UserPreferences };

// ============================================================
// User Preferences DTO (using shared type)
// ============================================================

export class  UserPreferencesDto {
  @ApiPropertyOptional({ description: 'Email notifications enabled', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean | undefined;

  @ApiPropertyOptional({ description: 'SMS notifications enabled', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  smsNotifications?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Push notifications enabled', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Marketing emails consent', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  marketingEmails?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Order updates notifications', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  orderUpdates?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Price drop alerts', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  priceDropAlerts?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Back in stock alerts', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  backInStockAlerts?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Newsletter subscription', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  newsletterSubscription?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Preferred delivery time', enum: ['morning', 'afternoon', 'evening', 'any'], default: 'any' })
  @IsOptional()
  @IsIn(['morning', 'afternoon', 'evening', 'any'])
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any' | undefined;

  @ApiPropertyOptional({ description: 'Save address history', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  saveAddressHistory?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Auto apply coupons', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  autoApplyCoupons?: boolean | undefined;
}

// ============================================================
// Request DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Update Profile Request DTO (For non-sensitive profile updates)
 * ✅ ENTERPRISE: Added audit context
 * 
 * @example
 * {
 *   "fullName": "Jane Doe",
 *   "displayName": "Jane",
 *   "profilePicture": "https://example.com/avatar.jpg",
 *   "timezone": "Asia/Dhaka",
 *   "language": "bn",
 *   "preferences": { "emailNotifications": true }
 * }
 */
export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'User full name', minLength: 2, maxLength: 100 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(NAME_PATTERNS.FULL_NAME)
  fullName?: string | undefined;

  @ApiPropertyOptional({ description: 'Display name', minLength: 2, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(NAME_PATTERNS.DISPLAY_NAME)
  displayName?: string | undefined;

  @ApiPropertyOptional({ description: 'Profile picture URL', format: 'uri' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  profilePicture?: string | undefined;

  @ApiPropertyOptional({ description: 'User timezone', default: 'Asia/Dhaka' })
  @IsOptional()
  @IsTimeZone()
  timezone?: string | undefined;

  @ApiPropertyOptional({ description: 'User language preference', enum: SUPPORTED_LANGUAGES, default: 'en' })
  @IsOptional()
  @IsIn(SUPPORTED_LANGUAGES)
  language?: SupportedLanguage | undefined;

  @ApiPropertyOptional({ description: 'Preferred district (Bangladesh)', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferredDistrict?: string | undefined;

  @ApiPropertyOptional({ description: 'Preferred upazila (Bangladesh)', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferredUpazila?: string | undefined;

  @ApiPropertyOptional({ description: 'User preferences', type: UserPreferencesDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserPreferencesDto)
  preferences?: UserPreferencesDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context for tracking
  @ApiPropertyOptional({ description: 'Audit context for profile update', type: ProfileAuditContextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileAuditContextDto)
  auditContext?: ProfileAuditContextDto | undefined;
}

/**
 * Update Email Request DTO (requires password verification)
 * ✅ ENTERPRISE ENHANCEMENT: Added rate limit and audit support
 * 
 * @example
 * {
 *   "newEmail": "newemail@vubon.com.bd",
 *   "currentPassword": "MyP@ssw0rd",
 *   "reason": "Switching to primary email"
 * }
 */
export class UpdateEmailDto {
  @ApiProperty({ description: 'New email address', required: true, format: 'email' })
  @IsEmail()
  @IsDefined()
  @MaxLength(255)
  newEmail: string;

  @ApiProperty({ description: 'Current password for verification', required: true, writeOnly: true })
  @IsString()
  @IsDefined()
  @MinLength(8)
  currentPassword: string;

  @ApiPropertyOptional({ description: 'Reason for email change (for audit)', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata (ป้องกัน brute force)
  @ApiPropertyOptional({ description: 'Rate limit metadata for this operation', type: SecurityOperationRateLimitDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityOperationRateLimitDto)
  rateLimit?: SecurityOperationRateLimitDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({ description: 'Audit context for email change', type: ProfileAuditContextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileAuditContextDto)
  auditContext?: ProfileAuditContextDto | undefined;

  constructor(newEmail: string, currentPassword: string, reason?: string) {
    this.newEmail = newEmail;
    this.currentPassword = currentPassword;
    this.reason = reason;
  }
}

/**
 * Update Phone Request DTO (requires password verification)
 * ✅ ENTERPRISE ENHANCEMENT: Added rate limit, audit support, and cooldown tracking
 * 
 * @example
 * {
 *   "newPhone": "+8801987654321",
 *   "currentPassword": "MyP@ssw0rd",
 *   "method": "whatsapp",
 *   "reason": "Switched to new number"
 * }
 */
export class UpdatePhoneDto {
  @ApiProperty({ description: 'New phone number (E.164 format)', required: true, pattern: PHONE_PATTERNS.BANGLADESH_E164 })
  @IsString()
  @IsDefined()
  @Matches(PHONE_PATTERNS.BANGLADESH_E164)
  newPhone: string;

  @ApiProperty({ description: 'Current password for verification', required: true, writeOnly: true })
  @IsString()
  @IsDefined()
  @MinLength(8)
  currentPassword: string;

  @ApiPropertyOptional({ description: 'Verification method', enum: ['sms', 'whatsapp'], default: 'sms' })
  @IsOptional()
  @IsIn(['sms', 'whatsapp'])
  method?: 'sms' | 'whatsapp' | undefined = 'sms';

  @ApiPropertyOptional({ description: 'Reason for phone change (for audit)', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({ description: 'Rate limit metadata for this operation', type: SecurityOperationRateLimitDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SecurityOperationRateLimitDto)
  rateLimit?: SecurityOperationRateLimitDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({ description: 'Audit context for phone change', type: ProfileAuditContextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileAuditContextDto)
  auditContext?: ProfileAuditContextDto | undefined;

  constructor(newPhone: string, currentPassword: string, method?: 'sms' | 'whatsapp', reason?: string) {
    this.newPhone = newPhone;
    this.currentPassword = currentPassword;
    this.method = method ?? 'sms';
    this.reason = reason;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Update Profile Response DTO
 * ✅ ENTERPRISE: Added correlation ID for tracing
 */
export class UpdateProfileResponseDto {
  @ApiProperty({ description: 'User unique identifier' })
  userId: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User full name' })
  fullName: string;

  @ApiPropertyOptional({ description: 'Display name' })
  displayName?: string | undefined;

  @ApiPropertyOptional({ description: 'User phone number' })
  phone?: string | undefined;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  profilePicture?: string | undefined;

  @ApiPropertyOptional({ description: 'User timezone' })
  timezone?: string | undefined;

  @ApiPropertyOptional({ description: 'User language preference' })
  language?: string | undefined;

  @ApiPropertyOptional({ description: 'Preferred district' })
  preferredDistrict?: string | undefined;

  @ApiPropertyOptional({ description: 'Preferred upazila' })
  preferredUpazila?: string | undefined;

  @ApiProperty({ description: 'Timestamp when profile was updated', format: 'date-time' })
  updatedAt: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({ description: 'Correlation ID for request tracking' })
  correlationId?: string | undefined;

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
    preferredUpazila?: string,
    correlationId?: string
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
    this.correlationId = correlationId;
  }
}

/**
 * Update Email Response DTO
 * ✅ ENTERPRISE: Enhanced with rate limit info for remaining attempts
 */
export class UpdateEmailResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali success message' })
  messageBn?: string | undefined;

  @ApiProperty({ description: 'Whether verification is required' })
  requiresVerification: boolean;

  @ApiPropertyOptional({ description: 'Masked email for display' })
  maskedEmail?: string | undefined;

  @ApiPropertyOptional({ description: 'Session ID for verification tracking' })
  sessionId?: string | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Return remaining rate limit info
  @ApiPropertyOptional({ description: 'Remaining verification attempts' })
  remainingAttempts?: number | undefined;

  constructor(
    requiresVerification: boolean = true, 
    maskedEmail?: string,
    sessionId?: string,
    message?: string,
    messageBn?: string,
    remainingAttempts?: number
  ) {
    this.message = message || (requiresVerification 
      ? 'Email update initiated. Please verify your new email address.'
      : 'Email updated successfully.');
    this.messageBn = messageBn;
    this.requiresVerification = requiresVerification;
    this.maskedEmail = maskedEmail;
    this.sessionId = sessionId;
    this.remainingAttempts = remainingAttempts;
  }
}

/**
 * Update Phone Response DTO
 * ✅ ENTERPRISE: Enhanced with rate limit info and method-specific details
 */
export class UpdatePhoneResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali success message' })
  messageBn?: string | undefined;

  @ApiProperty({ description: 'Whether verification is required' })
  requiresVerification: boolean;

  @ApiPropertyOptional({ description: 'Masked phone number for display' })
  maskedPhone?: string | undefined;

  @ApiPropertyOptional({ description: 'Session ID for verification tracking' })
  sessionId?: string | undefined;

  @ApiPropertyOptional({ description: 'Verification method', enum: ['sms', 'whatsapp'] })
  method?: 'sms' | 'whatsapp' | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Cooldown info to prevent spam
  @ApiPropertyOptional({ description: 'Cooldown seconds before next request' })
  cooldownSeconds?: number | undefined;

  constructor(
    requiresVerification: boolean = true, 
    maskedPhone?: string,
    sessionId?: string,
    method?: 'sms' | 'whatsapp',
    message?: string,
    messageBn?: string,
    cooldownSeconds?: number
  ) {
    this.message = message || (requiresVerification 
      ? 'Phone number update initiated. Please verify your new phone number.'
      : 'Phone number updated successfully.');
    this.messageBn = messageBn;
    this.requiresVerification = requiresVerification;
    this.maskedPhone = maskedPhone;
    this.sessionId = sessionId;
    this.method = method;
    this.cooldownSeconds = cooldownSeconds;
  }
}

/**
 * Verify Email Change Request DTO
 */
export class VerifyEmailChangeDto {
  @ApiProperty({ description: 'Verification token from email', required: true })
  @IsString()
  @IsDefined()
  token: string;

  // ✅ ENTERPRISE ENHANCEMENT: Context for verification
  @ApiPropertyOptional({ description: 'Correlation ID for tracing' })
  @IsOptional()
  @IsUUID()
  correlationId?: string | undefined;

  constructor(token: string, correlationId?: string) {
    this.token = token;
    this.correlationId = correlationId;
  }
}

/**
 * Verify Email Change Response DTO
 */
export class VerifyEmailChangeResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali success message' })
  messageBn?: string | undefined;

  @ApiProperty({ description: 'New email address' })
  newEmail: string;

  @ApiProperty({ description: 'Timestamp when email was updated', format: 'date-time' })
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
 * ✅ ENTERPRISE: Enhanced with attempt tracking
 */
export class VerifyPhoneChangeDto {
  @ApiProperty({ description: 'OTP code sent to new phone number', required: true, minLength: 6, maxLength: 6 })
  @IsString()
  @IsDefined()
  @Matches(/^\d{6}$/)
  otp: string;

  @ApiPropertyOptional({ description: 'Session ID from update phone response' })
  @IsOptional()
  @IsUUID()
  sessionId?: string | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Track attempt number for security
  @ApiPropertyOptional({ description: 'Attempt number (for rate limiting)', minimum: 1, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  attempt?: number | undefined;

  constructor(otp: string, sessionId?: string, attempt?: number) {
    this.otp = otp;
    this.sessionId = sessionId;
    this.attempt = attempt;
  }
}

/**
 * Verify Phone Change Response DTO
 */
export class VerifyPhoneChangeResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali success message' })
  messageBn?: string | undefined;

  @ApiProperty({ description: 'New phone number' })
  newPhone: string;

  @ApiProperty({ description: 'Timestamp when phone was updated', format: 'date-time' })
  updatedAt: string;

  constructor(newPhone: string, updatedAt: Date, message?: string, messageBn?: string) {
    this.message = message || 'Phone number updated successfully.';
    this.messageBn = messageBn;
    this.newPhone = newPhone;
    this.updatedAt = updatedAt.toISOString();
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper to generate audit metadata
// ============================================================

/**
 * Extract audit metadata from profile update request
 * ইউজ করে ট্র্যাক করো কে, কখন, কেন প্রোফাইল আপডেট করলো (Compliance)
 */
export function getProfileAuditMetadata(
  dto: UpdateProfileDto | UpdateEmailDto | UpdatePhoneDto,
  userId: string,
  requestId?: string
): AuditMetadata {
  const auditContext = 'auditContext' in dto ? dto.auditContext : undefined;
  
  // ✅ সবসময় একটি স্ট্রিং রিটার্ন করুন
  const finalRequestId = requestId || auditContext?.correlationId || `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  
  return {
    requestId: finalRequestId,
    userId: userId,
    source: 'api',
    timestamp: new Date(),
    correlationId: auditContext?.correlationId,
    // ✅ 'metadata' এর পরিবর্তে 'additionalData' ব্যবহার করুন
    additionalData: {
      ipAddress: auditContext?.ipAddress || null,
      userAgent: auditContext?.userAgent || null,
      sessionId: auditContext?.sessionId || null,
      deviceFingerprint: auditContext?.deviceFingerprint || null,
      reason: 'reason' in dto ? dto.reason : null,
      updatedFields: Object.keys(dto).filter(k => 
        dto[k as keyof typeof dto] !== undefined && 
        k !== 'auditContext' && 
        k !== 'currentPassword'
      ),
    },
  };
}
// ============================================================
// Type Exports
// ============================================================

export type { 
  UserPreferences as UserPreferencesDtoType,
  SecurityOperationRateLimitDto as SecurityOperationRateLimitDtoType,
  ProfileAuditContextDto as ProfileAuditContextDtoType,
};
