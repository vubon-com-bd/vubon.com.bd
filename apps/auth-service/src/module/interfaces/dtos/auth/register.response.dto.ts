/**
 * Register Response DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/register.response.dto
 *
 * @description
 * Data Transfer Object for user registration responses.
 * Provides consistent response format with multilingual support.
 *
 * Enterprise Features:
 * ✅ Standardized response format
 * ✅ Multilingual support (English/Bengali)
 * ✅ User tier information
 * ✅ Verification status
 * ✅ Correlation ID for distributed tracing
 *
 * @example
 * // In controller
 * return new RegisterResponseDto({
 *   userId: user.id,
 *   email: user.email,
 *   requiresEmailVerification: true,
 * });
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Register Response DTO
// ============================================================

export class RegisterResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'User phone number (if provided)',
    example: '+8801712345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Whether email verification is required',
    example: true,
  })
  requiresEmailVerification: boolean;

  @ApiProperty({
    description: 'Whether phone verification is required',
    example: true,
  })
  requiresPhoneVerification: boolean;

  @ApiProperty({
    description: 'Success message in English',
    example: 'Registration successful. Please check your email and phone to verify your account.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Success message in Bengali',
    example: 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল এবং ফোন চেক করুন।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'User tier',
    enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'],
    example: 'BRONZE',
  })
  userTier: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_1234567890',
  })
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { referralApplied: true, tierDiscount: 0 },
  })
  metadata?: Record<string, unknown>;

  constructor(data: {
    userId: string;
    email: string;
    phoneNumber?: string;
    requiresEmailVerification: boolean;
    requiresPhoneVerification: boolean;
    message: string;
    messageBn?: string;
    userTier: string;
    correlationId?: string;
    metadata?: Record<string, unknown>;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.requiresEmailVerification = data.requiresEmailVerification;
    this.requiresPhoneVerification = data.requiresPhoneVerification;
    this.message = data.message;
    this.messageBn = data.messageBn;
    this.userTier = data.userTier;
    this.correlationId = data.correlationId;
    this.metadata = data.metadata;
  }

  /**
   * Create a success response
   */
  static success(
    userId: string,
    email: string,
    userTier: string,
    options?: {
      phoneNumber?: string;
      requiresEmailVerification?: boolean;
      requiresPhoneVerification?: boolean;
      correlationId?: string;
      metadata?: Record<string, unknown>;
    }
  ): RegisterResponseDto {
    const requiresEmailVerification = options?.requiresEmailVerification ?? true;
    const requiresPhoneVerification = options?.requiresPhoneVerification ?? false;

    let message = 'Registration successful. Please check your email to verify your account.';
    let messageBn = 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল চেক করুন।';

    if (requiresPhoneVerification) {
      message = 'Registration successful. Please check your email and phone to verify your account.';
      messageBn = 'নিবন্ধন সফল হয়েছে। আপনার অ্যাকাউন্ট যাচাই করতে দয়া করে আপনার ইমেইল এবং ফোন চেক করুন।';
    }

    return new RegisterResponseDto({
      userId,
      email,
      phoneNumber: options?.phoneNumber,
      requiresEmailVerification,
      requiresPhoneVerification,
      message,
      messageBn,
      userTier,
      correlationId: options?.correlationId,
      metadata: options?.metadata,
    });
  }

  /**
   * Create an error response
   */
  static error(
    userId: string,
    email: string,
    userTier: string,
    errorMessage: string,
    options?: {
      phoneNumber?: string;
      requiresEmailVerification?: boolean;
      requiresPhoneVerification?: boolean;
      correlationId?: string;
      metadata?: Record<string, unknown>;
    }
  ): RegisterResponseDto {
    return new RegisterResponseDto({
      userId,
      email,
      phoneNumber: options?.phoneNumber,
      requiresEmailVerification: options?.requiresEmailVerification ?? false,
      requiresPhoneVerification: options?.requiresPhoneVerification ?? false,
      message: errorMessage,
      messageBn: undefined,
      userTier,
      correlationId: options?.correlationId,
      metadata: options?.metadata,
    });
  }

  /**
   * Convert to plain object
   */
  toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = {
      userId: this.userId,
      email: this.email,
      requiresEmailVerification: this.requiresEmailVerification,
      requiresPhoneVerification: this.requiresPhoneVerification,
      message: this.message,
      userTier: this.userTier,
    };

    if (this.phoneNumber) {
      result.phoneNumber = this.phoneNumber;
    }

    if (this.messageBn) {
      result.messageBn = this.messageBn;
    }

    if (this.correlationId) {
      result.correlationId = this.correlationId;
    }

    if (this.metadata) {
      result.metadata = this.metadata;
    }

    return result;
  }
}
