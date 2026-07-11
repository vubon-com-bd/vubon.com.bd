/**
 * Register Response DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/register.response.dto
 *
 * @description
 * Response DTO for user registration endpoint.
 * Returns registration result with verification requirements.
 *
 * Enterprise Features:
 * ✅ Complete registration response with user details
 * ✅ Verification status tracking (email/phone)
 * ✅ Multi-language support (English/Bengali)
 * ✅ User tier information for loyalty program
 * ✅ Security - Sensitive data masking
 * ✅ Correlation ID for distributed tracing
 * ✅ Audit trail ready
 * ✅ Bangladesh specific - Phone verification support
 * ✅ GDPR compliant - Minimal data exposure
 *
 * @example
 * // In controller
 * @Post('register')
 * async register(@Body() dto: RegisterRequestDto): Promise<RegisterResponseDto> {
 *   const result = await this.commandBus.execute(new RegisterUserCommand(dto));
 *   return new RegisterResponseDto(result);
 * }
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

// Shared types for response
import type { UserTier as DomainUserTier, UserRole as DomainUserRole } from '@vubon/shared-types';
import { USER_TIERS, USER_ROLES } from '@vubon/shared-constants';

// ============================================================
// Types
// ============================================================

/**
 * User tier display names (Bangladesh specific)
 */
export const TIER_DISPLAY_NAMES: Record<string, string> = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  DIAMOND: 'Diamond',
};

export const TIER_DISPLAY_NAMES_BN: Record<string, string> = {
  BRONZE: 'ব্রোঞ্জ',
  SILVER: 'সিলভার',
  GOLD: 'গোল্ড',
  PLATINUM: 'প্লাটিনাম',
  DIAMOND: 'ডায়মন্ড',
};

/**
 * Verification status response
 */
export class VerificationStatusDto {
  @ApiProperty({
    description: 'Email verification required',
    example: true,
  })
  emailRequired: boolean;

  @ApiProperty({
    description: 'Phone verification required',
    example: false,
  })
  phoneRequired: boolean;

  @ApiProperty({
    description: 'Email verification status',
    example: 'pending',
    enum: ['pending', 'verified', 'failed'],
  })
  emailStatus: 'pending' | 'verified' | 'failed';

  @ApiProperty({
    description: 'Phone verification status',
    example: 'pending',
    enum: ['pending', 'verified', 'failed'],
  })
  phoneStatus: 'pending' | 'verified' | 'failed';

  @ApiPropertyOptional({
    description: 'Email verification sent at',
    example: '2024-01-15T10:30:00Z',
  })
  emailSentAt?: string;

  @ApiPropertyOptional({
    description: 'Phone verification sent at',
    example: '2024-01-15T10:30:00Z',
  })
  phoneSentAt?: string;

  constructor(data: Partial<VerificationStatusDto>) {
    Object.assign(this, data);
  }
}

/**
 * User tier benefits response
 */
export class TierBenefitsDto {
  @ApiProperty({
    description: 'Discount percentage',
    example: 0,
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'Free shipping benefit',
    example: false,
  })
  freeShipping: boolean;

  @ApiProperty({
    description: 'Priority support benefit',
    example: false,
  })
  prioritySupport: boolean;

  @ApiPropertyOptional({
    description: 'Exclusive offers access',
    example: false,
  })
  exclusiveOffers?: boolean;

  @ApiPropertyOptional({
    description: 'Early access to sales',
    example: false,
  })
  earlyAccess?: boolean;

  constructor(data: Partial<TierBenefitsDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Main DTO
// ============================================================

export class RegisterResponseDto {
  // ============================================================
  // Core User Information
  // ============================================================

  @ApiProperty({
    description: 'Unique user identifier',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
  })
  email: string;

  @ApiProperty({
    description: 'Masked email for display (GDPR compliant)',
    example: 'u***r@vubon.com.bd',
  })
  @Transform(({ obj }: { obj: RegisterResponseDto }) => obj.getMaskedEmail())
  maskedEmail: string;

  @ApiPropertyOptional({
    description: 'User phone number (E.164 format)',
    example: '+8801712345678',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Masked phone number for display',
    example: '+880*****5678',
  })
  @Transform(({ obj }: { obj: RegisterResponseDto }) => obj.getMaskedPhone())
  maskedPhone?: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'User display name',
    example: 'JohnD',
  })
  displayName?: string;

