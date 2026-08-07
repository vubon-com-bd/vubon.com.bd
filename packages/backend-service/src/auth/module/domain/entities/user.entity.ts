import { UserRole, UserStatus } from '@vubon/shared-types';
import { USER_ROLES, USER_STATUSES } from '@vubon/shared-constants';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { Phone } from '../value-objects/phone.vo';
import { UserId } from '../value-objects/user-id.vo';
import { BaseEntity } from './base.entity';

/**
 * User profile update data interface
 */
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: Phone;
  avatar?: string;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  language: 'en' | 'bn';
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

/**
 * User Entity
 * Represents a user in the system with all domain logic
 */
export class User extends BaseEntity {
  private _email: Email;
  private _passwordHash: string;
  private _firstName: string;
  private _lastName: string;
  private _phone?: Phone;
  private _avatar?: string;
  private _role: UserRole;
  private _status: UserStatus;
  private _isEmailVerified: boolean;
  private _isPhoneVerified: boolean;
  private _preferences: UserPreferences;
  private _lastLoginAt?: Date;
  private _deletedAt?: Date;
  private _deletionReason?: string;
  private _suspensionReason?: string;
  private _banReason?: string;

  private constructor(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    status: UserStatus,
    preferences: UserPreferences,
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
    this._isEmailVerified = false;
    this._isPhoneVerified = false;
    this._preferences = preferences;
  }

  /**
   * Create a new User instance
   */
  static create(
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole = USER_ROLES.USER,
    preferences?: Partial<UserPreferences>
  ): User {
    const id = UserId.generate().getValue();
    const defaultPreferences: UserPreferences = {
      language: 'en',
      timezone: 'UTC',
      currency: 'BDT',
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    };

    const mergedPreferences = {
      ...defaultPreferences,
      ...preferences,
    };

    return new User(
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      USER_STATUSES.ACTIVE,
      mergedPreferences
    );
  }

  /**
   * Reconstruct a User from persistence
   */
  static reconstitute(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    status: UserStatus,
    isEmailVerified: boolean,
    isPhoneVerified: boolean,
    preferences: UserPreferences,
    lastLoginAt?: Date,
    deletedAt?: Date,
    deletionReason?: string,
    suspensionReason?: string,
    banReason?: string,
    phone?: Phone,
    avatar?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): User {
    const user = new User(
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      status,
      preferences,
      createdAt,
      updatedAt
    );
    user._isEmailVerified = isEmailVerified;
    user._isPhoneVerified = isPhoneVerified;
    user._lastLoginAt = lastLoginAt;
    user._deletedAt = deletedAt;
    user._deletionReason = deletionReason;
    user._suspensionReason = suspensionReason;
    user._banReason = banReason;
    user._phone = phone;
    user._avatar = avatar;
    return user;
  }

