import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { UntrustedDeviceError } from '../../errors/device.errors';

export class DeviceFingerprintVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceFingerprintVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeviceFingerprint');
    if (raw.length < 8) {
      throw new UntrustedDeviceError(raw);
    }
    return new DeviceFingerprintVO(raw);
  }
}
