/**
 * User Entity - Pure Domain Core (SSOT & DDD Compliant)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/entities/user.entity
 *
 * @description
 * Core user entity representing an authenticated user in the system.
 * Manages user state, authentication, verification, and security.
 *
 * SSOT Rules:
 * ✅ All constants imported from @vubon/shared-constants
 * ✅ No duplicate constants defined here
 * ✅ Pure TypeScript - NO external dependencies
 * ✅ Complete user lifecycle management
 * ✅ Domain events for all state changes
 * ✅ Bangladesh specific features
 */

import {
  BaseEntity,
  EntityValidationError,
  type IdGenerator,
  type EntityValidationResult,
  createValidationResult,
} from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { Phone } from '../value-objects/phone.vo';

// ✅ SSOT: All constants imported from shared-constants
import {
  USER_ROLES,
  USER_STATUSES,
  USER_TIERS,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  USER_MOBILE_OPERATORS,
  USER_NETWORK_TYPES,
  type UserRole,
  type UserStatus,
  type UserTier,
  type BangladeshDistrict,
  type BangladeshUpazila,
  type UserMobileOperator,
  type UserNetworkType,
} from '@vubon/shared-constants';

// ============================================================
// Domain-Specific Types (Not in shared-constants)
// ============================================================

/**
 * User event types (Domain-specific)
 */
export enum UserEventType {
  USER_CREATED = 'user.created',
  USER_ACTIVATED = 'user.activated',
  USER_DEACTIVATED = 'user.deactivated',
  USER_SUSPENDED = 'user.suspended',
  USER_REACTIVATED = 'user.reactivated',
  USER_DELETED = 'user.deleted',
  USER_RESTORED = 'user.restored',

  EMAIL_VERIFIED = 'user.email_verified',
  PHONE_VERIFIED = 'user.phone_verified',

  PASSWORD_CHANGED = 'user.password_changed',
  PASSWORD_RESET_INITIATED = 'user.password_reset_initiated',

  ACCOUNT_LOCKED = 'user.account_locked',
  ACCOUNT_UNLOCKED = 'user.account_unlocked',

  MFA_ENABLED = 'user.mfa_enabled',
  MFA_DISABLED = 'user.mfa_disabled',

  ROLE_CHANGED = 'user.role_changed',
  PROFILE_UPDATED = 'user.profile_updated',
  LOGIN_RECORDED = 'user.login_recorded',
  TIER_UPGRADED = 'user.tier_upgraded',
}

// ============================================================
// Domain Configuration (SSOT-compliant)
// ============================================================

/**
 * User configuration constants (Domain-specific business rules)
 * These are not in shared-constants because they are internal to this aggregate
 */
const USER_DOMAIN_CONFIG = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  NAME_PATTERN: /^[a-zA-Z\u0980-\u09FF\s.'-]+$/, // Supports Bengali

  // Tier thresholds (BDT) - These are domain business rules
  TIER_THRESHOLDS: {
    [USER_TIERS.BRONZE]: 0,
    [USER_TIERS.SILVER]: 5000,
    [USER_TIERS.GOLD]: 25000,
    [USER_TIERS.PLATINUM]: 100000,
    [USER_TIERS.DIAMOND]: 500000,
  },

  // Tier benefits - Domain business rules
  TIER_BENEFITS: {
    [USER_TIERS.BRONZE]: {
      discountPercentage: 0,
      freeShipping: false,
      prioritySupport: false,
    },
    [USER_TIERS.SILVER]: {
      discountPercentage: 5,
      freeShipping: true,
      prioritySupport: false,
    },
    [USER_TIERS.GOLD]: {
      discountPercentage: 10,
      freeShipping: true,
      prioritySupport: false,
    },
    [USER_TIERS.PLATINUM]: {
      discountPercentage: 15,
      freeShipping: true,
      prioritySupport: true,
    },
    [USER_TIERS.DIAMOND]: {
      discountPercentage: 20,
      freeShipping: true,
      prioritySupport: true,
    },
  },
} as const;

// ============================================================
// User Entity Props Interface
// ============================================================

