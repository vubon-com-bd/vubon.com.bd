/**
 * Register DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *

/**
 * User Mapper - Application Layer (Enterprise Grade)
 * 
 * @module application/mappers/user.mapper
 */

import { Injectable } from '@nestjs/common';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import {
  type UserRole,
  type UserStatus,
  type UserTier,
  type BangladeshDistrict,
  type BangladeshUpazila,
  type UserMobileOperator,
  type UserNetworkType,
} from '@vubon/shared-constants';

import { maskEmail, maskPhone } from '@vubon/shared-utils';

// ============================================================
// Domain Imports
// ============================================================

import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { Phone } from '../../domain/value-objects/phone.vo';
import type { IEmailValidator } from '../../domain/ports/email-validator.port';
import type { IPasswordValidator } from '../../domain/ports/password-validator.port';
import type { IPhoneValidator } from '../../domain/ports/phone-validator.port';
import type { IdGenerator } from '../../domain/entities/base.entity';

// ============================================================
// Application DTOs
// ============================================================

import { RegisterUserCommand } from '../commands/auth/register-user.command';

// ============================================================
// DTO Types
// ============================================================

export interface UserDto {
  id: string;
  email: string;
  phone?: string | undefined;
  fullName: string;
  displayName?: string | undefined;
  avatar?: string | undefined;
  status: UserStatus;
  role: UserRole;
  tier: UserTier;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  mfaEnabled: boolean;
  totalSpent: number;
  lastLoginAt?: Date | undefined;
  emailVerifiedAt?: Date | undefined;
  phoneVerifiedAt?: Date | undefined;
  kycVerifiedAt?: Date | undefined;
  mfaEnabledAt?: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  isDeleted: boolean;
  deletedAt?: Date | null | undefined;
  suspendedAt?: Date | undefined;
  suspendedReason?: string | undefined;
  preferredLanguage: 'en' | 'bn';
  preferredDistrict?: BangladeshDistrict | undefined;
  preferredUpazila?: BangladeshUpazila | undefined;
  preferredOperator?: UserMobileOperator | undefined;
  mobileNetworkType?: UserNetworkType | undefined;
}

export interface UserPublicDto {
  id: string;
  email: string;
  phone?: string | undefined;
  fullName: string;
  displayName?: string | undefined;
  avatar?: string | undefined;
  status: UserStatus;
  role: UserRole;
  tier: UserTier;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferredLanguage: 'en' | 'bn';
  preferredDistrict?: BangladeshDistrict | undefined;
  preferredUpazila?: BangladeshUpazila | undefined;
  createdAt: Date;
}

export interface UserAdminDto extends UserDto {
  maskedEmail: string;
  maskedPhone?: string | undefined;
  auditSummary: {
    createdAt: Date;
    lastModifiedAt: Date;
    createdBy?: string;
    lastModifiedBy?: string;
    changeCount: number;
  };
}

export interface UpdateProfileDto {
  fullName?: string | undefined;
  displayName?: string | undefined;
  avatar?: string | undefined;
  preferredLanguage?: 'en' | 'bn' | undefined;
  preferredDistrict?: BangladeshDistrict | undefined;
  preferredUpazila?: BangladeshUpazila | undefined;
  preferredOperator?: UserMobileOperator | undefined;
  mobileNetworkType?: UserNetworkType | undefined;
}

export interface UpdateRoleDto {
  role: UserRole;
}

export interface UpdateTierDto {
  tier: UserTier;
}

export interface UpdateStatusDto {
  status: UserStatus;
  reason?: string | undefined;
}

// ============================================================
// Mapper Implementation
// ============================================================

