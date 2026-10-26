/**
 * DeviceToken Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidDeviceTokenError } from '@domain/errors/device.errors.js';

const MIN_LENGTH = 32;
const MAX_LENGTH = 500;
const TOKEN_PATTERN = /^[A-Za-z0-9_\-:\.]+$/;

export class DeviceTokenVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTokenVO {
    if (typeof raw !== 'string') {
      throw new InvalidDeviceTokenError('must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new InvalidDeviceTokenError(`too short (min ${MIN_LENGTH})`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidDeviceTokenError(`too long (max ${MAX_LENGTH})`);
    }
    if (!TOKEN_PATTERN.test(trimmed)) {
      throw new InvalidDeviceTokenError('contains invalid characters');
    }
    return new DeviceTokenVO(trimmed);
  }

  static reconstitute(raw: string): DeviceTokenVO {
    return new DeviceTokenVO(raw);
  }

  get masked(): string {
    if (this.value.length <= 12) return this.value;
    return `${this.value.slice(0, 6)}...${this.value.slice(-6)}`;
  }
}
