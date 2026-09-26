/**
 * UserActivityEntity — A single activity record for a user
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';

export type ActivityType =
  | 'login'
  | 'logout'
  | 'register'
  | 'password_change'
  | 'email_change'
  | 'profile_update'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'session_revoked'
  | 'failed_login';

export interface UserActivityEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly type: ActivityType;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly metadata?: Readonly<Record<string, string>>;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserActivityEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _type: ActivityType;
  private _ipAddress?: string;
  private _userAgent?: string;
  private _metadata?: Readonly<Record<string, string>>;

  private constructor(props: UserActivityEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._type = props.type;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._metadata = props.metadata;
  }

  static create(props: UserActivityEntityProps): UserActivityEntity {
    return new UserActivityEntity(props);
  }

  get type(): ActivityType { return this._type; }
  get ipAddress(): string | undefined { return this._ipAddress; }
  get userAgent(): string | undefined { return this._userAgent; }
  get metadata(): Readonly<Record<string, string>> | undefined { return this._metadata; }

  isSecurityRelevant(): boolean {
    return this._type === 'failed_login' || this._type === 'password_change';
  }
}
