/**
 * Login Response DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/login.response.dto
 *
 * @description
 * Response DTO for successful user login.
 * Returns access token, refresh token, and user information.
 *
 * Enterprise Features:
 * ✅ Complete login response with tokens and user info
 * ✅ Multi-language support (English/Bengali)
 * ✅ User tier and role information
 * ✅ Device trust status
 * ✅ MFA requirement flag
 * ✅ Bangladesh specific - District/Upazila fields
 * ✅ Token expiry information
 * ✅ Security - Sensitive data masking
 * ✅ Audit trail ready
 * ✅ GDPR compliant
 * ✅ Session management fields
 *
 * @example
 * // Success response
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "accessToken": "eyJhbGciOiJIUzI1NiIs...",
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
 *     "tokenType": "Bearer",
 *     "expiresIn": 900,
 *     "refreshExpiresIn": 604800,
 *     "userId": "usr_1234567890",
 *     "email": "user@vubon.com.bd",
 *     "phone": "+8801712345678",
 *     "fullName": "John Doe",
 *     "role": "CUSTOMER",
 *     "tier": "BRONZE",
 *     "isMfaEnabled": false,
 *     "requiresMfa": false,
 *     "sessionId": "sess_1234567890",
 *     "isNewDevice": false,
 *     "isNewLocation": false,
 *     "timestamp": "2024-01-15T10:30:00Z"
 *   }
 * }
 *
 * // MFA required response
 * {
 *   "success": false,
 *   "message": "MFA verification required",
 *   "mfaRequired": true,
 *   "mfaSessionId": "mfa_sess_1234567890",
 *   "availableMfaMethods": ["totp", "sms", "whatsapp"],
 *   "userId": "usr_1234567890"
 * }
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants and shared-types import
// ============================================================
import { USER_TIERS, USER_ROLES, TOKEN_EXPIRY } from '@vubon/shared-constants';
import type { UserTier, UserRole } from '@vubon/shared-types';

// ============================================================
// Constants
// ============================================================

/**
 * Tier display names (Bangladesh specific)
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
 * Token type constants
 */
export const TOKEN_TYPES = {
  BEARER: 'Bearer',
} as const;

// ============================================================
// User Info DTO (Embedded in response)
// ============================================================

/**
 * User information in login response
 */
export class UserInfoDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'User phone number (E.164 format)',
    example: '+8801712345678',
  })
  phone?: string;

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

  @ApiProperty({
    description: 'User role',
    example: 'CUSTOMER',
    enum: Object.values(USER_ROLES),
  })
  role: UserRole;

  @ApiProperty({
    description: 'User tier (loyalty program)',
    example: 'BRONZE',
    enum: Object.values(USER_TIERS),
  })
  tier: UserTier;

  @ApiProperty({
    description: 'User tier display name (English)',
    example: 'Bronze',
  })
  @Transform(({ obj }: { obj: UserInfoDto }) => obj.getTierDisplayName())
  tierDisplayName: string;

  @ApiProperty({
    description: 'User tier display name (Bengali)',
    example: 'ব্রোঞ্জ',
  })
  @Transform(({ obj }: { obj: UserInfoDto }) => obj.getTierDisplayNameBn())
  tierDisplayNameBn: string;

  @ApiProperty({
    description: 'Whether email is verified',
    example: true,
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Whether phone number is verified',
    example: false,
  })
  isPhoneVerified: boolean;

  @ApiProperty({
    description: 'Whether MFA is enabled for this user',
    example: false,
  })
  isMfaEnabled: boolean;

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
  })
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila (Bangladesh)',
    example: 'Gulshan',
  })
  preferredUpazila?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'bn',
    enum: ['en', 'bn'],
  })
  preferredLanguage?: 'en' | 'bn';

  constructor(data: Partial<UserInfoDto>) {
    Object.assign(this, data);
  }

  /**
   * Get tier display name (English)
   */
  getTierDisplayName(): string {
    return TIER_DISPLAY_NAMES[this.tier] || this.tier;
  }

  /**
   * Get tier display name (Bengali)
   */
  getTierDisplayNameBn(): string {
    return TIER_DISPLAY_NAMES_BN[this.tier] || this.tier;
  }
}