/**
 * User Entity Properties Interface
 * ✅ Fixed: All optional properties explicitly include `| undefined` for exactOptionalPropertyTypes
 */
export interface UserProps {
  email: Email;
  password: Password;
  phone?: Phone | undefined;
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
  deletedAt?: Date | undefined;
  suspendedAt?: Date | undefined;
  suspendedReason?: string | undefined;
  deletionReason?: string | undefined;
  preferredLanguage?: 'en' | 'bn' | undefined;
  preferredDistrict?: BangladeshDistrict | undefined;
  preferredUpazila?: BangladeshUpazila | undefined;
  preferredOperator?: UserMobileOperator | undefined;
  mobileNetworkType?: UserNetworkType | undefined;
}

// ============================================================
// User Entity
// ============================================================

/**
 * User Entity - Core domain aggregate root
 * SSOT-compliant: All constants from shared-constants
 */
export class User extends BaseEntity {
  // ============================================================
  // Private Properties
  // ✅ Fixed: _deletedAt type matches BaseEntity (Date | null)
  // ============================================================

  private _email: Email;
  private _password: Password;
  private _phone: Phone | undefined;
  private _fullName: string;
  private _displayName: string | undefined;
  private _avatar: string | undefined;
  private _status: UserStatus;
  private _role: UserRole;
  private _tier: UserTier;
  private _isEmailVerified: boolean;
  private _isPhoneVerified: boolean;
  private _isKycVerified: boolean;
  private _mfaEnabled: boolean;
  private _totalSpent: number;
  private _lastLoginAt: Date | undefined;
  private _emailVerifiedAt: Date | undefined;
  private _phoneVerifiedAt: Date | undefined;
  private _kycVerifiedAt: Date | undefined;
  private _mfaEnabledAt: Date | undefined;
  private _suspendedAt: Date | undefined;
  private _suspendedReason: string | undefined;
  private _deletionReason: string | undefined;
  private _preferredLanguage: 'en' | 'bn';
  private _preferredDistrict: BangladeshDistrict | undefined;
  private _preferredUpazila: BangladeshUpazila | undefined;
  private _preferredOperator: UserMobileOperator | undefined;
  private _mobileNetworkType: UserNetworkType | undefined;

  // ============================================================
  // Constructor
  // ============================================================

