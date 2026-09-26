/**
 * AuthLoginAttemptEntity — A single login attempt
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { LoginAttemptIpVO } from '../value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../value-objects/primitives/login-attempt-status.vo';

export interface AuthLoginAttemptEntityProps {
  readonly id: string;
  readonly userId?: UserId;
  readonly email?: string;
  readonly ip: LoginAttemptIpVO;
  readonly userAgent: string;
  readonly status: LoginAttemptStatusVO;
  readonly attemptedAt: number;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthLoginAttemptEntity extends BaseEntity<string> {
  readonly userId?: UserId;
  readonly email?: string;
  private _ip: LoginAttemptIpVO;
  private _userAgent: string;
  private _status: LoginAttemptStatusVO;
  private _attemptedAt: number;
  private _failureReason?: string;

  private constructor(props: AuthLoginAttemptEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this.email = props.email;
    this._ip = props.ip;
    this._userAgent = props.userAgent;
    this._status = props.status;
    this._attemptedAt = props.attemptedAt;
    this._failureReason = props.failureReason;
  }

  static create(props: AuthLoginAttemptEntityProps): AuthLoginAttemptEntity {
    return new AuthLoginAttemptEntity(props);
  }

  get ip(): LoginAttemptIpVO { return this._ip; }
  get status(): LoginAttemptStatusVO { return this._status; }
  get attemptedAt(): number { return this._attemptedAt; }
  get userAgent(): string { return this._userAgent; }

  isFailure(): boolean { return this._status.countsAsFailure(); }
  isSuccess(): boolean { return !this.isFailure(); }
}
