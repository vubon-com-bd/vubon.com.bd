/**
 * VehicleId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VehicleIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VehicleId cannot be empty', 'vehicleId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('VehicleId must be a valid UUID', 'vehicleId');
    }
    return new VehicleIdVO(trimmed);
  }

  static reconstitute(raw: string): VehicleIdVO {
    return new VehicleIdVO(raw);
  }
}
