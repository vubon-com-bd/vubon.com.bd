/**
 * DriverLicense Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Composite: licenseNumber + licenseType + expiresAt
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DRIVER_LICENSE_TYPE } from '@vubon/shared-constants/logistics';

export type DriverLicenseTypeValue =
  (typeof DRIVER_LICENSE_TYPE)[keyof typeof DRIVER_LICENSE_TYPE];

const VALID_TYPES: readonly string[] = Object.values(DRIVER_LICENSE_TYPE);

export interface DriverLicenseValue {
  readonly licenseNumber: string;
  readonly licenseType: DriverLicenseTypeValue;
  readonly expiresAt: string;
}

const NUMBER_PATTERN = /^[A-Z0-9][A-Z0-9-]{5,28}[A-Z0-9]$/;

export class DriverLicenseVO extends BaseVO<DriverLicenseValue> {
  private constructor(value: DriverLicenseValue) {
    super(value);
  }

  static create(raw: DriverLicenseValue): DriverLicenseVO {
    if (!raw || typeof raw.licenseNumber !== 'string') {
      throw new ValidationError('DriverLicense requires licenseNumber', 'licenseNumber');
    }
    const number = raw.licenseNumber.trim().toUpperCase();
    if (!NUMBER_PATTERN.test(number)) {
      throw new ValidationError(
        'License number must be 7-30 chars uppercase alphanumeric with dashes',
        'licenseNumber',
      );
    }
    if (!VALID_TYPES.includes(raw.licenseType)) {
      throw new ValidationError(
        `Invalid license type "${raw.licenseType}". Allowed: ${VALID_TYPES.join(', ')}`,
        'licenseType',
      );
    }
    const exp = new Date(raw.expiresAt);
    if (Number.isNaN(exp.getTime())) {
      throw new ValidationError('License expiresAt is invalid', 'expiresAt');
    }
    return new DriverLicenseVO({
      licenseNumber: number,
      licenseType: raw.licenseType,
      expiresAt: exp.toISOString(),
    });
  }

  static reconstitute(raw: DriverLicenseValue): DriverLicenseVO {
    return new DriverLicenseVO(raw);
  }

  get licenseNumber(): string { return this.value.licenseNumber; }
  get licenseType(): DriverLicenseTypeValue { return this.value.licenseType; }
  get expiresAt(): string { return this.value.expiresAt; }

  isExpired(ref: Date = new Date()): boolean {
    return new Date(this.expiresAt) < ref;
  }

  expiresWithinDays(days: number, ref: Date = new Date()): boolean {
    const expiry = new Date(this.expiresAt);
    const diff = expiry.getTime() - ref.getTime();
    return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
  }
}
