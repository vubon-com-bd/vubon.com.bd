// packages/backend-service/src/auth/module/domain/entities/user.entity.ts
import { randomUUID } from 'crypto';
import { Password, Email, Phone } from '../value-objects';
import { BaseEntity } from './base.entity';
import { DEFAULT_ROLES } from '@vubon/shared-constants';
import type { DefaultRole } from '@vubon/shared-constants';

/**
 * User status types
 */
export type UserStatus =
  'pending_verification' | 'active' | 'suspended' | 'deactivated' | 'deleted';

/**
 * User metadata interface
 */
export interface UserMetadata {
  /** Registration IP address */
  registrationIp?: string;
  /** Registration user agent */
  registrationUserAgent?: string;
  /** Last login IP address */
  lastLoginIp?: string;
  /** Last login user agent */
  lastLoginUserAgent?: string;
  /** Last login timestamp */
  lastLoginAt?: Date;
  /** Password last changed timestamp */
  passwordChangedAt?: Date;
  /** Account deletion requested timestamp */
  deletionRequestedAt?: Date;
  /** Account deletion scheduled timestamp */
  deletionScheduledAt?: Date;
  /** Additional metadata */
  additional?: Record<string, unknown>;
}

/**
 * User Entity
 * Represents a user in the system with all business rules and behaviors
 */
export class User extends BaseEntity {
  private _email: Email;
  private _passwordHash: string;
  private _firstName: string;
  private _lastName: string;
  private _phone?: Phone;
  private _role: DefaultRole;
  private _status: UserStatus;
  private _isEmailVerified: boolean;
  private _isPhoneVerified: boolean;
  private _metadata: UserMetadata;

  private constructor(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: DefaultRole,
    status: UserStatus,
    isEmailVerified: boolean,
    isPhoneVerified: boolean,
    metadata: UserMetadata,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._email = email;
    this._passwordHash = passwordHash;
    this._firstName = firstName;
    this._lastName = lastName;
    this._role = role;
    this._status = status;
    this._isEmailVerified = isEmailVerified;
    this._isPhoneVerified = isPhoneVerified;
    this._metadata = metadata;
  }

  /**
   * Static factory method to register a new user
   * Creates a new User entity with pending verification status
   *
   * @param email - Validated email address
   * @param passwordHash - Hashed password (already hashed by service layer)
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param phone - Optional validated phone number
   * @param metadata - Optional registration metadata
   * @returns A new User entity
   */
  static register(
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    phone?: Phone,
    metadata?: Partial<UserMetadata>
  ): User {
    if (!passwordHash || typeof passwordHash !== 'string') {
      throw new Error('Password hash is required');
    }

    // Validate name format
    if (!firstName || firstName.trim().length === 0) {
      throw new Error('First name is required');
    }

    if (!lastName || lastName.trim().length === 0) {
      throw new Error('Last name is required');
    }

    if (firstName.length > 50) {
      throw new Error('First name cannot exceed 50 characters');
    }

    if (lastName.length > 50) {
      throw new Error('Last name cannot exceed 50 characters');
    }

    const user = new User(
      randomUUID(),
      email,
      passwordHash,
      firstName.trim(),
      lastName.trim(),
      DEFAULT_ROLES.USER,
      'pending_verification',
      false,
      false,
      {
        registrationIp: metadata?.registrationIp,
        registrationUserAgent: metadata?.registrationUserAgent,
        passwordChangedAt: new Date(),
        ...metadata,
      }
    );

    return user;
  }

