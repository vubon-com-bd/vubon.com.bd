/**
 * DeviceId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeviceIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DeviceId cannot be empty', 'deviceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DeviceId must be a valid UUID', 'deviceId');
    }
    return new DeviceIdVO(trimmed);
  }

  static reconstitute(raw: string): DeviceIdVO {
    return new DeviceIdVO(raw);
  }
}
