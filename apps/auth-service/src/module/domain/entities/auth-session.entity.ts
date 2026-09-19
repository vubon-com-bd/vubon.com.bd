import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo';
import {
  SessionCreatedEvent,
  SessionExpiredEvent,
  SessionRevokedEvent,
} from '../events/auth-session.events';

export interface AuthSessionEntityProps {
  readonly userId: UserIdVO;
  readonly token: SessionTokenVO;
  readonly expiry: SessionExpiryVO;
  readonly ip: string;
  readonly userAgent: string;
  readonly deviceId: string | null;
  readonly revokedAt: Date | null;
  readonly revokeReason: string | null;
}

export class AuthSessionEntity extends AggregateRoot<string> {
  private readonly _userId: UserIdVO;
  private readonly _token: SessionTokenVO;
  private readonly _expiry: SessionExpiryVO;
  private readonly _ip: string;
  private readonly _userAgent: string;
  private readonly _deviceId: string | null;
  private readonly _revokedAt: Date | null;
  private readonly _revokeReason: string | null;

  private constructor(
    id: string,
    props: AuthSessionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._token = props.token;
    this._expiry = props.expiry;
    this._ip = props.ip;
    this._userAgent = props.userAgent;
    this._deviceId = props.deviceId;
    this._revokedAt = props.revokedAt;
    this._revokeReason = props.revokeReason;
  }

  static create(props: AuthSessionEntityProps): AuthSessionEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new AuthSessionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new SessionCreatedEvent(id, id, props.userId.value, props.ip, 0),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: AuthSessionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthSessionEntity {
    return new AuthSessionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  revoke(reason: string): AuthSessionEntity {
    const now = new Date();
    const updated = new AuthSessionEntity(
      this.id,
      { ...this._toProps(), revokedAt: now, revokeReason: reason },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SessionRevokedEvent(
        this.id,
        this.id,
        this._userId.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  markExpired(): AuthSessionEntity {
    const now = new Date();
    const updated = new AuthSessionEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SessionExpiredEvent(this.id, this.id, this._userId.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get token(): SessionTokenVO { return this._token; }
  get expiry(): SessionExpiryVO { return this._expiry; }
  get ip(): string { return this._ip; }
  get userAgent(): string { return this._userAgent; }
  get deviceId(): string | null { return this._deviceId; }
  get revokedAt(): Date | null { return this._revokedAt; }
  get revokeReason(): string | null { return this._revokeReason; }

  get isRevoked(): boolean { return this._revokedAt !== null; }
  get isExpired(): boolean { return this._expiry.isExpired(); }
  get isActive(): boolean { return !this.isRevoked && !this.isExpired; }

  private _toProps(): AuthSessionEntityProps {
    return {
      userId: this._userId,
      token: this._token,
      expiry: this._expiry,
      ip: this._ip,
      userAgent: this._userAgent,
      deviceId: this._deviceId,
      revokedAt: this._revokedAt,
      revokeReason: this._revokeReason,
    };
  }
}