  /**
   * Reconstruct a User entity from persistence
   * Used by repositories to hydrate entities
   */
  static reconstitute(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: DefaultRole,
    status: UserStatus,
    isEmailVerified: boolean,
    isPhoneVerified: boolean,
    metadata: UserMetadata,
    createdAt?: Date,
    updatedAt?: Date
  ): User {
    return new User(
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      status,
      isEmailVerified,
      isPhoneVerified,
      metadata,
      createdAt,
      updatedAt
    );
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get email(): Email {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get phone(): Phone | undefined {
    return this._phone;
  }

  get role(): DefaultRole {
    return this._role;
  }

  get status(): UserStatus {
    return this._status;
  }

  get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }

  get isPhoneVerified(): boolean {
    return this._isPhoneVerified;
  }

  get metadata(): UserMetadata {
    return { ...this._metadata };
  }

  // ============================================================================
  // Business Logic Methods
  // ============================================================================

  /**
   * Verify the user's email address
   * Only allowed for pending_verification or active users
   * @throws {Error} If already verified or invalid status
   */
  verifyEmail(): void {
    if (this._isEmailVerified) {
      throw new Error('Email is already verified');
    }

    if (this._status === 'deleted' || this._status === 'deactivated') {
      throw new Error(`Cannot verify email for ${this._status} account`);
    }

    this._isEmailVerified = true;

    // If phone is also verified and status is pending, activate the user
    if (this._isPhoneVerified && this._status === 'pending_verification') {
      this._status = 'active';
    }

    this.touch();
  }

  /**
   * Verify the user's phone number
   * Only allowed for pending_verification or active users
   * @throws {Error} If phone is not set, already verified, or invalid status
   */
  verifyPhone(): void {
    if (!this._phone) {
      throw new Error('Phone number is not set for this user');
    }

    if (this._isPhoneVerified) {
      throw new Error('Phone is already verified');
    }

    if (this._status === 'deleted' || this._status === 'deactivated') {
      throw new Error(`Cannot verify phone for ${this._status} account`);
    }

    this._isPhoneVerified = true;

    // If email is also verified and status is pending, activate the user
    if (this._isEmailVerified && this._status === 'pending_verification') {
      this._status = 'active';
    }

    this.touch();
  }

  /**
   * Activate the user account
   * Can only activate pending_verification or suspended accounts
   * @throws {Error} If already active or invalid status
   */
  activate(): void {
    if (this._status === 'active') {
      throw new Error('Account is already active');
    }

    if (this._status === 'deleted' || this._status === 'deactivated') {
      throw new Error(`Cannot activate ${this._status} account`);
    }

    if (this._status === 'pending_verification' && !this._isEmailVerified) {
      throw new Error('Email must be verified before activating account');
    }

    this._status = 'active';
    this.touch();
  }

  /**
   * Suspend the user account
   * Can only suspend active or pending_verification accounts
   * @param reason - Optional reason for suspension
   * @throws {Error} If already suspended, deleted, or deactivated
   */
  suspend(reason?: string): void {
    if (this._status === 'suspended') {
      throw new Error('Account is already suspended');
    }

    if (this._status === 'deleted' || this._status === 'deactivated') {
      throw new Error(`Cannot suspend ${this._status} account`);
    }

    if (this._status === 'active' || this._status === 'pending_verification') {
      this._status = 'suspended';

      // Store suspension reason in metadata
      if (reason) {
        this._metadata.additional = {
          ...this._metadata.additional,
          suspensionReason: reason,
          suspendedAt: new Date(),
        };
      }
    }

    this.touch();
  }

  /**
   * Deactivate the user account (soft delete)
   * Can deactivate any account except already deleted
   * @param reason - Optional reason for deactivation
   * @throws {Error} If already deactivated or deleted
   */
  deactivate(reason?: string): void {
    if (this._status === 'deactivated') {
      throw new Error('Account is already deactivated');
    }

    if (this._status === 'deleted') {
      throw new Error('Cannot deactivate a deleted account');
    }

    this._status = 'deactivated';

    // Store deactivation reason in metadata
    if (reason) {
      this._metadata.additional = {
        ...this._metadata.additional,
        deactivationReason: reason,
        deactivatedAt: new Date(),
      };
    }

    this.touch();
  }

  /**
   * Mark the account for deletion (soft delete)
   * Sets status to deleted and records deletion metadata
   * @param reason - Optional reason for deletion
   * @throws {Error} If already deleted
   */
  delete(reason?: string): void {
    if (this._status === 'deleted') {
      throw new Error('Account is already deleted');
    }

    this._status = 'deleted';
    this._metadata.deletionRequestedAt = new Date();

    if (reason) {
      this._metadata.additional = {
        ...this._metadata.additional,
        deletionReason: reason,
      };
    }

    this.touch();
  }

  /**
   * Change the user's password
   * Updates the password hash and records the change timestamp
   * @param newPasswordHash - The new hashed password
   * @throws {Error} If user account is deleted or deactivated
   */
  changePassword(newPasswordHash: string): void {
    if (!newPasswordHash || typeof newPasswordHash !== 'string') {
      throw new Error('New password hash is required');
    }

    if (this._status === 'deleted') {
      throw new Error('Cannot change password for deleted account');
    }

    if (this._status === 'deactivated') {
      throw new Error('Cannot change password for deactivated account');
    }

    this._passwordHash = newPasswordHash;
    this._metadata.passwordChangedAt = new Date();

    this.touch();
  }

  /**
   * Update the user's profile information
   * @param firstName - Optional new first name
   * @param lastName - Optional new last name
   * @param phone - Optional new phone number
   * @throws {Error} If user account is deleted or deactivated
   */
  updateProfile(firstName?: string, lastName?: string, phone?: Phone): void {
    if (this._status === 'deleted') {
      throw new Error('Cannot update profile for deleted account');
    }

    if (this._status === 'deactivated') {
      throw new Error('Cannot update profile for deactivated account');
    }

    if (firstName !== undefined) {
      if (!firstName.trim()) {
        throw new Error('First name cannot be empty');
      }
      if (firstName.length > 50) {
        throw new Error('First name cannot exceed 50 characters');
      }
      this._firstName = firstName.trim();
    }

    if (lastName !== undefined) {
      if (!lastName.trim()) {
        throw new Error('Last name cannot be empty');
      }
      if (lastName.length > 50) {
        throw new Error('Last name cannot exceed 50 characters');
      }
      this._lastName = lastName.trim();
    }

    if (phone !== undefined) {
      this._phone = phone;
      // If phone was set and email is verified, check if we need to activate
      if (this._isEmailVerified && this._status === 'pending_verification') {
        this._status = 'active';
      }
    }

    this.touch();
  }

  /**
   * Update the user's role
   * @param role - New role
   * @throws {Error} If user account is deleted or deactivated, or role is invalid
   */
  updateRole(role: DefaultRole): void {
    if (this._status === 'deleted') {
      throw new Error('Cannot update role for deleted account');
    }

    if (this._status === 'deactivated') {
      throw new Error('Cannot update role for deactivated account');
    }

    // Validate role (this will be caught by TypeScript, but we add runtime check)
    const validRoles = Object.values(DEFAULT_ROLES);
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }

    this._role = role;
    this.touch();
  }

