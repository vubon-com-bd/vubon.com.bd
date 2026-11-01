/**
 * ZoneType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ZONE_TYPE } from '@vubon/shared-constants/logistics';

export type ZoneTypeValue =
  (typeof ZONE_TYPE)[keyof typeof ZONE_TYPE];

const VALID_TYPES: readonly string[] = Object.values(ZONE_TYPE);

export class ZoneTypeVO extends BaseVO<ZoneTypeValue> {
  private constructor(value: ZoneTypeValue) {
    super(value);
  }

  static create(raw: string): ZoneTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ZoneType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ZoneType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ZoneTypeVO(normalized as ZoneTypeValue);
  }

  static reconstitute(raw: string): ZoneTypeVO {
    return new ZoneTypeVO(raw as ZoneTypeValue);
  }

  isNational(): boolean { return this.value === ZONE_TYPE.NATIONAL; }
  isDivision(): boolean { return this.value === ZONE_TYPE.DIVISION; }
  isDistrict(): boolean { return this.value === ZONE_TYPE.DISTRICT; }
  isUpazila(): boolean { return this.value === ZONE_TYPE.UPAZILA; }
  isCity(): boolean { return this.value === ZONE_TYPE.CITY; }
  isArea(): boolean { return this.value === ZONE_TYPE.AREA; }
  isPostalCode(): boolean { return this.value === ZONE_TYPE.POSTAL_CODE; }
  isCustomPolygon(): boolean { return this.value === ZONE_TYPE.CUSTOM_POLYGON; }

  isLarge(): boolean {
    return this.isNational() || this.isDivision();
  }
}
