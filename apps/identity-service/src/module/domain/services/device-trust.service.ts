/**
 * DeviceTrustService
 * @module identity-service/domain/services
 */
import { AUTH_DEVICE } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class DeviceTrustService {
  static maxDevicesPerUser(): number {
    return AUTH_DEVICE.MAX_DEVICES_PER_USER;
  }

  static trustExpiryDays(): number {
    return AUTH_DEVICE.TRUST_DEVICE_EXPIRY_DAYS;
  }

  static defaultRemember(): boolean {
    return AUTH_DEVICE.REMEMBER_DEVICE_DEFAULT;
  }

  static trackFingerprint(): boolean {
    return AUTH_DEVICE.TRACK_FINGERPRINT;
  }

  static trustUntilDate(nowMs: number = Date.now(), days = this.trustExpiryDays()): Date {
    return new Date(nowMs + days * 24 * 3600 * 1000);
  }

  static assertDeviceLimit(currentCount: number): void {
    if (currentCount >= this.maxDevicesPerUser()) {
      throw new BusinessRuleError(
        `Max devices reached (${this.maxDevicesPerUser()})`,
        'DEVICE_LIMIT_EXCEEDED',
        { currentCount, limit: this.maxDevicesPerUser() },
      );
    }
  }

  /**
   * Whether device can be trusted based on risk factors.
   */
  static canTrust(params: {
    hasFingerprint: boolean;
    sameIp: boolean;
    fromNewCountry: boolean;
  }): boolean {
    if (!params.hasFingerprint) return false;
    if (params.fromNewCountry) return false;
    return true;
  }

  /**
   * Check if trust is expired.
   */
  static isTrustExpired(trustedUntilIso: string, nowMs: number = Date.now()): boolean {
    return nowMs >= Date.parse(trustedUntilIso);
  }
}
