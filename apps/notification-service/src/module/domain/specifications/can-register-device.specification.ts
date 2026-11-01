/**
 * CanRegisterDeviceSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a new device can be registered।
 * Checks: device limit, token uniqueness, validity।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform';
import type { DeviceVO } from '@domain/composites/device.vo.js';
import type { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';

export interface CanRegisterDeviceContext {
  readonly existingDeviceCount: number;
  readonly existingTokens?: readonly DeviceTokenVO[];
}

export interface CanRegisterDeviceCandidate {
  readonly candidate: DeviceVO;
  readonly ctx: CanRegisterDeviceContext;
}

export class CanRegisterDeviceSpecification extends Specification<CanRegisterDeviceCandidate> {
  isSatisfiedBy(c: CanRegisterDeviceCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanRegisterDeviceCandidate): string | null {
    if (c.ctx.existingDeviceCount >= NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER) {
      return `max devices (${NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER}) already registered for user`;
    }

    if (c.ctx.existingTokens) {
      const tokenValue = c.candidate.token.value;
      for (const t of c.ctx.existingTokens) {
        if (t.value === tokenValue) {
          return 'device token already registered';
        }
      }
    }

    if (c.candidate.isBlocked()) {
      return 'device is blocked — cannot register';
    }

    if (c.candidate.token.value.length > NOTIFICATION_DEVICE.TOKEN_MAX_LENGTH) {
      return `token exceeds max length (${NOTIFICATION_DEVICE.TOKEN_MAX_LENGTH})`;
    }

    return null;
  }

  static strict(): CanRegisterDeviceSpecification {
    return new CanRegisterDeviceSpecification();
  }
}
