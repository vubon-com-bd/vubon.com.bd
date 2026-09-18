import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';
import { DeviceRegisteredEvent } from '../events/auth-account-lock.events';

export interface AuthDeviceEntityProps {
  readonly userId: UserIdVO;
  readonly fingerprint: DeviceFingerprintVO;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly name: string | null;
  readonly lastSeenAt: Date;
  readonly trustedAt: Date | null;
}

export class AuthDeviceEntity extends AggregateRoot<string> {
  private readonly _userId: UserIdVO;
  private readonly _fingerprint: DeviceFingerprintVO;
  private readonly _type: DeviceTypeVO;
  private readonly _status: DeviceStatusVO;
  private readonly _name: string | null;
  private readonly _lastSeenAt: Date;
  private readonly _trustedAt: Date | null;

  private constructor(
    id: string,
    props: AuthDeviceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._fingerprint = props.fingerprint;
    this._type = props.type;
    this._status = props.status;
    this._name = props.name;
    this._lastSeenAt = props.lastSeenAt;
    this._trustedAt = props.trustedAt;
  }

  static create(props: AuthDeviceEntityProps): AuthDeviceEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new AuthDeviceEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new DeviceRegisteredEvent(
        id,
        props.userId.value,
        id,
        props.fingerprint.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: AuthDeviceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthDeviceEntity {
    return new AuthDeviceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  trust(): AuthDeviceEntity {
    const now = new Date();
    return new AuthDeviceEntity(
      this.id,
      {
        ...this._toProps(),
        status: DeviceStatusVO.create('trusted'),
        trustedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  touchLastSeen(): AuthDeviceEntity {
    const now = new Date();
    return new AuthDeviceEntity(
      this.id,
      { ...this._toProps(), lastSeenAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get fingerprint(): DeviceFingerprintVO { return this._fingerprint; }
  get type(): DeviceTypeVO { return this._type; }
  get status(): DeviceStatusVO { return this._status; }
  get name(): string | null { return this._name; }
  get lastSeenAt(): Date { return this._lastSeenAt; }
  get trustedAt(): Date | null { return this._trustedAt; }

  get isTrusted(): boolean { return this._status.value === 'trusted'; }

  private _toProps(): AuthDeviceEntityProps {
    return {
      userId: this._userId,
      fingerprint: this._fingerprint,
      type: this._type,
      status: this._status,
      name: this._name,
      lastSeenAt: this._lastSeenAt,
      trustedAt: this._trustedAt,
    };
  }
}
