import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { UntrustedDeviceError } from '../errors/device.errors';

export class DeviceTrustService {
  assertTrusted(device: AuthDeviceEntity | null): void {
    if (!device || !device.isTrusted) {
      throw new UntrustedDeviceError(device?.fingerprint.value ?? 'unknown');
    }
  }

  isTrusted(device: AuthDeviceEntity | null): boolean {
    return device !== null && device.isTrusted;
  }

  requiresAdditionalVerification(device: AuthDeviceEntity | null): boolean {
    return !this.isTrusted(device);
  }
}
