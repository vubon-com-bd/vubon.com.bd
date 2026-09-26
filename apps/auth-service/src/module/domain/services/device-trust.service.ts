/**
 * DeviceTrustService — Trust promotion rules
 * @module auth-service/domain/services
 *
 * Rules:
 * - Device becomes trusted after N successful logins
 * - Explicit trust required for admins
 * - Blocked/revoked devices NEVER auto-promote
 * - Untrusted devices require manual action
 */
import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { UntrustedDeviceError } from '../errors/device.errors';

export class DeviceTrustService {
  static readonly PROMOTION_THRESHOLD = 3;

  static shouldAutoTrust(
    device: AuthDeviceEntity,
    successfulLogins: number,
    isPrivilegedUser: boolean,
  ): boolean {
    if (isPrivilegedUser) return false;
    if (device.isTrusted()) return false;
    if (device.status.value === 'blocked') return false;
    if (device.status.value === 'revoked') return false;
    if (device.status.value === 'untrusted') return false;
    return successfulLogins >= DeviceTrustService.PROMOTION_THRESHOLD;
  }

  static assertTrusted(device: AuthDeviceEntity): void {
    if (device.status.value === 'blocked') {
      throw new UntrustedDeviceError(device.fingerprint.masked);
    }
    if (device.status.value === 'revoked') {
      throw new UntrustedDeviceError(device.fingerprint.masked);
    }
    if (!device.isTrusted()) {
      throw new UntrustedDeviceError(device.fingerprint.masked);
    }
  }

  static canLogin(device: AuthDeviceEntity): boolean {
    return device.canLogin();
  }
}
