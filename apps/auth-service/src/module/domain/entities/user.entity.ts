import {
  DEFAULT_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@vubon/auth-shared-constants';

import { BaseAggregateRoot } from './base.entity';

export interface CreateUserParams {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  metadata?: Record<string, unknown>;
}

export class UserEntity extends BaseAggregateRoot {
  private _email: string;
  private _username: string;
  private _firstName: string | null;
  private _lastName: string | null;
  private _role: UserRole;
  private _status: UserStatus;
  private _isVerified: boolean;
  private _metadata: Record<string, unknown>;

  private constructor(params: CreateUserParams) {
    super();
    this._email = params.email.toLowerCase();
    this._username = params.username.toLowerCase();
    this._firstName = params.firstName ?? null;
    this._lastName = params.lastName ?? null;
    this._role = params.role ?? DEFAULT_ROLES.CUSTOMER;
    this._status = USER_STATUS.PENDING_VERIFICATION;
    this._isVerified = false;
    // লিন্টার সেফটি: অবজেক্ট কপি করার সময় টাইপ নিশ্চিত করা
    this._metadata = params.metadata ? { ...params.metadata } : {};
  }

  public static create(params: CreateUserParams): UserEntity {
    const user = new UserEntity(params);
    user.validate();
    return user;
  }

  get fullName(): string | null {
    return [this._firstName, this._lastName].filter(Boolean).join(' ') || null;
  }

  public updateMetadata(key: string, value: unknown): void {
    // সিকিউরিটি: শুধুমাত্র আলফানিউমেরিক কি গ্রহণ করা
    const safeKey = key.replace(/[^a-z0-9]/gi, '');
    if (safeKey) {
      this._metadata[safeKey] = value;
      this.setUpdatedAt();
    }
  }

  public removeMetadata(key: string): void {
    const safeKey = key.replace(/[^a-z0-9]/gi, '');
    if (safeKey && Object.prototype.hasOwnProperty.call(this._metadata, safeKey)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._metadata[safeKey];
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
    };
  }

  public validate(): void {
    if (!this._email || !this._username) {
      throw new Error('User data is incomplete');
    }
  }
}
