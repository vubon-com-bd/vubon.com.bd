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
    this._firstName = params.firstName || null;
    this._lastName = params.lastName || null;
    this._passwordHash = params.passwordHash || null;
    this._passwordSalt = params.passwordSalt || null;
    this._role = params.role || DEFAULT_ROLES.CUSTOMER;
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
    this._metadata = params.metadata || {};
    this._avatar = null;
    this._phoneNumber = params.phoneNumber || null;
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

  // Getters
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
  get passwordHash(): string | null {
    return this._passwordHash;
  }
  get passwordSalt(): string | null {
    return this._passwordSalt;
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
  get emailVerificationToken(): string | null {
    return this._emailVerificationToken;
  }
  get emailVerificationTokenExpiry(): Date | null {
    return this._emailVerificationTokenExpiry;
  }
  get passwordResetToken(): string | null {
    return this._passwordResetToken;
  }
  get passwordResetTokenExpiry(): Date | null {
    return this._passwordResetTokenExpiry;
  }
  get failedLoginAttempts(): number {
    return this._failedLoginAttempts;
  }
  get lockedUntil(): Date | null {
    return this._lockedUntil;
  }
  get metadata(): Record<string, unknown> {
    return { ...this._metadata };
  }
  get avatar(): string | null {
    return this._avatar;
  }
  get phoneNumber(): string | null {
    return this._phoneNumber;
  }
  get twoFactorEnabled(): boolean {
    return this._twoFactorEnabled;
  }
  get twoFactorSecret(): string | null {
    return this._twoFactorSecret;
  }
  get backupCodes(): string[] | null {
    return this._backupCodes ? [...this._backupCodes] : null;
  }

  get fullName(): string | null {
    if (this._firstName && this._lastName) return `${this._firstName} ${this._lastName}`;
    return this._firstName || this._lastName || null;
  }

  // Domain Logic Methods
  public updateProfile(params: {
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    avatar?: string | null;
  }): void {
    if (params.firstName !== undefined) this._firstName = params.firstName || null;
    if (params.lastName !== undefined) this._lastName = params.lastName || null;
    if (params.phoneNumber !== undefined) this._phoneNumber = params.phoneNumber || null;
    if (params.avatar !== undefined) this._avatar = params.avatar || null;
    this.setUpdatedAt();
  }

  public updateEmail(newEmail: string): void {
    if (this._isVerified) {
      this._isVerified = false;
      this._status = USER_STATUS.PENDING_VERIFICATION;
    }
    this._email = newEmail.toLowerCase();
    this.setUpdatedAt();
  }

  public setPasswordHash(hash: string, salt: string): void {
    if (!hash || !salt) throw new Error('Password hash and salt are required');
    this._passwordHash = hash;
    this._passwordSalt = salt;
    this.setUpdatedAt();
  }

  public hasPassword(): boolean {
    return this._passwordHash !== null && this._passwordSalt !== null;
  }

  public changeRole(newRole: UserRole): void {
    if (this._role === newRole) return;
    this._role = newRole;
    this.setUpdatedAt();
  }

  public verify(): void {
    if (this._isVerified) throw new Error('User is already verified');
    this._isVerified = true;
    this._status = USER_STATUS.ACTIVE;
    this._emailVerificationToken = null;
    this._emailVerificationTokenExpiry = null;
    this.setUpdatedAt();
  }

  public initiateEmailVerification(token: string, expiresAt: Date): void {
    if (this._isVerified) throw new Error('User is already verified');
    this._emailVerificationToken = token;
    this._emailVerificationTokenExpiry = expiresAt;
    this.setUpdatedAt();
  }

  public isEmailVerificationTokenValid(token: string): boolean {
    if (!this._emailVerificationToken || !this._emailVerificationTokenExpiry) return false;
    return (
      this._emailVerificationToken === token && new Date() <= this._emailVerificationTokenExpiry
    );
  }

  public clearEmailVerificationToken(): void {
    this._emailVerificationToken = null;
    this._emailVerificationTokenExpiry = null;
    this.setUpdatedAt();
  }

  public initiatePasswordReset(token: string, expiresAt: Date): void {
    this._passwordResetToken = token;
    this._passwordResetTokenExpiry = expiresAt;
    this.setUpdatedAt();
  }

  public isPasswordResetTokenValid(token: string): boolean {
    if (!this._passwordResetToken || !this._passwordResetTokenExpiry) return false;
    return this._passwordResetToken === token && new Date() <= this._passwordResetTokenExpiry;
  }

  public clearPasswordResetToken(): void {
    this._passwordResetToken = null;
    this._passwordResetTokenExpiry = null;
    this.setUpdatedAt();
  }

  public activateUser(): void {
    if (this.isActive) throw new Error('User is already active');
    if (this._status === USER_STATUS.DELETED) throw new Error('Cannot activate a deleted user');
    this.activate(); // Calls BaseEntity's activate
    this._status = USER_STATUS.ACTIVE;
  }

  public suspend(): void {
    if (this._status === USER_STATUS.SUSPENDED) throw new Error('User is already suspended');
    if (this._status === USER_STATUS.DELETED) throw new Error('Cannot suspend a deleted user');
    this._status = USER_STATUS.SUSPENDED;
    this.deactivate(); // Calls BaseEntity's deactivate
  }

  public deleteUser(): void {
    if (this._status === USER_STATUS.DELETED) throw new Error('User is already deleted');
    this._status = USER_STATUS.DELETED;
    this.softDelete(); // Calls BaseEntity's softDelete
  }

  public recordLogin(): void {
    this._lastLoginAt = new Date();
    this._failedLoginAttempts = 0;
    this._lockedUntil = null;
    this.setUpdatedAt();
  }

  public recordFailedLoginAttempt(): void {
    this._failedLoginAttempts += 1;
    this.setUpdatedAt();
  }

  public lockAccount(lockDurationMs: number): void {
    this._lockedUntil = new Date(Date.now() + lockDurationMs);
    this.setUpdatedAt();
  }

  public unlockAccount(): void {
    this._lockedUntil = null;
    this._failedLoginAttempts = 0;
    this.setUpdatedAt();
  }

  public isAccountLocked(): boolean {
    if (!this._lockedUntil) return false;
    return new Date() < this._lockedUntil;
  }

  public isEmailVerificationRequired(): boolean {
    return !this._isVerified && this._status === USER_STATUS.PENDING_VERIFICATION;
  }

  public isSuspended(): boolean {
    return this._status === USER_STATUS.SUSPENDED;
  }

  public canLogin(): boolean {
    return this.isActive && this._status === USER_STATUS.ACTIVE && !this.isAccountLocked();
  }

  public enableTwoFactor(secret: string): void {
    if (this._twoFactorEnabled) throw new Error('Two-factor authentication is already enabled');
    this._twoFactorEnabled = true;
    this._twoFactorSecret = secret;
    this.setUpdatedAt();
  }

  public disableTwoFactor(): void {
    if (!this._twoFactorEnabled) throw new Error('Two-factor authentication is not enabled');
    this._twoFactorEnabled = false;
    this._twoFactorSecret = null;
    this._backupCodes = null;
    this.setUpdatedAt();
  }

  public setBackupCodes(codes: string[]): void {
    if (!this._twoFactorEnabled) throw new Error('Two-factor authentication must be enabled first');
    this._backupCodes = codes;
    this.setUpdatedAt();
  }

  public useBackupCode(code: string): boolean {
    if (!this._backupCodes) return false;
    const index = this._backupCodes.indexOf(code);
    if (index === -1) return false;
    this._backupCodes.splice(index, 1);
    if (this._backupCodes.length === 0) this._backupCodes = null;
    this.setUpdatedAt();
    return true;
  }

  public isAdmin(): boolean {
    return this._role === DEFAULT_ROLES.ADMIN || this._role === DEFAULT_ROLES.MODERATOR;
  }

  public isSuperAdmin(): boolean {
    return this._role === DEFAULT_ROLES.ADMIN;
  }

  public updateMetadata(key: string, value: unknown): void {
    this._metadata[key] = value;
    this.setUpdatedAt();
  }

  public removeMetadata(key: string): void {
    delete this._metadata[key];
    this.setUpdatedAt();
  }

  public clearMetadata(): void {
    this._metadata = {};
    this.setUpdatedAt();
  }

  public validate(): void {
    if (!this._email) throw new Error('Email is required');
    if (!this._username) throw new Error('Username is required');
    if (this._email.length > 255) throw new Error('Email must be less than 255 characters');
    if (this._username.length < 3 || this._username.length > 30) {
      throw new Error('Username must be between 3 and 30 characters');
    }
    if (this._firstName && this._firstName.length > 50) {
      throw new Error('First name must be less than 50 characters');
    }
    if (this._lastName && this._lastName.length > 50) {
      throw new Error('Last name must be less than 50 characters');
    }
  }

  public override toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this._email,
      username: this._username,
      firstName: this._firstName,
      lastName: this._lastName,
      fullName: this.fullName,
      role: this._role,
      status: this._status,
      isVerified: this._isVerified,
      isActive: this.isActive,
      lastLoginAt: this._lastLoginAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
      avatar: this._avatar,
      phoneNumber: this._phoneNumber,
      twoFactorEnabled: this._twoFactorEnabled,
    };
  }

  public toSafeJSON(): Record<string, unknown> {
    const json = this.toJSON();
    delete json.passwordHash;
    delete json.passwordSalt;
    delete json.emailVerificationToken;
    delete json.emailVerificationTokenExpiry;
    delete json.passwordResetToken;
    delete json.passwordResetTokenExpiry;
    delete json.failedLoginAttempts;
    delete json.lockedUntil;
    delete json.twoFactorSecret;
    delete json.backupCodes;
    return json;
  }
}
