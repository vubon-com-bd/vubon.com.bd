/**
 * DriverLicenseType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DRIVER_LICENSE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidDriverLicenseTypeError } from '../../errors/driver.errors.js';

const ALLOWED = Object.values(DRIVER_LICENSE_TYPE) as readonly string[];

export class DriverLicenseTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DriverLicenseTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDriverLicenseTypeError(String(raw));
    }
    return new DriverLicenseTypeVO(raw);
  }

  static reconstitute(raw: string): DriverLicenseTypeVO { return new DriverLicenseTypeVO(raw); }

  static motorcycle(): DriverLicenseTypeVO { return new DriverLicenseTypeVO(DRIVER_LICENSE_TYPE.MOTORCYCLE); }
  static light(): DriverLicenseTypeVO { return new DriverLicenseTypeVO(DRIVER_LICENSE_TYPE.LIGHT); }
  static medium(): DriverLicenseTypeVO { return new DriverLicenseTypeVO(DRIVER_LICENSE_TYPE.MEDIUM); }
  static heavy(): DriverLicenseTypeVO { return new DriverLicenseTypeVO(DRIVER_LICENSE_TYPE.HEAVY); }
  static professional(): DriverLicenseTypeVO { return new DriverLicenseTypeVO(DRIVER_LICENSE_TYPE.PROFESSIONAL); }

  isMotorcycle(): boolean { return this.value === DRIVER_LICENSE_TYPE.MOTORCYCLE; }
  isLight(): boolean { return this.value === DRIVER_LICENSE_TYPE.LIGHT; }
  isMedium(): boolean { return this.value === DRIVER_LICENSE_TYPE.MEDIUM; }
  isHeavy(): boolean { return this.value === DRIVER_LICENSE_TYPE.HEAVY; }
  isProfessional(): boolean { return this.value === DRIVER_LICENSE_TYPE.PROFESSIONAL; }

  /** Can legally drive heavy trucks. */
  canDriveHeavy(): boolean { return this.isHeavy() || this.isProfessional(); }

  /** Can legally drive light/medium vehicles. */
  canDriveMedium(): boolean { return this.canDriveHeavy() || this.isMedium(); }

  /** Commercial license. */
  isCommercial(): boolean { return this.isProfessional() || this.isHeavy(); }

  /** Rank of license (higher = more privileges). */
  get rank(): number {
    const ranks: Record<string, number> = {
      [DRIVER_LICENSE_TYPE.MOTORCYCLE]: 1,
      [DRIVER_LICENSE_TYPE.LIGHT]: 2,
      [DRIVER_LICENSE_TYPE.MEDIUM]: 3,
      [DRIVER_LICENSE_TYPE.HEAVY]: 4,
      [DRIVER_LICENSE_TYPE.PROFESSIONAL]: 5,
    };
    return ranks[this.value] ?? 0;
  }
}
