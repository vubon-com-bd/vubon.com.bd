/**
 * DeviceType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_TYPE } from '@vubon/shared-constants/platform';
import { InvalidDeviceTypeError } from '@domain/errors/device.errors.js';

export type DeviceTypeValue =
  (typeof NOTIFICATION_DEVICE_TYPE)[keyof typeof NOTIFICATION_DEVICE_TYPE];

const ALLOWED = Object.values(NOTIFICATION_DEVICE_TYPE) as readonly string[];

export class DeviceTypeVO extends BaseTypeVO<DeviceTypeValue> {
  private constructor(value: DeviceTypeValue) {
    super(value);
  }

  static create(raw: string): DeviceTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidDeviceTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDeviceTypeError(normalized, ALLOWED);
    }
    return new DeviceTypeVO(normalized as DeviceTypeValue);
  }

  static reconstitute(raw: string): DeviceTypeVO {
    return new DeviceTypeVO(raw as DeviceTypeValue);
  }

  isMobile(): boolean {
    return (
      this.value === NOTIFICATION_DEVICE_TYPE.ANDROID ||
      this.value === NOTIFICATION_DEVICE_TYPE.IOS
    );
  }

  isDesktop(): boolean {
    return (
      this.value === NOTIFICATION_DEVICE_TYPE.WINDOWS ||
      this.value === NOTIFICATION_DEVICE_TYPE.MACOS ||
      this.value === NOTIFICATION_DEVICE_TYPE.LINUX
    );
  }

  supportsPush(): boolean {
    return this.isMobile() || this.value === NOTIFICATION_DEVICE_TYPE.WEB;
  }
}
