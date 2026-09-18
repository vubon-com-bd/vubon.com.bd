import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { LoginAttemptIpVO } from '../value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../value-objects/primitives/login-attempt-status.vo';

export interface AuthLoginAttemptEntityProps {
  readonly userId: UserIdVO | null;
  readonly email: string | null;
  readonly ip: LoginAttemptIpVO;
  readonly userAgent: string;
  readonly status: LoginAttemptStatusVO;
  readonly attemptedAt: Date;
}

export class AuthLoginAttemptEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO | null;
  private readonly _email: string | null;
  private readonly _ip: LoginAttemptIpVO;
  private readonly _userAgent: string;
  private readonly _status: LoginAttemptStatusVO;
  private readonly _attemptedAt: Date;

  private constructor(
    id: string,
    props: AuthLoginAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._email = props.email;
    this._ip = props.ip;
    this._userAgent = props.userAgent;
    this._status = props.status;
    this._attemptedAt = props.attemptedAt;
  }

  static create(props: AuthLoginAttemptEntityProps): AuthLoginAttemptEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthLoginAttemptEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthLoginAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthLoginAttemptEntity {
    return new AuthLoginAttemptEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO | null { return this._userId; }
  get email(): string | null { return this._email; }
  get ip(): LoginAttemptIpVO { return this._ip; }
  get userAgent(): string { return this._userAgent; }
  get status(): LoginAttemptStatusVO { return this._status; }
  get attemptedAt(): Date { return this._attemptedAt; }

  get isSuccess(): boolean { return this._status.value === 'success'; }
}
