/**
 * DriverType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DRIVER_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidDriverTypeError } from '../../errors/driver.errors.js';

const ALLOWED = Object.values(DRIVER_TYPE) as readonly string[];

export class DriverTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DriverTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDriverTypeError(String(raw));
    }
    return new DriverTypeVO(raw);
  }

  static reconstitute(raw: string): DriverTypeVO { return new DriverTypeVO(raw); }

  static fullTime(): DriverTypeVO { return new DriverTypeVO(DRIVER_TYPE.FULL_TIME); }
  static partTime(): DriverTypeVO { return new DriverTypeVO(DRIVER_TYPE.PART_TIME); }
  static contract(): DriverTypeVO { return new DriverTypeVO(DRIVER_TYPE.CONTRACT); }
  static freelance(): DriverTypeVO { return new DriverTypeVO(DRIVER_TYPE.FREELANCE); }
  static thirdParty(): DriverTypeVO { return new DriverTypeVO(DRIVER_TYPE.THIRD_PARTY); }

  isFullTime(): boolean { return this.value === DRIVER_TYPE.FULL_TIME; }
  isPartTime(): boolean { return this.value === DRIVER_TYPE.PART_TIME; }
  isContract(): boolean { return this.value === DRIVER_TYPE.CONTRACT; }
  isFreelance(): boolean { return this.value === DRIVER_TYPE.FREELANCE; }
  isThirdParty(): boolean { return this.value === DRIVER_TYPE.THIRD_PARTY; }

  /** Directly employed by Vubon. */
  isInHouse(): boolean { return this.isFullTime() || this.isPartTime(); }

  /** External / gig worker. */
  isExternal(): boolean { return this.isThirdParty() || this.isFreelance() || this.isContract(); }

  /** Eligible for full benefits (rating, cash advance etc.). */
  isBenefited(): boolean { return this.isFullTime(); }
}
