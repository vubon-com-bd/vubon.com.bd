/**
 * DeviceVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Device aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform';

import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface DeviceVOProps {
  readonly id: DeviceIdVO;
  readonly userId: UserIdVO;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly token: DeviceTokenVO;
  readonly platform: DevicePlatformVO;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
  readonly lastActiveAt: string;
  readonly registeredAt: string;
}

export class DeviceVO extends BaseVO<DeviceVOProps> {
  private constructor(props: DeviceVOProps) {
    super(Object.freeze(props));
  }

  static create(props: DeviceVOProps): DeviceVO {
    const vo = new DeviceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DeviceVOProps): DeviceVO {
    return new DeviceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    const registered = new Date(v.registeredAt);
    const lastActive = new Date(v.lastActiveAt);
    if (Number.isNaN(registered.getTime()) || Number.isNaN(lastActive.getTime())) {
      throw new ValidationError('Invalid ISO timestamps', 'registeredAt');
    }
    if (lastActive.getTime() < registered.getTime()) {
      throw new ValidationError(
        'lastActiveAt cannot be before registeredAt',
        'lastActiveAt',
      );
    }
    if (
      v.deviceName !== undefined &&
      (v.deviceName.trim().length === 0 || v.deviceName.length > 100)
    ) {
      throw new ValidationError('deviceName must be 1-100 chars', 'deviceName');
    }
  }

  get id(): DeviceIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): DeviceTypeVO { return this.value.type; }
  get status(): DeviceStatusVO { return this.value.status; }
  get token(): DeviceTokenVO { return this.value.token; }
  get platform(): DevicePlatformVO { return this.value.platform; }
  get appVersion(): string | undefined { return this.value.appVersion; }
  get osVersion(): string | undefined { return this.value.osVersion; }
  get deviceName(): string | undefined { return this.value.deviceName; }
  get lastActiveAt(): string { return this.value.lastActiveAt; }
  get registeredAt(): string { return this.value.registeredAt; }

  isActive(): boolean { return this.status.isActive(); }
  isBlocked(): boolean { return this.status.isBlocked(); }
  canReceive(): boolean { return this.status.canReceive(); }

  isStale(now: Date = new Date()): boolean {
    const days = (now.getTime() - new Date(this.value.lastActiveAt).getTime()) / 86_400_000;
    return days > NOTIFICATION_DEVICE.INACTIVE_DAYS_THRESHOLD;
  }

  ageInDays(now: Date = new Date()): number {
    return Math.floor(
      (now.getTime() - new Date(this.value.registeredAt).getTime()) / 86_400_000,
    );
  }

  withStatus(status: DeviceStatusVO): DeviceVO {
    return DeviceVO.create({ ...this.value, status });
  }

  withLastActive(lastActiveAt: string): DeviceVO {
    return DeviceVO.create({ ...this.value, lastActiveAt });
  }

  withToken(token: DeviceTokenVO): DeviceVO {
    return DeviceVO.create({ ...this.value, token });
  }
}