@Injectable()
export class UserMapper {
  /**
   * Convert Domain User Entity to Application User DTO
   */
  public static toDto(user: User): UserDto {
    const phone = user.getPhone();

    return {
      id: user.id,
      email: user.getEmail().getValue(),
      phone: phone?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      avatar: user.getAvatar(),
      status: user.getStatus(),
      role: user.getRole(),
      tier: user.getTier(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      mfaEnabled: user.isMfaEnabled(),
      totalSpent: user.getTotalSpent(),
      lastLoginAt: user.getLastLoginAt(),
      emailVerifiedAt: user.getEmailVerifiedAt(),
      phoneVerifiedAt: user.getPhoneVerifiedAt(),
      kycVerifiedAt: user.getKycVerifiedAt(),
      mfaEnabledAt: user.getMfaEnabledAt(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      suspendedAt: user.getSuspendedAt(),
      suspendedReason: user.getSuspendedReason(),
      preferredLanguage: user.getPreferredLanguage() || 'en',
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      preferredOperator: user.getPreferredOperator(),
      mobileNetworkType: user.getMobileNetworkType(),
    };
  }

  /**
   * Convert Domain User Entity to Public User DTO
   */
  public static toPublicDto(user: User): UserPublicDto {
    const phone = user.getPhone();

    return {
      id: user.id,
      email: user.getEmail().getValue(),
      phone: phone?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      avatar: user.getAvatar(),
      status: user.getStatus(),
      role: user.getRole(),
      tier: user.getTier(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      preferredLanguage: user.getPreferredLanguage() || 'en',
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      createdAt: user.createdAt,
    };
  }

  /**
   * Convert Domain User Entity to Admin DTO
   */
  public static toAdminDto(user: User): UserAdminDto {
    const baseDto = this.toDto(user);
    const phone = user.getPhone();

    return {
      ...baseDto,
      maskedEmail: maskEmail(user.getEmail().getValue()),
      maskedPhone: phone ? maskPhone(phone.getValue()) : undefined,
      auditSummary: {
        createdAt: user.createdAt,
        lastModifiedAt: user.updatedAt,
        changeCount: user.version - 1,
      },
    };
  }

  /**
   * Convert RegisterUserCommand to Domain User Entity
   */
  public static fromCommand(
    command: RegisterUserCommand,
    hashedPassword: string,
    idGenerator: IdGenerator,
    emailValidator: IEmailValidator,
    passwordValidator: IPasswordValidator,
    phoneValidator: IPhoneValidator
  ): User {
    const email = new Email(command.email, emailValidator);
    const password = new Password(hashedPassword, passwordValidator);
    const phone = command.phone ? new Phone(command.phone, phoneValidator) : undefined;

    const user = User.create(
      email,
      password,
      command.fullName,
      idGenerator,
      phone,
      command.preferredLanguage,
      command.deviceInfo?.mobileOperator // DeviceInfo থেকে নিন
    );

    // Role and Tier set করা (যদি কমান্ডে থাকে)
    if (command.role) {
      // ✅ changeRole মেথডটি User এন্টিটিতে অ্যাড করতে হবে
      // অথবা সরাসরি _role সেট করতে হবে
      (user as any)._role = command.role;
    }

    if (command.tier) {
      // ✅ changeTier মেথডটি User এন্টিটিতে অ্যাড করতে হবে
      // অথবা সরাসরি _tier সেট করতে হবে
      (user as any)._tier = command.tier;
    }

    // Display name সেট করুন (যদি থাকে)
    if (command.displayName) {
      (user as any)._displayName = command.displayName;
    }

    // Preferred District/Upazila সেট করুন
    if (command.preferences?.preferredDistrict) {
      (user as any)._preferredDistrict = command.preferences.preferredDistrict;
    }
    if (command.preferences?.preferredUpazila) {
      (user as any)._preferredUpazila = command.preferences.preferredUpazila;
    }

    // Mobile network type সেট করুন
    if (command.deviceInfo?.networkType) {
      (user as any)._mobileNetworkType = command.deviceInfo.networkType;
    }

    // Preferred language সেট করুন
    if (command.preferredLanguage) {
      (user as any)._preferredLanguage = command.preferredLanguage;
    }

    return user;
  }

  // ============================================================
// user.mapper.ts - সঠিক উপায়
// ============================================================

/**
 * Update existing User from UpdateProfileDto
 */
public static updateFromDto(
  user: User,
  dto: UpdateProfileDto,
  updatedBy?: string
): User {
  // ✅ User এন্টিটির পাবলিক মেথড ব্যবহার করুন
  // এই মেথডগুলোর ভিতরেই touch() কল হবে
  if (dto.fullName) {
    user.updateFullName(dto.fullName, updatedBy);
  }

  if (dto.displayName !== undefined) {
    if (dto.displayName) {
      user.updateDisplayName(dto.displayName, updatedBy);
    } else {
      user.clearDisplayName(updatedBy);
    }
  }

  if (dto.avatar !== undefined) {
    if (dto.avatar) {
      user.updateAvatar(dto.avatar, updatedBy);
    } else {
      user.clearAvatar(updatedBy);
    }
  }

  if (dto.preferredLanguage) {
    user.setPreferredLanguage(dto.preferredLanguage, updatedBy);
  }

  if (dto.preferredDistrict) {
    user.setPreferredDistrict(dto.preferredDistrict, updatedBy);
  }

  if (dto.preferredUpazila) {
    user.setPreferredUpazila(dto.preferredUpazila, updatedBy);
  }

  if (dto.preferredOperator) {
    user.setPreferredOperator(dto.preferredOperator, updatedBy);
  }

  if (dto.mobileNetworkType) {
    user.setMobileNetworkType(dto.mobileNetworkType, updatedBy);
  }

  return user;
}

/**
 * Update User Role
 */
public static updateRole(
  user: User,
  dto: UpdateRoleDto,
  updatedBy?: string
): User {
  user.changeRole(dto.role, updatedBy); // ✅ changeRole() এর ভিতর touch() কল হবে
  return user;
}

/**
 * Update User Tier
 */
public static updateTier(
  user: User,
  dto: UpdateTierDto,
  updatedBy?: string
): User {
  user.changeTier(dto.tier, updatedBy); // ✅ changeTier() এর ভিতর touch() কল হবে
  return user;
}

/**
 * Update User Status
 */
public static updateStatus(
  user: User,
  dto: UpdateStatusDto,
  updatedBy?: string
): User {
  user.changeStatus(dto.status, dto.reason, updatedBy); // ✅ changeStatus() এর ভিতর touch() কল হবে
  return user;
}
  /**
   * Convert User to persistence object
   */
  public static toPersistence(user: User): Record<string, unknown> {
    const phone = user.getPhone();

    return {
      id: user.id,
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      phone: phone?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      avatar: user.getAvatar(),
      status: user.getStatus(),
      role: user.getRole(),
      tier: user.getTier(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      mfaEnabled: user.isMfaEnabled(),
      totalSpent: user.getTotalSpent(),
      lastLoginAt: user.getLastLoginAt(),
      emailVerifiedAt: user.getEmailVerifiedAt(),
      phoneVerifiedAt: user.getPhoneVerifiedAt(),
      kycVerifiedAt: user.getKycVerifiedAt(),
      mfaEnabledAt: user.getMfaEnabledAt(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      suspendedAt: user.getSuspendedAt(),
      suspendedReason: user.getSuspendedReason(),
      preferredLanguage: user.getPreferredLanguage() || 'en',
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      preferredOperator: user.getPreferredOperator(),
      mobileNetworkType: user.getMobileNetworkType(),
    };
  }

  /**
   * Reconstitute User from persistence data
   */
  public static fromPersistence(
    data: {
      id: string;
      email: string;
      password: string;
      phone?: string | undefined;
      fullName: string;
      displayName?: string | undefined;
      avatar?: string | undefined;
      status: UserStatus;
      role: UserRole;
      tier: UserTier;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      isKycVerified: boolean;
      mfaEnabled: boolean;
      totalSpent: number;
      lastLoginAt?: Date | undefined;
      emailVerifiedAt?: Date | undefined;
      phoneVerifiedAt?: Date | undefined;
      kycVerifiedAt?: Date | undefined;
      mfaEnabledAt?: Date | undefined;
      createdAt: Date;
      updatedAt: Date;
      version: number;
      isDeleted: boolean;
      deletedAt?: Date | null | undefined;
      suspendedAt?: Date | undefined;
      suspendedReason?: string | undefined;
      preferredLanguage?: 'en' | 'bn' | undefined;
      preferredDistrict?: BangladeshDistrict | undefined;
      preferredUpazila?: BangladeshUpazila | undefined;
      preferredOperator?: UserMobileOperator | undefined;
      mobileNetworkType?: UserNetworkType | undefined;
    },
    emailValidator: IEmailValidator,
    passwordValidator: IPasswordValidator,
    phoneValidator: IPhoneValidator
  ): User {
    const email = new Email(data.email, emailValidator);
    const password = new Password(data.password, passwordValidator);
    const phone = data.phone ? new Phone(data.phone, phoneValidator) : undefined;

    return User.reconstitute({
      id: data.id,
      email,
      password,
      phone,
      fullName: data.fullName,
      displayName: data.displayName,
      avatar: data.avatar,
      status: data.status,
      role: data.role,
      tier: data.tier,
      isEmailVerified: data.isEmailVerified,
      isPhoneVerified: data.isPhoneVerified,
      isKycVerified: data.isKycVerified,
      mfaEnabled: data.mfaEnabled,
      totalSpent: data.totalSpent,
      lastLoginAt: data.lastLoginAt,
      emailVerifiedAt: data.emailVerifiedAt,
      phoneVerifiedAt: data.phoneVerifiedAt,
      kycVerifiedAt: data.kycVerifiedAt,
      mfaEnabledAt: data.mfaEnabledAt,
      deletedAt: data.deletedAt,
      suspendedAt: data.suspendedAt,
      suspendedReason: data.suspendedReason,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      version: data.version,
      preferredLanguage: data.preferredLanguage || 'en',
      preferredDistrict: data.preferredDistrict,
      preferredUpazila: data.preferredUpazila,
      preferredOperator: data.preferredOperator,
      mobileNetworkType: data.mobileNetworkType,
    });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type {
  UserDto as UserDtoType,
  UserPublicDto as UserPublicDtoType,
  UserAdminDto as UserAdminDtoType,
  UpdateProfileDto as UpdateProfileDtoType,
  UpdateRoleDto as UpdateRoleDtoType,
  UpdateTierDto as UpdateTierDtoType,
  UpdateStatusDto as UpdateStatusDtoType,
};
