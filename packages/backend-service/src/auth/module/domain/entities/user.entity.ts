import type { UserRole, UserStatus } from '@vubon/shared-types';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';
import { BaseEntity } from './base.entity';

/**
 * Update profile data interface
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
 * Default user preferences
 */
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'en',
  timezone: 'Asia/Dhaka',
  currency: 'BDT',
  emailNotifications: true,
  smsNotifications: true,
  marketingEmails: false,
};

/**
 * Valid user roles
 */
export const VALID_USER_ROLES = [
  'guest',
  'customer',
  'user',
  'moderator',
  'manager',
  'support',
  'admin',
  'developer',
  'super_admin',
] as const;

export type ValidUserRole = (typeof VALID_USER_ROLES)[number];

/**
 * User Entity
 * Represents a user in the system
 */
export class User extends BaseEntity {
  private _email: Email;
  private _passwordHash: string;
  private _firstName: string;
  private _lastName: string;
  private _phone: Phone | null;
  private _avatar: string | null;
  private _role: UserRole;
  private _status: UserStatus;
  private _isEmailVerified: boolean;
  private _isPhoneVerified: boolean;
  private _preferences: UserPreferences;
  private _lastLoginAt: Date | null;
  private _deletedAt: Date | null;
  private _deletionReason: string | null;
  private _suspensionReason: string | null;
  private _banReason: string | null;

  private constructor(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    status: UserStatus,
    preferences: UserPreferences,
    phone: Phone | null = null,
    avatar: string | null = null,
    isEmailVerified: boolean = false,
    isPhoneVerified: boolean = false,
    lastLoginAt: Date | null = null,
    deletedAt: Date | null = null,
    deletionReason: string | null = null,
    suspensionReason: string | null = null,
    banReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._email = email;
    this._passwordHash = passwordHash;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phone = phone;
    this._avatar = avatar;
    this._role = role;
    this._status = status;
    this._isEmailVerified = isEmailVerified;
    this._isPhoneVerified = isPhoneVerified;
    this._preferences = preferences;
    this._lastLoginAt = lastLoginAt;
    this._deletedAt = deletedAt;
    this._deletionReason = deletionReason;
    this._suspensionReason = suspensionReason;
    this._banReason = banReason;
  }

  /**
   * Create a new user
   */
  static create(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    preferences: UserPreferences = DEFAULT_USER_PREFERENCES,
    phone: Phone | null = null,
    avatar: string | null = null
  ): User {
    return new User(
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      'user',
      'pending',
      preferences,
      phone,
      avatar
    );
  }