  // ============================================================
  // User Metadata
  // ============================================================

  @ApiProperty({
    description: 'User role',
    example: 'CUSTOMER',
    enum: Object.values(USER_ROLES),
  })
  role: DomainUserRole;

  @ApiProperty({
    description: 'User tier (loyalty program)',
    example: 'BRONZE',
    enum: Object.values(USER_TIERS),
  })
  userTier: DomainUserTier;

  @ApiProperty({
    description: 'User tier display name',
    example: 'Bronze',
  })
  @Transform(({ obj }: { obj: RegisterResponseDto }) => obj.getTierDisplayName())
  tierDisplayName: string;

  @ApiProperty({
    description: 'User tier display name (Bengali)',
    example: 'ব্রোঞ্জ',
  })
  @Transform(({ obj }: { obj: RegisterResponseDto }) => obj.getTierDisplayNameBn())
  tierDisplayNameBn: string;

  @ApiProperty({
    description: 'Tier benefits',
    type: TierBenefitsDto,
  })
  tierBenefits: TierBenefitsDto;

  // ============================================================
  // Verification Status
  // ============================================================

  @ApiProperty({
    description: 'Verification status',
    type: VerificationStatusDto,
  })
  verification: VerificationStatusDto;

  // ============================================================
  // Response Messages
  // ============================================================

  @ApiProperty({
    description: 'Success message (English)',
    example: 'Registration successful. Please check your email to verify your account.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Success message (Bengali)',
    example: 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল চেক করুন।',
  })
  messageBn?: string;

