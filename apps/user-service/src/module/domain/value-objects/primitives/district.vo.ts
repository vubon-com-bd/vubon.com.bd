/**
 * District Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * District validation with DISTRICT constants from shared-constants.
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { DISTRICT } from '@vubon/shared-constants/common';

export type DistrictType = (typeof DISTRICT)[keyof typeof DISTRICT];

const DISTRICT_VALUES: ReadonlySet<string> = new Set(Object.values(DISTRICT));

export class DistrictVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DistrictVO {
    if (typeof raw !== 'string') {
      throw new Error('District must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!DISTRICT_VALUES.has(normalized)) {
      throw new Error(
        `Invalid district: "${raw}". Allowed: ${[...DISTRICT_VALUES].join(', ')}`
      );
    }
    return new DistrictVO(normalized);
  }

  static isDistrict(value: string): boolean {
    return DISTRICT_VALUES.has(value.trim().toLowerCase());
  }

  is(district: DistrictType): boolean {
    return this.value === district;
  }
}