  /**
   * Reconstruct a user from persistence
   */
  static reconstruct(
    id: string,
    email: Email,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    status: UserStatus,
    preferences: UserPreferences,
    phone: Phone | null = null,
    avatar: string | null = null,
    isEmailVerified: boolean = false,
    isPhoneVerified: boolean = false,
    lastLoginAt: Date | null = null,
    deletedAt: Date | null = null,
    deletionReason: string | null = null,
    suspensionReason: string | null = null,
    banReason: string | null = null,
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
      preferences,
      phone,
      avatar,
      isEmailVerified,
      isPhoneVerified,
      lastLoginAt,
      deletedAt,
      deletionReason,
      suspensionReason,
      banReason,
      createdAt,
      updatedAt
    );
  }

  // Getters
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

  get phone(): Phone | null {
    return this._phone;
  }

  get avatar(): string | null {
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

  get lastLoginAt(): Date | null {
    return this._lastLoginAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get deletionReason(): string | null {
    return this._deletionReason;
  }

  get suspensionReason(): string | null {
    return this._suspensionReason;
  }

  get banReason(): string | null {
    return this._banReason;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get isActive(): boolean {
    return this._status === 'active';
  }

  get isSuspended(): boolean {
    return this._status === 'suspended';
  }

  get isBanned(): boolean {
    return this._status === 'banned';
  }

  get isDeleted(): boolean {
    return this._status === 'deleted' && this._deletedAt !== null;
  }

  get isPendingVerification(): boolean {
    return this._status === 'pending';
  }

  get isDeletable(): boolean {
    return this._status !== 'deleted' && this._status !== 'banned';
  }

  // Domain methods
  /**
   * Update user password
   */
  updatePassword(newPasswordHash: string): void {
    if (!newPasswordHash || typeof newPasswordHash !== 'string') {
      throw new Error('Password hash must be a non-empty string');
    }
    this._passwordHash = newPasswordHash;
    this.touch();
  }

  /**
   * Suspend user account
   */
  suspend(reason: string): void {
    if (this.isBanned) {
      throw new Error('Cannot suspend a banned account');
    }

    if (this.isDeleted) {
      throw new Error('Cannot suspend a deleted account');
    }

    if (this.isSuspended) {
      throw new Error('Account is already suspended');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Suspension reason is required');
    }

    if (reason.length > 500) {
      throw new Error('Suspension reason cannot exceed 500 characters');
    }

    this._status = 'suspended';
    this._suspensionReason = reason;
    this.touch();
  }

  /**
   * Activate user account
   */
  activate(): void {
    if (this.isBanned) {
      throw new Error('Cannot activate a banned account');
    }

    if (this.isDeleted) {
      throw new Error('Cannot activate a deleted account');
    }

    if (this.isActive) {
      throw new Error('Account is already active');
    }

    if (this.isPendingVerification && !this._isEmailVerified) {
      throw new Error('Cannot activate account without verified email');
    }

    this._status = 'active';
    this._suspensionReason = null;
    this.touch();
  }

  /**
   * Ban user account
   */
  ban(reason: string): void {
    if (this.isBanned) {
      throw new Error('Account is already banned');
    }

    if (this.isDeleted) {
      throw new Error('Cannot ban a deleted account');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Ban reason is required');
    }

    if (reason.length > 500) {
      throw new Error('Ban reason cannot exceed 500 characters');
    }

    this._status = 'banned';
    this._banReason = reason;
    this.touch();
  }

  /**
   * Change user role
   */
  changeRole(newRole: UserRole): void {
    if (this.isDeleted) {
      throw new Error('Cannot change role of a deleted account');
    }

    if (this.isBanned) {
      throw new Error('Cannot change role of a banned account');
    }

    if (!newRole || typeof newRole !== 'string') {
      throw new Error('Role is required');
    }

    // Validate role from valid roles list
    if (!VALID_USER_ROLES.includes(newRole as ValidUserRole)) {
      throw new Error(`Invalid role: ${newRole}`);
    }

    this._role = newRole;
    this.touch();
  }

  /**
   * Mark email as verified
   */
  verifyEmail(): void {
    if (this._isEmailVerified) {
      throw new Error('Email is already verified');
    }

    this._isEmailVerified = true;

    // If user is pending verification and email is verified, activate
    if (this.isPendingVerification) {
      this._status = 'active';
      this._suspensionReason = null;
    }

    this.touch();
  }

  /**
   * Mark phone as verified
   */
  verifyPhone(): void {
    if (this._isPhoneVerified) {
      throw new Error('Phone is already verified');
    }

    if (!this._phone) {
      throw new Error('Cannot verify phone that is not set');
    }

    this._isPhoneVerified = true;
    this.touch();
  }

  /**
   * Update user profile
   */
  updateProfile(data: UpdateProfileData): void {
    if (this.isDeleted) {
      throw new Error('Cannot update profile of a deleted account');
    }

    if (this.isBanned) {
      throw new Error('Cannot update profile of a banned account');
    }

    if (data.firstName !== undefined) {
      if (!data.firstName || typeof data.firstName !== 'string') {
        throw new Error('First name must be a non-empty string');
      }
      if (data.firstName.length > 50) {
        throw new Error('First name cannot exceed 50 characters');
      }
      this._firstName = data.firstName;
    }

    if (data.lastName !== undefined) {
      if (!data.lastName || typeof data.lastName !== 'string') {
        throw new Error('Last name must be a non-empty string');
      }
      if (data.lastName.length > 50) {
        throw new Error('Last name cannot exceed 50 characters');
      }
      this._lastName = data.lastName;
    }

    if (data.phone !== undefined) {
      this._phone = data.phone;
      // If phone was verified and phone is changed, mark as unverified
      if (this._isPhoneVerified && data.phone) {
        this._isPhoneVerified = false;
      }
    }

    if (data.avatar !== undefined) {
      if (data.avatar && typeof data.avatar !== 'string') {
        throw new Error('Avatar must be a string');
      }
      if (data.avatar && data.avatar.length > 500) {
        throw new Error('Avatar URL cannot exceed 500 characters');
      }
      this._avatar = data.avatar;
    }

    this.touch();
  }

  /**
   * Update user preferences
   */
  updatePreferences(preferences: Partial<UserPreferences>): void {
    if (this.isDeleted) {
      throw new Error('Cannot update preferences of a deleted account');
    }

    if (this.isBanned) {
      throw new Error('Cannot update preferences of a banned account');
    }

    if (!preferences || typeof preferences !== 'object') {
      throw new Error('Preferences must be a valid object');
    }

    // Validate preferences
    if (preferences.language !== undefined && !['en', 'bn'].includes(preferences.language)) {
      throw new Error('Language must be either "en" or "bn"');
    }

    if (preferences.timezone !== undefined && typeof preferences.timezone !== 'string') {
      throw new Error('Timezone must be a string');
    }

    if (preferences.currency !== undefined && typeof preferences.currency !== 'string') {
      throw new Error('Currency must be a string');
    }

    if (
      preferences.emailNotifications !== undefined &&
      typeof preferences.emailNotifications !== 'boolean'
    ) {
      throw new Error('Email notifications must be a boolean');
    }

    if (
      preferences.smsNotifications !== undefined &&
      typeof preferences.smsNotifications !== 'boolean'
    ) {
      throw new Error('SMS notifications must be a boolean');
    }

    if (
      preferences.marketingEmails !== undefined &&
      typeof preferences.marketingEmails !== 'boolean'
    ) {
      throw new Error('Marketing emails must be a boolean');
    }

    this._preferences = {
      ...this._preferences,
      ...preferences,
    };
    this.touch();
  }

  /**
   * Mark account for deletion
   */
  markForDeletion(reason?: string): void {
    if (this.isDeleted) {
      throw new Error('Account is already marked for deletion');
    }

    if (this.isBanned) {
      throw new Error('Cannot delete a banned account');
    }

    if (reason !== undefined && (typeof reason !== 'string' || reason.length > 500)) {
      throw new Error('Deletion reason cannot exceed 500 characters');
    }

    this._status = 'deleted';
    this._deletedAt = new Date();
    this._deletionReason = reason || null;
    this.touch();
  }

  /**
   * Restore account if within grace period
   */
  restoreAccount(): void {
    if (!this.isDeleted) {
      throw new Error('Account is not deleted');
    }

    if (!this._deletedAt) {
      throw new Error('Account deletion date is missing');
    }

    const gracePeriodDays = 30;
    const deletionDate = this._deletedAt;
    const currentDate = new Date();
    const daysSinceDeletion = Math.floor(
      (currentDate.getTime() - deletionDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceDeletion > gracePeriodDays) {
      throw new Error(
        `Account cannot be restored after ${gracePeriodDays} days of deletion (${daysSinceDeletion} days passed)`
      );
    }

    this._status = 'active';
    this._deletedAt = null;
    this._deletionReason = null;
    this._suspensionReason = null;
    this.touch();
  }

  /**
   * Record last login
   */
  recordLogin(): void {
    if (this.isSuspended) {
      throw new Error('Cannot login to a suspended account');
    }

    if (this.isBanned) {
      throw new Error('Cannot login to a banned account');
    }

    if (this.isDeleted) {
      throw new Error('Cannot login to a deleted account');
    }

    this._lastLoginAt = new Date();
    this.touch();
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: UserRole): boolean {
    return this._role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: UserRole[]): boolean {
    return roles.includes(this._role);
  }

  /**
   * Get user status label
   */
  getStatusLabel(): string {
    const statusLabels: Record<UserStatus, string> = {
      pending: 'Pending Verification',
      active: 'Active',
      suspended: 'Suspended',
      banned: 'Banned',
      deleted: 'Deleted',
      inactive: 'Inactive',
    };
    return statusLabels[this._status] || this._status;
  }

  /**
   * Get user role label
   */
  getRoleLabel(): string {
    const roleLabels: Record<UserRole, string> = {
      guest: 'Guest',
      customer: 'Customer',
      user: 'User',
      moderator: 'Moderator',
      manager: 'Manager',
      support: 'Support',
      admin: 'Admin',
      developer: 'Developer',
      super_admin: 'Super Admin',
    };
    return roleLabels[this._role] || this._role;
  }

  /**
   * Get user summary
   */
  getSummary(): {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    status: UserStatus;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      email: this._email.toString(),
      fullName: this.fullName,
      role: this._role,
      status: this._status,
      isEmailVerified: this._isEmailVerified,
      isPhoneVerified: this._isPhoneVerified,
      lastLoginAt: this._lastLoginAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two User entities
   */
  equals(other: User | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof User)) {
      return false;
    }
    return this.id === other.id;
  }
}
