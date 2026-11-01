/**
 * VehicleNumber Value Object (Registration Number)
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: 5-30 chars, uppercase alphanumeric + dash
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE } from '@vubon/shared-constants/logistics';

const PATTERN = /^[A-Z0-9][A-Z0-9-]{3,28}[A-Z0-9]$/;

export class VehicleNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VehicleNumber cannot be empty', 'number');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s+/g, '');
    if (normalized.length < 5 || normalized.length > VEHICLE.REGISTRATION_NUMBER_MAX_LENGTH) {
      throw new ValidationError(
        `VehicleNumber must be 5-${VEHICLE.REGISTRATION_NUMBER_MAX_LENGTH} chars`,
        'number',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'VehicleNumber must be uppercase alphanumeric with dashes',
        'number',
      );
    }
    return new VehicleNumberVO(normalized);
  }

  static reconstitute(raw: string): VehicleNumberVO {
    return new VehicleNumberVO(raw);
  }
}
