/**
 * DriverType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DRIVER_TYPE } from '@vubon/shared-constants/logistics';

export type DriverTypeValue =
  (typeof DRIVER_TYPE)[keyof typeof DRIVER_TYPE];

const VALID_TYPES: readonly string[] = Object.values(DRIVER_TYPE);

export class DriverTypeVO extends BaseVO<DriverTypeValue> {
  private constructor(value: DriverTypeValue) {
    super(value);
  }

  static create(raw: string): DriverTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DriverType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DriverType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new DriverTypeVO(normalized as DriverTypeValue);
  }

  static reconstitute(raw: string): DriverTypeVO {
    return new DriverTypeVO(raw as DriverTypeValue);
  }

  isFullTime(): boolean { return this.value === DRIVER_TYPE.FULL_TIME; }
  isPartTime(): boolean { return this.value === DRIVER_TYPE.PART_TIME; }
  isContract(): boolean { return this.value === DRIVER_TYPE.CONTRACT; }
  isFreelance(): boolean { return this.value === DRIVER_TYPE.FREELANCE; }
  isThirdParty(): boolean { return this.value === DRIVER_TYPE.THIRD_PARTY; }
}