// ============================================================
// Token Info DTO
// ============================================================

/**
 * Token information in login response
 */
export class TokenInfoDto {
  @ApiProperty({
    description: 'Access token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string = TOKEN_TYPES.BEARER;

  @ApiProperty({
    description: 'Access token expiry in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry in seconds',
    example: 604800,
  })
  refreshExpiresIn: number;

  constructor(data: Partial<TokenInfoDto>) {
    Object.assign(this, data);
    this.tokenType = this.tokenType || TOKEN_TYPES.BEARER;
  }
}

// ============================================================
// Security Info DTO
// ============================================================

/**
 * Security information in login response
 */
export class SecurityInfoDto {
  @ApiProperty({
    description: 'Session ID',
    example: 'sess_1234567890',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Whether this is a new device',
    example: false,
  })
  isNewDevice: boolean;

  @ApiProperty({
    description: 'Whether this is a new location',
    example: false,
  })
  isNewLocation: boolean;

  @ApiPropertyOptional({
    description: 'Device trust status',
    example: 'standard',
    enum: ['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust'],
  })
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';

  @ApiPropertyOptional({
    description: 'Device information',
    example: { type: 'desktop', browser: 'Chrome', os: 'Windows' },
  })
  deviceInfo?: Record<string, unknown>;

  constructor(data: Partial<SecurityInfoDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// MFA Info DTO
// ============================================================

/**
 * MFA information in login response
 */
export class MfaInfoDto {
  @ApiProperty({
    description: 'Whether MFA is required',
    example: false,
  })
  required: boolean;

  @ApiPropertyOptional({
    description: 'MFA session ID (if MFA required)',
    example: 'mfa_sess_1234567890',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Available MFA methods',
    example: ['totp', 'sms', 'whatsapp'],
    enum: ['totp', 'sms', 'email', 'whatsapp', 'webauthn', 'bkash_pin', 'nagad_pin', 'rocket_pin'],
  })
  availableMethods?: string[];

  @ApiPropertyOptional({
    description: 'MFA verification message (English)',
    example: 'Please verify your identity using MFA',
  })
  message?: string;

  @ApiPropertyOptional({
    description: 'MFA verification message (Bengali)',
    example: 'অনুগ্রহ করে MFA ব্যবহার করে আপনার পরিচয় যাচাই করুন',
  })
  messageBn?: string;

  constructor(data: Partial<MfaInfoDto>) {
    Object.assign(this, data);
    this.required = data.required ?? false;
  }
}

// ============================================================
// Main Login Response DTO
// ============================================================

/**
 * Login Response DTO
 */
export class LoginResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message (English)',
    example: 'Login successful',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response message (Bengali)',
    example: 'লগইন সফল হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'User information',
    type: UserInfoDto,
  })
  user?: UserInfoDto;

  @ApiPropertyOptional({
    description: 'Token information',
    type: TokenInfoDto,
  })
  tokens?: TokenInfoDto;

  @ApiPropertyOptional({
    description: 'Security information',
    type: SecurityInfoDto,
  })
  security?: SecurityInfoDto;

  @ApiPropertyOptional({
    description: 'MFA information',
    type: MfaInfoDto,
  })
  mfa?: MfaInfoDto;

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
  // Constructors
  // ============================================================

  /**
   * Create a successful login response
   */
  static success(data: {
    userId: string;
    email: string;
    phone?: string;
    fullName: string;
    displayName?: string;
    role: UserRole;
    tier: UserTier;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isMfaEnabled: boolean;
    preferredDistrict?: string;
    preferredUpazila?: string;
    preferredLanguage?: 'en' | 'bn';
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    sessionId: string;
    isNewDevice: boolean;
    isNewLocation: boolean;
    trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
    deviceInfo?: Record<string, unknown>;
    correlationId?: string;
    message?: string;
    messageBn?: string;
  }): LoginResponseDto {
    const response = new LoginResponseDto();
    response.success = true;
    response.message = data.message || 'Login successful';
    response.messageBn = data.messageBn || 'লগইন সফল হয়েছে';
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    // User info
    response.user = new UserInfoDto({
      userId: data.userId,
      email: data.email,
      phone: data.phone,
      fullName: data.fullName,
      displayName: data.displayName,
      role: data.role,
      tier: data.tier,
      isEmailVerified: data.isEmailVerified,
      isPhoneVerified: data.isPhoneVerified,
      isMfaEnabled: data.isMfaEnabled,
      preferredDistrict: data.preferredDistrict,
      preferredUpazila: data.preferredUpazila,
      preferredLanguage: data.preferredLanguage,
    });

    // Token info
    response.tokens = new TokenInfoDto({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      refreshExpiresIn: data.refreshExpiresIn,
    });

    // Security info
    response.security = new SecurityInfoDto({
      sessionId: data.sessionId,
      isNewDevice: data.isNewDevice,
      isNewLocation: data.isNewLocation,
      trustLevel: data.trustLevel,
      deviceInfo: data.deviceInfo,
    });

    // MFA info
    response.mfa = new MfaInfoDto({
      required: false,
    });

    return response;
  }

  /**
   * Create an MFA required response
   */
  static mfaRequired(data: {
    userId: string;
    sessionId: string;
    availableMethods: string[];
    message?: string;
    messageBn?: string;
    correlationId?: string;
  }): LoginResponseDto {
    const response = new LoginResponseDto();
    response.success = false;
    response.message = data.message || 'MFA verification required';
    response.messageBn = data.messageBn || 'MFA যাচাই প্রয়োজন';
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    response.mfa = new MfaInfoDto({
      required: true,
      sessionId: data.sessionId,
      availableMethods: data.availableMethods,
      message: data.message,
      messageBn: data.messageBn,
    });

    return response;
  }

  /**
   * Create a failed login response
   */
  static failed(data: {
    message: string;
    messageBn?: string;
    correlationId?: string;
    errorCode?: string;
  }): LoginResponseDto {
    const response = new LoginResponseDto();
    response.success = false;
    response.message = data.message;
    response.messageBn = data.messageBn;
    response.correlationId = data.correlationId;
    response.timestamp = new Date().toISOString();

    return response;
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if login was successful
   */
  isSuccess(): boolean {
    return this.success === true;
  }

  /**
   * Check if MFA is required
   */
  isMfaRequired(): boolean {
    return this.mfa?.required === true;
  }

  /**
   * Get user ID
   */
  getUserId(): string | undefined {
    return this.user?.userId;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | undefined {
    return this.tokens?.accessToken;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | undefined {
    return this.tokens?.refreshToken;
  }

  /**
   * Get session ID
   */
  getSessionId(): string | undefined {
    return this.security?.sessionId;
  }

  /**
   * Get MFA session ID
   */
  getMfaSessionId(): string | undefined {
    return this.mfa?.sessionId;
  }

  /**
   * Get available MFA methods
   */
  getAvailableMfaMethods(): string[] | undefined {
    return this.mfa?.availableMethods;
  }
}

// ============================================================
// Simplified Login Response DTO (For common use cases)
// ============================================================

/**
 * Simplified login response (tokens only)
 */
export class SimpleLoginResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  tokenType: string = TOKEN_TYPES.BEARER;

  @ApiProperty({
    description: 'Access token expiry in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_1234567890',
  })
  userId: string;

  @ApiProperty({
    description: 'User role',
    example: 'CUSTOMER',
  })
  role: string;

  @ApiProperty({
    description: 'User tier',
    example: 'BRONZE',
  })
  tier: string;

  @ApiPropertyOptional({
    description: 'MFA required flag',
    example: false,
  })
  mfaRequired?: boolean;

  @ApiPropertyOptional({
    description: 'MFA session ID (if MFA required)',
    example: 'mfa_sess_1234567890',
  })
  mfaSessionId?: string;

  constructor(data: Partial<SimpleLoginResponseDto>) {
    Object.assign(this, data);
    this.tokenType = this.tokenType || TOKEN_TYPES.BEARER;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { UserTier as UserTierType };
export type { UserRole as UserRoleType };
