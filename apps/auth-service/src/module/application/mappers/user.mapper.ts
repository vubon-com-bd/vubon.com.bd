/**
 * User Mapper - Pure Entity to DTO Conversion
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/mappers/user.mapper
 * 
 * @description
 * Mapper for converting User entity to various DTO formats.
 * NO business logic, NO validation, NO repository calls.
 * 
 * Enterprise Rules:
 * ✅ ONLY entity to DTO conversion
 * ✅ Stateless static methods
 * ✅ Type-safe with DTO interfaces
 * ✅ Handles null/undefined gracefully
 * ✅ No side effects
 * ✅ Bangladesh specific - District, upazila, user tier mapping
 */

import { User, UserRole, UserStatus, UserTier } from '../../domain/entities/user.entity';
import { Email, type EmailDomainCategory } from '../../domain/value-objects/email.vo';
import { Phone, type BDOperator } from '../../domain/value-objects/phone.vo';

// ============================================================
// DTO Interfaces (Extended for Bangladesh)
// ============================================================

/**
 * Full User Response DTO
 */
export interface UserResponseDto {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  displayName?: string;
  role: string;
  userTier: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  isMfaEnabled: boolean;
  profilePicture?: string;
  timezone?: string;
  language?: string;
  preferredDistrict?: string;
  preferredUpazila?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  // Bangladesh specific
  mobileOperator?: BDOperator;
  totalSpent?: number;
  tierDiscount?: number;
  hasFreeShipping?: boolean;
  hasPrioritySupport?: boolean;
}

/**
 * Brief User Response DTO (for lists)
 */
export interface BriefUserResponseDto {
  id: string;
  email: string;
  fullName: string;
  displayName?: string;
  role: string;
  userTier: string;
  createdAt: string;
  lastLoginAt?: string;
}

/**
 * User Profile Response DTO (for profile page)
 */
export interface UserProfileResponseDto {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  displayName?: string;
  profilePicture?: string;
  timezone?: string;
  language?: string;
  preferredDistrict?: string;
  preferredUpazila?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  isMfaEnabled: boolean;
  userTier: string;
  tierDiscount: number;
  hasFreeShipping: boolean;
  hasPrioritySupport: boolean;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

/**
 * User Update DTO (from client)
 */
export interface UpdateUserDto {
  fullName?: string;
  displayName?: string;
  phone?: string;
  profilePicture?: string;
  timezone?: string;
  language?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
  marketingConsent?: boolean;
}

/**
 * User Create DTO (admin)
 */
export interface CreateUserDto {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  displayName?: string;
  phone?: string;
  role?: UserRole;
  userTier?: UserTier;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  sendWelcomeEmail?: boolean;
  requirePasswordChange?: boolean;
}

/**
 * User Registration DTO (public)
 */
export interface RegisterUserDto {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  displayName?: string;
  phone?: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent?: boolean;
  referralCode?: string;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

// ============================================================
// User Mapper
// ============================================================

/**
 * User Mapper - Pure conversion methods
 */
export class UserMapper {
  /**
   * Convert User entity to Full Response DTO
   * @param user - User entity (can be null)
   * @returns UserResponseDto or null
   */
  static toDto(user: User | null | undefined): UserResponseDto | null {
    if (!user) {
      return null;
    }

    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      phone: user.getPhone()?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      role: user.getRole(),
      userTier: user.getTier(),
      status: user.getStatus(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      isMfaEnabled: user.isMfaEnabled(),
      profilePicture: user.getAvatar(),
      timezone: undefined, // Add when available in entity
      language: user.getPreferredLanguage(),
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      createdAt: user.getCreatedAt().toISOString(),
      updatedAt: user.getUpdatedAt().toISOString(),
      lastLoginAt: user.getLastLoginAt()?.toISOString(),
      mobileOperator: user.getPhone()?.getOperator(),
      totalSpent: user.getTotalSpent(),
      tierDiscount: user.getTierDiscount(),
      hasFreeShipping: user.hasFreeShipping(),
      hasPrioritySupport: user.hasPrioritySupport(),
    };
  }

  /**
   * Convert User entity to Brief Response DTO
   * @param user - User entity (can be null)
   * @returns BriefUserResponseDto or null
   */
  static toBriefDto(user: User | null | undefined): BriefUserResponseDto | null {
    if (!user) {
      return null;
    }

    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      role: user.getRole(),
      userTier: user.getTier(),
      createdAt: user.getCreatedAt().toISOString(),
      lastLoginAt: user.getLastLoginAt()?.toISOString(),
    };
  }

