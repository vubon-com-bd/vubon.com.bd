/**
 * AuthDeviceVO — Trusted/untrusted device snapshot
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { DeviceFingerprintVO } from '../primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../primitives/device-type.vo';
import { DeviceStatusVO } from '../primitives/device-status.vo';

export interface AuthDeviceVOProps {
  readonly deviceId: string;
  readonly userId: UserIdVO;
  readonly fingerprint: DeviceFingerprintVO;
  readonly type: DeviceTypeVO;
  readonly status: DeviceStatusVO;
  readonly name: string;
  readonly firstSeenAt: number;
  readonly lastSeenAt: number;
}

export class AuthDeviceVO extends BaseVO<AuthDeviceVOProps> {
  private constructor(props: AuthDeviceVOProps) {
    super(props);
  }

  static of(props: AuthDeviceVOProps): AuthDeviceVO {
    if (props.lastSeenAt < props.firstSeenAt) {
      throw new Error('lastSeenAt must be >= firstSeenAt');
    }
    return new AuthDeviceVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get fingerprint(): DeviceFingerprintVO { return this.value.fingerprint; }
  get status(): DeviceStatusVO { return this.value.status; }

  isTrusted(): boolean { return this.value.status.isActive(); }
  canLogin(): boolean { return this.value.status.canLogin(); }
}
