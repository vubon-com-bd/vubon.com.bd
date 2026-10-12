/**
 * ZoneType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ZONE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidZoneTypeError } from '../../errors/zone.errors.js';

const ALLOWED = Object.values(ZONE_TYPE) as readonly string[];

export class ZoneTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ZoneTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidZoneTypeError(String(raw));
    }
    return new ZoneTypeVO(raw);
  }

  static reconstitute(raw: string): ZoneTypeVO { return new ZoneTypeVO(raw); }

  static national(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.NATIONAL); }
  static division(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.DIVISION); }
  static district(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.DISTRICT); }
  static upazila(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.UPAZILA); }
  static city(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.CITY); }
  static area(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.AREA); }
  static postalCode(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.POSTAL_CODE); }
  static customPolygon(): ZoneTypeVO { return new ZoneTypeVO(ZONE_TYPE.CUSTOM_POLYGON); }

  isNational(): boolean { return this.value === ZONE_TYPE.NATIONAL; }
  isDivision(): boolean { return this.value === ZONE_TYPE.DIVISION; }
  isDistrict(): boolean { return this.value === ZONE_TYPE.DISTRICT; }
  isUpazila(): boolean { return this.value === ZONE_TYPE.UPAZILA; }
  isCity(): boolean { return this.value === ZONE_TYPE.CITY; }
  isArea(): boolean { return this.value === ZONE_TYPE.AREA; }
  isPostalCode(): boolean { return this.value === ZONE_TYPE.POSTAL_CODE; }
  isCustomPolygon(): boolean { return this.value === ZONE_TYPE.CUSTOM_POLYGON; }

  /** Uses standard administrative codes. */
  isAdministrative(): boolean {
    return [ZONE_TYPE.DIVISION, ZONE_TYPE.DISTRICT, ZONE_TYPE.UPAZILA].includes(this.value as never);
  }

  /** Uses geographic polygon — needs coordinates. */
  requiresPolygon(): boolean { return this.isCustomPolygon(); }

  /** Larger scope — rolls up smaller zones. */
  isParentScope(): boolean {
    return [ZONE_TYPE.NATIONAL, ZONE_TYPE.DIVISION, ZONE_TYPE.DISTRICT].includes(this.value as never);
  }
}
