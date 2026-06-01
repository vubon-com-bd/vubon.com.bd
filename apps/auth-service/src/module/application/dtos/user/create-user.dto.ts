/**
 * Create User DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/user/create-user.dto
 * 
 * @description
 * Data transfer objects for user creation (registration and admin creation).
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ Public registration: role is FIXED to CUSTOMER (not accepted from client)
 * ✅ Admin creation: separate DTO with role validation
 * ✅ Regular users cannot assign roles to themselves
 * ✅ Phone validation for Bangladesh numbers
 * ✅ User tier support for loyalty program
 * 
 * Flow:
 * 1. Public registration: POST /auth/register (CUSTOMER role only)
 * 2. Admin creation: POST /admin/users (role can be specified)
 */

import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean,
  IsEnum,
  IsUUID,
  MinLength, 
  MaxLength,
  Matches,
  IsIn,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Enums
// ============================================================

/**
 * User roles for creation (admin only)
 */
export enum AdminCreateUserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  VENDOR = 'VENDOR',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  DELIVERY_AGENT = 'DELIVERY_AGENT',
}

/**
 * User tier for loyalty program
 */
export enum UserTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
}

/**
 * User preferences
 */
export interface UserPreferencesDto {
  language?: 'en' | 'bn';
  timezone?: string;
  currency?: 'BDT' | 'USD';
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
}

// ============================================================
// Public Registration DTO (No role selection!)
// ============================================================

/**
 * Public User Registration DTO
 * 
 * Note: role is NOT included - always set to CUSTOMER internally
 * 
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd123",
 *   "confirmPassword": "MyStr0ng!P@ssw0rd123",
 *   "fullName": "John Doe",
 *   "displayName": "John",
 *   "phone": "+8801712345678",
 *   "preferredLanguage": "en",
 *   "preferredDistrict": "Dhaka",
 *   "acceptTerms": true,
 *   "marketingConsent": false,
 *   "referralCode": "REF123"
 * }
 */
