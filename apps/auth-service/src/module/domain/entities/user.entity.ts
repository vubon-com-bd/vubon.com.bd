/**
 * User Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/user.entity
 * 
 * @description
 * Core user entity representing an authenticated user in the system.
 * Manages user state, authentication, verification, and security.
 * 
 * Enterprise Rules:
 * ✅ Complete user lifecycle management
 * ✅ Email and phone verification tracking
 * ✅ Role-based access control
 * ✅ MFA enable/disable
 * ✅ Account lock/unlock
 * ✅ Domain events for all state changes
 * ✅ Framework-free (no crypto dependency)
 * ✅ Bangladesh specific - Phone verification support
 * ✅ User tier/loyalty program support
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { Phone, BDOperator } from '../value-objects/phone.vo';

// ==================== Enums ====================

/**
 * User status enumeration
 */
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

/**
 * User role enumeration
 */
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PREMIUM_CUSTOMER = 'PREMIUM_CUSTOMER',
  SELLER = 'SELLER',
  VENDOR = 'VENDOR',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUPPORT = 'SUPPORT',
  DELIVERY_AGENT = 'DELIVERY_AGENT',
}

/**
 * User tier (Bangladesh specific loyalty program)
 */
export enum UserTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
}

/**
 * User event types
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

// ==================== Types ====================

/**
 * User configuration constants
 */
const USER_CONFIG = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  NAME_PATTERN: /^[a-zA-Z\u0980-\u09FF\s.'-]+$/, // Supports Bengali
  
  // Tier thresholds (order amount in BDT)
  TIER_THRESHOLDS: {
    [UserTier.BRONZE]: 0,
    [UserTier.SILVER]: 5000,
    [UserTier.GOLD]: 25000,
    [UserTier.PLATINUM]: 100000,
    [UserTier.DIAMOND]: 500000,
  },
  
  // Tier benefits
  TIER_BENEFITS: {
    [UserTier.BRONZE]: {
      discountPercentage: 0,
      freeShipping: false,
      prioritySupport: false,
    },
    [UserTier.SILVER]: {
      discountPercentage: 5,
      freeShipping: true,
      prioritySupport: false,
    },
    [UserTier.GOLD]: {
      discountPercentage: 10,
      freeShipping: true,
      prioritySupport: false,
    },
    [UserTier.PLATINUM]: {
      discountPercentage: 15,
      freeShipping: true,
      prioritySupport: true,
    },
    [UserTier.DIAMOND]: {
      discountPercentage: 20,
      freeShipping: true,
      prioritySupport: true,
    },
  },
} as const;

/**
 * User Entity Props Interface
 */
export interface UserProps {
  email: Email;
  password: Password;
  phone?: Phone;
  fullName: string;
  displayName?: string;
  avatar?: string;
  status: UserStatus;
  role: UserRole;
  tier: UserTier;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  mfaEnabled: boolean;
  totalSpent: number;
  lastLoginAt?: Date;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
  kycVerifiedAt?: Date;
  mfaEnabledAt?: Date;
  deletedAt?: Date;
  suspendedAt?: Date;
  suspendedReason?: string;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
}

// ==================== User Entity ====================

/**
 * User Entity - Core domain aggregate root
 */
export class User extends BaseEntity {
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
  private _deletedAt: Date | undefined;
  private _suspendedAt: Date | undefined;
  private _suspendedReason: string | undefined;
  private _preferredLanguage: 'en' | 'bn';
  private _preferredDistrict: string | undefined;
  private _preferredUpazila: string | undefined;