  /**
   * Record a successful login
   * Updates last login timestamp, IP, and user agent in metadata
   * @param ipAddress - The IP address of the login
   * @param userAgent - The user agent of the login
   */
  recordLogin(ipAddress: string, userAgent: string): void {
    if (this._status === 'deleted') {
      // Don't throw, just skip logging for deleted accounts
      return;
    }

    this._metadata.lastLoginIp = ipAddress;
    this._metadata.lastLoginUserAgent = userAgent;
    this._metadata.lastLoginAt = new Date();

    // If account was suspended, activate it on successful login
    if (this._status === 'suspended') {
      this._status = 'active';
    }

    this.touch();
  }

  /**
   * Check if the user account is active
   */
  isActive(): boolean {
    return this._status === 'active';
  }

  /**
   * Check if the user account is pending verification
   */
  isPendingVerification(): boolean {
    return this._status === 'pending_verification';
  }

  /**
   * Check if the user account is suspended
   */
  isSuspended(): boolean {
    return this._status === 'suspended';
  }

  /**
   * Check if the user account is deactivated
   */
  isDeactivated(): boolean {
    return this._status === 'deactivated';
  }

  /**
   * Check if the user account is deleted
   */
  isDeleted(): boolean {
    return this._status === 'deleted';
  }

  /**
   * Check if the user can login
   * User can login if: active, pending_verification (if email verified), or suspended (but recorded login will reactivate)
   */
  canLogin(): boolean {
    if (this._status === 'deleted' || this._status === 'deactivated') {
      return false;
    }

    if (this._status === 'pending_verification' && !this._isEmailVerified) {
      return false;
    }

    // Suspended users can login, but will be reactivated on successful login
    return true;
  }

  /**
   * Get a complete snapshot of the user's profile
   */
  getProfile(): {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string | undefined;
    role: DefaultRole;
    status: UserStatus;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      email: this._email.getValue(),
      firstName: this._firstName,
      lastName: this._lastName,
      fullName: this.fullName,
      phone: this._phone?.getValue(),
      role: this._role,
      status: this._status,
      isEmailVerified: this._isEmailVerified,
      isPhoneVerified: this._isPhoneVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Get a minimal public profile (safe for API responses)
   */
  getPublicProfile(): {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: DefaultRole;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  } {
    return {
      id: this.id,
      email: this._email.getValue(),
      firstName: this._firstName,
      lastName: this._lastName,
      fullName: this.fullName,
      role: this._role,
      isEmailVerified: this._isEmailVerified,
      isPhoneVerified: this._isPhoneVerified,
    };
  }

  /**
   * Check if two User entities are equal (compare by id)
   */
  equals(other: User | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof User)) {
      return false;
    }

    return super.equals(other);
  }

  /**
   * Create a deep clone of the User entity
   */
  clone(): User {
    return new User(
      this.id,
      this._email,
      this._passwordHash,
      this._firstName,
      this._lastName,
      this._role,
      this._status,
      this._isEmailVerified,
      this._isPhoneVerified,
      {
        registrationIp: this._metadata.registrationIp,
        registrationUserAgent: this._metadata.registrationUserAgent,
        lastLoginIp: this._metadata.lastLoginIp,
        lastLoginUserAgent: this._metadata.lastLoginUserAgent,
        lastLoginAt: this._metadata.lastLoginAt,
        passwordChangedAt: this._metadata.passwordChangedAt,
        deletionRequestedAt: this._metadata.deletionRequestedAt,
        deletionScheduledAt: this._metadata.deletionScheduledAt,
        additional: this._metadata.additional ? { ...this._metadata.additional } : undefined,
      },
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