  /**
   * Convert User entity to Profile Response DTO
   * @param user - User entity
   * @returns UserProfileResponseDto
   */
  static toProfileDto(user: User): UserProfileResponseDto {
    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      phone: user.getPhone()?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      profilePicture: user.getAvatar(),
      timezone: undefined,
      language: user.getPreferredLanguage(),
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      isMfaEnabled: user.isMfaEnabled(),
      userTier: user.getTier(),
      tierDiscount: user.getTierDiscount(),
      hasFreeShipping: user.hasFreeShipping(),
      hasPrioritySupport: user.hasPrioritySupport(),
      totalSpent: user.getTotalSpent(),
      createdAt: user.getCreatedAt().toISOString(),
      updatedAt: user.getUpdatedAt().toISOString(),
      lastLoginAt: user.getLastLoginAt()?.toISOString(),
    };
  }

  /**
   * Convert User entity list to DTO list
   * @param users - Array of User entities
   * @returns Array of UserResponseDto
   */
  static toDtoList(users: User[]): UserResponseDto[] {
    if (!users || users.length === 0) {
      return [];
    }
    return users.map(user => this.toDto(user)!).filter(Boolean);
  }

  /**
   * Convert User entity list to Brief DTO list
   * @param users - Array of User entities
   * @returns Array of BriefUserResponseDto
   */
  static toBriefDtoList(users: User[]): BriefUserResponseDto[] {
    if (!users || users.length === 0) {
      return [];
    }
    return users.map(user => this.toBriefDto(user)!).filter(Boolean);
  }

  /**
   * Create paginated response from users and total
   */
  static toPaginatedResponse(
    users: User[],
    total: number,
    page: number,
    limit: number
  ): {
    items: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } {
    const items = this.toDtoList(users);
    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  /**
   * Convert Register DTO to User entity creation data
   * @param dto - Register user DTO
   * @returns User creation data
   */
  static fromRegisterDto(dto: RegisterUserDto): {
    email: Email;
    password: string;
    fullName: string;
    displayName?: string;
    phone?: Phone;
    preferredLanguage: 'en' | 'bn';
    preferredDistrict?: string;
    preferredUpazila?: string;
  } {
    return {
      email: new Email(dto.email),
      password: dto.password,
      fullName: dto.fullName,
      displayName: dto.displayName,
      phone: dto.phone ? new Phone(dto.phone) : undefined,
      preferredLanguage: dto.preferredLanguage || 'en',
      preferredDistrict: dto.preferredDistrict,
      preferredUpazila: dto.preferredUpazila,
    };
  }

  /**
   * Convert Create DTO (admin) to User entity creation data
   * @param dto - Create user DTO
   * @returns User creation data
   */
  static fromCreateDto(dto: CreateUserDto): {
    email: Email;
    password: string;
    fullName: string;
    displayName?: string;
    phone?: Phone;
    role: UserRole;
    userTier: UserTier;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    preferredLanguage: 'en' | 'bn';
    preferredDistrict?: string;
    preferredUpazila?: string;
  } {
    return {
      email: new Email(dto.email),
      password: dto.password,
      fullName: dto.fullName,
      displayName: dto.displayName,
      phone: dto.phone ? new Phone(dto.phone) : undefined,
      role: dto.role || UserRole.CUSTOMER,
      userTier: dto.userTier || UserTier.BRONZE,
      isEmailVerified: dto.isEmailVerified || false,
      isPhoneVerified: dto.isPhoneVerified || false,
      preferredLanguage: dto.preferredLanguage || 'en',
      preferredDistrict: dto.preferredDistrict,
      preferredUpazila: dto.preferredUpazila,
    };
  }
}

// ============================================================
// Email Mapper
// ============================================================

export class EmailMapper {
  static toPrimitive(email: Email | null | undefined): string | null {
    if (!email) return null;
    return email.getValue();
  }

  static toValueObject(email: string): Email {
    return new Email(email);
  }

  static getDomainCategory(email: Email): EmailDomainCategory {
    return email.getDomainCategory();
  }

  static isBangladeshEmail(email: Email): boolean {
    return email.isBangladeshEmail();
  }

  static mask(email: Email): string {
    return email.mask();
  }
}

// ============================================================
// Phone Mapper
// ============================================================

export class PhoneMapper {
  static toPrimitive(phone: Phone | null | undefined): string | null {
    if (!phone) return null;
    return phone.getValue();
  }

  static toE164(phone: Phone | null | undefined): string | null {
    if (!phone) return null;
    return phone.getE164();
  }

  static toValueObject(phone: string | null | undefined): Phone | null {
    if (!phone) return null;
    try {
      return new Phone(phone);
    } catch {
      return null;
    }
  }

  static toLocalFormat(phone: Phone): string {
    return phone.getLocalFormat();
  }

  static toInternationalFormat(phone: Phone): string {
    return phone.getInternationalFormat();
  }

  static mask(phone: Phone): string {
    return phone.mask();
  }