  private constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    version: number,
    props: UserProps
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
    this._deletedAt = props.deletedAt;
    this._suspendedAt = props.suspendedAt;
    this._suspendedReason = props.suspendedReason;
    this._preferredLanguage = props.preferredLanguage || 'en';
    this._preferredDistrict = props.preferredDistrict;
    this._preferredUpazila = props.preferredUpazila;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._email) {
      throw new EntityValidationError('User requires an email');
    }
    if (!this._password) {
      throw new EntityValidationError('User requires a password');
    }
    if (!this._fullName || this._fullName.trim().length === 0) {
      throw new EntityValidationError('User requires a full name');
    }
    if (this._fullName.length < USER_CONFIG.MIN_NAME_LENGTH) {
      throw new EntityValidationError(
        `Full name must be at least ${USER_CONFIG.MIN_NAME_LENGTH} characters`
      );
    }
    if (this._fullName.length > USER_CONFIG.MAX_NAME_LENGTH) {
      throw new EntityValidationError(
        `Full name cannot exceed ${USER_CONFIG.MAX_NAME_LENGTH} characters`
      );
    }
    if (!USER_CONFIG.NAME_PATTERN.test(this._fullName)) {
      throw new EntityValidationError(
        'Full name contains invalid characters (only letters, spaces, dots, hyphens, apostrophes allowed)'
      );
    }
    if (this._totalSpent < 0) {
      throw new EntityValidationError('Total spent cannot be negative');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create a new user (factory method)
   */
  public static create(
    email: Email,
    password: Password,
    fullName: string,
    idGenerator: IdGenerator,
    phone?: Phone,
    preferredLanguage?: 'en' | 'bn'
  ): User {
    const now = new Date();
    
    const user = new User(
      idGenerator.generate(),
      now,
      now,
      1,
      {
        email,
        password,
        phone,
        fullName: fullName.trim(),
        displayName: fullName.trim().split(' ')[0],
        avatar: undefined,
        status: UserStatus.PENDING_VERIFICATION,
        role: UserRole.CUSTOMER,
        tier: UserTier.BRONZE,
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
        preferredLanguage,
        preferredDistrict: undefined,
        preferredUpazila: undefined,
      }
    );
    
    user.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_CREATED,
      aggregateId: user.id,
      occurredOn: now,
      version: 1,
      metadata: {
        email: email.getValue(),
        role: UserRole.CUSTOMER,
        tier: UserTier.BRONZE,
      },
    });
    
    return user;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    email: Email;
    password: Password;
    phone?: Phone;
    fullName: string;
    displayName?: string;
    avatar?: string;
    status: UserStatus;
    role: UserRole;
    tier: UserTier;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isKycVerified: boolean;
    mfaEnabled: boolean;
    totalSpent: number;
    lastLoginAt?: Date;
    emailVerifiedAt?: Date;
    phoneVerifiedAt?: Date;
    kycVerifiedAt?: Date;
    mfaEnabledAt?: Date;
    deletedAt?: Date;
    suspendedAt?: Date;
    suspendedReason?: string;
    preferredLanguage?: 'en' | 'bn';
    preferredDistrict?: string;
    preferredUpazila?: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): User {
    return new User(
      data.id,
      data.createdAt,
      data.updatedAt,
      data.version,
      {
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
        deletedAt: data.deletedAt,
        suspendedAt: data.suspendedAt,
        suspendedReason: data.suspendedReason,
        preferredLanguage: data.preferredLanguage,
        preferredDistrict: data.preferredDistrict,
        preferredUpazila: data.preferredUpazila,
      }
    );
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Activate user account
   */
  public activate(): void {
    if (this._status === UserStatus.SUSPENDED) {
      throw new EntityValidationError('Cannot activate suspended user');
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot activate deleted user');
    }
    if (this._status === UserStatus.ACTIVE) {
      return;
    }
    
    this._status = UserStatus.ACTIVE;
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
    if (this._status === UserStatus.LOCKED) {
      throw new EntityValidationError('Cannot deactivate locked user');
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot deactivate deleted user');
    }
    if (this._status === UserStatus.INACTIVE) {
      return;
    }
    
    this._status = UserStatus.INACTIVE;
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
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot suspend deleted user');
    }
    if (this._status === UserStatus.SUSPENDED) {
      return;
    }
    
    this._status = UserStatus.SUSPENDED;
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
    if (this._status !== UserStatus.SUSPENDED) {
      throw new EntityValidationError('Only suspended users can be reactivated');
    }
    
    this._status = UserStatus.ACTIVE;
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
  public delete(): void {
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('User already deleted');
    }
    
    this._status = UserStatus.DELETED;
    this._deletedAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.USER_DELETED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
      },
    });
  }

  /**
   * Restore soft-deleted user
   */
  public restore(): void {
    if (this._status !== UserStatus.DELETED) {
      throw new EntityValidationError('Only deleted users can be restored');
    }
    
    this._status = UserStatus.ACTIVE;
    this._deletedAt = undefined;
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

  /**
   * Verify email address
   */
  public verifyEmail(): void {
    if (this._isEmailVerified) {
      throw new EntityValidationError('Email already verified');
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot verify email for deleted user');
    }
    
    this._isEmailVerified = true;
    this._emailVerifiedAt = new Date();
    
    // Auto-activate if both email and phone are verified
    if (this._isPhoneVerified && this._status === UserStatus.PENDING_VERIFICATION) {
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
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot verify phone for deleted user');
    }
    
    this._isPhoneVerified = true;
    this._phoneVerifiedAt = new Date();
    
    // Auto-activate if both email and phone are verified
    if (this._isEmailVerified && this._status === UserStatus.PENDING_VERIFICATION) {
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
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot verify KYC for deleted user');
    }
    
    this._isKycVerified = true;
    this._kycVerifiedAt = new Date();
    this.touch();
  }

  /**
   * Change user password
   */
  public changePassword(newPassword: Password): void {
    if (this._status === UserStatus.LOCKED) {
      throw new EntityValidationError('Cannot change password for locked account');
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot change password for deleted user');
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
    if (this._status === UserStatus.LOCKED) {
      return;
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot lock deleted user');
    }
    
    this._status = UserStatus.LOCKED;
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
    if (this._status !== UserStatus.LOCKED) {
      throw new EntityValidationError('Account is not locked');
    }
    
    this._status = UserStatus.ACTIVE;
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
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot enable MFA for deleted user');
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

  /**
   * Change user role (admin action)
   */
  public changeRole(newRole: UserRole, changedBy: string): void {
    if (this._role === newRole) {
      return;
    }
    if (this._status === UserStatus.DELETED) {
      throw new EntityValidationError('Cannot change role for deleted user');
    }
    
    const oldRole = this._role;
    this._role = newRole;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: UserEventType.ROLE_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this.id,
        oldRole,
        newRole,
        changedBy,
      },
    });
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
    preferredDistrict?: string,
    preferredUpazila?: string
  ): void {
    if (fullName) {
      const trimmed = fullName.trim();
      if (trimmed.length < USER_CONFIG.MIN_NAME_LENGTH) {
        throw new EntityValidationError(
          `Full name must be at least ${USER_CONFIG.MIN_NAME_LENGTH} characters`
        );
      }
      if (trimmed.length > USER_CONFIG.MAX_NAME_LENGTH) {
        throw new EntityValidationError(
          `Full name cannot exceed ${USER_CONFIG.MAX_NAME_LENGTH} characters`
        );
      }
      if (!USER_CONFIG.NAME_PATTERN.test(trimmed)) {
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
    
    if (preferredDistrict) {
      this._preferredDistrict = preferredDistrict;
    }
    
    if (preferredUpazila) {
      this._preferredUpazila = preferredUpazila;
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
  // Query Methods
  // ============================================================

  /**
   * Calculate user tier based on total spent
   */
  private calculateTier(): UserTier {
    if (this._totalSpent >= USER_CONFIG.TIER_THRESHOLDS[UserTier.DIAMOND]) {
      return UserTier.DIAMOND;
    }
    if (this._totalSpent >= USER_CONFIG.TIER_THRESHOLDS[UserTier.PLATINUM]) {
      return UserTier.PLATINUM;
    }
    if (this._totalSpent >= USER_CONFIG.TIER_THRESHOLDS[UserTier.GOLD]) {
      return UserTier.GOLD;
    }
    if (this._totalSpent >= USER_CONFIG.TIER_THRESHOLDS[UserTier.SILVER]) {
      return UserTier.SILVER;
    }
    return UserTier.BRONZE;
  }

  /**
   * Check if user is active (can perform actions)
   */
  public isActive(): boolean {
    return this._status === UserStatus.ACTIVE;
  }

  /**
   * Check if user is locked
   */
  public isLocked(): boolean {
    return this._status === UserStatus.LOCKED;
  }

  /**
   * Check if user is suspended
   */
  public isSuspended(): boolean {
    return this._status === UserStatus.SUSPENDED;
  }

  /**
   * Check if user is deleted
   */
  public isDeleted(): boolean {
    return this._status === UserStatus.DELETED;
  }

  /**
   * Check if user is pending verification
   */
  public isPendingVerification(): boolean {
    return this._status === UserStatus.PENDING_VERIFICATION;
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
    return this._role === UserRole.ADMIN || this._role === UserRole.SUPER_ADMIN;
  }

  /**
   * Check if user is super admin
   */
  public isSuperAdmin(): boolean {
    return this._role === UserRole.SUPER_ADMIN;
  }

  /**
   * Check if user is seller/vendor
   */
  public isSeller(): boolean {
    return this._role === UserRole.SELLER || this._role === UserRole.VENDOR;
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
    return USER_CONFIG.TIER_BENEFITS[this._tier].discountPercentage;
  }

  /**
   * Check if user gets free shipping
   */
  public hasFreeShipping(): boolean {
    return USER_CONFIG.TIER_BENEFITS[this._tier].freeShipping;
  }

  /**
   * Check if user has priority support
   */
  public hasPrioritySupport(): boolean {
    return USER_CONFIG.TIER_BENEFITS[this._tier].prioritySupport;
  }

  // ============================================================
  // Getters
  // ============================================================

  public getEmail(): Email { return this._email; }
  public getPassword(): Password { return this._password; }
  public getPhone(): Phone | undefined { return this._phone; }
  public getFullName(): string { return this._fullName; }
  public getAvatar(): string | undefined { return this._avatar; }
  public getStatus(): UserStatus { return this._status; }
  public getRole(): UserRole { return this._role; }
  public getTier(): UserTier { return this._tier; }
  public isEmailVerified(): boolean { return this._isEmailVerified; }
  public isPhoneVerified(): boolean { return this._isPhoneVerified; }
  public isKycVerified(): boolean { return this._isKycVerified; }
  public isMfaEnabled(): boolean { return this._mfaEnabled; }
  public getTotalSpent(): number { return this._totalSpent; }
  public getLastLoginAt(): Date | undefined { return this._lastLoginAt ? new Date(this._lastLoginAt) : undefined; }
  public getEmailVerifiedAt(): Date | undefined { return this._emailVerifiedAt ? new Date(this._emailVerifiedAt) : undefined; }
  public getPhoneVerifiedAt(): Date | undefined { return this._phoneVerifiedAt ? new Date(this._phoneVerifiedAt) : undefined; }
  public getKycVerifiedAt(): Date | undefined { return this._kycVerifiedAt ? new Date(this._kycVerifiedAt) : undefined; }
  public getMfaEnabledAt(): Date | undefined { return this._mfaEnabledAt ? new Date(this._mfaEnabledAt) : undefined; }
  public getDeletedAt(): Date | undefined { return this._deletedAt ? new Date(this._deletedAt) : undefined; }
  public getSuspendedAt(): Date | undefined { return this._suspendedAt ? new Date(this._suspendedAt) : undefined; }
  public getSuspendedReason(): string | undefined { return this._suspendedReason; }
  public getPreferredLanguage(): 'en' | 'bn' { return this._preferredLanguage; }
  public getPreferredDistrict(): string | undefined { return this._preferredDistrict; }
  public getPreferredUpazila(): string | undefined { return this._preferredUpazila; }

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
      preferredLanguage: this._preferredLanguage,
      preferredDistrict: this._preferredDistrict,
      preferredUpazila: this._preferredUpazila,
      isActive: this.isActive(),
      isLocked: this.isLocked(),
      isSuspended: this.isSuspended(),
      isDeleted: this.isDeleted(),
      isAdmin: this.isAdmin(),
      isSeller: this.isSeller(),
      isFullyVerified: this.isFullyVerified(),
      // ⚠️ Password is intentionally excluded from JSON
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

export type { UserProps };
