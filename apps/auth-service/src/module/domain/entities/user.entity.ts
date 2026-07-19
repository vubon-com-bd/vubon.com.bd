import {
  DEFAULT_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@vubon/auth-shared-constants';

import { BaseAggregateRoot } from './base.entity';

export interface UserProps {
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string | null;
  passwordSalt: string | null;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  emailVerificationToken: string | null;
  emailVerificationTokenExpiry: Date | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: Date | null;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  metadata: Record<string, unknown>;
  avatar: string | null;
  phoneNumber: string | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  backupCodes: string[] | null;
}

export interface CreateUserParams {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  passwordHash?: string;
  passwordSalt?: string;
  role?: UserRole;
  metadata?: Record<string, unknown>;
  phoneNumber?: string;
}

export class UserEntity extends BaseAggregateRoot {
  private _email: string;
  private _username: string;
  private _firstName: string | null;
  private _lastName: string | null;
  private _passwordHash: string | null;
  private _passwordSalt: string | null;
  private _role: UserRole;
  private _status: UserStatus;
  private _isVerified: boolean;
  private _isActive: boolean;
  private _lastLoginAt: Date | null;
  private _emailVerificationToken: string | null;
  private _emailVerificationTokenExpiry: Date | null;
  private _passwordResetToken: string | null;
  private _passwordResetTokenExpiry: Date | null;
  private _failedLoginAttempts: number;
  private _lockedUntil: Date | null;
  private _metadata: Record<string, unknown>;
  private _avatar: string | null;
  private _phoneNumber: string | null;
  private _twoFactorEnabled: boolean;
  private _twoFactorSecret: string | null;
  private _backupCodes: string[] | null;

  private constructor(params: CreateUserParams) {
    super();
    this._email = params.email.toLowerCase();
    this._username = params.username.toLowerCase();
    this._firstName = params.firstName ?? null;
    this._lastName = params.lastName ?? null;
    this._passwordHash = params.passwordHash ?? null;
    this._passwordSalt = params.passwordSalt ?? null;
    this._role = params.role ?? DEFAULT_ROLES.CUSTOMER;
    this._status = USER_STATUS.PENDING_VERIFICATION;
    this._isVerified = false;
    this._isActive = true;
    this._lastLoginAt = null;
    this._emailVerificationToken = null;
    this._emailVerificationTokenExpiry = null;
    this._passwordResetToken = null;
    this._passwordResetTokenExpiry = null;
    this._failedLoginAttempts = 0;
    this._lockedUntil = null;
    this._metadata = params.metadata ?? {};
    this._avatar = null;
    this._phoneNumber = params.phoneNumber ?? null;
    this._twoFactorEnabled = false;
    this._twoFactorSecret = null;
    this._backupCodes = null;
  }

  public static create(params: CreateUserParams): UserEntity {
    const user = new UserEntity(params);
    user.validate();
    return user;
  }

  public static createVerified(params: CreateUserParams): UserEntity {
    const user = new UserEntity(params);
    user._status = USER_STATUS.ACTIVE;
    user._isVerified = true;
    user.validate();
    return user;
  }

  // Getters & Logic
  get email(): string {
    return this._email;
  }
  get username(): string {
    return this._username;
  }
  get firstName(): string | null {
    return this._firstName;
  }
  get lastName(): string | null {
    return this._lastName;
  }
  get fullName(): string | null {
    return [this._firstName, this._lastName].filter(Boolean).join(' ') || null;
  }

  get metadata(): Record<string, unknown> {
    return { ...this._metadata };
  }

  public updateMetadata(key: string, value: unknown): void {
    const safeKey = key.replace(/[^a-zA-Z0-9_]/g, '');
    this._metadata[safeKey] = value;
    this.setUpdatedAt();
  }

  public removeMetadata(key: string): void {
    if (Object.prototype.hasOwnProperty.call(this._metadata, key)) {
      delete this._metadata[key];
      this.setUpdatedAt();
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this._email,
      username: this._username,
      fullName: this.fullName,
      role: this._role,
      status: this._status,
      isVerified: this._isVerified,
      isActive: this.isActive,
    };
  }

  public toSafeJSON(): Record<string, unknown> {
    const json = this.toJSON();
    const sensitiveKeys = ['passwordHash', 'passwordSalt', 'twoFactorSecret'];
    sensitiveKeys.forEach((k) => delete json[k]);
    return json;
  }

  public validate(): void {
    if (!this._email || !this._username) throw new Error('Invalid user data');
  }
}
