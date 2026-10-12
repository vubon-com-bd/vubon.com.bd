/**
 * CourierType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { COURIER_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidCourierTypeError } from '../../errors/courier.errors.js';

const ALLOWED = Object.values(COURIER_TYPE) as readonly string[];

export class CourierTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CourierTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidCourierTypeError(String(raw));
    }
    return new CourierTypeVO(raw);
  }

  static reconstitute(raw: string): CourierTypeVO { return new CourierTypeVO(raw); }

  static local(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.LOCAL); }
  static national(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.NATIONAL); }
  static international(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.INTERNATIONAL); }
  static thirdParty(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.THIRD_PARTY); }
  static inHouse(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.IN_HOUSE); }
  static marketplace(): CourierTypeVO { return new CourierTypeVO(COURIER_TYPE.MARKETPLACE); }

  isLocal(): boolean { return this.value === COURIER_TYPE.LOCAL; }
  isNational(): boolean { return this.value === COURIER_TYPE.NATIONAL; }
  isInternational(): boolean { return this.value === COURIER_TYPE.INTERNATIONAL; }
  isThirdParty(): boolean { return this.value === COURIER_TYPE.THIRD_PARTY; }
  isInHouse(): boolean { return this.value === COURIER_TYPE.IN_HOUSE; }
  isMarketplace(): boolean { return this.value === COURIER_TYPE.MARKETPLACE; }

  /** Operated by Vubon itself. */
  isOwnFleet(): boolean { return this.isInHouse(); }

  /** Handles cross-border shipments. */
  supportsCrossBorder(): boolean { return this.isInternational(); }
}
