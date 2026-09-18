import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { MfaSecretVO } from '../value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../value-objects/primitives/mfa-status.vo';
import {
  MfaEnabledEvent,
  MfaDisabledEvent,
  MfaVerifiedEvent,
} from '../events/auth-mfa.events';

export interface AuthMfaEntityProps {
  readonly userId: UserIdVO;
  readonly secret: MfaSecretVO;
  readonly type: MfaTypeVO;
  readonly status: MfaStatusVO;
  readonly enabledAt: Date | null;
  readonly lastVerifiedAt: Date | null;
}

export class AuthMfaEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _secret: MfaSecretVO;
  private readonly _type: MfaTypeVO;
  private readonly _status: MfaStatusVO;
  private readonly _enabledAt: Date | null;
  private readonly _lastVerifiedAt: Date | null;

  private constructor(
    id: UserIdVO,
    props: AuthMfaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._secret = props.secret;
    this._type = props.type;
    this._status = props.status;
    this._enabledAt = props.enabledAt;
    this._lastVerifiedAt = props.lastVerifiedAt;
  }

  static create(props: AuthMfaEntityProps): AuthMfaEntity {
    const now = new Date().toISOString();
    return new AuthMfaEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: AuthMfaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthMfaEntity {
    return new AuthMfaEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  enable(): AuthMfaEntity {
    const now = new Date();
    const updated = new AuthMfaEntity(
      this.id,
      {
        ...this._toProps(),
        status: MfaStatusVO.create('enabled'),
        enabledAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new MfaEnabledEvent(
        this.id.value,
        this.id.value,
        this._type.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  disable(): AuthMfaEntity {
    const now = new Date();
    const updated = new AuthMfaEntity(
      this.id,
      { ...this._toProps(), status: MfaStatusVO.create('disabled') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new MfaDisabledEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  verify(): AuthMfaEntity {
    const now = new Date();
    const updated = new AuthMfaEntity(
      this.id,
      { ...this._toProps(), lastVerifiedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new MfaVerifiedEvent(
        this.id.value,
        this.id.value,
        this._type.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get secret(): MfaSecretVO { return this._secret; }
  get type(): MfaTypeVO { return this._type; }
  get status(): MfaStatusVO { return this._status; }
  get enabledAt(): Date | null { return this._enabledAt; }
  get lastVerifiedAt(): Date | null { return this._lastVerifiedAt; }

  get isEnabled(): boolean { return this._status.value === 'enabled'; }

  private _toProps(): AuthMfaEntityProps {
    return {
      userId: this._userId,
      secret: this._secret,
      type: this._type,
      status: this._status,
      enabledAt: this._enabledAt,
      lastVerifiedAt: this._lastVerifiedAt,
    };
  }
}