  private constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    version: number,
    props: UserProps,
  ) {
    super({ id, createdAt, updatedAt, version });

    this._email = props.email;
    this._password = props.password;
    this._phone = props.phone;
    this._fullName = props.fullName;
    this._displayName = props.displayName;
    this._avatar = props.avatar;
    this._status = props.status;
    this._role = props.role;
    this._tier = props.tier;
    this._isEmailVerified = props.isEmailVerified;
    this._isPhoneVerified = props.isPhoneVerified;
    this._isKycVerified = props.isKycVerified;
    this._mfaEnabled = props.mfaEnabled;
    this._totalSpent = props.totalSpent;
    this._lastLoginAt = props.lastLoginAt;
    this._emailVerifiedAt = props.emailVerifiedAt;
    this._phoneVerifiedAt = props.phoneVerifiedAt;
    this._kycVerifiedAt = props.kycVerifiedAt;
    this._mfaEnabledAt = props.mfaEnabledAt;
    this._deletedAt = props.deletedAt ?? null; // ✅ Fixed
    this._suspendedAt = props.suspendedAt;
    this._suspendedReason = props.suspendedReason;
    this._deletionReason = props.deletionReason;
    this._preferredLanguage = props.preferredLanguage || 'en';
    this._preferredDistrict = props.preferredDistrict;
    this._preferredUpazila = props.preferredUpazila;
    this._preferredOperator = props.preferredOperator;
    this._mobileNetworkType = props.mobileNetworkType;
  }

  // ============================================================
  // Validation (Invariants)
  // ✅ Fixed: Returns EntityValidationResult
  // ============================================================

  protected validate(): EntityValidationResult {
    const errors: string[] = [];

    if (!this._email) {
      errors.push('User requires an email');
    }
    if (!this._password) {
      errors.push('User requires a password');
    }
    if (!this._fullName || this._fullName.trim().length === 0) {
      errors.push('User requires a full name');
    }
    if (this._fullName.length < USER_DOMAIN_CONFIG.MIN_NAME_LENGTH) {
      errors.push(`Full name must be at least ${USER_DOMAIN_CONFIG.MIN_NAME_LENGTH} characters`);
    }
    if (this._fullName.length > USER_DOMAIN_CONFIG.MAX_NAME_LENGTH) {
      errors.push(`Full name cannot exceed ${USER_DOMAIN_CONFIG.MAX_NAME_LENGTH} characters`);
    }
    if (!USER_DOMAIN_CONFIG.NAME_PATTERN.test(this._fullName)) {
      errors.push(
        'Full name contains invalid characters (only letters, spaces, dots, hyphens, apostrophes allowed)',
      );
    }
    if (this._totalSpent < 0) {
      errors.push('Total spent cannot be negative');
    }

    // ✅ SSOT: Validate against shared-constants values
    if (!Object.values(USER_STATUSES).includes(this._status)) {
      errors.push(`Invalid user status: ${this._status}`);
    }
    if (!Object.values(USER_ROLES).includes(this._role)) {
      errors.push(`Invalid user role: ${this._role}`);
    }
    if (!Object.values(USER_TIERS).includes(this._tier)) {
      errors.push(`Invalid user tier: ${this._tier}`);
    }

    return createValidationResult(errors.length === 0, errors);
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new user (factory method)
   * ✅ Fixed: Optional props explicitly passed with proper typing
   */
  public static create(
    email: Email,
    password: Password,
    fullName: string,
    idGenerator: IdGenerator,
    phone?: Phone,
    preferredLanguage?: 'en' | 'bn',
    preferredOperator?: UserMobileOperator,
  ): User {
    const now = new Date();

    const user = new User(idGenerator.generate(), now, now, 1, {
      email,
      password,
      phone, // ✅ Now properly typed as Phone | undefined
      fullName: fullName.trim(),
      displayName: fullName.trim().split(' ')[0],
      avatar: undefined,
      status: USER_STATUSES.PENDING_VERIFICATION,
      role: USER_ROLES.CUSTOMER,
      tier: USER_TIERS.BRONZE,
      isEmailVerified: false,
      isPhoneVerified: false,
      isKycVerified: false,
      mfaEnabled: false,
      totalSpent: 0,
      lastLoginAt: undefined,
      emailVerifiedAt: undefined,
      phoneVerifiedAt: undefined,
      kycVerifiedAt: undefined,
      mfaEnabledAt: undefined,
      deletedAt: undefined,
      suspendedAt: undefined,
      suspendedReason: undefined,
      deletionReason: undefined,
      preferredLanguage,
      preferredDistrict: undefined,
      preferredUpazila: undefined,
      preferredOperator,
      mobileNetworkType: undefined,
    });

    user.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_CREATED,
      aggregateId: user.id,
      occurredOn: now,
      version: 1,
      metadata: {
        email: email.getValue(),
        role: USER_ROLES.CUSTOMER,
        tier: USER_TIERS.BRONZE,
      },
    });

    return user;
  }

  /**
   * Reconstitute from persistence
   * ✅ Fixed: Optional props with proper typing
   */
  public static reconstitute(data: {
    id: string;
    email: Email;
    password: Password;
    phone?: Phone | undefined;
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
    deletedAt?: Date | null | undefined;
    suspendedAt?: Date | undefined;
    suspendedReason?: string | undefined;
    deletionReason?: string | undefined;
    preferredLanguage?: 'en' | 'bn' | undefined;
    preferredDistrict?: BangladeshDistrict | undefined;
    preferredUpazila?: BangladeshUpazila | undefined;
    preferredOperator?: UserMobileOperator | undefined;
    mobileNetworkType?: UserNetworkType | undefined;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): User {
    return new User(data.id, data.createdAt, data.updatedAt, data.version, {
      email: data.email,
      password: data.password,
      phone: data.phone,
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
      deletedAt: data.deletedAt ?? undefined,
      suspendedAt: data.suspendedAt,
      suspendedReason: data.suspendedReason,
      deletionReason: data.deletionReason,
      preferredLanguage: data.preferredLanguage,
      preferredDistrict: data.preferredDistrict,
      preferredUpazila: data.preferredUpazila,
      preferredOperator: data.preferredOperator,
      mobileNetworkType: data.mobileNetworkType,
    });
  }

  // ============================================================
  // Business Methods (User Lifecycle)
  // ============================================================

  /**
   * Activate user account
   */
  public activate(): void {
    if (this._status === USER_STATUSES.SUSPENDED) {
      throw new EntityValidationError('Cannot activate suspended user');
    }
    if (this._status === USER_STATUSES.BANNED) {
      throw new EntityValidationError('Cannot activate banned user');
    }
    if (this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot activate deactivated user');
    }
    if (this._status === USER_STATUSES.ACTIVE) {
      return;
    }

    this._status = USER_STATUSES.ACTIVE;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_ACTIVATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Deactivate user account
   */
  public deactivate(): void {
    if (this._status === USER_STATUSES.LOCKED) {
      throw new EntityValidationError('Cannot deactivate locked user');
    }
    if (this._status === USER_STATUSES.BANNED) {
      throw new EntityValidationError('Cannot deactivate banned user');
    }
    if (this._status === USER_STATUSES.DEACTIVATED) {
      return;
    }

    this._status = USER_STATUSES.DEACTIVATED;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_DEACTIVATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Suspend user account (with reason)
   */
  public suspend(reason: string): void {
    if (this._status === USER_STATUSES.BANNED) {
      throw new EntityValidationError('Cannot suspend banned user');
    }
    if (this._status === USER_STATUSES.SUSPENDED) {
      return;
    }

    this._status = USER_STATUSES.SUSPENDED;
    this._suspendedAt = new Date();
    this._suspendedReason = reason;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_SUSPENDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
        reason,
      },
    });
  }

  /**
   * Reactivate suspended user
   */
  public reactivate(): void {
    if (this._status !== USER_STATUSES.SUSPENDED) {
      throw new EntityValidationError('Only suspended users can be reactivated');
    }

    this._status = USER_STATUSES.ACTIVE;
    this._suspendedAt = undefined;
    this._suspendedReason = undefined;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_REACTIVATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Soft delete user account
   */
  public delete(reason: string): void {
    if (this._status === USER_STATUSES.BANNED) {
      throw new EntityValidationError('Cannot delete banned user');
    }

    this._status = USER_STATUSES.DEACTIVATED;
    this._deletedAt = new Date(); // ✅ Fixed: Date, not Date | undefined
    this._deletionReason = reason;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_DELETED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
        reason,
      },
    });
  }

  /**
   * Restore soft-deleted user
   */
  public restore(): void {
    if (this._deletedAt === null) {
      // ✅ Fixed: Check null, not undefined
      throw new EntityValidationError('Only deleted users can be restored');
    }

    this._status = USER_STATUSES.ACTIVE;
    this._deletedAt = null; // ✅ Fixed: Set to null, not undefined
    this._deletionReason = undefined;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_RESTORED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  // ============================================================
  // Verification Methods
  // ============================================================

  /**
   * Verify email address
   */
  public verifyEmail(): void {
    if (this._isEmailVerified) {
      throw new EntityValidationError('Email already verified');
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot verify email for inactive user');
    }

    this._isEmailVerified = true;
    this._emailVerifiedAt = new Date();

    // Auto-activate if both email and phone are verified
    if (this._isPhoneVerified && this._status === USER_STATUSES.PENDING_VERIFICATION) {
      this.activate();
    }

    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.EMAIL_VERIFIED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
        email: this._email.getValue(),
      },
    });
  }

  /**
   * Verify phone number
   */
  public verifyPhone(): void {
    if (!this._phone) {
      throw new EntityValidationError('User does not have a phone number');
    }
    if (this._isPhoneVerified) {
      throw new EntityValidationError('Phone already verified');
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot verify phone for inactive user');
    }

    this._isPhoneVerified = true;
    this._phoneVerifiedAt = new Date();

    // Auto-activate if both email and phone are verified
    if (this._isEmailVerified && this._status === USER_STATUSES.PENDING_VERIFICATION) {
      this.activate();
    }

    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.PHONE_VERIFIED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
        phone: this._phone.getValue(),
      },
    });
  }

  /**
   * Verify KYC (for sellers/vendors)
   */
  public verifyKyc(): void {
    if (this._isKycVerified) {
      throw new EntityValidationError('KYC already verified');
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot verify KYC for inactive user');
    }

    this._isKycVerified = true;
    this._kycVerifiedAt = new Date();
    this.touch();
  }

  // ============================================================
  // Security Methods
  // ============================================================

  /**
   * Change user password
   */
  public changePassword(newPassword: Password): void {
    if (this._status === USER_STATUSES.LOCKED) {
      throw new EntityValidationError('Cannot change password for locked account');
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot change password for inactive user');
    }

    this._password = newPassword;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.PASSWORD_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Lock user account (after too many failed attempts)
   */
  public lockAccount(): void {
    if (this._status === USER_STATUSES.LOCKED) {
      return;
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot lock inactive user');
    }

    this._status = USER_STATUSES.LOCKED;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.ACCOUNT_LOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Unlock user account
   */
  public unlockAccount(): void {
    if (this._status !== USER_STATUSES.LOCKED) {
      throw new EntityValidationError('Account is not locked');
    }

    this._status = USER_STATUSES.ACTIVE;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.ACCOUNT_UNLOCKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Enable MFA for user
   */
  public enableMFA(): void {
    if (this._mfaEnabled) {
      throw new EntityValidationError('MFA already enabled');
    }
    if (this._status === USER_STATUSES.BANNED || this._status === USER_STATUSES.DEACTIVATED) {
      throw new EntityValidationError('Cannot enable MFA for inactive user');
    }

    this._mfaEnabled = true;
    this._mfaEnabledAt = new Date();
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.MFA_ENABLED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Disable MFA for user
   */
  public disableMFA(): void {
    if (!this._mfaEnabled) {
      throw new EntityValidationError('MFA not enabled');
    }

    this._mfaEnabled = false;
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.MFA_DISABLED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  // ============================================================
  // Profile & Role Management
  // ============================================================

  /**
   * Change user role (admin action)
   */
  // user.entity.ts

  public changeRole(newRole: UserRole, changedBy?: string): void {
    if (this._role === newRole) return;
    this._role = newRole;
    this.touch(changedBy); // ✅ এখানে touch() কল করা বৈধ
  }

  public changeTier(newTier: UserTier, changedBy?: string): void {
    if (this._tier === newTier) return;
    this._tier = newTier;
    this.touch(changedBy); // ✅ বৈধ
  }

  public changeStatus(newStatus: UserStatus, reason?: string, changedBy?: string): void {
    if (this._status === newStatus) return;
    this._status = newStatus;
    if (reason) this._suspendedReason = reason;
    this.touch(changedBy); // ✅ বৈধ
  }

  public updateFullName(newName: string, changedBy?: string): void {
    if (this._fullName === newName) return;
    this._fullName = newName;
    this.touch(changedBy); // ✅ বৈধ
  }

  public updateDisplayName(newDisplayName?: string, changedBy?: string): void {
    this._displayName = newDisplayName;
    this.touch(changedBy); // ✅ বৈধ
  }

  public clearDisplayName(changedBy?: string): void {
    this._displayName = undefined;
    this.touch(changedBy); // ✅ বৈধ
  }

  public updateAvatar(newAvatar?: string, changedBy?: string): void {
    this._avatar = newAvatar;
    this.touch(changedBy); // ✅ বৈধ
  }

  public clearAvatar(changedBy?: string): void {
    this._avatar = undefined;
    this.touch(changedBy); // ✅ বৈধ
  }

  public setPreferredLanguage(language: 'en' | 'bn', changedBy?: string): void {
    if (this._preferredLanguage === language) return;
    this._preferredLanguage = language;
    this.touch(changedBy); // ✅ বৈধ
  }

  public setPreferredDistrict(district: BangladeshDistrict, changedBy?: string): void {
    if (this._preferredDistrict === district) return;
    this._preferredDistrict = district;
    this.touch(changedBy); // ✅ বৈধ
  }

  public setPreferredUpazila(upazila: BangladeshUpazila, changedBy?: string): void {
    if (this._preferredUpazila === upazila) return;
    this._preferredUpazila = upazila;
    this.touch(changedBy); // ✅ বৈধ
  }

  public setPreferredOperator(operator: UserMobileOperator, changedBy?: string): void {
    if (this._preferredOperator === operator) return;
    this._preferredOperator = operator;
    this.touch(changedBy); // ✅ বৈধ
  }

  public setMobileNetworkType(networkType: UserNetworkType, changedBy?: string): void {
    if (this._mobileNetworkType === networkType) return;
    this._mobileNetworkType = networkType;
    this.touch(changedBy); // ✅ বৈধ
  }

  /**
   * Update user profile information
   */
  public updateProfile(
    fullName?: string,
    displayName?: string,
    avatar?: string,
    phone?: Phone,
    preferredLanguage?: 'en' | 'bn',
    preferredDistrict?: BangladeshDistrict,
    preferredUpazila?: BangladeshUpazila,
    preferredOperator?: UserMobileOperator,
    mobileNetworkType?: UserNetworkType,
  ): void {
    if (fullName) {
      const trimmed = fullName.trim();
      if (trimmed.length < USER_DOMAIN_CONFIG.MIN_NAME_LENGTH) {
        throw new EntityValidationError(
          `Full name must be at least ${USER_DOMAIN_CONFIG.MIN_NAME_LENGTH} characters`,
        );
      }
      if (trimmed.length > USER_DOMAIN_CONFIG.MAX_NAME_LENGTH) {
        throw new EntityValidationError(
          `Full name cannot exceed ${USER_DOMAIN_CONFIG.MAX_NAME_LENGTH} characters`,
        );
      }
      if (!USER_DOMAIN_CONFIG.NAME_PATTERN.test(trimmed)) {
        throw new EntityValidationError('Full name contains invalid characters');
      }
      this._fullName = trimmed;
    }

    if (displayName) {
      this._displayName = displayName.trim();
    }

    if (avatar !== undefined) {
      this._avatar = avatar;
    }

    if (phone !== undefined) {
      this._phone = phone;
      // Reset phone verification when phone number changes
      if (this._isPhoneVerified && this._phone !== phone) {
        this._isPhoneVerified = false;
        this._phoneVerifiedAt = undefined;
      }
    }

    if (preferredLanguage) {
      this._preferredLanguage = preferredLanguage;
    }

    if (preferredDistrict && BANGLADESH_DISTRICTS.includes(preferredDistrict)) {
      this._preferredDistrict = preferredDistrict;
    }

    if (preferredUpazila && BANGLADESH_UPAZILAS.includes(preferredUpazila)) {
      this._preferredUpazila = preferredUpazila;
    }

    if (preferredOperator && Object.values(USER_MOBILE_OPERATORS).includes(preferredOperator)) {
      this._preferredOperator = preferredOperator;
    }

    if (mobileNetworkType && Object.values(USER_NETWORK_TYPES).includes(mobileNetworkType)) {
      this._mobileNetworkType = mobileNetworkType;
    }

    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.PROFILE_UPDATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Update total spent (for tier calculation)
   */
  public updateTotalSpent(amount: number): void {
    if (amount < 0) {
      throw new EntityValidationError('Amount cannot be negative');
    }

    const oldTier = this._tier;
    this._totalSpent += amount;

    // Recalculate tier
    const newTier = this.calculateTier();
    if (newTier !== oldTier) {
      this._tier = newTier;
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: UserEventType.TIER_UPGRADED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this.id,
          oldTier,
          newTier,
          totalSpent: this._totalSpent,
        },
      });
    }

    this.touch();
  }

  /**
   * Record user login
   */
  public recordLogin(): void {
    this._lastLoginAt = new Date();
    this.touch();

    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.LOGIN_RECORDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  // ============================================================
  // Query Methods (Read-Only)
  // ============================================================

  /**
   * Calculate user tier based on total spent
   */
  private calculateTier(): UserTier {
    const thresholds = USER_DOMAIN_CONFIG.TIER_THRESHOLDS;
    if (this._totalSpent >= thresholds[USER_TIERS.DIAMOND]) {
      return USER_TIERS.DIAMOND;
    }
    if (this._totalSpent >= thresholds[USER_TIERS.PLATINUM]) {
      return USER_TIERS.PLATINUM;
    }
    if (this._totalSpent >= thresholds[USER_TIERS.GOLD]) {
      return USER_TIERS.GOLD;
    }
    if (this._totalSpent >= thresholds[USER_TIERS.SILVER]) {
      return USER_TIERS.SILVER;
    }
    return USER_TIERS.BRONZE;
  }

  /**
   * Check if user is active (can perform actions)
   */
  public isActive(): boolean {
    return this._status === USER_STATUSES.ACTIVE;
  }

  /**
   * Check if user is locked
   */
  public isLocked(): boolean {
    return this._status === USER_STATUSES.LOCKED;
  }

  /**
   * Check if user is suspended
   */
  public isSuspended(): boolean {
    return this._status === USER_STATUSES.SUSPENDED;
  }

  /**
   * Check if user is banned
   */
  public isBanned(): boolean {
    return this._status === USER_STATUSES.BANNED;
  }

  /**
   * Check if user is deactivated
   */
  public isDeactivated(): boolean {
    return this._status === USER_STATUSES.DEACTIVATED;
  }

  /**
   * Check if user is pending verification
   */
  public isPendingVerification(): boolean {
    return this._status === USER_STATUSES.PENDING_VERIFICATION;
  }

  /**
   * Check if user is fully verified
   */
  public isFullyVerified(): boolean {
    return this._isEmailVerified && this._isPhoneVerified;
  }

  /**
   * Check if user has admin privileges
   */
  public isAdmin(): boolean {
    return this._role === USER_ROLES.ADMIN || this._role === USER_ROLES.SUPER_ADMIN;
  }

  /**
   * Check if user is super admin
   */
  public isSuperAdmin(): boolean {
    return this._role === USER_ROLES.SUPER_ADMIN;
  }

  /**
   * Check if user is seller/vendor
   */
  public isSeller(): boolean {
    return this._role === USER_ROLES.VENDOR || this._role === USER_ROLES.SHOP_MANAGER;
  }

  /**
   * Get display name (prefer displayName, fallback to first name)
   */
  public getDisplayName(): string {
    if (this._displayName) {
      return this._displayName;
    }
    return this._fullName.split(' ')[0] || this._fullName;
  }

  /**
   * Get tier discount percentage
   */
  public getTierDiscount(): number {
    return USER_DOMAIN_CONFIG.TIER_BENEFITS[this._tier].discountPercentage;
  }

  /**
   * Check if user gets free shipping
   */
  public hasFreeShipping(): boolean {
    return USER_DOMAIN_CONFIG.TIER_BENEFITS[this._tier].freeShipping;
  }

  /**
   * Check if user has priority support
   */
  public hasPrioritySupport(): boolean {
    return USER_DOMAIN_CONFIG.TIER_BENEFITS[this._tier].prioritySupport;
  }

  // ============================================================
  // Getters (All Properties)
  // ============================================================

  public getEmail(): Email {
    return this._email;
  }
  public getPassword(): Password {
    return this._password;
  }
  public getPhone(): Phone | undefined {
    return this._phone;
  }
  public getFullName(): string {
    return this._fullName;
  }
  public getAvatar(): string | undefined {
    return this._avatar;
  }
  public getStatus(): UserStatus {
    return this._status;
  }
  public getRole(): UserRole {
    return this._role;
  }
  public getTier(): UserTier {
    return this._tier;
  }
  public isEmailVerified(): boolean {
    return this._isEmailVerified;
  }
  public isPhoneVerified(): boolean {
    return this._isPhoneVerified;
  }
  public isKycVerified(): boolean {
    return this._isKycVerified;
  }
  public isMfaEnabled(): boolean {
    return this._mfaEnabled;
  }
  public getTotalSpent(): number {
    return this._totalSpent;
  }
  public getLastLoginAt(): Date | undefined {
    return this._lastLoginAt ? new Date(this._lastLoginAt) : undefined;
  }
  public getEmailVerifiedAt(): Date | undefined {
    return this._emailVerifiedAt ? new Date(this._emailVerifiedAt) : undefined;
  }
  public getPhoneVerifiedAt(): Date | undefined {
    return this._phoneVerifiedAt ? new Date(this._phoneVerifiedAt) : undefined;
  }
  public getKycVerifiedAt(): Date | undefined {
    return this._kycVerifiedAt ? new Date(this._kycVerifiedAt) : undefined;
  }
  public getMfaEnabledAt(): Date | undefined {
    return this._mfaEnabledAt ? new Date(this._mfaEnabledAt) : undefined;
  }
  public getDeletedAt(): Date | null {
    return this._deletedAt ? new Date(this._deletedAt) : null;
  }
  public getSuspendedAt(): Date | undefined {
    return this._suspendedAt ? new Date(this._suspendedAt) : undefined;
  }
  public getSuspendedReason(): string | undefined {
    return this._suspendedReason;
  }
  public getDeletionReason(): string | undefined {
    return this._deletionReason;
  }
  public getPreferredLanguage(): 'en' | 'bn' {
    return this._preferredLanguage;
  }
  public getPreferredDistrict(): BangladeshDistrict | undefined {
    return this._preferredDistrict;
  }
  public getPreferredUpazila(): BangladeshUpazila | undefined {
    return this._preferredUpazila;
  }
  public getPreferredOperator(): UserMobileOperator | undefined {
    return this._preferredOperator;
  }
  public getMobileNetworkType(): UserNetworkType | undefined {
    return this._mobileNetworkType;
  }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      email: this._email.getValue(),
      phone: this._phone?.getValue(),
      fullName: this._fullName,
      displayName: this.getDisplayName(),
      avatar: this._avatar,
      status: this._status,
      role: this._role,
      tier: this._tier,
      isEmailVerified: this._isEmailVerified,
      isPhoneVerified: this._isPhoneVerified,
      isKycVerified: this._isKycVerified,
      mfaEnabled: this._mfaEnabled,
      totalSpent: this._totalSpent,
      tierDiscount: this.getTierDiscount(),
      hasFreeShipping: this.hasFreeShipping(),
      hasPrioritySupport: this.hasPrioritySupport(),
      lastLoginAt: this._lastLoginAt?.toISOString(),
      emailVerifiedAt: this._emailVerifiedAt?.toISOString(),
      phoneVerifiedAt: this._phoneVerifiedAt?.toISOString(),
      kycVerifiedAt: this._kycVerifiedAt?.toISOString(),
      mfaEnabledAt: this._mfaEnabledAt?.toISOString(),
      deletedAt: this._deletedAt?.toISOString(),
      suspendedAt: this._suspendedAt?.toISOString(),
      suspendedReason: this._suspendedReason,
      deletionReason: this._deletionReason,
      preferredLanguage: this._preferredLanguage,
      preferredDistrict: this._preferredDistrict,
      preferredUpazila: this._preferredUpazila,
      preferredOperator: this._preferredOperator,
      mobileNetworkType: this._mobileNetworkType,
      isActive: this.isActive(),
      isLocked: this.isLocked(),
      isSuspended: this.isSuspended(),
      isBanned: this.isBanned(),
      isDeactivated: this.isDeactivated(),
      isAdmin: this.isAdmin(),
      isSeller: this.isSeller(),
      isFullyVerified: this.isFullyVerified(),
      // Password intentionally excluded from JSON
    };
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate event ID (pure domain function)
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Type Exports
// ============================================================

// ✅ Fixed: Only one UserProps export (already exported above)
// UserEventType is already exported as enum