  static getOperator(phone: Phone): string {
    return phone.getOperatorName();
  }

  static isMobile(phone: Phone): boolean {
    return phone.isMobile();
  }

  static isBangladesh(phone: Phone): boolean {
    return phone.isBangladesh();
  }

  static getOperatorType(phone: Phone): BDOperator {
    return phone.getOperator();
  }
}

// ============================================================
// User Tier Mapper
// ============================================================

export class UserTierMapper {
  static toString(tier: UserTier): string {
    switch (tier) {
      case UserTier.BRONZE: return 'BRONZE';
      case UserTier.SILVER: return 'SILVER';
      case UserTier.GOLD: return 'GOLD';
      case UserTier.PLATINUM: return 'PLATINUM';
      case UserTier.DIAMOND: return 'DIAMOND';
      default: return 'BRONZE';
    }
  }

  static toDisplayName(tier: UserTier, locale?: 'en' | 'bn'): string {
    if (locale === 'bn') {
      switch (tier) {
        case UserTier.BRONZE: return 'ব্রোঞ্জ';
        case UserTier.SILVER: return 'সিলভার';
        case UserTier.GOLD: return 'গোল্ড';
        case UserTier.PLATINUM: return 'প্লাটিনাম';
        case UserTier.DIAMOND: return 'ডায়মন্ড';
        default: return 'ব্রোঞ্জ';
      }
    }
    switch (tier) {
      case UserTier.BRONZE: return 'Bronze';
      case UserTier.SILVER: return 'Silver';
      case UserTier.GOLD: return 'Gold';
      case UserTier.PLATINUM: return 'Platinum';
      case UserTier.DIAMOND: return 'Diamond';
      default: return 'Bronze';
    }
  }

  static getDiscountPercentage(tier: UserTier): number {
    switch (tier) {
      case UserTier.BRONZE: return 0;
      case UserTier.SILVER: return 5;
      case UserTier.GOLD: return 10;
      case UserTier.PLATINUM: return 15;
      case UserTier.DIAMOND: return 20;
      default: return 0;
    }
  }

  static getNextTier(currentTier: UserTier): UserTier | null {
    switch (currentTier) {
      case UserTier.BRONZE: return UserTier.SILVER;
      case UserTier.SILVER: return UserTier.GOLD;
      case UserTier.GOLD: return UserTier.PLATINUM;
      case UserTier.PLATINUM: return UserTier.DIAMOND;
      default: return null;
    }
  }

  static getUpgradeThreshold(tier: UserTier): number {
    const thresholds: Record<UserTier, number> = {
      [UserTier.BRONZE]: 0,
      [UserTier.SILVER]: 5000,
      [UserTier.GOLD]: 25000,
      [UserTier.PLATINUM]: 100000,
      [UserTier.DIAMOND]: 500000,
    };
    return thresholds[tier] || 0;
  }
}

// ============================================================
// User Status Mapper
// ============================================================

export class UserStatusMapper {
  static toString(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE: return 'ACTIVE';
      case UserStatus.INACTIVE: return 'INACTIVE';
      case UserStatus.LOCKED: return 'LOCKED';
      case UserStatus.SUSPENDED: return 'SUSPENDED';
      case UserStatus.DELETED: return 'DELETED';
      case UserStatus.PENDING_VERIFICATION: return 'PENDING_VERIFICATION';
      default: return 'ACTIVE';
    }
  }

  static toDisplayName(status: UserStatus, locale?: 'en' | 'bn'): string {
    if (locale === 'bn') {
      switch (status) {
        case UserStatus.ACTIVE: return 'সক্রিয়';
        case UserStatus.INACTIVE: return 'নিষ্ক্রিয়';
        case UserStatus.LOCKED: return 'লক করা';
        case UserStatus.SUSPENDED: return 'স্থগিত';
        case UserStatus.DELETED: return 'মুছে ফেলা';
        case UserStatus.PENDING_VERIFICATION: return 'ভেরিফিকেশন pending';
        default: return 'সক্রিয়';
      }
    }
    switch (status) {
      case UserStatus.ACTIVE: return 'Active';
      case UserStatus.INACTIVE: return 'Inactive';
      case UserStatus.LOCKED: return 'Locked';
      case UserStatus.SUSPENDED: return 'Suspended';
      case UserStatus.DELETED: return 'Deleted';
      case UserStatus.PENDING_VERIFICATION: return 'Pending Verification';
      default: return 'Active';
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  UserResponseDto as UserResponseDtoType,
  BriefUserResponseDto as BriefUserResponseDtoType,
  UserProfileResponseDto as UserProfileResponseDtoType,
  UpdateUserDto as UpdateUserDtoType,
  CreateUserDto as CreateUserDtoType,
  RegisterUserDto as RegisterUserDtoType
};
