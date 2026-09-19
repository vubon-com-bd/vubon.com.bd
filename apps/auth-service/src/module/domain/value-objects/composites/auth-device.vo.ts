import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { DeviceFingerprintVO } from '../primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../primitives/device-type.vo';
import { DeviceStatusVO } from '../primitives/device-status.vo';

export interface AuthDeviceProps {
  readonly userId: UserIdVO;
  readonly fingerprint: DeviceFingerprintVO;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly name: string | null;
  readonly lastSeenAt: Date;
  readonly trustedAt: Date | null;
}

export class AuthDeviceVO extends BaseVO<AuthDeviceProps> {
  private constructor(props: AuthDeviceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthDeviceProps): AuthDeviceVO {
    return new AuthDeviceVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get fingerprint(): DeviceFingerprintVO { return this.value.fingerprint; }
  get type(): DeviceTypeVO { return this.value.type; }
  get status(): DeviceStatusVO { return this.value.status; }
  get name(): string | null { return this.value.name; }
  get lastSeenAt(): Date { return this.value.lastSeenAt; }
  get trustedAt(): Date | null { return this.value.trustedAt; }

  get isTrusted(): boolean {
    return this.value.status.value === 'trusted';
  }
}
