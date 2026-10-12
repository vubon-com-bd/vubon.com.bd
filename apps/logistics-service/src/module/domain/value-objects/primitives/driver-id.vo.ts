/**
 * DriverId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class DriverIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DriverIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DriverId cannot be empty', 'driverId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DriverId must be a valid UUID', 'driverId');
    }
    return new DriverIdVO(trimmed);
  }

  static reconstitute(raw: string): DriverIdVO { return new DriverIdVO(raw); }
}
