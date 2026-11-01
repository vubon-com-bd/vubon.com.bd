/**
 * CourierType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COURIER_TYPE } from '@vubon/shared-constants/logistics';

export type CourierTypeValue =
  (typeof COURIER_TYPE)[keyof typeof COURIER_TYPE];

const VALID_TYPES: readonly string[] = Object.values(COURIER_TYPE);

export class CourierTypeVO extends BaseVO<CourierTypeValue> {
  private constructor(value: CourierTypeValue) {
    super(value);
  }

  static create(raw: string): CourierTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CourierType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CourierType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new CourierTypeVO(normalized as CourierTypeValue);
  }

  static reconstitute(raw: string): CourierTypeVO {
    return new CourierTypeVO(raw as CourierTypeValue);
  }

  isLocal(): boolean { return this.value === COURIER_TYPE.LOCAL; }
  isNational(): boolean { return this.value === COURIER_TYPE.NATIONAL; }
  isInternational(): boolean { return this.value === COURIER_TYPE.INTERNATIONAL; }
  isThirdParty(): boolean { return this.value === COURIER_TYPE.THIRD_PARTY; }
  isInHouse(): boolean { return this.value === COURIER_TYPE.IN_HOUSE; }
  isMarketplace(): boolean { return this.value === COURIER_TYPE.MARKETPLACE; }
}
