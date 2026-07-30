/**
 * User Entity
 * Core domain entity representing a registered user
 */

import { BaseEntity } from './base.entity.js';
import {
  DEFAULT_ROLE,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@vubon/auth-shared-constants';

export interface UserProps {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role?: UserRole;
  status?: UserStatus;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  metadata?: Record<string, unknown> | null;
}

export class User extends BaseEntity {
  public email: string;
  public passwordHash: string;
  public firstName: string;
  public lastName: string;
  public phone: string | null;
  public role: UserRole;
  public status: UserStatus;
  public isEmailVerified: boolean;
  public isPhoneVerified: boolean;
  public metadata: Record<string, unknown> | null;

  constructor(props: UserProps, id?: string) {
    super(id);
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phone = props.phone || null;
    this.role = props.role || DEFAULT_ROLE;
    this.status = props.status || USER_STATUS.PENDING_VERIFICATION;
    this.isEmailVerified = props.isEmailVerified || false;
    this.isPhoneVerified = props.isPhoneVerified || false;
    this.metadata = props.metadata || null;
  }

  /**
   * Static factory method for user registration
   * Creates a new user with PENDING_VERIFICATION status
   */
  public static register(
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    phone?: string | null
  ): User {
    return new User({
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      role: DEFAULT_ROLE,
      status: USER_STATUS.PENDING_VERIFICATION,
      isEmailVerified: false,
      isPhoneVerified: false,
    });
  }

  /**
   * Verify user's email address
   * Updates status to ACTIVE if all verifications are complete
   */
  public verifyEmail(): void {
    this.isEmailVerified = true;
    this.touch();

    // Auto-activate if phone is also verified or not required
    if (this.isPhoneVerified || !this.phone) {
      this.status = USER_STATUS.ACTIVE;
    }
  }

  /**
   * Verify user's phone number
   * Updates status to ACTIVE if all verifications are complete
   */
  public verifyPhone(): void {
    if (!this.phone) {
      throw new Error('Cannot verify phone: User has no phone number');
    }
    this.isPhoneVerified = true;
    this.touch();

    // Auto-activate if email is also verified
    if (this.isEmailVerified) {
      this.status = USER_STATUS.ACTIVE;
    }
  }

  /**
   * Activate user account
   * Only allowed if email is verified
   */
  public activate(): void {
    if (!this.isEmailVerified) {
      throw new Error('Cannot activate user: Email not verified');
    }
    this.status = USER_STATUS.ACTIVE;
    this.touch();
  }

  /**
   * Suspend user account
   */
  public suspend(): void {
    if (this.status === USER_STATUS.SUSPENDED) {
      return;
    }
    this.status = USER_STATUS.SUSPENDED;
    this.touch();
  }

  /**
   * Reactivate suspended user
   * Only allowed if email is verified
   */
  public reactivate(): void {
    if (this.status !== USER_STATUS.SUSPENDED) {
      return;
    }
    if (!this.isEmailVerified) {
      throw new Error('Cannot reactivate user: Email not verified');
    }
    this.status = USER_STATUS.ACTIVE;
    this.touch();
  }

  /**
   * Deactivate user account (soft delete)
   */
  public deactivate(): void {
    this.status = USER_STATUS.DEACTIVATED;
    this.touch();
  }

  /**
   * Update user profile information
   */
  public updateProfile(data: {
    firstName?: string;
    lastName?: string;
    phone?: string | null;
    metadata?: Record<string, unknown> | null;
  }): void {
    if (data.firstName !== undefined) {
      this.firstName = data.firstName;
    }
    if (data.lastName !== undefined) {
      this.lastName = data.lastName;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    if (data.metadata !== undefined) {
      this.metadata = data.metadata;
    }
    this.touch();
  }

  /**
   * Update password hash
   * Used when user changes password
   */
  public updatePasswordHash(newPasswordHash: string): void {
    if (!newPasswordHash) {
      throw new Error('Password hash is required');
    }
    this.passwordHash = newPasswordHash;
    this.touch();
  }

  /**
   * Get full name
   */
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Check if user is active
   */
  public isActive(): boolean {
    return this.status === USER_STATUS.ACTIVE;
  }

  /**
   * Check if user is pending verification
   */
  public isPendingVerification(): boolean {
    return this.status === USER_STATUS.PENDING_VERIFICATION;
  }

  /**
   * Check if user is fully verified (email + phone if available)
   */
  public isFullyVerified(): boolean {
    if (!this.isEmailVerified) {
      return false;
    }
    if (this.phone && !this.isPhoneVerified) {
      return false;
    }
    return true;
  }
}
