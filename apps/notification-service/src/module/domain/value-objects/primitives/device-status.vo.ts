/**
 * DeviceStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_STATUS } from '@vubon/shared-constants/platform';
import { InvalidDeviceStatusError } from '@domain/errors/device.errors.js';

export type DeviceStatusValue =
  (typeof NOTIFICATION_DEVICE_STATUS)[keyof typeof NOTIFICATION_DEVICE_STATUS];

const ALLOWED = Object.values(NOTIFICATION_DEVICE_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  active: ['inactive', 'unregistered', 'blocked', 'invalid'],
  inactive: ['active', 'unregistered', 'blocked', 'invalid'],
  unregistered: [],
  blocked: [],
  invalid: [],
};

export class DeviceStatusVO extends BaseStatusVO<DeviceStatusValue> {
  private constructor(value: DeviceStatusValue) {
    super(value);
  }

  static create(raw: string): DeviceStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidDeviceStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDeviceStatusError(normalized, ALLOWED);
    }
    return new DeviceStatusVO(normalized as DeviceStatusValue);
  }

  static reconstitute(raw: string): DeviceStatusVO {
    return new DeviceStatusVO(raw as DeviceStatusValue);
  }

  static active(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.ACTIVE); }
  static inactive(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.INACTIVE); }
  static unregistered(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.UNREGISTERED); }
  static blocked(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.BLOCKED); }

  isActive(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.INACTIVE; }
  isUnregistered(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.UNREGISTERED; }
  isBlocked(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.BLOCKED; }
  isInvalid(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.INVALID; }

  canReceive(): boolean { return this.isActive(); }

  isTerminal(): boolean {
    return this.isUnregistered() || this.isBlocked() || this.isInvalid();
  }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
