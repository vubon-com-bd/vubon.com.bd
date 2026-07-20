import { DEFAULT_ROLES, USER_STATUS } from '@vubon/auth-shared-constants';
import type { UserRole, UserStatus } from '@vubon/auth-shared-types';

import { BaseEntity, type BaseEntityProps } from './base.entity';

export interface UserProps extends BaseEntityProps {
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
  salt: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  lastLoginAt: Date | null;
  loginAttempts: number;
  lockedUntil: Date | null;
  verificationToken: string | null;
  verificationTokenExpiresAt: Date | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiresAt: Date | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: Date | null;
}

export class User extends BaseEntity {
  private _email: string;
  private _username: string;
  private _firstName: string | null;
  private _lastName: string | null;
  private _passwordHash: string;
  private _salt: string;
  private _role: UserRole;
  private _status: UserStatus;
  private _isVerified: boolean;
  private _lastLoginAt: Date | null;
  private _loginAttempts: number;
  private _lockedUntil: Date | null;
  private _verificationToken: string | null;
  private _verificationTokenExpiresAt: Date | null;
  private _passwordResetToken: string | null;
  private _passwordResetTokenExpiresAt: Date | null;
  private _refreshToken: string | null;
  private _refreshTokenExpiresAt: Date | null;

  private constructor(props: UserProps) {
    super(props);
    this._email = props.email;
    this._username = props.username;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._passwordHash = props.passwordHash;
    this._salt = props.salt;
    this._role = props.role;
    this._status = props.status;
    this._isVerified = props.isVerified;
    this._lastLoginAt = props.lastLoginAt;
    this._loginAttempts = props.loginAttempts;
    this._lockedUntil = props.lockedUntil;
    this._verificationToken = props.verificationToken;
    this._verificationTokenExpiresAt = props.verificationTokenExpiresAt;
    this._passwordResetToken = props.passwordResetToken;
    this._passwordResetTokenExpiresAt = props.passwordResetTokenExpiresAt;
    this._refreshToken = props.refreshToken;
    this._refreshTokenExpiresAt = props.refreshTokenExpiresAt;
  }

  public static create(props: {
    email: string;
    username: string;
    passwordHash: string;
    salt: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  }): User {
    return new User({
      email: props.email,
      username: props.username,
      firstName: props.firstName || null,
      lastName: props.lastName || null,
      passwordHash: props.passwordHash,
      salt: props.salt,
      role: props.role || DEFAULT_ROLES.CUSTOMER,
      status: USER_STATUS.PENDING_VERIFICATION,
      isVerified: false,
      isActive: true,
      lastLoginAt: null,
      loginAttempts: 0,
      lockedUntil: null,
      verificationToken: null,
      verificationTokenExpiresAt: null,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

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
  get fullName(): string {
    return [this._firstName, this._lastName].filter(Boolean).join(' ') || this._username;
  }
  get passwordHash(): string {
    return this._passwordHash;
  }
  get salt(): string {
    return this._salt;
  }
  get role(): UserRole {
    return this._role;
  }
  get status(): UserStatus {
    return this._status;
  }
  get isVerified(): boolean {
    return this._isVerified;
  }
  get lastLoginAt(): Date | null {
    return this._lastLoginAt;
  }
  get loginAttempts(): number {
    return this._loginAttempts;
  }
  get lockedUntil(): Date | null {
    return this._lockedUntil;
  }
  get verificationToken(): string | null {
    return this._verificationToken;
  }
  get verificationTokenExpiresAt(): Date | null {
    return this._verificationTokenExpiresAt;
  }
  get passwordResetToken(): string | null {
    return this._passwordResetToken;
  }
  get passwordResetTokenExpiresAt(): Date | null {
    return this._passwordResetTokenExpiresAt;
  }
  get refreshToken(): string | null {
    return this._refreshToken;
  }
  get refreshTokenExpiresAt(): Date | null {
    return this._refreshTokenExpiresAt;
  }

  public changeEmail(email: string): void {
    if (!email) throw new Error('Email is required');
    this._email = email;
    this._isVerified = false;
    this.setUpdatedAt();
  }

  public assignVerificationToken(token: string, expiresAt: Date): void {
    this._verificationToken = token;
    this._verificationTokenExpiresAt = expiresAt;
    this.setUpdatedAt();
  }

  public verify(): void {
    this._isVerified = true;
    this._verificationToken = null;
    this._verificationTokenExpiresAt = null;
    if (this._status === USER_STATUS.PENDING_VERIFICATION) this._status = USER_STATUS.ACTIVE;
    this.setUpdatedAt();
  }

  public softDelete(): void {
    this._status = USER_STATUS.DELETED;
    super.softDelete();
  }

  public override toJSON(): Required<BaseEntityProps> & Record<string, unknown> {
    return {
      ...super.toJSON(),
      email: this._email,
      username: this._username,
      firstName: this._firstName,
      lastName: this._lastName,
      fullName: this.fullName,
      role: this._role,
      status: this._status,
      isVerified: this._isVerified,
      lastLoginAt: this._lastLoginAt,
      loginAttempts: this._loginAttempts,
      lockedUntil: this._lockedUntil,
    };
  }

  public toJSONWithSensitive(): Record<string, unknown> {
    return {
      ...this.toJSON(),
      passwordHash: this._passwordHash,
      salt: this._salt,
      verificationToken: this._verificationToken,
      passwordResetToken: this._passwordResetToken,
      refreshToken: this._refreshToken,
    };
  }
}
