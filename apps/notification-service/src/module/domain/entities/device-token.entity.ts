/**
 * DeviceTokenEntity — Child of Device
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import type { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import type { DeviceIdVO } from '@domain/primitives/device-id.vo.js';

export interface DeviceTokenEntityProps {
  readonly deviceId: DeviceIdVO;
  readonly token: DeviceTokenVO;
  readonly platform: DevicePlatformVO;
  readonly active: boolean;
  readonly revokedAt?: string;
}

export class DeviceTokenEntity extends BaseEntity<string> {
  private props: DeviceTokenEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeviceTokenEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    deviceId: DeviceIdVO;
    token: DeviceTokenVO;
    platform: DevicePlatformVO;
    now: string;
  }): DeviceTokenEntity {
    return new DeviceTokenEntity(params.id, params.now, params.now, {
      deviceId: params.deviceId,
      token: params.token,
      platform: params.platform,
      active: true,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DeviceTokenEntityProps;
  }): DeviceTokenEntity {
    return new DeviceTokenEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get deviceId(): DeviceIdVO { return this.props.deviceId; }
  get token(): DeviceTokenVO { return this.props.token; }
  get platform(): DevicePlatformVO { return this.props.platform; }
  get active(): boolean { return this.props.active; }
  get revokedAt(): string | undefined { return this.props.revokedAt; }

  revoke(at: string): void {
    this.props = { ...this.props, active: false, revokedAt: at };
  }
}
