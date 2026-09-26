import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeviceIdVO } from '../primitives/device-id.vo';
import { DeviceTypeVO } from '../primitives/device-type.vo';
import { DeviceStatusVO } from '../primitives/device-status.vo';
import { DevicePlatformVO } from '../primitives/device-platform.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface DeviceProps {
  readonly id: DeviceIdVO;
  readonly userId: UserIdVO;
  readonly type: DeviceTypeVO;
  readonly platform: DevicePlatformVO;
  readonly status: DeviceStatusVO;
  readonly fingerprint: string | null;
}

export class DeviceVO extends BaseVO<DeviceProps> {
  private constructor(props: DeviceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeviceProps): DeviceVO {
    return new DeviceVO(props);
  }

  get id(): DeviceIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): DeviceTypeVO { return this.value.type; }
  get platform(): DevicePlatformVO { return this.value.platform; }
  get status(): DeviceStatusVO { return this.value.status; }
  get fingerprint(): string | null { return this.value.fingerprint; }
}