export class CreateUserDto {
  @ApiProperty({
    description: 'User email address (must be unique)',
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
    example: 'MyStr0ng!P@ssw0rd123',
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'MyStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s.'-]+$/, {
    message: 'Full name can only contain letters, spaces, dots, hyphens, and apostrophes',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Display name (if not provided, derived from full name)',
    example: 'John',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format, Bangladesh numbers start with +880)',
    example: '+8801712345678',
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+8801[3-9]\d{8}$/, {
    message: 'Phone number must be in E.164 format (e.g., +8801712345678)',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'en',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Preferred language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString({ message: 'Preferred district must be a string' })
  @MaxLength(50, { message: 'Preferred district cannot exceed 50 characters' })
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila (Bangladesh)',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString({ message: 'Preferred upazila must be a string' })
  @MaxLength(50, { message: 'Preferred upazila cannot exceed 50 characters' })
  preferredUpazila?: string;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @IsNotEmpty({ message: 'You must accept the terms and conditions' })
  acceptTerms: boolean;

  @ApiPropertyOptional({
    description: 'Accept privacy policy',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Accept privacy policy must be a boolean' })
  acceptPrivacy?: boolean = true;

  @ApiPropertyOptional({
    description: 'Consent to marketing communications',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Referral code must be a string' })
  @MaxLength(50, { message: 'Referral code cannot exceed 50 characters' })
  referralCode?: string;

  @ApiPropertyOptional({
    description: 'User preferences',
    example: {
      language: 'bn',
      preferredDeliveryTime: 'evening',
      emailNotifications: true
    },
  })
  @IsOptional()
  @IsObject({ message: 'Preferences must be an object' })
  preferences?: UserPreferencesDto;

  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    acceptTerms: boolean,
    phone?: string,
    displayName?: string,
    preferredLanguage?: 'en' | 'bn',
    preferredDistrict?: string,
    preferredUpazila?: string,
    acceptPrivacy?: boolean,
    marketingConsent?: boolean,
    referralCode?: string,
    preferences?: UserPreferencesDto
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.acceptTerms = acceptTerms;
    this.phone = phone;
    this.displayName = displayName;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.preferredDistrict = preferredDistrict;
    this.preferredUpazila = preferredUpazila;
    this.acceptPrivacy = acceptPrivacy ?? true;
    this.marketingConsent = marketingConsent ?? false;
    this.referralCode = referralCode;
    this.preferences = preferences;
  }
}

// ============================================================
// Admin Create User DTO (With role selection)
// ============================================================

/**
 * Admin Create User DTO
 * Only accessible to users with ADMIN or SUPER_ADMIN role
 * 
 * @example
 * {
 *   "email": "seller@vubon.com.bd",
 *   "password": "SellerP@ssw0rd123",
 *   "confirmPassword": "SellerP@ssw0rd123",
 *   "fullName": "Seller User",
 *   "displayName": "Seller",
 *   "phone": "+8801712345678",
 *   "role": "SELLER",
 *   "userTier": "BRONZE",
 *   "preferredLanguage": "bn",
 *   "preferredDistrict": "Chittagong",
 *   "sendWelcomeEmail": true,
 *   "requirePasswordChange": true,
 *   "isEmailVerified": true,
 *   "isPhoneVerified": true,
 *   "businessName": "Seller Shop",
 *   "tradeLicenseNumber": "TL123456"
 * }
 */
export class AdminCreateUserDto {
  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'seller@vubon.com.bd',
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SellerP@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password cannot exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'SellerP@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Seller User',
    required: true,
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Display name',
    example: 'Seller',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format)',
    example: '+8801712345678',
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+8801[3-9]\d{8}$/, {
    message: 'Phone number must be in E.164 format (e.g., +8801712345678)',
  })
  phone?: string;

  @ApiProperty({
    description: 'User role',
    enum: AdminCreateUserRole,
    example: AdminCreateUserRole.CUSTOMER,
    default: AdminCreateUserRole.CUSTOMER,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminCreateUserRole, { message: 'Invalid role' })
  role?: AdminCreateUserRole = AdminCreateUserRole.CUSTOMER;

  @ApiPropertyOptional({
    description: 'User tier (loyalty program)',
    enum: UserTier,
    example: UserTier.BRONZE,
    default: UserTier.BRONZE,
  })
  @IsOptional()
  @IsEnum(UserTier, { message: 'Invalid user tier' })
  userTier?: UserTier = UserTier.BRONZE;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'en',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'], { message: 'Preferred language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString({ message: 'Preferred district must be a string' })
  @MaxLength(50, { message: 'Preferred district cannot exceed 50 characters' })
  preferredDistrict?: string;

  @ApiPropertyOptional({
    description: 'Preferred upazila (Bangladesh)',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString({ message: 'Preferred upazila must be a string' })
  @MaxLength(50, { message: 'Preferred upazila cannot exceed 50 characters' })
  preferredUpazila?: string;

  @ApiPropertyOptional({
    description: 'Send welcome email',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Send welcome email must be a boolean' })
  sendWelcomeEmail?: boolean = true;

  @ApiPropertyOptional({
    description: 'Require password change on first login',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Require password change must be a boolean' })
  requirePasswordChange?: boolean = false;

  @ApiPropertyOptional({
    description: 'Mark email as verified (bypass verification)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Is email verified must be a boolean' })
  isEmailVerified?: boolean = false;

  @ApiPropertyOptional({
    description: 'Mark phone as verified (bypass verification)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Is phone verified must be a boolean' })
  isPhoneVerified?: boolean = false;

  @ApiPropertyOptional({
    description: 'Business name (for seller/vendor accounts)',
    example: 'Seller Shop',
    maxLength: 200,
  })
  @IsOptional()
  @IsString({ message: 'Business name must be a string' })
  @MaxLength(200, { message: 'Business name cannot exceed 200 characters' })
  businessName?: string;

  @ApiPropertyOptional({
    description: 'Trade license number (for seller/vendor accounts)',
    example: 'TL123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Trade license number must be a string' })
  @MaxLength(50, { message: 'Trade license number cannot exceed 50 characters' })
  tradeLicenseNumber?: string;

  @ApiPropertyOptional({
    description: 'Admin ID who created this user (auto-filled from JWT)',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: 'Created by must be a valid UUID' })
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'User preferences',
    example: { language: 'bn', preferredDeliveryTime: 'evening' },
  })
  @IsOptional()
  @IsObject({ message: 'Preferences must be an object' })
  preferences?: UserPreferencesDto;

  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    phone?: string,
    role?: AdminCreateUserRole,
    userTier?: UserTier,
    preferredLanguage?: 'en' | 'bn',
    preferredDistrict?: string,
    preferredUpazila?: string,
    displayName?: string,
    sendWelcomeEmail?: boolean,
    requirePasswordChange?: boolean,
    isEmailVerified?: boolean,
    isPhoneVerified?: boolean,
    businessName?: string,
    tradeLicenseNumber?: string,
    createdBy?: string,
    preferences?: UserPreferencesDto
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.phone = phone;
    this.role = role ?? AdminCreateUserRole.CUSTOMER;
    this.userTier = userTier ?? UserTier.BRONZE;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.preferredDistrict = preferredDistrict;
    this.preferredUpazila = preferredUpazila;
    this.displayName = displayName;
    this.sendWelcomeEmail = sendWelcomeEmail ?? true;
    this.requirePasswordChange = requirePasswordChange ?? false;
    this.isEmailVerified = isEmailVerified ?? false;
    this.isPhoneVerified = isPhoneVerified ?? false;
    this.businessName = businessName;
    this.tradeLicenseNumber = tradeLicenseNumber;
    this.createdBy = createdBy;
    this.preferences = preferences;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Create User Response DTO
 */
export class CreateUserResponseDto {
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

  @ApiPropertyOptional({
    description: 'Phone number (if provided)',
    example: '+8801712345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Response message',
    example: 'User created successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Whether email verification is required',
    example: true,
  })
  requiresEmailVerification: boolean;

  @ApiProperty({
    description: 'Whether phone verification is required',
    example: false,
  })
  requiresPhoneVerification: boolean;

  @ApiPropertyOptional({
    description: 'User role',
    enum: AdminCreateUserRole,
    example: AdminCreateUserRole.CUSTOMER,
  })
  role?: string;

  @ApiPropertyOptional({
    description: 'User tier',
    enum: UserTier,
    example: UserTier.BRONZE,
  })
  userTier?: string;

  @ApiPropertyOptional({
    description: 'Timestamp when user was created',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt?: string;

  @ApiPropertyOptional({
    description: 'Session ID (if auto-login after registration)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Access token (if auto-login is enabled)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken?: string;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    requiresEmailVerification: boolean = true,
    requiresPhoneVerification: boolean = false,
    role?: string,
    userTier?: string,
    createdAt?: Date,
    phoneNumber?: string,
    sessionId?: string,
    accessToken?: string
  ) {
    this.userId = userId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.message = 'User created successfully';
    this.requiresEmailVerification = requiresEmailVerification;
    this.requiresPhoneVerification = requiresPhoneVerification;
    this.role = role;
    this.userTier = userTier;
    if (createdAt) {
      this.createdAt = createdAt.toISOString();
    }
    this.sessionId = sessionId;
    this.accessToken = accessToken;
  }

  /**
   * Create response from user entity
   */
  static fromUser(
    userId: string,
    email: string,
    fullName: string,
    requiresEmailVerification: boolean,
    requiresPhoneVerification: boolean = false,
    role?: string,
    userTier?: string,
    createdAt?: Date,
    phoneNumber?: string,
    sessionId?: string,
    accessToken?: string
  ): CreateUserResponseDto {
    return new CreateUserResponseDto(
      userId,
      email,
      fullName,
      requiresEmailVerification,
      requiresPhoneVerification,
      role,
      userTier,
      createdAt,
      phoneNumber,
      sessionId,
      accessToken
    );
  }
}

/**
 * Admin Create User Response DTO
 */
export class AdminCreateUserResponseDto extends CreateUserResponseDto {
  @ApiPropertyOptional({
    description: 'Admin ID who created this user',
    example: 'admin_550e8400-e29b-41d4-a716-446655440000',
  })
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'Require password change on next login',
    example: true,
  })
  requirePasswordChange?: boolean;

  @ApiPropertyOptional({
    description: 'Whether email was pre-verified',
    example: true,
  })
  emailPreVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether phone was pre-verified',
    example: true,
  })
  phonePreVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Business name (for seller/vendor)',
    example: 'Seller Shop',
  })
  businessName?: string;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    requiresEmailVerification: boolean,
    requiresPhoneVerification: boolean = false,
    role?: string,
    userTier?: string,
    createdBy?: string,
    requirePasswordChange?: boolean,
    emailPreVerified?: boolean,
    phonePreVerified?: boolean,
    businessName?: string,
    createdAt?: Date,
    phoneNumber?: string
  ) {
    super(
      userId,
      email,
      fullName,
      requiresEmailVerification,
      requiresPhoneVerification,
      role,
      userTier,
      createdAt,
      phoneNumber
    );
    this.createdBy = createdBy;
    this.requirePasswordChange = requirePasswordChange;
    this.emailPreVerified = emailPreVerified;
    this.phonePreVerified = phonePreVerified;
    this.businessName = businessName;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { UserPreferencesDto as UserPreferencesDtoType };
