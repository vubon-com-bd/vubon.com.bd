/**
 * DevicePlatform Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PUSH_PLATFORM } from '@vubon/shared-constants/platform';
import { InvalidDevicePlatformError } from '@domain/errors/device.errors.js';

export type DevicePlatformValue = (typeof PUSH_PLATFORM)[keyof typeof PUSH_PLATFORM];

const ALLOWED = Object.values(PUSH_PLATFORM) as readonly string[];

export class DevicePlatformVO extends BaseTypeVO<DevicePlatformValue> {
  private constructor(value: DevicePlatformValue) {
    super(value);
  }

  static create(raw: string): DevicePlatformVO {
    if (typeof raw !== 'string') {
      throw new InvalidDevicePlatformError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDevicePlatformError(normalized, ALLOWED);
    }
    return new DevicePlatformVO(normalized as DevicePlatformValue);
  }

  static reconstitute(raw: string): DevicePlatformVO {
    return new DevicePlatformVO(raw as DevicePlatformValue);
  }

  isMobile(): boolean {
    return this.value === PUSH_PLATFORM.ANDROID || this.value === PUSH_PLATFORM.IOS;
  }

  isWeb(): boolean { return this.value === PUSH_PLATFORM.WEB; }
}
