import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo';

export interface DeviceTokenEntityProps {
  readonly deviceId: DeviceIdVO;
  readonly token: DeviceTokenVO;
  readonly lastUsedAt: Date;
}

export class DeviceTokenEntity extends BaseEntity<string> {
  private readonly _deviceId: DeviceIdVO;
  private readonly _token: DeviceTokenVO;
  private readonly _lastUsedAt: Date;

  private constructor(
    id: string,
    props: DeviceTokenEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._deviceId = props.deviceId;
    this._token = props.token;
    this._lastUsedAt = props.lastUsedAt;
  }

  static create(props: DeviceTokenEntityProps): DeviceTokenEntity {
    const now = new Date().toISOString();
    return new DeviceTokenEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: DeviceTokenEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DeviceTokenEntity {
    return new DeviceTokenEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  touch(): DeviceTokenEntity {
    return new DeviceTokenEntity(
      this.id,
      { ...this._toProps(), lastUsedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get deviceId(): DeviceIdVO { return this._deviceId; }
  get token(): DeviceTokenVO { return this._token; }
  get lastUsedAt(): Date { return this._lastUsedAt; }

  private _toProps(): DeviceTokenEntityProps {
    return {
      deviceId: this._deviceId,
      token: this._token,
      lastUsedAt: this._lastUsedAt,
    };
  }
}
