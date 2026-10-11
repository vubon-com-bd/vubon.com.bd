/**
 * DeviceStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidDeviceStatusError } from '../../errors/preference.errors.js';

const ALLOWED = Object.values(NOTIFICATION_DEVICE_STATUS) as readonly string[];

export class DeviceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDeviceStatusError(raw, ALLOWED);
    }
    return new DeviceStatusVO(raw);
  }

  static reconstitute(raw: string): DeviceStatusVO {
    return new DeviceStatusVO(raw);
  }

  static active(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.ACTIVE); }
  static inactive(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.INACTIVE); }
  static unregistered(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.UNREGISTERED); }
  static blocked(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.BLOCKED); }
  static invalid(): DeviceStatusVO { return new DeviceStatusVO(NOTIFICATION_DEVICE_STATUS.INVALID); }

  isActive(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.INACTIVE; }
  isUnregistered(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.UNREGISTERED; }
  isBlocked(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.BLOCKED; }
  isInvalid(): boolean { return this.value === NOTIFICATION_DEVICE_STATUS.INVALID; }

  /** Can this device receive push notifications right now? */
  canReceivePush(): boolean {
    return this.isActive();
  }

  isTerminal(): boolean {
    return this.isUnregistered() || this.isBlocked() || this.isInvalid();
  }
}
