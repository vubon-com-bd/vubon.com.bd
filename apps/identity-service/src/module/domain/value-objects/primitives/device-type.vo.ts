/**
 * DeviceType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_DEVICE_TYPE } from '@vubon/shared-constants/auth';
import { InvalidDeviceTypeError } from '../../errors/device.errors.js';

const VALID_TYPES: readonly string[] = Object.values(AUTH_DEVICE_TYPE);

export class DeviceTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidDeviceTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new InvalidDeviceTypeError(normalized, VALID_TYPES);
    }
    return new DeviceTypeVO(normalized);
  }

  static desktop(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.DESKTOP); }
  static mobile(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.MOBILE); }
  static tablet(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.TABLET); }
  static tv(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.TV); }
  static wearable(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.WEARABLE); }
  static unknown(): DeviceTypeVO { return new DeviceTypeVO(AUTH_DEVICE_TYPE.UNKNOWN); }

  static reconstitute(raw: string): DeviceTypeVO {
    return new DeviceTypeVO(raw);
  }

  isDesktop(): boolean { return this.value === AUTH_DEVICE_TYPE.DESKTOP; }
  isMobile(): boolean { return this.value === AUTH_DEVICE_TYPE.MOBILE; }
  isTablet(): boolean { return this.value === AUTH_DEVICE_TYPE.TABLET; }
  isTv(): boolean { return this.value === AUTH_DEVICE_TYPE.TV; }
  isWearable(): boolean { return this.value === AUTH_DEVICE_TYPE.WEARABLE; }
  isKnown(): boolean { return this.value !== AUTH_DEVICE_TYPE.UNKNOWN; }
  isHandheld(): boolean { return this.isMobile() || this.isTablet() || this.isWearable(); }
}
