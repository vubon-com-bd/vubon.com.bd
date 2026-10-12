/**
 * CanTrustDeviceSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { AUTH_DEVICE } from '@vubon/shared-constants/auth';

export interface CanTrustDeviceContext {
  readonly currentDeviceCount: number;
  readonly hasFingerprint: boolean;
  readonly sameIp: boolean;
  readonly fromNewCountry: boolean;
  readonly alreadyTrusted: boolean;
  readonly requestorIsOwner: boolean;
}

export interface CanTrustDeviceCandidate {
  readonly deviceId: string;
  readonly context: CanTrustDeviceContext;
}

export class CanTrustDeviceSpecification extends Specification<CanTrustDeviceCandidate> {
  isSatisfiedBy(c: CanTrustDeviceCandidate): boolean {
    const ctx = c.context;

    if (!ctx.requestorIsOwner) return false;
    if (ctx.alreadyTrusted) return false;
    if (!ctx.hasFingerprint) return false;
    if (ctx.fromNewCountry) return false;
    if (ctx.currentDeviceCount >= AUTH_DEVICE.MAX_DEVICES_PER_USER) return false;

    return true;
  }

  explain(c: CanTrustDeviceCandidate): string | null {
    const ctx = c.context;

    if (!ctx.requestorIsOwner) return 'Only device owner can trust device';
    if (ctx.alreadyTrusted) return 'Device already trusted';
    if (!ctx.hasFingerprint) return 'Device fingerprint is required';
    if (ctx.fromNewCountry) return 'Cannot trust device from new country';
    if (ctx.currentDeviceCount >= AUTH_DEVICE.MAX_DEVICES_PER_USER) {
      return `Max devices reached (${AUTH_DEVICE.MAX_DEVICES_PER_USER})`;
    }
    return null;
  }

  static strict(): CanTrustDeviceSpecification {
    return new CanTrustDeviceSpecification();
  }
}
