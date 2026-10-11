/**
 * DeviceToken Value Object — FCM/APNs/Web Push registration token
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform/notification';

const MIN = 16;
const MAX = NOTIFICATION_DEVICE.TOKEN_MAX_LENGTH;
const PATTERN = /^[A-Za-z0-9_\-:./]+$/;

export class DeviceTokenVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTokenVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Device token must be a string', 'deviceToken');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new ValidationError(
        `Device token must be ${MIN}-${MAX} chars`,
        'deviceToken',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'Device token contains invalid characters',
        'deviceToken',
      );
    }
    return new DeviceTokenVO(trimmed);
  }

  static reconstitute(raw: string): DeviceTokenVO {
    return new DeviceTokenVO(raw);
  }

  get length(): number {
    return this.value.length;
  }

  /** Mask the token for logging. */
  masked(): string {
    if (this.value.length <= 8) return '***';
    return `${this.value.slice(0, 4)}...${this.value.slice(-4)}`;
  }
}