  // ============================================================
  // Tracking Information
  // ============================================================

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_1234567890',
  })
  correlationId?: string;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: string;

  // ============================================================
  // Constructor
  // ============================================================

  constructor(data: {
    userId: string;
    email: string;
    phone?: string;
    fullName: string;
    displayName?: string;
    role: DomainUserRole;
    userTier: DomainUserTier;
    requiresEmailVerification: boolean;
    requiresPhoneVerification: boolean;
    message: string;
    messageBn?: string;
    correlationId?: string;
    emailSentAt?: Date;
    phoneSentAt?: Date;
    tierBenefits?: {
      discountPercentage: number;
      freeShipping: boolean;
      prioritySupport: boolean;
      exclusiveOffers?: boolean;
      earlyAccess?: boolean;
    };
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.phone = data.phone;
    this.fullName = data.fullName;
    this.displayName = data.displayName;
    this.role = data.role;
    this.userTier = data.userTier;
    this.message = data.message;
    this.messageBn = data.messageBn;
    this.correlationId = data.correlationId;
    this.timestamp = new Date().toISOString();

    // Set masked fields
    this.maskedEmail = this.getMaskedEmail();
    this.maskedPhone = this.getMaskedPhone();

    // Set tier display names
    this.tierDisplayName = this.getTierDisplayName();
    this.tierDisplayNameBn = this.getTierDisplayNameBn();

    // Set tier benefits
    this.tierBenefits = new TierBenefitsDto({
      discountPercentage: data.tierBenefits?.discountPercentage ?? 0,
      freeShipping: data.tierBenefits?.freeShipping ?? false,
      prioritySupport: data.tierBenefits?.prioritySupport ?? false,
      exclusiveOffers: data.tierBenefits?.exclusiveOffers ?? false,
      earlyAccess: data.tierBenefits?.earlyAccess ?? false,
    });

    // Set verification status
    this.verification = new VerificationStatusDto({
      emailRequired: data.requiresEmailVerification,
      phoneRequired: data.requiresPhoneVerification,
      emailStatus: data.requiresEmailVerification ? 'pending' : 'verified',
      phoneStatus: data.requiresPhoneVerification ? 'pending' : 'verified',
      emailSentAt: data.emailSentAt?.toISOString(),
      phoneSentAt: data.phoneSentAt?.toISOString(),
    });
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Get masked email for display
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
   * Get masked phone for display
   */
  getMaskedPhone(): string {
    if (!this.phone) return '';
    if (this.phone.length <= 8) return this.phone;
    const prefix = this.phone.substring(0, 4);
    const suffix = this.phone.substring(this.phone.length - 4);
    return `${prefix}****${suffix}`;
  }

  /**
   * Get tier display name (English)
   */
  getTierDisplayName(): string {
    return TIER_DISPLAY_NAMES[this.userTier] || this.userTier;
  }

  /**
   * Get tier display name (Bengali)
   */
  getTierDisplayNameBn(): string {
    return TIER_DISPLAY_NAMES_BN[this.userTier] || this.userTier;
  }

  /**
   * Check if email verification is required
   */
  isEmailVerificationRequired(): boolean {
    return this.verification.emailRequired && this.verification.emailStatus === 'pending';
  }

  /**
   * Check if phone verification is required
   */
  isPhoneVerificationRequired(): boolean {
    return this.verification.phoneRequired && this.verification.phoneStatus === 'pending';
  }

  /**
   * Check if user is fully verified
   */
  isFullyVerified(): boolean {
    return !this.isEmailVerificationRequired() && !this.isPhoneVerificationRequired();
  }

  /**
   * Get user tier benefits summary
   */
  getTierBenefitsSummary(): string {
    const benefits: string[] = [];
    if (this.tierBenefits.discountPercentage > 0) {
      benefits.push(`${this.tierBenefits.discountPercentage}% discount`);
    }
    if (this.tierBenefits.freeShipping) {
      benefits.push('Free shipping');
    }
    if (this.tierBenefits.prioritySupport) {
      benefits.push('Priority support');
    }
    if (this.tierBenefits.exclusiveOffers) {
      benefits.push('Exclusive offers');
    }
    if (this.tierBenefits.earlyAccess) {
      benefits.push('Early access');
    }
    return benefits.length > 0 ? benefits.join(', ') : 'Standard benefits';
  }

  /**
   * Convert to plain object for API response
   */
  toPlainObject(): Record<string, unknown> {
    return {
      userId: this.userId,
      email: this.email,
      maskedEmail: this.maskedEmail,
      phone: this.phone,
      maskedPhone: this.maskedPhone,
      fullName: this.fullName,
      displayName: this.displayName,
      role: this.role,
      userTier: this.userTier,
      tierDisplayName: this.tierDisplayName,
      tierDisplayNameBn: this.tierDisplayNameBn,
      tierBenefits: {
        discountPercentage: this.tierBenefits.discountPercentage,
        freeShipping: this.tierBenefits.freeShipping,
        prioritySupport: this.tierBenefits.prioritySupport,
        exclusiveOffers: this.tierBenefits.exclusiveOffers,
        earlyAccess: this.tierBenefits.earlyAccess,
      },
      verification: {
        emailRequired: this.verification.emailRequired,
        phoneRequired: this.verification.phoneRequired,
        emailStatus: this.verification.emailStatus,
        phoneStatus: this.verification.phoneStatus,
        emailSentAt: this.verification.emailSentAt,
        phoneSentAt: this.verification.phoneSentAt,
      },
      message: this.message,
      messageBn: this.messageBn,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
    };
  }
}

// ============================================================
// Success Response DTO (Simplified for common responses)
// ============================================================

export class RegistrationSuccessDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'Response message',
    example: 'Registration successful',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response message (Bengali)',
    example: 'নিবন্ধন সফল হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'User data',
    type: RegisterResponseDto,
  })
  data?: RegisterResponseDto;

  constructor(data: Partial<RegistrationSuccessDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Verification Required DTO
// ============================================================

export class VerificationRequiredDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'Verification required message',
    example: 'Email verification required. Please check your email.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Verification required message (Bengali)',
    example: 'ইমেইল যাচাই প্রয়োজন। দয়া করে আপনার ইমেইল চেক করুন।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Verification methods required',
    example: ['email'],
    enum: ['email', 'phone'],
  })
  requiredMethods: ('email' | 'phone')[];

  @ApiPropertyOptional({
    description: 'Verification token (if applicable)',
    example: 'ver_1234567890',
  })
  verificationToken?: string;

  @ApiPropertyOptional({
    description: 'Verification expiry time',
    example: '2024-01-15T11:30:00Z',
  })
  expiresAt?: string;

  constructor(data: Partial<VerificationRequiredDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DomainUserTier as UserTierType };
export type { DomainUserRole as UserRoleType };
