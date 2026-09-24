import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';
import { DevicePlatformVO } from '../value-objects/primitives/device-platform.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface DeviceEntityProps {
  readonly userId: UserIdVO;
  readonly type: DeviceTypeVO;
  readonly platform: DevicePlatformVO;
  readonly status: DeviceStatusVO;
  readonly fingerprint: string | null;
}

export class DeviceEntity extends AggregateRoot<DeviceIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: DeviceTypeVO;
  private readonly _platform: DevicePlatformVO;
  private readonly _status: DeviceStatusVO;
  private readonly _fingerprint: string | null;

  private constructor(
    id: DeviceIdVO,
    props: DeviceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._platform = props.platform;
    this._status = props.status;
    this._fingerprint = props.fingerprint;
  }

  static create(props: DeviceEntityProps): DeviceEntity {
    const now = new Date().toISOString();
    const id = DeviceIdVO.create(crypto.randomUUID());
    return new DeviceEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: DeviceIdVO,
    props: DeviceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DeviceEntity {
    return new DeviceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  deactivate(): DeviceEntity {
    return new DeviceEntity(
      this.id,
      { ...this._toProps(), status: DeviceStatusVO.create('inactive') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): DeviceTypeVO { return this._type; }
  get platform(): DevicePlatformVO { return this._platform; }
  get status(): DeviceStatusVO { return this._status; }
  get fingerprint(): string | null { return this._fingerprint; }
  get isActive(): boolean { return this._status.isActive(); }

  private _toProps(): DeviceEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      platform: this._platform,
      status: this._status,
      fingerprint: this._fingerprint,
    };
  }
}