  /**
   * Suspend the user account
   */
  suspend(reason: string): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot suspend a deleted account');
    }

    if (this._status === USER_STATUSES.BANNED) {
      throw new Error('Cannot suspend a banned account');
    }

    this._status = USER_STATUSES.SUSPENDED;
    this._suspensionReason = reason;
    this.touch();
  }

  /**
   * Activate the user account
   */
  activate(): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot activate a deleted account');
    }

    this._status = USER_STATUSES.ACTIVE;
    this._suspensionReason = undefined;
    this._banReason = undefined;
    this.touch();
  }

  /**
   * Ban the user account
   */
  ban(reason: string): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot ban a deleted account');
    }

    this._status = USER_STATUSES.BANNED;
    this._banReason = reason;
    this.touch();
  }

  /**
   * Change user role
   */
  changeRole(newRole: UserRole): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot change role for a deleted account');
    }

    this._role = newRole;
    this.touch();
  }

  /**
   * Verify user email
   */
  verifyEmail(): void {
    this._isEmailVerified = true;
    this.touch();
  }

  /**
   * Verify user phone
   */
  verifyPhone(): void {
    this._isPhoneVerified = true;
    this.touch();
  }

  /**
   * Update user profile
   */
  updateProfile(data: UpdateProfileData): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot update profile for a deleted account');
    }

    if (this._status === USER_STATUSES.BANNED) {
      throw new Error('Cannot update profile for a banned account');
    }

    if (data.firstName !== undefined) {
      this._firstName = data.firstName;
    }

    if (data.lastName !== undefined) {
      this._lastName = data.lastName;
    }

    if (data.phone !== undefined) {
      this._phone = data.phone;
    }

    if (data.avatar !== undefined) {
      this._avatar = data.avatar;
    }

    this.touch();
  }

  /**
   * Update user preferences
   */
  updatePreferences(preferences: UserPreferences): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot update preferences for a deleted account');
    }

    this._preferences = { ...preferences };
    this.touch();
  }

  /**
   * Mark account for deletion (soft delete)
   */
  markForDeletion(reason?: string): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Account is already deleted');
    }

    this._status = USER_STATUSES.DELETED;
    this._deletedAt = new Date();
    this._deletionReason = reason;
    this.touch();
  }

  /**
   * Restore account (if within grace period)
   */
  restoreAccount(): void {
    if (this._status !== USER_STATUSES.DELETED) {
      throw new Error('Account is not deleted');
    }

    if (!this._deletedAt) {
      throw new Error('Account deletion date not found');
    }

    // 30 days grace period
    const gracePeriodDays = 30;
    const daysSinceDeletion = (Date.now() - this._deletedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceDeletion > gracePeriodDays) {
      throw new Error(`Account cannot be restored after ${gracePeriodDays} days grace period`);
    }

    this._status = USER_STATUSES.ACTIVE;
    this._deletedAt = undefined;
    this._deletionReason = undefined;
    this.touch();
  }

  /**
   * Update password hash
   */
  updatePasswordHash(newPasswordHash: string): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot update password for a deleted account');
    }

    this._passwordHash = newPasswordHash;
    this.touch();
  }

  /**
   * Update email (requires verification)
   */
  updateEmail(newEmail: Email): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot update email for a deleted account');
    }

    this._email = newEmail;
    this._isEmailVerified = false;
    this.touch();
  }

  /**
   * Update phone (requires verification)
   */
  updatePhone(newPhone: Phone): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot update phone for a deleted account');
    }

    this._phone = newPhone;
    this._isPhoneVerified = false;
    this.touch();
  }

  /**
   * Record login activity
   */
  recordLogin(): void {
    if (this._status === USER_STATUSES.DELETED) {
      throw new Error('Cannot login to a deleted account');
    }

    this._lastLoginAt = new Date();
    this.touch();
  }

  /**
   * Check if account is active
   */
  isActive(): boolean {
    return this._status === USER_STATUSES.ACTIVE;
  }

  /**
   * Check if account is suspended
   */
  isSuspended(): boolean {
    return this._status === USER_STATUSES.SUSPENDED;
  }

  /**
   * Check if account is banned
   */
  isBanned(): boolean {
    return this._status === USER_STATUSES.BANNED;
  }

  /**
   * Check if account is deleted
   */
  isDeleted(): boolean {
    return this._status === USER_STATUSES.DELETED;
  }

  /**
   * Check if account can be restored
   */
  canRestore(): boolean {
    if (this._status !== USER_STATUSES.DELETED) {
      return false;
    }

    if (!this._deletedAt) {
      return false;
    }

    const gracePeriodDays = 30;
    const daysSinceDeletion = (Date.now() - this._deletedAt.getTime()) / (1000 * 60 * 60 * 24);

    return daysSinceDeletion <= gracePeriodDays;
  }

  /**
   * Getters
   */
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

  get avatar(): string | undefined {
    return this._avatar;
  }

  get role(): UserRole {
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

  get preferences(): UserPreferences {
    return { ...this._preferences };
  }

  get lastLoginAt(): Date | undefined {
    return this._lastLoginAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  get deletionReason(): string | undefined {
    return this._deletionReason;
  }

  get suspensionReason(): string | undefined {
    return this._suspensionReason;
  }

  get banReason(): string | undefined {
    return this._banReason;
  }
}
