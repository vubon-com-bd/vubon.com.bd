/**
 * DeviceType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidDeviceTypeError } from '../../errors/preference.errors.js';

type DeviceTypeValue = (typeof NOTIFICATION_DEVICE_TYPE)[keyof typeof NOTIFICATION_DEVICE_TYPE];
const ALLOWED = Object.values(NOTIFICATION_DEVICE_TYPE) as readonly string[];

export class DeviceTypeVO extends BaseTypeVO<DeviceTypeValue> {
  private constructor(value: DeviceTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): DeviceTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDeviceTypeError(raw, ALLOWED);
    }
    return new DeviceTypeVO(raw as DeviceTypeValue);
  }

  static reconstitute(raw: string): DeviceTypeVO {
    return new DeviceTypeVO(raw as DeviceTypeValue);
  }

  static android(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.ANDROID); }
  static ios(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.IOS); }
  static web(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.WEB); }
  static windows(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.WINDOWS); }
  static macos(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.MACOS); }
  static linux(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.LINUX); }
  static tablet(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.TABLET); }
  static wearable(): DeviceTypeVO { return new DeviceTypeVO(NOTIFICATION_DEVICE_TYPE.WEARABLE); }

  isMobile(): boolean {
    return (
      this.value === NOTIFICATION_DEVICE_TYPE.ANDROID ||
      this.value === NOTIFICATION_DEVICE_TYPE.IOS ||
      this.value === NOTIFICATION_DEVICE_TYPE.TABLET ||
      this.value === NOTIFICATION_DEVICE_TYPE.WEARABLE
    );
  }

  isDesktop(): boolean {
    return (
      this.value === NOTIFICATION_DEVICE_TYPE.WINDOWS ||
      this.value === NOTIFICATION_DEVICE_TYPE.MACOS ||
      this.value === NOTIFICATION_DEVICE_TYPE.LINUX
    );
  }

  isWeb(): boolean {
    return this.value === NOTIFICATION_DEVICE_TYPE.WEB;
  }

  supportsPush(): boolean {
    return !this.isWeb() || true; // Web supports web push
  }
}
